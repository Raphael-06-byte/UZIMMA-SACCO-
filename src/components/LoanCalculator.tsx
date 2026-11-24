import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { InterestType } from '../types/sacco';
import { calculateLoan, formatKES } from '../utils/finance';

interface LoanCalculatorProps {
  amount: number;
  months: number;
  interestType: InterestType;
  onAmountChange: (val: number) => void;
  onMonthsChange: (val: number) => void;
  onInterestTypeChange: (val: InterestType) => void;
  onApplyClick: () => void;
}

const AMOUNT_PRESETS = [100000, 300000, 750000, 1500000, 3000000];
const MONTH_PRESETS = [6, 12, 24, 36, 48, 60];

export function LoanCalculator({
  amount,
  months,
  interestType,
  onAmountChange,
  onMonthsChange,
  onInterestTypeChange,
  onApplyClick,
}: LoanCalculatorProps) {
  const [showSchedule, setShowSchedule] = useState(false);

  const result = calculateLoan(amount, months, interestType);

  return (
    <section id="calculator" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold text-emerald-800 tracking-wide mb-2">
            02. Credit Estimator
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
            Interactive SACCO Loan Calculator
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Adjust the loan amount, repayment period, and interest method to preview your
            exact monthly installment and the minimum member deposits required under the
            3x borrowing rule.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-8">
            {/* Interest Type Toggle */}
            <div>
              <span className="block text-sm font-semibold text-slate-900 mb-3">
                Interest Calculation Method
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1 bg-slate-200/75 rounded-lg">
                <button
                  type="button"
                  onClick={() => onInterestTypeChange('reducing')}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-md transition-colors text-center cursor-pointer ${
                    interestType === 'reducing'
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  12% p.a. Reducing Balance
                </button>
                <button
                  type="button"
                  onClick={() => onInterestTypeChange('flat')}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-md transition-colors text-center cursor-pointer ${
                    interestType === 'flat'
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  1% per month Flat Rate
                </button>
              </div>
            </div>

            {/* Loan Amount Slider */}
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <label
                  htmlFor="loan-amount-range"
                  className="text-sm font-semibold text-slate-900"
                >
                  Loan Amount
                </label>
                <span className="font-mono text-lg sm:text-xl font-bold text-emerald-900 tabular-nums">
                  {formatKES(amount)}
                </span>
              </div>

              <input
                id="loan-amount-range"
                type="range"
                min={10000}
                max={5000000}
                step={5000}
                value={amount}
                onChange={(e) => onAmountChange(Number(e.target.value))}
                className="w-full uzima-slider"
              />

              <div className="mt-2 flex items-center justify-between text-xs text-slate-500 font-mono tabular-nums">
                <span>KES 10,000</span>
                <span>KES 5,000,000</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {AMOUNT_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => onAmountChange(preset)}
                    className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md border transition-colors cursor-pointer tabular-nums ${
                      amount === preset
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-700'
                    }`}
                  >
                    {formatKES(preset)}
                  </button>
                ))}
              </div>
            </div>

            {/* Repayment Period Slider */}
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <label
                  htmlFor="loan-months-range"
                  className="text-sm font-semibold text-slate-900"
                >
                  Repayment Period
                </label>
                <span className="font-mono text-lg sm:text-xl font-bold text-emerald-900 tabular-nums">
                  {months} {months === 1 ? 'Month' : 'Months'}
                </span>
              </div>

              <input
                id="loan-months-range"
                type="range"
                min={1}
                max={60}
                step={1}
                value={months}
                onChange={(e) => onMonthsChange(Number(e.target.value))}
                className="w-full uzima-slider"
              />

              <div className="mt-2 flex items-center justify-between text-xs text-slate-500 font-mono tabular-nums">
                <span>1 Month</span>
                <span>60 Months</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {MONTH_PRESETS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => onMonthsChange(m)}
                    className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md border transition-colors cursor-pointer tabular-nums ${
                      months === m
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-700'
                    }`}
                  >
                    {m} mo
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Results Summary */}
          <div className="lg:col-span-5 bg-emerald-950 text-white rounded-xl p-6 sm:p-8">
            <p className="text-xs font-medium text-emerald-300">
              Estimated Monthly Installment
            </p>
            <p className="mt-2 font-mono text-3xl sm:text-4xl font-semibold tracking-tight tabular-nums">
              {formatKES(result.monthlyPayment)}
            </p>
            <p className="mt-1 text-xs text-emerald-200/80">
              {interestType === 'reducing'
                ? 'Calculated at 12% p.a. reducing balance (1% monthly on declining principal)'
                : 'Calculated at 1% per month flat rate on original principal'}
            </p>

            <dl className="mt-6 pt-6 border-t border-emerald-800/80 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-emerald-200/90">Principal Borrowed</dt>
                <dd className="font-mono font-medium tabular-nums">
                  {formatKES(result.principal)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-emerald-200/90">Total Interest</dt>
                <dd className="font-mono font-medium text-amber-300 tabular-nums">
                  {formatKES(result.totalInterest)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 pt-3 border-t border-emerald-800/80">
                <dt className="font-semibold text-white">Total Payable</dt>
                <dd className="font-mono text-base font-semibold text-white tabular-nums">
                  {formatKES(result.totalPayable)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 pt-3 border-t border-emerald-800/80">
                <dt className="text-emerald-200/90">
                  Min. Required Deposits (3x Rule)
                </dt>
                <dd className="font-mono font-semibold text-emerald-300 tabular-nums">
                  {formatKES(result.requiredDeposits)}
                </dd>
              </div>
            </dl>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={onApplyClick}
                className="w-full py-3 px-5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                Apply in Member Portal
              </button>

              <button
                type="button"
                onClick={() => setShowSchedule((prev) => !prev)}
                aria-expanded={showSchedule}
                className="w-full py-2.5 px-4 text-xs font-medium text-emerald-100 hover:text-white bg-emerald-900/60 hover:bg-emerald-900 rounded-lg inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>
                  {showSchedule
                    ? 'Hide Amortization Schedule'
                    : 'View Amortization Schedule'}
                </span>
                {showSchedule ? (
                  <ChevronUp className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Amortization Schedule */}
        {showSchedule && (
          <div className="mt-8 bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50">
              <h3 className="font-display text-base font-bold text-slate-900">
                Repayment Schedule Breakdown ({months} Months)
              </h3>
              <span className="text-xs text-slate-500">
                {interestType === 'reducing'
                  ? '12% p.a. Reducing Balance'
                  : '1% per month Flat Rate'}
              </span>
            </div>
            <div className="overflow-x-auto max-h-80">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 text-xs text-slate-600">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Month</th>
                    <th className="py-2.5 px-4 font-semibold text-right">
                      Installment
                    </th>
                    <th className="py-2.5 px-4 font-semibold text-right">
                      Principal
                    </th>
                    <th className="py-2.5 px-4 font-semibold text-right">
                      Interest
                    </th>
                    <th className="py-2.5 px-4 font-semibold text-right">
                      Closing Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-xs tabular-nums">
                  {result.schedule.map((row) => (
                    <tr key={row.month} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-4 text-slate-700 font-medium">
                        Month {row.month}
                      </td>
                      <td className="py-2.5 px-4 text-right text-slate-900 font-semibold">
                        {formatKES(row.payment)}
                      </td>
                      <td className="py-2.5 px-4 text-right text-slate-700">
                        {formatKES(row.principal)}
                      </td>
                      <td className="py-2.5 px-4 text-right text-amber-700">
                        {formatKES(row.interest)}
                      </td>
                      <td className="py-2.5 px-4 text-right text-slate-900">
                        {formatKES(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
