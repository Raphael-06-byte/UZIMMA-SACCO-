import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Download,
  FilePlus2,
  Search,
  Smartphone,
} from 'lucide-react';
import type { MemberProfile, Transaction, TransactionType } from '../types/sacco';
import { formatKES } from '../utils/finance';
import { LoanApplicationWizard } from './LoanApplicationWizard';
import { MpesaDepositModal } from './MpesaDepositModal';
import { ResilientImage } from './ResilientImage';
import { StatementModal } from './StatementModal';

interface MemberDashboardProps {
  member: MemberProfile;
  transactions: Transaction[];
  onExitPortal: () => void;
  onMpesaTransaction: (payload: {
    type: TransactionType;
    amount: number;
    phone: string;
    reference: string;
  }) => void;
  onLoanDisbursement: (payload: {
    loanName: string;
    amount: number;
    months: number;
    monthlyInstallment: number;
    reference: string;
  }) => void;
}

const FILTER_OPTIONS: Array<'All' | TransactionType> = [
  'All',
  'Deposit',
  'Loan Repayment',
  'Share Capital',
  'Loan Disbursement',
];

export function MemberDashboard({
  member,
  transactions,
  onExitPortal,
  onMpesaTransaction,
  onLoanDisbursement,
}: MemberDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | TransactionType>('All');

  const [mpesaModalOpen, setMpesaModalOpen] = useState(false);
  const [mpesaDefaultPurpose, setMpesaDefaultPurpose] = useState<
    'Deposit' | 'Share Capital' | 'Loan Repayment'
  >('Deposit');
  const [mpesaDefaultAmount, setMpesaDefaultAmount] = useState<number>(15000);

  const [loanWizardOpen, setLoanWizardOpen] = useState(false);
  const [statementOpen, setStatementOpen] = useState(false);

  const loanLimit = member.totalDeposits * 3;
  const availableHeadroom = Math.max(0, loanLimit - member.activeLoanBalance);

  const filteredTransactions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return transactions.filter((tx) => {
      const matchesType = typeFilter === 'All' || tx.type === typeFilter;
      const matchesQuery =
        !q ||
        tx.reference.toLowerCase().includes(q) ||
        tx.description.toLowerCase().includes(q) ||
        tx.channel.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [transactions, searchQuery, typeFilter]);

  const openMpesaFor = (
    purpose: 'Deposit' | 'Share Capital' | 'Loan Repayment',
    amount: number
  ) => {
    setMpesaDefaultPurpose(purpose);
    setMpesaDefaultAmount(amount);
    setMpesaModalOpen(true);
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Workspace Header */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
              <ResilientImage
                src={member.avatarUrl}
                alt={member.fullName}
                className="w-full h-full object-cover"
                fallbackLabel={member.fullName}
              />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-emerald-800">
                  Demo Member Self-Service Portal
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-700">{member.memberNumber}</span>
                <span aria-hidden="true">·</span>
                <span>{member.county}</span>
              </div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900 truncate mt-0.5">
                Welcome back, {member.fullName}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Paybill <span className="font-mono text-slate-700">400222</span> · Account{' '}
                <span className="font-mono text-slate-700">{member.memberNumber}</span>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => openMpesaFor('Deposit', 15000)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Smartphone className="w-4 h-4" aria-hidden="true" />
              <span>Deposit via M-Pesa</span>
            </button>

            <button
              type="button"
              onClick={() => setLoanWizardOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FilePlus2 className="w-4 h-4" aria-hidden="true" />
              <span>Apply for a Loan</span>
            </button>

            <button
              type="button"
              onClick={() => setStatementOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Download Statement</span>
            </button>

            <button
              type="button"
              onClick={onExitPortal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Public Site</span>
            </button>
          </div>
        </div>

        {/* 4 Overview Cards */}
        <section aria-label="Account Balances Overview">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs font-medium text-slate-500">
                Share Capital Balance
              </p>
              <p className="mt-2 font-mono text-2xl font-bold text-slate-900 tabular-nums">
                {formatKES(member.shareCapital)}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Minimum KES 20,000 Met · 14% Dividend Tier
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs font-medium text-slate-500">Total Deposits (BOSA)</p>
              <p className="mt-2 font-mono text-2xl font-bold text-emerald-900 tabular-nums">
                {formatKES(member.totalDeposits)}
              </p>
              <p className="mt-2 text-xs text-emerald-800 font-medium">
                Collateral Base for 3x Credit
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs font-medium text-slate-500">
                Loan Limit (3× Deposits)
              </p>
              <p className="mt-2 font-mono text-2xl font-bold text-slate-900 tabular-nums">
                {formatKES(loanLimit)}
              </p>
              <p className="mt-2 text-xs text-slate-500 font-mono tabular-nums">
                Available Headroom: {formatKES(availableHeadroom)}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs font-medium text-slate-500">Active Loan Balance</p>
              <p className="mt-2 font-mono text-2xl font-bold text-amber-700 tabular-nums">
                {formatKES(member.activeLoanBalance)}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                {member.activeLoanBalance > 0
                  ? `${member.activeLoanName} · Due ${member.nextInstallmentDate}`
                  : 'No active loan balance'}
              </p>
            </div>
          </div>
        </section>

        {/* Active Loan Repayment Strip */}
        {member.activeLoanBalance > 0 && (
          <section className="bg-emerald-950 text-white rounded-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-emerald-300 font-medium">
                Active Facility · {member.activeLoanName}
              </p>
              <p className="mt-1 text-sm sm:text-base font-semibold">
                Next monthly installment of{' '}
                <span className="font-mono text-amber-300 tabular-nums">
                  {formatKES(member.nextInstallmentAmount)}
                </span>{' '}
                is due on {member.nextInstallmentDate}.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                openMpesaFor('Loan Repayment', member.nextInstallmentAmount)
              }
              className="px-5 py-2.5 text-sm font-semibold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Pay Installment via M-Pesa
            </button>
          </section>
        )}

        {/* Recent Transactions Table */}
        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Recent Transactions
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time M-Pesa Paybill 400222, check-off, and loan ledger entries
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search M-Pesa ref or description..."
                  aria-label="Search transactions"
                  className="w-full sm:w-64 pl-9 pr-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setTypeFilter(opt)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      typeFilter === opt
                        ? 'bg-white text-emerald-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="p-10 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-900">
                No matching transactions found
              </p>
              <p className="text-xs text-slate-500">
                Clear your search filter or make an M-Pesa deposit to record a new entry.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setTypeFilter('All');
                }}
                className="mt-2 px-4 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-600">
                  <tr>
                    <th className="py-3 px-5 font-semibold">Date</th>
                    <th className="py-3 px-5 font-semibold">Transaction Reference</th>
                    <th className="py-3 px-5 font-semibold">Type</th>
                    <th className="py-3 px-5 font-semibold">Description & Channel</th>
                    <th className="py-3 px-5 font-semibold text-right">Amount</th>
                    <th className="py-3 px-5 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-5 text-slate-600 whitespace-nowrap">
                        {tx.date}
                      </td>
                      <td className="py-3.5 px-5 font-mono font-semibold text-slate-900 whitespace-nowrap">
                        {tx.reference}
                      </td>
                      <td className="py-3.5 px-5 text-slate-800 font-medium whitespace-nowrap">
                        {tx.type}
                      </td>
                      <td className="py-3.5 px-5 text-slate-600">
                        <span className="block text-slate-800">{tx.description}</span>
                        <span className="block text-xs text-slate-500">{tx.channel}</span>
                      </td>
                      <td className="py-3.5 px-5 font-mono font-semibold text-right text-slate-900 tabular-nums whitespace-nowrap">
                        {formatKES(tx.amount)}
                      </td>
                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        {tx.status === 'Completed' ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Completed</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Pending</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* Interactive Member Modals */}
      <MpesaDepositModal
        isOpen={mpesaModalOpen}
        defaultPhone={member.phone}
        defaultPurpose={mpesaDefaultPurpose}
        defaultAmount={mpesaDefaultAmount}
        activeLoanBalance={member.activeLoanBalance}
        onClose={() => setMpesaModalOpen(false)}
        onSuccess={onMpesaTransaction}
      />

      <LoanApplicationWizard
        isOpen={loanWizardOpen}
        totalDeposits={member.totalDeposits}
        activeLoanBalance={member.activeLoanBalance}
        onClose={() => setLoanWizardOpen(false)}
        onSubmitLoan={onLoanDisbursement}
      />

      <StatementModal
        isOpen={statementOpen}
        member={member}
        transactions={transactions}
        onClose={() => setStatementOpen(false)}
      />
    </main>
  );
}
