import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { TUITION_PLANS, type TuitionPlan } from '../data/curriculum';
import { calculateTuitionTotal } from '../utils/astronomy';

interface EnrollPageProps {
  initialPlanId: TuitionPlan['id'];
  initialEarlyBird: boolean;
  initialDiscountPct: number;
  initialAddLab: boolean;
  onGoToTutorials: () => void;
}

const TRACKS = [
  'Full Solar System (All 8 Worlds)',
  'Inner Rocky Worlds (Mercury–Mars)',
  'Gas & Ice Giants (Jupiter–Neptune)',
];

const COHORT_DATES = ['December 1, 2026', 'January 12, 2027', 'February 16, 2027'];

export function EnrollPage({
  initialPlanId,
  initialEarlyBird,
  initialDiscountPct,
  initialAddLab,
  onGoToTutorials,
}: EnrollPageProps) {
  const [planId, setPlanId] = useState<TuitionPlan['id']>(initialPlanId);
  const [isEarlyBird, setIsEarlyBird] = useState(initialEarlyBird);
  const [discountPct, setDiscountPct] = useState(initialDiscountPct);
  const [addLab, setAddLab] = useState(initialAddLab);
  const [track, setTrack] = useState(TRACKS[0]);
  const [cohortDate, setCohortDate] = useState(COHORT_DATES[0]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('Intermediate');
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const activePlan = TUITION_PLANS.find((p) => p.id === planId) ?? TUITION_PLANS[1];
  const pricing = calculateTuitionTotal({
    earlyBirdPrice: activePlan.earlyBirdPrice,
    standardPrice: activePlan.standardPrice,
    isEarlyBird,
    discountPercent: discountPct,
    addTelescopeLab: addLab,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: { fullName?: string; email?: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const code = `SE-${activePlan.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(code);
  };

  return (
    <main className="min-h-screen bg-[#04101f] px-6 pt-32 pb-24 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="border-b border-white/10 pb-8">
          <p className="text-xs font-medium tracking-[0.22em] text-[#79dce8] uppercase">
            Course Enrollment
          </p>
          <h1
            className="mt-3 text-4xl font-normal tracking-tight text-white md:text-5xl"
            style={{ fontFamily: 'var(--font-serif)', textWrap: 'balance' }}
          >
            Reserve Your SpaceEdu Seat
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300">
            Select your tuition tier, planetary study track, and upcoming cohort start date. Early Bird pricing applies automatically when selected.
          </p>
        </div>

        {submittedRef ? (
          <section
            aria-label="Enrollment Confirmation"
            className="mt-10 rounded-2xl border border-[#79dce8]/50 bg-[#071426] p-8 md:p-10"
          >
            <div className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-[#79dce8]" aria-hidden="true" />
              <div>
                <p className="text-xs tracking-wider text-[#79dce8] uppercase">
                  Seat Reserved · {submittedRef}
                </p>
                <h2
                  className="mt-2 text-3xl font-normal text-white"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Welcome to SpaceEdu, {fullName.trim()}
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  Confirmation details have been prepared for <span className="text-white">{email.trim()}</span>.
                </p>
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-white/10 bg-[#0a1b34] p-4">
                <dt className="text-xs text-slate-400">Tuition Plan</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{activePlan.name}</dd>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0a1b34] p-4">
                <dt className="text-xs text-slate-400">Planetary Track</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{track}</dd>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0a1b34] p-4">
                <dt className="text-xs text-slate-400">Cohort Start</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{cohortDate}</dd>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0a1b34] p-4">
                <dt className="text-xs text-slate-400">Total Tuition</dt>
                <dd className="mt-1 font-mono-tabular text-lg font-semibold text-[#79dce8]">
                  ${pricing.total} USD
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={onGoToTutorials}
                className="cursor-pointer rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#071227] hover:opacity-90"
              >
                Start First Tutorial
              </button>
              <button
                type="button"
                onClick={() => setSubmittedRef(null)}
                className="cursor-pointer rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white hover:border-[#79dce8]"
              >
                Modify Enrollment
              </button>
            </div>
          </section>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-6 rounded-2xl border border-white/10 bg-[#071426] p-6 md:p-8 lg:col-span-7">
              <div>
                <label htmlFor="enroll-name" className="block text-sm font-medium text-white">
                  Full Name
                </label>
                <input
                  id="enroll-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jordan Mercer"
                  aria-invalid={Boolean(errors.fullName)}
                  className="mt-2 w-full rounded-lg border border-white/15 bg-[#0a1b34] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#79dce8] focus:outline-none"
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-rose-400" role="alert">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="enroll-email" className="block text-sm font-medium text-white">
                  Email Address
                </label>
                <input
                  id="enroll-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan@observatory.org"
                  aria-invalid={Boolean(errors.email)}
                  className="mt-2 w-full rounded-lg border border-white/15 bg-[#0a1b34] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#79dce8] focus:outline-none"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-400" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="enroll-plan" className="block text-sm font-medium text-white">
                    Tuition Plan
                  </label>
                  <select
                    id="enroll-plan"
                    value={planId}
                    onChange={(e) => setPlanId(e.target.value as TuitionPlan['id'])}
                    className="mt-2 w-full rounded-lg border border-white/15 bg-[#0a1b34] px-3 py-2.5 text-sm text-white focus:border-[#79dce8] focus:outline-none"
                  >
                    {TUITION_PLANS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="enroll-cohort" className="block text-sm font-medium text-white">
                    Cohort Start Date
                  </label>
                  <select
                    id="enroll-cohort"
                    value={cohortDate}
                    onChange={(e) => setCohortDate(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-white/15 bg-[#0a1b34] px-3 py-2.5 text-sm text-white focus:border-[#79dce8] focus:outline-none"
                  >
                    {COHORT_DATES.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="enroll-track" className="block text-sm font-medium text-white">
                    Primary Study Track
                  </label>
                  <select
                    id="enroll-track"
                    value={track}
                    onChange={(e) => setTrack(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-white/15 bg-[#0a1b34] px-3 py-2.5 text-sm text-white focus:border-[#79dce8] focus:outline-none"
                  >
                    {TRACKS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="enroll-exp" className="block text-sm font-medium text-white">
                    Astronomy Background
                  </label>
                  <select
                    id="enroll-exp"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-white/15 bg-[#0a1b34] px-3 py-2.5 text-sm text-white focus:border-[#79dce8] focus:outline-none"
                  >
                    <option value="Beginner">Beginner / First Course</option>
                    <option value="Intermediate">Intermediate / Backyard Observer</option>
                    <option value="Advanced">Advanced / Physics or STEM</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="enroll-discount" className="block text-sm font-medium text-white">
                    Academic Discount
                  </label>
                  <select
                    id="enroll-discount"
                    value={discountPct}
                    onChange={(e) => setDiscountPct(Number(e.target.value))}
                    className="mt-2 w-full rounded-lg border border-white/15 bg-[#0a1b34] px-3 py-2.5 text-sm text-white focus:border-[#79dce8] focus:outline-none"
                  >
                    <option value={0}>None (0%)</option>
                    <option value={15}>Student (-15%)</option>
                    <option value={20}>Educator (-20%)</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <label className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-white/15 bg-[#0a1b34] px-3.5 py-2.5 text-sm text-white">
                    <input
                      type="checkbox"
                      checked={isEarlyBird}
                      onChange={(e) => setIsEarlyBird(e.target.checked)}
                      className="h-4 w-4 accent-[#79dce8]"
                    />
                    <span>Early Bird Window (-25%)</span>
                  </label>
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#0a1b34] p-4">
                <input
                  type="checkbox"
                  checked={addLab}
                  onChange={(e) => setAddLab(e.target.checked)}
                  className="h-4 w-4 accent-[#79dce8]"
                />
                <span className="text-sm text-slate-200">
                  Include Live Remote Telescope Calibration Lab (+$45)
                </span>
              </label>
            </div>

            <aside className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#071426] p-6 md:p-8 lg:col-span-5">
              <div>
                <p className="text-xs tracking-wider text-slate-400 uppercase">Enrollment Summary</p>
                <h2
                  className="mt-2 text-2xl font-normal text-white"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {activePlan.name}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {activePlan.duration} · {cohortDate}
                </p>

                <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-300">Base Tuition</dt>
                    <dd className="font-mono-tabular text-white">${pricing.base}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-300">Academic Reduction</dt>
                    <dd className="font-mono-tabular text-[#79dce8]">-${pricing.discountAmount}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-300">Telescope Calibration Lab</dt>
                    <dd className="font-mono-tabular text-white">+${pricing.addOnAmount}</dd>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-4 text-base font-semibold">
                    <dt className="text-white">Total Due</dt>
                    <dd className="font-mono-tabular text-2xl text-white">${pricing.total} USD</dd>
                  </div>
                </dl>
              </div>

              <button
                type="submit"
                className="mt-8 w-full cursor-pointer rounded-full bg-white py-3.5 text-sm font-semibold text-[#071227] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[#79dce8]"
              >
                Complete Enrollment
              </button>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}
