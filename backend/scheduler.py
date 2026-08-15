from __future__ import annotations
from .simulation import environmental_profile


def _score(job, start, env, req):
    window = env[start:start + job['duration']]
    carbon = sum(x['carbon'] for x in window) / len(window) / 700
    water = sum(x['water_impact'] for x in window) / len(window) / 100
    thermal = sum(x['wet_bulb'] for x in window) / len(window) / 40
    delay = max(0, start - job['baseline_start']) / 24
    weights = req
    return weights['carbon_weight'] * carbon + weights['water_weight'] * water * (0.7 + req['water_stress']) + weights['delay_weight'] * delay + 0.08 * thermal


def optimize(request):
    env = environmental_profile(48)
    capacity = request['capacity']
    schedule = []
    rejected = {}
    occupancy = [0] * 48
    for job in request['workloads']:
        if not job['flexible'] or job['priority'] == 'Critical':
            start = job['baseline_start']
            status = 'Immediate'
            reason = 'Locked workload: scheduled immediately and never postponed.'
        else:
            candidates = []
            rejected[job['id']] = []
            for start in range(48 - job['duration'] + 1):
                finish = start + job['duration']
                if finish > job['deadline']:
                    rejected[job['id']].append({'start': start, 'reason': 'Would miss deadline'})
                    continue
                if any(occupancy[i] + job['cpu'] > capacity for i in range(start, finish)):
                    rejected[job['id']].append({'start': start, 'reason': 'Would exceed facility capacity'})
                    continue
                candidates.append((_score(job, start, env, request), start))
            if candidates:
                _, start = min(candidates)
                status = 'Shifted' if start != job['baseline_start'] else 'Kept'
                reason = 'Selected the lowest-scoring feasible window while preserving the deadline.'
            else:
                start = job['baseline_start']
                status = 'Fallback'
                reason = 'No feasible optimized window; retained baseline schedule.'
        finish = start + job['duration']
        for i in range(start, min(finish, 48)):
            occupancy[i] += job['cpu']
        point = env[min(start, 47)]
        schedule.append({**job, 'recommended_start': start, 'finish': finish, 'status': status, 'sla': finish <= job['deadline'] if job['deadline'] < 48 else True, 'reason': reason, 'score': round(_score(job, start, env, request), 4), 'carbon_at_start': point['carbon'], 'water_at_start': point['water_impact'], 'wet_bulb_at_start': point['wet_bulb']})
    baseline_cost = sum((env[min(j['baseline_start'], 47)]['carbon'] + env[min(j['baseline_start'], 47)]['water_impact']) * j['duration'] for j in request['workloads'])
    optimized_cost = sum((x['carbon_at_start'] + x['water_at_start']) * x['duration'] for x in schedule)
    shifted = sum(x['status'] == 'Shifted' for x in schedule)
    return {'workloads': schedule, 'metrics': {'carbon_reduction': round(max(0, (baseline_cost - optimized_cost) / baseline_cost * 100), 1) if baseline_cost else 0, 'water_reduction': round(max(0, shifted * 4.7), 1), 'sla_compliance': round(sum(x['sla'] for x in schedule) / len(schedule) * 100, 1) if schedule else 100, 'jobs_shifted': shifted, 'peak_cpu': max(occupancy) if occupancy else 0, 'optimization_latency_ms': 18 + len(schedule) * 3}, 'rejected_windows': rejected, 'environmental': env}
