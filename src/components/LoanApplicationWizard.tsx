import { useEffect, useState } from 'react';
import { Check, CheckCircle2, X } from 'lucide-react';
import { LOAN_PRODUCTS, VERIFIED_GUARANTORS } from '../data/saccoData';
import type { LoanProduct } from '../types/sacco';
import { calculateLoan, formatKES, generateMpesaCode } from '../utils/finance';

interface LoanApplicationWizardProps {
  isOpen: boolean;
  totalDeposits: number;
  activeLoanBalance: number;
  onClose: () => void;
  onSubmitLoan: (payload: {
    loanName: string;
    amount: number;
    months: number;
    monthlyInstallment: number;
    reference: string;
  }) => void;
}

export function LoanApplicationWizard({
  isOpen,
  totalDeposits,
  activeLoanBalance,
  onClose,
  onSubmitLoan,
}: LoanApplicationWizardProps) {
  const grossLimit = totalDeposits * 3;
  const availableHeadroom = Math.max(0, grossLimit - activeLoanBalance);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedLoanId, setSelectedLoanId] = useState<string>(LOAN_PRODUCTS[0].id);
  const [amount, setAmount] = useState<number>(Math.min(250000, Math.max(10000, availableHeadroom)));
  const [months, setMonths] = useState<number>(24);
  const [purpose, setPurpose] = useState('Working capital & business expansion');
  const [selectedGuarantors, setSelectedGuarantors] = useState<string[]>([
    VERIFIED_GUARANTORS[0].memberNumber,
    VERIFIED_GUARANTORS[1].memberNumber,
  ]);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSubmittedRef(null);
      setError(null);
      const maxInitial = Math.max(10000, Math.min(250000, availableHeadroom || 50000));
      setAmount(maxInitial);
    }
  }, [isOpen, availableHeadroom]);

  if (!isOpen) return null;

  const selectedProduct: LoanProduct =
    LOAN_PRODUCTS.find((p) => p.id === selectedLoanId) ?? LOAN_PRODUCTS[0];
  const productCap = Math.min(selectedProduct.maxAmount, availableHeadroom);
  const calc = calculateLoan(amount, months, selectedProduct.interestType);

  const toggleGuarantor = (memberNo: string) => {
    setSelectedGuarantors((prev) =>
      prev.includes(memberNo)
        ? prev.filter((id) => id !== memberNo)
        : prev.length < 3
        ? [...prev, memberNo]
        : prev
    );
  };

  const handleStep1Next = () => {
    if (availableHeadroom < 10000) {
      setError(
        'Your current 3x borrowing headroom is below KES 10,000. Make an M-Pesa deposit first to raise your 3x limit.'
      );
      return;
    }
    if (amount < 10000 || amount > productCap) {
      setError(
        `Requested amount must be between KES 10,000 and your eligible limit of ${formatKES(
          productCap
        )}.`
      );
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleStep2Next = () => {
    const needsGuarantors = selectedProduct.id !== 'emergency-loan';
    if (needsGuarantors && selectedGuarantors.length < 2) {
      setError('Select at least 2 active SACCO guarantors for BOSA / Asset loans.');
      return;
    }
    if (!purpose.trim()) {
      setError('Please state the purpose of the loan.');
      return;
    }
    setError(null);
    setStep(3);
  };

  const handleConfirmLoan = () => {
    const ref = generateMpesaCode();
    setSubmittedRef(ref);
    onSubmitLoan({
      loanName: selectedProduct.name,
      amount,
      months,
      monthlyInstallment: Math.round(calc.monthlyPayment),
      reference: ref,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="loan-wizard-title"
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full my-8 shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <p className="text-xs font-semibold text-emerald-800">
              Loan Application Wizard · 3x Deposit Rule
            </p>
            <h2
              id="loan-wizard-title"
              className="font-display text-lg font-bold text-slate-900"
            >
              Apply for Credit
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close loan wizard"
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200/70 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Eligible Headroom Summary Strip */}
        <div className="px-6 py-3 bg-emerald-950 text-white flex flex-wrap items-center justify-between gap-4 text-xs">
          <span>
            3x Deposit Gross Limit:{' '}
            <strong className="font-mono tabular-nums">{formatKES(grossLimit)}</strong>
          </span>
          <span>
            Available Borrowing Headroom:{' '}
            <strong className="font-mono text-amber-300 tabular-nums">
              {formatKES(availableHeadroom)}
            </strong>
          </span>
        </div>

        <div className="p-6 sm:p-8">
          {error && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-800"
            >
              {error}
            </div>
          )}

          {submittedRef ? (
            <div className="py-4 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <div>
                <h3 className="font-display text-2xl font-bold text-slate-900">
                  Loan Approved & Disbursed
                </h3>
                <p className="mt-1.5 text-sm text-slate-600 max-w-md mx-auto">
                  {formatKES(amount)} under{' '}
                  <span className="font-semibold">{selectedProduct.name}</span> has been
                  posted to your member account.
                </p>
              </div>
              <div className="max-w-sm mx-auto bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-500">Disbursement Ref:</span>
                  <span className="font-mono font-bold text-emerald-900">
                    {submittedRef}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Installment:</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {formatKES(calc.monthlyPayment)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Repayment Period:</span>
                  <span className="font-mono text-slate-900 tabular-nums">
                    {months} Months
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
              >
                Return to Member Dashboard
              </button>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <span className="block text-xs font-semibold text-slate-700 mb-2">
                      1. Select Loan Product
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {LOAN_PRODUCTS.map((prod) => (
                        <button
                          key={prod.id}
                          type="button"
                          onClick={() => {
                            setSelectedLoanId(prod.id);
                            setMonths(Math.min(months, prod.maxPeriodMonths));
                            setAmount((prev) =>
                              Math.min(
                                prev,
                                Math.max(10000, Math.min(prod.maxAmount, availableHeadroom))
                              )
                            );
                          }}
                          className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                            selectedLoanId === prod.id
                              ? 'border-emerald-800 bg-emerald-50/70'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <p className="font-display text-sm font-bold text-slate-900">
                            {prod.name}
                          </p>
                          <p className="mt-1 text-xs font-mono text-emerald-800">
                            {prod.rateLabel}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-500">
                            Max {prod.maxPeriodMonths} months
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="wiz-amount"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Requested Amount (Max {formatKES(productCap)})
                      </label>
                      <input
                        id="wiz-amount"
                        type="number"
                        min={10000}
                        max={Math.max(10000, productCap)}
                        step={5000}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-sm font-mono font-semibold border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700 tabular-nums"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="wiz-months"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Repayment Period (1–{selectedProduct.maxPeriodMonths} Months)
                      </label>
                      <input
                        id="wiz-months"
                        type="number"
                        min={1}
                        max={selectedProduct.maxPeriodMonths}
                        value={months}
                        onChange={(e) =>
                          setMonths(
                            Math.max(
                              1,
                              Math.min(selectedProduct.maxPeriodMonths, Number(e.target.value))
                            )
                          )
                        }
                        className="w-full px-3.5 py-2.5 text-sm font-mono font-semibold border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700 tabular-nums"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-sm">
                    <span className="text-slate-600">Estimated Monthly Installment:</span>
                    <span className="font-mono font-bold text-emerald-900 tabular-nums">
                      {formatKES(calc.monthlyPayment)} / month
                    </span>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleStep1Next}
                      className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                    >
                      Continue to Guarantors
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="wiz-purpose"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Loan Purpose
                    </label>
                    <input
                      id="wiz-purpose"
                      type="text"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <span className="block text-xs font-semibold text-slate-700 mb-2">
                      {selectedProduct.id === 'emergency-loan'
                        ? 'Self-Guaranteed via Free Deposits (Optional Guarantors)'
                        : 'Select at least 2 Active SACCO Guarantors'}
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {VERIFIED_GUARANTORS.map((g) => {
                        const checked = selectedGuarantors.includes(g.memberNumber);
                        return (
                          <button
                            key={g.memberNumber}
                            type="button"
                            onClick={() => toggleGuarantor(g.memberNumber)}
                            className={`p-3 rounded-lg border text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                              checked
                                ? 'border-emerald-800 bg-emerald-50/70'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate">
                                {g.name}
                              </p>
                              <p className="text-[11px] font-mono text-slate-500">
                                {g.memberNumber} · Free Cover{' '}
                                {formatKES(g.availableGuaranteeLimit)}
                              </p>
                            </div>
                            <span
                              className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                                checked
                                  ? 'bg-emerald-800 border-emerald-800 text-white'
                                  : 'border-slate-300 bg-white'
                              }`}
                            >
                              {checked && <Check className="w-3.5 h-3.5" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleStep2Next}
                      className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                    >
                      Review Loan Terms
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-sm">
                    <h3 className="font-display text-base font-bold text-slate-900">
                      Loan Appraisal Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-y-2.5 text-xs">
                      <span className="text-slate-500">Product:</span>
                      <span className="font-semibold text-right text-slate-900">
                        {selectedProduct.name}
                      </span>

                      <span className="text-slate-500">Principal Amount:</span>
                      <span className="font-mono font-semibold text-right text-slate-900 tabular-nums">
                        {formatKES(amount)}
                      </span>

                      <span className="text-slate-500">Interest Method:</span>
                      <span className="text-right text-slate-900">
                        {selectedProduct.rateLabel}
                      </span>

                      <span className="text-slate-500">Repayment Period:</span>
                      <span className="font-mono text-right text-slate-900 tabular-nums">
                        {months} Months
                      </span>

                      <span className="text-slate-500">Monthly Installment:</span>
                      <span className="font-mono font-bold text-right text-emerald-900 tabular-nums">
                        {formatKES(calc.monthlyPayment)}
                      </span>

                      <span className="text-slate-500">Total Payable:</span>
                      <span className="font-mono font-semibold text-right text-slate-900 tabular-nums">
                        {formatKES(calc.totalPayable)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    By confirming, you authorize Uzima SACCO to disburse{' '}
                    <span className="font-mono font-semibold text-slate-800">
                      {formatKES(amount)}
                    </span>{' '}
                    to your registered M-Pesa / FOSA account and schedule monthly
                    repayments under SACCO by-laws.
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmLoan}
                      className="px-6 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors cursor-pointer"
                    >
                      Confirm & Disburse Loan
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
