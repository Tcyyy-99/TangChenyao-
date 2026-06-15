import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Language, Category } from '../types';
import { CONTACT_DATA } from '../src/data/contact';
import { MapPin } from 'lucide-react';

const EASING = [0.22, 1, 0.36, 1] as const;

const DIAGRAM_LABELS = [
  { text: 'Interaction Design', angle: 215, category: Category.INTERACTION },
  { text: 'Product Design', angle: 335, category: Category.PRODUCT },
  { text: 'Others', angle: 110, category: Category.OTHERS },
];

const angleToCoords = (angle: number, radius: number) => {
  const rad = (angle * Math.PI) / 180;
  return {
    x: 50 + radius * Math.cos(rad),
    y: 50 + radius * Math.sin(rad),
  };
};

interface BrandingApproachProps {
  language: Language;
  theme: 'light' | 'dark';
  onCategorySelect: (category: Category) => void;
  onNavigate: (tab: string) => void;
}

export const BrandingApproach: React.FC<BrandingApproachProps> = ({ 
  language, 
  theme, 
  onCategorySelect,
  onNavigate 
}) => {
  const [hoveredLabel, setHoveredLabel] = useState<number | null>(null);
  const diagramRef = useRef(null);
  const diagramInView = useInView(diagramRef, { once: true, margin: '-60px' });

  const isDark = theme === 'dark';
  const contactContent = CONTACT_DATA[language];

  return (
    <section
      className={`min-h-screen overflow-x-hidden flex items-start justify-center pt-8 ${isDark ? 'bg-[#0f0f0f] text-white' : 'bg-white text-black'}`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Content Row */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Circle Diagram - Left/Center */}
          <div className="flex w-full max-w-[550px] shrink-0 items-center justify-center lg:max-w-[650px]">
            <motion.div
              ref={diagramRef}
              className="relative"
              style={{ aspectRatio: '1/1', width: '100%' }}
              initial={{ opacity: 0 }}
              animate={diagramInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: EASING }}
            >
              {/* SVG Circle and Lines */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  stroke={isDark ? 'white' : 'black'}
                  strokeWidth="0.18"
                  fill="none"
                  opacity="0.45"
                />
                {DIAGRAM_LABELS.map((label, i) => {
                  const outer = angleToCoords(label.angle, 36);
                  return (
                    <motion.line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={outer.x}
                      y2={outer.y}
                      stroke={isDark ? 'white' : 'black'}
                      strokeWidth={hoveredLabel === i ? '0.6' : '0.18'}
                      opacity={hoveredLabel === i ? 1 : 0.45}
                      initial={{ strokeWidth: '0.18', opacity: 0.45 }}
                      animate={{
                        strokeWidth: hoveredLabel === i ? '0.6' : '0.18',
                        opacity: hoveredLabel === i ? 1 : 0.45,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  );
                })}
              </svg>

              {/* Labels */}
              {DIAGRAM_LABELS.map((label, i) => {
                const pos = angleToCoords(label.angle, 46);
                return (
                  <motion.div
                    key={i}
                    className={`absolute cursor-pointer whitespace-nowrap ${isDark ? 'text-white' : 'text-black'}`}
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: 'translate(-50%, -50%)',
                      fontSize: 'clamp(1.2rem, 2.6vw, 2.2rem)',
                      letterSpacing: '-0.01em',
                      fontWeight: hoveredLabel === i ? 700 : 300,
                      transition: 'font-weight 0.25s',
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={diagramInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.6 + i * 0.15, ease: EASING }}
                    onMouseEnter={() => setHoveredLabel(i)}
                    onMouseLeave={() => setHoveredLabel(null)}
                    onClick={() => onCategorySelect(label.category)}
                  >
                    {label.text}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Side - Contact Info */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={diagramInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: EASING }}
          >
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
              <span className="text-2xl lg:text-3xl text-[#00D26A] transition-transform duration-300 group-hover:translate-x-1">→</span>
              <h3 className="text-2xl lg:text-3xl font-bold mb-0 text-[#00D26A] transition-colors duration-300 group-hover:opacity-80">
                {contactContent.contactLabel}
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
