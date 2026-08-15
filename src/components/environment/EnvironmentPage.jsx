import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { RefreshCw, Activity, Droplets, Leaf, Sun } from 'lucide-react';
import Panel from '../common/Panel';
import MetricCard from '../common/MetricCard';

export default function EnvironmentPage({ facility, simulation }) {
  const [metric, setMetric] = useState('carbon');
  const data = simulation.environment;
  const current = data[0];
  const best = data.reduce((a, b) => b.renewable > a.renewable ? b : a, data[0]);
  return <>
    <div className="section-title"><div><h2>Environmental forecast</h2><p>{facility.city} facility profile • dynamic 48-hour horizon</p></div><button className="secondary" onClick={simulation.refreshEnvironment}><RefreshCw size={15}/> Refresh readings</button></div>
    <div className="cards forecast-cards"><MetricCard icon={Activity} label="Current carbon intensity" value={`${current.carbon}`} tone="cyan"/><MetricCard icon={Droplets} label="Current water index" value={`${current.waterImpact}`} tone="blue"/><MetricCard icon={Leaf} label="Wet-bulb temperature" value={`${current.wetBulb}°C`} tone="violet"/><MetricCard icon={Sun} label="Renewable availability" value={`${current.renewable}%`} tone="amber"/></div>
    <div className="forecast-tabs">{[['carbon','Carbon intensity'],['wetBulb','Wet-bulb temperature'],['waterImpact','Water impact'],['renewable','Renewable availability']].map(([key,label])=><button className={metric===key?'active':''} onClick={()=>setMetric(key)}>{label}</button>)}</div>
    <Panel title={metricLabel(metric)} tag="REFRESHABLE SIMULATION"><div className="chart"><ResponsiveContainer width="100%" height={330}><AreaChart data={data}><CartesianGrid stroke="var(--grid)" vertical={false}/><XAxis dataKey="label" interval={5} stroke="var(--muted)"/><YAxis stroke="var(--muted)"/><Tooltip/><Area type="monotone" dataKey={metric} stroke="var(--cyan)" fill="rgba(69,184,232,.22)" strokeWidth={3}/></AreaChart></ResponsiveContainer></div></Panel>
    <div className="forecast-insight">Best simulated renewable window: <b>{best.label}</b> at {best.renewable}% availability. Refresh readings to create a new sensor scenario.</div>
  </>;
}
function metricLabel(metric) { return { carbon:'Grid carbon intensity', wetBulb:'Wet-bulb temperature', waterImpact:'Estimated cooling-water impact', renewable:'Renewable availability' }[metric]; }
