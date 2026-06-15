import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { Language, Project } from '../types';

interface UnveilHeroProps {
  language: Language;
  onProjectClick: (project: Project) => void;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uBlurTexture;
  uniform sampler2D uImageTexture;
  uniform float uProgress;
  varying vec2 vUv;
  
  void main() {
    vec4 blurColor = texture2D(uBlurTexture, vUv);
    vec4 imageColor = texture2D(uImageTexture, vUv);
    gl_FragColor = mix(blurColor, imageColor, uProgress);
  }
`;

export const UnveilHero: React.FC<UnveilHeroProps> = ({ language, onProjectClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const tilesRef = useRef<THREE.Mesh[]>([]);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef({ x: 0, y: 0, normalized: new THREE.Vector2() });
  const scrollRef = useRef({ current: 0, previous: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const requestRef = useRef<number>(0);

  const projects = useRef<Project[]>([]);

  const init = useCallback(async () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfafafa);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const { PROJECTS } = await import('../constants');
    const allProjects = PROJECTS[language].filter(p => p.image && !p.image.includes('picsum'));
    projects.current = allProjects;

    const totalTiles = allProjects.length;
    let loadedCount = 0;

    const aspect = width / height;
    const tileHeight = 12;
    const tileWidth = tileHeight * aspect * 0.75;
    const spacing = 0.375;
    const totalWidth = totalTiles * (tileWidth + spacing);

    for (let i = 0; i < totalTiles; i++) {
      const project = allProjects[i];
      
      const blurTexture = new THREE.TextureLoader().load(
        project.image || '',
        () => {
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalTiles) * 100));
        }
      );
      blurTexture.minFilter = THREE.LinearFilter;
      blurTexture.magFilter = THREE.LinearFilter;

      const imageTexture = new THREE.TextureLoader().load(
        project.image || ''
      );

      const geometry = new THREE.PlaneGeometry(tileWidth, tileHeight);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uBlurTexture: { value: blurTexture },
          uImageTexture: { value: imageTexture },
          uProgress: { value: 0 }
        },
        vertexShader,
        fragmentShader
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData = { 
        index: i, 
        project,
        originalX: 0,
        targetProgress: 0,
        currentProgress: 0
      };
      
      const xPos = (i - totalTiles / 2) * (tileWidth + spacing);
      mesh.position.x = xPos;
      mesh.position.z = 0;
      mesh.rotation.y = -Math.PI / 6;
      
      scene.add(mesh);
      tilesRef.current.push(mesh);
    }

    gsap.to(container.querySelector('.loading-text') as HTMLElement, {
      opacity: 0,
      duration: 0.5,
      delay: 0.5,
      onComplete: () => setLoaded(true)
    });

    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);

      if (!loaded) {
        renderer.render(scene, camera);
        return;
      }

      scrollRef.current.previous += (scrollRef.current.current - scrollRef.current.previous) * 0.15;

      const scrollOffset = scrollRef.current.previous;

      tilesRef.current.forEach((tile, index) => {
        const xPos = (index - allProjects.length / 2) * (tileWidth + spacing);
        const offsetX = xPos - scrollOffset;
        
        tile.position.x = offsetX;
        tile.position.z = -offsetX * aspect * 0.3;

        const material = tile.material as THREE.ShaderMaterial;
        const visible = tile.position.z < 15 && tile.position.z > -15;
        tile.visible = visible;

        if (visible) {
          material.uniforms.uProgress.value += (tile.userData.targetProgress - material.uniforms.uProgress.value) * 0.1;
        }
      });

      raycasterRef.current.setFromCamera(mouseRef.current.normalized, camera);
      const intersects = raycasterRef.current.intersectObjects(tilesRef.current);

      let newHovered: number | null = null;
      if (intersects.length > 0) {
        const closest = intersects.reduce((a, b) => 
          a.object.position.z > b.object.position.z ? a : b
        );
        newHovered = (closest.object as THREE.Mesh).userData.index;
      }

      if (newHovered !== hoveredIndex) {
        setHoveredIndex(newHovered);
      }

      tilesRef.current.forEach((tile, index) => {
        const isHovered = index === newHovered;
        const targetScale = isHovered ? 1.1 : 1;
        const targetX = isHovered ? 0.5 : 0;
        
        tile.scale.x += (targetScale - tile.scale.x) * 0.1;
        tile.scale.y += (targetScale - tile.scale.y) * 0.1;
        tile.position.x += (targetX - tile.position.x) * 0.1;

        const material = tile.material as THREE.ShaderMaterial;
        tile.userData.targetProgress = isHovered ? 1 : 0;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [language, loaded, hoveredIndex]);

  useEffect(() => {
    const cleanup = init();
    return () => {
      cleanup?.then(fn => fn?.());
    };
  }, [init]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseRef.current.normalized.set(x * 2 - 1, -(y * 2 - 1));
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      if (isDraggingRef.current) {
        const deltaX = e.clientX - dragStartRef.current.x;
        scrollRef.current.current -= deltaX * 0.05;
        dragStartRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      containerRef.current!.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      containerRef.current!.style.cursor = 'grab';
    };

    const handleWheel = (e: WheelEvent) => {
      scrollRef.current.current += e.deltaY * 0.5;
    };

    const handleClick = () => {
      if (hoveredIndex !== null && tilesRef.current[hoveredIndex]) {
        const project = tilesRef.current[hoveredIndex].userData.project;
        onProjectClick(project);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('wheel', handleWheel);
      container.addEventListener('click', handleClick);
      container.style.cursor = 'grab';
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('click', handleClick);
      }
    };
  }, [hoveredIndex, onProjectClick]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[80vh] relative overflow-hidden bg-[#fafafa]"
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#fafafa] z-10">
          <div className="text-center">
            <p className="loading-text text-4xl font-black text-gray-200 mb-4">
              {loadingProgress}%
            </p>
            <p className="loading-text text-sm text-gray-400 uppercase tracking-widest">
              Loading
            </p>
          </div>
        </div>
      )}
      
      <div className="absolute top-8 left-8 z-20 pointer-events-none">
        <h1 className="text-xl font-bold text-gray-800">
          {language === 'zh' ? '首页' : 'HOME'}
        </h1>
      </div>

      <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
        <p className="text-xs text-gray-400 uppercase tracking-widest">
          {language === 'zh' ? '拖拽浏览 · 悬停预览' : 'Drag to explore · Hover to preview'}
        </p>
      </div>
    </div>
  );
};
