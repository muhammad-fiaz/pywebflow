import { useEffect, useState } from 'react';
import ControlsComp from './components/Controls.tsx';
import MinimapComp from './components/Minimap.tsx';
import ThemeSwitcher from './components/ThemeSwitcher.tsx';
import Status from './components/Status.tsx';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar.tsx';
import AppSidebar from './components/App-Sidebar.tsx';
import BackgroundWrapper from './components/BackgroundWrapper.tsx';
import { getSidebarItems, SidebarResponse } from '@pywebflow/api/src/sidebar.ts';

export function App() {
  const [sidebarItems, setSidebarItems] = useState<SidebarResponse['items']>(
    [],
  );
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [sidebarLabel, setSidebarLabel] = useState<string>('');
  const [defaultOpen, setDefaultOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchSidebarItems = async () => {
      const response: SidebarResponse = await getSidebarItems();
      setSidebarItems(response.items);
      setSidebarVisible(response.visible);
      setSidebarLabel(response.label);
      setDefaultOpen(response.default_open);
    };

    fetchSidebarItems();
  }, []);

  return (
    <div className="App">
      <SidebarProvider defaultOpen={defaultOpen}>
        {sidebarVisible && (
          <AppSidebar items={sidebarItems} label={sidebarLabel} />
        )}
        {sidebarVisible && <SidebarTrigger />}
        <ThemeSwitcher />
        <Status />
        <ControlsComp />
        <MinimapComp />
        <BackgroundWrapper />
      </SidebarProvider>
    </div>
  );
}

export default App;
