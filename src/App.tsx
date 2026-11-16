import { useEffect, useState } from 'react';
import { BlogPage } from './components/BlogPage';
import { EnrollPage } from './components/EnrollPage';
import { Footer } from './components/Footer';
import { HeroStage } from './components/HeroStage';
import { Navbar, type PageRoute } from './components/Navbar';
import { PlanetsAtlas } from './components/PlanetsAtlas';
import { TutorialsPage } from './components/TutorialsPage';
import { TutionPage } from './components/TutionPage';
import type { TuitionPlan } from './data/curriculum';
import type { PlanetId } from './data/planets';

const VALID_PAGES: PageRoute[] = ['planets', 'tution', 'tutorials', 'blog', 'enroll'];

function getRouteFromHash(): PageRoute {
  const hash = window.location.hash.replace(/^#/, '').toLowerCase() as PageRoute;
  return VALID_PAGES.includes(hash) ? hash : 'planets';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageRoute>(() => getRouteFromHash());
  const [featuredPlanet, setFeaturedPlanet] = useState<PlanetId>('earth');
  const [isScrolled, setIsScrolled] = useState(false);

  // Enrollment prefill state passed from Tution page
  const [enrollPlanId, setEnrollPlanId] = useState<TuitionPlan['id']>('cohort');
  const [enrollEarlyBird, setEnrollEarlyBird] = useState(true);
  const [enrollDiscountPct, setEnrollDiscountPct] = useState(0);
  const [enrollAddLab, setEnrollAddLab] = useState(false);

  // Run one-time hero entrance animation then remove .anim / .play classes
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('anim')) return;

    let started = false;
    let cleanupTimer: number | undefined;
    const startEntrance = () => {
      if (started) return;
      started = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          root.classList.add('play');
          cleanupTimer = window.setTimeout(() => {
            root.classList.remove('anim', 'play');
          }, 2150);
        });
      });
    };

    const guard = window.setTimeout(startEntrance, 500);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        window.clearTimeout(guard);
        startEntrance();
      });
    }

    return () => {
      window.clearTimeout(guard);
      if (cleanupTimer !== undefined) window.clearTimeout(cleanupTimer);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setActivePage(getRouteFromHash());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (page: PageRoute) => {
    setActivePage(page);
    if (window.location.hash !== `#${page}`) {
      window.history.pushState(null, '', `#${page}`);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleFeatureInHero = (planet: PlanetId) => {
    setFeaturedPlanet(planet);
    if (activePage !== 'planets') {
      navigate('planets');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScrollToAtlas = () => {
    const el = document.getElementById('planets-atlas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlanForEnroll = (
    planId: TuitionPlan['id'],
    isEarlyBird: boolean,
    discountPct: number,
    addLab: boolean
  ) => {
    setEnrollPlanId(planId);
    setEnrollEarlyBird(isEarlyBird);
    setEnrollDiscountPct(discountPct);
    setEnrollAddLab(addLab);
    navigate('enroll');
  };

  return (
    <div className="min-h-screen bg-[#04101f] text-white">
      <Navbar activePage={activePage} isScrolled={isScrolled} onNavigate={navigate} />

      {activePage === 'planets' && (
        <>
          <HeroStage
            featuredPlanet={featuredPlanet}
            onSelectPlanet={setFeaturedPlanet}
            onGetStarted={() => navigate('enroll')}
            onScrollToAtlas={handleScrollToAtlas}
          />
          <PlanetsAtlas
            featuredPlanet={featuredPlanet}
            onFeatureInHero={handleFeatureInHero}
            onOpenTutorials={() => navigate('tutorials')}
          />
        </>
      )}

      {activePage === 'tution' && (
        <TutionPage onSelectPlanForEnroll={handleSelectPlanForEnroll} />
      )}

      {activePage === 'tutorials' && <TutorialsPage />}

      {activePage === 'blog' && <BlogPage />}

      {activePage === 'enroll' && (
        <EnrollPage
          initialPlanId={enrollPlanId}
          initialEarlyBird={enrollEarlyBird}
          initialDiscountPct={enrollDiscountPct}
          initialAddLab={enrollAddLab}
          onGoToTutorials={() => navigate('tutorials')}
        />
      )}

      <Footer onNavigate={navigate} />
    </div>
  );
}
