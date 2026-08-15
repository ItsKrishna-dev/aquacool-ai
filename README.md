# AquaCool AI — Automation Control Plane MVP

A modular React/Vite interface for simulating water-, energy- and carbon-aware workload automation in an Indian data centre.

## Run

```bash
npm install
npm run dev
```

Optional backend:

```bash
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

## New demonstration flow

1. Toggle the theme from the header or Settings; the light theme applies through `data-theme`.
2. Open Environmental Forecast and switch between metrics or refresh the simulated readings.
3. Open Workload Scheduler and add a job, delete a job, reset the queue, or inject 100 simulated jobs.
4. Run scheduling automation from Overview and watch the queue lifecycle.
5. Open Reports/Metrics after a run to read the generated summary and run history.

The MVP uses deterministic simulated data and does not control real workloads, cooling equipment or Kubernetes.