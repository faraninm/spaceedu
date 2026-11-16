import type { PageRoute } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, page: PageRoute) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <footer className="border-t border-white/10 bg-[#030b17] text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <a
            href="#planets"
            onClick={(e) => handleNav(e, 'planets')}
            className="inline-block text-xl font-semibold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-[#79dce8]"
            style={{ fontFamily: 'var(--font-logo)' }}
          >
            space<span className="text-[#5fd0e1]">edu</span>
          </a>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
            Planetary science, orbital mechanics labs, and guided astronomical observation cohorts.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-6 text-sm" aria-label="Footer navigation">
          <a href="#planets" onClick={(e) => handleNav(e, 'planets')} className="whitespace-nowrap hover:text-white">
            Planets
          </a>
          <a href="#tution" onClick={(e) => handleNav(e, 'tution')} className="whitespace-nowrap hover:text-white">
            Tution
          </a>
          <a href="#tutorials" onClick={(e) => handleNav(e, 'tutorials')} className="whitespace-nowrap hover:text-white">
            Tutorials
          </a>
          <a href="#blog" onClick={(e) => handleNav(e, 'blog')} className="whitespace-nowrap hover:text-white">
            Blog
          </a>
          <a href="#enroll" onClick={(e) => handleNav(e, 'enroll')} className="whitespace-nowrap text-[#79dce8] hover:text-white">
            Enroll
          </a>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>SpaceEdu Academy · Planetary &amp; Orbital Sciences</span>
          <span>Data calibrated to NASA JPL Planetary Fact Sheets</span>
        </div>
      </div>
    </footer>
  );
}
