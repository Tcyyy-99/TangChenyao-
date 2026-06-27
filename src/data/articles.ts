import { Language } from '../../types';

export interface ArticlesPageContent {
  title: string;
  description: string;
}

export const ARTICLES_PAGE_DATA: Record<Language, ArticlesPageContent> = {
  zh: {
    title: '文章',
    description: '游戏交互拆解与项目开发日志。'
  },
  en: {
    title: 'Articles',
    description: 'Game interaction analysis and project development logs.'
  }
};

// Article categories/projects
export interface ArticleProject {
  id: string;
  name: string;
  articles: ArticleItem[];
}

export interface ArticleItem {
  id: string;
  title: string;
  date: string;
  contentPath: string; // Path to markdown file
}

export const ARTICLE_PROJECTS: ArticleProject[] = [
  {
    id: 'game-ux',
    name: 'GAME UX',
    articles: [
      {
        id: 'simulation-management-ux',
        title: '模拟经营游戏UX分析',
        date: '2026-06-27',
        contentPath: '/articles/GAME UX/simulation-management-ux-analysis.md'
      },
      {
        id: 'zelda-botw-ux',
        title: '开放世界游戏UX分析',
        date: '2026-06-27',
        contentPath: '/articles/GAME UX/zelda-botw-ux-analysis.md'
      },
      {
        id: 'love-and-deep-space-ux',
        title: '乙女游戏情感UX分析',
        date: '2026-06-27',
        contentPath: '/articles/GAME UX/love-and-deep-space-ux-analysis.md'
      },
      {
        id: 'lok-kingdom-ux',
        title: '捉宠品类游戏UX分析',
        date: '2026-06-27',
        contentPath: '/articles/GAME UX/lok-kingdom-ux-analysis.md'
      },
      {
        id: 'ps4-porting-ux',
        title: 'PC/主机双端游戏UX分析',
        date: '2026-06-27',
        contentPath: '/articles/GAME UX/ps4-porting-ux-analysis.md'
      },
      {
        id: 'overseas-ux',
        title: '出海游戏偏好分析',
        date: '2026-06-27',
        contentPath: '/articles/GAME UX/overseas-game-ui-preference.md'
      },
      {
        id: 'splatoon3-brand',
        title: '喷射战士品牌设计分析',
        date: '2026-06-27',
        contentPath: '/articles/GAME UX/splatoon3-brand-design.md'
      },
      {
        id: 'animal-crossing-social',
        title: '动物森友会社交设计分析',
        date: '2026-06-27',
        contentPath: '/articles/GAME UX/animal-crossing-social-design.md'
      },
      {
        id: 'stardew-valley',
        title: '星露谷物语设计分析',
        date: '2026-06-27',
        contentPath: '/articles/GAME UX/stardew-valley-design-analysis.md'
      },
      {
        id: 'yanyun16-photo',
        title: '燕云十六声拍照功能设计',
        date: '2026-06-27',
        contentPath: '/articles/GAME UX/yanyun16-photo-design.md'
      }
    ]
  },
  {
    id: 'vibecoding',
    name: 'Vibe Portfolio',
    articles: [
      {
        id: 'codemaker-tutorial',
        title: '0-1制作上线个人网站日志',
        date: '2026-06-27',
        contentPath: '/articles/Vibecoding portfolio/codemaker-tutorial.md'
      }
    ]
  },
  {
    id: 'digital-twin',
    name: 'DigitalTwin',
    articles: [
      {
        id: 'transformer-digital-twin',
        title: '变压器数字孪生项目实施文档',
        date: '2026-06-27',
        contentPath: '/articles/Digital Twin Development/变压器数字孪生项目实施指导文档.md'
      }
    ]
  }
];
