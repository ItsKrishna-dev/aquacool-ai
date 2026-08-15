export default function Panel({ title, tag, children }) {
  return <section className="panel"><div className="panel-head"><h3>{title}</h3>{tag && <span className="panel-tag">{tag}</span>}</div>{children}</section>;
}
