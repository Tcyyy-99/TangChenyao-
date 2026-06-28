
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Language } from '../types';
import { ARTICLE_PROJECTS, ArticleItem } from '../src/data/articles';
import { ChevronRight, ChevronDown, FileText, Calendar, ArrowLeft } from 'lucide-react';

// Development Timeline for Vibe Portfolio
const VIBE_TIMELINE = [
  { date: '2026-06-27', title: 'DAY01 - 项目初始化', desc: '创建React+TypeScript项目，配置Tailwind CSS' },
  { date: '2026-06-27', title: 'DAY02 - 主页设计确立', desc: '实现圆形分支导航图，确定三栏布局架构' },
  { date: '2026-06-27', title: 'DAY03 - 作品集模块', desc: '完成作品分类展示，实现lightbox图片预览' },
  { date: '2026-06-27', title: 'DAY04 - 文章系统开发', desc: '集成react-markdown，支持MD文件渲染' },
  { date: '2026-06-27', title: 'DAY05 - 响应式优化', desc: '适配移动端布局，调整面包屑导航' },
  { date: '2026-06-27', title: 'DAY06 - 文章封面功能', desc: '实现文章封面图显示，卡片式布局' },
  { date: '2026-06-27', title: 'DAY07 - 暗黑模式', desc: '添加时间自动切换主题，18:30-06:00深色模式' },
  { date: '2026-06-27', title: 'DAY08 - 布局统一', desc: '统一header高度h-14，优化三栏等高布局' },
  { date: '2026-06-27', title: 'DAY09 - 部署上线', desc: 'GitHub+Vercel自动部署，配置域名' },
];

interface ArticleSectionProps {
  language: Language;
  onNavigate?: (tab: string) => void;
}

export const ArticleSection: React.FC<ArticleSectionProps> = ({ language, onNavigate }) => {
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [articleContent, setArticleContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showAllArticles, setShowAllArticles] = useState(true);

  const allArticles = ARTICLE_PROJECTS.flatMap(p => p.articles);

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const loadArticle = async (article: ArticleItem) => {
    setSelectedArticle(article);
    setShowAllArticles(false);
    setLoading(true);
    try {
      const response = await fetch(article.contentPath);
      if (response.ok) {
        let text = await response.text();
        // Remove first line if it's a markdown h1 title to avoid duplication
        text = text.replace(/^#\s+.+?\n/, '');
        setArticleContent(text);
      } else {
        setArticleContent(`# ${language === 'zh' ? '文章加载失败' : 'Failed to load article'}\n\n${language === 'zh' ? '文件不存在或路径错误' : 'File not found or path error'}`);
      }
    } catch (error) {
      setArticleContent(`# ${language === 'zh' ? '加载错误' : 'Loading Error'}\n\n${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full items-stretch overflow-hidden">
      
      {/* Mobile Top Project Tabs */}
      <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-x-auto flex-shrink-0 sticky top-14 z-30">
        <div className="flex gap-6 px-4 py-3 overflow-x-auto">
          <button
            onClick={() => {
              setSelectedArticle(null);
              setShowAllArticles(true);
            }}
            className={`text-sm font-bold whitespace-nowrap pb-2 border-b-2 transition-colors
              ${showAllArticles && !selectedArticle
                ? 'border-black dark:border-white text-black dark:text-white'
                : 'border-transparent text-gray-400'
              }`}
          >
            {language === 'zh' ? '全部' : 'All'}
          </button>
          {ARTICLE_PROJECTS.map((project) => {
            const isExpanded = expandedProjects.includes(project.id);
            return (
              <button
                key={project.id}
                onClick={() => toggleProject(project.id)}
                className={`text-sm font-bold whitespace-nowrap pb-2 border-b-2 transition-colors
                  ${isExpanded
                    ? 'border-black dark:border-white text-black dark:text-white'
                    : 'border-transparent text-gray-400'
                  }`}
              >
                {project.name}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Left Sidebar - Project Tree */}
      <aside className="hidden md:flex w-64 border-r-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex-shrink-0 overflow-hidden flex-col">
        <div 
          onClick={() => {
            const mainContent = document.querySelector('main.flex-1.overflow-y-auto');
            if (mainContent) mainContent.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="h-14 px-6 border-b-2 border-gray-200 dark:border-gray-800 flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <h2 className="text-sm font-black uppercase tracking-tight">
            ARTICLES
          </h2>
          <span className="text-xs text-gray-400">{allArticles.length}</span>
        </div>

        <nav className="h-[calc(100vh-3.5rem)] overflow-y-auto no-scrollbar">
          {/* All Articles Button */}
          <button
            onClick={() => {
              setSelectedArticle(null);
              setShowAllArticles(true);
            }}
            className={`w-full px-6 py-3 text-left font-bold transition-colors border-b border-gray-100 dark:border-gray-800
              ${showAllArticles && !selectedArticle
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
          >
            <div className="flex justify-between items-center">
              <span>{language === 'zh' ? '全部' : 'All'}</span>
              <span className="text-xs font-mono">({allArticles.length})</span>
            </div>
          </button>

          {ARTICLE_PROJECTS.map(project => {
            const isExpanded = expandedProjects.includes(project.id);
            return (
              <div key={project.id} className="mb-2">
                {/* Project Header */}
                <button
                  onClick={() => toggleProject(project.id)}
                  className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-black dark:text-white">
                      {project.name}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      ({project.articles.length})
                    </span>
                  </div>
                  {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>

                {/* Articles List */}
                {isExpanded && (
                  <div className="space-y-1">
                    {project.articles.map(article => (
                      <button
                        key={article.id}
                        onClick={() => loadArticle(article)}
                        className={`
                          w-full px-6 py-3 text-left text-sm transition-all border-b border-gray-100 dark:border-gray-800
                          ${selectedArticle?.id === article.id
                            ? 'bg-black dark:bg-white text-white dark:text-black font-bold border-black dark:border-white'
                            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                          }
                        `}
                      >
                        <div className="flex items-start gap-2">
                          <FileText size={16} className="mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="leading-tight">{article.title}</div>
                            <div className="text-xs opacity-60 mt-1 font-mono">
                              {new Date(article.date).toLocaleDateString('zh-CN')}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 overflow-y-auto md:no-scrollbar">
        {/* Top Breadcrumb Bar - Desktop only when article selected */}
        {selectedArticle && (
          <div className="hidden md:flex h-14 sticky top-0 bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-800 px-12 z-10 items-center">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <button
                onClick={() => setSelectedArticle(null)}
                className="font-bold hover:text-black dark:hover:text-white transition-colors"
              >
                {ARTICLE_PROJECTS.find(p => p.articles.some(a => a.id === selectedArticle.id))?.name}
              </button>
              <span>/</span>
              <span>{selectedArticle.title}</span>
            </div>
          </div>
        )}

        {selectedArticle ? (
          /* Article Detail View */
          <article className="max-w-4xl mx-auto p-6 md:p-12 pt-20 md:pt-12">
            {/* Article Meta */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                {selectedArticle.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {new Date(selectedArticle.date).toLocaleDateString('zh-CN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>

            {/* Article Content */}
            {loading ? (
              <div className="text-center py-20 text-gray-400">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto"></div>
                <p className="mt-4">{language === 'zh' ? '加载中...' : 'Loading...'}</p>
              </div>
            ) : (
              <div className="prose prose-lg dark:prose-invert max-w-none 
                [&_pre]:bg-white [&_pre]:dark:bg-black 
                [&_pre]:border-2 [&_pre]:border-black 
                [&_pre]:dark:border-white
                [&_pre_code]:text-black [&_pre_code]:dark:text-white">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {articleContent}
                </ReactMarkdown>
              </div>
            )}
          </article>
        ) : showAllArticles ? (
          /* Grid View - All Articles */
          <div className="p-6 md:p-12 pt-20 md:pt-12">
            <div className="space-y-4">
              {allArticles.map(article => {
                const project = ARTICLE_PROJECTS.find(p => p.articles.some(a => a.id === article.id));
                return (
                  <div
                    key={article.id}
                    onClick={() => loadArticle(article)}
                    className="group cursor-pointer flex items-center gap-6 p-6 border-2 border-gray-200 dark:border-gray-800 rounded-2xl hover:border-black dark:hover:border-white transition-colors"
                  >
                    {/* Left: Cover Image or Project Tag */}
                    {article.coverImage ? (
                      <div className="flex-shrink-0 w-32 h-24 rounded-xl overflow-hidden">
                        <img 
                          src={article.coverImage} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-32 h-24 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-black text-sm transform -rotate-90 whitespace-nowrap">
                          {project?.name || 'ARTICLE'}
                        </span>
                      </div>
                    )}
                    
                    {/* Right: Title and Date */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-400 font-mono">
                        {new Date(article.date).toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // Empty State
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <FileText size={64} className="mb-4 opacity-20" />
            <p className="text-xl font-medium">
              {language === 'zh' ? '选择左侧文章开始阅读' : 'Select an article from the left to start reading'}
            </p>
          </div>
        )}
      </main>

      {/* Right Sidebar - Timeline for Vibe Portfolio */}
      {selectedArticle && ARTICLE_PROJECTS.find(p => p.id === 'vibecoding' && p.articles.some(a => a.id === selectedArticle.id)) && (
        <aside className="hidden lg:block w-80 border-l-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 overflow-y-auto p-6">
          <h3 className="text-sm font-black uppercase mb-6 text-gray-500">
            {language === 'zh' ? '时间轴' : 'Timeline'}
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            
            {/* Timeline Items */}
            <div className="space-y-6">
              {VIBE_TIMELINE.map((item, idx) => (
                <div key={idx} className="relative pl-6">
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"></div>
                  
                  {/* Content */}
                  <div>
                    <p className="text-xs text-gray-400 font-mono mb-1">{item.date}</p>
                    <h4 className="text-sm font-bold text-black dark:text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};
