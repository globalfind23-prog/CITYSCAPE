import React, { useState } from 'react';
import {
  AutomationWorkflow,
  AutomationLogItem,
  CRMContact,
  CurrencyCode,
  formatMoney,
} from '../data/omniData';
import {
  Sparkles,
  Play,
  Code2,
  CheckCircle2,
  ArrowDown,
  Search,
  Send,
  Globe,
  FileCode,
} from 'lucide-react';

interface AutomationViewProps {
  workflows: AutomationWorkflow[];
  logs: AutomationLogItem[];
  onAddWorkflow: (wf: AutomationWorkflow) => void;
  onToggleWorkflow: (id: string) => void;
  onLogAction: (agent: string, action: string, result: string, perm: string) => void;
}

export const AutomationView: React.FC<AutomationViewProps> = ({
  workflows,
  logs,
  onAddWorkflow,
  onToggleWorkflow,
  onLogAction,
}) => {
  const [nlPrompt, setNlPrompt] = useState(
    'When someone fills my form, add them to my CRM, send a welcome email, notify my sales team and follow up after three days.'
  );
  const [isBuilding, setIsBuilding] = useState(false);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(workflows[0]?.id || 'wf-1');
  const [showPythonCode, setShowPythonCode] = useState(false);

  const activeWorkflow = workflows.find((w) => w.id === selectedWorkflowId) || workflows[0];

  const handleGenerateWorkflow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlPrompt.trim()) return;
    setIsBuilding(true);

    try {
      const res = await fetch('/api/omni/generate-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: nlPrompt }),
      });
      const data = await res.json();
      if (data.workflowName && Array.isArray(data.nodes)) {
        const newWf: AutomationWorkflow = {
          id: `wf-${Date.now()}`,
          name: data.workflowName,
          description: data.description || nlPrompt,
          active: true,
          safetyMode: (data.safetyMode as any) || 'Approval Required',
          runsCount: 1,
          conversionLift: '+21.0% projected efficiency',
          pythonCode:
            data.pythonCode ||
            `from omni_os import OmniClient\nomni = OmniClient()\n# Generated for: ${data.workflowName}`,
          nodes: data.nodes,
        };
        onAddWorkflow(newWf);
        setSelectedWorkflowId(newWf.id);
        onLogAction(
          'Operations Agent',
          `Generated visual workflow: "${newWf.name}"`,
          `${newWf.nodes.length} nodes deployed`,
          `Level 3 (${newWf.safetyMode})`
        );
      }
    } catch {
      // Fallback deterministic creation if offline
    } finally {
      setIsBuilding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-200 dark:border-blue-900/60 pb-4">
        <div>
          <h2 className="text-xl font-display font-bold">
            OMNI Visual Automation Builder & Natural-Language Workflow Engine
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Trigger → Conditions → AI → Action → Result. Build without code or inspect the underlying Python SDK script.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowPythonCode(!showPythonCode)}
          className="px-3.5 py-2 rounded-lg border border-blue-200 dark:border-blue-800 text-xs font-semibold flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-950/60 cursor-pointer self-start"
        >
          <Code2 className="w-4 h-4 text-blue-500 dark:text-sky-400" />
          <span>{showPythonCode ? 'Hide Python SDK Code' : 'View Python Automation Script'}</span>
        </button>
      </div>

      <form
        onSubmit={handleGenerateWorkflow}
        className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] space-y-3"
      >
        <div className="text-xs font-semibold text-blue-600 dark:text-sky-400">
          AI Natural-Language Workflow Generator
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={nlPrompt}
            onChange={(e) => setNlPrompt(e.target.value)}
            placeholder="Describe any business automation in plain language..."
            className="flex-1 px-4 py-3 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-[#070E1C] text-xs"
          />
          <button
            type="submit"
            disabled={isBuilding}
            className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isBuilding ? 'Generating Flow...' : 'Generate Visual Workflow'}</span>
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-500">Active & Saved Workflows</h3>
          {workflows.map((wf) => (
            <div
              key={wf.id}
              onClick={() => setSelectedWorkflowId(wf.id)}
              className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                wf.id === activeWorkflow?.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-blue-200/80 dark:border-blue-900/60 bg-white dark:bg-[#0B1528]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-semibold">{wf.name}</h4>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWorkflow(wf.id);
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                    wf.active
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {wf.active ? 'Running' : 'Paused'}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">{wf.description}</p>
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Safety: {wf.safetyMode}</span>
                <span className="text-blue-600 dark:text-sky-400">{wf.conversionLift}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528]">
          {activeWorkflow && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-blue-100 dark:border-blue-900/50">
                <div>
                  <div className="text-xs text-slate-500">
                    Safety Mode: <strong>{activeWorkflow.safetyMode}</strong> ·{' '}
                    <span className="font-mono">{activeWorkflow.runsCount.toLocaleString()} executions</span>
                  </div>
                  <h3 className="text-base font-bold mt-0.5">{activeWorkflow.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onLogAction(
                      'Operations Agent',
                      `Manually triggered workflow "${activeWorkflow.name}"`,
                      activeWorkflow.conversionLift,
                      `Level 3 (${activeWorkflow.safetyMode})`
                    )
                  }
                  className="px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 flex items-center gap-1.5 whitespace-nowrap cursor-pointer self-start"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Test Run Workflow Now</span>
                </button>
              </div>

              {showPythonCode ? (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-mono">omni_automation_pipeline.py (Python SDK)</span>
                    <span>Synced with Visual Node Graph</span>
                  </div>
                  <pre className="p-4 rounded-lg bg-[#050B16] text-sky-400 font-mono text-xs overflow-x-auto leading-relaxed">
                    {activeWorkflow.pythonCode}
                  </pre>
                </div>
              ) : (
                <div className="mt-5 space-y-2">
                  {activeWorkflow.nodes.map((node, index) => (
                    <React.Fragment key={node.id}>
                      <div className="p-4 rounded-lg border border-blue-100 dark:border-blue-900/50 bg-blue-50/40 dark:bg-[#070E1C] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="px-2.5 py-1 rounded bg-blue-600 text-white font-mono text-xs font-bold shrink-0">
                            {node.type}
                          </span>
                          <div>
                            <div className="text-sm font-semibold">{node.title}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{node.detail}</div>
                          </div>
                        </div>
                        <div className="text-right text-xs shrink-0">
                          <div className="font-medium text-slate-700 dark:text-slate-300">{node.agent}</div>
                          <div className="font-mono text-[11px] text-blue-600 dark:text-sky-400">
                            {node.permission}
                          </div>
                        </div>
                      </div>
                      {index < activeWorkflow.nodes.length - 1 && (
                        <div className="flex justify-center py-0.5">
                          <ArrowDown className="w-4 h-4 text-blue-400" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528]">
        <h3 className="text-sm font-semibold mb-3">OMNI Automation Execution & Governance Audit Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-blue-100 dark:border-blue-900/50 text-slate-500">
                <th className="py-2 pr-3 font-medium">Time</th>
                <th className="py-2 px-3 font-medium">AI Agent</th>
                <th className="py-2 px-3 font-medium">Automated Action</th>
                <th className="py-2 px-3 font-medium">Data Used</th>
                <th className="py-2 px-3 font-medium">Permission Level</th>
                <th className="py-2 px-3 font-medium">Approval</th>
                <th className="py-2 pl-3 text-right font-medium">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50 dark:divide-blue-900/40">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="py-2.5 pr-3 font-mono whitespace-nowrap text-slate-500">{log.time}</td>
                  <td className="py-2.5 px-3 font-semibold whitespace-nowrap">{log.agent}</td>
                  <td className="py-2.5 px-3">{log.action}</td>
                  <td className="py-2.5 px-3 text-slate-500">{log.dataUsed}</td>
                  <td className="py-2.5 px-3 font-mono whitespace-nowrap">{log.permissionLevel}</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">{log.userApproval}</td>
                  <td className="py-2.5 pl-3 text-right font-mono tabular-nums text-blue-600 dark:text-sky-400 whitespace-nowrap">
                    {log.result}
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

interface CRMViewProps {
  contacts: CRMContact[];
  currency: CurrencyCode;
  subTab?: 'crm' | 'sales' | 'customers';
  onAddContact: (c: CRMContact) => void;
  onLogAction: (agent: string, action: string, result: string, perm: string) => void;
}

export const CRMView: React.FC<CRMViewProps> = ({
  contacts,
  currency,
  onAddContact,
  onLogAction,
}) => {
  const [tempFilter, setTempFilter] = useState<'All' | 'Hot' | 'Warm' | 'Cold'>('All');
  const [icpQuery, setIcpQuery] = useState(
    'Find software companies with 10–100 employees that may need cybersecurity services.'
  );
  const [prospectResults, setProspectResults] = useState<CRMContact[]>([]);
  const [followedUpIds, setFollowedUpIds] = useState<string[]>([]);

  const filteredContacts =
    tempFilter === 'All' ? contacts : contacts.filter((c) => c.temperature === tempFilter);

  const handleRunLeadFinder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedProspects: CRMContact[] = [
      {
        id: `lf-${Date.now()}-1`,
        name: 'Liam O’Connor',
        email: 'liam@cloudshield-sec.io',
        company: 'CloudShield DevOps (64 Employees)',
        country: 'Ireland',
        dealValueUSD: 16500,
        stage: 'Prospect',
        temperature: 'Hot',
        score: 88,
        aiReason: `Matches ICP "${icpQuery.slice(0, 45)}..." — Hiring SOC2 Compliance Engineer & expanding cloud infra.`,
        lastActivity: 'Just discovered',
        nextAction: 'Add to CRM & send GDPR-compliant intro',
      },
      {
        id: `lf-${Date.now()}-2`,
        name: 'Nadia Al-Mansoor',
        email: 'nadia@finledger-gulf.ae',
        company: 'FinLedger SaaS (48 Employees)',
        country: 'United Arab Emirates',
        dealValueUSD: 21000,
        stage: 'Prospect',
        temperature: 'Warm',
        score: 82,
        aiReason: 'Recently migrated to multi-cloud Kubernetes; matches cybersecurity advisory profile.',
        lastActivity: 'Just discovered',
        nextAction: 'Add to CRM & send security checklist',
      },
    ];
    setProspectResults(generatedProspects);
    onLogAction(
      'Research Agent',
      `Executed privacy-compliant Lead Finder for: "${icpQuery}"`,
      '2 high-fit B2B accounts identified',
      'Level 1 (Analyze)'
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-200 dark:border-blue-900/60 pb-4">
        <div>
          <h2 className="text-xl font-display font-bold">
            OMNI CRM, Sales Pipeline & AI Lead Scoring
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            AI automatically scores every contact as Hot, Warm, or Cold and explains the behavioral reason.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-blue-50 dark:bg-[#0B1528] border border-blue-200/60 dark:border-blue-900/50 rounded-lg">
          {(['All', 'Hot', 'Warm', 'Cold'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTempFilter(t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                tempFilter === t
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {t} Leads
            </button>
          ))}
        </div>
      </div>

      <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 dark:text-sky-400">
            OMNI Lead Finder · Ideal Customer Profile (ICP) Prospector
          </span>
          <span className="text-[11px] text-slate-400">
            Compliant with GDPR, CAN-SPAM & Regional Data Protection Laws
          </span>
        </div>
        <form onSubmit={handleRunLeadFinder} className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={icpQuery}
            onChange={(e) => setIcpQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-transparent text-xs"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Find Qualified Prospects</span>
          </button>
        </form>

        {prospectResults.length > 0 && (
          <div className="mt-4 pt-3 border-t border-blue-100 dark:border-blue-900/50 grid grid-cols-1 md:grid-cols-2 gap-3">
            {prospectResults.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-lg border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-[#070E1C] flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-semibold">
                    {p.company} · {p.name} ({p.country})
                  </div>
                  <p className="text-slate-500 mt-1">{p.aiReason}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onAddContact(p);
                    setProspectResults((prev) => prev.filter((item) => item.id !== p.id));
                  }}
                  className="px-3 py-1.5 rounded bg-blue-600 text-white font-semibold whitespace-nowrap cursor-pointer"
                >
                  + Import to CRM
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-blue-100 dark:border-blue-900/50 text-slate-500">
              <th className="py-2.5 pr-3 font-medium">Contact & Company</th>
              <th className="py-2.5 px-3 font-medium">Stage</th>
              <th className="py-2.5 px-3 font-medium">AI Lead Score & Temperature</th>
              <th className="py-2.5 px-3 font-medium">Why AI Scored This Lead</th>
              <th className="py-2.5 px-3 font-medium text-right">Deal Value</th>
              <th className="py-2.5 pl-3 font-medium text-right">Next AI Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50 dark:divide-blue-900/40">
            {filteredContacts.map((contact) => {
              const isSent = followedUpIds.includes(contact.id);
              return (
                <tr key={contact.id} className="hover:bg-blue-50/40 dark:hover:bg-blue-950/30">
                  <td className="py-3 pr-3">
                    <div className="font-semibold text-slate-900 dark:text-white">{contact.name}</div>
                    <div className="text-slate-500">
                      {contact.company} · {contact.country}
                    </div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap font-medium">{contact.stage}</td>
                  <td className="py-3 px-3 whitespace-nowrap font-mono tabular-nums">
                    <span
                      className={`font-bold ${
                        contact.temperature === 'Hot'
                          ? 'text-blue-600 dark:text-sky-400'
                          : contact.temperature === 'Warm'
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-slate-500'
                      }`}
                    >
                      {contact.temperature} Lead · {contact.score}/100
                    </span>
                  </td>
                  <td className="py-3 px-3 max-w-md text-slate-600 dark:text-slate-300">
                    {contact.aiReason}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold whitespace-nowrap">
                    {formatMoney(contact.dealValueUSD, currency)}
                  </td>
                  <td className="py-3 pl-3 text-right whitespace-nowrap">
                    {isSent ? (
                      <span className="inline-flex items-center gap-1 text-blue-600 dark:text-sky-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Follow-Up Dispatched
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setFollowedUpIds((prev) => [...prev, contact.id]);
                          onLogAction(
                            'Sales Agent',
                            `Executed follow-up with ${contact.name} (${contact.company})`,
                            contact.nextAction,
                            'Level 3 (Auto Low-Risk)'
                          );
                        }}
                        className="px-3 py-1.5 rounded bg-blue-600 text-white font-semibold hover:bg-blue-500 inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        <span>Execute Follow-Up</span>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface MarketingViewProps {
  currency: CurrencyCode;
  onLogAction: (agent: string, action: string, result: string, perm: string) => void;
}

export const MarketingView: React.FC<MarketingViewProps> = ({ currency, onLogAction }) => {
  const [activeSubTab, setActiveSubTab] = useState<'campaign' | 'landing' | 'ecommerce'>('campaign');
  const [prompt, setPrompt] = useState('Promote my new botanical vitamin C skincare serum.');
  const [brandVoice, setBrandVoice] = useState('Clean, clinical luxury, trustworthy, high-converting');
  const [isGenerating, setIsGenerating] = useState(false);
  const [approvedPublished, setApprovedPublished] = useState(false);
  const [showRawHtml, setShowRawHtml] = useState(false);

  const [campaignData, setCampaignData] = useState({
    campaignTitle: 'Cobalt Botanical Vitamin C Serum Launch',
    audienceSegment: 'Skincare enthusiasts aged 24–48 seeking clean clinical brightening formulas',
    coreOffer: '20% Launch Bundle + Free Express Shipping on orders over $65',
    headline: 'Clinical Radiance in 14 Days — Protected in UV-Filtering Cobalt Glass.',
    adCopy:
      'Tired of oxidized serums that irritate sensitive skin? Experience 94% brighter skin tone in two weeks with our dermatologist-validated botanical formula.',
    emailSubject: 'Your skin’s 14-day radiance reset starts today (Launch Invitation)',
    emailBody:
      'Hi {{first_name}}, we spent 18 months formulating a stable, bio-available Vitamin C serum housed in cobalt blue glass that absorbs in 4 seconds. Claim your 20% founder launch privileges today.',
    landingPageCta: 'Claim 20% Launch Offer →',
    expectedRoi: '4.8x Projected ROAS · Est. +140 New Customers',
    htmlExport: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Cobalt Botanical Vitamin C Serum</title>
</head>
<body style="font-family: sans-serif; max-width: 960px; margin: 0 auto; padding: 48px 24px; color: #0f172a;">
  <header style="border-bottom: 1px solid #bfdbfe; padding-bottom: 24px;">
    <p style="font-size: 12px; color: #2563eb; font-weight: 600;">DERMATOLOGIST VALIDATED · COBALT CLINICAL SKINCARE</p>
    <h1 style="font-size: 36px; line-height: 1.2; margin: 12px 0;">Clinical Radiance in 14 Days — Cold-Pressed Vitamin C.</h1>
    <p style="font-size: 16px; color: #475569;">20% Launch Bundle + Free Express Shipping on orders over $65.</p>
    <a href="#order" style="display:inline-block; margin-top: 16px; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Claim 20% Launch Offer</a>
  </header>
</body>
</html>`,
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setApprovedPublished(false);

    try {
      const res = await fetch('/api/omni/generate-marketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, mode: activeSubTab, brandVoice }),
      });
      const data = await res.json();
      if (data.campaignTitle) {
        setCampaignData(data);
        onLogAction(
          'Marketing Agent',
          `Generated full campaign & HTML5 landing page for: "${prompt}"`,
          data.expectedRoi,
          'Level 2 (Draft)'
        );
      }
    } catch {
      // Retain existing campaign preview
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-200 dark:border-blue-900/60 pb-4">
        <div>
          <h2 className="text-xl font-display font-bold">
            OMNI Marketing Center, Content Studio & Ecommerce Command
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Generate multi-channel campaigns, reusable brand voice copy, visual HTML5 landing pages, and ecommerce cart recovery.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-blue-50 dark:bg-[#0B1528] border border-blue-200/60 dark:border-blue-900/50 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveSubTab('campaign')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
              activeSubTab === 'campaign'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            AI Campaign & Content Studio
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('landing')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
              activeSubTab === 'landing'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Website & HTML5 Landing Builder
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('ecommerce')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
              activeSubTab === 'ecommerce'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Ecommerce Command Center
          </button>
        </div>
      </div>

      <form
        onSubmit={handleGenerate}
        className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
      >
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Product, Offer, or Landing Page Objective
          </label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-transparent text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Reusable Brand Voice Memory
          </label>
          <input
            type="text"
            value={brandVoice}
            onChange={(e) => setBrandVoice(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-transparent text-xs"
          />
        </div>
        <button
          type="submit"
          disabled={isGenerating}
          className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isGenerating ? 'OMNI Creating Assets...' : 'Generate Campaign & Landing Page'}</span>
        </button>
      </form>

      {activeSubTab === 'campaign' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] space-y-4 text-xs">
            <div className="rounded-lg overflow-hidden h-44 bg-[#060E20] relative">
              <img
                src="/src/assets/images/omni_blue_marketing_studio_1791084522718.jpg"
                alt="Cobalt Blue Product Campaign Showcase"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between border-b border-blue-100 dark:border-blue-900/50 pb-3">
              <div>
                <span className="text-blue-600 dark:text-sky-400 font-semibold">
                  Campaign Strategy & Audience
                </span>
                <h3 className="text-base font-bold mt-0.5">{campaignData.campaignTitle}</h3>
              </div>
              <span className="font-mono text-blue-600 dark:text-sky-400">
                {campaignData.expectedRoi}
              </span>
            </div>
            <div>
              <strong className="text-slate-500 block">Target Audience:</strong>
              <p className="mt-0.5 text-slate-800 dark:text-slate-200">{campaignData.audienceSegment}</p>
            </div>
            <div>
              <strong className="text-slate-500 block">Core Promotional Offer:</strong>
              <p className="mt-0.5 text-slate-800 dark:text-slate-200">{campaignData.coreOffer}</p>
            </div>
            <div>
              <strong className="text-slate-500 block">Primary Ad Copy (Social & Search):</strong>
              <p className="mt-1 p-3 rounded-lg bg-blue-50/40 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50 leading-relaxed">
                {campaignData.adCopy}
              </p>
            </div>
          </div>

          <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528] flex flex-col justify-between text-xs">
            <div className="space-y-4">
              <div className="border-b border-blue-100 dark:border-blue-900/50 pb-3">
                <span className="text-blue-600 dark:text-sky-400 font-semibold">
                  Automated Email Sequence & Approval Gate
                </span>
                <h3 className="text-base font-bold mt-0.5">Subject: {campaignData.emailSubject}</h3>
              </div>
              <p className="p-3.5 rounded-lg bg-blue-50/40 dark:bg-[#070E1C] border border-blue-100 dark:border-blue-900/50 leading-relaxed whitespace-pre-line">
                {campaignData.emailBody}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
              <span className="text-slate-500">Level-4 Human Review Required Before Publishing</span>
              {approvedPublished ? (
                <span className="inline-flex items-center gap-1.5 text-blue-600 dark:text-sky-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Approved & Scheduled Across Channels
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setApprovedPublished(true);
                    onLogAction(
                      'Marketing Agent',
                      `Approved and published "${campaignData.campaignTitle}"`,
                      campaignData.expectedRoi,
                      'Level 4 (Human Approved)'
                    );
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 cursor-pointer"
                >
                  Approve & Publish Campaign
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'landing' && (
        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-6 bg-white dark:bg-[#0B1528] space-y-5">
          <div className="flex items-center justify-between border-b border-blue-100 dark:border-blue-900/50 pb-4">
            <div className="flex items-center gap-2 text-xs">
              <Globe className="w-4 h-4 text-blue-500 dark:text-sky-400" />
              <span className="font-mono">https://omni-sites.global/launch-preview</span>
            </div>
            <button
              type="button"
              onClick={() => setShowRawHtml(!showRawHtml)}
              className="px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <FileCode className="w-3.5 h-3.5 text-blue-500 dark:text-sky-400" />
              <span>{showRawHtml ? 'Show Visual Landing Page' : 'Inspect Clean HTML5 Source'}</span>
            </button>
          </div>

          {showRawHtml ? (
            <pre className="p-4 rounded-lg bg-[#050B16] text-sky-400 font-mono text-xs overflow-x-auto leading-relaxed">
              {campaignData.htmlExport}
            </pre>
          ) : (
            <div className="p-6 md:p-10 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-[#070E1C] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-3">
                <div className="text-xs font-semibold text-blue-600 dark:text-sky-400">
                  {campaignData.audienceSegment}
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-balance">
                  {campaignData.headline}
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {campaignData.adCopy}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold"
                  >
                    {campaignData.landingPageCta}
                  </button>
                  <span className="text-xs text-slate-500">{campaignData.coreOffer}</span>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-blue-200 dark:border-blue-900/60 h-60">
                <img
                  src="/src/assets/images/omni_blue_marketing_studio_1791084522718.jpg"
                  alt="Landing page hero product preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'ecommerce' && (
        <div className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 bg-white dark:bg-[#0B1528]">
          <div className="flex items-center justify-between pb-3 border-b border-blue-100 dark:border-blue-900/50">
            <div>
              <h3 className="text-sm font-semibold">
                Connected Store Inventory, Abandoned Carts & SKU Conversion Analysis
              </h3>
              <p className="text-xs text-slate-500">Synchronized with Shopify & Stripe Commerce</p>
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-blue-100 dark:border-blue-900/50 text-slate-500">
                  <th className="py-2 pr-3">Product SKU</th>
                  <th className="py-2 px-3 text-right">Price</th>
                  <th className="py-2 px-3 text-right">Inventory</th>
                  <th className="py-2 px-3 text-right">Conversion Rate</th>
                  <th className="py-2 px-3 text-right">Abandoned Carts</th>
                  <th className="py-2 pl-3 text-right">AI Optimization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50 dark:divide-blue-900/40 font-mono tabular-nums">
                <tr>
                  <td className="py-3 pr-3 font-sans font-semibold">
                    Botanical Vitamin C Serum (30ml)
                  </td>
                  <td className="py-3 px-3 text-right">{formatMoney(68, currency)}</td>
                  <td className="py-3 px-3 text-right text-amber-600">142 units (19 days)</td>
                  <td className="py-3 px-3 text-right text-blue-600 dark:text-sky-400">5.4%</td>
                  <td className="py-3 px-3 text-right">14 carts ({formatMoney(952, currency)})</td>
                  <td className="py-3 pl-3 text-right font-sans">
                    <button
                      type="button"
                      onClick={() =>
                        onLogAction(
                          'Ecommerce Agent',
                          'Triggered 1-click recovery email for 14 Vitamin C Serum carts',
                          '+$410 projected recovery',
                          'Level 3 (Auto Low-Risk)'
                        )
                      }
                      className="text-blue-600 dark:text-sky-400 font-semibold hover:underline cursor-pointer"
                    >
                      Recover 14 Carts →
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-3 font-sans font-semibold">
                    Barrier Repair Peptide Cream (50ml)
                  </td>
                  <td className="py-3 px-3 text-right">{formatMoney(84, currency)}</td>
                  <td className="py-3 px-3 text-right">610 units (Optimal)</td>
                  <td className="py-3 px-3 text-right">4.2%</td>
                  <td className="py-3 px-3 text-right">9 carts ({formatMoney(756, currency)})</td>
                  <td className="py-3 pl-3 text-right font-sans">
                    <button
                      type="button"
                      onClick={() =>
                        onLogAction(
                          'Ecommerce Agent',
                          'Enabled post-purchase cross-sell bundle with Vitamin C Serum',
                          '+18% AOV lift',
                          'Level 3 (Auto Low-Risk)'
                        )
                      }
                      className="text-blue-600 dark:text-sky-400 font-semibold hover:underline cursor-pointer"
                    >
                      Bundle Cross-Sell →
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
