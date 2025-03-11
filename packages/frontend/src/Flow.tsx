import ControlsComp from './components/Controls.tsx';
import MinimapComp from './components/Minimap.tsx';
import BackgroundWrapper from './components/BackgroundWrapper.tsx';
import InjectedHtml from './components/InjectedHtml.tsx';

export function Flow() {
  return (
    <div className="App h-screen overflow-hidden">
      <div className="flex h-full">
        <div className="flex-1 overflow-auto">
          <ControlsComp />
          <MinimapComp />
          <BackgroundWrapper />
          <InjectedHtml />
        </div>
      </div>
    </div>
  );
}

export default Flow;
