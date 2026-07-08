import React, { useState } from 'react';
import { PROJECTS, CATEGORY_LABELS } from '../constants';
import { Language, Category, Project } from '../types';

interface CategoryStackCardsProps {
  language: Language;
  onCategorySelect: (category: Category) => void;
}

interface CategoryItem {
  id: Category;
  label: string;
  count: number;
  projects: Project[];
}

export const CategoryStackCards: React.FC<CategoryStackCardsProps> = ({ language, onCategorySelect }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const allProjects = PROJECTS[language];

  const categoryDefs: Category[] = [
    Category.INTERACTION,
    Category.PRODUCT,
    Category.RESEARCH,
    Category.OTHERS,
  ];

  const categories: CategoryItem[] = categoryDefs
    .map(id => {
      const projects = allProjects.filter(p => p.category === id);
      return {
        id,
        label: CATEGORY_LABELS[language][id],
        count: projects.length,
        projects,
      };
    })
    .filter(c => c.count > 0);

  // Layout config: staggered offsets (in %)
  const layouts = [
    { row: 0, col: 0, w: 62, offsetX: 0,  bg: 'bg-yellow-300 dark:bg-yellow-400' },
    { row: 0, col: 1, w: 62, offsetX: 38, bg: 'bg-gray-200 dark:bg-gray-700' },
    { row: 1, col: 0, w: 62, offsetX: 8,  bg: 'bg-gray-100 dark:bg-gray-800' },
    { row: 1, col: 1, w: 62, offsetX: 45, bg: 'bg-gray-300 dark:bg-gray-600' },
  ];

  return (
    <div className="relative w-full aspect-[4/3] max-w-[520px] select-none">
      {categories.map((cat, idx) => {
        const l = layouts[idx % layouts.length];
        const isHover = hoveredId === cat.id;
        const rowTop = l.row * 33; // percentage
        const previewImgs = cat.projects.slice(0, 3).map(p => p.image).filter(Boolean);

        return (
          <button
            key={cat.id}
            onClick={() => onCategorySelect(cat.id)}
            onMouseEnter={() => setHoveredId(cat.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`absolute overflow-hidden transition-all duration-300 group text-left
              ${l.bg}
              ${isHover ? 'z-30 scale-[1.02] shadow-2xl' : 'z-10 hover:z-20'}
            `}
            style={{
              top: `${rowTop}%`,
              left: `${l.offsetX}%`,
              width: `${l.w}%`,
              height: '38%',
              clipPath: 'polygon(0 0, 92% 0, 100% 15%, 100% 100%, 8% 100%, 0 85%)',
            }}
          >
            {/* Preview Images on Hover */}
            {isHover && previewImgs.length > 0 && (
              <div className="absolute inset-0 flex gap-1 p-2 opacity-70 transition-opacity duration-300">
                {previewImgs.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="flex-1 h-full object-cover rounded"
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />
                ))}
              </div>
            )}

            {/* Category Info */}
            <div className="relative h-full flex flex-col justify-between p-4 md:p-5">
              <span className="text-[10px] md:text-xs font-mono text-gray-600 dark:text-gray-300">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className={`text-xl md:text-2xl lg:text-3xl font-black leading-none
                  ${isHover ? 'text-black dark:text-white' : 'text-black/70 dark:text-white/70'}
                `}>
                  {cat.label}
                </h3>
                <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 mt-1 inline-block">
                  {cat.count} {language === 'zh' ? '个项目' : 'projects'}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
