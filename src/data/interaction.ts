import { Project } from '../../types';

export const INTERACTION_DATA: Project[] = [
  {
    id: 'int-1',
    common: {
      category: 'Interaction Design',
      image: '/covers/interact design/szls/01.png',
      figmaUrl: 'https://www.figma.com/design/vKn8qtdWJkfD2MaAoS6kul/test?node-id=0-1&t=uRCoXpUlehYMDuYV-1',
      gallery: Array.from({length: 18}, (_, i) => `/covers/interact design/szls/${String(i + 1).padStart(2, '0')}.png`)
    },
    zh: {
      title: '特变电工变压器数字孪生',
      subtitle: '',
      description: '根据Unity平台开发的数字孪生项目，也是我的毕业设计。',
      role: '交互设计师',
      tags: ['Unity', '数字孪生', '交互设计'],
      awards: ['无'],
      concept: "研二的实践项目。通过Unity引擎实现变压器的三维可视化与交互操作，为工业设备管理提供直观的数字化解决方案。",
      roleDetail: "全包：负责整个项目的设计与开发工作。"
    },
    en: {
      title: 'TBEA Transformer Digital Twin',
      subtitle: '',
      description: 'A digital twin project developed on Unity platform, also my graduation project.',
      role: 'Interaction Designer',
      tags: ['Unity', 'Digital Twin', 'Interaction Design'],
      awards: ['None'],
      concept: "Graduate research project during second year. Realized 3D visualization and interactive operations of transformers through Unity engine, providing intuitive digital solutions for industrial equipment management.",
      roleDetail: "Full responsibility: Designed and developed the entire project."
    }
  },
  {
    id: 'int-2',
    common: {
      category: 'Interaction Design',
      image: '/covers/interact design/pet-app/宠物01.png',
      figmaUrl: 'https://www.figma.com/design/vKn8qtdWJkfD2MaAoS6kul/test?node-id=8-2&t=uRCoXpUlehYMDuYV-1',
      gallery: Array.from({length: 17}, (_, i) => `/covers/interact design/pet-app/宠物${String(i + 1).padStart(2, '0')}.png`)
    },
    zh: {
      title: '一站式宠物同游App',
      subtitle: '',
      description: '从朋友一个托运app重新发散改的。',
      role: 'UI/UX 设计师',
      tags: ['移动应用', 'UI设计', '宠物服务'],
      awards: ['无'],
      concept: "基于宠物出行场景的深度洞察，将单一托运功能扩展为涵盖宠物友好地点推荐、同城宠友社交、出行攻略等一站式服务平台。通过优化用户流程和视觉层级，让宠物主人的每次出行更便捷、更安心。",
      roleDetail: "低保真/高保真设计：负责原型设计与高保真界面设计。"
    },
    en: {
      title: 'Pet Travel Companion App',
      subtitle: '',
      description: 'Redesigned and expanded from a friend\'s pet transportation app.',
      role: 'UI/UX Designer',
      tags: ['Mobile App', 'UI Design', 'Pet Service'],
      awards: ['None'],
      concept: "Based on deep insights into pet travel scenarios, expanded from single transportation function to a one-stop service platform including pet-friendly location recommendations, local pet community, and travel guides. Optimized user flows and visual hierarchy to make every trip more convenient and reassuring for pet owners.",
      roleDetail: "Low-fidelity/High-fidelity Design: Responsible for prototyping and high-fidelity interface design."
    }
  },
  {
    id: 'int-3',
    common: {
      category: 'Interaction Design',
      image: '/covers/interact design/sevice design/00.png',
      gallery: Array.from({length: 12}, (_, i) => `/covers/interact design/sevice design/${String(i).padStart(2, '0')}.png`)
    },
    zh: {
      title: '关于校园垃圾回收的服务设计',
      subtitle: '',
      description: '第一次做服务设计，主要是想积累下项目',
      role: '全包',
      tags: ['服务设计', '用户体验'],
      awards: ['无'],
      concept: "主要是考虑整体回收系统，app与硬件端支持的联动",
      roleDetail: "负责服务流程设计与用户体验优化"
    },
    en: {
      title: 'Campus Waste Recycling Service Design',
      subtitle: '',
      description: 'My first service design project, mainly for project accumulation',
      role: 'Full Stack',
      tags: ['Service Design', 'UX'],
      awards: ['None'],
      concept: "Focused on the overall recycling system and the integration between app and hardware support",
      roleDetail: "Responsible for service flow design and user experience optimization"
    }
  },
  {
    id: 'int-4',
    common: {
      category: 'Interaction Design',
      image: '/covers/interact design/easenet ux/01.png',
      gallery: Array.from({length: 5}, (_, i) => `/covers/interact design/easenet ux/${String(i + 1).padStart(2, '0')}.png`)
    },
    zh: {
      title: '网易UX总结',
      subtitle: '',
      description: '实习期间完成的UX设计总结与实践',
      role: 'UX 设计师',
      tags: ['UX设计', '用户研究', '交互设计'],
      awards: ['无'],
      concept: "在网易实习期间，对用户体验设计流程和方法论进行系统性总结。从用户研究、信息架构到交互设计，完整呈现了UX设计实践。",
      roleDetail: "负责用户研究、交互设计及UX方法论总结"
    },
    en: {
      title: 'NetEase UX Summary',
      subtitle: '',
      description: 'UX design summary and practice completed during internship',
      role: 'UX Designer',
      tags: ['UX Design', 'User Research', 'Interaction Design'],
      awards: ['None'],
      concept: "During my internship at NetEase, I systematically summarized the UX design process and methodology. From user research and information architecture to interaction design, presenting a complete UX design practice.",
      roleDetail: "Responsible for user research, interaction design, and UX methodology summary"
    }
  }
];
