import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Layout.tsx';
import './styles/index.scss';
import '@xyflow/react/dist/style.css';
import '@radix-ui/themes/styles.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import { ThemeProvider } from 'next-themes';
import { Theme } from '@radix-ui/themes';

const Root = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MantineProvider>
        <Theme>{mounted && <Layout />}</Theme>
      </MantineProvider>
    </ThemeProvider>
  );
};

export default Root;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
