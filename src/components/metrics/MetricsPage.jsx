import Panel from "../common/Panel";
export default function MetricsPage({ facility, simulation }) {
  const m = simulation.metrics;
  const summary = m.jobsShifted
    ? `${m.jobsShifted} flexible workloads were shifted into alternative windows while maintaining ${m.slaCompliance}% SLA compliance. Estimated carbon reduction is ${m.carbonReduction}% and water-impact reduction is ${m.waterReduction}%. The dispatch simulation reports ${m.completed} completed, ${m.dispatching} active and ${m.blocked} blocked workloads.`
    : "Run scheduling automation to generate an operational report from the active queue.";
  return (
    <>
      <div className="section-title">
        <div>
          <h2>Run reports</h2>
          <p>Operational evidence for the {facility.city} automation run.</p>
        </div>
      </div>
      <div className="metric-list">
        <Metric label="Queued workloads" value={m.queued} />
        <Metric label="Completed workloads" value={m.completed} />
        <Metric label="Blocked workloads" value={m.blocked} />
        <Metric label="Peak CPU allocation" value={`${m.peakCpu} CPU`} />
        <Metric label="SLA compliance" value={`${m.slaCompliance}%`} />
        <Metric label="Active dispatches" value={m.dispatching} />
      </div>
      <Panel title="Run summary" tag="GENERATED FROM CURRENT STATE">
        <p className="summary-text">{summary}</p>
      </Panel>
      <Panel title="Run history" tag="LAST 6 RUNS">
        <table>
          <thead>
            <tr>
              <th>Run</th>
              <th>Time</th>
              <th>Carbon reduction</th>
              <th>Water impact</th>
              <th>Shifted</th>
              <th>SLA</th>
            </tr>
          </thead>
          <tbody>
            {simulation.history.length ? (
              simulation.history.map((run, index) => (
                <tr key={run.id}>
                  <td>#{simulation.history.length - index}</td>
                  <td>{run.time}</td>
                  <td>{run.metrics.carbonReduction}%</td>
                  <td>{run.metrics.waterReduction}%</td>
                  <td>{run.metrics.jobsShifted}</td>
                  <td>{run.metrics.slaCompliance}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No automation runs recorded yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Panel>
    </>
  );
}
function Metric({ label, value }) {
  return (
    <div className="metric-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
