import Panel from "../common/Panel";
import {
  SlidersHorizontal,
  Play,
  Server,
  Activity,
  Clock3,
  Droplets,
} from "lucide-react";
import StatusBadge from "../common/StatusBadge";
export default function OptimizationPage({ facility, simulation }) {
  return (
    <>
      <div className="section-title">
        <div>
          <h2>Optimization lab</h2>
          <p>Automation policies and dispatch state for {facility.city}.</p>
        </div>
        <button
          className="primary"
          onClick={simulation.runAutomation}
          disabled={simulation.running}
        >
          <Play size={16} />
          {simulation.running ? "Running…" : "Run automation"}
        </button>
      </div>
      <Panel title="Current automation policy" tag="ACTIVE">
        <div className="policy-grid">
          <Policy
            icon={SlidersHorizontal}
            label="Carbon priority"
            value="40%"
          />
          <Policy icon={Droplets} label="Water priority" value="35%" />
          <Policy icon={Clock3} label="Delay penalty" value="25%" />
          <Policy
            icon={Server}
            label="Capacity"
            value={`${facility.capacity} CPU`}
          />
        </div>
      </Panel>
      <Panel title="Dispatch activity" tag="STATEFUL">
        <div className="dispatch-grid">
          {simulation.jobs.map((job) => (
            <div className="dispatch-card" key={job.id}>
              <div className="dispatch-top">
                <div>
                  <b>{job.id}</b>
                  <span>{job.name}</span>
                </div>
                <StatusBadge state={job.state} />
              </div>
              <div className="dispatch-allocation">
                <span>
                  <Server size={14} /> {job.allocatedCpu || job.cpu} CPU
                </span>
                <span>
                  <Activity size={14} /> {job.allocatedMemory || job.memory} GB
                </span>
              </div>
              <div className="dispatch-action">
                <span>Current action</span>
                <b>{job.dispatchMessage || job.reason}</b>
              </div>
              <div className="dispatch-progress">
                <i style={{ width: `${job.progress || 0}%` }} />
                <span>{job.progress || 0}%</span>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
function Policy({ icon: Icon, label, value }) {
  return (
    <div className="policy-card">
      <div className="policy-icon">
        <Icon size={16} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
