import { useState } from 'react';
import {
  CheckCircle2,
  FileCheck2,
  Loader2,
  Smartphone,
  Upload,
  X,
} from 'lucide-react';
import { formatKES, generateMpesaCode, normalizeKenyanPhone } from '../utils/finance';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteToPortal: (newMember: {
    fullName: string;
    nationalId: string;
    phone: string;
    email: string;
    county: string;
  }) => void;
}

const KENYAN_COUNTIES = [
  'Nairobi County',
  'Mombasa County',
  'Kisumu County',
  'Nakuru County',
  'Uasin Gishu County',
  'Kiambu County',
  'Machakos County',
  'Nyeri County',
  'Kajiado County',
  'Kilifi County',
];

export function RegistrationModal({
  isOpen,
  onClose,
  onCompleteToPortal,
}: RegistrationModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState<string | null>(null);

  // Step 1
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [dob, setDob] = useState('1993-05-14');
  const [phone, setPhone] = useState('0722 418 903');
  const [email, setEmail] = useState('');
  const [county, setCounty] = useState('Nairobi County');

  // Step 2
  const [employmentType, setEmploymentType] = useState<'Salaried' | 'Business' | 'Agro'>(
    'Salaried'
  );
  const [employerName, setEmployerName] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('85000');
  const [monthlyDeposit, setMonthlyDeposit] = useState('5000');
  const [kinName, setKinName] = useState('');
  const [kinRelation, setKinRelation] = useState('Spouse');
  const [kinPhone, setKinPhone] = useState('');

  // Step 3
  const [idFileName, setIdFileName] = useState<string | null>(null);
  const [kraFileName, setKraFileName] = useState<string | null>(null);
  const [mpesaState, setMpesaState] = useState<'idle' | 'sending' | 'confirmed'>('idle');
  const [mpesaRef, setMpesaRef] = useState('');

  if (!isOpen) return null;

  const handleNextStep1 = () => {
    if (!fullName.trim() || nationalId.trim().length < 6 || !phone.trim() || !email.trim()) {
      setError('Please complete your full name, valid Kenyan National ID, phone number, and email.');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleNextStep2 = () => {
    if (!employerName.trim() || !kinName.trim() || !kinPhone.trim()) {
      setError('Please provide your employer or business name and Next of Kin details.');
      return;
    }
    setError(null);
    setStep(3);
  };

  const handleAttachSampleDocs = () => {
    setIdFileName(`National_ID_${nationalId || '29481054'}.pdf`);
    setKraFileName(`KRA_PIN_Certificate_${fullName.split(' ')[0] || 'Member'}.pdf`);
    setError(null);
  };

  const handleTriggerFeeStk = () => {
    if (!idFileName || !kraFileName) {
      setError('Please upload both your National ID and KRA PIN Certificate before paying the registration fee.');
      return;
    }
    setError(null);
    setMpesaState('sending');
    setTimeout(() => {
      setMpesaRef(generateMpesaCode());
      setMpesaState('confirmed');
    }, 1500);
  };

  const handleFinish = () => {
    onCompleteToPortal({
      fullName: fullName.trim() || 'Wanjiku Kamau',
      nationalId: nationalId.trim() || '29481054',
      phone: normalizeKenyanPhone(phone),
      email: email.trim() || 'member@uzimasacco.co.ke',
      county,
    });
    // Reset for future opens
    setStep(1);
    setMpesaState('idle');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reg-modal-title"
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full my-8 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <p className="text-xs font-semibold text-emerald-800">
              Step {step} of 3 · Online Membership Application
            </p>
            <h2
              id="reg-modal-title"
              className="font-display text-xl font-bold text-slate-900 mt-0.5"
            >
              Join Uzima SACCO
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close registration modal"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200/70 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="grid grid-cols-3 border-b border-slate-200 bg-white text-xs font-semibold">
          {[
            { num: 1, label: '1. Personal & ID' },
            { num: 2, label: '2. Income & Next of Kin' },
            { num: 3, label: '3. KYC & M-Pesa Fee' },
          ].map((item) => (
            <div
              key={item.num}
              className={`py-3 px-4 text-center border-b-2 transition-colors ${
                step === item.num
                  ? 'border-emerald-800 text-emerald-900 bg-emerald-50/40'
                  : step > item.num
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-400'
              }`}
            >
              {item.label}
            </div>
          ))}
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

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="reg-fullname"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Full Legal Name (as on National ID)
                  </label>
                  <input
                    id="reg-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Samuel Mwangi Njoroge"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reg-id"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Kenyan National ID / Passport No.
                  </label>
                  <input
                    id="reg-id"
                    type="text"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    placeholder="e.g. 31849201"
                    className="w-full px-3.5 py-2.5 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="reg-phone"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Safaricom M-Pesa Phone Number
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0722 000 000"
                    className="w-full px-3.5 py-2.5 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reg-email"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="samuel.mwangi@example.co.ke"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="reg-dob"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="reg-dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reg-county"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    County of Residence
                  </label>
                  <select
                    id="reg-county"
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-emerald-700"
                  >
                    {KENYAN_COUNTIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setFullName('Samuel Mwangi Njoroge');
                    setNationalId('31849201');
                    setPhone('0722 418 903');
                    setEmail('samuel.mwangi@example.co.ke');
                    setError(null);
                  }}
                  className="text-xs font-semibold text-emerald-800 hover:underline cursor-pointer"
                >
                  Prefill Demo Details
                </button>
                <button
                  type="button"
                  onClick={handleNextStep1}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                >
                  Continue to Step 2
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-semibold text-slate-700 mb-2">
                  Primary Source of Income
                </span>
                <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-lg">
                  {(
                    [
                      { id: 'Salaried', label: 'Salaried' },
                      { id: 'Business', label: 'Business' },
                      { id: 'Agro', label: 'Agribusiness' },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEmploymentType(item.id)}
                      className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                        employmentType === item.id
                          ? 'bg-white text-emerald-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="reg-employer"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    {employmentType === 'Salaried'
                      ? 'Employer / Organization Name'
                      : 'Registered Business / Farm Name'}
                  </label>
                  <input
                    id="reg-employer"
                    type="text"
                    value={employerName}
                    onChange={(e) => setEmployerName(e.target.value)}
                    placeholder="e.g. Rift Valley Logistics Ltd"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reg-income"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Gross Monthly Income (KES)
                  </label>
                  <input
                    id="reg-income"
                    type="number"
                    min={5000}
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="reg-deposit"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Proposed Monthly BOSA Deposit (Min. KES 1,000)
                </label>
                <input
                  id="reg-deposit"
                  type="number"
                  min={1000}
                  step={500}
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div className="pt-3 border-t border-slate-200">
                <h3 className="text-xs font-bold text-slate-900 mb-3">
                  Next of Kin / Beneficiary Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label
                      htmlFor="kin-name"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="kin-name"
                      type="text"
                      value={kinName}
                      onChange={(e) => setKinName(e.target.value)}
                      placeholder="Grace Wambui"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="kin-rel"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Relationship
                    </label>
                    <select
                      id="kin-rel"
                      value={kinRelation}
                      onChange={(e) => setKinRelation(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-emerald-700"
                    >
                      <option>Spouse</option>
                      <option>Parent</option>
                      <option>Sibling</option>
                      <option>Child</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="kin-phone"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      id="kin-phone"
                      type="tel"
                      value={kinPhone}
                      onChange={(e) => setKinPhone(e.target.value)}
                      placeholder="0712 345 678"
                      className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmployerName('Savannah Tech Solutions Ltd');
                      setKinName('Grace Wambui Njoroge');
                      setKinPhone('0712 840 119');
                      setError(null);
                    }}
                    className="text-xs font-semibold text-emerald-800 hover:underline cursor-pointer"
                  >
                    Prefill Step 2
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleNextStep2}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                >
                  Continue to Step 3
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6">
              {mpesaState !== 'confirmed' ? (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-slate-900">
                        KYC Document Upload
                      </h3>
                      <button
                        type="button"
                        onClick={handleAttachSampleDocs}
                        className="text-xs font-semibold text-emerald-800 hover:underline cursor-pointer"
                      >
                        Attach Sample KYC Docs
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* National ID Upload */}
                      <label className="flex flex-col items-center justify-center p-5 border border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer text-center">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="sr-only"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) setIdFileName(f.name);
                          }}
                        />
                        {idFileName ? (
                          <>
                            <FileCheck2 className="w-6 h-6 text-emerald-700 mb-2" />
                            <span className="text-xs font-semibold text-emerald-900 truncate max-w-full">
                              {idFileName}
                            </span>
                            <span className="text-[11px] text-slate-500 mt-0.5">
                              National ID Attached
                            </span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-slate-400 mb-2" />
                            <span className="text-xs font-semibold text-slate-800">
                              Upload National ID (Front & Back)
                            </span>
                            <span className="text-[11px] text-slate-500 mt-0.5">
                              PDF, JPG or PNG up to 5MB
                            </span>
                          </>
                        )}
                      </label>

                      {/* KRA PIN Upload */}
                      <label className="flex flex-col items-center justify-center p-5 border border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer text-center">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="sr-only"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) setKraFileName(f.name);
                          }}
                        />
                        {kraFileName ? (
                          <>
                            <FileCheck2 className="w-6 h-6 text-emerald-700 mb-2" />
                            <span className="text-xs font-semibold text-emerald-900 truncate max-w-full">
                              {kraFileName}
                            </span>
                            <span className="text-[11px] text-slate-500 mt-0.5">
                              KRA PIN Certificate Attached
                            </span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-slate-400 mb-2" />
                            <span className="text-xs font-semibold text-slate-800">
                              Upload KRA PIN Certificate
                            </span>
                            <span className="text-[11px] text-slate-500 mt-0.5">
                              iTax PDF or clear scan
                            </span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* M-Pesa Registration Fee Prompt */}
                  <div className="p-5 rounded-xl bg-emerald-950 text-white space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Smartphone
                          className="w-5 h-5 text-amber-400 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <div>
                          <h4 className="text-sm font-bold">
                            One-Time Membership Registration Fee
                          </h4>
                          <p className="text-xs text-emerald-200 mt-0.5">
                            An M-Pesa STK Push prompt will be sent to{' '}
                            <span className="font-mono text-white">
                              {normalizeKenyanPhone(phone)}
                            </span>
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-lg font-bold text-amber-300 tabular-nums shrink-0">
                        {formatKES(1000)}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={mpesaState === 'sending'}
                      onClick={handleTriggerFeeStk}
                      className="w-full py-3 px-4 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-70 rounded-lg inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      {mpesaState === 'sending' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending M-Pesa STK Push to {normalizeKenyanPhone(phone)}...</span>
                        </>
                      ) : (
                        <span>Pay KES 1,000 via M-Pesa & Submit Application</span>
                      )}
                    </button>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Back
                    </button>
                    <span className="text-xs text-slate-500">
                      Paybill 400222 · Instant Activation
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                  <div>
                    <h3 className="font-display text-2xl font-bold text-slate-900">
                      Membership Activated
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600 max-w-md mx-auto">
                      Welcome to Uzima SACCO, <span className="font-semibold">{fullName}</span>.
                      Your M-Pesa registration payment has been verified.
                    </p>
                  </div>

                  <div className="max-w-sm mx-auto bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Application Ref:</span>
                      <span className="font-mono font-semibold text-slate-900">
                        UZM-APP-2026-8412
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">M-Pesa Receipt:</span>
                      <span className="font-mono font-semibold text-emerald-800">
                        {mpesaRef}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Monthly Commitment:</span>
                      <span className="font-mono font-semibold text-slate-900 tabular-nums">
                        {formatKES(Number(monthlyDeposit) || 1000)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleFinish}
                      className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                    >
                      Continue to Member Portal
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
