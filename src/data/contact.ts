import { Language } from '../../types';

export interface SocialLinks {
  wechat: string;
  xiaohongshu: string;
  bilibili: string;
  px500: string;
}

export interface ContactContent {
  baseLabel: string;
  locationValue: string;
  contactLabel: string;
  emailMeLabel: string;
  email: string;
  hello: string;
  intro: string;
  socials: SocialLinks;
  tooltip?: string;
  githubLabel: string;
  footerDesign: string;
}

export const CONTACT_DATA: Record<Language, ContactContent> = {
  zh: {
    baseLabel: "BASE",
    locationValue: "武汉, 中国",
    contactLabel: "取得联系",
    emailMeLabel: "邮箱",
    email: "2685993495.com",
    hello: "你好 ;-)",
    intro: "欢迎找我聊天。",
    socials: {
      wechat: "18857444199",
      xiaohongshu: "742330619",
    },
    githubLabel: "GitHub",
    footerDesign: "Powered by Gemini 3 Pro"
  },
  en: {
    baseLabel: "BASE",
    locationValue: "Shenzhen, China",
    contactLabel: "Get in touch",
    emailMeLabel: "Email Me",
    email: "2685993495@qq.com",
    hello: "Hello ;-)",
    intro: "Welcome to discuss & cooperate.",
    socials: {
      wechat: "YourWeChatID",
      xiaohongshu: "18857444199",
    },
    githubLabel: "GitHub",
    footerDesign: "Powered by Gemini 3 Pro"
  }
};
