import './styles.ts';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Layout.tsx';
import { MantineProvider } from '@mantine/core';
import { ThemeProvider } from 'next-themes';
import { Theme } from '@radix-ui/themes';
import { HelmetProvider } from 'react-helmet-async';

const Root = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure theme is applied correctly on first load
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <MantineProvider>
          <Theme>{mounted && <Layout />}</Theme>
          {/* Only render Layout when mounted to fix theme switching issue */}
        </MantineProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
