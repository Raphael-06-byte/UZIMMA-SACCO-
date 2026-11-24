import type {
  BranchOffice,
  LoanProduct,
  MemberProfile,
  NewsAnnouncement,
  ResourceDocument,
  SavingsProduct,
  Transaction,
} from '../types/sacco';

export const HERO_IMAGE_URL = '/src/assets/images/hero_uzima_sacco_1795459305985.jpg';
export const BRANCH_HQ_IMAGE_URL = '/src/assets/images/branch_nairobi_hq_1795459321715.jpg';
export const MEMBER_AVATAR_URL = '/src/assets/images/member_avatar_wanjiku_1795459306870.jpg';

export const TRUST_STATS = [
  { label: 'Active Members', value: '15,000+', detail: 'Across 47 Kenyan Counties' },
  { label: 'Asset Base', value: 'KES 2.5B+', detail: 'Audited FY 2025/2026' },
  { label: 'Avg. Annual Dividends', value: '12%', detail: 'Paid Consistently Since 2018' },
  { label: 'SASRA Regulated', value: 'DT-SACCO', detail: 'Deposit-Taking License' },
];

export const SAVINGS_PRODUCTS: SavingsProduct[] = [
  {
    id: 'share-capital',
    name: 'Share Capital',
    kicker: 'Member Ownership Equity',
    rateLabel: '14% Target Dividend',
    minimumLabel: 'Min. KES 20,000',
    summary:
      'Permanent equity shareholding that grants full voting rights at the Annual General Meeting and earns top-tier annual dividends.',
    highlights: [
      'Transferable between active Uzima SACCO members',
      'Eligible for full dividend declaration every March',
      'Payable in a lump sum or KES 2,000 monthly installments',
    ],
  },
  {
    id: 'deposit-account',
    name: 'Deposit Account (BOSA)',
    kicker: 'Core 3x Loan Collateral',
    rateLabel: '9.5% p.a. Rebate',
    minimumLabel: 'Min. KES 1,000 / month',
    summary:
      'Your primary wealth-building account. Every shilling saved unlocks three shillings in affordable credit at 12% reducing balance.',
    highlights: [
      'Qualifies for loans up to 3x accumulated deposits',
      'Instant top-up via M-Pesa Paybill 400222',
      'Earns annual interest rebates on monthly balances',
    ],
  },
  {
    id: 'junior-savings',
    name: 'Junior Savings (Elimu)',
    kicker: 'Custodial Education Plan',
    rateLabel: '10.5% p.a. Yield',
    minimumLabel: 'Min. KES 500 / month',
    summary:
      'Dedicated savings plan for children under 18, built to cover secondary school, university tuition, and long-term milestones.',
    highlights: [
      'Zero monthly ledger or account maintenance fees',
      'Free termly withdrawals directly to school accounts',
      'Complimentary annual birthday bonus deposit',
    ],
  },
];

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: 'development-loan',
    name: 'Development Loan',
    kicker: 'Up to 3x Member Deposits',
    rateLabel: '12% p.a. Reducing Balance',
    interestType: 'reducing',
    maxPeriodMonths: 60,
    maxAmount: 5000000,
    defaultAmount: 600000,
    defaultMonths: 36,
    summary:
      'Long-term financing for home construction, business expansion, land acquisition, and major personal milestones.',
    highlights: [
      'Borrow up to KES 5,000,000 within 3x deposits',
      'Up to 60 months flexible check-off or M-Pesa repayment',
      '48-hour appraisal once guarantors confirm online',
    ],
  },
  {
    id: 'emergency-loan',
    name: 'Instant Emergency Loan',
    kicker: 'Mobile M-Pesa Disbursement',
    rateLabel: '1% per month Flat Rate',
    interestType: 'flat',
    maxPeriodMonths: 12,
    maxAmount: 300000,
    defaultAmount: 100000,
    defaultMonths: 12,
    summary:
      'Rapid liquidity for medical bills, urgent school fees, or short-term household needs disbursed straight to your M-Pesa.',
    highlights: [
      'Up to KES 300,000 processed in under 5 minutes',
      'Self-guaranteed within your free deposit margin',
      'Zero early settlement penalties',
    ],
  },
  {
    id: 'asset-financing',
    name: 'Asset Financing',
    kicker: 'Vehicles, Machinery & Plots',
    rateLabel: '12.5% p.a. Reducing Balance',
    interestType: 'reducing',
    maxPeriodMonths: 48,
    maxAmount: 4500000,
    defaultAmount: 1500000,
    defaultMonths: 48,
    summary:
      'Structured financing covering up to 80% of the asset value for personal vehicles, commercial fleets, agri-machinery, or titled land.',
    highlights: [
      'Asset serves as primary collateral alongside deposits',
      'Up to 48 months structured repayment schedule',
      'Direct dealer and advocate settlement in Kenya',
    ],
  },
];

export const RESOURCE_DOCUMENTS: ResourceDocument[] = [
  {
    id: 'membership-form',
    title: 'Membership Application Form',
    category: 'Onboarding Document',
    fileSize: '420 KB',
    updatedAt: 'October 2026',
    filename: 'Uzima_SACCO_Membership_Application_Form_2026.txt',
    summary:
      'Complete individual & corporate onboarding checklist, National ID & KRA PIN declaration, and Next of Kin nomination form.',
  },
  {
    id: 'loan-form',
    title: 'Loan Application & Guarantor Form',
    category: 'Credit Application',
    fileSize: '580 KB',
    updatedAt: 'September 2026',
    filename: 'Uzima_SACCO_Loan_and_Guarantor_Form_2026.txt',
    summary:
      'Standard BOSA/FOSA loan appraisal form covering Development, Asset Financing, and third-party guarantor commitment schedules.',
  },
  {
    id: 'annual-report',
    title: '2025/2026 Annual Financial Report',
    category: 'Audited Financials',
    fileSize: '2.4 MB',
    updatedAt: 'March 2026',
    filename: 'Uzima_SACCO_Annual_Financial_Report_2025_2026.txt',
    summary:
      'Audited statement of financial position, KES 2.5B+ asset breakdown, SASRA capital adequacy ratios, and 12% dividend distribution notes.',
  },
];

export const NEWS_ANNOUNCEMENTS: NewsAnnouncement[] = [
  {
    id: 'agm-dividends-2026',
    title: 'Notice of 2026 Annual General Meeting & 12% Dividend Payout',
    date: '14 November 2026',
    category: 'Governance',
    excerpt:
      'Members are invited to the 14th Annual General Meeting at Kenyatta International Convention Centre and via live webcast.',
    body: [
      'The Board of Directors of Uzima SACCO Society Ltd is pleased to notify all 15,000+ members that the 14th Annual General Meeting will take place on Saturday, 12 December 2026 from 9:00 AM EAT.',
      'Following audited financial results showing an asset base exceeding KES 2.54 Billion, the Board has recommended an annual dividend of 14% on Share Capital and a 9.5% interest rebate on non-withdrawable deposits (12% blended average return).',
      'Members may verify their dividend entitlement and update their M-Pesa disbursement number inside the Member Self-Service Portal prior to 5 December 2026.',
    ],
  },
  {
    id: 'mpesa-paybill-upgrade',
    title: 'Instant M-Pesa Paybill 400222 Reconciliation Now Live',
    date: '28 October 2026',
    category: 'Digital Banking',
    excerpt:
      'Deposits and loan repayments sent to Paybill 400222 reflect on your Member Portal ledger and 3x loan limit in real time.',
    body: [
      'Uzima SACCO has completed a direct integration upgrade with Safaricom M-Pesa STK Push and Paybill 400222.',
      'Whether you initiate a deposit from the Member Portal or directly from your M-Pesa menu using your Member Number as the Account Number, balances update instantaneously.',
      'Your 3x deposit loan borrowing capacity recalculates automatically upon every confirmed deposit.',
    ],
  },
  {
    id: 'regional-desks-expansion',
    title: 'Expanded Regional Member Service Desks in Eldoret and Nakuru',
    date: '09 October 2026',
    category: 'Branch Network',
    excerpt:
      'Extended Saturday hours and dedicated asset financing officers now available across our Rift Valley service centres.',
    body: [
      'To serve our growing Rift Valley membership, Uzima SACCO has expanded both the Nakuru (Kenyatta Avenue) and Eldoret (Uganda Road) regional branches.',
      'Both branches now host dedicated Asset Financing and Agribusiness Credit Officers Monday through Saturday, 8:00 AM to 4:00 PM.',
    ],
  },
];

export const BRANCH_OFFICES: BranchOffice[] = [
  {
    city: 'Nairobi HQ (Upper Hill)',
    address: 'Uzima Plaza, Mara Road, Upper Hill, Nairobi',
    phone: '+254 711 048 200',
    hours: 'Mon–Fri 8:00 AM – 5:00 PM · Sat 8:30 AM – 1:00 PM',
  },
  {
    city: 'Mombasa Branch',
    address: '3rd Floor, Nkrumah Road Financial Centre, Mombasa',
    phone: '+254 711 048 210',
    hours: 'Mon–Fri 8:00 AM – 5:00 PM · Sat 8:30 AM – 12:30 PM',
  },
  {
    city: 'Kisumu Branch',
    address: 'Oginga Odinga Street, Lakeview Arcade, Kisumu',
    phone: '+254 711 048 220',
    hours: 'Mon–Fri 8:00 AM – 5:00 PM · Sat 8:30 AM – 12:30 PM',
  },
  {
    city: 'Nakuru & Eldoret Desks',
    address: 'Kenyatta Avenue (Nakuru) & Uganda Road (Eldoret)',
    phone: '+254 711 048 230',
    hours: 'Mon–Sat 8:00 AM – 4:00 PM',
  },
];

export const INITIAL_MEMBER_PROFILE: MemberProfile = {
  memberNumber: 'UZM-04829',
  fullName: 'Wanjiku Kamau',
  nationalId: '29481054',
  phone: '+254 722 418 903',
  email: 'wanjiku.kamau@example.co.ke',
  county: 'Nairobi County',
  joinedDate: '18 March 2021',
  avatarUrl: MEMBER_AVATAR_URL,
  shareCapital: 45000,
  totalDeposits: 420000,
  activeLoanBalance: 285000,
  activeLoanName: 'Development Loan',
  nextInstallmentDate: '05 Dec 2026',
  nextInstallmentAmount: 19250,
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-101',
    date: '19 Nov 2026',
    reference: 'UKJ8N4P2Q9',
    type: 'Deposit',
    description: 'Monthly BOSA Deposit Contribution',
    channel: 'M-Pesa Paybill 400222',
    amount: 15000,
    status: 'Completed',
  },
  {
    id: 'tx-102',
    date: '05 Nov 2026',
    reference: 'UKF3M9L1W7',
    type: 'Loan Repayment',
    description: 'Development Loan Installment (14/36)',
    channel: 'M-Pesa STK Push',
    amount: 19250,
    status: 'Completed',
  },
  {
    id: 'tx-103',
    date: '22 Oct 2026',
    reference: 'UJX5R8T4K2',
    type: 'Deposit',
    description: 'Monthly BOSA Deposit Contribution',
    channel: 'Salary Check-Off',
    amount: 15000,
    status: 'Completed',
  },
  {
    id: 'tx-104',
    date: '10 Oct 2026',
    reference: 'UJP2W7V6C3',
    type: 'Share Capital',
    description: 'Share Capital Equity Top-Up',
    channel: 'M-Pesa Paybill 400222',
    amount: 5000,
    status: 'Completed',
  },
  {
    id: 'tx-105',
    date: '05 Oct 2026',
    reference: 'UJA9H3D5M8',
    type: 'Loan Repayment',
    description: 'Development Loan Installment (13/36)',
    channel: 'M-Pesa STK Push',
    amount: 19250,
    status: 'Completed',
  },
  {
    id: 'tx-106',
    date: '18 Sep 2026',
    reference: 'UIR4C6Y1N9',
    type: 'Deposit',
    description: 'Additional Voluntary Deposit',
    channel: 'EFT Bank Transfer',
    amount: 25000,
    status: 'Completed',
  },
];

export const VERIFIED_GUARANTORS = [
  {
    memberNumber: 'UZM-03114',
    name: 'Brian Ochieng Otieno',
    availableGuaranteeLimit: 480000,
  },
  {
    memberNumber: 'UZM-05209',
    name: 'Faith Muthoni Njoroge',
    availableGuaranteeLimit: 390000,
  },
  {
    memberNumber: 'UZM-02741',
    name: 'David Kiprop Bett',
    availableGuaranteeLimit: 620000,
  },
  {
    memberNumber: 'UZM-06188',
    name: 'Amina Hassan Abdullahi',
    availableGuaranteeLimit: 310000,
  },
];

export function buildDownloadableDocumentText(doc: ResourceDocument): string {
  return [
    '====================================================================',
    'UZIMA SACCO SOCIETY LTD — SASRA LICENSED DEPOSIT-TAKING SACCO',
    'Mara Road, Upper Hill, Nairobi | Paybill: 400222 | +254 711 048 200',
    '====================================================================',
    '',
    `DOCUMENT: ${doc.title}`,
    `CATEGORY: ${doc.category}`,
    `UPDATED:  ${doc.updatedAt}`,
    '',
    'SUMMARY:',
    doc.summary,
    '',
    'KEY REQUIREMENTS & INSTRUCTIONS:',
    '1. Copy of Kenyan National ID / Valid Passport and KRA PIN Certificate.',
    '2. Active Safaricom M-Pesa number registered in applicant name.',
    '3. Minimum monthly BOSA deposit contribution: KES 1,000.',
    '4. Minimum Share Capital: KES 20,000 (payable upfront or via installments).',
    '5. Loans are issued up to 3x accumulated member deposits at 12% p.a. reducing balance.',
    '',
    'For digital submission, complete your application directly inside the',
    'Uzima SACCO Online Member Portal at https://uzimasacco.co.ke.',
    '====================================================================',
  ].join('\n');
}
