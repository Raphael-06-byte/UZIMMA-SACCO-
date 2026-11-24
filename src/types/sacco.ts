export type InterestType = 'reducing' | 'flat';

export type TransactionType =
  | 'Deposit'
  | 'Loan Repayment'
  | 'Share Capital'
  | 'Loan Disbursement'
  | 'Dividend Payout';

export type TransactionStatus = 'Completed' | 'Pending';

export interface Transaction {
  id: string;
  date: string;
  reference: string;
  type: TransactionType;
  description: string;
  channel: string;
  amount: number;
  status: TransactionStatus;
}

export interface SavingsProduct {
  id: string;
  name: string;
  kicker: string;
  rateLabel: string;
  minimumLabel: string;
  summary: string;
  highlights: string[];
}

export interface LoanProduct {
  id: string;
  name: string;
  kicker: string;
  rateLabel: string;
  interestType: InterestType;
  maxPeriodMonths: number;
  maxAmount: number;
  defaultAmount: number;
  defaultMonths: number;
  summary: string;
  highlights: string[];
}

export interface ResourceDocument {
  id: string;
  title: string;
  category: string;
  fileSize: string;
  updatedAt: string;
  summary: string;
  filename: string;
}

export interface NewsAnnouncement {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: string[];
}

export interface BranchOffice {
  city: string;
  address: string;
  phone: string;
  hours: string;
}

export interface MemberProfile {
  memberNumber: string;
  fullName: string;
  nationalId: string;
  phone: string;
  email: string;
  county: string;
  joinedDate: string;
  avatarUrl: string;
  shareCapital: number;
  totalDeposits: number;
  activeLoanBalance: number;
  activeLoanName: string;
  nextInstallmentDate: string;
  nextInstallmentAmount: number;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface LoanCalculation {
  principal: number;
  months: number;
  interestType: InterestType;
  monthlyPayment: number;
  totalInterest: number;
  totalPayable: number;
  requiredDeposits: number;
  schedule: AmortizationRow[];
}
