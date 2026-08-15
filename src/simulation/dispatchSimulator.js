export function createDispatchTimeline(jobs) {
  return jobs.map((job, index) => ({ ...job, state: job.state === 'LOCKED_CRITICAL' ? 'LOCKED_CRITICAL' : index % 3 === 0 ? 'COMPLETED' : index % 3 === 1 ? 'RUNNING' : 'DISPATCHED', progress: index % 3 === 0 ? 100 : index % 3 === 1 ? 64 : 18, allocatedCpu: job.cpu, allocatedMemory: job.memory, dispatchMessage: index % 3 === 0 ? 'Execution completed and resources released' : index % 3 === 1 ? 'Worker active; resource allocation in progress' : `Queued for dispatch to ${job.cluster}` }));
}
