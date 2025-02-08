import React from 'react';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  // Use the theme value if available, otherwise fall back to resolvedTheme.
  const currentTheme = theme || resolvedTheme;

  return (
    <div className="absolute top-4 right-4 z-50 text-foreground">
      <button
        onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
        className="p-2 focus:outline-none"
      >
        {currentTheme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
