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

## Demonstration flow

1. Open Overview and see the operational queue, facility state and scheduler status.
2. Click **Run scheduling automation**.
3. Watch workloads move through INGESTED → CLASSIFIED → EVALUATING → APPROVED → DISPATCHED → RUNNING → COMPLETED.
4. Open the automation console to inspect event-by-event decisions.
5. Open Optimization to inspect policy and dispatch state.
6. Open Workload Scheduler to compare baseline and AquaCool windows.
7. Change the facility city or CPU capacity in Settings and apply the profile.

The MVP uses deterministic simulated data and does not control real workloads, cooling equipment or Kubernetes.