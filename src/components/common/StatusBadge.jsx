export default function StatusBadge({state}){return <span className={`status status-${state.toLowerCase().replaceAll('_','-')}`}>{state.replaceAll('_',' ')}</span>}
