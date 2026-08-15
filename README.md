# AquaCool AI — Functional MVP

A dynamic prototype for water-, energy- and carbon-aware workload scheduling in a simulated Indian data centre.

## Run the Python API

```bash
python -m venv .venv
source .venv/bin/activate       # Windows: .venv\\Scripts\\activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

## Run the React dashboard

In a second terminal:

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

The frontend also contains a deterministic fallback scheduler if the FastAPI server is not running.

## Functional features

- Current-device-time-aware simulation clock with locale-aware formatting.
- Facility/city profiles that update the environmental profile and workload simulation.
- Apply Changes flow on Settings.
- Dynamic workload queue with submission and deletion.
- Python FastAPI optimization endpoint.
- Animated optimization run showing queue scan, candidate evaluation, scheduling and metric calculation.
- Deterministic deadline-safe scheduling.
- Locked and critical workloads are never postponed.
- Interactive carbon, water, delay and capacity weights.
- Dynamic KPI recalculation after optimization.
- Human-readable decision inspector and clearer schedule legend.
- FIFO versus AquaCool timeline with hour axis, NOW marker and deadline markers.
- Dark theme plus a softer high-contrast light theme.

## Scope boundary

This is an MVP simulation. It does not connect to production Grid-India, CEA, IMD, CGWB, Kubernetes or facility telemetry, and it does not control real workloads or cooling equipment. Environmental data, workload data and computed impact values are deterministic simulated estimates for demonstration.
