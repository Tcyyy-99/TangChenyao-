import { Language, Category } from '../../types';

export interface HeroItem {
  text: string;
  annotation: string;
  category: Category | null;
}

export interface HomeContent {
  heroItems: HeroItem[];
  intro: string;
  selectedWorks: string;
  years: string;
}

export const HOME_DATA: Record<Language, HomeContent> = {
  zh: {
    heroItems: [
      { text: "交互设计", annotation: "", category: Category.INTERACTION },
      { text: "产品设计", annotation: "", category: Category.PRODUCT },
      { text: "其他", annotation: "", category: Category.OTHERS },
    ],
    intro: "已识乾坤大,犹怜草木青",
    selectedWorks: "精选作品",
    years: "[ 2020 — 2026 ]"
  },
  en: {
    heroItems: [
      { text: "Interaction Design", annotation: "", category: Category.INTERACTION },
      { text: "Product Design", annotation: "", category: Category.PRODUCT },
      { text: "Others", annotation: "", category: Category.OTHERS },
    ],
    intro: "Explorer focused on interaction design and product innovation",
    selectedWorks: "Selected Works",
    years: "[ 2020 — 2026 ]"
  }
};
