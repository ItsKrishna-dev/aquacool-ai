# AquaCool AI — MVP Dashboard

A polished, offline React/Vite demonstration of the AquaCool AI concept: water-, energy- and carbon-aware scheduling for a simulated Indian data centre.

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Included

- Overview dashboard.
- Environmental Forecast charts.
- Workload Scheduler table and workload submission form.
- Deterministic Optimize Schedule action.
- FIFO versus AquaCool timeline.
- Job-detail reasoning panel.
- Optimization and Metrics views.
- Settings view.
- Fixed-seed offline demo mode.
- Critical/non-flexible jobs are never delayed.
- Flexible jobs remain deadline-protected in the simulated schedule.

## Important demo disclaimer

Every chart, KPI and environmental signal is simulated or estimated. This app does not connect to Grid-India, CEA, IMD, CGWB, NITI Aayog, Kubernetes, facility telemetry or any production API. It does not control real workloads or cooling equipment. The reduction percentages are illustrative demo values and are not experimental results.

## Architecture boundary

The frontend contains a deterministic scheduler simulation only. A production implementation would require validated facility telemetry, workload metadata, cooling models, authorized integrations and safety review.