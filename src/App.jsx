import { useState } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import OverviewPage from './components/overview/OverviewPage';
import LiveSimulationPage from './components/environment/LiveSimulationPage';
import SchedulerPage from './components/scheduler/SchedulerPage';
import OptimizationPage from './components/optimization/OptimizationPage';
import MetricsPage from './components/metrics/MetricsPage';
import SettingsPage from './components/settings/SettingsPage';
import { useTheme } from './hooks/useTheme';
import { useSimulation } from './hooks/useSimulation';
import { useFacilityProfile } from './hooks/useFacilityProfile';

export default function App() {
  const [page, setPage] = useState('Overview');
  const { theme, toggleTheme } = useTheme();
  const facility = useFacilityProfile();
  const simulation = useSimulation(facility);
  const props = { facility, simulation };
  let content = <OverviewPage {...props} />;
  if (page === 'Environmental Forecast') content = <LiveSimulationPage {...props} />;
  if (page === 'Workload Scheduler') content = <SchedulerPage {...props} />;
  if (page === 'Optimization') content = <OptimizationPage {...props} />;
  if (page === 'Metrics') content = <MetricsPage {...props} />;
  if (page === 'Settings') content = <SettingsPage {...props} theme={theme} toggleTheme={toggleTheme} />;
  return <DashboardLayout page={page} onNavigate={setPage} theme={theme} toggleTheme={toggleTheme} facility={facility} onAutomate={simulation.runAutomation} running={simulation.running}>{content}</DashboardLayout>;
}
