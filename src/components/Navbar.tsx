import { useEffect, useRef, useState } from 'react';

export type PageRoute = 'planets' | 'tution' | 'tutorials' | 'blog' | 'enroll';

interface NavbarProps {
  activePage: PageRoute;
  isScrolled: boolean;
  onNavigate: (page: PageRoute) => void;
}

const NAV_ITEMS: { id: PageRoute; label: string; className?: string }[] = [
  { id: 'planets', label: 'Planets' },
  { id: 'tution', label: 'Tution' },
  { id: 'tutorials', label: 'Tutorials' },
  { id: 'blog', label: 'Blog' },
  { id: 'enroll', label: 'Enroll', className: 'enroll' },
];

export function Navbar({ activePage, isScrolled, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      if (!menuOpen) return;
      const target = e.target as Node;
      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        burgerRef.current &&
        !burgerRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    };

    document.addEventListener('click', handleDocClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleDocClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: PageRoute) => {
    e.preventDefault();
    setMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className={`navbar${isScrolled || activePage !== 'planets' ? ' is-scrolled' : ''}`}>
      <div className="navrow" data-open={menuOpen ? 'true' : 'false'}>
        <a
          className="logo"
          href="#planets"
          onClick={(e) => handleLinkClick(e, 'planets')}
        >
          space<i>edu</i>
        </a>

        <nav className="links" id="site-nav" ref={navRef} aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={item.className}
              aria-current={activePage === item.id ? 'page' : undefined}
              onClick={(e) => handleLinkClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          ref={burgerRef}
          className="burger"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen ? 'true' : 'false'}
          aria-controls="site-nav"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
