import './styles.ts';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'next-themes';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(<ThemeProvider />);
