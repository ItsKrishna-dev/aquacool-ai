import { useMemo, useState } from "react";
import { INITIAL_JOBS } from "../app/constants";
import { createEnvironment } from "../simulation/environment";
import { runScheduler } from "../simulation/scheduler";
import { createDispatchTimeline } from "../simulation/dispatchSimulator";

export function useSimulation(facility) {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [events, setEvents] = useState([]);
  const [runStep, setRunStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const environment = useMemo(
    () => createEnvironment(facility.profile, refreshKey),
    [facility.profile, refreshKey],
  );

  const displayed =
    result?.jobs ||
    jobs.map((job) => ({
      ...job,
      recommendedStart: job.baselineStart,
      state: job.flexible ? "QUEUED" : "LOCKED_CRITICAL",
      progress: 0,
      finish: job.baselineStart + job.duration,
      reason: "Run scheduling automation to evaluate this workload.",
    }));

  async function runAutomation() {
    if (running) return;
    setRunning(true);
    setResult(null);
    setRunStep(1);
    const addEvent = (text, type = "active") =>
      setEvents((current) => [
        ...current,
        { time: new Date().toLocaleTimeString(), text, type },
      ]);
    addEvent(`Ingested ${jobs.length} workloads`);
    await pause(450);
    setRunStep(2);
    addEvent(
      `Classified ${jobs.filter((job) => !job.flexible).length} critical and ${jobs.filter((job) => job.flexible).length} flexible jobs`,
    );
    await pause(500);
    addEvent(
      `Protected ${jobs.filter((job) => !job.flexible).length} critical workloads from delay`,
    );
    setRunStep(3);
    await pause(600);
    addEvent(
      "Evaluated feasible windows against deadlines, capacity and environmental scores",
    );
    const scheduled = runScheduler(jobs, environment, facility.capacity);
    setRunStep(4);
    scheduled.jobs
      .filter((job) => job.state === "APPROVED")
      .forEach((job) =>
        addEvent(`Approved ${job.id} for ${job.recommendedStartLabel}`),
      );
    await pause(550);
    setRunStep(5);
    addEvent("Dispatch queue populated");
    const dispatch = createDispatchTimeline(scheduled.jobs);
    const final = { ...scheduled, jobs: dispatch };
    setResult(final);
    setHistory((current) =>
      [
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          metrics: final.metrics,
        },
        ...current,
      ].slice(0, 6),
    );
    await pause(600);
    setRunStep(6);
    addEvent("Simulation completed", "done");
    setRunning(false);
  }

  function addJob(job) {
    setJobs((current) => [...current, job]);
    setResult(null);
  }
  function removeJob(id) {
    setJobs((current) => current.filter((job) => job.id !== id));
    setResult(null);
  }
  function resetQueue() {
    setJobs(INITIAL_JOBS);
    setResult(null);
    setEvents([]);
    setHistory([]);
  }
  function refreshEnvironment() {
    setRefreshKey((key) => key + 1);
    setResult(null);
  }
  return {
    jobs: displayed,
    rawJobs: jobs,
    environment,
    metrics: result?.metrics || {
      carbonReduction: 0,
      waterReduction: 0,
      slaCompliance: 100,
      jobsShifted: 0,
      queued: jobs.length,
      completed: 0,
      blocked: 0,
      dispatching: 0,
      peakCpu: 0,
      latencyMs: 0,
    },
    events,
    history,
    runStep,
    running,
    runAutomation,
    addJob,
    removeJob,
    resetQueue,
    refreshEnvironment,
  };
}
function pause(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
