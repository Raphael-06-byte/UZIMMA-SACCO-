import { useState } from 'react';
import { MapPin, MessageCircle, Phone, Send, X } from 'lucide-react';
import { BRANCH_HQ_IMAGE_URL, BRANCH_OFFICES } from '../data/saccoData';
import { ResilientImage } from './ResilientImage';

interface FooterProps {
  onBecomeMember: () => void;
  onOpenPortal: () => void;
}

export function Footer({ onBecomeMember, onOpenPortal }: FooterProps) {
  const [waOpen, setWaOpen] = useState(false);
  const [waTopic, setWaTopic] = useState('Membership & Deposits Inquiry');
  const [waSent, setWaSent] = useState(false);

  const handleSendQuickSupport = (e: React.FormEvent) => {
    e.preventDefault();
    setWaSent(true);
    setTimeout(() => setWaSent(false), 3500);
  };

  return (
    <>
      <footer id="branches" className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          {/* Upper Branch Showcase & Directory */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800 items-stretch">
            <div className="lg:col-span-5">
              <div className="h-64 lg:h-full min-h-[260px] rounded-xl overflow-hidden border border-slate-800 bg-slate-800">
                <ResilientImage
                  src={BRANCH_HQ_IMAGE_URL}
                  alt="Uzima SACCO Upper Hill Nairobi Headquarters exterior building"
                  className="w-full h-full object-cover"
                  fallbackLabel="Uzima Plaza, Upper Hill Nairobi"
                />
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-amber-400 tracking-wide mb-2">
                  Branch Network
                </p>
                <h2 className="font-display text-2xl font-bold text-white">
                  Nairobi Headquarters & Regional Service Centres
                </h2>
                <p className="mt-2 text-sm text-slate-400 max-w-2xl">
                  Visit any of our Kenyan branches for in-person member advisory, check-off
                  onboarding, or asset financing documentation.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {BRANCH_OFFICES.map((branch) => (
                  <div
                    key={branch.city}
                    className="p-4 rounded-lg bg-slate-800/60 border border-slate-800"
                  >
                    <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
                      <MapPin
                        className="w-4 h-4 text-emerald-400 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{branch.city}</span>
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-300">{branch.address}</p>
                    <p className="mt-1.5 text-xs font-mono text-amber-300 flex items-center gap-1.5 tabular-nums">
                      <Phone className="w-3 h-3 shrink-0" aria-hidden="true" />
                      <span>{branch.phone}</span>
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{branch.hours}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lower Links & Regulatory Disclaimer */}
          <div className="pt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5">
              <span className="font-display text-xl font-bold text-white">
                Uzima SACCO
              </span>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed max-w-md">
                Uzima SACCO Society Ltd is licensed and regulated by the Sacco Societies
                Regulatory Authority (SASRA) under the Sacco Societies Act (Cap 490B)
                of the Laws of Kenya. Member deposits are safeguarded under statutory
                prudential guidelines.
              </p>
            </div>

            <div className="md:col-span-3">
              <h3 className="text-xs font-semibold text-white tracking-wide mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#products"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Savings & Loan Products
                  </a>
                </li>
                <li>
                  <a
                    href="#calculator"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Loan Repayment Calculator
                  </a>
                </li>
                <li>
                  <a
                    href="#resources"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Forms & Financial Reports
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h3 className="text-xs font-semibold text-white tracking-wide mb-3">
                Member Channels
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  M-Pesa Paybill:{' '}
                  <span className="font-mono text-white tabular-nums">400222</span>{' '}
                  (Acc: Member No.)
                </li>
                <li>
                  USSD Mobile Banking:{' '}
                  <span className="font-mono text-white tabular-nums">*642#</span>
                </li>
                <li className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={onBecomeMember}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
                  >
                    Register Online
                  </button>
                  <button
                    type="button"
                    onClick={onOpenPortal}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 cursor-pointer"
                  >
                    Member Self-Service Portal
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Uzima SACCO Society Ltd. All rights reserved.</p>
            <p>Nairobi · Mombasa · Kisumu · Nakuru · Eldoret</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Support Widget */}
      <div className="fixed bottom-5 right-5 z-40">
        {waOpen && (
          <div
            role="dialog"
            aria-label="WhatsApp Member Support"
            className="mb-3 w-80 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="bg-emerald-900 text-white px-4 py-3.5 flex items-center justify-between">
              <div>
                <p className="font-display text-sm font-bold">
                  Uzima WhatsApp Desk
                </p>
                <p className="text-xs text-emerald-200">
                  +254 711 048 200 · Replies in ~5 mins
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWaOpen(false)}
                aria-label="Close WhatsApp support"
                className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-emerald-100 hover:bg-emerald-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendQuickSupport} className="p-4 space-y-3">
              <div>
                <label
                  htmlFor="wa-topic"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Select Inquiry Topic
                </label>
                <select
                  id="wa-topic"
                  value={waTopic}
                  onChange={(e) => setWaTopic(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:border-emerald-700"
                >
                  <option>Membership & Deposits Inquiry</option>
                  <option>3x Loan Eligibility Check</option>
                  <option>M-Pesa Paybill 400222 Support</option>
                  <option>Guarantor Confirmation Help</option>
                </select>
              </div>

              {waSent ? (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  Support ticket queued for{' '}
                  <span className="font-semibold">{waTopic}</span>. A member officer
                  will message you shortly.
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Request Callback on WhatsApp</span>
                  </button>
                  <a
                    href={`https://wa.me/254711048200?text=${encodeURIComponent(
                      `Hello Uzima SACCO, I need assistance with: ${waTopic}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-4 text-xs font-semibold text-emerald-900 bg-slate-100 hover:bg-slate-200 rounded-lg text-center transition-colors"
                  >
                    Open in WhatsApp App
                  </a>
                </div>
              )}
            </form>
          </div>
        )}

        <button
          type="button"
          onClick={() => setWaOpen((prev) => !prev)}
          aria-label="Open WhatsApp Support"
          className="h-12 px-4 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white shadow-lg inline-flex items-center gap-2 text-sm font-semibold transition-transform hover:scale-[1.02] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          <span className="hidden sm:inline">WhatsApp Support</span>
        </button>
      </div>
    </>
  );
}
