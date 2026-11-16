import { useMemo, useState } from 'react';
import { ArrowUpRight, Search, Sparkles } from 'lucide-react';
import { PLANET_ORDER, PLANETS, type PlanetCategory, type PlanetId } from '../data/planets';
import { calculateWeightOnPlanet } from '../utils/astronomy';

interface PlanetsAtlasProps {
  featuredPlanet: PlanetId;
  onFeatureInHero: (planet: PlanetId) => void;
  onOpenTutorials: () => void;
}

type CategoryFilter = 'All' | PlanetCategory;

const CATEGORIES: CategoryFilter[] = ['All', 'Terrestrial', 'Gas Giant', 'Ice Giant'];

export function PlanetsAtlas({
  featuredPlanet,
  onFeatureInHero,
  onOpenTutorials,
}: PlanetsAtlasProps) {
  const [selectedId, setSelectedId] = useState<PlanetId>(featuredPlanet);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [compareA, setCompareA] = useState<PlanetId>('earth');
  const [compareB, setCompareB] = useState<PlanetId>('jupiter');
  const [massKg, setMassKg] = useState<number>(70);

  const filteredPlanets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PLANET_ORDER.map((id) => PLANETS[id]).filter((p) => {
      if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.notableMoons.some((m) => m.toLowerCase().includes(q)) ||
        p.missions.some((m) => m.toLowerCase().includes(q))
      );
    });
  }, [categoryFilter, searchQuery]);

  const activePlanet = PLANETS[selectedId];
  const planetA = PLANETS[compareA];
  const planetB = PLANETS[compareB];

  const diameterRatio = (planetB.diameterKm / planetA.diameterKm).toFixed(2);
  const gravityRatio = (planetB.gravityMs2 / planetA.gravityMs2).toFixed(2);
  const distanceDeltaAu = Math.abs(planetB.distanceAu - planetA.distanceAu).toFixed(2);
  const periodRatio = (planetB.orbitalPeriodDays / planetA.orbitalPeriodDays).toFixed(2);

  return (
    <section
      id="planets-atlas"
      aria-label="Solar System Planetary Atlas"
      className="border-t border-white/10 bg-[#04101f] px-6 py-20 text-white"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-[#79dce8] uppercase">
              Solar System Encyclopedia
            </p>
            <h2
              className="mt-3 text-3xl font-normal tracking-tight text-white md:text-4xl"
              style={{ fontFamily: 'var(--font-serif)', textWrap: 'balance' }}
            >
              All Eight Planets &amp; Telemetry
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300">
              Inspect physical structure, atmospheric chemistry, moon systems, and orbital dynamics across every world orbiting our Sun.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search planet, moon, mission..."
                aria-label="Search planets, moons, or missions"
                className="w-full rounded-lg border border-white/15 bg-[#08162b] py-2.5 pr-3.5 pl-10 text-sm text-white placeholder-slate-400 focus:border-[#79dce8] focus:outline-none sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          className="mt-8 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter planets by classification"
        >
          {CATEGORIES.map((cat) => {
            const active = categoryFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-[#79dce8] ${
                  active
                    ? 'border-[#79dce8]/60 bg-[#79dce8]/15 text-[#79dce8]'
                    : 'border-white/10 bg-[#08162b] text-slate-300 hover:border-white/25 hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All Planets (8)' : cat}
              </button>
            );
          })}
        </div>

        {/* 8-Planet Grid */}
        {filteredPlanets.length === 0 ? (
          <div className="mt-8 rounded-xl border border-white/10 bg-[#08162b] p-10 text-center">
            <p className="text-base text-slate-300">
              No planets matched &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('All');
              }}
              className="mt-4 cursor-pointer rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white hover:border-[#79dce8]"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPlanets.map((p) => {
              const isSelected = selectedId === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  className={`group flex cursor-pointer flex-col rounded-xl border p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-[#79dce8] ${
                    isSelected
                      ? 'border-[#79dce8]/70 bg-[#0b1f3b]'
                      : 'border-white/10 bg-[#08162b] hover:border-white/25 hover:bg-[#0a1b34]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-400">
                      0{p.orderIndex} · {p.category}
                    </span>
                    <span className="font-mono-tabular text-xs text-[#79dce8]">
                      {p.distanceAu.toFixed(2)} AU
                    </span>
                  </div>

                  <div className="my-5 flex h-28 items-center justify-center">
                    <img
                      src={p.cutoutUrl}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className={`h-24 w-24 object-contain transition-transform duration-300 group-hover:scale-105 ${
                        p.usesDarkBlend ? 'mix-blend-screen' : ''
                      }`}
                    />
                  </div>

                  <h3
                    className="text-xl font-normal tracking-wide text-white"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {p.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-400">
                    {p.tagline}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-slate-300 tabular-nums">
                    <span>{p.diameterKm.toLocaleString()} km</span>
                    <span>{p.moonsCount} {p.moonsCount === 1 ? 'moon' : 'moons'}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Active Planet Detail Inspector */}
        <div
          className="mt-10 grid grid-cols-1 gap-8 rounded-2xl border border-white/10 bg-[#071426] p-6 md:p-10 lg:grid-cols-12"
          aria-live="polite"
        >
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-xs text-slate-400">
                Planet 0{activePlanet.orderIndex} · {activePlanet.category} · {activePlanet.distanceMillionKm}M km from Sun
              </p>
              <h3
                className="mt-2 text-4xl font-normal tracking-wide text-white"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {activePlanet.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {activePlanet.overview}
              </p>
            </div>

            <div className="my-8 flex items-center justify-center rounded-xl border border-white/10 bg-[#030b17] p-8">
              <img
                src={activePlanet.cutoutUrl}
                alt={`${activePlanet.name} observatory view`}
                referrerPolicy="no-referrer"
                className={`h-52 w-52 object-contain ${
                  activePlanet.usesDarkBlend ? 'mix-blend-screen' : ''
                }`}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onFeatureInHero(activePlanet.id)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#071227] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[#79dce8]"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Feature in Hero
              </button>
              <button
                type="button"
                onClick={onOpenTutorials}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#79dce8] hover:text-[#79dce8] focus-visible:outline-2 focus-visible:outline-[#79dce8]"
              >
                Orbital Lab
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:col-span-7">
            {/* Telemetry Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-[#0a1b34] p-4">
                <p className="text-xs text-slate-400">Mean Diameter</p>
                <p className="mt-1 font-mono-tabular text-lg font-medium text-white">
                  {activePlanet.diameterKm.toLocaleString()} km
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0a1b34] p-4">
                <p className="text-xs text-slate-400">Mass</p>
                <p className="mt-1 font-mono-tabular text-lg font-medium text-white">
                  {activePlanet.massKgText}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0a1b34] p-4">
                <p className="text-xs text-slate-400">Surface Gravity</p>
                <p className="mt-1 font-mono-tabular text-lg font-medium text-white">
                  {activePlanet.gravityMs2} m/s²
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0a1b34] p-4">
                <p className="text-xs text-slate-400">Orbital Period</p>
                <p className="mt-1 font-mono-tabular text-lg font-medium text-white">
                  {activePlanet.orbitalPeriodLabel}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0a1b34] p-4">
                <p className="text-xs text-slate-400">Day Length</p>
                <p className="mt-1 font-mono-tabular text-lg font-medium text-white">
                  {activePlanet.rotationPeriodLabel}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0a1b34] p-4">
                <p className="text-xs text-slate-400">Temperature</p>
                <p className="mt-1 font-mono-tabular text-lg font-medium text-white">
                  {activePlanet.meanTempC} °C
                </p>
                <p className="mt-0.5 text-xs text-slate-400">{activePlanet.tempRangeC}</p>
              </div>
            </div>

            {/* Atmospheric Composition */}
            <div className="rounded-xl border border-white/10 bg-[#0a1b34] p-5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">Atmospheric Composition</h4>
                <span className="text-xs text-slate-400">
                  Axial Tilt: <span className="font-mono-tabular text-slate-200">{activePlanet.axialTiltDeg}°</span>
                </span>
              </div>
              <div className="mt-3 flex h-3 w-full overflow-hidden rounded-full bg-white/10">
                {activePlanet.atmosphere.map((gas) => (
                  <div
                    key={gas.symbol}
                    style={{ width: `${Math.max(gas.percent, 2)}%`, backgroundColor: gas.color }}
                    title={`${gas.name}: ${gas.percent}%`}
                  />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-300">
                {activePlanet.atmosphere.map((gas) => (
                  <span key={gas.symbol} className="inline-flex items-center gap-2">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-sm"
                      style={{ backgroundColor: gas.color }}
                      aria-hidden="true"
                    />
                    <span className="font-medium text-white">{gas.symbol}</span>
                    <span>{gas.name}</span>
                    <span className="font-mono-tabular text-slate-400">{gas.percent}%</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Moons, Missions & Highlights */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#0a1b34] p-5">
                <h4 className="text-sm font-semibold text-white">Key Findings</h4>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                  {activePlanet.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[#79dce8]" aria-hidden="true">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0a1b34] p-5">
                <h4 className="text-sm font-semibold text-white">Moons &amp; Spacecraft</h4>
                <p className="mt-3 text-xs text-slate-400">
                  Notable Moons ({activePlanet.moonsCount} total)
                </p>
                <p className="mt-1 text-sm text-slate-200">
                  {activePlanet.notableMoons.join(' · ')}
                </p>
                <p className="mt-4 text-xs text-slate-400">Key Missions</p>
                <p className="mt-1 text-sm text-slate-200">
                  {activePlanet.missions.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison & Gravity Weight Lab */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Planet Comparator */}
          <div className="rounded-2xl border border-white/10 bg-[#071426] p-6 md:p-8">
            <h3
              className="text-2xl font-normal text-white"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Side-by-Side Planet Comparator
            </h3>
            <p className="mt-1.5 text-sm text-slate-400">
              Contrast scale, gravity, and orbital distance between any two worlds.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="compare-a" className="block text-xs text-slate-400">
                  Reference World (A)
                </label>
                <select
                  id="compare-a"
                  value={compareA}
                  onChange={(e) => setCompareA(e.target.value as PlanetId)}
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0a1b34] px-3 py-2.5 text-sm text-white focus:border-[#79dce8] focus:outline-none"
                >
                  {PLANET_ORDER.map((id) => (
                    <option key={id} value={id}>
                      {PLANETS[id].name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="compare-b" className="block text-xs text-slate-400">
                  Target World (B)
                </label>
                <select
                  id="compare-b"
                  value={compareB}
                  onChange={(e) => setCompareB(e.target.value as PlanetId)}
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0a1b34] px-3 py-2.5 text-sm text-white focus:border-[#79dce8] focus:outline-none"
                >
                  {PLANET_ORDER.map((id) => (
                    <option key={id} value={id}>
                      {PLANETS[id].name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-white/10 bg-[#0a1b34] p-4">
                <p className="text-xs text-slate-400">Diameter Ratio (B / A)</p>
                <p className="mt-1 font-mono-tabular text-2xl font-medium text-[#79dce8]">
                  {diameterRatio}×
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0a1b34] p-4">
                <p className="text-xs text-slate-400">Gravity Ratio (B / A)</p>
                <p className="mt-1 font-mono-tabular text-2xl font-medium text-white">
                  {gravityRatio}×
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0a1b34] p-4">
                <p className="text-xs text-slate-400">Orbital Separation</p>
                <p className="mt-1 font-mono-tabular text-2xl font-medium text-white">
                  {distanceDeltaAu} AU
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0a1b34] p-4">
                <p className="text-xs text-slate-400">Year Ratio (B / A)</p>
                <p className="mt-1 font-mono-tabular text-2xl font-medium text-white">
                  {periodRatio}×
                </p>
              </div>
            </div>
          </div>

          {/* Gravity Weight Lab */}
          <div className="rounded-2xl border border-white/10 bg-[#071426] p-6 md:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3
                  className="text-2xl font-normal text-white"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Solar System Gravity Lab
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Enter an Earth mass in kg to compute equivalent weight across all 8 planets.
                </p>
              </div>
              <div className="shrink-0">
                <label htmlFor="mass-input" className="block text-xs text-slate-400">
                  Mass (kg)
                </label>
                <input
                  id="mass-input"
                  type="number"
                  min={1}
                  max={10000}
                  value={massKg}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setMassKg(Number.isFinite(val) ? Math.max(0, Math.min(10000, val)) : 0);
                  }}
                  className="mt-1 w-28 rounded-lg border border-white/15 bg-[#0a1b34] px-3 py-2 font-mono-tabular text-sm text-white focus:border-[#79dce8] focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {PLANET_ORDER.map((id) => {
                const p = PLANETS[id];
                const result = calculateWeightOnPlanet(massKg, p.gravityMs2);
                return (
                  <div
                    key={id}
                    className="rounded-lg border border-white/10 bg-[#0a1b34] p-3"
                  >
                    <p className="text-xs font-medium text-slate-300">{p.name}</p>
                    <p className="mt-1 font-mono-tabular text-base font-semibold text-white">
                      {result.earthEquivalentKg} kg
                    </p>
                    <p className="font-mono-tabular text-xs text-slate-400">
                      {result.newtons} N
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
