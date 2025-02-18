import React, {Suspense, useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ThemeProvider } from 'next-themes';
import { Theme } from '@radix-ui/themes';
import { HelmetProvider } from 'react-helmet-async';
import { loadAssets } from './api/filepaths';
import './styles/index.scss';
import '@xyflow/react/dist/style.css';
import '@radix-ui/themes/styles.css';
import '@mantine/core/styles.css';

// Lazy load components with immediate preload
const Layout = React.lazy(() => import(/* webpackPreload: true */ './Layout'));
const MetaData = React.lazy(() => import(/* webpackPreload: true */ './components/Metadata'));

// Preload critical components and assets immediately
const preloadAssets = () => {
  import(/* webpackPreload: true */ './Layout');
  import(/* webpackPreload: true */ './components/Metadata');
};

preloadAssets();

const Root = () => {
  const [mounted, setMounted] = useState(false);
  const [, setHtmlPages] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const html = await loadAssets();
      setHtmlPages(html);
    };
    load();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <MantineProvider>
          <Theme>
            {mounted && (
              <Router>
                <Routes>
                  <Route path="/" element={<Layout />} />
                </Routes>
              </Router>
            )}
            <Suspense fallback={null}>
              <MetaData />
            </Suspense>
          </Theme>
        </MantineProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default Root;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
