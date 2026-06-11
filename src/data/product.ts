import { Project } from '../../types';

export const PRODUCT_DATA: Project[] = [
  {
    id: 'prod-1',
    common: {
      category: 'Product Design',
      image: '/covers/product design/bachelor id/00.png',
      gallery: Array.from({length: 5}, (_, i) => `/covers/product design/bachelor id/${String(i).padStart(2, '0')}.png`)
    },
    zh: {
      title: '本科毕业设计',
      subtitle: '',
      description: '为更年期女性睡眠障碍设计的一款智能穿戴眼罩',
      role: '全包',
      tags: ['工业设计', '产品开发'],
      awards: ['无'],
      concept: "本产品针对更年期女性普遍存在的睡眠障碍问题进行设计，产品采用制冷机，眼罩，耳机，颈枕四合一的方式，为更年期女性带来更佳的睡眠体验。",
      roleDetail: "我自己的毕设，全是我干的"
    },
    en: {
      title: 'Bachelor Graduation Project',
      subtitle: '',
      description: 'A smart wearable eye mask designed for menopausal women with sleep disorders',
      role: 'Full Stack',
      tags: ['Industrial Design', 'Product Development'],
      awards: ['None'],
      concept: "This product is designed for the common sleep disorder problem among menopausal women. The product adopts a four-in-one approach of cooling device, eye mask, headphones, and neck pillow, bringing a better sleep experience for menopausal women.",
      roleDetail: "My graduation project, completely done by myself"
    }
  },
  {
    id: 'prod-2',
    common: {
      category: 'Product Design',
      image: '/covers/product design/ewalking/00.png',
      gallery: Array.from({length: 12}, (_, i) => `/covers/product design/ewalking/${String(i).padStart(2, '0')}.png`)
    },
    zh: {
      title: 'E-Walking 辅助鞋具设计',
      subtitle: '',
      description: '针对帕金森患者的步态障碍进行设计',
      role: '产品设计',
      tags: ['产品设计', '智能硬件'],
      awards: ['无'],
      concept: "本产品针对帕金森患者的最严重的步态障碍——冻结步态进行设计。产品运用了激光投影装置、鞋底振动刺激模块、步态压力感应器等装置，为帕金森患者带来更佳的行走体验。该辅助鞋不仅能辅助帕金森患者缓解冻结步态，其科技时尚的外观也满足了用户的审美需求。此外，本产品采用了一键后开口的穿鞋方式，以最符合用户穿脱习惯的方式方便用户的使用体验。",
      roleDetail: "负责前期用户研究分析、方案发散与渲染设计"
    },
    en: {
      title: 'E-Walking Assistive Footwear Design',
      subtitle: '',
      description: 'Designed for gait disorders in Parkinson\'s patients',
      role: 'Product Design',
      tags: ['Product Design', 'Smart Hardware'],
      awards: ['None'],
      concept: "This product is designed for the most severe gait disorder in Parkinson's patients - freezing of gait. The product utilizes laser projection devices, sole vibration stimulation modules, gait pressure sensors and other devices to bring a better walking experience for Parkinson's patients. This assistive shoe not only helps Parkinson's patients alleviate freezing gait, but its tech-fashionable appearance also meets users' aesthetic needs. In addition, the product adopts a one-button rear opening method, facilitating user experience in the most comfortable way for putting on and taking off shoes.",
      roleDetail: "Responsible for early-stage user research analysis, concept generation, and rendering design"
    }
  },
  {
    id: 'prod-3',
    common: {
      category: 'Product Design',
      image: '/covers/product design/green design/01.png',
      gallery: Array.from({length: 10}, (_, i) => `/covers/product design/green design/${String(i + 1).padStart(2, '0')}.png`)
    },
    zh: {
      title: '本科课程作业水泥花',
      subtitle: '',
      description: '绿色可持续产品设计',
      role: '产品设计师',
      tags: ['可持续设计', '环保'],
      awards: ['无'],
      concept: "绿色可持续设计理念",
      roleDetail: "小组作业，大家一起来做的"
    },
    en: {
      title: 'Undergraduate Course Work - Cement Flower',
      subtitle: '',
      description: 'Green sustainable product design',
      role: 'Product Designer',
      tags: ['Sustainable Design', 'Eco-friendly'],
      awards: ['None'],
      concept: "Green sustainable design concept",
      roleDetail: "Group project, worked together with team"
    }
  },
  {
    id: 'prod-4',
    common: {
      category: 'Product Design',
      image: '/covers/product design/nanjingbes/01.jpg',
      gallery: Array.from({length: 12}, (_, i) => `/covers/product design/nanjingbes/${String(i + 1).padStart(2, '0')}.jpg`)
    },
    zh: {
      title: '南京大报恩寺文创项目',
      subtitle: '',
      description: '基于大报恩寺的一款快客杯便携式户外套装',
      role: '产品设计师',
      tags: ['产品设计', '创新设计'],
      awards: ['无'],
      concept: "本产品是基于大报恩寺的一款快客杯便携式户外套装。茶盖和茶壶提炼了琉璃塔的形态，茶漏提炼了莲花盛开的形态，并且模拟了大报恩寺塔上风铃的形态，玻璃与陶瓷相互结合，这样光与影的碰撞，现代与历史的融合，形成了时间沙漏，仿佛新旧琉璃塔的千年对望",
      roleDetail: "主要负责产品视觉排版和渲染、包装设计"
    },
    en: {
      title: 'Nanjing Bao\'en Temple Cultural Creative Project',
      subtitle: '',
      description: 'A portable outdoor tea set based on Bao\'en Temple\'s quick-serve cup',
      role: 'Product Designer',
      tags: ['Product Design', 'Innovation'],
      awards: ['None'],
      concept: "This product is a portable outdoor tea set based on Bao'en Temple's quick-serve cup. The tea lid and teapot extract the form of the glazed tower, the tea strainer extracts the form of blooming lotus, and simulates the wind chime form of Bao'en Temple tower. Glass and ceramics combine with each other, creating a collision of light and shadow, a fusion of modern and history, forming an hourglass of time, as if the millennium gaze between the old and new glazed towers.",
      roleDetail: "Mainly responsible for product visual layout and rendering, packaging design"
    }
  },
  {
    id: 'prod-5',
    common: {
      category: 'Product Design',
      image: '/covers/product design/pet_product/00.png',
      gallery: Array.from({length: 5}, (_, i) => `/covers/product design/pet_product/${String(i).padStart(2, '0')}.png`)
    },
    zh: {
      title: '宠物喂食器设计',
      subtitle: '',
      description: '和上海凡爱公司校企合作的宠物喂食器设计',
      role: '产品设计师',
      tags: ['宠物用品', '产品创新'],
      awards: ['NCDA国家三等奖、东方设计一等奖'],
      concept: "宠物产品创新设计",
      roleDetail: "也是小组作业，主要是负责动画设计"
    },
    en: {
      title: 'Pet Feeder Design',
      subtitle: '',
      description: 'Pet feeder design in collaboration with Shanghai Fan\'ai Company',
      role: 'Product Designer',
      tags: ['Pet Products', 'Innovation'],
      awards: ['NCDA National Third Prize, Oriental Design First Prize'],
      concept: "Pet product innovation design",
      roleDetail: "Group project, mainly responsible for animation design"
    }
  },
  {
    id: 'prod-6',
    common: {
      category: 'Product Design',
      image: '/covers/product design/westlake/00.png',
      gallery: Array.from({length: 4}, (_, i) => `/covers/product design/westlake/${String(i).padStart(2, '0')}.png`)
    },
    zh: {
      title: '西湖文创设计',
      subtitle: '',
      description: '由"断桥残雪"联想来的一个夜灯设计',
      role: '全包',
      tags: ['产品设计', '文创'],
      awards: ['无'],
      concept: "'断桥残雪'是西湖十景中著名的景点，是传说白娘子许仙相遇之处。每到冬天，当雪下满江南时，这里更是成为许多人心目中的圣地。本产品融入了断桥残雪的外形特征，是一款为异地情侣设计的一款感应夜灯。当两人都回到家将钥匙放在也夜灯上，即可自动亮起。",
      roleDetail: "文创产品设计"
    },
    en: {
      title: 'West Lake Cultural Creative Design',
      subtitle: '',
      description: 'A night light design inspired by "Broken Bridge and Lingering Snow"',
      role: 'Full Stack',
      tags: ['Product Design', 'Cultural Creative'],
      awards: ['None'],
      concept: "\"Broken Bridge and Lingering Snow\" is a famous scenic spot among the Ten Scenes of West Lake, the legendary place where Lady White Snake and Xu Xian met. Every winter, when snow falls across the south of the Yangtze River, this place becomes a holy land in many people's hearts. This product incorporates the morphological characteristics of Broken Bridge and Lingering Snow, and is a sensing night light designed for long-distance couples. When both return home and place their keys on the night light, it automatically lights up.",
      roleDetail: "Cultural creative product design"
    }
  },
  {
    id: 'prod-7',
    common: {
      category: 'Product Design',
      image: '/covers/product design/Fragrance Design/01.png',
      gallery: Array.from({length: 2}, (_, i) => `/covers/product design/Fragrance Design/${String(i + 1).padStart(2, '0')}.png`)
    },
    zh: {
      title: '功夫香氛产品设计',
      subtitle: '',
      description: '做着好玩的一个产品，联想应该是中国武侠和《影》',
      role: '全包',
      tags: ['香氛设计', '产品创新'],
      awards: ['无'],
      concept: "香氛产品创新设计",
      roleDetail: "负责香氛产品设计"
    },
    en: {
      title: 'Kung Fu Fragrance Product Design',
      subtitle: '',
      description: 'A fun product to create, inspired by Chinese martial arts and the movie "Shadow"',
      role: 'Full Stack',
      tags: ['Fragrance Design', 'Innovation'],
      awards: ['None'],
      concept: "Fragrance product innovation design",
      roleDetail: "Responsible for fragrance product design"
    }
  },
  {
    id: 'prod-8',
    common: {
      category: 'Product Design',
      image: '/covers/product design/bbq shelf/00.png',
      gallery: ['/covers/product design/bbq shelf/Frame 1.png']
    },
    zh: {
      title: 'Grilling结构设计',
      subtitle: '',
      description: '结构设计课程作业，用PROE做的',
      role: '全包',
      tags: ['产品设计', '户外用品'],
      awards: ['浙江省工业设计大赛二等奖'],
      concept: "'Grilling'是一款可折叠户外便携烧烤架的设计，设计灵感来源于雨伞和小马扎的折叠方式，在家存放或携带时，可折叠收起，需要时亦可轻松展开，满足家庭日常需求使您享受烧烤乐趣。",
      roleDetail: "负责结构设计"
    },
    en: {
      title: 'Grilling Structural Design',
      subtitle: '',
      description: 'Structural design course work, created with PROE',
      role: 'Full Stack',
      tags: ['Product Design', 'Outdoor Equipment'],
      awards: ['Zhejiang Provincial Industrial Design Competition Second Prize'],
      concept: "\"Grilling\" is a foldable outdoor portable barbecue grill design. The design inspiration comes from the folding methods of umbrellas and small folding stools. It can be folded and stored at home or carried around, and easily expanded when needed, meeting daily household needs and allowing you to enjoy the fun of barbecue.",
      roleDetail: "Responsible for structural design"
    }
  }
];
