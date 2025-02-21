import ThemeSwitcher from './ThemeSwitcher';


export function Navbar() {


  return (
    <div className="pb-24">
      <header className="fixed top-0 left-0 w-full h-16 px-4 border-b border-border z-50 bg-background text-black dark:text-white flex justify-between items-center">
        <div className="flex items-center">
        </div>
        <nav className="hidden sm:flex items-center gap-4">

        </nav>
        <div className="hidden sm:flex items-center gap-4">
          <ThemeSwitcher />
        </div>

      </header>
    </div>
  );
}

export default Navbar;
