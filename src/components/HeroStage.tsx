import { useEffect, useRef } from 'react';
import { PLANET_ORDER, PLANETS, type PlanetId } from '../data/planets';
import { getSidePlanets } from '../utils/astronomy';

interface HeroStageProps {
  featuredPlanet: PlanetId;
  onSelectPlanet: (planet: PlanetId) => void;
  onGetStarted: () => void;
  onScrollToAtlas: () => void;
}

const VIDEO_PLANETS: PlanetId[] = ['earth', 'venus', 'mars'];

export function HeroStage({
  featuredPlanet,
  onSelectPlanet,
  onGetStarted,
  onScrollToAtlas,
}: HeroStageProps) {
  const videoRefs = useRef<Partial<Record<PlanetId, HTMLVideoElement | null>>>({});
  const info = PLANETS[featuredPlanet];
  const [leftId, rightId] = getSidePlanets(featuredPlanet, PLANET_ORDER);
  const leftPlanet = PLANETS[leftId];
  const rightPlanet = PLANETS[rightId];
  const isVideoPlanet = Boolean(info.videoUrl);

  const warmVideo = (planetId: PlanetId) => {
    const v = videoRefs.current[planetId];
    if (!v) return;
    if (!v.getAttribute('src') && v.dataset.src) {
      v.preload = 'auto';
      v.src = v.dataset.src;
      v.load();
    }
  };

  useEffect(() => {
    for (const id of VIDEO_PLANETS) {
      const v = videoRefs.current[id];
      if (!v) continue;
      const active = id === featuredPlanet;
      if (active && !v.getAttribute('src') && v.dataset.src) {
        v.src = v.dataset.src;
      }
      if (active) {
        const playPromise = v.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      } else {
        v.pause();
      }
    }
  }, [featuredPlanet]);

  useEffect(() => {
    const scheduleWarmAll = () => {
      requestAnimationFrame(() => {
        const warmAll = () => VIDEO_PLANETS.forEach(warmVideo);
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(warmAll, { timeout: 4000 });
        } else {
          setTimeout(warmAll, 2500);
        }
      });
    };

    if (document.readyState === 'complete') {
      scheduleWarmAll();
    } else {
      window.addEventListener('load', scheduleWarmAll, { once: true });
      return () => window.removeEventListener('load', scheduleWarmAll);
    }
  }, []);

  return (
    <section className="stage" aria-label="Featured Planet Hero">
      <div
        className={`sky${!isVideoPlanet ? ' is-generated' : ''}`}
        style={
          isVideoPlanet
            ? { backgroundImage: `url("${info.stillUrl}")` }
            : {
                backgroundImage: `radial-gradient(ellipse 90% 55% at 50% 100%, ${info.accentColor}26 0%, rgba(4, 16, 31, 0.96) 65%, #030b17 100%)`,
              }
        }
      >
        <div className="sky-stars" aria-hidden="true" />
        <div className="sky-horizon" aria-hidden="true">
          {!isVideoPlanet && (
            <img src={info.stillUrl} alt="" referrerPolicy="no-referrer" />
          )}
        </div>

        {VIDEO_PLANETS.map((id) => {
          const p = PLANETS[id];
          const isEarth = id === 'earth';
          return (
            <video
              key={id}
              ref={(el) => {
                videoRefs.current[id] = el;
              }}
              data-planet={id}
              className={featuredPlanet === id ? 'is-active' : undefined}
              autoPlay={isEarth}
              muted
              loop
              playsInline
              preload={isEarth ? 'auto' : 'none'}
              src={isEarth ? p.videoUrl : undefined}
              data-src={!isEarth ? p.videoUrl : undefined}
              poster={p.stillUrl}
              aria-hidden="true"
            />
          );
        })}
      </div>

      <div className="ui">
        <div className="copy">
          <div className="col eyebrow">
            <span className="ent-mask">
              <span className="ent-line">PLANET</span>
            </span>
          </div>
          <h1 className="col title">
            <span className="ent-mask">
              <span className="ent-line">{info.name}</span>
            </span>
          </h1>
          <div className="col rule">
            <span />
          </div>
          <p
            className="col lede"
            dangerouslySetInnerHTML={{ __html: info.heroLede }}
          />
          <div className="col cta">
            <button
              className="planet planet-l"
              type="button"
              data-slot="l"
              data-planet={leftId}
              aria-label={`Show ${leftPlanet.name}`}
              onPointerEnter={() => warmVideo(leftId)}
              onFocus={() => warmVideo(leftId)}
              onClick={() => onSelectPlanet(leftId)}
            >
              {PLANET_ORDER.map((id) => {
                const p = PLANETS[id];
                return (
                  <img
                    key={id}
                    data-planet={id}
                    alt=""
                    src={p.cutoutUrl}
                    referrerPolicy="no-referrer"
                    className={`${leftId === id ? 'is-shown' : ''}${p.usesDarkBlend ? ' is-blend' : ''}`}
                  />
                );
              })}
            </button>

            <button
              className="planet planet-r"
              type="button"
              data-slot="r"
              data-planet={rightId}
              aria-label={`Show ${rightPlanet.name}`}
              onPointerEnter={() => warmVideo(rightId)}
              onFocus={() => warmVideo(rightId)}
              onClick={() => onSelectPlanet(rightId)}
            >
              {PLANET_ORDER.map((id) => {
                const p = PLANETS[id];
                return (
                  <img
                    key={id}
                    data-planet={id}
                    alt=""
                    src={p.cutoutUrl}
                    referrerPolicy="no-referrer"
                    className={`${rightId === id ? 'is-shown' : ''}${p.usesDarkBlend ? ' is-blend' : ''}`}
                  />
                );
              })}
            </button>

            <a
              href="#enroll"
              onClick={(e) => {
                e.preventDefault();
                onGetStarted();
              }}
            >
              GET STARTED
            </a>
            <span className="label label-l">{leftPlanet.name}</span>
            <span className="label label-r">{rightPlanet.name}</span>
          </div>
        </div>
      </div>

      <button
        className="scroll"
        type="button"
        aria-label="Scroll to all eight planets"
        onClick={onScrollToAtlas}
      >
        <svg viewBox="0 0 26 33" fill="none" aria-hidden="true">
          <path
            d="M13 1.5 V31.5 M1.9 20.4 L13 31.5 L24.1 20.4"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </button>
    </section>
  );
}
