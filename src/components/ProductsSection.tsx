import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { LOAN_PRODUCTS, SAVINGS_PRODUCTS } from '../data/saccoData';
import type { LoanProduct } from '../types/sacco';

interface ProductsSectionProps {
  onSelectLoanForCalculator: (loan: LoanProduct) => void;
  onBecomeMember: () => void;
}

export function ProductsSection({
  onSelectLoanForCalculator,
  onBecomeMember,
}: ProductsSectionProps) {
  const [activeTab, setActiveTab] = useState<'savings' | 'loans'>('savings');

  return (
    <section id="products" className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-emerald-800 tracking-wide mb-2">
              01. Member Products
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Savings Accounts & Credit Built for Kenyan Households
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Earn reliable annual rebates on deposits and access structured financing up
              to three times your accumulated savings.
            </p>
          </div>

          {/* Interactive Segmented Tab Control */}
          <div
            role="tablist"
            aria-label="Product Categories"
            className="inline-flex items-center p-1 bg-slate-200/75 rounded-lg self-start md:self-auto shrink-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'savings'}
              onClick={() => setActiveTab('savings')}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'savings'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Savings Accounts
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'loans'}
              onClick={() => setActiveTab('loans')}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'loans'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Loan Products
            </button>
          </div>
        </div>

        {activeTab === 'savings' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAVINGS_PRODUCTS.map((product) => (
              <article
                key={product.id}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between transition-colors hover:border-emerald-700/40"
              >
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    {product.kicker}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-slate-900">
                    {product.name}
                  </h3>

                  <div className="mt-4 py-3 border-y border-slate-100 flex items-baseline justify-between gap-4">
                    <div>
                      <span className="block text-xs text-slate-500">Return</span>
                      <span className="font-mono text-sm font-semibold text-emerald-800 tabular-nums">
                        {product.rateLabel}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs text-slate-500">Entry</span>
                      <span className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
                        {product.minimumLabel}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                    {product.summary}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {product.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <Check
                          className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onBecomeMember}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Open This Account</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LOAN_PRODUCTS.map((loan) => (
              <article
                key={loan.id}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between transition-colors hover:border-emerald-700/40"
              >
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    {loan.kicker}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-slate-900">
                    {loan.name}
                  </h3>

                  <div className="mt-4 py-3 border-y border-slate-100 flex items-baseline justify-between gap-4">
                    <div>
                      <span className="block text-xs text-slate-500">Interest Rate</span>
                      <span className="font-mono text-sm font-semibold text-emerald-800 tabular-nums">
                        {loan.rateLabel}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs text-slate-500">Max Term</span>
                      <span className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
                        {loan.maxPeriodMonths} Months
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                    {loan.summary}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {loan.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <Check
                          className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onSelectLoanForCalculator(loan)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Calculate Repayment</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
