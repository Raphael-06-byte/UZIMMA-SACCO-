import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Smartphone, X } from 'lucide-react';
import type { TransactionType } from '../types/sacco';
import {
  formatKES,
  generateMpesaCode,
  normalizeKenyanPhone,
} from '../utils/finance';

interface MpesaDepositModalProps {
  isOpen: boolean;
  defaultPhone: string;
  defaultPurpose?: 'Deposit' | 'Share Capital' | 'Loan Repayment';
  defaultAmount?: number;
  activeLoanBalance: number;
  onClose: () => void;
  onSuccess: (payload: {
    type: TransactionType;
    amount: number;
    phone: string;
    reference: string;
  }) => void;
}

const QUICK_AMOUNTS = [1000, 5000, 15000, 25000, 50000];

export function MpesaDepositModal({
  isOpen,
  defaultPhone,
  defaultPurpose = 'Deposit',
  defaultAmount = 15000,
  activeLoanBalance,
  onClose,
  onSuccess,
}: MpesaDepositModalProps) {
  const [phone, setPhone] = useState(defaultPhone);
  const [purpose, setPurpose] = useState<'Deposit' | 'Share Capital' | 'Loan Repayment'>(
    defaultPurpose
  );
  const [amount, setAmount] = useState(String(defaultAmount));
  const [stage, setStage] = useState<'form' | 'pushing' | 'pin' | 'confirmed'>('form');
  const [reference, setReference] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPhone(defaultPhone);
      setPurpose(defaultPurpose);
      setAmount(String(defaultAmount));
      setStage('form');
      setError(null);
    }
  }, [isOpen, defaultPhone, defaultPurpose, defaultAmount]);

  if (!isOpen) return null;

  const numericAmount = Number(amount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 9) {
      setError('Enter a valid Kenyan Safaricom number (e.g. 0722 418 903).');
      return;
    }
    if (!numericAmount || numericAmount < 100) {
      setError('Minimum M-Pesa transaction amount is KES 100.');
      return;
    }
    if (purpose === 'Loan Repayment' && activeLoanBalance <= 0) {
      setError('You currently have no active loan balance to repay.');
      return;
    }

    setError(null);
    setStage('pushing');

    setTimeout(() => {
      setStage('pin');
      setTimeout(() => {
        const ref = generateMpesaCode();
        setReference(ref);
        setStage('confirmed');
        onSuccess({
          type: purpose,
          amount: numericAmount,
          phone: normalizeKenyanPhone(phone),
          reference: ref,
        });
      }, 1300);
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mpesa-modal-title"
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-5 h-5 text-emerald-800" aria-hidden="true" />
            <h2
              id="mpesa-modal-title"
              className="font-display text-lg font-bold text-slate-900"
            >
              Deposit via M-Pesa
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close M-Pesa deposit modal"
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200/70 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {stage === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div
                  role="alert"
                  className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-800"
                >
                  {error}
                </div>
              )}

              <div>
                <span className="block text-xs font-semibold text-slate-700 mb-2">
                  Target SACCO Account
                </span>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-lg">
                  {(
                    [
                      { id: 'Deposit', label: 'Deposits' },
                      { id: 'Loan Repayment', label: 'Loan Repay' },
                      { id: 'Share Capital', label: 'Shares' },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPurpose(item.id)}
                      className={`py-2 px-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                        purpose === item.id
                          ? 'bg-white text-emerald-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500">
                  {purpose === 'Deposit'
                    ? 'Increases your BOSA deposits and immediately raises your 3x loan limit.'
                    : purpose === 'Loan Repayment'
                    ? `Active Loan Balance: ${formatKES(activeLoanBalance)}`
                    : 'Builds permanent member shareholding equity eligible for annual dividends.'}
                </p>
              </div>

              <div>
                <label
                  htmlFor="mpesa-phone"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Safaricom M-Pesa Phone Number
                </label>
                <input
                  id="mpesa-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0722 418 903"
                  className="w-full px-3.5 py-2.5 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label
                  htmlFor="mpesa-amount"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Amount (KES)
                </label>
                <input
                  id="mpesa-amount"
                  type="number"
                  min={100}
                  step={100}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-base font-mono font-semibold border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700 tabular-nums"
                />
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {QUICK_AMOUNTS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(String(preset))}
                      className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors cursor-pointer tabular-nums ${
                        Number(amount) === preset
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-700'
                      }`}
                    >
                      {formatKES(preset)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors cursor-pointer"
                >
                  Send M-Pesa STK Push ({formatKES(numericAmount || 0)})
                </button>
              </div>
            </form>
          )}

          {(stage === 'pushing' || stage === 'pin') && (
            <div className="py-8 text-center space-y-4">
              <Loader2 className="w-10 h-10 text-emerald-800 animate-spin mx-auto" />
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  {stage === 'pushing'
                    ? 'Initiating M-Pesa STK Push...'
                    : 'Enter M-Pesa PIN on Your Phone'}
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 max-w-xs mx-auto">
                  {stage === 'pushing'
                    ? `Connecting to Safaricom Paybill 400222 for ${normalizeKenyanPhone(phone)}.`
                    : `Prompt sent for ${formatKES(numericAmount)} (${purpose}). Simulating PIN confirmation...`}
                </p>
              </div>
            </div>
          )}

          {stage === 'confirmed' && (
            <div className="py-4 text-center space-y-4">
              <CheckCircle2 className="w-11 h-11 text-emerald-700 mx-auto" />
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  M-Pesa Payment Confirmed
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Your {purpose.toLowerCase()} has been posted to your Uzima SACCO ledger.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-500">M-Pesa Code:</span>
                  <span className="font-mono font-bold text-emerald-900">
                    {reference}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Credited:</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {formatKES(numericAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone Number:</span>
                  <span className="font-mono text-slate-700">
                    {normalizeKenyanPhone(phone)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
