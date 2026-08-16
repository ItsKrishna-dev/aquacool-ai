import Sidebar from './Sidebar';
import Header from './Header';
export default function DashboardLayout({ children, page, onNavigate, theme, toggleTheme, facility, onAutomate, running }) {
  return <div className="app-shell" data-theme={theme}><Sidebar page={page} onNavigate={onNavigate} facility={facility}/><main className="app-main"><Header page={page} theme={theme} toggleTheme={toggleTheme} onAutomate={onAutomate} running={running} facility={facility}/><section className="page-content">{children}</section></main></div>;
}
