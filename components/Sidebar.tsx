
import React from 'react';
import { NAV_ITEMS } from '../src/data/navigation';
import { Language } from '../types';
import { Moon, Sun, Globe, Bomb } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  toggleLanguage: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onTriggerGravity: () => void;
}

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
    <aside className="hidden md:flex fixed top-0 left-0 h-screen w-40 bg-white dark:bg-black border-r-2 border-gray-200 dark:border-gray-800 flex-col z-50">
      
      {/* Logo Section */}
      <div 
        className="h-14 px-6 cursor-pointer group border-b-2 border-gray-200 dark:border-gray-800 flex items-center"
        onClick={() => setActiveTab('dashboard')}
      >
        <h1 className="text-lg font-black tracking-tighter uppercase text-black dark:text-white leading-tight">
          TANG
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full px-8 py-4 text-center text-lg font-bold uppercase tracking-wide
                transition-all duration-200 relative
                ${isActive 
                  ? 'text-black dark:text-white bg-gray-100 dark:bg-gray-900' 
                  : 'text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900/50'}
              `}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-black dark:bg-white"></span>
              )}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom Controls */}
      <div className="p-6 border-t-2 border-gray-200 dark:border-gray-800 space-y-3">
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-gray-600 dark:text-gray-400"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          <span className="text-sm font-bold uppercase tracking-wide">
            {theme === 'dark' ? (language === 'zh' ? '浅色' : 'Light') : (language === 'zh' ? '深色' : 'Dark')}
          </span>
        </button>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-gray-600 dark:text-gray-400"
        >
          <Globe size={20} />
          <span className="text-sm font-bold uppercase tracking-wide">
            {language === 'zh' ? 'EN' : '中文'}
          </span>
        </button>

        {/* Gravity Easter Egg */}
        <button
          onClick={onTriggerGravity}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-gray-600 dark:text-gray-400"
        >
          <Bomb size={20} />
          <span className="text-sm font-bold uppercase tracking-wide">
            {language === 'zh' ? '重力' : 'Gravity'}
          </span>
        </button>
      </div>
    </aside>
  );
};
