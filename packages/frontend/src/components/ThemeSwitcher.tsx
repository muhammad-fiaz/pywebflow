import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch issues

  return (
    <div className="absolute top-4 right-4 z-50">
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
