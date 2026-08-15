export default function ProgressBar({ value }) {
  return (
    <div className="job-progress">
      <i style={{ width: `${value}%` }} />
      <span>{value}%</span>
    </div>
  );
}
