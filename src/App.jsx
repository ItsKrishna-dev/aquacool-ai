import { useState } from "react";
import DashboardLayout from "./components/layout/DashboardLayout";
import OverviewPage from "./components/overview/OverviewPage";
import EnvironmentPage from "./components/environment/EnvironmentPage";
import SchedulerPage from "./components/scheduler/SchedulerPage";
import OptimizationPage from "./components/optimization/OptimizationPage";
import MetricsPage from "./components/metrics/MetricsPage";
import SettingsPage from "./components/settings/SettingsPage";
import { useTheme } from "./hooks/useTheme";
import { useSimulation } from "./hooks/useSimulation";
import { useFacilityProfile } from "./hooks/useFacilityProfile";

export default function App() {
  const [page, setPage] = useState("Overview");
  const { theme, toggleTheme } = useTheme();
  const facility = useFacilityProfile();
  const simulation = useSimulation(facility);
  const common = { facility, simulation };
  let content = <OverviewPage {...common} />;
  if (page === "Environmental Forecast")
    content = <EnvironmentPage {...common} />;
  if (page === "Workload Scheduler") content = <SchedulerPage {...common} />;
  if (page === "Optimization") content = <OptimizationPage {...common} />;
  if (page === "Metrics") content = <MetricsPage {...common} />;
  if (page === "Settings")
    content = (
      <SettingsPage {...common} theme={theme} toggleTheme={toggleTheme} />
    );
  return (
    <DashboardLayout
      page={page}
      onNavigate={setPage}
      theme={theme}
      toggleTheme={toggleTheme}
      facility={facility}
      onAutomate={simulation.runAutomation}
      running={simulation.running}
    >
      {content}
    </DashboardLayout>
  );
}
