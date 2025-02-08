import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import '@xyflow/react/dist/style.css';

import { ThemeProvider } from 'next-themes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
