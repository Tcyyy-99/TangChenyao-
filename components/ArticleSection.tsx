
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Language } from '../types';
import { ARTICLE_PROJECTS, ArticleItem } from '../src/data/articles';
import { ChevronRight, ChevronDown, FileText, Calendar, ArrowLeft } from 'lucide-react';

interface ArticleSectionProps {
  language: Language;
  onNavigate?: (tab: string) => void;
}

export const ArticleSection: React.FC<ArticleSectionProps> = ({ language, onNavigate }) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [articleContent, setArticleContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showAllArticles, setShowAllArticles] = useState(true);

  const allArticles = ARTICLE_PROJECTS.flatMap(p => p.articles);
  const filteredArticles = selectedProject 
    ? ARTICLE_PROJECTS.find(p => p.id === selectedProject)?.articles || []
    : allArticles;

  const toggleProject = (projectId: string) => {
    setSelectedProject(projectId);
    setSelectedArticle(null);
    setShowAllArticles(false);
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
    <div className="flex h-screen w-full items-stretch">
      
      {/* Left Sidebar - Project Tree */}
      <aside className="hidden md:flex w-64 border-r-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex-shrink-0 overflow-hidden flex-col">
        <div className="h-14 px-6 border-b-2 border-gray-200 dark:border-gray-800 flex items-center">
          <h2 className="text-sm font-black uppercase tracking-tight">
            {language === 'zh' ? '项目分类' : 'Projects'}
          </h2>
        </div>

        <nav className="h-[calc(100vh-3.5rem)] overflow-y-auto">
          {/* All Articles Button */}
          <button
            onClick={() => {
              setSelectedArticle(null);
              setSelectedProject(null);
              setShowAllArticles(true);
            }}
            className={`w-full px-6 py-3 text-left font-bold transition-colors border-b border-gray-100 dark:border-gray-800
              ${showAllArticles && !selectedArticle && !selectedProject
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
            return (
              <div key={project.id} className="mb-2">
                {/* Project Header */}
                <button
                  onClick={() => toggleProject(project.id)}
                  className={`w-full px-6 py-3 text-left font-bold transition-colors border-b border-gray-100 dark:border-gray-800
                    ${selectedProject === project.id && !selectedArticle
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{project.name}</span>
                    <span className="text-xs font-mono">({project.articles.length})</span>
                  </div>
                </button>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Breadcrumb - Always visible on mobile */}
        <div className="md:hidden h-14 sticky top-0 bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-800 px-4 z-10 flex items-center">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button 
              onClick={() => onNavigate?.('dashboard')}
              className="font-bold hover:text-black dark:hover:text-white transition-colors"
            >
              {language === 'zh' ? '主页' : 'Home'}
            </button>
            <span>/</span>
            <span className={`font-bold ${!selectedArticle ? 'text-black dark:text-white' : ''}`}>
              {language === 'zh' ? '文章' : 'Articles'}
            </span>
            {selectedArticle && (
              <>
                <span>/</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="font-bold hover:text-black dark:hover:text-white transition-colors"
                >
                  {ARTICLE_PROJECTS.find(p => p.articles.some(a => a.id === selectedArticle.id))?.name}
                </button>
                <span>/</span>
                <span className="truncate">{selectedArticle.title}</span>
              </>
            )}
          </div>
        </div>

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
          <article className="max-w-4xl mx-auto p-12">
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
        ) : showAllArticles || selectedProject ? (
          /* Grid View - All Articles or Project Articles */
          <div className="p-12">
            <h2 className="text-3xl font-black mb-8">
              {selectedProject 
                ? ARTICLE_PROJECTS.find(p => p.id === selectedProject)?.name 
                : (language === 'zh' ? '全部文章' : 'All Articles')
              }
            </h2>
            
            <div className="space-y-4">
              {filteredArticles.map(article => {
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
    </div>
  );
};
