
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Language } from '../types';
import { ARTICLE_PROJECTS, ArticleItem } from '../src/data/articles';
import { ChevronRight, ChevronDown, FileText, Calendar, ArrowLeft } from 'lucide-react';

interface ArticleSectionProps {
  language: Language;
}

export const ArticleSection: React.FC<ArticleSectionProps> = ({ language }) => {
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [articleContent, setArticleContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Expand all projects by default
  useEffect(() => {
    setExpandedProjects(ARTICLE_PROJECTS.map(p => p.id));
  }, []);

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const loadArticle = async (article: ArticleItem) => {
    setSelectedArticle(article);
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
      <main className="flex-1 overflow-y-auto">
        {/* Top Breadcrumb Bar - Sticky */}
        {selectedArticle && (
          <div className="h-14 sticky top-0 bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-800 px-12 z-10 flex items-center">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-bold">
                {ARTICLE_PROJECTS.find(p => p.articles.some(a => a.id === selectedArticle.id))?.name}
              </span>
              <span>/</span>
              <span>{selectedArticle.title}</span>
            </div>
          </div>
        )}

        {selectedArticle ? (
          <article className="max-w-4xl mx-auto p-12">
            {/* Back Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 text-gray-500 hover:text-black dark:hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-bold uppercase text-sm tracking-wide">
                {language === 'zh' ? '返回列表' : 'Back to List'}
              </span>
            </button>

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
