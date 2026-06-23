import { Project } from '../../types';

export const RESEARCH_DATA: Project[] = [
  {
    id: 'research-1',
    common: {
      category: 'Market Research',
      image: '/covers/research analysis/game female analize/00.jpg',
      gallery: Array.from({length: 17}, (_, i) => `/covers/research analysis/game female analize/${String(i).padStart(2, '0')}.jpg`)
    },
    zh: {
      title: '"玩托邦"中的性别实践',
      subtitle: '游戏文化专题调研',
      description: '中国女玩家对游戏女性角色认知调研',
      role: '视觉整理组员',
      tags: ['游戏文化调研', '性别叙事研究', '素材整理', '报告排版'],
      awards: ['无'],
      roleDetail: "小组作业，敲定调研选题，搜集整理文献与游戏案例素材，完成报告配图整理与整体排版。"
    },
    en: {
      title: 'Gender Practice in "Playertopia"',
      subtitle: 'Game Culture Research',
      description: 'Research on Chinese female gamers\' perception of female characters in games',
      role: 'Visual Organization Member',
      tags: ['Game Culture Research', 'Gender Narrative Study', 'Material Organization', 'Report Layout'],
      awards: ['None'],
      roleDetail: "Group project: finalized research topic, collected and organized literature and game case materials, completed report illustration organization and overall layout."
    }
  },
  {
    id: 'research-2',
    common: {
      category: 'Market Research',
      image: '/covers/research analysis/Y2K & Balletcore/00.jpg',
      gallery: Array.from({length: 13}, (_, i) => `/covers/research analysis/Y2K & Balletcore/${String(i).padStart(2, '0')}.jpg`)
    },
    zh: {
      title: 'Y2K与Balletcore双风格时尚趋势分析',
      subtitle: '时尚趋势研究',
      description: '对比解析Y2K千禧辣妹风与Balletcore芭蕾少女风两大主流时尚风格',
      role: '视觉策划组员',
      tags: ['时尚趋势', '风格调研', '版式设计', '素材整理'],
      awards: ['无'],
      roleDetail: "小组作业，参与项目前期创意构思，负责报告配图素材搜集，后期统一整套调研手册的版式排版。"
    },
    en: {
      title: 'Y2K & Balletcore Fashion Trend Analysis',
      subtitle: 'Fashion Trend Research',
      description: 'Comparative analysis of Y2K millennium spicy girl style and Balletcore ballet girl style',
      role: 'Visual Planning Member',
      tags: ['Fashion Trend', 'Style Research', 'Layout Design', 'Material Organization'],
      awards: ['None'],
      roleDetail: "Group project: participated in early creative concept, responsible for report illustration material collection, and unified the layout of the entire research manual in post-production."
    }
  },
  {
    id: 'research-3',
    common: {
      category: 'Market Research',
      image: '/covers/research analysis/branding/00.jpg',
      gallery: Array.from({length: 55}, (_, i) => `/covers/research analysis/branding/${String(i).padStart(2, '0')}.jpg`)
    },
    zh: {
      title: '时装品牌市场调研分析',
      subtitle: '品牌研究',
      description: '多组时装品牌深度调研，聚焦品牌定位、视觉风格与受众分析',
      role: '视觉策划组员',
      tags: ['品牌研究', '市场调研', '版式设计', '素材整理'],
      awards: ['无'],
      roleDetail: "小组完成多组时装品牌深度调研，聚焦品牌定位、视觉风格与受众分析，完成整本调研报告整合输出。"
    },
    en: {
      title: 'Fashion Brand Market Research Analysis',
      subtitle: 'Brand Research',
      description: 'In-depth research on multiple fashion brands, focusing on brand positioning, visual style and audience analysis',
      role: 'Visual Planning Member',
      tags: ['Brand Research', 'Market Research', 'Layout Design', 'Material Organization'],
      awards: ['None'],
      roleDetail: "Group completed in-depth research on multiple fashion brands, focusing on brand positioning, visual style and audience analysis, and completed the integration and output of the entire research report."
    }
  }
];
