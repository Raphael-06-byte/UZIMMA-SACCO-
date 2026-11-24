import { Download, Printer, X } from 'lucide-react';
import type { MemberProfile, Transaction } from '../types/sacco';
import { downloadTextDocument, formatKES } from '../utils/finance';

interface StatementModalProps {
  isOpen: boolean;
  member: MemberProfile;
  transactions: Transaction[];
  onClose: () => void;
}

export function StatementModal({
  isOpen,
  member,
  transactions,
  onClose,
}: StatementModalProps) {
  if (!isOpen) return null;

  const loanLimit = member.totalDeposits * 3;

  const handleDownloadCsv = () => {
    const header = [
      `Uzima SACCO Society Ltd - Member Statement`,
      `Member Name,${member.fullName}`,
      `Member Number,${member.memberNumber}`,
      `Share Capital,${member.shareCapital}`,
      `Total Deposits,${member.totalDeposits}`,
      `3x Loan Limit,${loanLimit}`,
      `Active Loan Balance,${member.activeLoanBalance}`,
      ``,
      `Date,Reference,Type,Description,Channel,Amount (KES),Status`,
    ];

    const rows = transactions.map(
      (tx) =>
        `"${tx.date}","${tx.reference}","${tx.type}","${tx.description}","${tx.channel}",${tx.amount},"${tx.status}"`
    );

    downloadTextDocument(
      `Uzima_SACCO_Statement_${member.memberNumber}.csv`,
      [...header, ...rows].join('\n'),
      'text/csv;charset=utf-8'
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="statement-modal-title"
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white border border-slate-200 rounded-xl max-w-3xl w-full my-8 shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <p className="text-xs font-semibold text-emerald-800">
              Official Account Ledger
            </p>
            <h2
              id="statement-modal-title"
              className="font-display text-lg font-bold text-slate-900"
            >
              Member Financial Statement
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close statement modal"
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200/70 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">Member</span>
              <span className="font-semibold text-slate-900">{member.fullName}</span>
              <span className="block font-mono text-slate-500 mt-0.5">
                {member.memberNumber}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Share Capital</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {formatKES(member.shareCapital)}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Total Deposits</span>
              <span className="font-mono font-bold text-emerald-900 tabular-nums">
                {formatKES(member.totalDeposits)}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">3x Loan Limit</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {formatKES(loanLimit)}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto max-h-72 border border-slate-200 rounded-lg">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Date</th>
                  <th className="py-2.5 px-3 font-semibold">Reference</th>
                  <th className="py-2.5 px-3 font-semibold">Type</th>
                  <th className="py-2.5 px-3 font-semibold">Description</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-900">
                      {tx.reference}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">{tx.type}</td>
                    <td className="py-2.5 px-3 text-slate-600">{tx.description}</td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-right text-slate-900 tabular-nums whitespace-nowrap">
                      {formatKES(tx.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
              <span>Print Statement</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadCsv}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Download CSV Statement</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
