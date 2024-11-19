import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

interface LayoutProps {
  children: ReactNode;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const Layout = ({ children, isDarkMode, setIsDarkMode }: LayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar isDarkMode={isDarkMode} />
      <main className="flex-1 p-6 pb-24 lg:pb-6 overflow-auto">
        {children}
      </main>
      <MobileNav isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
};

export default Layout;