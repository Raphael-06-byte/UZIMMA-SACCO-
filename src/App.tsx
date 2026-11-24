import { useState } from 'react';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { LoanCalculator } from './components/LoanCalculator';
import { MemberDashboard } from './components/MemberDashboard';
import { Navbar } from './components/Navbar';
import { ProductsSection } from './components/ProductsSection';
import { RegistrationModal } from './components/RegistrationModal';
import { ResourcesAndNews } from './components/ResourcesAndNews';
import { INITIAL_MEMBER_PROFILE, INITIAL_TRANSACTIONS } from './data/saccoData';
import type {
  InterestType,
  LoanProduct,
  MemberProfile,
  Transaction,
  TransactionType,
} from './types/sacco';

export default function App() {
  const [activeView, setActiveView] = useState<'landing' | 'portal'>('landing');
  const [registerOpen, setRegisterOpen] = useState(false);

  // Loan calculator shared state (can be preset from ProductsSection)
  const [calcAmount, setCalcAmount] = useState<number>(600000);
  const [calcMonths, setCalcMonths] = useState<number>(36);
  const [calcInterestType, setCalcInterestType] = useState<InterestType>('reducing');

  // Demo Member Portal state
  const [member, setMember] = useState<MemberProfile>(INITIAL_MEMBER_PROFILE);
  const [transactions, setTransactions] =
    useState<Transaction[]>(INITIAL_TRANSACTIONS);

  const handleSelectLoanForCalculator = (loan: LoanProduct) => {
    setCalcAmount(loan.defaultAmount);
    setCalcMonths(loan.defaultMonths);
    setCalcInterestType(loan.interestType);
    document.querySelector('#calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenPortal = () => {
    setActiveView('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnPublic = () => {
    setActiveView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegistrationComplete = (newMember: {
    fullName: string;
    nationalId: string;
    phone: string;
    email: string;
    county: string;
  }) => {
    setMember((prev) => ({
      ...prev,
      fullName: newMember.fullName,
      nationalId: newMember.nationalId,
      phone: newMember.phone,
      email: newMember.email,
      county: newMember.county,
    }));
    setActiveView('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMpesaTransaction = (payload: {
    type: TransactionType;
    amount: number;
    phone: string;
    reference: string;
  }) => {
    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      date: today,
      reference: payload.reference,
      type: payload.type,
      description:
        payload.type === 'Deposit'
          ? 'M-Pesa BOSA Deposit Contribution'
          : payload.type === 'Share Capital'
          ? 'Share Capital Equity Contribution'
          : `${member.activeLoanName} Repayment`,
      channel: `M-Pesa STK (${payload.phone})`,
      amount: payload.amount,
      status: 'Completed',
    };

    setTransactions((prev) => [newTx, ...prev]);

    setMember((prev) => {
      if (payload.type === 'Deposit') {
        return { ...prev, totalDeposits: prev.totalDeposits + payload.amount };
      }
      if (payload.type === 'Share Capital') {
        return { ...prev, shareCapital: prev.shareCapital + payload.amount };
      }
      if (payload.type === 'Loan Repayment') {
        return {
          ...prev,
          activeLoanBalance: Math.max(0, prev.activeLoanBalance - payload.amount),
        };
      }
      return prev;
    });
  };

  const handleLoanDisbursement = (payload: {
    loanName: string;
    amount: number;
    months: number;
    monthlyInstallment: number;
    reference: string;
  }) => {
    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      date: today,
      reference: payload.reference,
      type: 'Loan Disbursement',
      description: `${payload.loanName} (${payload.months} months)`,
      channel: 'FOSA / M-Pesa Disbursement',
      amount: payload.amount,
      status: 'Completed',
    };

    setTransactions((prev) => [newTx, ...prev]);
    setMember((prev) => ({
      ...prev,
      activeLoanBalance: prev.activeLoanBalance + payload.amount,
      activeLoanName: payload.loanName,
      nextInstallmentAmount: payload.monthlyInstallment,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        activeView={activeView}
        onOpenPortal={handleOpenPortal}
        onReturnPublic={handleReturnPublic}
        onOpenRegister={() => setRegisterOpen(true)}
      />

      {activeView === 'landing' ? (
        <>
          <main className="flex-1">
            <HeroSection
              onBecomeMember={() => setRegisterOpen(true)}
              onOpenPortal={handleOpenPortal}
            />
            <ProductsSection
              onSelectLoanForCalculator={handleSelectLoanForCalculator}
              onBecomeMember={() => setRegisterOpen(true)}
            />
            <LoanCalculator
              amount={calcAmount}
              months={calcMonths}
              interestType={calcInterestType}
              onAmountChange={setCalcAmount}
              onMonthsChange={setCalcMonths}
              onInterestTypeChange={setCalcInterestType}
              onApplyClick={handleOpenPortal}
            />
            <ResourcesAndNews />
          </main>
          <Footer
            onBecomeMember={() => setRegisterOpen(true)}
            onOpenPortal={handleOpenPortal}
          />
        </>
      ) : (
        <MemberDashboard
          member={member}
          transactions={transactions}
          onExitPortal={handleReturnPublic}
          onMpesaTransaction={handleMpesaTransaction}
          onLoanDisbursement={handleLoanDisbursement}
        />
      )}

      <RegistrationModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onCompleteToPortal={handleRegistrationComplete}
      />
    </div>
  );
}
