import { Category, Project, Experience, Skill, Language, HonorsData } from './types';
import { Sparkles, Image, History, Send } from 'lucide-react';
import { PROJECT_DATA } from './src/data/projects';

export const CATEGORY_LABELS: Record<Language, Record<string, string>> = {
  zh: {
    'All': '全部',
    'Interaction Design': '交互设计',
    'Product Design': '产品设计',
    'Research Analysis': '调研分析',
    'Others': '其他',
    'Videography': '动态影像',
    'Graphics & UI': '平面交互',
    'Photography': '静态摄影',
    'Development': '应用开发'
  },
  en: {
    'All': 'All',
    'Interaction Design': 'Interaction Design',
    'Product Design': 'Product Design',
    'Research Analysis': 'Research Analysis',
    'Others': 'Others',
    'Videography': 'Videography',
    'Graphics & UI': 'Graphics & UI',
    'Photography': 'Photography',
    'Development': 'Development'
  }
};

export const PROJECTS: Record<Language, Project[]> = {
  zh: PROJECT_DATA.map(p => ({
    id: p.id,
    ...p.common,
    ...p.zh,
    // Inject bilingual title for fallback UI
    bilingualTitle: {
      zh: p.zh.title,
      en: p.en.title
    }
  })),
  en: PROJECT_DATA.map(p => ({
    id: p.id,
    ...p.common,
    ...p.en,
    // Inject bilingual title for fallback UI
    bilingualTitle: {
      zh: p.zh.title,
      en: p.en.title
    }
  }))
};
