import ControlsComp from './components/Controls.tsx';
import MinimapComp from './components/Minimap.tsx';
import ThemeSwitcher from './components/ThemeSwitcher.tsx';
import Status from './components/Status.tsx';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar.tsx';
import { AppSidebar } from './components/App-Sidebar.tsx';
import BackgroundWrapper from "./components/BackgroundWrapper.tsx";

export function App() {
  return (
    <div className="App">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <ThemeSwitcher />
        <Status />
        <ControlsComp />
        <MinimapComp />
        <BackgroundWrapper/>
      </SidebarProvider>
    </div>
  );
}
