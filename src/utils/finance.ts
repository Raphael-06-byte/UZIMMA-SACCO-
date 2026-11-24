import type { AmortizationRow, InterestType, LoanCalculation } from '../types/sacco';

export function formatKES(amount: number, includeDecimals = false): string {
  const rounded = includeDecimals ? amount : Math.round(amount);
  return `KES ${new Intl.NumberFormat('en-KE', {
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  }).format(rounded)}`;
}

export function calculateLoan(
  principal: number,
  months: number,
  interestType: InterestType
): LoanCalculation {
  const safePrincipal = Math.max(10000, principal);
  const safeMonths = Math.max(1, Math.min(60, months));
  const schedule: AmortizationRow[] = [];

  if (interestType === 'reducing') {
    // 12% per annum Reducing Balance => 1% monthly periodic rate
    const monthlyRate = 0.12 / 12;
    const factor = Math.pow(1 + monthlyRate, safeMonths);
    const monthlyPayment =
      (safePrincipal * monthlyRate * factor) / (factor - 1);

    let balance = safePrincipal;
    let totalInterest = 0;

    for (let m = 1; m <= safeMonths; m++) {
      const interest = balance * monthlyRate;
      const principalPaid =
        m === safeMonths ? balance : monthlyPayment - interest;
      balance = Math.max(0, balance - principalPaid);
      totalInterest += interest;

      schedule.push({
        month: m,
        payment: m === safeMonths ? principalPaid + interest : monthlyPayment,
        principal: principalPaid,
        interest,
        balance,
      });
    }

    const totalPayable = safePrincipal + totalInterest;

    return {
      principal: safePrincipal,
      months: safeMonths,
      interestType,
      monthlyPayment,
      totalInterest,
      totalPayable,
      requiredDeposits: Math.ceil(safePrincipal / 3),
      schedule,
    };
  }

  // 1% per month Flat Rate
  const monthlyRate = 0.01;
  const monthlyPrincipal = safePrincipal / safeMonths;
  const monthlyInterest = safePrincipal * monthlyRate;
  const monthlyPayment = monthlyPrincipal + monthlyInterest;
  const totalInterest = monthlyInterest * safeMonths;
  const totalPayable = safePrincipal + totalInterest;

  let balance = safePrincipal;
  for (let m = 1; m <= safeMonths; m++) {
    balance = Math.max(0, balance - monthlyPrincipal);
    schedule.push({
      month: m,
      payment: monthlyPayment,
      principal: monthlyPrincipal,
      interest: monthlyInterest,
      balance,
    });
  }

  return {
    principal: safePrincipal,
    months: safeMonths,
    interestType,
    monthlyPayment,
    totalInterest,
    totalPayable,
    requiredDeposits: Math.ceil(safePrincipal / 3),
    schedule,
  };
}

export function generateMpesaCode(): string {
  const prefix = 'UK';
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let body = '';
  for (let i = 0; i < 8; i++) {
    body += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}${body}`;
}

export function normalizeKenyanPhone(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.startsWith('254') && digits.length >= 12) {
    return `+${digits.slice(0, 12)}`;
  }
  if (digits.startsWith('0') && digits.length >= 10) {
    return `+254${digits.slice(1, 10)}`;
  }
  if ((digits.startsWith('7') || digits.startsWith('1')) && digits.length >= 9) {
    return `+254${digits.slice(0, 9)}`;
  }
  return input;
}

export function downloadTextDocument(
  filename: string,
  content: string,
  mimeType = 'text/plain;charset=utf-8'
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
