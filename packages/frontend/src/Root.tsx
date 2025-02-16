import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import './styles/index.scss';
import '@xyflow/react/dist/style.css';
import '@radix-ui/themes/styles.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ThemeProvider } from 'next-themes';
import { Theme } from '@radix-ui/themes';
import { HelmetProvider } from 'react-helmet-async';
import MetaData from './components/Metadata';
import { loadAssets } from './api/filepaths';

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
      <MetaData />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
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
