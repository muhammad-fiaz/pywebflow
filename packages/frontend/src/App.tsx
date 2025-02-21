import { useEffect, useState } from 'react';
import ControlsComp from './components/Controls.tsx';
import MinimapComp from './components/Minimap.tsx';
import Status from './components/Status.tsx';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar.tsx';
import AppSidebar from './components/App-Sidebar.tsx';
import BackgroundWrapper from './components/BackgroundWrapper.tsx';
import InjectedHtml from './components/InjectedHtml.tsx';
import {
  getSidebarItems,
  SidebarResponse,
} from '@pywebflow/api/src/sidebar.ts';

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
    <div className="App h-screen overflow-hidden">
      <SidebarProvider defaultOpen={defaultOpen}>
        <div className="flex h-full">
          {sidebarVisible && (
            <AppSidebar items={sidebarItems} label={sidebarLabel} />
          )}
          {sidebarVisible && <SidebarTrigger />}
          <div className="flex-1 overflow-auto">
            <Status />
            <ControlsComp />
            <MinimapComp />
            <BackgroundWrapper />
            <InjectedHtml /> {/* Add the InjectedHtml component here */}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default App;
