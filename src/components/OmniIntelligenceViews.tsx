import React, { useState } from 'react';
import {
  CurrencyCode,
  formatMoney,
  WORLD_MARKET_DATA,
  CountryMarketData,
} from '../data/omniData';
import {
  Globe2,
  Search,
  FileAudio,
  BookOpen,
} from 'lucide-react';

interface AnalyticsViewProps {
  currency: CurrencyCode;
  onLogAction: (agent: string, action: string, result: string, perm: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ currency, onLogAction }) => {
  const [researchQuery, setResearchQuery] = useState(
    'Analyze my top 3 ecommerce & SaaS competitors and recommend pricing differentiation.'
  );
  const [isResearching, setIsResearching] = useState(false);
  const [researchData, setResearchData] = useState({
    headline: 'Competitive Positioning & Margin Benchmark (Q4 2026)',
    diagnosisOrOverview:
      'Your conversion rate fell 12% this week on mobile product pages, while email retention sequences outperformed paid social by 3.1x.',
    findings: [
      {
        title: 'Mobile Checkout Friction vs Industry Benchmark',
        detail: 'Mobile visitors experience a 3-step checkout vs 1-click Apple/Google Pay on top competitor stores.',
        metricOrImpact: '-12% mobile conversion this week',
      },
      {
        title: 'Competitor Pricing & Bundle Positioning',
        detail: 'Direct competitors price single units 8% lower but lack automated subscription refill incentives.',
        metricOrImpact: '+24% LTV advantage with OMNI bundles',
      },
      {
        title: 'Channel ROI Comparison',
        detail: 'Automated CRM email sequences deliver 6.4x ROAS compared to 2.1x on cold social video ads.',
        metricOrImpact: '+$8,400/mo reallocation opportunity',
      },
    ],
    recommendedAction:
      'Shift 20% of top-of-funnel ad spend into automated CRM retention and enable 1-click mobile express checkout.',
  });

  const [vaultQuestion, setVaultQuestion] = useState('What is our refund and enterprise SLA policy?');
  const [vaultAnswer, setVaultAnswer] = useState(
    'According to Approved Policy Doc #04 (OMNI Knowledge Vault): Standard retail orders qualify for a 30-day satisfaction guarantee. Enterprise SaaS plans include a 99.95% uptime SLA with Level-4 human approval required for custom contract addendums.'
  );

  const handleRunResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResearching(true);
    try {
      const res = await fetch('/api/omni/research-or-support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: researchQuery, mode: 'research' }),
      });
      const data = await res.json();
      if (data.headline) {
        setResearchData(data);
        onLogAction(
          'Research Agent',
          `Completed competitor & market study: "${researchQuery}"`,
          data.recommendedAction,
          'Level 1 (Analyze)'
        );
      }
    } catch {
      // Retain existing analysis
    } finally {
      setIsResearching(false);
    }
  };

  const monthlySeries = [
    { month: 'May', rev: 64200, conv: 4.1 },
    { month: 'Jun', rev: 72800, conv: 4.3 },
    { month: 'Jul', rev: 81500, conv: 4.5 },
    { month: 'Aug', rev: 90400, conv: 4.9 },
    { month: 'Sep', rev: 98900, conv: 4.8 },
    { month: 'Oct', rev: 112400, conv: 4.7 },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-blue-200 dark:border-blue-900/60 pb-4">
        <h2 className="text-xl font-display font-bold">
          OMNI Analytics, Research Lab & Organizational Knowledge Vault
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Plain-language AI telemetry explanations, competitor benchmarks, and verified company memory.
        </p>
      </div>

      <div className="p-5 rounded-xl border border-blue-500/30 bg-blue-500/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-blue-600 dark:text-sky-400">
            Data Analyst Agent · Plain-Language Insight
          </div>
          <p className="text-sm font-semibold mt-0.5">
            “Your conversion rate fell 12% this week. The largest change came from mobile visitors on checkout step 2.”
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            onLogAction(
              'Data Analyst Agent',
              'Deployed mobile viewport checkout optimization patch',
              '+1.1% conversion recovery',
              'Level 3 (Auto Low-Risk)'
            )
          }
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 whitespace-nowrap cursor-pointer"
        >
          Apply Recommended Mobile Fix
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528]">
          <h3 className="text-sm font-semibold">6-Month Revenue Trajectory & Conversion</h3>
          <div className="mt-5 space-y-3">
            {monthlySeries.map((item) => {
              const widthPct = Math.round((item.rev / 120000) * 100);
              return (
                <div key={item.month} className="space-y-1 text-xs">
                  <div className="flex justify-between font-mono tabular-nums">
                    <span>{item.month} 2026</span>
                    <span>
                      {formatMoney(item.rev, currency)} · {item.conv}% conv
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-blue-100 dark:bg-blue-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 dark:bg-sky-500 rounded-full"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-blue-100 dark:border-blue-900/50">
              <div>
                <h3 className="text-sm font-semibold">OMNI Knowledge Vault & Organizational Memory</h3>
                <p className="text-xs text-slate-500">
                  14 Indexed Documents (Policies, Product Catalog, Contracts, Brand Voice)
                </p>
              </div>
              <BookOpen className="w-4 h-4 text-blue-500 dark:text-sky-400" />
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={vaultQuestion}
                  onChange={(e) => setVaultQuestion(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() =>
                    setVaultAnswer(
                      `Verified Answer from OMNI Memory for "${vaultQuestion}": All customer data is tenant-isolated, encrypted with AES-256, and subject to 30-day refund eligibility and Level-4 human approval for enterprise custom terms.`
                    )
                  }
                  className="px-3.5 py-2 rounded-lg bg-blue-600 text-white font-semibold cursor-pointer"
                >
                  Ask Vault
                </button>
              </div>
              <div className="p-3.5 rounded-lg bg-blue-50/40 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50 leading-relaxed text-slate-700 dark:text-slate-300">
                {vaultAnswer}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-100 dark:border-blue-900/50 text-[11px] text-slate-500 flex justify-between">
            <span>Stored Memory: Brand Voice, 12 SKUs, Refund Policy, SOC2 Checklist</span>
            <span className="text-blue-600 dark:text-sky-400 font-medium">User-Controlled Memory</span>
          </div>
        </div>
      </div>

      <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] space-y-4">
        <div>
          <h3 className="text-sm font-semibold">OMNI Research Lab · Competitor & Market Intelligence</h3>
          <p className="text-xs text-slate-500">Ask Research Agent to benchmark competitors, pricing, and market trends</p>
        </div>

        <form onSubmit={handleRunResearch} className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={researchQuery}
            onChange={(e) => setResearchQuery(e.target.value)}
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-transparent text-xs"
          />
          <button
            type="submit"
            disabled={isResearching}
            className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isResearching ? 'Researching...' : 'Run Competitor Analysis'}</span>
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {researchData.findings.map((f, i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-blue-100 dark:border-blue-900/50 bg-blue-50/40 dark:bg-[#070E1C] text-xs space-y-1.5"
            >
              <div className="font-mono text-blue-600 dark:text-sky-400 font-semibold">
                {f.metricOrImpact}
              </div>
              <div className="font-bold text-slate-900 dark:text-white">{f.title}</div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface TranscriptionsViewProps {
  onDeductCredits: (amount: number) => void;
  onLogAction: (agent: string, action: string, result: string, perm: string) => void;
}

export const TranscriptionsView: React.FC<TranscriptionsViewProps> = ({
  onDeductCredits,
  onLogAction,
}) => {
  const [transcriptText, setTranscriptText] = useState(
    `[00:01] Caleb Akankwasa (Founder): Welcome everyone to the Q4 product and enterprise sales sync. Let's review why mobile checkout dropped 12% and what our enterprise customers asked for.\n[00:24] Elena Rostova (Customer - Vanguard Cloud): We love the OMNI AI Workforce, but our security team needs automated SOC2 audit log exports and a 15-day onboarding timeline before we sign the $28,500 annual agreement.\n[00:52] Marcus (Growth Lead): On the ecommerce side, customers complained that the 3-step shipping address form on mobile is too slow. If we enable 1-click express checkout by Friday, we project recovering $6,800 monthly.\n[01:18] Caleb Akankwasa: Agreed. Decision made: Operations Agent will enable 1-click mobile checkout today, and Sales Agent will send Elena the SOC2 audit export documentation with our 14-day onboarding guarantee.`
  );
  const [questionInput, setQuestionInput] = useState('What did the customer complain about and what decisions were made?');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState({
    summary:
      'Executive Q4 sync covering Vanguard Cloud ($28.5k enterprise deal) requirements and the root cause of the 12% mobile checkout drop.',
    directAnswer:
      'The customer (Elena from Vanguard Cloud) requested automated SOC2 audit log exports and a 15-day onboarding guarantee. Retail customers complained about the slow 3-step mobile shipping form.',
    detectedLanguage: 'English (Multilingual Detection Ready)',
    keyDecisions: [
      'Enable 1-click express mobile checkout by Friday to recover $6,800/month.',
      'Send Vanguard Cloud the SOC2 audit export package and commit to a 14-day onboarding schedule.',
    ],
    actionItems: [
      {
        owner: 'Operations & Ecommerce Agent',
        task: 'Deploy 1-click mobile express checkout patch',
        priority: 'High',
      },
      {
        owner: 'Sales Agent',
        task: 'Send SOC2 compliance packet & 14-day onboarding SLA to Elena Rostova',
        priority: 'High',
      },
    ],
    followUpEmailDraft:
      'Subject: Vanguard Cloud x OMNI — SOC2 Audit Export & 14-Day Onboarding Timeline\n\nHi Elena,\nThank you for joining today’s call. Attached is our SOC2 Audit Log specification along with our guaranteed 14-day enterprise onboarding schedule for your $28,500 annual plan.',
  });

  const handleAnalyzeTranscript = async (customQuestion?: string) => {
    const q = customQuestion ?? questionInput;
    setIsAnalyzing(true);
    onDeductCredits(15);

    try {
      const res = await fetch('/api/omni/transcribe-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcriptText, question: q }),
      });
      const data = await res.json();
      if (data.summary) {
        setAnalysis(data);
        onLogAction(
          'Personal Assistant',
          `Analyzed meeting transcript: "${q}"`,
          `${data.actionItems?.length || 2} action items extracted`,
          'Level 2 (Draft)'
        );
      }
    } catch {
      // Keep default structured intelligence
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-blue-200 dark:border-blue-900/60 pb-4">
        <h2 className="text-xl font-display font-bold">
          OMNI Transcribe · Smart Meeting & Customer Call Intelligence
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Record or paste meetings, customer calls, interviews, and voice notes. Extract speaker diarization, decisions, action items, and follow-up emails.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold flex items-center gap-1.5">
              <FileAudio className="w-4 h-4 text-blue-500 dark:text-sky-400" />
              <span>Speaker-Identified Transcript</span>
            </span>
            <span className="text-xs font-mono text-slate-400">{analysis.detectedLanguage}</span>
          </div>

          <textarea
            rows={9}
            value={transcriptText}
            onChange={(e) => setTranscriptText(e.target.value)}
            className="w-full p-3.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-[#070E1C] text-xs font-mono leading-relaxed"
          />

          <div className="space-y-2">
            <label className="block text-xs font-semibold">Ask Smart Transcription Intelligence:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-transparent text-xs"
              />
              <button
                type="button"
                onClick={() => handleAnalyzeTranscript()}
                disabled={isAnalyzing}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 whitespace-nowrap cursor-pointer"
              >
                {isAnalyzing ? 'Analyzing...' : 'Ask OMNI'}
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'What did the customer complain about?',
                'List every action item.',
                'What decisions were made?',
                'Summarize this in five points.',
              ].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setQuestionInput(preset);
                    handleAnalyzeTranscript(preset);
                  }}
                  className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/60 text-[11px] text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 cursor-pointer"
                >
                  “{preset}”
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] space-y-4 text-xs">
          <div className="p-3.5 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <div className="font-semibold text-blue-700 dark:text-sky-300">
              Smart Transcription Answer:
            </div>
            <p className="mt-1 text-slate-800 dark:text-slate-200 leading-relaxed">
              {analysis.directAnswer}
            </p>
          </div>

          <div>
            <strong className="text-slate-500 block mb-1">Key Decisions Recorded:</strong>
            <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
              {analysis.keyDecisions.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong className="text-slate-500 block mb-1">Extracted Action Items:</strong>
            <div className="space-y-2">
              {analysis.actionItems.map((item, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded border border-blue-100 dark:border-blue-900/50 flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-semibold">{item.owner}:</span> {item.task}
                  </div>
                  <span className="font-mono text-blue-600 dark:text-sky-400 shrink-0">
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <strong className="text-slate-500 block mb-1">Auto-Generated Follow-Up Email:</strong>
            <pre className="p-3 rounded-lg bg-blue-50/40 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50 font-sans whitespace-pre-wrap leading-relaxed">
              {analysis.followUpEmailDraft}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

interface WorldMapViewProps {
  currency: CurrencyCode;
  onSelectCurrency: (c: CurrencyCode) => void;
  onTriggerCommand: (cmd: string) => void;
}

export const WorldMapView: React.FC<WorldMapViewProps> = ({
  currency,
  onSelectCurrency,
  onTriggerCommand,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryMarketData>(
    WORLD_MARKET_DATA.find((c) => c.id === 'ug') || WORLD_MARKET_DATA[0]
  );
  const [regionFilter, setRegionFilter] = useState<string>('All');

  const regions = [
    { name: 'North America', customers: 1550, revUSD: 107000, corridor: 'West 01' },
    { name: 'South America', customers: 427, revUSD: 44300, corridor: 'West 02' },
    { name: 'Europe', customers: 760, revUSD: 121000, corridor: 'Center 03' },
    { name: 'Africa', customers: 913, revUSD: 114300, corridor: 'Center 04 (Uganda Hub)' },
    { name: 'Asia', customers: 978, revUSD: 140100, corridor: 'East 05' },
    { name: 'Oceania', customers: 230, revUSD: 34100, corridor: 'East 06' },
  ];

  const visibleCountries = (
    regionFilter === 'All'
      ? WORLD_MARKET_DATA
      : WORLD_MARKET_DATA.filter((c) => c.region === regionFilter)
  ).sort((a, b) => a.westToEastOrder - b.westToEastOrder);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-200 dark:border-blue-900/60 pb-4">
        <div>
          <h2 className="text-xl font-display font-bold">
            OMNI World · West-to-East 6-Continent Customer & Market Intelligence Map
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Aligned West-to-East: North America → South America → Europe → Africa (Uganda Hub) → Asia → Oceania.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-blue-50 dark:bg-[#0B1528] border border-blue-200/60 dark:border-blue-900/50 rounded-lg overflow-x-auto">
          {['All', 'North America', 'South America', 'Europe', 'Africa', 'Asia', 'Oceania'].map((reg) => (
            <button
              key={reg}
              type="button"
              onClick={() => setRegionFilter(reg)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap cursor-pointer ${
                regionFilter === reg
                  ? 'bg-gradient-to-r from-[#1E40AF] to-[#0284C7] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {regions.map((r) => (
          <div
            key={r.name}
            onClick={() => setRegionFilter(r.name)}
            className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-3.5 bg-gradient-to-r from-white to-blue-50/40 dark:from-[#071124] dark:to-[#0C1D3A] hover:border-sky-400 transition-colors cursor-pointer"
          >
            <div className="text-[10px] font-mono text-blue-600 dark:text-sky-400">{r.corridor}</div>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-0.5">{r.name}</div>
            <div className="text-base font-bold font-mono tabular-nums mt-1">
              {formatMoney(r.revUSD, currency)}
            </div>
            <div className="text-[11px] text-blue-600 dark:text-sky-400 font-mono tabular-nums mt-0.5">
              {r.customers.toLocaleString()} customers
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-blue-900/70 rounded-xl p-5 bg-[#050C1A] text-white relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
            <span>Interactive Global Operations Map (Click any country node)</span>
            <span className="font-mono text-sky-400">11 Connected Markets Active</span>
          </div>

          <svg
            viewBox="0 0 1000 500"
            className="w-full h-[320px] md:h-[360px] select-none"
            role="img"
            aria-label="OMNI Global Market Intelligence Map"
          >
            {[100, 200, 300, 400].map((y) => (
              <line
                key={`lat-${y}`}
                x1="0"
                y1={y}
                x2="1000"
                y2={y}
                stroke="#1e3a8a"
                strokeOpacity="0.4"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}
            {[200, 400, 600, 800].map((x) => (
              <line
                key={`lon-${x}`}
                x1={x}
                y1="0"
                x2={x}
                y2="500"
                stroke="#1e3a8a"
                strokeOpacity="0.4"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}

            <path
              d="M80 70 L280 65 L310 180 L230 250 L150 220 L95 140 Z"
              fill="#0B1933"
              stroke="#1d4ed8"
              strokeWidth="1.5"
            />
            <path
              d="M250 270 L345 290 L330 440 L275 465 L245 360 Z"
              fill="#0B1933"
              stroke="#1d4ed8"
              strokeWidth="1.5"
            />
            <path
              d="M440 80 L585 75 L595 190 L455 195 Z"
              fill="#0B1933"
              stroke="#1d4ed8"
              strokeWidth="1.5"
            />
            <path
              d="M455 215 L605 215 L625 340 L565 435 L495 360 L450 280 Z"
              fill="#0B1933"
              stroke="#1d4ed8"
              strokeWidth="1.5"
            />
            <path
              d="M600 85 L880 95 L895 295 L685 310 L610 235 Z"
              fill="#0B1933"
              stroke="#1d4ed8"
              strokeWidth="1.5"
            />
            <path
              d="M775 350 L895 350 L885 435 L770 425 Z"
              fill="#0B1933"
              stroke="#1d4ed8"
              strokeWidth="1.5"
            />

            {visibleCountries.map((country) => (
              <line
                key={`arc-${country.id}`}
                x1={575}
                y1={305}
                x2={country.coordinates.x}
                y2={country.coordinates.y}
                stroke="#38bdf8"
                strokeOpacity="0.35"
                strokeWidth="1.2"
              />
            ))}

            {visibleCountries.map((country) => {
              const isSelected = selectedCountry.id === country.id;
              return (
                <g
                  key={country.id}
                  onClick={() => setSelectedCountry(country)}
                  className="cursor-pointer"
                >
                  {isSelected && (
                    <circle
                      cx={country.coordinates.x}
                      cy={country.coordinates.y}
                      r="16"
                      fill="#3b82f6"
                      fillOpacity="0.3"
                    />
                  )}
                  <circle
                    cx={country.coordinates.x}
                    cy={country.coordinates.y}
                    r={isSelected ? '7' : '5.5'}
                    fill={isSelected ? '#38bdf8' : '#2563eb'}
                    stroke="#050C1A"
                    strokeWidth="2"
                  />
                  <text
                    x={country.coordinates.x + 10}
                    y={country.coordinates.y + 4}
                    fill={isSelected ? '#38bdf8' : '#cbd5e1'}
                    fontSize="11"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontWeight={isSelected ? '700' : '500'}
                  >
                    {country.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-blue-100 dark:border-blue-900/50 pb-3">
              <div>
                <div className="text-xs text-slate-500">{selectedCountry.region} · Country Explorer</div>
                <h3 className="text-lg font-display font-bold mt-0.5">{selectedCountry.name}</h3>
              </div>
              <Globe2 className="w-5 h-5 text-blue-500 dark:text-sky-400" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-blue-50/40 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50">
                <div className="text-slate-400">Potential Market</div>
                <div className="text-sm font-bold text-blue-600 dark:text-sky-400 mt-0.5">
                  {selectedCountry.potentialMarket}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-50/40 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50">
                <div className="text-slate-400">Connected Customers</div>
                <div className="text-sm font-bold font-mono tabular-nums mt-0.5">
                  {selectedCountry.customers.toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-50/40 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50">
                <div className="text-slate-400">Connected Revenue</div>
                <div className="text-sm font-bold font-mono tabular-nums mt-0.5">
                  {formatMoney(selectedCountry.revenueUSD, currency)}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-50/40 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50">
                <div className="text-slate-400">Conversion Rate</div>
                <div className="text-sm font-bold font-mono tabular-nums mt-0.5">
                  {selectedCountry.conversionRate}%
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-blue-50 dark:border-blue-900/40">
                <span className="text-slate-500">OMNI Opportunity Rating:</span>
                <span className="font-semibold text-blue-600 dark:text-sky-400">
                  {selectedCountry.omniOpportunity}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-50 dark:border-blue-900/40">
                <span className="text-slate-500">Local Currency:</span>
                <button
                  type="button"
                  onClick={() => onSelectCurrency(selectedCountry.currency)}
                  className="font-mono font-semibold text-blue-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  Switch Display to {selectedCountry.currency} →
                </button>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-50 dark:border-blue-900/40">
                <span className="text-slate-500">Supported Languages:</span>
                <span>{selectedCountry.languages}</span>
              </div>
              <div className="pt-2">
                <strong className="text-slate-700 dark:text-slate-300 block">
                  Market Expansion Intelligence:
                </strong>
                <p className="text-slate-500 mt-1 leading-relaxed">
                  {selectedCountry.topOpportunityNote}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              onTriggerCommand(
                `Launch localized growth campaign in ${selectedCountry.name} priced in ${selectedCountry.currency}`
              )
            }
            className="mt-5 w-full py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 cursor-pointer"
          >
            Launch {selectedCountry.name} Growth Campaign
          </button>
        </div>
      </div>
    </div>
  );
};
