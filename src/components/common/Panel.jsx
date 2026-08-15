export default function Panel({title,tag,children}){return <section className="panel"><div className="panelhead"><h3>{title}</h3><span>{tag}</span></div>{children}</section>}
