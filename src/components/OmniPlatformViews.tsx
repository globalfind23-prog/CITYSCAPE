import React, { useState } from 'react';
import {
  MarketplaceListing,
  SUBSCRIPTION_PLANS,
  CurrencyCode,
  CURRENCIES,
  formatMoney,
  PAYMENT_METHODS_CATALOG,
} from '../data/omniData';
import {
  CheckCircle2,
  ShieldCheck,
  Plus,
  Lock,
  Terminal,
} from 'lucide-react';

interface MarketplaceViewProps {
  items: MarketplaceListing[];
  currency: CurrencyCode;
  onToggleInstall: (id: string) => void;
  onPublishListing: (listing: MarketplaceListing) => void;
  onTriggerCommand: (cmd: string) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  items,
  currency,
  onToggleInstall,
  onPublishListing,
  onTriggerCommand,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedIndustryWizard, setSelectedIndustryWizard] = useState('Ecommerce');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<MarketplaceListing['category']>('AI Agent');
  const [newPrice, setNewPrice] = useState(29);
  const [showCreatorModal, setShowCreatorModal] = useState(false);

  const filtered =
    categoryFilter === 'All' ? items : items.filter((i) => i.category === categoryFilter);

  const industries = [
    'Ecommerce',
    'Real Estate',
    'Restaurants',
    'Agencies',
    'Freelancers',
    'Consultants',
    'Creators',
    'Hotels & Tourism',
    'Education',
    'Professional Services',
    'Startups',
  ];

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onPublishListing({
      id: `mp-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      industry: selectedIndustryWizard,
      creator: 'Your Creator Studio (80% Rev Share)',
      priceUSD: Number(newPrice),
      rating: 5.0,
      installs: 1,
      description: `Custom ${newCategory} published to the global OMNI Ecosystem with automated commission payout to OMNI Wallet.`,
      installed: true,
    });
    setNewTitle('');
    setShowCreatorModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-200 dark:border-blue-900/60 pb-4">
        <div>
          <h2 className="text-xl font-display font-bold">
            OMNI Marketplace & Ready-Made Industry Template Store
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Install specialized AI Agents, Workflows, and Complete Business Packs — or publish your own and earn into OMNI Wallet.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-blue-50 dark:bg-[#0B1528] border border-blue-200/60 dark:border-blue-900/50 rounded-lg">
            {['All', 'AI Agent', 'Workflow', 'Template', 'Business Pack'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowCreatorModal(true)}
            className="px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Publish & Monetize</span>
          </button>
        </div>
      </div>

      {/* "Launch My Business" Guided Setup Banner with Modern Blue Image */}
      <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl overflow-hidden bg-white dark:bg-[#0B1528] grid grid-cols-1 lg:grid-cols-3">
        <div className="p-6 lg:col-span-2 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-blue-600 dark:text-sky-400">
              OMNI Template Store · “Launch My Business” Guided System
            </div>
            <h3 className="text-base md:text-lg font-bold">
              Select your industry and let OMNI configure your CRM, AI Workforce, Workflows & Landing Page
            </h3>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setSelectedIndustryWizard(ind)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    selectedIndustryWizard === ind
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-blue-50 dark:bg-blue-950/60 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() =>
                onTriggerCommand(
                  `Launch My Business: Configure complete ${selectedIndustryWizard} growth system, CRM pipeline, and automated follow-up workflows.`
                )
              }
              className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 whitespace-nowrap cursor-pointer"
            >
              Launch {selectedIndustryWizard} System →
            </button>
          </div>
        </div>
        <div className="relative h-48 lg:h-auto bg-[#060E20]">
          <img
            src="/src/assets/images/omni_blue_marketplace_pack_1791084531550.jpg"
            alt="OMNI Modular Blue Business Packs"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>
                  {item.category} · {item.industry}
                </span>
                <span className="font-mono tabular-nums">
                  ★ {item.rating.toFixed(1)} · {item.installs.toLocaleString()} installs
                </span>
              </div>
              <h3 className="text-base font-bold mt-1">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400">By {item.creator}</div>
                <div className="text-sm font-bold font-mono tabular-nums">
                  {item.priceUSD === 0 ? 'Free Included' : formatMoney(item.priceUSD, currency)}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onToggleInstall(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  item.installed
                    ? 'bg-blue-500/15 text-blue-700 dark:text-sky-300'
                    : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
              >
                {item.installed ? 'Installed in OS' : 'Install Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCreatorModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0B1528] border border-blue-200 dark:border-blue-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-base font-bold">Publish to OMNI Marketplace</h3>
            <p className="text-xs text-slate-500 mt-1">
              Creators receive 80% of every sale directly in OMNI Wallet. OMNI earns a 20% platform commission.
            </p>
            <form onSubmit={handlePublish} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium mb-1">Listing Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder='e.g., "Dental Clinic Appointment & Recall Agent"'
                  className="w-full px-3 py-2 rounded border border-blue-200 dark:border-blue-800 bg-transparent"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">Asset Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded border border-blue-200 dark:border-blue-800 bg-transparent"
                  >
                    <option value="AI Agent">AI Agent</option>
                    <option value="Workflow">Workflow</option>
                    <option value="Template">Template</option>
                    <option value="Business Pack">Business Pack</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Price (USD)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded border border-blue-200 dark:border-blue-800 bg-transparent font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreatorModal(false)}
                  className="px-3 py-2 rounded border border-blue-200 dark:border-blue-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold cursor-pointer"
                >
                  Publish Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface WalletViewProps {
  currency: CurrencyCode;
  onChangeCurrency: (c: CurrencyCode) => void;
  onLogAction: (agent: string, action: string, result: string, perm: string) => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  currency,
  onChangeCurrency,
  onLogAction,
}) => {
  const [availableUSD, setAvailableUSD] = useState(14820);
  const [withdrawAmountUSD, setWithdrawAmountUSD] = useState(1200);
  const [payoutMethod, setPayoutMethod] = useState('MTN Mobile Money (MoMo) Uganda — Instant UGX');
  const [paymentScopeFilter, setPaymentScopeFilter] = useState<'All' | 'Uganda Local' | 'Pan-African' | 'Global Continental'>('All');
  const [mfaVerified] = useState(true);
  const [convertAmount, setConvertAmount] = useState(1000);
  const [fromCurr, setFromCurr] = useState<CurrencyCode>('USD');
  const [toCurr, setToCurr] = useState<CurrencyCode>('UGX');
  const [referralCopied, setReferralCopied] = useState(false);

  const [transactions, setTransactions] = useState([
    {
      id: 'TX-9041',
      date: '2026-10-03 11:20 UTC',
      type: 'Marketplace Creator Royalty (80%)',
      originalAmount: '$39.20 USD',
      usdEquivalent: 39.2,
      status: 'Settled',
    },
    {
      id: 'TX-9038',
      date: '2026-10-02 16:45 UTC',
      type: 'Enterprise Referral Bonus (5 Businesses Invited)',
      originalAmount: '€450.00 EUR (Rate 0.92)',
      usdEquivalent: 489.13,
      status: 'Settled',
    },
    {
      id: 'TX-9029',
      date: '2026-09-29 09:10 UTC',
      type: 'Withdrawal via Mobile Money / Bank Payout',
      originalAmount: 'USh 8,976,000 UGX (Rate 3740)',
      usdEquivalent: -2400,
      status: 'Completed (KYC + MFA Verified)',
    },
  ]);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmountUSD <= 0 || withdrawAmountUSD > availableUSD) return;
    setAvailableUSD((prev) => prev - withdrawAmountUSD);
    setTransactions((prev) => [
      {
        id: `TX-${Math.floor(9100 + Math.random() * 800)}`,
        date: 'Just now (UTC)',
        type: `Withdrawal via ${payoutMethod}`,
        originalAmount: `${formatMoney(withdrawAmountUSD, currency)} (${currency})`,
        usdEquivalent: -withdrawAmountUSD,
        status: mfaVerified ? 'Approved & Dispatched' : 'Pending Verification',
      },
      ...prev,
    ]);
    onLogAction(
      'Finance Intelligence Agent',
      `Processed compliant withdrawal of ${formatMoney(withdrawAmountUSD, currency)} via ${payoutMethod}`,
      'Passed KYC, AML & MFA audit checks',
      'Level 5 (Restricted)'
    );
  };

  const convertedResult =
    (convertAmount / CURRENCIES[fromCurr].rateFromUSD) * CURRENCIES[toCurr].rateFromUSD;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-200 dark:border-blue-900/60 pb-4">
        <div>
          <h2 className="text-xl font-display font-bold">
            OMNI Wallet, Multi-Currency Treasury & Cashout Security
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track marketplace & referral earnings, convert across 11 global currencies with historical rate retention, and withdraw via regulated providers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Preferred Display Currency:</span>
          <select
            value={currency}
            onChange={(e) => onChangeCurrency(e.target.value as CurrencyCode)}
            className="px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-[#0B1528] font-mono font-semibold"
          >
            {Object.values(CURRENCIES).map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528]">
          <div className="text-xs text-slate-500">Available Balance (Ready for Cashout)</div>
          <div className="text-3xl font-display font-bold font-mono tabular-nums text-blue-600 dark:text-sky-400 mt-1">
            {formatMoney(availableUSD, currency)}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            Base Ledger: ${availableUSD.toLocaleString()} USD
          </div>
        </div>

        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528]">
          <div className="text-xs text-slate-500">Pending Escrow Balance (7-Day Settlement)</div>
          <div className="text-3xl font-display font-bold font-mono tabular-nums mt-1">
            {formatMoney(3490, currency)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Held via regulated payment processor partner
          </div>
        </div>

        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528]">
          <div className="text-xs text-slate-500">Lifetime OMNI Ecosystem Earnings</div>
          <div className="text-3xl font-display font-bold font-mono tabular-nums mt-1">
            {formatMoney(68420, currency)}
          </div>
          <div className="text-[11px] text-blue-600 dark:text-sky-400 mt-1">
            Marketplace + Affiliate & Referral Rewards
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form
          onSubmit={handleWithdraw}
          className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] space-y-4 text-xs"
        >
          <div className="flex items-center justify-between border-b border-blue-100 dark:border-blue-900/50 pb-3">
            <div>
              <h3 className="text-sm font-semibold">Compliant Payout & Withdrawal</h3>
              <p className="text-slate-500">
                Payouts processed via licensed providers (Bank, Mobile Money, PayPal, Stripe)
              </p>
            </div>
            <ShieldCheck className="w-5 h-5 text-blue-500 dark:text-sky-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium mb-1">Withdrawal Amount (USD Base)</label>
              <input
                type="number"
                value={withdrawAmountUSD}
                onChange={(e) => setWithdrawAmountUSD(Number(e.target.value))}
                max={availableUSD}
                className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-transparent font-mono tabular-nums"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Regulated Payout Provider (Uganda, Africa & Global)</label>
              <select
                value={payoutMethod}
                onChange={(e) => setPayoutMethod(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-transparent"
              >
                <optgroup label="Uganda Local Payment Rails">
                  <option>MTN Mobile Money (MoMo) Uganda — Instant UGX</option>
                  <option>Airtel Money Uganda — Instant Merchant Payout</option>
                  <option>Stanbic Bank Uganda & FlexiPay — Instant RTGS</option>
                  <option>Centenary Bank Uganda (CenteMobile)</option>
                  <option>dfcu Bank Uganda Corporate Settlement</option>
                  <option>Eversend & Chipper Cash Uganda Wallet</option>
                  <option>Yo! Uganda & EzeeMoney Aggregator</option>
                </optgroup>
                <optgroup label="Pan-African Payment Rails">
                  <option>M-Pesa (Safaricom / Vodacom East & Southern Africa)</option>
                  <option>Flutterwave Multi-Currency Payout (34+ African Countries)</option>
                  <option>Paystack by Stripe (Nigeria, Ghana, Kenya, South Africa)</option>
                  <option>PesaPal & DPO Pay Regional Settlement</option>
                  <option>Cellulant Tingg & Onafriq Interoperable Hub</option>
                </optgroup>
                <optgroup label="Global Continental Rails (West to East)">
                  <option>Stripe Connect Express Payout (North America & Global)</option>
                  <option>Banco Central Pix & Mercado Pago (South America)</option>
                  <option>SEPA Instant & UK Faster Payments (Europe)</option>
                  <option>UPI India & PayNow Singapore (Asia)</option>
                  <option>Australia New Payments Platform PayID (Oceania)</option>
                  <option>PayPal Global & SWIFT International Wire</option>
                </optgroup>
              </select>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-50/40 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
            <div className="font-semibold text-slate-900 dark:text-white">
              Cashout Security Verification Checklist:
            </div>
            <div>✓ Email, Identity (KYC) & Payout Account Verified · Fraud Check Nominal</div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 cursor-pointer"
          >
            Withdraw {formatMoney(withdrawAmountUSD, currency)} Now
          </button>
        </form>

        <div className="space-y-6">
          <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Global Multi-Currency Converter</h3>
              <span className="font-mono text-[11px] text-slate-400">
                FX Timestamp: 2026-10-03 20:00 UTC
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center">
              <input
                type="number"
                value={convertAmount}
                onChange={(e) => setConvertAmount(Number(e.target.value))}
                className="px-3 py-2 rounded border border-blue-200 dark:border-blue-800 bg-transparent font-mono tabular-nums"
              />
              <select
                value={fromCurr}
                onChange={(e) => setFromCurr(e.target.value as CurrencyCode)}
                className="px-2 py-2 rounded border border-blue-200 dark:border-blue-800 bg-transparent font-mono"
              >
                {Object.keys(CURRENCIES).map((c) => (
                  <option key={c} value={c}>
                    From {c}
                  </option>
                ))}
              </select>
              <select
                value={toCurr}
                onChange={(e) => setToCurr(e.target.value as CurrencyCode)}
                className="px-2 py-2 rounded border border-blue-200 dark:border-blue-800 bg-transparent font-mono"
              >
                {Object.keys(CURRENCIES).map((c) => (
                  <option key={c} value={c}>
                    To {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="p-3 rounded-lg bg-blue-50/40 dark:bg-[#070E1C] font-mono tabular-nums text-sm font-bold text-blue-600 dark:text-sky-400">
              {convertAmount.toLocaleString()} {fromCurr} ={' '}
              {convertedResult.toLocaleString('en-US', { maximumFractionDigits: 2 })} {toCurr}
            </div>
          </div>

          <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">OMNI Viral Referral Engine</h3>
              <span className="font-mono text-blue-600 dark:text-sky-400 font-semibold">
                4 / 5 Businesses Invited
              </span>
            </div>
            <p className="text-slate-500">
              Invite 5 businesses to OMNI → Receive 1 month of Growth Plan free + 20% recurring partner commission.
            </p>
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                readOnly
                value="https://omni.global/invite/caleb-akankwasa"
                className="flex-1 px-3 py-2 rounded border border-blue-100 dark:border-blue-900/50 bg-blue-50/40 dark:bg-[#070E1C] font-mono"
              />
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText('https://omni.global/invite/caleb-akankwasa');
                  setReferralCopied(true);
                }}
                className="px-3.5 py-2 rounded bg-blue-600 text-white font-semibold cursor-pointer"
              >
                {referralCopied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528]">
        <h3 className="text-sm font-semibold mb-3">
          Multi-Currency Transaction Ledger (Retains Original Settlement Currency & FX Rate)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-blue-100 dark:border-blue-900/50 text-slate-500">
                <th className="py-2 pr-3">ID</th>
                <th className="py-2 px-3">Timestamp</th>
                <th className="py-2 px-3">Description</th>
                <th className="py-2 px-3">Original Currency Record</th>
                <th className="py-2 px-3 text-right">Display ({currency})</th>
                <th className="py-2 pl-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50 dark:divide-blue-900/40 font-mono tabular-nums">
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="py-2.5 pr-3">{tx.id}</td>
                  <td className="py-2.5 px-3 text-slate-500">{tx.date}</td>
                  <td className="py-2.5 px-3 font-sans font-medium">{tx.type}</td>
                  <td className="py-2.5 px-3 text-slate-500">{tx.originalAmount}</td>
                  <td
                    className={`py-2.5 px-3 text-right font-semibold ${
                      tx.usdEquivalent >= 0 ? 'text-blue-600 dark:text-sky-400' : ''
                    }`}
                  >
                    {tx.usdEquivalent >= 0 ? '+' : '-'}
                    {formatMoney(Math.abs(tx.usdEquivalent), currency)}
                  </td>
                  <td className="py-2.5 pl-3 text-right font-sans text-blue-600 dark:text-sky-400">
                    {tx.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface BillingViewProps {
  currency: CurrencyCode;
  aiCredits: number;
  onAddCredits: (amount: number) => void;
}

export const BillingView: React.FC<BillingViewProps> = ({
  currency,
  aiCredits,
  onAddCredits,
}) => {
  const [annualBilling, setAnnualBilling] = useState(true);
  const [activePlanId, setActivePlanId] = useState('growth');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-200 dark:border-blue-900/60 pb-4">
        <div>
          <h2 className="text-xl font-display font-bold">
            OMNI Global Subscription Plans & Usage-Based AI Credits
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Transparent pricing for individuals, high-growth startups, and global enterprises.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-blue-50 dark:bg-[#0B1528] border border-blue-200/60 dark:border-blue-900/50 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setAnnualBilling(false)}
              className={`px-3 py-1.5 rounded-md font-medium cursor-pointer ${
                !annualBilling ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setAnnualBilling(true)}
              className={`px-3 py-1.5 rounded-md font-medium cursor-pointer ${
                annualBilling ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>
      </div>

      <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500">Current Usage-Based AI Credit Balance</div>
          <div className="text-2xl font-display font-bold font-mono tabular-nums text-blue-600 dark:text-sky-400 mt-0.5">
            AI Credits: {aiCredits.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Used for high-compute operations: audio transcription (15 credits), executive plan orchestration (25 credits), and deep research.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onAddCredits(2500)}
            className="px-3.5 py-2 rounded-lg border border-blue-200 dark:border-blue-800 text-xs font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/60 cursor-pointer"
          >
            + 2,500 Credits ({formatMoney(15, currency)})
          </button>
          <button
            type="button"
            onClick={() => onAddCredits(10000)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 cursor-pointer"
          >
            + 10,000 Credits ({formatMoney(45, currency)})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const priceUSD = annualBilling ? plan.annualPriceUSD : plan.monthlyPriceUSD;
          const isCurrent = activePlanId === plan.id;
          return (
            <div
              key={plan.id}
              className={`border rounded-xl p-5 flex flex-col justify-between ${
                plan.popular
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-blue-200/80 dark:border-blue-900/60 bg-white dark:bg-[#0B1528]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">{plan.audience}</span>
                  {plan.popular && (
                    <span className="text-blue-600 dark:text-sky-400 font-bold">
                      Most Popular
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-display font-bold mt-1">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-mono tabular-nums">
                    {priceUSD === 0 ? 'Free' : formatMoney(priceUSD, currency)}
                  </span>
                  {priceUSD > 0 && <span className="text-xs text-slate-500">/ month</span>}
                </div>

                <div className="mt-4 pt-4 border-t border-blue-100 dark:border-blue-900/50 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div>✓ {plan.aiCreditsMonthly}</div>
                  <div>✓ {plan.activeAgentsLimit}</div>
                  <div>✓ {plan.automationRuns}</div>
                  <div>✓ {plan.supportLevel}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActivePlanId(plan.id)}
                className={`mt-5 w-full py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                }`}
              >
                {isCurrent ? 'Current Active Plan' : `Switch to ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const IntegrationsView: React.FC = () => {
  const [connectedMap, setConnectedMap] = useState<Record<string, boolean>>({
    Shopify: true,
    Stripe: true,
    Gmail: true,
    'Google Calendar': true,
    'Google Drive': true,
    Slack: true,
    HubSpot: false,
    Salesforce: false,
    WooCommerce: false,
    PayPal: true,
    Zapier: true,
    Make: false,
  });

  const integrations = [
    { name: 'Shopify', cat: 'Ecommerce', desc: 'Real-time orders, products, inventory & abandoned carts' },
    { name: 'WooCommerce', cat: 'Ecommerce', desc: 'WordPress store orders & SKU catalog sync' },
    { name: 'Stripe', cat: 'Payments', desc: 'Global subscriptions, invoices, refunds & payouts' },
    { name: 'PayPal', cat: 'Payments', desc: 'International checkout & creator wallet withdrawals' },
    { name: 'Gmail', cat: 'Workspace', desc: 'OAuth email outreach, inbox triage & customer threads' },
    { name: 'Google Calendar', cat: 'Workspace', desc: 'Automated sales discovery booking & executive schedule' },
    { name: 'Google Drive', cat: 'Workspace', desc: 'Knowledge Vault document & spreadsheet indexing' },
    { name: 'Slack', cat: 'Collaboration', desc: 'Real-time team alerts, deal approvals & agent notifications' },
    { name: 'HubSpot', cat: 'CRM', desc: 'Bi-directional contact, deal & pipeline synchronization' },
    { name: 'Salesforce', cat: 'CRM', desc: 'Enterprise account & opportunity ledger connector' },
    { name: 'Zapier', cat: 'Automation', desc: 'Trigger 6,000+ external apps from OMNI workflows' },
    { name: 'Make', cat: 'Automation', desc: 'Multi-step webhook & scenario orchestration' },
  ];

  const pythonSdkExample = `import omni_os

# Initialize OMNI Public Developer API Client
client = omni_os.Client(api_key="omni_live_98f2a...redacted")

# 1. Create a measurable business goal via POST /goals
goal = client.goals.create(
    title="Acquire 100 new enterprise customers",
    target_value=100,
    currency="USD",
    governance_level=4
)

# 2. Dispatch coordinated AI Workforce agents via POST /agents
execution = client.agents.orchestrate(
    goal_id=goal.id,
    agents=["omni_ceo", "marketing_agent", "sales_agent"]
)
print(execution.projected_metric_delta)`;

  return (
    <div className="space-y-6">
      <div className="border-b border-blue-200 dark:border-blue-900/60 pb-4">
        <h2 className="text-xl font-display font-bold">
          OMNI Integration Hub & Public Developer API Platform
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Connect external business platforms via official OAuth/APIs or build custom integrations using the OMNI REST & Python SDK.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {integrations.map((intg) => {
          const isConn = !!connectedMap[intg.name];
          return (
            <div
              key={intg.name}
              className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-4 bg-white dark:bg-[#0B1528] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{intg.cat}</span>
                  <span
                    className={`font-semibold ${
                      isConn ? 'text-blue-600 dark:text-sky-400' : 'text-slate-400'
                    }`}
                  >
                    {isConn ? 'Connected' : 'Available'}
                  </span>
                </div>
                <h3 className="text-sm font-bold mt-1">{intg.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{intg.desc}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setConnectedMap((prev) => ({ ...prev, [intg.name]: !prev[intg.name] }))
                }
                className={`mt-4 w-full py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isConn
                    ? 'border border-blue-200 dark:border-blue-800 text-slate-600 dark:text-slate-300'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {isConn ? 'Configure OAuth Scope' : 'Connect via OAuth'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-2 text-blue-600 dark:text-sky-400 font-semibold">
            <Terminal className="w-4 h-4" />
            <span>OMNI Public Developer REST Endpoints</span>
          </div>
          <p className="text-slate-500">
            Scoped API keys, OAuth 2.0 tokens, rate limiting (1,200 req/min), and signed webhooks.
          </p>
          <div className="space-y-2 font-mono">
            {[
              { method: 'POST', path: '/api/v1/goals', desc: 'Create & track measurable business goals' },
              { method: 'POST', path: '/api/v1/agents', desc: 'Activate & orchestrate specialized AI agents' },
              { method: 'POST', path: '/api/v1/workflows', desc: 'Generate & trigger automated workflows' },
              { method: 'GET', path: '/api/v1/analytics', desc: 'Retrieve revenue, cohort & funnel metrics' },
              { method: 'POST', path: '/api/v1/automations', desc: 'Configure event-driven triggers & webhooks' },
              { method: 'GET', path: '/api/v1/customers', desc: 'Query CRM contacts & lead scores' },
            ].map((ep) => (
              <div
                key={ep.path}
                className="p-2.5 rounded bg-blue-50/40 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50 flex items-center justify-between"
              >
                <span>
                  <strong className="text-blue-600 dark:text-sky-400">{ep.method}</strong>{' '}
                  {ep.path}
                </span>
                <span className="font-sans text-slate-500">{ep.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-500 mb-2">
            Official Python SDK Quickstart (`pip install omni-business-os`)
          </div>
          <pre className="p-4 rounded-lg bg-[#050B16] text-sky-400 font-mono text-xs overflow-x-auto leading-relaxed">
            {pythonSdkExample}
          </pre>
        </div>
      </div>
    </div>
  );
};

export const HelpCentreView: React.FC = () => {
  const [supportQuery, setSupportQuery] = useState('Why didn’t my automation run?');
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [supportResult, setSupportResult] = useState({
    headline: 'Diagnostic Complete: Connected Email Token Requires Reauthorization',
    diagnosisOrOverview:
      'The workflow "Post-Purchase Retention Engine" paused at Step 2 because the connected Gmail OAuth token expired after a password rotation.',
    recommendedAction: 'Reauthorize Gmail OAuth token and resume queued workflow runs.',
  });

  const sections = [
    { title: 'Getting Started', desc: 'How to create an account, set goals, and configure OMNI OS.' },
    { title: 'AI Workforce', desc: 'How all 14 specialized AI agents collaborate and follow permissions.' },
    { title: 'Automation', desc: 'Building visual WHEN → THEN → WAIT → IF workflows without code.' },
    { title: 'Billing & Credits', desc: 'Managing subscriptions, annual discounts, and AI Credits.' },
    { title: 'OMNI Wallet', desc: 'Marketplace royalties, referral rewards, and compliant cashouts.' },
    { title: 'Security & Governance', desc: 'MFA, passkeys, session controls, and Level 1–5 safety gates.' },
    { title: 'Integrations & API', desc: 'Connecting Shopify, Stripe, Gmail, Slack, and webhooks.' },
    { title: 'Marketplace', desc: 'Buying and selling AI agents, templates, and business packs.' },
    { title: 'Transcription', desc: 'Recording calls, speaker diarization, and action extraction.' },
    { title: 'World Map', desc: 'Understanding connected global customer and market intelligence.' },
    { title: 'Troubleshooting', desc: 'Resolving webhook timeouts, OAuth scopes, and rate limits.' },
  ];

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDiagnosing(true);
    setFixed(false);
    try {
      const res = await fetch('/api/omni/research-or-support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: supportQuery, mode: 'support' }),
      });
      const data = await res.json();
      if (data.headline) {
        setSupportResult(data);
      }
    } catch {
      // Keep default diagnosis
    } finally {
      setIsDiagnosing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-blue-200 dark:border-blue-900/60 pb-4">
        <h2 className="text-xl font-display font-bold">OMNI Help Centre & AI Support Diagnostic</h2>
        <p className="text-xs text-slate-500 mt-1">
          Instant system diagnostics with 1-click automated resolution + complete documentation across all 11 platform modules.
        </p>
      </div>

      <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] space-y-4">
        <div className="text-xs font-semibold text-blue-600 dark:text-sky-400">
          OMNI AI Support Assistant · Permitted System Diagnostics
        </div>
        <form onSubmit={handleDiagnose} className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={supportQuery}
            onChange={(e) => setSupportQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-transparent text-xs"
          />
          <button
            type="submit"
            disabled={isDiagnosing}
            className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 cursor-pointer"
          >
            {isDiagnosing ? 'Checking System...' : 'Diagnose Issue'}
          </button>
        </form>

        <div className="p-4 rounded-lg bg-blue-50/40 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-slate-900 dark:text-white">{supportResult.headline}</div>
            <p className="text-slate-600 dark:text-slate-400">{supportResult.diagnosisOrOverview}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {fixed ? (
              <span className="inline-flex items-center gap-1 text-blue-600 dark:text-sky-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Fixed Automatically & Resumed
              </span>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setFixed(true)}
                  className="px-3.5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 cursor-pointer"
                >
                  Fix Automatically
                </button>
                <button
                  type="button"
                  onClick={() => setFixed(true)}
                  className="px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 font-medium cursor-pointer"
                >
                  Show Me How
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <div
            key={s.title}
            onClick={() => setSupportQuery(`How do I configure and optimize ${s.title}?`)}
            className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-4 bg-white dark:bg-[#0B1528] hover:border-blue-500 transition-colors cursor-pointer"
          >
            <h3 className="text-sm font-bold">{s.title}</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SettingsSecurityView: React.FC = () => {
  const [subTab, setSubTab] = useState<'security' | 'privacy' | 'admin' | 'legal'>('security');
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [passkeyEnabled, setPasskeyEnabled] = useState(true);
  const [sessions, setSessions] = useState([
    { id: 's1', device: 'Chrome · macOS Workstation (Current Device)', location: 'Kampala / London', active: true },
    { id: 's2', device: 'OMNI iOS Mobile App · iPhone 16 Pro', location: 'Mobile Push Active', active: true },
    { id: 's3', device: 'Windows 11 · Edge Browser', location: 'Last active 2 days ago', active: true },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-200 dark:border-blue-900/60 pb-4">
        <div>
          <h2 className="text-xl font-display font-bold">
            OMNI Security Center, Privacy Controls, Admin & Legal Governance
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Proprietor & Founder: Caleb Akankwasa · Enterprise encryption, MFA, tenant isolation, and complete data control.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-blue-50 dark:bg-[#0B1528] border border-blue-200/60 dark:border-blue-900/50 rounded-lg">
          {[
            { id: 'security', label: 'Security Center (94/100)' },
            { id: 'privacy', label: 'Your Data & Privacy' },
            { id: 'admin', label: 'OMNI Admin Control' },
            { id: 'legal', label: 'Terms & Privacy Policy' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSubTab(t.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
                subTab === t.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {subTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-blue-100 dark:border-blue-900/50 pb-3">
              <div>
                <div className="text-slate-500">Account Protection Rating</div>
                <div className="text-3xl font-display font-bold font-mono tabular-nums text-blue-600 dark:text-sky-400 mt-1">
                  Security Score: 94/100
                </div>
              </div>
              <Lock className="w-6 h-6 text-blue-500 dark:text-sky-400" />
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between py-1.5 border-b border-blue-50 dark:border-blue-900/40">
                <span>Multi-Factor Authentication (MFA) & Recovery Codes</span>
                <button
                  type="button"
                  onClick={() => setMfaEnabled(!mfaEnabled)}
                  className="font-semibold text-blue-600 dark:text-sky-400 cursor-pointer"
                >
                  {mfaEnabled ? 'Enabled (Verified)' : 'Enable Now'}
                </button>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-blue-50 dark:border-blue-900/40">
                <span>Hardware Passkeys + Google / Apple / Microsoft SSO</span>
                <button
                  type="button"
                  onClick={() => setPasskeyEnabled(!passkeyEnabled)}
                  className="font-semibold text-blue-600 dark:text-sky-400 cursor-pointer"
                >
                  {passkeyEnabled ? 'Active' : 'Configure'}
                </button>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span>Unrestricted Financial / Legal AI Execution Block</span>
                <span className="font-mono text-blue-600 dark:text-sky-400">
                  Hard-Enforced (Level 5 Safeguard)
                </span>
              </div>
            </div>
          </div>

          <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-blue-100 dark:border-blue-900/50 pb-3">
              <h3 className="text-sm font-semibold">Active Device Sessions</h3>
              <button
                type="button"
                onClick={() => setSessions((prev) => prev.slice(0, 1))}
                className="text-rose-600 dark:text-rose-400 font-semibold hover:underline cursor-pointer"
              >
                Log Out All Other Devices
              </button>
            </div>
            <div className="space-y-3">
              {sessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{s.device}</div>
                    <div className="text-slate-500">{s.location}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSessions((prev) => prev.filter((item) => item.id !== s.id))}
                    className="px-2.5 py-1 rounded border border-blue-200 dark:border-blue-800 cursor-pointer"
                  >
                    Log Out
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {subTab === 'privacy' && (
        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] space-y-4 text-xs">
          <h3 className="text-base font-bold">YOUR DATA — Complete Organizational Memory & Privacy Control</h3>
          <p className="text-slate-500">
            You own your business data. Control what OMNI stores in organizational memory, export records in JSON/CSV, or request immediate deletion.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-lg border border-blue-100 dark:border-blue-900/50 space-y-2">
              <div className="font-bold">Export Business Data</div>
              <p className="text-slate-500">Download full CRM, analytics, transcripts, and workflow logs.</p>
              <button
                type="button"
                className="px-3 py-1.5 rounded bg-blue-600 text-white font-semibold cursor-pointer"
              >
                Export JSON / CSV Archive
              </button>
            </div>
            <div className="p-4 rounded-lg border border-blue-100 dark:border-blue-900/50 space-y-2">
              <div className="font-bold">AI Memory Governance</div>
              <p className="text-slate-500">Zero training on private tenant data without explicit opt-in.</p>
              <span className="inline-block text-blue-600 dark:text-sky-400 font-semibold">
                ✓ Tenant Isolation Active
              </span>
            </div>
            <div className="p-4 rounded-lg border border-blue-100 dark:border-blue-900/50 space-y-2">
              <div className="font-bold">Data Deletion Controls</div>
              <p className="text-slate-500">Purge specific customer records or reset organizational memory.</p>
              <button
                type="button"
                className="px-3 py-1.5 rounded border border-rose-500/40 text-rose-600 dark:text-rose-400 font-semibold cursor-pointer"
              >
                Manage Deletion Requests
              </button>
            </div>
          </div>
        </div>
      )}

      {subTab === 'admin' && (
        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-blue-100 dark:border-blue-900/50 pb-3">
            <div>
              <h3 className="text-base font-bold">OMNI Admin Control Center (Proprietor: Caleb Akankwasa)</h3>
              <p className="text-slate-500">Platform-wide governance, marketplace moderation, fraud monitoring & feature flags</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono tabular-nums">
            <div className="p-3.5 rounded-lg bg-blue-50/40 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50">
              <div className="font-sans text-slate-400">Global Active Workspaces</div>
              <div className="text-xl font-bold mt-1">14,280</div>
            </div>
            <div className="p-3.5 rounded-lg bg-blue-50/40 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50">
              <div className="font-sans text-slate-400">Marketplace Agents Pending Review</div>
              <div className="text-xl font-bold mt-1 text-amber-500">7 Queued</div>
            </div>
            <div className="p-3.5 rounded-lg bg-blue-50/40 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50">
              <div className="font-sans text-slate-400">Fraud & Withdrawal Audits</div>
              <div className="text-xl font-bold mt-1 text-blue-600 dark:text-sky-400">0 Flagged</div>
            </div>
            <div className="p-3.5 rounded-lg bg-blue-50/40 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50">
              <div className="font-sans text-slate-400">API Uptime & SLA</div>
              <div className="text-xl font-bold mt-1 text-blue-600 dark:text-sky-400">99.98%</div>
            </div>
          </div>
        </div>
      )}

      {subTab === 'legal' && (
        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            OMNI Terms & Conditions and Global Privacy Policy Summary
          </h3>
          <p>
            <strong>Proprietor & Founder Identity:</strong> OMNI — AI Business Operating System is founded and operated by Proprietor <strong>Caleb Akankwasa</strong>.
          </p>
          <p>
            <strong>AI Safety & Limitations:</strong> OMNI provides Level 1–5 permission controls. AI agents are never permitted to execute unrestricted financial, legal, destructive, or high-risk commitments without explicit human authorization. Outputs from the Legal Workflow Agent and Finance Intelligence Agent are decision-support tools and must be reviewed by qualified legal or financial professionals in your operating jurisdiction.
          </p>
          <p>
            <strong>Payments, Subscriptions & Cashouts:</strong> Subscriptions, usage-based AI Credits, and marketplace payouts are processed through licensed and compliant payment processors (including Stripe, PayPal, bank transfer, and authorized regional mobile-money providers). Historical transaction records preserve original settlement currency and exchange-rate timestamps.
          </p>
        </div>
      )}
    </div>
  );
};
