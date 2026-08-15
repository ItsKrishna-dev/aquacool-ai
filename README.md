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

- Dynamic workload queue with submission and deletion.
- Python FastAPI optimization endpoint.
- Deterministic deadline-safe scheduling.
- Locked and critical workloads are never postponed.
- Interactive carbon, water, delay and capacity weights.
- Dynamic KPI recalculation after optimization.
- Candidate-window rejection reasons.
- Job decision inspector with selected window, finish time, environmental scores and SLA status.
- FIFO versus AquaCool timeline with deadline markers.
- Dark/light theme with high-contrast data values.
- Responsive dashboard layout.

## Scope boundary

This is an MVP simulation. It does not connect to production Grid-India, CEA, IMD, CGWB, Kubernetes or facility telemetry, and it does not control real workloads or cooling equipment. Environmental data, workload data and computed impact values are deterministic simulated estimates for demonstration.
