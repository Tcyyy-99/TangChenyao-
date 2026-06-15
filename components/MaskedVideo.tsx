import React from 'react';
import { motion } from 'motion/react';

interface MaskedVideoProps {
  videoUrl: string;
  maskSvgPath: string; // SVG path data
  className?: string;
}

export const MaskedVideo: React.FC<MaskedVideoProps> = ({ 
  videoUrl, 
  maskSvgPath,
  className = '' 
}) => {
  const maskStyle = {
    WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='${encodeURIComponent(maskSvgPath)}'/%3E%3C/svg%3E")`,
    WebkitMaskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='${encodeURIComponent(maskSvgPath)}'/%3E%3C/svg%3E")`,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`w-full aspect-square ${className}`}
      style={maskStyle}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </motion.div>
  );
};

// 预设形状
export const MASK_SHAPES = {
  triangle: "m53.54,45.42c2.19-3.79,7.67-3.79,9.86,0l4.54,7.87c1.17,2.02,1.17,4.51,0,6.54l-8.15,13.81c-1.68,2.91.42,6.55,3.78,6.55h17.81c3.45,0,5.61-3.74,3.89-6.73l-28.76-49.81c-2.95-5.12-10.34-5.12-13.29,0l-28.46,49.3c-1.86,3.22.46,7.24,4.18,7.24h10.23c2.55,0,4.91-1.36,6.19-3.57l18.18-31.19Z",
  circle: "M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10",
  hexagon: "M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z",
  star: "M50,10 L61,35 L90,35 L67,52 L78,77 L50,60 L22,77 L33,52 L10,35 L39,35 Z",
};
