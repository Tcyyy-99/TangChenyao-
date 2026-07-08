import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Language, Category, Project } from '../types';
import { CONTACT_DATA } from '../src/data/contact';
import { PROJECTS, CATEGORY_LABELS } from '../constants';
import { ARTICLE_PROJECTS } from '../src/data/articles';
import { MapPin } from 'lucide-react';

const EASING = [0.22, 1, 0.36, 1] as const;

interface BrandingApproachProps {
  language: Language;
  theme: 'light' | 'dark';
  onCategorySelect: (category: Category) => void;
  onNavigate: (tab: string) => void;
  gravityActive?: boolean;
}

interface CatCard {
  id: string;
  label: string;
  count: number;
  projects: Project[];
  targetTab: string;
  category?: Category;
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const BrandingApproach: React.FC<BrandingApproachProps> = ({
  language,
  theme,
  onCategorySelect,
  onNavigate,
  gravityActive = false,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [randomProjects, setRandomProjects] = useState<Project[]>([]);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-60px' });

  const isDark = theme === 'dark';
  const contactContent = CONTACT_DATA[language];
  const allProjects = PROJECTS[language];

  const projectsByCat = (cat: Category) => allProjects.filter(p => p.category === cat);
  const allWithImage = useMemo(() => allProjects.filter(p => p.image), [allProjects]);

  // Flatten all articles into project-like objects (title + image)
  // Track vibe group separately so we can limit its appearance
  const { articlesAsProjects, vibeArticles, otherArticles } = useMemo(() => {
    const vibe: Project[] = [];
    const others: Project[] = [];
    ARTICLE_PROJECTS.forEach(group => {
      group.articles.forEach(a => {
        if (a.coverImage) {
          const proj = { id: a.id, title: a.title, image: a.coverImage } as Project;
          if (group.id === 'vibecoding') vibe.push(proj);
          else others.push(proj);
        }
      });
    });
    return { articlesAsProjects: [...vibe, ...others], vibeArticles: vibe, otherArticles: others };
  }, []);

  const cards: CatCard[] = [
    {
      id: 'interaction',
      label: CATEGORY_LABELS[language][Category.INTERACTION],
      count: projectsByCat(Category.INTERACTION).length,
      projects: projectsByCat(Category.INTERACTION),
      targetTab: 'portfolio',
      category: Category.INTERACTION,
    },
    {
      id: 'product',
      label: CATEGORY_LABELS[language][Category.PRODUCT],
      count: projectsByCat(Category.PRODUCT).length,
      projects: projectsByCat(Category.PRODUCT),
      targetTab: 'portfolio',
      category: Category.PRODUCT,
    },
    {
      id: 'cultural',
      label: CATEGORY_LABELS[language][Category.CULTURAL],
      count: projectsByCat(Category.CULTURAL).length,
      projects: projectsByCat(Category.CULTURAL),
      targetTab: 'portfolio',
      category: Category.CULTURAL,
    },
    {
      id: 'research',
      label: CATEGORY_LABELS[language][Category.RESEARCH],
      count: projectsByCat(Category.RESEARCH).length,
      projects: projectsByCat(Category.RESEARCH),
      targetTab: 'portfolio',
      category: Category.RESEARCH,
    },
    {
      id: 'others',
      label: CATEGORY_LABELS[language][Category.OTHERS],
      count: projectsByCat(Category.OTHERS).length,
      projects: projectsByCat(Category.OTHERS),
      targetTab: 'portfolio',
      category: Category.OTHERS,
    },
    {
      id: 'articles',
      label: language === 'zh' ? '文章' : 'Articles',
      count: articlesAsProjects.length,
      projects: articlesAsProjects,
      targetTab: 'articles',
    },
  ].filter(c => c.category ? c.count > 0 : true);

  // 3 rows, staggered layout with varying offsets & widths
  // Left col (01/03/05): left=0. Right col (02/04/06): left+width=100 (right edge aligned)
  // Glass rim light: bright top edge + subtle side/bottom edges + interior sheen
  const glassOverlay = [
    'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 0.5%)',
    'linear-gradient(0deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 0.5%)',
    'linear-gradient(90deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 0.3%)',
    'linear-gradient(270deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 0.3%)',
    'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 20%)',
  ].join(', ');

  const layouts = [
    { row: 0, left: 0,  width: 55, bg: 'bg-yellow-300',   hoverBg: 'bg-yellow-300',
      darkBg: `${glassOverlay}, linear-gradient(135deg, rgba(210,210,210,0.5) 0%, rgba(25,25,25,0.6) 100%)`,
      darkHoverBg: `${glassOverlay}, linear-gradient(135deg, rgba(235,235,235,0.55) 0%, rgba(35,35,35,0.65) 100%)` },
    { row: 0, left: 50, width: 50, bg: 'bg-gray-200',     hoverBg: 'bg-gray-200',
      darkBg: `${glassOverlay}, linear-gradient(135deg, rgba(55,55,55,0.4) 0%, rgba(5,5,5,0.55) 100%)`,
      darkHoverBg: `${glassOverlay}, linear-gradient(135deg, rgba(75,75,75,0.5) 0%, rgba(15,15,15,0.6) 100%)` },
    { row: 1, left: 0,  width: 50, bg: 'bg-gray-100',     hoverBg: 'bg-gray-300',
      darkBg: `${glassOverlay}, linear-gradient(135deg, rgba(22,22,22,0.4) 0%, rgba(0,0,0,0.55) 100%)`,
      darkHoverBg: `${glassOverlay}, linear-gradient(135deg, rgba(55,55,55,0.5) 0%, rgba(8,8,8,0.6) 100%)` },
    { row: 1, left: 42, width: 58, bg: 'bg-gray-300',     hoverBg: 'bg-gray-300',
      darkBg: `${glassOverlay}, linear-gradient(135deg, rgba(140,140,140,0.42) 0%, rgba(22,22,22,0.55) 100%)`,
      darkHoverBg: `${glassOverlay}, linear-gradient(135deg, rgba(165,165,165,0.5) 0%, rgba(32,32,32,0.6) 100%)` },
    { row: 2, left: 0,  width: 60, bg: 'bg-yellow-200',   hoverBg: 'bg-yellow-300',
      darkBg: `${glassOverlay}, linear-gradient(135deg, rgba(185,185,185,0.48) 0%, rgba(22,22,22,0.6) 100%)`,
      darkHoverBg: `${glassOverlay}, linear-gradient(135deg, rgba(215,215,215,0.55) 0%, rgba(32,32,32,0.65) 100%)` },
    { row: 2, left: 45, width: 55, bg: 'bg-gray-200',     hoverBg: 'bg-gray-200',
      darkBg: `${glassOverlay}, linear-gradient(135deg, rgba(40,40,40,0.4) 0%, rgba(3,3,3,0.55) 100%)`,
      darkHoverBg: `${glassOverlay}, linear-gradient(135deg, rgba(60,60,60,0.5) 0%, rgba(10,10,10,0.6) 100%)` },
  ];

  const dimDarkBg = `${glassOverlay}, linear-gradient(135deg, rgba(30,30,30,0.4) 0%, rgba(5,5,5,0.55) 100%)`;

  const rowH = 60; // folder element height % (extends below to fill gaps under next folder's tab area)
  const rowGap = 30; // spacing between rows

  const handleEnter = (card: CatCard) => {
    setHoveredId(card.id);
    if (card.id === 'articles') {
      const includeVibe = Math.random() < 0.5 && vibeArticles.length > 0;
      const others = shuffle(otherArticles).slice(0, includeVibe ? 2 : 3);
      const pool = includeVibe ? [shuffle(vibeArticles)[0], ...others] : others;
      setRandomProjects(shuffle(pool));
      return;
    }
    const pool = card.projects.length >= 3 ? card.projects.filter(p => p.image) : allWithImage;
    setRandomProjects(shuffle(pool).slice(0, 3));
  };

  const handleLeave = () => {
    setHoveredId(null);
  };

  const handleClick = (card: CatCard) => {
    if (card.category) {
      onCategorySelect(card.category);
    } else {
      onNavigate(card.targetTab);
    }
  };

  const hoveredIdx = cards.findIndex(c => c.id === hoveredId);
  const hoveredLayout = hoveredIdx >= 0 ? layouts[hoveredIdx % layouts.length] : null;

  return (
    <section
      className={`h-full overflow-hidden flex flex-col ${isDark ? 'bg-[#0f0f0f] text-white' : 'bg-white text-black'}`}
      style={{
        fontFamily: language === 'en'
          ? "'Economica', -apple-system, sans-serif"
          : "'DM Sans', sans-serif",
      }}
    >
      {/* Top Right: BASE + Contact */}
      <motion.div
        className="flex justify-end px-6 sm:px-10 lg:px-16 pt-10 lg:pt-20"
        initial={{ opacity: 0, y: -10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: EASING }}
      >
        <div className="flex flex-col gap-6 items-start">
          <div>
            <h3 className={`text-2xl lg:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
              {contactContent.baseLabel}
            </h3>
            <div className={`text-xl lg:text-2xl font-medium flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <MapPin size={24} className="inline-block" />
              {contactContent.locationValue}
            </div>
          </div>
          <div onClick={() => onNavigate('contact')} className="cursor-pointer group flex items-center gap-3">
            <span className={`text-2xl lg:text-3xl transition-transform duration-300 group-hover:translate-x-1 ${isDark ? 'text-white' : 'text-black'}`}>→</span>
            <h3 className={`text-2xl lg:text-3xl font-bold mb-0 transition-colors duration-300 group-hover:opacity-80 ${isDark ? 'text-white' : 'text-black'}`}>
              {contactContent.contactLabel}
            </h3>
          </div>
        </div>
      </motion.div>

      {/* Bottom Left: Staggered Cards */}
      <div className="mt-auto p-0 pb-0 w-full">
        <motion.div
          ref={containerRef}
          className="relative w-full"
          style={{ height: '47vh', maxHeight: '480px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: EASING }}
        >
          {cards.map((card, idx) => {
            const l = layouts[idx % layouts.length];
            const isHover = hoveredId === card.id;
            const anyHover = hoveredId !== null;
            const top = l.row * rowGap;
            const bgClass = isDark
              ? ''
              : (anyHover
                  ? (isHover ? l.hoverBg : 'bg-gray-100')
                  : l.bg);
            const bgStyle = isDark
              ? (anyHover ? (isHover ? l.darkHoverBg : dimDarkBg) : l.darkBg)
              : undefined;

            return (
              <motion.button
                key={card.id}
                onClick={() => handleClick(card)}
                onMouseEnter={() => handleEnter(card)}
                onMouseLeave={handleLeave}
                initial={{ opacity: 0, scaleY: 0, y: 0 }}
                animate={inView ? { opacity: 1, scaleY: 1, y: isHover ? -18 : 0 } : { opacity: 0, scaleY: 0, y: 0 }}
                transition={
                  isHover
                    ? { type: 'spring', stiffness: 400, damping: 15 }
                    : { duration: 1.2, delay: (cards.length - 1 - idx) * 0.2, ease: [0.16, 1, 0.3, 1] }
                }
                className={`absolute overflow-hidden text-left group ${bgClass} ${isHover ? 'shadow-2xl' : ''}`}
                style={{
                  top: `${top}%`,
                  left: `${l.left}%`,
                  width: `${l.width}%`,
                  height: `${rowH}%`,
                  zIndex: 10 + idx,
                  clipPath: 'polygon(100% 16.67%, 50% 16.67%, 40% 0, 0 0, 0 100%, 100% 100%)',
                  transition: 'background 0.3s ease, background-color 0.3s ease',
                  backgroundImage: bgStyle,
                  transformOrigin: 'bottom center',
                  backdropFilter: isDark ? 'blur(24px) saturate(140%)' : undefined,
                  WebkitBackdropFilter: isDark ? 'blur(24px) saturate(140%)' : undefined,
                }}
              >
                <div className="relative h-full px-2 md:px-4">
                  <span className={`absolute top-[4%] left-2 md:left-4 text-[10px] md:text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="absolute top-[25%] left-2 md:left-4 right-2 md:right-4 flex items-baseline gap-3">
                    <h3
                      className={`leading-none whitespace-nowrap
                        ${language === 'en'
                          ? 'text-2xl md:text-3xl lg:text-[2.75rem]'
                          : 'text-xl md:text-2xl lg:text-[2rem]'}
                        ${isHover ? (isDark ? 'text-white' : 'text-black') : (isDark ? 'text-white/70' : 'text-black/80')}
                      `}
                      style={{
                        fontFamily: language === 'en'
                          ? "'Economica', -apple-system, sans-serif"
                          : "'DM Serif Display', 'Playfair Display', Georgia, serif",
                      }}
                    >
                      {card.label}
                    </h3>
                  </div>
                </div>
              </motion.button>
            );
          })}

          {/* Hover Popup: 3 Horizontal Cards - scale-in, behind folder */}
          <AnimatePresence>
            {hoveredLayout && randomProjects.length > 0 && (
              <div
                key={hoveredId}
                className="absolute pointer-events-none"
                style={{
                  top: `${hoveredLayout.row * rowGap}%`,
                  left: `${hoveredLayout.left}%`,
                  width: `${hoveredLayout.width}%`,
                  height: `${rowH}%`,
                  zIndex: 10 + hoveredIdx - 1,
                }}
              >
                {randomProjects.map((proj, i) => {
                  const rotations = [-10, 4, 12];
                  const leftOffsets = [19, 35, 51];
                  return (
                    <motion.img
                      key={`${hoveredId}-${proj.id}`}
                      src={proj.image}
                      alt={proj.title}
                      initial={{ opacity: 0, scale: 0, rotate: rotations[i] }}
                      animate={{ opacity: 1, scale: 1, rotate: rotations[i] }}
                      exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.35, delay: i * 0.06, type: 'spring', stiffness: 260, damping: 20 }}
                      className="absolute rounded-md shadow-2xl object-cover"
                      style={{
                        left: `${leftOffsets[i]}%`,
                        top: '-45%',
                        width: '30%',
                        aspectRatio: '4 / 3',
                        transformOrigin: 'center bottom',
                      }}
                      referrerPolicy="no-referrer"
                      draggable={false}
                    />
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
