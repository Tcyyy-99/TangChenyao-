import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { Language, Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface StackedCardsHeroProps {
  language: Language;
  onProjectClick: (project: Project) => void;
}

interface TrailCard {
  id: string;
  project: Project;
  x: number;
  y: number;
}

export const StackedCardsHero: React.FC<StackedCardsHeroProps> = ({ language, onProjectClick }) => {
  const [trailCards, setTrailCards] = useState<TrailCard[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastProjectIndexRef = useRef<number>(-1);
  const cardIdCounterRef = useRef<number>(0);

  const projects = PROJECTS[language].filter(p => p.image && !p.image.includes('picsum'));

  const getRandomProject = () => {
    if (projects.length === 0) return null;
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * projects.length);
    } while (randomIndex === lastProjectIndexRef.current && projects.length > 1);
    
    lastProjectIndexRef.current = randomIndex;
    return projects[randomIndex];
  };

  const generateCard = () => {
    const randomProject = getRandomProject();
    if (!randomProject) return;

    const newCard: TrailCard = {
      id: `card-${cardIdCounterRef.current++}`,
      project: randomProject,
      x: mousePos.x,
      y: mousePos.y,
    };

    setTrailCards(prev => {
      const updated = [...prev, newCard];
      
      // 最多保留3个卡片
      if (updated.length > 3) {
        return updated.slice(-3);
      }
      return updated;
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    
    if (!isHovering) {
      setIsHovering(true);
      
      // 300ms后生成第一张卡片
      initialTimeoutRef.current = setTimeout(() => {
        generateCard();
        
        // 然后每500ms生成新卡片
        intervalRef.current = setInterval(() => {
          generateCard();
        }, 500);
      }, 300);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTrailCards([]);
    
    if (initialTimeoutRef.current) {
      clearTimeout(initialTimeoutRef.current);
      initialTimeoutRef.current = null;
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (initialTimeoutRef.current) {
        clearTimeout(initialTimeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleCardClick = (project: Project) => {
    onProjectClick(project);
  };

  return (
    <div 
      className="w-full h-[80vh] flex items-center justify-center relative overflow-hidden bg-white dark:bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 背景提示文字 */}
      <div className="text-center pointer-events-none select-none">
        <h2 className="text-6xl md:text-8xl font-black text-gray-100 dark:text-gray-900 mb-4">
          HOVER
        </h2>
        <p className="text-xl text-gray-300 dark:text-gray-700 font-medium">
          Move your mouse to explore
        </p>
      </div>

      {/* 拖尾卡片 - 固定在生成位置 */}
      <AnimatePresence>
        {trailCards.map((card, index) => {
          const opacity = (index + 1) / trailCards.length; // 越新越不透明

          return (
            <motion.div
              key={card.id}
              initial={{ 
                opacity: 0,
                filter: 'blur(20px)',
                scale: 0.8,
              }}
              animate={{ 
                opacity: opacity * 0.85,
                filter: 'blur(0px)',
                scale: 1,
              }}
              exit={{ 
                opacity: 0,
                filter: 'blur(20px)',
                scale: 1.2,
              }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut"
              }}
              className="fixed pointer-events-auto z-50 cursor-pointer"
              style={{
                left: card.x,
                top: card.y,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => handleCardClick(card.project)}
            >
              <div className="w-[288px] h-[216px] rounded-2xl shadow-2xl overflow-hidden border-4 border-white dark:border-gray-800">
                <img 
                  src={card.project.image} 
                  alt={card.project.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  draggable={false}
                />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
