import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react';
import { BLOG_ARTICLES, type BlogArticle } from '../data/curriculum';

type BlogCategory = 'All' | BlogArticle['category'];

const BLOG_CATEGORIES: BlogCategory[] = [
  'All',
  'Planetary Science',
  'Observation Guides',
  'Mission Briefs',
  'Student Projects',
];

export function BlogPage() {
  const [categoryFilter, setCategoryFilter] = useState<BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return BLOG_ARTICLES.filter((a) => {
      if (categoryFilter !== 'All' && a.category !== categoryFilter) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
      );
    });
  }, [categoryFilter, searchQuery]);

  const activeArticle = useMemo(
    () => BLOG_ARTICLES.find((a) => a.id === activeArticleId) ?? null,
    [activeArticleId]
  );

  const activeIndex = activeArticle
    ? BLOG_ARTICLES.findIndex((a) => a.id === activeArticle.id)
    : -1;

  useEffect(() => {
    if (!activeArticleId) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveArticleId(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeArticleId]);

  const featuredLead = filteredArticles.find((a) => a.featured) ?? filteredArticles[0] ?? null;
  const secondaryArticles = filteredArticles.filter((a) => a.id !== featuredLead?.id);

  return (
    <main className="min-h-screen bg-[#04101f] px-6 pt-32 pb-24 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-[#79dce8] uppercase">
              SpaceEdu Journal
            </p>
            <h1
              className="mt-3 text-4xl font-normal tracking-tight text-white md:text-5xl"
              style={{ fontFamily: 'var(--font-serif)', textWrap: 'balance' }}
            >
              Planetary Dispatches &amp; Field Notes
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300">
              Research essays, telescope observing guides, mission analyses, and cohort project reports.
            </p>
          </div>

          <div className="relative shrink-0">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dispatches..."
              aria-label="Search blog articles"
              className="w-full rounded-lg border border-white/15 bg-[#08162b] py-2.5 pr-3.5 pl-10 text-sm text-white placeholder-slate-400 focus:border-[#79dce8] focus:outline-none sm:w-64"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-[#79dce8] ${
                categoryFilter === cat
                  ? 'border-[#79dce8]/60 bg-[#79dce8]/15 text-[#79dce8]'
                  : 'border-white/10 bg-[#08162b] text-slate-300 hover:border-white/25 hover:text-white'
              }`}
            >
              {cat === 'All' ? 'All Dispatches' : cat}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {!featuredLead ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-[#08162b] p-10 text-center">
            <p className="text-slate-300">No dispatches matched your current filters.</p>
            <button
              type="button"
              onClick={() => {
                setCategoryFilter('All');
                setSearchQuery('');
              }}
              className="mt-4 cursor-pointer rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:border-[#79dce8]"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            {/* Featured Lead Dispatch */}
            <article className="mt-10 rounded-2xl border border-white/10 bg-[#071426] p-7 md:p-10">
              <p className="text-xs text-slate-400">
                {featuredLead.category} · {featuredLead.publishedAt} · {featuredLead.readMinutes} min read
              </p>
              <h2
                className="mt-3 max-w-4xl text-3xl font-normal leading-snug text-white md:text-4xl"
                style={{ fontFamily: 'var(--font-serif)', textWrap: 'balance' }}
              >
                {featuredLead.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
                {featuredLead.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <div className="text-sm">
                  <span className="font-medium text-white">{featuredLead.author}</span>
                  <span className="text-slate-400"> · {featuredLead.authorRole}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveArticleId(featuredLead.id)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#071227] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[#79dce8]"
                >
                  Read Dispatch
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </article>

            {/* Secondary Grid */}
            {secondaryArticles.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {secondaryArticles.map((article) => (
                  <article
                    key={article.id}
                    className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#08162b] p-6"
                  >
                    <div>
                      <p className="text-xs text-slate-400">
                        {article.category} · {article.publishedAt} · {article.readMinutes} min read
                      </p>
                      <h3
                        className="mt-3 text-xl font-normal leading-snug text-white"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        {article.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="text-xs text-slate-400">{article.author}</span>
                      <button
                        type="button"
                        onClick={() => setActiveArticleId(article.id)}
                        className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[#79dce8] hover:text-white focus-visible:outline-2 focus-visible:outline-[#79dce8]"
                      >
                        Read
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Interactive Full Article Reader Dialog */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020812]/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reader-title"
          onClick={() => setActiveArticleId(null)}
        >
          <div
            className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-[#071426] p-6 text-white md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-xs text-slate-400">
                  {activeArticle.category} · {activeArticle.publishedAt} · {activeArticle.readMinutes} min read
                </p>
                <h2
                  id="reader-title"
                  className="mt-2 text-2xl font-normal leading-snug text-white md:text-3xl"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {activeArticle.title}
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  By <span className="text-white">{activeArticle.author}</span> · {activeArticle.authorRole}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveArticleId(null)}
                aria-label="Close article reader"
                className="cursor-pointer rounded-lg border border-white/15 p-2 text-slate-300 hover:border-[#79dce8] hover:text-white focus-visible:outline-2 focus-visible:outline-[#79dce8]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {activeArticle.sections.map((sec) => (
                <section key={sec.heading}>
                  <h3 className="text-lg font-semibold text-white">{sec.heading}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-300">{sec.body}</p>
                </section>
              ))}

              <div className="rounded-xl border border-[#79dce8]/30 bg-[#0a1b34] p-5">
                <p className="text-xs tracking-wider text-[#79dce8] uppercase">Key Takeaway</p>
                <p className="mt-2 text-sm leading-relaxed text-white">
                  {activeArticle.keyTakeaway}
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
              <button
                type="button"
                disabled={activeIndex <= 0}
                onClick={() => setActiveArticleId(BLOG_ARTICLES[activeIndex - 1].id)}
                className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Previous Dispatch
              </button>

              <button
                type="button"
                disabled={activeIndex >= BLOG_ARTICLES.length - 1}
                onClick={() => setActiveArticleId(BLOG_ARTICLES[activeIndex + 1].id)}
                className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next Dispatch
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
