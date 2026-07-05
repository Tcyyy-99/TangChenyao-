
import React from 'react';
import { NAV_ITEMS } from '../src/data/navigation';
import { Language } from '../types';
import { Moon, Sun, Globe, Zap, Home, Briefcase, FileText, GraduationCap, Mail } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  toggleLanguage: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onTriggerGravity: () => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Home,
  Briefcase,
  FileText,
  GraduationCap,
  Mail
};

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  language,
  toggleLanguage,
  theme,
  toggleTheme,
  onTriggerGravity
}) => {
  const items = NAV_ITEMS[language];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-20 bg-white dark:bg-black border-r-2 border-gray-200 dark:border-gray-800 flex-col z-50">

      {/* Logo Section */}
      <div
        className="h-14 cursor-pointer group border-b-2 border-gray-200 dark:border-gray-800 flex items-center justify-center"
        onClick={() => setActiveTab('dashboard')}
      >
        <h1 className="text-sm font-black tracking-tighter uppercase text-black dark:text-white leading-tight writing-vertical">
          TANG
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col items-center py-4 gap-2">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = ICON_MAP[item.icon] || Home;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                relative w-12 h-12 flex items-center justify-center rounded-lg
                transition-all duration-200 group
                ${isActive
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900'}
              `}
            >
              <Icon size={22} />
              {/* Hover tooltip */}
              <span className="
                pointer-events-none absolute left-full ml-3 px-3 py-1.5
                bg-black text-white dark:bg-white dark:text-black
                text-xs font-bold uppercase tracking-wide
                rounded-md whitespace-nowrap
                opacity-0 -translate-x-1
                group-hover:opacity-100 group-hover:translate-x-0
                transition-all duration-200
                z-50
              ">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Controls */}
      <div className="p-4 border-t-2 border-gray-200 dark:border-gray-800 flex flex-col items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-gray-600 dark:text-gray-400"
          aria-label="theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-gray-600 dark:text-gray-400 text-xs font-bold"
          aria-label="language"
        >
          {language === 'zh' ? 'EN' : '中'}
        </button>

        {/* Gravity Easter Egg */}
        <button
          onClick={onTriggerGravity}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-gray-600 dark:text-gray-400"
          aria-label="gravity"
        >
          <Zap size={18} />
        </button>
      </div>
    </aside>

    {/* Mobile Bottom Navigation */}
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white dark:bg-black border-t-2 border-gray-200 dark:border-gray-800 z-50">
      <div className="flex justify-around items-center h-full">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = ICON_MAP[item.icon] || Home;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center h-full transition-colors
                ${isActive
                  ? 'text-black dark:text-white'
                  : 'text-gray-400'}
              `}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </div>
    </nav>
    </>
  );
};
