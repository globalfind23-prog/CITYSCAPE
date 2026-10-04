import React, { useState } from 'react';
import {
  Mic,
  Volume2,
  Play,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  Sparkles,
  PauseCircle,
  Sliders,
} from 'lucide-react';

export interface ExecutionStep {
  stepNumber: number;
  stage: string;
  action: string;
  assignedAgent: string;
  permissionLevel: number;
  requiresApproval: boolean;
  estimatedImpact: string;
  status?: 'pending' | 'approved' | 'executed';
}

export interface ExecutionPlan {
  goalSummary: string;
  executiveAnalysis: string;
  coordinatingAgents: string[];
  steps: ExecutionStep[];
  projectedMetricDelta: string;
  riskAssessment: string;
}

interface OmniCommandCenterProps {
  currentCurrency: string;
  activeAgents: string[];
  autopilotEnabled: boolean;
  onToggleAutopilot: () => void;
  aiCredits: number;
  onDeductCredits: (amount: number) => void;
  onLogAction: (agent: string, action: string, result: string, perm: string) => void;
  accentColor: string;
}

const QUICK_COMMANDS = [
  'Get me 100 new customers this month.',
  'Promote my new skincare product.',
  'Find problems hurting my conversion rate.',
  'Analyze my competitors and prepare a sales strategy.',
  'Create a weekly business report.',
  'Follow up with my qualified leads.',
];

export const OmniCommandCenter: React.FC<OmniCommandCenterProps> = ({
  currentCurrency,
  activeAgents,
  autopilotEnabled,
  onToggleAutopilot,
  aiCredits,
  onDeductCredits,
  onLogAction,
}) => {
  const [commandInput, setCommandInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [plan, setPlan] = useState<ExecutionPlan | null>({
    goalSummary: 'Acquire 100 new paying customers within 30 days while lowering CAC by 14%.',
    executiveAnalysis:
      'OMNI Executive analyzed your store funnel and CRM pipeline. Converting the 127 inactive past buyers and fixing the 23% mobile checkout drop-off represents the fastest path to 100 net-new orders.',
    coordinatingAgents: ['OMNI CEO', 'Marketing Agent', 'Ecommerce Agent', 'Sales Agent', 'Data Analyst Agent'],
    steps: [
      {
        stepNumber: 1,
        stage: 'Understand',
        action: 'Segment top 250 high-LTV customer profiles and audit mobile checkout friction points.',
        assignedAgent: 'Data Analyst Agent',
        permissionLevel: 1,
        requiresApproval: false,
        estimatedImpact: 'Identifies $18,400 immediate pipeline',
        status: 'executed',
      },
      {
        stepNumber: 2,
        stage: 'Plan',
        action: 'Generate high-converting landing page copy, 3-part email sequence, and social ad variations.',
        assignedAgent: 'Marketing Agent',
        permissionLevel: 2,
        requiresApproval: false,
        estimatedImpact: '+2.4% landing page conversion rate',
        status: 'executed',
      },
      {
        stepNumber: 3,
        stage: 'Approval',
        action: 'Launch $600 targeted retargeting & lookalike campaign + 15% mobile express checkout offer.',
        assignedAgent: 'Ecommerce Agent',
        permissionLevel: 4,
        requiresApproval: true,
        estimatedImpact: '+64 projected new customer orders',
        status: 'pending',
      },
      {
        stepNumber: 4,
        stage: 'Execute',
        action: 'Trigger automated CRM outreach to 42 Warm & Hot B2B prospects with personalized demos.',
        assignedAgent: 'Sales Agent',
        permissionLevel: 3,
        requiresApproval: false,
        estimatedImpact: '+38 projected B2B/bulk customer conversions',
        status: 'pending',
      },
    ],
    projectedMetricDelta: '+102 New Customers & +$14,800 Net Revenue in 30 Days',
    riskAssessment: 'Level-4 Safeguard active: Ad spend reallocation above $500 requires explicit human approval.',
  });
  const [autopilotBudget, setAutopilotBudget] = useState(500);
  const [autopilotMaxPerm, setAutopilotMaxPerm] = useState(3);
  const [showAutopilotConfig, setShowAutopilotConfig] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRunCommand = async (customCmd?: string) => {
    const targetCmd = (customCmd ?? commandInput).trim();
    if (!targetCmd) return;
    setIsGenerating(true);
    setErrorMsg(null);
    onDeductCredits(25);

    try {
      const response = await fetch('/api/omni/execute-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command: targetCmd,
          currentCurrency,
          activeAgents,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to build OMNI execution plan');
      }
      const hydratedSteps = (data.steps || []).map((s: ExecutionStep) => ({
        ...s,
        status: s.permissionLevel <= 2 ? 'executed' : 'pending',
      }));
      setPlan({ ...data, steps: hydratedSteps });
      onLogAction(
        'OMNI CEO',
        `Constructed execution plan for: "${targetCmd}"`,
        data.projectedMetricDelta || 'Plan ready for execution',
        'Level 1 (Analyze)'
      );
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to reach OMNI AI Executive.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVoiceCommand = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      const sample = 'OMNI, summarize my business today and prepare tomorrow’s marketing campaign.';
      setCommandInput(sample);
      handleRunCommand(sample);
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setCommandInput(transcript);
      setIsListening(false);
      handleRunCommand(transcript);
    };
    recognition.onerror = () => {
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.start();
  };

  const handleSpeakSummary = async () => {
    if (!plan || isSpeaking) return;
    setIsSpeaking(true);
    onDeductCredits(10);
    const speechText = `OMNI Executive Briefing. Goal: ${plan.goalSummary}. ${plan.executiveAnalysis} Projected outcome: ${plan.projectedMetricDelta}.`;

    try {
      const res = await fetch('/api/omni/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: speechText }),
      });
      const data = await res.json();
      if (data.audioWavBase64) {
        const audio = new Audio(`data:audio/wav;base64,${data.audioWavBase64}`);
        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => setIsSpeaking(false);
        await audio.play();
        return;
      }
    } catch {
      // Fallback to browser synthesis if network fails
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(false);
    }
  };

  const handleApproveStep = (stepNumber: number) => {
    if (!plan) return;
    const updated = plan.steps.map((s) =>
      s.stepNumber === stepNumber ? { ...s, status: 'executed' as const, requiresApproval: false } : s
    );
    const target = plan.steps.find((s) => s.stepNumber === stepNumber);
    setPlan({ ...plan, steps: updated });
    if (target) {
      onLogAction(
        target.assignedAgent,
        target.action,
        target.estimatedImpact,
        `Level ${target.permissionLevel} (Human Approved)`
      );
    }
  };

  const handleExecuteAllApproved = () => {
    if (!plan) return;
    const updated = plan.steps.map((s) => ({ ...s, status: 'executed' as const }));
    setPlan({ ...plan, steps: updated });
    onLogAction(
      'OMNI Executive',
      `Executed all ${plan.steps.length} workflow stages for "${plan.goalSummary}"`,
      plan.projectedMetricDelta,
      'Level 4 (Human Approved)'
    );
  };

  return (
    <section className="border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-5 md:p-6 bg-white/95 dark:bg-[#0B1528]/95 transition-colors">
      {/* Top Row: Universal Command Header + Autopilot Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-blue-100 dark:border-blue-900/50">
        <div>
          <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-sky-400">
            <span>OMNI Executive Intelligence Layer</span>
            <span aria-hidden="true">·</span>
            <span>Goal → Understand → Plan → Approve → Execute → Measure → Optimize</span>
          </div>
          <h2 className="text-xl md:text-2xl font-display font-bold tracking-tight mt-1 text-balance">
            What do you want OMNI to accomplish?
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleAutopilot}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              autopilotEnabled
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {autopilotEnabled ? <Play className="w-3.5 h-3.5" /> : <PauseCircle className="w-3.5 h-3.5" />}
            <span>Autopilot Mode: {autopilotEnabled ? 'Active' : 'Paused'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAutopilotConfig(!showAutopilotConfig)}
            className="px-3 py-2 rounded-lg text-xs font-medium border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-500" />
            <span>Governance Limits</span>
          </button>

          <div className="text-xs font-mono tabular-nums text-blue-600 dark:text-sky-400 pl-1">
            AI Credits: {aiCredits.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Optional Autopilot Governance Drawer */}
      {showAutopilotConfig && (
        <div className="my-4 p-4 rounded-lg bg-blue-50/50 dark:bg-[#070E1C] border border-blue-200 dark:border-blue-900/60 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Daily Autonomous Budget Cap (USD)
            </label>
            <input
              type="number"
              value={autopilotBudget}
              onChange={(e) => setAutopilotBudget(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded border border-blue-300 dark:border-blue-800 bg-white dark:bg-slate-900 font-mono tabular-nums"
            />
            <p className="text-slate-500 mt-1">Actions exceeding cap pause automatically for approval.</p>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Max Autonomous Permission Level
            </label>
            <select
              value={autopilotMaxPerm}
              onChange={(e) => setAutopilotMaxPerm(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded border border-blue-300 dark:border-blue-800 bg-white dark:bg-slate-900"
            >
              <option value={1}>Level 1 — Analyze Only</option>
              <option value={2}>Level 2 — Draft Content & Plans</option>
              <option value={3}>Level 3 — Execute Low-Risk Approved Workflows</option>
              <option value={4}>Level 4 — Require Human Approval for Spend/Contracts</option>
            </select>
          </div>
          <div>
            <span className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Continuous Autopilot Directives
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Monitoring store conversion, following up with qualified CRM leads, and generating every Monday 08:00 Executive Report.
            </p>
          </div>
        </div>
      )}

      {/* Command Input Bar */}
      <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRunCommand()}
            placeholder='Tell OMNI your goal — e.g., "Get me 100 new customers this month" or "Analyze my competitors"'
            className="w-full pl-4 pr-12 py-3.5 rounded-lg border border-blue-200 dark:border-blue-800/80 bg-blue-50/30 dark:bg-[#060C18] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            type="button"
            onClick={handleVoiceCommand}
            title="Speak command to Voice OMNI"
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-md transition-colors cursor-pointer ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse'
                : 'text-blue-500 hover:text-blue-700 dark:hover:text-sky-300 hover:bg-blue-100/60 dark:hover:bg-blue-900/40'
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => handleRunCommand()}
          disabled={isGenerating}
          className="px-5 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isGenerating ? 'OMNI Orchestrating...' : 'Build & Execute Plan'}</span>
        </button>

        <button
          type="button"
          onClick={handleSpeakSummary}
          disabled={!plan || isSpeaking}
          title="Voice OMNI Audio Briefing"
          className="px-4 py-3.5 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-xs font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
        >
          <Volume2 className="w-4 h-4 text-blue-500 dark:text-sky-400" />
          <span>{isSpeaking ? 'Speaking...' : 'Voice Briefing'}</span>
        </button>
      </div>

      {/* Quick Command Prompts */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 shrink-0">Try command:</span>
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => {
              setCommandInput(cmd);
              handleRunCommand(cmd);
            }}
            className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/60 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            “{cmd}”
          </button>
        ))}
      </div>

      {errorMsg && (
        <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs">
          {errorMsg}
        </div>
      )}

      {/* Active Execution Plan Output */}
      {plan && (
        <div className="mt-5 pt-5 border-t border-blue-100 dark:border-blue-900/50">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-sky-400 font-medium">
                <span>Active Executive Plan</span>
                <span aria-hidden="true">·</span>
                <span>Projected Outcome: {plan.projectedMetricDelta}</span>
              </div>
              <h3 className="text-base font-semibold mt-0.5">{plan.goalSummary}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-4xl leading-relaxed">
                {plan.executiveAnalysis}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleExecuteAllApproved}
                className="px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approve & Execute All Stages</span>
              </button>
            </div>
          </div>

          {/* Agent Collaboration Chain */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">Agent Coordination Chain:</span>
            {plan.coordinatingAgents.map((ag, idx) => (
              <React.Fragment key={ag + idx}>
                <span className="text-slate-800 dark:text-slate-200 font-medium">{ag}</span>
                {idx < plan.coordinatingAgents.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-blue-500 dark:text-sky-400 inline" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Execution Steps Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-blue-100 dark:border-blue-900/50 text-slate-500 dark:text-slate-400">
                  <th className="py-2 pr-3 font-medium">Stage</th>
                  <th className="py-2 px-3 font-medium">Execution Task</th>
                  <th className="py-2 px-3 font-medium">Assigned AI Agent</th>
                  <th className="py-2 px-3 font-medium">Governance</th>
                  <th className="py-2 px-3 font-medium">Projected Impact</th>
                  <th className="py-2 pl-3 text-right font-medium">Status / Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100/60 dark:divide-blue-900/40">
                {plan.steps.map((step) => (
                  <tr key={step.stepNumber} className="hover:bg-blue-50/50 dark:hover:bg-blue-950/30">
                    <td className="py-2.5 pr-3 font-mono tabular-nums font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      0{step.stepNumber}. {step.stage}
                    </td>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200 max-w-md">
                      {step.action}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {step.assignedAgent}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      Level {step.permissionLevel}
                    </td>
                    <td className="py-2.5 px-3 font-mono tabular-nums text-blue-600 dark:text-sky-400 whitespace-nowrap">
                      {step.estimatedImpact}
                    </td>
                    <td className="py-2.5 pl-3 text-right whitespace-nowrap">
                      {step.status === 'executed' ? (
                        <span className="inline-flex items-center gap-1 text-blue-600 dark:text-sky-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Executed
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApproveStep(step.stepNumber)}
                          className="px-2.5 py-1 rounded bg-blue-500/15 text-blue-700 dark:text-sky-300 hover:bg-blue-500/25 font-medium transition-colors cursor-pointer"
                        >
                          {step.requiresApproval ? 'Approve (Lvl 4)' : 'Run Step'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{plan.riskAssessment}</span>
            </div>
            <button
              type="button"
              onClick={() => handleRunCommand(plan.goalSummary)}
              className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-sky-400 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Recalculate Plan
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
