import ControlsComp from './components/Controls.tsx';
import MinimapComp from './components/Minimap.tsx';
import { Background, BackgroundVariant } from '@xyflow/react';
import ThemeSwitcher from './components/ThemeSwitcher.tsx';
import Status from './components/Status.tsx';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar.tsx';
import { AppSidebar } from './components/App-Sidebar.tsx';

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
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </SidebarProvider>
    </div>
  );
}
