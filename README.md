# AquaCool AI — Functional MVP

A dynamic React/Vite dashboard with a deterministic Python scheduling simulator.

## Start the frontend only

```bash
npm install
npm run dev
```

The dashboard includes a built-in deterministic fallback, so it must render even when the Python API is not running.

## Start the optional Python API

In another terminal:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

The frontend first tries `http://localhost:8000/api/optimize`. If the API is unavailable, it automatically runs the same scheduling logic locally.

## Presentation flow

1. Open Overview and inspect the current facility profile.
2. Open Settings, change city or CPU capacity, then click Apply changes.
3. Return to Overview and click Optimize Schedule.
4. Watch the staged live simulation and activity log.
5. Open Optimization to adjust priorities and run again.
6. Open Workload Scheduler to add/remove jobs.
7. Click a workload to inspect its scheduling reason.
8. Read the timeline using gray = FIFO baseline, blue = AquaCool placement and amber = deadline.

## Scope

This is an MVP simulation. It does not connect to production Grid-India, CEA, IMD, CGWB, Kubernetes or facility telemetry, and it does not control real workloads or cooling equipment.
