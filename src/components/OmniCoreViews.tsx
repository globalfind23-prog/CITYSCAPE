import React, { useState } from 'react';
import {
  AIAgent,
  BusinessGoal,
  CurrencyCode,
  formatMoney,
  AutomationLogItem,
  HOME_TWENTY_IMAGERY_FEATURES,
} from '../data/omniData';
import {
  ArrowUpRight,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Plus,
} from 'lucide-react';

interface HomeViewProps {
  currency: CurrencyCode;
  agents: AIAgent[];
  goals: BusinessGoal[];
  logs: AutomationLogItem[];
  onNavigate: (section: any) => void;
  onTriggerCommand: (cmd: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currency,
  agents,
  goals,
  logs,
  onNavigate,
  onTriggerCommand,
}) => {
  const [reportTab, setReportTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [executedOpportunities, setExecutedOpportunities] = useState<string[]>([]);
  const [featureCorridorFilter, setFeatureCorridorFilter] = useState<string>('All 20 Features');

  const visibleImageryFeatures =
    featureCorridorFilter === 'All 20 Features'
      ? HOME_TWENTY_IMAGERY_FEATURES
      : HOME_TWENTY_IMAGERY_FEATURES.filter((f) => f.regionCorridor === featureCorridorFilter);

  const activeAgentCount = agents.filter((a) => a.active).length;

  const opportunities = [
    {
      id: 'opp-1',
      title: 'Best-selling skincare serum has 23% lower conversion on mobile viewports',
      impact: '+$6,800 / mo projected lift',
      agent: 'Ecommerce Agent',
      actionLabel: 'Deploy Mobile Express Checkout Fix',
    },
    {
      id: 'opp-2',
      title: '127 previous customers have been inactive for 45+ days',
      impact: '+$4,150 immediate win-back revenue',
      agent: 'Customer Success Agent',
      actionLabel: 'Launch Approved Re-Engagement Sequence',
    },
    {
      id: 'opp-3',
      title: 'Customers who purchase Cleanser A frequently purchase Vitamin C Serum within 14 days',
      impact: '+18% average order value',
      agent: 'Marketing Agent',
      actionLabel: 'Activate Post-Purchase Bundle Workflow',
    },
  ];

  const risks = [
    {
      id: 'risk-1',
      severity: 'Warning',
      title: 'Mobile landing page conversion dipped 12% over the last 7 days',
      detail: 'Identified slow hero script on iOS Safari; Operations Agent prepared lightweight HTML patch.',
    },
    {
      id: 'risk-2',
      severity: 'Alert',
      title: 'Social Ad Set #4 approaching daily CPA ceiling ($38.50 vs $32.00 target)',
      detail: 'Autopilot paused bid scaling and awaits Level-4 approval to shift budget to Email & Search.',
    },
    {
      id: 'risk-3',
      severity: 'Nominal',
      title: 'Inventory Alert: Vitamin C Serum SKU-104 at 19 days remaining stock',
      detail: 'Purchase order draft prepared for supplier review.',
    },
  ];

  const handleExecuteOpportunity = (id: string, title: string) => {
    setExecutedOpportunities((prev) => [...prev, id]);
    onTriggerCommand(`Execute opportunity optimization: ${title}`);
  };

  return (
    <div className="space-y-8">
      {/* Modern Blue Architectural Hero Banner with Measured Scrim */}
      <div className="relative rounded-xl overflow-hidden border border-blue-200 dark:border-blue-900/70 bg-[#060E20] min-h-[220px] flex items-end">
        <img
          src="/src/assets/images/omni_blue_hero_banner_1791084498239.jpg"
          alt="OMNI Global AI Business Operating System modern blue architecture"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040915] via-[#040915]/60 to-transparent" />
        <div className="relative z-10 p-6 md:p-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
          <div className="max-w-2xl space-y-1.5">
            <div className="text-xs font-mono text-sky-400">
              OMNI AI Business Operating System · Proprietor: Caleb Akankwasa
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-balance">
              Tell OMNI your goal. OMNI builds the path, executes the work, and grows your business.
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Coordinating {activeAgentCount} active AI agents across global revenue, CRM, marketing, automation, and multi-currency intelligence.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('workforce')}
              className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              Inspect AI Workforce
            </button>
            <button
              type="button"
              onClick={() => onNavigate('worldmap')}
              className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              Global World Map
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: Primary KPI Grid + OMNI Business Health Score (82/100) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {/* OMNI Score Card */}
        <div className="xl:col-span-2 border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] flex flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                OMNI Business Health Score · Real-Time Audit
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-4xl font-display font-bold font-mono tabular-nums text-blue-600 dark:text-sky-400">
                  82/100
                </span>
                <span className="text-xs font-mono text-blue-600 dark:text-sky-400">
                  +4.2 pts this month
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onTriggerCommand('Improve abandoned-cart recovery to increase OMNI Score to 90/100')}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors whitespace-nowrap cursor-pointer"
            >
              Fix Top Bottleneck
            </button>
          </div>
          <div className="mt-4 pt-3 border-t border-blue-100 dark:border-blue-900/50 text-xs text-slate-600 dark:text-slate-300">
            <strong className="font-semibold text-slate-900 dark:text-white">Biggest Opportunity:</strong>{' '}
            Improve mobile abandoned-cart recovery (+8 pts potential score lift).
            <div className="mt-2 grid grid-cols-4 gap-2 text-[11px] font-mono tabular-nums text-slate-500">
              <span>Sales: 86</span>
              <span>Mktg: 79</span>
              <span>Retent: 84</span>
              <span>Auto: 88</span>
            </div>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Monthly Revenue (MRR)</div>
            <div className="mt-2 text-2xl font-bold font-mono tabular-nums">
              {formatMoney(112400, currency)}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-blue-100 dark:border-blue-900/50 flex items-center justify-between text-xs">
            <span className="text-blue-600 dark:text-sky-400 font-mono tabular-nums">
              +24.6% vs last month
            </span>
            <button
              type="button"
              onClick={() => onNavigate('analytics')}
              className="text-slate-500 hover:text-blue-600 dark:hover:text-sky-400 inline-flex items-center gap-0.5 cursor-pointer"
            >
              Analytics <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Customers & Leads */}
        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Active Customers · Qualified Leads</div>
            <div className="mt-2 text-2xl font-bold font-mono tabular-nums">
              3,915 <span className="text-sm font-normal text-slate-400">/ 1,640 leads</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-blue-100 dark:border-blue-900/50 flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-mono tabular-nums">
              4.7% avg conversion
            </span>
            <button
              type="button"
              onClick={() => onNavigate('crm')}
              className="text-slate-500 hover:text-blue-600 dark:hover:text-sky-400 inline-flex items-center gap-0.5 cursor-pointer"
            >
              Open CRM <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* AI Workforce & Automations */}
        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Active AI Workforce</div>
            <div className="mt-2 text-2xl font-bold font-mono tabular-nums">
              {activeAgentCount} / {agents.length} Agents
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-blue-100 dark:border-blue-900/50 flex items-center justify-between text-xs">
            <span className="text-blue-600 dark:text-sky-400 font-mono tabular-nums">
              2,040 tasks automated
            </span>
            <button
              type="button"
              onClick={() => onNavigate('workforce')}
              className="text-slate-500 hover:text-blue-600 dark:hover:text-sky-400 inline-flex items-center gap-0.5 cursor-pointer"
            >
              Manage <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Opportunity Radar & Risk Radar + Executive Briefing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* OMNI Opportunity Radar */}
        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528]">
          <div className="flex items-center justify-between pb-3 border-b border-blue-100 dark:border-blue-900/50">
            <div>
              <h3 className="text-sm font-semibold">OMNI Opportunity Radar</h3>
              <p className="text-xs text-slate-500">Continuous revenue & conversion discovery</p>
            </div>
            <Sparkles className="w-4 h-4 text-blue-500 dark:text-sky-400" />
          </div>
          <div className="mt-4 space-y-4">
            {opportunities.map((opp) => {
              const isDone = executedOpportunities.includes(opp.id);
              return (
                <div
                  key={opp.id}
                  className="pb-3.5 border-b border-blue-50 dark:border-blue-900/40 last:border-none last:pb-0"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{opp.agent}</span>
                    <span className="font-mono tabular-nums text-blue-600 dark:text-sky-400 font-medium">
                      {opp.impact}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 mt-1 leading-relaxed">
                    “{opp.title}”
                  </p>
                  <div className="mt-2">
                    {isDone ? (
                      <span className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-sky-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Dispatched to {opp.agent}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleExecuteOpportunity(opp.id, opp.title)}
                        className="text-xs font-semibold text-blue-600 dark:text-sky-400 hover:underline cursor-pointer"
                      >
                        {opp.actionLabel} →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* OMNI Risk Radar */}
        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528]">
          <div className="flex items-center justify-between pb-3 border-b border-blue-100 dark:border-blue-900/50">
            <div>
              <h3 className="text-sm font-semibold">OMNI Risk & Anomaly Radar</h3>
              <p className="text-xs text-slate-500">Proactive protection across revenue, spend & stock</p>
            </div>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-4 space-y-4">
            {risks.map((risk) => (
              <div
                key={risk.id}
                className="pb-3.5 border-b border-blue-50 dark:border-blue-900/40 last:border-none last:pb-0"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`font-semibold ${
                      risk.severity === 'Alert'
                        ? 'text-rose-600 dark:text-rose-400'
                        : risk.severity === 'Warning'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-blue-600 dark:text-sky-400'
                    }`}
                  >
                    {risk.severity}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-700 dark:text-slate-200 font-medium">{risk.title}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {risk.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Business Report (Daily / Weekly / Monthly Executive Briefing) */}
        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-blue-100 dark:border-blue-900/50">
              <div>
                <h3 className="text-sm font-semibold">Executive Business Briefing</h3>
                <p className="text-xs text-slate-500">Synthesized by OMNI Personal Assistant</p>
              </div>
              <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-950/80 p-0.5 rounded-lg text-xs">
                {(['daily', 'weekly', 'monthly'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setReportTab(t)}
                    className={`px-2 py-1 rounded-md capitalize font-medium transition-colors cursor-pointer ${
                      reportTab === t
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {reportTab === 'daily' && (
              <div className="mt-4 space-y-3 text-xs">
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  “Here are the three things you need to know today:”
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                  <li>
                    <strong>Revenue Momentum:</strong> Daily gross sales reached{' '}
                    <span className="font-mono tabular-nums">{formatMoney(4280, currency)}</span> (+18% above Tuesday average).
                  </li>
                  <li>
                    <strong>Hot Enterprise Pipeline:</strong> Vanguard Cloud ($28.5k) and Pearl FinTech ($12.4k) requested final API security terms.
                  </li>
                  <li>
                    <strong>Action Required:</strong> 14 abandoned carts worth{' '}
                    <span className="font-mono tabular-nums">{formatMoney(2190, currency)}</span> are queued for your 1-click approval.
                  </li>
                </ol>
              </div>
            )}

            {reportTab === 'weekly' && (
              <div className="mt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between py-1 border-b border-blue-50 dark:border-blue-900/40">
                  <span>Weekly Net Revenue:</span>
                  <span className="font-mono tabular-nums font-semibold">{formatMoney(27850, currency)} (+14.2%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-blue-50 dark:border-blue-900/40">
                  <span>New Paying Customers:</span>
                  <span className="font-mono tabular-nums font-semibold">94 customers</span>
                </div>
                <div className="flex justify-between py-1 border-b border-blue-50 dark:border-blue-900/40">
                  <span>Top Performing Channel:</span>
                  <span className="font-semibold text-blue-600 dark:text-sky-400">Automated Email (6.4x ROAS)</span>
                </div>
                <p className="pt-1 leading-relaxed">
                  <strong>Weekly AI Recommendation:</strong> Shift 20% of top-of-funnel social budget into automated post-purchase referral incentives.
                </p>
              </div>
            )}

            {reportTab === 'monthly' && (
              <div className="mt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Investor & Board Executive Summary (Oct 2026)
                </p>
                <p className="leading-relaxed">
                  Annualized Run Rate (ARR) reached <span className="font-mono tabular-nums">{formatMoney(1348800, currency)}</span> across 11 global markets with 94.2% net revenue retention. AI Workforce automation saved an estimated 412 human operating hours this month.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-blue-100 dark:border-blue-900/50 flex items-center justify-between text-xs">
            <span className="text-slate-400">Powered by OMNI Executive</span>
            <button
              type="button"
              onClick={() => onTriggerCommand('Generate a comprehensive Weekly Executive Report with action items')}
              className="font-semibold text-blue-600 dark:text-sky-400 hover:underline cursor-pointer"
            >
              Generate Fresh Briefing →
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Active Goal Progress & Recent Governance Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goal Engine Preview */}
        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528]">
          <div className="flex items-center justify-between pb-3 border-b border-blue-100 dark:border-blue-900/50">
            <div>
              <h3 className="text-sm font-semibold">AI Goal Engine Progress</h3>
              <p className="text-xs text-slate-500">Live progress tracking & bottleneck diagnosis</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('goals')}
              className="text-xs font-semibold text-blue-600 dark:text-sky-400 hover:underline cursor-pointer"
            >
              Open Goal Engine →
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {goals.slice(0, 3).map((g) => {
              const pct = Math.min(100, Math.round((g.currentValue / g.targetValue) * 1000) / 10);
              const formattedCurrent =
                g.unit === 'currency'
                  ? formatMoney(g.currentValue, currency)
                  : g.unit === 'percent'
                  ? `${g.currentValue}%`
                  : g.currentValue.toLocaleString();
              const formattedTarget =
                g.unit === 'currency'
                  ? formatMoney(g.targetValue, currency)
                  : g.unit === 'percent'
                  ? `${g.targetValue}%`
                  : g.targetValue.toLocaleString();

              return (
                <div key={g.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{g.title}</span>
                    <span className="font-mono tabular-nums text-slate-600 dark:text-slate-300">
                      {formattedCurrent} / {formattedTarget} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-blue-100 dark:bg-blue-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 dark:bg-sky-500 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    <strong className="text-slate-700 dark:text-slate-300">Bottleneck:</strong> {g.bottleneckExplanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent AI Governance & Automation Log */}
        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528]">
          <div className="flex items-center justify-between pb-3 border-b border-blue-100 dark:border-blue-900/50">
            <div>
              <h3 className="text-sm font-semibold">AI Governance & Execution Ledger</h3>
              <p className="text-xs text-slate-500">Every automated action logged with permission level</p>
            </div>
            <ShieldCheck className="w-4 h-4 text-blue-500 dark:text-sky-400" />
          </div>

          <div className="mt-3 divide-y divide-blue-50 dark:divide-blue-900/40 text-xs">
            {logs.slice(0, 4).map((item) => (
              <div key={item.id} className="py-2.5 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{item.agent}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{item.time}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.permissionLevel}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mt-0.5">{item.action}</p>
                </div>
                <span className="font-mono tabular-nums text-blue-600 dark:text-sky-400 shrink-0 text-right">
                  {item.result}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: 20 Visual Imagery Features Gallery (Aligned West to East) */}
      <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 md:p-6 bg-gradient-to-r from-white via-blue-50/30 to-sky-50/40 dark:from-[#060E20] dark:via-[#0B1730] dark:to-[#0C2142] space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-blue-100 dark:border-blue-900/50 pb-4">
          <div>
            <div className="text-xs font-mono text-blue-600 dark:text-sky-400">
              West-to-East Global Operating Architecture · 20 Visual Imagery Capabilities
            </div>
            <h3 className="text-lg md:text-xl font-display font-bold mt-0.5">
              20 OMNI Platform Imagery Features (Americas → Europe & Africa → Uganda Hub → Asia & Oceania)
            </h3>
          </div>

          <div className="flex items-center gap-1 p-1 bg-white/80 dark:bg-[#060D1E] border border-blue-200/60 dark:border-blue-800/70 rounded-lg overflow-x-auto">
            {[
              'All 20 Features',
              'Americas (West)',
              'Europe & Africa (Center)',
              'Ugandan & East Africa Hub',
              'Asia & Oceania (East)',
            ].map((corridor) => (
              <button
                key={corridor}
                type="button"
                onClick={() => setFeatureCorridorFilter(corridor)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  featureCorridorFilter === corridor
                    ? 'bg-gradient-to-r from-[#1E40AF] to-[#0284C7] text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400'
                }`}
              >
                {corridor}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleImageryFeatures.map((feat) => (
            <div
              key={feat.number}
              onClick={() => onNavigate(feat.targetNav)}
              className="group border border-blue-200/80 dark:border-blue-800/60 rounded-xl overflow-hidden bg-white dark:bg-[#091326] hover:border-sky-400 transition-all flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative h-36 bg-[#040915] overflow-hidden">
                  <img
                    src={feat.imageUrl}
                    alt={feat.title}
                    referrerPolicy="no-referrer"
                    style={{ objectPosition: feat.objectPosition }}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040915] via-[#040915]/30 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white">
                    <span className="text-sky-300 font-bold">{feat.number}. Feature</span>
                    <span>{feat.metric}</span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-[11px] text-blue-600 dark:text-sky-400 font-medium">
                    {feat.regionCorridor}
                  </div>
                  <h4 className="text-sm font-bold mt-0.5 text-slate-900 dark:text-white">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>

              <div className="px-4 py-2.5 border-t border-blue-100/80 dark:border-blue-900/40 flex items-center justify-between text-xs text-blue-600 dark:text-sky-400 font-semibold">
                <span>Launch Module</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// AI WORKFORCE VIEW (All 14 Specialized AI Employees + Modern Blue Visual Showcase)
// ============================================================================
interface WorkforceViewProps {
  agents: AIAgent[];
  onToggleAgent: (id: string) => void;
  onChangePermission: (id: string, level: 1 | 2 | 3 | 4 | 5) => void;
  onDispatchTask: (agentName: string, task: string) => void;
}

export const WorkforceView: React.FC<WorkforceViewProps> = ({
  agents,
  onToggleAgent,
  onChangePermission,
  onDispatchTask,
}) => {
  const [filterDept, setFilterDept] = useState<string>('All');
  const [taskModalAgent, setTaskModalAgent] = useState<AIAgent | null>(null);
  const [customTaskInput, setCustomTaskInput] = useState('');

  const departments = ['All', 'Executive', 'Growth', 'Revenue', 'Intelligence', 'Commerce', 'Operations', 'Governance'];
  const filtered =
    filterDept === 'All' ? agents : agents.filter((a) => a.department === filterDept);

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskModalAgent || !customTaskInput.trim()) return;
    onDispatchTask(taskModalAgent.name, customTaskInput.trim());
    setTaskModalAgent(null);
    setCustomTaskInput('');
  };

  return (
    <div className="space-y-6">
      {/* Modern Blue AI Workforce Visual Header */}
      <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl overflow-hidden bg-white dark:bg-[#0B1528] grid grid-cols-1 lg:grid-cols-3">
        <div className="p-6 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-blue-600 dark:text-sky-400">
              Autonomous Multi-Agent Architecture · Levels 1–5 Governance
            </div>
            <h2 className="text-xl md:text-2xl font-display font-bold mt-1">
              OMNI AI Workforce (14 Specialized AI Employees)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Activate specialized AI employees, configure Level 1–5 governance permissions, and coordinate multi-agent workflows across Strategy, Marketing, Sales, Finance, Operations, and Legal preparation.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-blue-100 dark:border-blue-900/50 text-xs flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Collaboration Bus:</strong> OMNI CEO → Marketing Agent → Sales Agent → Data Analyst Agent
            </span>
            <span className="font-mono text-blue-600 dark:text-sky-400">
              {agents.filter((a) => a.active).length} / 14 Agents Active
            </span>
          </div>
        </div>
        <div className="relative h-48 lg:h-auto bg-[#060E20]">
          <img
            src="/src/assets/images/omni_blue_ai_workforce_1791084510430.jpg"
            alt="OMNI AI Workforce crystalline blue intelligence network"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Interactive Filter Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 p-1 bg-blue-50 dark:bg-[#0B1528] border border-blue-200/60 dark:border-blue-900/50 rounded-lg overflow-x-auto">
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setFilterDept(dept)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filterDept === dept
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((agent) => (
          <div
            key={agent.id}
            className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-500">
                    {agent.department} · {agent.tasksCompleted.toLocaleString()} tasks completed
                  </div>
                  <h3 className="text-base font-semibold mt-0.5">{agent.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleAgent(agent.id)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    agent.active
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {agent.active ? 'Active' : 'Standby'}
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{agent.role}</p>

              <div className="mt-3 p-3 rounded-lg bg-blue-50/50 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50 text-xs">
                <div className="text-slate-400">Current Assignment:</div>
                <div className="text-slate-800 dark:text-slate-200 font-medium mt-0.5">
                  {agent.currentTask}
                </div>
              </div>

              {agent.requiresLegalNotice && (
                <p className="mt-2 text-[11px] text-amber-600 dark:text-amber-400">
                  Note: Legal outputs require human & qualified legal-professional review before execution.
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-blue-100 dark:border-blue-900/50 space-y-2.5 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-500">Governance Level:</span>
                <select
                  value={agent.permissionLevel}
                  onChange={(e) =>
                    onChangePermission(agent.id, Number(e.target.value) as 1 | 2 | 3 | 4 | 5)
                  }
                  className="px-2 py-1 rounded border border-blue-200 dark:border-blue-800 bg-transparent font-mono text-xs"
                >
                  <option value={1}>Lvl 1: Analyze</option>
                  <option value={2}>Lvl 2: Draft</option>
                  <option value={3}>Lvl 3: Auto Low-Risk</option>
                  <option value={4}>Lvl 4: Human Approval</option>
                  <option value={5}>Lvl 5: Restricted</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 truncate max-w-[180px]">
                  Syncs: {agent.collaboratesWith.join(', ')}
                </span>
                <button
                  type="button"
                  onClick={() => setTaskModalAgent(agent)}
                  className="font-semibold text-blue-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  Assign Task →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assign Task Modal */}
      {taskModalAgent && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0B1528] border border-blue-200 dark:border-blue-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-base font-bold">Assign Directive to {taskModalAgent.name}</h3>
            <p className="text-xs text-slate-500 mt-1">{taskModalAgent.role}</p>
            <form onSubmit={handleAssignSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1">Task Instruction</label>
                <textarea
                  rows={3}
                  value={customTaskInput}
                  onChange={(e) => setCustomTaskInput(e.target.value)}
                  placeholder="Describe the objective, target metric, and deadline..."
                  className="w-full p-3 rounded-lg border border-blue-300 dark:border-blue-800 bg-transparent text-xs"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setTaskModalAgent(null)}
                  className="px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 cursor-pointer"
                >
                  Dispatch to Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// AI GOAL ENGINE VIEW
// ============================================================================
interface GoalsViewProps {
  goals: BusinessGoal[];
  currency: CurrencyCode;
  onAddGoal: (goal: BusinessGoal) => void;
  onUpdateGoalProgress: (id: string, deltaPct: number) => void;
  onTriggerCommand: (cmd: string) => void;
}

export const GoalsView: React.FC<GoalsViewProps> = ({
  goals,
  currency,
  onAddGoal,
  onUpdateGoalProgress,
  onTriggerCommand,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<BusinessGoal['category']>('Revenue');
  const [targetValue, setTargetValue] = useState(25000);

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newGoal: BusinessGoal = {
      id: `goal-${Date.now()}`,
      title: title.trim(),
      category,
      targetValue: Number(targetValue),
      currentValue: Math.round(Number(targetValue) * 0.35),
      unit: category === 'Revenue' ? 'currency' : category === 'Growth' ? 'percent' : 'count',
      deadline: 'Nov 30, 2026',
      bottleneckExplanation: 'OMNI Data Analyst Agent identified top-of-funnel landing page drop-off during peak mobile hours.',
      recommendedFix: 'Activate automated multi-channel retargeting & CRM lead follow-up workflow.',
      assignedAgent: category === 'Revenue' ? 'OMNI CEO' : 'Marketing Agent',
    };
    onAddGoal(newGoal);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-200 dark:border-blue-900/60 pb-4">
        <div>
          <h2 className="text-xl font-display font-bold">OMNI AI Goal Engine</h2>
          <p className="text-xs text-slate-500 mt-1">
            Define measurable revenue, customer, lead, and growth targets. OMNI tracks progress and diagnoses bottlenecks.
          </p>
        </div>
      </div>

      {/* Create New Measurable Goal Form */}
      <form
        onSubmit={handleCreateGoal}
        className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Measurable Business Objective
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='e.g., "Reach $25,000 monthly recurring revenue" or "Acquire 500 new customers"'
            className="w-full px-3.5 py-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-transparent text-xs"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Category & Target Value
          </label>
          <div className="flex gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as BusinessGoal['category'])}
              className="px-2.5 py-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-transparent text-xs"
            >
              <option value="Revenue">Revenue</option>
              <option value="Customers">Customers</option>
              <option value="Leads">Leads</option>
              <option value="Growth">Growth %</option>
              <option value="Marketing">Marketing</option>
            </select>
            <input
              type="number"
              value={targetValue}
              onChange={(e) => setTargetValue(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-transparent text-xs font-mono tabular-nums"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Goal to Engine</span>
        </button>
      </form>

      {/* Goals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {goals.map((g) => {
          const pct = Math.min(100, Math.round((g.currentValue / g.targetValue) * 1000) / 10);
          const displayTarget =
            g.unit === 'currency'
              ? formatMoney(g.targetValue, currency)
              : g.unit === 'percent'
              ? `${g.targetValue}%`
              : g.targetValue.toLocaleString();
          const displayCurrent =
            g.unit === 'currency'
              ? formatMoney(g.currentValue, currency)
              : g.unit === 'percent'
              ? `${g.currentValue}%`
              : g.currentValue.toLocaleString();

          return (
            <div
              key={g.id}
              className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>
                    {g.category} Goal · Assigned to {g.assignedAgent}
                  </span>
                  <span className="font-mono">Target Date: {g.deadline}</span>
                </div>

                <h3 className="text-base font-bold mt-1">{g.title}</h3>

                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <div className="text-xs text-slate-400">Goal: {displayTarget}</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-blue-600 dark:text-sky-400 mt-0.5">
                      {displayCurrent} achieved
                    </div>
                  </div>
                  <span className="text-2xl font-display font-bold font-mono tabular-nums">
                    {pct}%
                  </span>
                </div>

                <div className="mt-2 w-full h-2.5 bg-blue-100 dark:bg-blue-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-sky-500 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="mt-4 p-3.5 rounded-lg bg-blue-50/50 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50 text-xs space-y-1.5">
                  <div>
                    <strong className="text-slate-900 dark:text-white">
                      What is preventing this goal from being reached:
                    </strong>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">{g.bottleneckExplanation}</p>
                  </div>
                  <div>
                    <strong className="text-blue-600 dark:text-sky-400">OMNI Recommended Action:</strong>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5">{g.recommendedFix}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-blue-100 dark:border-blue-900/50 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateGoalProgress(g.id, 10)}
                  className="px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-950/60 cursor-pointer"
                >
                  Simulate +10% Execution Lift
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onTriggerCommand(`Execute recommended fix for ${g.title}: ${g.recommendedFix}`)
                  }
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 cursor-pointer"
                >
                  Execute Fix with {g.assignedAgent}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
