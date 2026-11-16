import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { TUTORIALS, type TutorialItem } from '../data/curriculum';
import { PLANET_ORDER, PLANETS } from '../data/planets';
import {
  calculateEscapeVelocityKmS,
  calculateKeplerPeriodYears,
  calculateOrbitalVelocityKmS,
  calculateSurfaceGravityG,
} from '../utils/astronomy';

const STORAGE_KEY = 'spaceedu_completed_tutorial_steps';

type TopicFilter = 'All' | TutorialItem['topic'];
const TOPICS: TopicFilter[] = [
  'All',
  'Orbital Mechanics',
  'Planetary Atmospheres',
  'Optics & Telescopes',
  'Astrophotography',
];

export function TutorialsPage() {
  const [topicFilter, setTopicFilter] = useState<TopicFilter>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [selectedTutorialId, setSelectedTutorialId] = useState<string>(TUTORIALS[0].id);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Record<string, boolean>) : {};
    } catch {
      return {};
    }
  });

  // Interactive Orbital & Escape Velocity Lab State
  const [axisAu, setAxisAu] = useState<number>(1.0);
  const [massEarths, setMassEarths] = useState<number>(1.0);
  const [radiusEarths, setRadiusEarths] = useState<number>(1.0);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completedSteps));
    } catch {
      // Ignore storage failures in restricted contexts
    }
  }, [completedSteps]);

  const filteredTutorials = useMemo(() => {
    return TUTORIALS.filter((t) => {
      if (topicFilter !== 'All' && t.topic !== topicFilter) return false;
      if (difficultyFilter !== 'All' && t.difficulty !== difficultyFilter) return false;
      return true;
    });
  }, [topicFilter, difficultyFilter]);

  const activeTutorial =
    filteredTutorials.find((t) => t.id === selectedTutorialId) ??
    filteredTutorials[0] ??
    TUTORIALS[0];

  const toggleStep = (tutorialId: string, stepIdx: number) => {
    const key = `${tutorialId}:${stepIdx}`;
    setCompletedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedInActive = activeTutorial.steps.filter(
    (_, idx) => completedSteps[`${activeTutorial.id}:${idx}`]
  ).length;

  const periodYears = calculateKeplerPeriodYears(axisAu);
  const orbitalSpeed = calculateOrbitalVelocityKmS(axisAu);
  const escapeVel = calculateEscapeVelocityKmS(massEarths, radiusEarths);
  const surfaceG = calculateSurfaceGravityG(massEarths, radiusEarths);

  return (
    <main className="min-h-screen bg-[#04101f] px-6 pt-32 pb-24 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="border-b border-white/10 pb-10">
          <p className="text-xs font-medium tracking-[0.22em] text-[#79dce8] uppercase">
            Guided Astronomy Tutorials
          </p>
          <h1
            className="mt-3 text-4xl font-normal tracking-tight text-white md:text-5xl"
            style={{ fontFamily: 'var(--font-serif)', textWrap: 'balance' }}
          >
            Interactive Tutorials &amp; Orbital Mechanics Lab
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300">
            Work through step-by-step derivations, check off completed lab stages, and test real planetary parameters below.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter tutorials by topic">
            {TOPICS.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setTopicFilter(topic)}
                className={`cursor-pointer rounded-lg border px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-[#79dce8] ${
                  topicFilter === topic
                    ? 'border-[#79dce8]/60 bg-[#79dce8]/15 text-[#79dce8]'
                    : 'border-white/10 bg-[#08162b] text-slate-300 hover:border-white/25 hover:text-white'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="tutorial-level" className="text-xs text-slate-400">
              Level
            </label>
            <select
              id="tutorial-level"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="rounded-lg border border-white/15 bg-[#08162b] px-3 py-2 text-sm text-white focus:border-[#79dce8] focus:outline-none"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Two-Column Interactive Tutorial Workspace */}
        {filteredTutorials.length === 0 ? (
          <div className="mt-8 rounded-xl border border-white/10 bg-[#08162b] p-10 text-center">
            <p className="text-slate-300">No tutorials match the current topic and difficulty filters.</p>
            <button
              type="button"
              onClick={() => {
                setTopicFilter('All');
                setDifficultyFilter('All');
              }}
              className="mt-4 cursor-pointer rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:border-[#79dce8]"
            >
              Show all tutorials
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Tutorial List */}
            <div className="space-y-3 lg:col-span-5">
              {filteredTutorials.map((tut) => {
                const isActive = activeTutorial.id === tut.id;
                const doneCount = tut.steps.filter(
                  (_, idx) => completedSteps[`${tut.id}:${idx}`]
                ).length;
                return (
                  <button
                    key={tut.id}
                    type="button"
                    onClick={() => setSelectedTutorialId(tut.id)}
                    className={`w-full cursor-pointer rounded-xl border p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-[#79dce8] ${
                      isActive
                        ? 'border-[#79dce8]/70 bg-[#0b1f3b]'
                        : 'border-white/10 bg-[#08162b] hover:border-white/25'
                    }`}
                  >
                    <p className="text-xs text-slate-400">
                      {tut.topic} · {tut.difficulty} · {tut.durationMinutes} min
                    </p>
                    <h2
                      className="mt-2 text-lg font-normal text-white"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {tut.title}
                    </h2>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                      <span className="font-mono-tabular text-[#79dce8]">
                        {doneCount}/{tut.steps.length} steps complete
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Lesson Deck */}
            <section
              aria-label="Active tutorial workspace"
              className="rounded-2xl border border-white/10 bg-[#071426] p-6 md:p-8 lg:col-span-7"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs text-slate-400">
                    {activeTutorial.topic} · {activeTutorial.difficulty} · {activeTutorial.durationMinutes} min
                  </p>
                  <h2
                    className="mt-2 text-2xl font-normal text-white md:text-3xl"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {activeTutorial.title}
                  </h2>
                </div>
                <span className="font-mono-tabular text-sm text-[#79dce8]">
                  {completedInActive} / {activeTutorial.steps.length} done
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {activeTutorial.summary}
              </p>

              <div className="mt-6 space-y-4">
                {activeTutorial.steps.map((step, idx) => {
                  const isDone = Boolean(completedSteps[`${activeTutorial.id}:${idx}`]);
                  return (
                    <div
                      key={step.title}
                      className={`rounded-xl border p-5 transition-colors ${
                        isDone
                          ? 'border-[#79dce8]/45 bg-[#0b1f3b]'
                          : 'border-white/10 bg-[#0a1b34]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span className="font-mono-tabular mt-0.5 text-xs text-[#79dce8]">
                            0{idx + 1}.
                          </span>
                          <div>
                            <h3 className="text-base font-semibold text-white">
                              {step.title}
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                              {step.detail}
                            </p>
                            {step.equation && (
                              <p className="font-mono-tabular mt-3 rounded-lg border border-white/10 bg-[#04101f] px-3.5 py-2 text-xs text-[#79dce8]">
                                {step.equation}
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleStep(activeTutorial.id, idx)}
                          aria-label={
                            isDone
                              ? `Mark step ${idx + 1} incomplete`
                              : `Mark step ${idx + 1} complete`
                          }
                          className="shrink-0 cursor-pointer text-slate-300 hover:text-[#79dce8] focus-visible:outline-2 focus-visible:outline-[#79dce8]"
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-5 w-5 text-[#79dce8]" />
                          ) : (
                            <Circle className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* Interactive Kepler & Escape Velocity Lab */}
        <section
          aria-label="Kepler and Escape Velocity Interactive Lab"
          className="mt-14 rounded-2xl border border-white/10 bg-[#071426] p-6 md:p-10"
        >
          <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-[#79dce8] uppercase">
                Live Physics Sandbox
              </p>
              <h2
                className="mt-2 text-2xl font-normal text-white md:text-3xl"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Kepler’s Third Law &amp; Escape Velocity Simulator
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Load planet presets">
              {PLANET_ORDER.map((id) => {
                const p = PLANETS[id];
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setAxisAu(p.distanceAu);
                      setMassEarths(p.massEarths);
                      setRadiusEarths(p.radiusEarths);
                    }}
                    className="cursor-pointer rounded-md border border-white/15 bg-[#0a1b34] px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:border-[#79dce8] hover:text-[#79dce8] focus-visible:outline-2 focus-visible:outline-[#79dce8]"
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-6">
              <div>
                <div className="flex justify-between text-sm">
                  <label htmlFor="slider-au" className="text-slate-300">
                    Semi-Major Axis (a)
                  </label>
                  <span className="font-mono-tabular text-[#79dce8]">{axisAu.toFixed(2)} AU</span>
                </div>
                <input
                  id="slider-au"
                  type="range"
                  min={0.3}
                  max={35}
                  step={0.05}
                  value={axisAu}
                  onChange={(e) => setAxisAu(Number(e.target.value))}
                  className="mt-2 w-full accent-[#79dce8]"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <label htmlFor="slider-mass" className="text-slate-300">
                    Planetary Mass (M)
                  </label>
                  <span className="font-mono-tabular text-[#79dce8]">{massEarths.toFixed(2)} M⊕</span>
                </div>
                <input
                  id="slider-mass"
                  type="range"
                  min={0.05}
                  max={320}
                  step={0.05}
                  value={massEarths}
                  onChange={(e) => setMassEarths(Number(e.target.value))}
                  className="mt-2 w-full accent-[#79dce8]"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <label htmlFor="slider-radius" className="text-slate-300">
                    Planetary Radius (R)
                  </label>
                  <span className="font-mono-tabular text-[#79dce8]">{radiusEarths.toFixed(2)} R⊕</span>
                </div>
                <input
                  id="slider-radius"
                  type="range"
                  min={0.35}
                  max={11.5}
                  step={0.05}
                  value={radiusEarths}
                  onChange={(e) => setRadiusEarths(Number(e.target.value))}
                  className="mt-2 w-full accent-[#79dce8]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:col-span-6">
              <div className="rounded-xl border border-white/10 bg-[#0a1b34] p-5">
                <p className="text-xs text-slate-400">Orbital Period (T = a¹·⁵)</p>
                <p className="mt-2 font-mono-tabular text-3xl font-semibold text-white">
                  {periodYears} <span className="text-sm font-normal text-slate-400">yrs</span>
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0a1b34] p-5">
                <p className="text-xs text-slate-400">Mean Orbital Speed</p>
                <p className="mt-2 font-mono-tabular text-3xl font-semibold text-white">
                  {orbitalSpeed} <span className="text-sm font-normal text-slate-400">km/s</span>
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0a1b34] p-5">
                <p className="text-xs text-slate-400">Escape Velocity</p>
                <p className="mt-2 font-mono-tabular text-3xl font-semibold text-[#79dce8]">
                  {escapeVel} <span className="text-sm font-normal text-slate-400">km/s</span>
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0a1b34] p-5">
                <p className="text-xs text-slate-400">Surface Gravity</p>
                <p className="mt-2 font-mono-tabular text-3xl font-semibold text-white">
                  {surfaceG} <span className="text-sm font-normal text-slate-400">g</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
