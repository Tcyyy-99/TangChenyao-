import { Language } from '../../types';

export const NAV_ITEMS: Record<Language, { id: string; label: string; icon: string }[]> = {
  zh: [
    { id: 'dashboard', label: '主页', icon: 'Home' },
    { id: 'portfolio', label: '作品', icon: 'Briefcase' },
    { id: 'articles', label: '文章', icon: 'FileText' },
    { id: 'about', label: '经历', icon: 'GraduationCap' },
    { id: 'contact', label: '联系', icon: 'Mail' }
  ],
  en: [
    { id: 'dashboard', label: 'Home', icon: 'Home' },
    { id: 'portfolio', label: 'Portfolio', icon: 'Briefcase' },
    { id: 'articles', label: 'Articles', icon: 'FileText' },
    { id: 'about', label: 'About', icon: 'GraduationCap' },
    { id: 'contact', label: 'Contact', icon: 'Mail' }
  ]
};
