import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ImgFxProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  tileSize?: number;
  duration?: number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onLoad?: () => void;
  draggable?: boolean;
  /** 'fill': img fills container (w-full h-full) with object-fit; 'natural': img keeps its own aspect (w-full h-auto). */
  mode?: 'fill' | 'natural';
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /** Reserve minimum height while img not loaded (px). Default 200 for natural mode. */
  placeholderMinHeight?: number;
}

/**
 * ImgFx: wraps any image with a shader-inspired mosaic reveal.
 * Draws a canvas grid of tiles that dissolve in randomized order once img loads.
 */
export const ImgFx: React.FC<ImgFxProps> = ({
  src,
  alt = '',
  className = '',
  style,
  tileSize = 22,
  duration = 750,
  loading = 'lazy',
  decoding = 'async',
  referrerPolicy = 'no-referrer',
  onClick,
  onLoad,
  draggable = false,
  mode = 'fill',
  fit = 'cover',
  placeholderMinHeight,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    onLoad?.();
  }, [onLoad]);

  useEffect(() => {
    setLoaded(false);
    setRevealed(false);
  }, [src]);

  // Handle cached images: onLoad may not fire if img is already complete on mount
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  // Safety: force reveal after max wait
  useEffect(() => {
    if (revealed) return;
    const t = setTimeout(() => setRevealed(true), 3000);
    return () => clearTimeout(t);
  }, [revealed, src]);

  // Paint solid mosaic immediately on mount / resize so failed-to-load images still show placeholder
  useEffect(() => {
    if (revealed) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const rect = container.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    if (w < 4 || h < 4) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const isDark = document.documentElement.classList.contains('dark');
    const baseColor = isDark ? '20, 20, 22' : '235, 235, 238';
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = `rgba(${baseColor},0.95)`;
    ctx.fillRect(0, 0, w, h);
  }, [revealed, src]);

  useEffect(() => {
    if (!loaded) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) { setRevealed(true); return; }

    const rect = container.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    if (w < 4 || h < 4) { setRevealed(true); return; }

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d');
    if (!ctx) { setRevealed(true); return; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cols = Math.ceil(w / tileSize);
    const rows = Math.ceil(h / tileSize);
    const total = cols * rows;
    const order: number[] = [];
    for (let i = 0; i < total; i++) order.push(i);
    // Fisher-Yates shuffle
    for (let i = total - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    const isDark = document.documentElement.classList.contains('dark');
    const baseColor = isDark ? '20, 20, 22' : '235, 235, 238';

    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Easing: easeOutCubic
      const et = 1 - Math.pow(1 - t, 3);
      const removed = Math.floor(et * total);
      ctx.clearRect(0, 0, w, h);
      for (let k = removed; k < total; k++) {
        const idx = order[k];
        const cx = (idx % cols) * tileSize;
        const cy = Math.floor(idx / cols) * tileSize;
        // Fade tiles near the removal front for smoother edges
        const dist = k - removed;
        const fadeWindow = Math.max(8, Math.floor(total * 0.06));
        const alpha = dist < fadeWindow ? 0.4 + 0.55 * (dist / fadeWindow) : 0.95;
        ctx.fillStyle = `rgba(${baseColor},${alpha})`;
        ctx.fillRect(cx, cy, tileSize + 0.5, tileSize + 0.5);
      }
      if (t < 1) raf = requestAnimationFrame(step);
      else setRevealed(true);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [loaded, tileSize, duration]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        minHeight: !loaded
          ? (placeholderMinHeight ?? (mode === 'natural' ? 200 : undefined))
          : style?.minHeight,
      }}
      onClick={onClick}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        referrerPolicy={referrerPolicy}
        draggable={draggable}
        onLoad={handleLoad}
        className={
          mode === 'natural'
            ? 'block w-full h-auto'
            : `block w-full h-full ${fit === 'cover' ? 'object-cover' : fit === 'contain' ? 'object-contain' : fit === 'fill' ? 'object-fill' : fit === 'none' ? 'object-none' : 'object-scale-down'}`
        }
      />
      {!revealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </div>
  );
};
