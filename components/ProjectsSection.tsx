import React, { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'motion/react';
import { ImgFx } from './ImgFx';

const EASING = [0.22, 1, 0.36, 1] as const;

const FLOATING_SQUARES = [
  { x: 6, y: 20, size: 12 },
  { x: 12, y: 32, size: 8 },
  { x: 8, y: 44, size: 6 },
  { x: 88, y: 18, size: 10 },
  { x: 92, y: 30, size: 14 },
  { x: 85, y: 42, size: 7 },
  { x: 90, y: 52, size: 5 },
  { x: 14, y: 56, size: 5 },
];

const CASE_STUDIES = [
  {
    id: 'heartx',
    title: 'HeartX',
    category: 'Brand Strategy & Product Design',
    year: '2026',
    image: 'https://images.pexels.com/photos/7691249/pexels-photo-7691249.jpeg?auto=compress&cs=tinysrgb&w=800',
    squares: [
      { x: 5, y: 30, size: 16 },
      { x: 10, y: 42, size: 10 },
      { x: 3, y: 52, size: 7 },
      { x: 80, y: 70, size: 14 },
      { x: 85, y: 82, size: 9 },
      { x: 78, y: 60, size: 6 },
    ],
  },
  {
    id: 'swave',
    title: 'Swave®',
    category: 'Web Design & Identity',
    year: '2025',
    image: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800',
    squares: [
      { x: 82, y: 55, size: 16 },
      { x: 88, y: 68, size: 10 },
      { x: 78, y: 72, size: 7 },
      { x: 85, y: 42, size: 6 },
      { x: 90, y: 80, size: 8 },
    ],
  },
  {
    id: 'eduspark',
    title: 'EduSpark',
    category: 'Brand Strategy & Web Design',
    year: '2023',
    image: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=800',
    squares: [
      { x: 4, y: 24, size: 16 },
      { x: 10, y: 36, size: 10 },
      { x: 2, y: 44, size: 7 },
      { x: 78, y: 78, size: 14 },
      { x: 84, y: 88, size: 8 },
    ],
  },
  {
    id: 'greenergy',
    title: 'Greenergy',
    category: 'Brand Strategy & Web Design',
    year: '2022',
    image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800',
    squares: [
      { x: 82, y: 26, size: 14 },
      { x: 88, y: 38, size: 10 },
      { x: 78, y: 44, size: 7 },
      { x: 84, y: 54, size: 5 },
      { x: 90, y: 60, size: 8 },
    ],
  },
];

const LOGOS = [
  { name: 'Codecraft_', icon: 'code' },
  { name: 'ennLabs', icon: 'dots' },
  { name: 'GlobalBank', icon: 'circle-ring' },
  { name: '45 Degrees°', icon: 'arrow' },
  { name: 'AlphaWave', icon: 'wave-circle' },
  { name: 'Biosynthesis', icon: 'lines' },
  { name: 'Boltshift', icon: 'bolt' },
  { name: 'Clandestine', icon: 'plus' },
];

const LogoIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'code':
      return (
        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="6,4 1,9 6,14" />
          <polyline points="16,4 21,9 16,14" />
          <line x1="13" y1="2" x2="9" y2="16" />
        </svg>
      );
    case 'dots':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          {[3, 10, 17].map(y => [3, 10, 17].map(x => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" />))}
        </svg>
      );
    case 'circle-ring':
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="9" />
          <circle cx="11" cy="11" r="4" />
        </svg>
      );
    case 'arrow':
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="2" y1="16" x2="16" y2="2" />
          <polyline points="7,2 16,2 16,11" />
        </svg>
      );
    case 'wave-circle':
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="9" />
          <path d="M5 11Q8 7 11 11Q14 15 17 11" />
        </svg>
      );
    case 'lines':
      return (
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <line x1="0" y1="3" x2="24" y2="3" />
          <line x1="6" y1="9" x2="24" y2="9" />
          <line x1="0" y1="15" x2="18" y2="15" />
        </svg>
      );
    case 'bolt':
      return (
        <svg width="14" height="20" viewBox="0 0 14 20" fill="currentColor">
          <polygon points="8,0 0,11 6,11 6,20 14,9 8,9" />
        </svg>
      );
    case 'plus':
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
          <rect x="7.5" y="0" width="3" height="18" />
          <rect x="0" y="7.5" width="18" height="3" />
        </svg>
      );
    default:
      return null;
  }
};

const CaseStudyCard = ({ study, index }: { study: typeof CASE_STUDIES[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  }, [pointerX, pointerY]);

  const handlePointerLeave = useCallback(() => {
    pointerX.set(0.5);
    pointerY.set(0.5);
    setIsHovered(false);
  }, [pointerX, pointerY]);

  const inView = useInView(cardRef, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASING }}
      className="group relative overflow-hidden"
      style={{ aspectRatio: '4/3' }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
    >
      {/* Background Image */}
      <ImgFx src={study.image} alt={study.title} className="absolute inset-0 h-full w-full" fit="cover" />

      {/* Pixel Block Overlay */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 12 }).map((_, col) => {
            const delayIn = (row + col) * 0.018;
            const delayOut = ((8 - row) + (12 - col)) * 0.012;
            return (
              <motion.div
                key={`${row}-${col}`}
                className="absolute bg-black/80"
                style={{
                  left: `${(col / 12) * 100}%`,
                  top: `${(row / 8) * 100}%`,
                  width: `${100 / 12}%`,
                  height: `${100 / 8}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{
                  duration: 0.25,
                  delay: isHovered ? delayIn : delayOut,
                  ease: EASING,
                }}
              />
            );
          })
        )}
      </div>

      {/* Magnetic Squares */}
      {study.squares.map((sq, i) => {
        const springX = useSpring(
          useTransform(pointerX, [0, 1], [-40, 40]),
          { stiffness: 80, damping: 18, mass: 0.6 }
        );
        const springY = useSpring(
          useTransform(pointerY, [0, 1], [-40, 40]),
          { stiffness: 80, damping: 18, mass: 0.6 }
        );

        const x = useTransform(springX, v => (sq.x / 100) * v);
        const y = useTransform(springY, v => (sq.y / 100) * v);

        return (
          <motion.div
            key={i}
            className="absolute bg-black"
            style={{
              left: `${sq.x}%`,
              top: `${sq.y}%`,
              width: sq.size,
              height: sq.size,
              x,
              y,
            }}
          />
        );
      })}

      {/* Plus Button */}
      <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center border border-white/30 text-xs text-white" style={{ zIndex: 10 }}>
        +
      </div>

      {/* Info Plate */}
      <div className="absolute bottom-0 left-0 bg-white px-4 pb-3 pt-2.5" style={{ zIndex: 20, maxWidth: '70%' }}>
        <h3 className="text-[clamp(1.4rem,2.2vw,2rem)] font-normal leading-tight text-black">{study.title}</h3>
        <div className="mt-1.5 flex gap-4">
          <span className="text-[12px] text-black/60">{study.category}</span>
          <span className="text-[12px] font-medium text-black">{study.year}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <>
      <style>
        {`
          @keyframes marqueeProjects {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .marquee-projects {
            animation: marqueeProjects 28s linear infinite;
          }
          .marquee-projects:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <section ref={sectionRef} className="relative bg-white text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* Top Area */}
        <div className="relative px-6 pb-10 pt-32 sm:px-10 lg:px-16 lg:pt-40">
          {/* Floating Squares */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {FLOATING_SQUARES.map((sq, i) => {
              const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -(80 + i * 30)]);
              const smoothY = useSpring(parallaxY, { stiffness: 40, damping: 20 });

              return (
                <motion.div
                  key={i}
                  className="absolute bg-black"
                  style={{
                    left: `${sq.x}%`,
                    top: `${sq.y}%`,
                    width: sq.size,
                    height: sq.size,
                    y: smoothY,
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3 + i * 0.4,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              );
            })}
          </div>

          {/* Header Text */}
          <motion.div
            ref={headerRef}
            className="relative mx-auto max-w-7xl text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASING }}
          >
            <div className="mb-5 inline-block bg-black px-4 py-1.5 text-[13px] font-medium tracking-wide text-white">
              Projects
            </div>
            <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-light leading-[1.25] tracking-tight">
              <span className="text-black">Insights from </span>
              <span className="text-black/40">Our</span>
              <br />
              <span className="text-black/40">Case Studies</span>
            </h2>
          </motion.div>
        </div>

        {/* Case Study Cards */}
        <div className="mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-16">
          <div className="grid gap-4 md:grid-cols-2">
            {CASE_STUDIES.map((study, i) => (
              <CaseStudyCard key={study.id} study={study} index={i} />
            ))}
          </div>
        </div>

        {/* Footer Area */}
        <div className="mx-auto max-w-7xl px-6 pb-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            {/* Left CTA */}
            <div className="max-w-md">
              <div className="mb-4 flex h-7 w-7 items-center justify-center border border-black/20 text-xs text-black">
                +
              </div>
              <p className="text-[14px] leading-[1.7] text-black/60">
                We partner with ambitious brands that are ready to move beyond fragmented visuals and shallow quick fixes -- turning their identity, website, and messaging into one focused engine for growth.
              </p>
              <button className="group mt-6 flex items-end">
                <span className="inline-flex items-center gap-[10px] border border-black/20 bg-black px-3 py-2 text-base font-medium text-white hover:bg-black/85">
                  Let's work together
                </span>
                <div className="mb-6 flex h-6 w-6 items-center justify-center bg-black transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mb-9">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M18.75 6V15.75C18.75 15.949 18.671 16.14 18.53 16.28C18.39 16.421 18.199 16.5 18 16.5C17.801 16.5 17.61 16.421 17.47 16.28C17.329 16.14 17.25 15.949 17.25 15.75V7.81L6.53 18.53C6.39 18.671 6.199 18.75 6 18.75C5.801 18.75 5.61 18.671 5.47 18.53C5.329 18.39 5.25 18.199 5.25 18C5.25 17.801 5.329 17.61 5.47 17.47L16.19 6.75H8.25C8.051 6.75 7.86 6.671 7.72 6.53C7.579 6.39 7.5 6.199 7.5 6C7.5 5.801 7.579 5.61 7.72 5.47C7.86 5.329 8.051 5.25 8.25 5.25H18C18.199 5.25 18.39 5.329 18.53 5.47C18.671 5.61 18.75 5.801 18.75 6Z" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Right Marquee */}
            <div className="flex-1 overflow-hidden border-t border-black/10 md:ml-12 md:border-t-0">
              <div className="overflow-hidden py-5">
                <div className="marquee-projects flex w-max">
                  {[...LOGOS, ...LOGOS].map((logo, i) => (
                    <div key={i} className="flex shrink-0 items-center gap-2.5 px-8">
                      <LogoIcon type={logo.icon} />
                      <span className="whitespace-nowrap text-sm font-medium tracking-wide text-black/80">
                        {logo.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-12" />
      </section>
    </>
  );
};
