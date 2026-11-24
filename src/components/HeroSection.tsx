import { ArrowRight, ShieldCheck } from 'lucide-react';
import { HERO_IMAGE_URL, TRUST_STATS } from '../data/saccoData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onBecomeMember: () => void;
  onOpenPortal: () => void;
}

export function HeroSection({ onBecomeMember, onOpenPortal }: HeroSectionProps) {
  return (
    <section id="top" className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-16 lg:pb-16">
        {/* 2-Column Split with items-stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 mb-4">
              <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>SASRA Licensed Deposit-Taking SACCO</span>
              <span aria-hidden="true">·</span>
              <span>M-Pesa Paybill 400222</span>
            </div>

            <h1 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold tracking-tight leading-[1.08] text-slate-900 text-balance">
              Empowering Your Financial Growth Together
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Build steady wealth through member-owned deposits, earn consistent annual
              dividends, and unlock affordable credit up to three times your savings at
              transparent reducing-balance rates.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={onBecomeMember}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                <span>Become a Member</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onOpenPortal}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-emerald-900 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
              >
                Member Portal Login
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
              <span>Min. Monthly Deposit: KES 1,000</span>
              <span aria-hidden="true">·</span>
              <span>Loan Limit: 3x Member Deposits</span>
              <span aria-hidden="true">·</span>
              <span>48-Hour Loan Appraisal</span>
            </div>
          </div>

          {/* Right Media Carrier matching height */}
          <div className="lg:col-span-6">
            <div className="relative h-72 sm:h-96 lg:h-full min-h-[340px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <ResilientImage
                src={HERO_IMAGE_URL}
                alt="Uzima SACCO Nairobi financial headquarters atrium with Kenyan members and relationship officers"
                className="w-full h-full object-cover"
                fallbackLabel="Uzima SACCO Headquarters, Upper Hill Nairobi"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <p className="text-xs text-emerald-200 font-medium">
                    Member-Owned Cooperative
                  </p>
                  <p className="text-sm font-semibold">
                    Upper Hill Headquarters, Nairobi
                  </p>
                </div>
                <span className="font-mono text-xs tabular-nums text-white/90">
                  Est. 2012
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quick Stats Bar */}
        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-emerald-900 tabular-nums">
                {stat.value}
              </span>
              <span className="mt-1 text-sm font-semibold text-slate-900">
                {stat.label}
              </span>
              <span className="mt-0.5 text-xs text-slate-500">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
