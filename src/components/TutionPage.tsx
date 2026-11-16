import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { TUITION_FAQS, TUITION_PLANS, type TuitionPlan } from '../data/curriculum';
import { calculateTuitionTotal } from '../utils/astronomy';

interface TutionPageProps {
  onSelectPlanForEnroll: (planId: TuitionPlan['id'], isEarlyBird: boolean, discountPct: number, addLab: boolean) => void;
}

export function TutionPage({ onSelectPlanForEnroll }: TutionPageProps) {
  const [isEarlyBird, setIsEarlyBird] = useState(true);
  const [calcPlanId, setCalcPlanId] = useState<TuitionPlan['id']>('cohort');
  const [discountPct, setDiscountPct] = useState<number>(0);
  const [addLab, setAddLab] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<string | null>('early-bird');

  const selectedPlan = TUITION_PLANS.find((p) => p.id === calcPlanId) ?? TUITION_PLANS[1];
  const calcResult = calculateTuitionTotal({
    earlyBirdPrice: selectedPlan.earlyBirdPrice,
    standardPrice: selectedPlan.standardPrice,
    isEarlyBird,
    discountPercent: discountPct,
    addTelescopeLab: addLab,
  });

  return (
    <main className="min-h-screen bg-[#04101f] px-6 pt-32 pb-24 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-[#79dce8] uppercase">
              Course Tuition &amp; Cohorts
            </p>
            <h1
              className="mt-3 text-4xl font-normal tracking-tight text-white md:text-5xl"
              style={{ fontFamily: 'var(--font-serif)', textWrap: 'balance' }}
            >
              Transparent Tuition for Every Explorer
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300">
              Early Bird pricing saves 25% during the first seven days of each cohort launch. All plans include full planetary telemetry labs.
            </p>
          </div>

          <div
            className="inline-flex shrink-0 rounded-lg border border-white/15 bg-[#08162b] p-1"
            role="group"
            aria-label="Tuition pricing window"
          >
            <button
              type="button"
              onClick={() => setIsEarlyBird(true)}
              className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-[#79dce8] ${
                isEarlyBird ? 'bg-white text-[#071227]' : 'text-slate-300 hover:text-white'
              }`}
            >
              Early Bird (-25%)
            </button>
            <button
              type="button"
              onClick={() => setIsEarlyBird(false)}
              className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-[#79dce8] ${
                !isEarlyBird ? 'bg-white text-[#071227]' : 'text-slate-300 hover:text-white'
              }`}
            >
              Standard Rate
            </button>
          </div>
        </div>

        {/* 3 Tuition Plans */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TUITION_PLANS.map((plan) => {
            const price = isEarlyBird ? plan.earlyBirdPrice : plan.standardPrice;
            return (
              <section
                key={plan.id}
                aria-label={`${plan.name} tuition plan`}
                className={`flex flex-col justify-between rounded-2xl border p-7 ${
                  plan.recommended
                    ? 'border-[#79dce8]/60 bg-[#0b1f3b]'
                    : 'border-white/10 bg-[#08162b]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                    <span>{plan.duration} · {plan.seatLimit}</span>
                    {plan.recommended && (
                      <span className="font-medium text-[#79dce8]">Most Popular</span>
                    )}
                  </div>

                  <h2
                    className="mt-3 text-2xl font-normal text-white"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {plan.name}
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-300">{plan.subtitle}</p>

                  <div className="mt-6 flex items-baseline gap-2 border-b border-white/10 pb-6">
                    <span className="font-mono-tabular text-4xl font-semibold text-white">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-400">
                      USD {isEarlyBird ? '· Early Bird' : '· Standard'}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-slate-200">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#79dce8]"
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPlanForEnroll(plan.id, isEarlyBird, discountPct, addLab)}
                  className={`mt-8 w-full cursor-pointer rounded-full py-3 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[#79dce8] ${
                    plan.recommended
                      ? 'bg-white text-[#071227]'
                      : 'border border-white/20 bg-transparent text-white hover:border-[#79dce8]'
                  }`}
                >
                  Select {plan.name}
                </button>
              </section>
            );
          })}
        </div>

        {/* Interactive Tuition & Scholarship Estimator */}
        <section
          aria-label="Tuition and Scholarship Calculator"
          className="mt-14 grid grid-cols-1 gap-8 rounded-2xl border border-white/10 bg-[#071426] p-7 md:p-10 lg:grid-cols-12"
        >
          <div className="space-y-6 lg:col-span-7">
            <div>
              <h2
                className="text-2xl font-normal text-white"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Tuition &amp; Scholarship Estimator
              </h2>
              <p className="mt-1.5 text-sm text-slate-400">
                Calculate exact net tuition with academic discounts or optional observatory lab time.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="calc-plan" className="block text-xs text-slate-400">
                  Selected Plan
                </label>
                <select
                  id="calc-plan"
                  value={calcPlanId}
                  onChange={(e) => setCalcPlanId(e.target.value as TuitionPlan['id'])}
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0a1b34] px-3 py-2.5 text-sm text-white focus:border-[#79dce8] focus:outline-none"
                >
                  {TUITION_PLANS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="calc-discount" className="block text-xs text-slate-400">
                  Learner Eligibility
                </label>
                <select
                  id="calc-discount"
                  value={discountPct}
                  onChange={(e) => setDiscountPct(Number(e.target.value))}
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0a1b34] px-3 py-2.5 text-sm text-white focus:border-[#79dce8] focus:outline-none"
                >
                  <option value={0}>Independent Learner (0%)</option>
                  <option value={15}>Full-Time Student (-15%)</option>
                  <option value={20}>STEM Educator (-20%)</option>
                </select>
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#0a1b34] p-4">
              <input
                type="checkbox"
                checked={addLab}
                onChange={(e) => setAddLab(e.target.checked)}
                className="h-4 w-4 accent-[#79dce8]"
              />
              <div>
                <span className="text-sm font-medium text-white">
                  Add Live Remote Telescope Calibration Lab (+$45)
                </span>
                <p className="text-xs text-slate-400">
                  Includes 90 minutes of scheduled planetary imaging time with instructor guidance.
                </p>
              </div>
            </label>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0a1b34] p-6 lg:col-span-5">
            <div>
              <p className="text-xs tracking-wider text-slate-400 uppercase">Itemized Summary</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-300">{selectedPlan.name}</dt>
                  <dd className="font-mono-tabular text-white">${calcResult.base}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-300">Academic / Educator Reduction</dt>
                  <dd className="font-mono-tabular text-[#79dce8]">
                    -${calcResult.discountAmount}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-300">Telescope Calibration Lab</dt>
                  <dd className="font-mono-tabular text-white">+${calcResult.addOnAmount}</dd>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold">
                  <dt className="text-white">Estimated Tuition</dt>
                  <dd className="font-mono-tabular text-xl text-white">${calcResult.total}</dd>
                </div>
              </dl>
            </div>

            <button
              type="button"
              onClick={() => onSelectPlanForEnroll(calcPlanId, isEarlyBird, discountPct, addLab)}
              className="mt-6 w-full cursor-pointer rounded-full bg-white py-3 text-sm font-semibold text-[#071227] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[#79dce8]"
            >
              Enroll with Estimated Plan
            </button>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section aria-label="Tuition Frequently Asked Questions" className="mt-14">
          <h2
            className="text-2xl font-normal text-white"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Tuition Questions
          </h2>
          <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#08162b]">
            {TUITION_FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-base font-medium text-white hover:text-[#79dce8] focus-visible:outline-2 focus-visible:outline-[#79dce8]"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#79dce8]' : 'text-slate-400'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm leading-relaxed text-slate-300">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
