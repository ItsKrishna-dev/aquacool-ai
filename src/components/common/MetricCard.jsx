export default function MetricCard({
  label,
  value,
  icon: Icon,
  tone = "cyan",
}) {
  return (
    <div className="card">
      <div className={`icon ${tone}`}>
        <Icon size={18} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>LIVE SIMULATION STATE</small>
    </div>
  );
}
