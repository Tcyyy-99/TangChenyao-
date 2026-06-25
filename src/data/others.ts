import { Project } from '../../types';

export const OTHERS_DATA: Project[] = [
  {
    id: 'other-1',
    common: {
      category: 'Others',
      image: '/covers/others/cmf/00.png',
      figmaUrl: 'https://www.figma.com/design/vKn8qtdWJkfD2MaAoS6kul/test?node-id=8-82&t=uRCoXpUlehYMDuYV-1',
      gallery: Array.from({length: 2}, (_, i) => `/covers/others/cmf/${String(i + 1).padStart(2, '0')}.png`)
    },
    zh: {
      title: '智界S7 CMF设计',
      subtitle: '',
      description: '第一次自己尝试做CMF设计。',
      role: 'CMF 设计师',
      tags: ['汽车设计', 'CMF', '材质渲染'],
      awards: ['无'],
      concept: "首次尝试系统性的CMF设计实践。通过对智界S7的色彩、材质、工艺进行深度研究，探索如何通过CMF语言传递品牌调性与产品情感。重点关注内饰材质的触感表现与视觉和谐性。",
      roleDetail: "设计与渲染：负责CMF方案设计与效果图渲染呈现。"
    },
    en: {
      title: 'AITO S7 CMF Design',
      subtitle: '',
      description: 'My first attempt at CMF design.',
      role: 'CMF Designer',
      tags: ['Automotive Design', 'CMF', 'Material Rendering'],
      awards: ['None'],
      concept: "First attempt at systematic CMF design practice. Through in-depth research on color, material, and finish of AITO S7, explored how to convey brand tone and product emotion through CMF language. Focused on tactile expression and visual harmony of interior materials.",
      roleDetail: "Design and Rendering: Responsible for CMF proposal design and rendering presentation."
    }
  },
  {
    id: 'other-2',
    common: {
      category: 'Others',
      image: '/covers/others/wudang vi/00.png',
      gallery: Array.from({length: 11}, (_, i) => `/covers/others/wudang vi/${String(i).padStart(2, '0')}.png`)
    },
    zh: {
      title: '武当山视觉识别系统',
      subtitle: '',
      description: '设计符号学的课程作业',
      role: '全包',
      tags: ['品牌设计', 'VI设计', '文旅'],
      awards: ['无'],
      concept: "为武当山打造的视觉识别系统，融合传统文化与现代设计语言",
      roleDetail: "负责整体VI系统设计与应用规范制定"
    },
    en: {
      title: 'Wudang Mountain VI System',
      subtitle: '',
      description: 'Course work for Design Semiotics',
      role: 'Full Stack',
      tags: ['Branding', 'VI Design', 'Tourism'],
      awards: ['None'],
      concept: "Visual identity system for Wudang Mountain, integrating traditional culture with modern design language",
      roleDetail: "Responsible for overall VI system design and application standards"
    }
  },
  {
    id: 'other-3',
    common: {
      category: 'Others',
      image: '/covers/others/wuhan ip/00.png',
      gallery: Array.from({length: 2}, (_, i) => `/covers/others/wuhan ip/${String(i + 1).padStart(2, '0')}.png`)
    },
    zh: {
      title: '武汉IP形象设计',
      subtitle: '',
      description: '关于家乡文化的IP设计，也是课程作业',
      role: '全包',
      tags: ['IP设计', '城市品牌', '插画'],
      awards: ['无'],
      concept: "武汉城市IP形象设计，展现城市特色与文化内涵",
      roleDetail: "负责IP形象创作与延展应用设计"
    },
    en: {
      title: 'Wuhan IP Design',
      subtitle: '',
      description: 'IP design about hometown culture, also a course work',
      role: 'Full Stack',
      tags: ['IP Design', 'City Branding', 'Illustration'],
      awards: ['None'],
      concept: "Wuhan city IP design, showcasing city characteristics and cultural connotation",
      roleDetail: "Responsible for IP image creation and extended application design"
    }
  },
  {
    id: 'other-4',
    common: {
      category: 'Others',
      image: '/covers/others/brand vi/01.png',
      gallery: Array.from({length: 3}, (_, i) => `/covers/others/brand vi/${String(i + 1).padStart(2, '0')}.png`)
    },
    zh: {
      title: '蜂花品牌视觉识别系统',
      subtitle: '品牌形象设计',
      description: '上海蜂花老字号品牌形象重塑',
      role: '品牌设计师',
      tags: ['品牌设计', 'VI系统', '老字号焕新'],
      awards: ['无'],
      concept: "上海蜂花日用品有限公司成立于1985年，拥有雄厚的技术力量和强大的生产规模。'蜂花'牌洗发水、护发素流行于中国市场。本次针对蜂花老字号进行系统的品牌形象设计，在保留品牌历史底蕴的基础上，融入现代设计语言，让经典品牌焕发新生。通过VI系统的标准化设计，建立清晰的品牌视觉识别体系，提升品牌形象的统一性与现代感。",
      roleDetail: "完成品牌标志优化、VI系统规范制定、应用场景设计等全流程工作，输出完整的品牌形象设计手册。"
    },
    en: {
      title: 'Bee & Flower Brand VI System',
      subtitle: 'Brand Identity Design',
      description: 'Brand image redesign for Shanghai Bee & Flower heritage brand',
      role: 'Brand Designer',
      tags: ['Brand Design', 'VI System', 'Heritage Brand Renewal'],
      awards: ['None'],
      concept: "Shanghai Bee & Flower Daily Chemical Co., Ltd. was founded in 1985, with strong technical capabilities and large-scale production. 'Bee & Flower' brand shampoo and conditioner are popular in the Chinese market. This project systematically redesigns the brand image of this heritage brand, integrating modern design language while preserving the brand's historical essence, giving the classic brand new life. Through standardized VI system design, establishes a clear brand visual identity system, enhancing brand image consistency and modernity.",
      roleDetail: "Completed full workflow including brand logo optimization, VI system specification development, application scenario design, and delivered complete brand identity design manual."
    }
  }
];
