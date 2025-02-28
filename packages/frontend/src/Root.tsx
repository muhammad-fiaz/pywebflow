import React, { Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ThemeProvider } from 'next-themes';
import { Theme } from '@radix-ui/themes';
import { HelmetProvider } from 'react-helmet-async';
import './styles/index.scss';
import '@xyflow/react/dist/style.css';
import '@radix-ui/themes/styles.css';
import '@mantine/core/styles.css';
import { loadAndInjectAssets } from './hooks/assets.ts';
import { getConfig } from '@pywebflow/api/src/config';

// Lazy load components with preloading
const Layout = React.lazy(() => import(/* webpackPreload: true */ './Layout'));
const MetaData = React.lazy(
  () => import(/* webpackPreload: true */ './components/Metadata'),
);

// Preload critical components asynchronously
const preloadAssets = () => {
  import(/* webpackPreload: true */ './Layout');
  import(/* webpackPreload: true */ './components/Metadata');
};

preloadAssets();

const Root = () => {
  const [mounted, setMounted] = useState(false);
  const [defaultTheme, setDefaultTheme] = useState<'light' | 'dark' | 'system'>(
    'system',
  );

  useEffect(() => {
    // Load assets dynamically
    loadAndInjectAssets();

    // Fetch config data
    const fetchConfig = async () => {
      try {
        const fetchedConfig = await getConfig();
        const config = fetchedConfig.data[0];
        if (config.colorMode) {
          setDefaultTheme(config.colorMode);
        }
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };

    fetchConfig();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme={defaultTheme}
        enableSystem
        disableTransitionOnChange
      >
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
