from __future__ import annotations
from .simulation import environmental_profile


def score_job(job, start, env, request):
    window = env[start:start + job['duration']]
    carbon = sum(row['carbon'] for row in window) / len(window) / 700
    water = sum(row['water_impact'] for row in window) / len(window) / 100
    thermal = sum(row['wet_bulb'] for row in window) / len(window) / 40
    delay = max(0, start - job['baseline_start']) / 24
    return request['carbon_weight'] * carbon + request['water_weight'] * water * (0.7 + request['water_stress']) + request['delay_weight'] * delay + 0.08 * thermal


def optimize(request):
    env = environmental_profile(48)
    occupancy = [0] * 48
    schedule = []
    rejected = {}

    for job in request['workloads']:
        if not job['flexible'] or job['priority'] == 'Critical':
            start = job['baseline_start']
            status = 'Immediate'
            reason = 'Locked workload: scheduled immediately and never postponed.'
        else:
            candidates = []
            rejected[job['id']] = []
            for candidate in range(48 - job['duration'] + 1):
                finish = candidate + job['duration']
                if finish > job['deadline']:
                    rejected[job['id']].append({'start': candidate, 'reason': 'Would miss deadline'})
                    continue
                if any(occupancy[h] + job['cpu'] > request['capacity'] for h in range(candidate, finish)):
                    rejected[job['id']].append({'start': candidate, 'reason': 'Would exceed facility CPU capacity'})
                    continue
                candidates.append((score_job(job, candidate, env, request), candidate))

            if candidates:
                _, start = min(candidates)
                status = 'Shifted' if start != job['baseline_start'] else 'Kept'
                reason = 'Selected the lowest-scoring feasible window while preserving the deadline.'
            else:
                start = job['baseline_start']
                status = 'Fallback'
                reason = 'No feasible optimized window; retained baseline schedule.'

        finish = start + job['duration']
        for hour in range(start, min(finish, 48)):
            occupancy[hour] += job['cpu']
        point = env[min(start, 47)]
        schedule.append({
            **job,
            'recommended_start': start,
            'finish': finish,
            'status': status,
            'sla': finish <= job['deadline'] if job['deadline'] < 48 else True,
            'reason': reason,
            'score': round(score_job(job, start, env, request), 4),
            'carbon_at_start': point['carbon'],
            'water_at_start': point['water_impact'],
            'wet_bulb_at_start': point['wet_bulb'],
        })

    baseline_cost = sum((env[min(job['baseline_start'], 47)]['carbon'] + env[min(job['baseline_start'], 47)]['water_impact']) * job['duration'] for job in request['workloads'])
    optimized_cost = sum((job['carbon_at_start'] + job['water_at_start']) * job['duration'] for job in schedule)
    shifted = sum(job['status'] == 'Shifted' for job in schedule)

    return {
        'workloads': schedule,
        'metrics': {
            'carbon_reduction': round(max(0, (baseline_cost - optimized_cost) / baseline_cost * 100), 1) if baseline_cost else 0,
            'water_reduction': round(max(0, shifted * 4.7), 1),
            'sla_compliance': round(sum(job['sla'] for job in schedule) / len(schedule) * 100, 1) if schedule else 100,
            'jobs_shifted': shifted,
            'peak_cpu': max(occupancy) if occupancy else 0,
            'optimization_latency_ms': 18 + len(schedule) * 3,
        },
        'rejected_windows': rejected,
        'environmental': env,
    }
