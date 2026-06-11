import { Language, Experience, HonorsData } from '../../types';

export interface EducationPageContent {
  title: string;
  about: string;
  openToWork: string;
  viewHonorsLabel: string;
  honorsTitle: string;
  competitionsTitle: string;
  scholarshipsLabel: string;
  titlesLabel: string;
  experiences: Experience[];
  honors: HonorsData;
}

export const EDUCATION_DATA: Record<Language, EducationPageContent> = {
  zh: {
    title: "教育经历",
    about: "唐晨瑶 | 设计生搬砖中",
    openToWork: "等待实习",
    viewHonorsLabel: "查看在校荣誉",
    honorsTitle: "在校荣誉",
    competitionsTitle: "竞赛奖项",
    scholarshipsLabel: "奖学金",
    titlesLabel: "荣誉称号",
    experiences: [
      {
        id: '1',
        year: '2024.09 - 至今',
        title: '工业设计工程 | 硕士',
        institution: '河海大学',
        description: '平均加权成绩 88.9，28/152\n主修课程：用户体验、设计美学、产品设计工程、设计符号学、人机工程学',
        type: 'education'
      },
      {
        id: '2',
        year: '2020.09 - 2024.06',
        title: '工业设计 | 本科',
        institution: '宁波大学',
        description: '平均学分绩点 3.75，10/98\n主修课程：品牌形象设计、计算机2D、产品三维建模、数字媒体设计',
        type: 'education'
      }
    ],
    honors: {
      scholarships: ["国家奖学金二等奖（2024年、2026年）"],
      titles: ["优秀团员"],
      competitions: [
        {
          level: "国家级",
          awards: [
            "三等奖 | NCDA全国高校数字艺术设计大赛全国总决赛",
            "三等奖 | 2023米兰设计周中国高校设计学科师生优秀作品展"
          ]
        },
        {
          level: "省级",
          awards: [
            "一等奖 | NCDA全国高校数字艺术设计大赛浙江赛区",
            "三等奖 | NCDA全国高校数字艺术设计大赛浙江赛区",
            "二等奖 | 浙江省工业设计大赛"
          ]
        }
      ]
    }
  },
  en: {
    title: "Education",
    about: "Chenyao Tang | Focus on Interaction Design and Product Innovation",
    openToWork: "Learning by Doing + Seeking Internship",
    viewHonorsLabel: "View Honors & Awards",
    honorsTitle: "Honors & Awards",
    competitionsTitle: "Competition Awards",
    scholarshipsLabel: "Scholarships",
    titlesLabel: "Honorary Titles",
    experiences: [
      {
        id: '1',
        year: '2024.09 - Present',
        title: 'Industrial Design Engineering | Master',
        institution: 'Hohai University',
        description: 'Weighted Average Score: 88.9, Rank: 28/152\nMain Courses: User Experience, Design Aesthetics, Product Design Engineering, Design Semiotics, Ergonomics',
        type: 'education'
      },
      {
        id: '2',
        year: '2020.09 - 2024.06',
        title: 'Industrial Design | Bachelor',
        institution: 'Ningbo University',
        description: 'GPA: 3.75, Rank: 10/98\nMain Courses: Brand Image Design, Computer 2D, Product 3D Modeling, Digital Media Design',
        type: 'education'
      }
    ],
    honors: {
      scholarships: ["National Scholarship Second Prize (2024, 2026)"],
      titles: ["Outstanding League Member"],
      competitions: [
        {
          level: "National",
          awards: [
            "Third Prize | NCDA National College Digital Art Design Competition National Finals",
            "Third Prize | 2023 Milan Design Week China University Design Outstanding Works Exhibition"
          ]
        },
        {
          level: "Provincial",
          awards: [
            "First Prize | NCDA Zhejiang Division",
            "Third Prize | NCDA Zhejiang Division",
            "Second Prize | Zhejiang Industrial Design Competition"
          ]
        }
      ]
    }
  }
};