
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import { PROJECTS, CATEGORY_LABELS } from '../constants'; 
import { Category, Language, Project } from '../types';
import { PHOTOGRAPHY_GALLERY } from '../src/data/photography';
import { ArrowUpRight, X, ChevronRight, ChevronDown, FileText, Github, ExternalLink, ChevronLeft, Figma, MousePointer2, Package, Search, Grid3x3 } from 'lucide-react';

interface PortfolioSectionProps {
  language: Language;
  externalFilter?: string;
  onNavigate?: (tab: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ language, externalFilter, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allProjects = PROJECTS[language];
  
  // Get icon for category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case Category.INTERACTION:
        return MousePointer2;
      case Category.PRODUCT:
        return Package;
      case Category.RESEARCH:
        return Search;
      case Category.OTHERS:
        return Grid3x3;
      default:
        return FileText;
    }
  };
  
  // Get categories with project counts
  const categories = [
    { id: 'All', label: CATEGORY_LABELS[language]['All'], count: allProjects.length },
    { id: Category.INTERACTION, label: CATEGORY_LABELS[language][Category.INTERACTION], count: allProjects.filter(p => p.category === Category.INTERACTION).length },
    { id: Category.PRODUCT, label: CATEGORY_LABELS[language][Category.PRODUCT], count: allProjects.filter(p => p.category === Category.PRODUCT).length },
    { id: Category.RESEARCH, label: CATEGORY_LABELS[language][Category.RESEARCH], count: allProjects.filter(p => p.category === Category.RESEARCH).length },
    { id: Category.OTHERS, label: CATEGORY_LABELS[language][Category.OTHERS], count: allProjects.filter(p => p.category === Category.OTHERS).length },
  ].filter(cat => cat.count > 0);

  // Collapse all by default
  useEffect(() => {
    setExpandedCategories([]);
  }, []);

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => 
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  const filteredProjects = selectedCategory === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === selectedCategory);

  const projectsByCategory = categories.reduce((acc, cat) => {
    if (cat.id === 'All') return acc;
    acc[cat.id] = allProjects.filter(p => p.category === cat.id);
    return acc;
  }, {} as Record<string, Project[]>);

  const currentGallery = selectedProject?.gallery || PHOTOGRAPHY_GALLERY[selectedProject?.id || ''] || [];

  const handlePrevImage = () => {
    if (lightboxIndex !== null && currentGallery.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + currentGallery.length) % currentGallery.length);
    }
  };

  const handleNextImage = () => {
    if (lightboxIndex !== null && currentGallery.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % currentGallery.length);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full items-stretch overflow-hidden">
      
      {/* Mobile Top Category Tabs */}
      <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-x-auto flex-shrink-0 sticky top-14 z-30">
        <div className="flex gap-6 px-4 py-3 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedProject(null);
              }}
              className={`text-sm font-bold whitespace-nowrap pb-2 border-b-2 transition-colors
                ${selectedCategory === cat.id && !selectedProject
                  ? 'border-black dark:border-white text-black dark:text-white'
                  : 'border-transparent text-gray-400'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Left Sidebar - Category Tree */}
      <aside className="hidden md:flex w-64 border-r-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex-shrink-0 overflow-hidden flex-col">
        <div 
          onClick={() => {
            if (selectedProject) {
              setSelectedProject(null);
            }
            const mainContent = document.querySelector('main.flex-1.overflow-y-auto');
            if (mainContent) mainContent.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="h-14 px-6 border-b-2 border-gray-200 dark:border-gray-800 flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <h2 className="text-sm font-black uppercase tracking-tight">
            WORK
          </h2>
          <span className="text-xs text-gray-400">{allProjects.length}</span>
        </div>

        <nav className="h-[calc(100vh-3.5rem)] overflow-y-auto no-scrollbar">
          {/* All Category */}
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedProject(null);
            }}
            className={`w-full px-6 py-3 text-left font-bold transition-colors border-b border-gray-100 dark:border-gray-800
              ${selectedCategory === 'All' && !selectedProject
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
          >
            <div className="flex justify-between items-center">
              <span>{CATEGORY_LABELS[language]['All']}</span>
              <span className="text-xs font-mono">({allProjects.length})</span>
            </div>
          </button>

          {/* Category Groups */}
          {categories.filter(c => c.id !== 'All').map(category => {
            const isExpanded = expandedCategories.includes(category.id);
            const projects = projectsByCategory[category.id] || [];
            
            return (
              <div key={category.id} className="mb-2">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-black dark:text-white">
                      {category.label}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      ({category.count})
                    </span>
                  </div>
                  {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>

                {isExpanded && (
                  <div className="space-y-1">
                    {projects.map(project => {
                      const Icon = getCategoryIcon(project.category);
                      return (
                        <button
                          key={project.id}
                          onClick={() => {
                            setSelectedProject(project);
                            setSelectedCategory(category.id);
                          }}
                          className={`w-full px-6 py-3 text-left text-sm transition-all border-b border-gray-100 dark:border-gray-800
                            ${selectedProject?.id === project.id
                              ? 'bg-black dark:bg-white text-white dark:text-black font-bold border-black dark:border-white'
                              : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                            }`}
                        >
                          <div className="flex items-start gap-2">
                            <Icon size={16} className="mt-0.5 flex-shrink-0" />
                            <div className="leading-tight line-clamp-2">{project.title}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Middle Content Area */}
      <main className="flex-1 overflow-y-auto md:no-scrollbar">
        {/* Breadcrumb - Desktop only when project selected */}
        {selectedProject && (
          <div className="hidden md:flex h-14 sticky top-0 bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-800 px-12 z-10 items-center">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <button 
                onClick={() => setSelectedProject(null)}
                className="font-bold hover:text-black dark:hover:text-white transition-colors"
              >
                {language === 'zh' ? '作品集' : 'Portfolio'}
              </button>
              <span>/</span>
              <button
                onClick={() => {
                  setSelectedCategory(selectedProject.category);
                  setSelectedProject(null);
                }}
                className="font-bold hover:text-black dark:hover:text-white transition-colors"
              >
                {CATEGORY_LABELS[language][selectedProject.category]}
              </button>
              <span>/</span>
              <span>{selectedProject.title}</span>
            </div>
          </div>
        )}

        {selectedProject ? (
          /* Project Detail View */
          <div className="p-6 md:p-12 pt-20 md:pt-6">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
              {selectedProject.title}
            </h1>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
              {selectedProject.description}
            </p>

            {/* Mobile Project Info */}
            <div className="lg:hidden mb-8 space-y-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              {/* Concept */}
              {selectedProject.concept && (
                <div>
                  <h4 className="text-sm font-bold text-black dark:text-white mb-2">
                    {language === 'zh' ? '设计意图 / 创意陈述' : 'Concept / Statement'}
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {selectedProject.concept}
                  </p>
                </div>
              )}

              {/* Role Detail */}
              {selectedProject.roleDetail && (
                <div>
                  <h4 className="text-sm font-bold text-black dark:text-white mb-2">
                    {language === 'zh' ? '分工与职责' : 'Role & Responsibility'}
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {selectedProject.roleDetail}
                  </p>
                </div>
              )}

              {/* Role */}
              <div>
                <h4 className="text-sm font-bold text-black dark:text-white mb-2">
                  {language === 'zh' ? '角色' : 'Role'}
                </h4>
                <p className="text-sm font-bold">{selectedProject.role}</p>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-sm font-bold text-black dark:text-white mb-2">
                  {language === 'zh' ? '标签' : 'Tags'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-mono border border-gray-300 dark:border-gray-700 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {(selectedProject.githubUrl || selectedProject.websiteUrl || selectedProject.figmaUrl) && (
                <div>
                  <h4 className="text-sm font-bold text-black dark:text-white mb-2">
                    {language === 'zh' ? '链接' : 'Links'}
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.figmaUrl && (
                      <a
                        href={selectedProject.figmaUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-bold hover:underline"
                      >
                        <Figma size={16} />
                        Figma
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-bold hover:underline"
                      >
                        <Github size={16} />
                        GitHub
                      </a>
                    )}
                    {selectedProject.websiteUrl && (
                      <a
                        href={selectedProject.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-bold hover:underline"
                      >
                        <ExternalLink size={16} />
                        {language === 'zh' ? '在线预览' : 'Live Demo'}
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Awards */}
              {selectedProject.awards && selectedProject.awards.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-black dark:text-white mb-2">
                    {language === 'zh' ? '奖项' : 'Awards'}
                  </h4>
                  <ul className="space-y-1">
                    {selectedProject.awards.map((award, i) => (
                      <li key={i} className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">★ {award}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Gallery */}
            {currentGallery.length > 0 && (
              <div className="space-y-4 mb-12">
                {currentGallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${selectedProject.title} ${idx + 1}`}
                    className="w-full rounded-lg shadow-md cursor-zoom-in hover:shadow-xl transition-shadow"
                    referrerPolicy="no-referrer"
                    onClick={() => setLightboxIndex(idx)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Grid View */
          <div className="p-6 md:p-12 pt-20 md:pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filteredProjects.map(project => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden mb-4">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Right Sidebar - Project Info */}
      {selectedProject && (
        <aside className="hidden lg:block w-80 border-l-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 overflow-y-auto p-6">

          <div className="space-y-6">
            {/* Concept */}
            {selectedProject.concept && (
              <div>
                <h4 className="text-base font-bold text-black dark:text-white mb-2">
                  {language === 'zh' ? '设计意图 / 创意陈述' : 'Concept / Statement'}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {selectedProject.concept}
                </p>
              </div>
            )}

            {/* Role Detail */}
            {selectedProject.roleDetail && (
              <div>
                <h4 className="text-base font-bold text-black dark:text-white mb-2">
                  {language === 'zh' ? '分工与职责' : 'Role & Responsibility'}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {selectedProject.roleDetail}
                </p>
              </div>
            )}

          {/* Role */}
          <div>
            <h4 className="text-base font-bold text-black dark:text-white mb-2">
              {language === 'zh' ? '角色' : 'Role'}
            </h4>
            <p className="text-sm font-bold">{selectedProject.role}</p>
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-base font-bold text-black dark:text-white mb-2">
              {language === 'zh' ? '标签' : 'Tags'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-mono border border-gray-300 dark:border-gray-700 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {(selectedProject.githubUrl || selectedProject.websiteUrl || selectedProject.figmaUrl) && (
            <div>
              <h4 className="text-base font-bold text-black dark:text-white mb-2">
                {language === 'zh' ? '链接' : 'Links'}
              </h4>
              <div className="space-y-2">
                {selectedProject.figmaUrl && (
                  <a
                    href={selectedProject.figmaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-bold hover:underline"
                  >
                    <Figma size={16} />
                    Figma
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-bold hover:underline"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                )}
                {selectedProject.websiteUrl && (
                  <a
                    href={selectedProject.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-bold hover:underline"
                  >
                    <ExternalLink size={16} />
                    {language === 'zh' ? '在线预览' : 'Live Demo'}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Awards */}
          {selectedProject.awards && selectedProject.awards.length > 0 && (
            <div>
              <h4 className="text-base font-bold text-black dark:text-white mb-2">
                {language === 'zh' ? '奖项' : 'Awards'}
              </h4>
              <ul className="space-y-1">
                {selectedProject.awards.map((award, i) => (
                  <li key={i} className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">★ {award}</li>
                ))}
              </ul>
            </div>
          )}
          </div>
        </aside>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && createPortal(
        <div
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentGallery[lightboxIndex]}
              alt="Full View"
              className="max-w-full max-h-[90vh] object-contain"
              referrerPolicy="no-referrer"
            />
            
            <button
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={32} />
            </button>

            {currentGallery.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 bg-black/20 rounded-full"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft size={48} />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 bg-black/20 rounded-full"
                  onClick={handleNextImage}
                >
                  <ChevronRight size={48} />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 font-mono text-sm bg-black/50 px-3 py-1 rounded-full">
              {lightboxIndex + 1} / {currentGallery.length}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
