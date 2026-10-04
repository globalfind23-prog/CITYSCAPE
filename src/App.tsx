/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  OmniTheme,
  NavSection,
  CurrencyCode,
  CURRENCIES,
  INITIAL_AGENTS,
  INITIAL_GOALS,
  INITIAL_CRM_CONTACTS,
  INITIAL_WORKFLOWS,
  INITIAL_AUTOMATION_LOGS,
  INITIAL_MARKETPLACE_ITEMS,
  AIAgent,
  BusinessGoal,
  CRMContact,
  AutomationWorkflow,
  AutomationLogItem,
  MarketplaceListing,
} from './data/omniData';
import { OmniLogo } from './components/OmniLogo';
import { OmniCommandCenter } from './components/OmniCommandCenter';
import { HomeView, WorkforceView, GoalsView } from './components/OmniCoreViews';
import { AutomationView, CRMView, MarketingView } from './components/OmniGrowthViews';
import {
  AnalyticsView,
  TranscriptionsView,
  WorldMapView,
} from './components/OmniIntelligenceViews';
import {
  MarketplaceView,
  WalletView,
  BillingView,
  IntegrationsView,
  HelpCentreView,
  SettingsSecurityView,
} from './components/OmniPlatformViews';
import { OmniChatbotAtLarge } from './components/OmniChatbotAtLarge';
import {
  LayoutDashboard,
  Bot,
  Target,
  Workflow,
  Users,
  Megaphone,
  Briefcase,
  UserCheck,
  BarChart3,
  FileAudio,
  Globe2,
  Store,
  Wallet,
  CreditCard,
  Blocks,
  HelpCircle,
  Settings,
  Bell,
  Palette,
  Menu,
  X,
} from 'lucide-react';

export default function App() {
  // UI Theme & Accessibility State (Defaulted to Modern Cobalt/Sapphire Blue)
  const [theme, setTheme] = useState<OmniTheme>('dark');
  const [customAccent, setCustomAccent] = useState<string>('#2563EB');
  const [largeText, setLargeText] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Navigation & Global Currency State
  const [activeNav, setActiveNav] = useState<NavSection>('home');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  // Business OS Stateful Entities
  const [autopilotEnabled, setAutopilotEnabled] = useState(true);
  const [aiCredits, setAiCredits] = useState(8420);
  const [agents, setAgents] = useState<AIAgent[]>(INITIAL_AGENTS);
  const [goals, setGoals] = useState<BusinessGoal[]>(INITIAL_GOALS);
  const [contacts, setContacts] = useState<CRMContact[]>(INITIAL_CRM_CONTACTS);
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>(INITIAL_WORKFLOWS);
  const [logs, setLogs] = useState<AutomationLogItem[]>(INITIAL_AUTOMATION_LOGS);
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceListing[]>(
    INITIAL_MARKETPLACE_ITEMS
  );

  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'Payment Received: +$1,480.00 USD',
      detail: 'Shopify Abandoned Cart Recovery Workflow converted 4 orders.',
      time: '4 mins ago',
    },
    {
      id: 'n2',
      title: 'Hot Enterprise Lead Escalated (Score 94/100)',
      detail: 'Elena Rostova (Vanguard Cloud) requested SOC2 compliance terms.',
      time: '14 mins ago',
    },
    {
      id: 'n3',
      title: 'OMNI Score Increased to 82/100',
      detail: 'Automated CRM follow-up lifted weekly response velocity by 3.2x.',
      time: '1 hour ago',
    },
    {
      id: 'n4',
      title: 'Withdrawal Processed: USh 8,976,000 UGX',
      detail: 'KYC & MFA verified payout settled to designated account.',
      time: 'Yesterday',
    },
  ]);

  const handleLogAction = (
    agent: string,
    action: string,
    result: string,
    permissionLevel: string
  ) => {
    const newLog: AutomationLogItem = {
      id: `log-${Date.now()}`,
      time: 'Just now (UTC)',
      agent,
      action,
      dataUsed: 'OMNI Real-Time Business Memory & Connected OAuth APIs',
      result,
      permissionLevel: permissionLevel as any,
      userApproval: 'Approved by Caleb A.',
    };
    setLogs((prev) => [newLog, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `${agent}: Action Executed`,
        detail: `${action} (${result})`,
        time: 'Just now',
      },
      ...prev,
    ]);
  };

  const handleToggleAgent = (id: string) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const handleChangeAgentPermission = (id: string, level: 1 | 2 | 3 | 4 | 5) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, permissionLevel: level } : a))
    );
  };

  const handleDispatchAgentTask = (agentName: string, task: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.name === agentName
          ? { ...a, active: true, currentTask: task, tasksCompleted: a.tasksCompleted + 1 }
          : a
      )
    );
    handleLogAction(agentName, `Assigned directive: "${task}"`, 'In Progress', 'Level 3 (Auto Low-Risk)');
  };

  const handleUpdateGoalProgress = (id: string, deltaPct: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const increment = Math.round((g.targetValue * deltaPct) / 100);
        return { ...g, currentValue: Math.min(g.targetValue, g.currentValue + increment) };
      })
    );
  };

  // Modern Blue Theme wrapper classes aligned West-to-East (bg-gradient-to-r)
  const isDarkLike = theme === 'dark' || theme === 'midnight' || theme === 'glass' || theme === 'custom';
  const themeWrapperClasses: Record<OmniTheme, string> = {
    light: 'bg-gradient-to-r from-[#EFF6FF] via-[#F5F9FF] to-[#E0F2FE] text-slate-900',
    business: 'bg-gradient-to-r from-[#E8F1FC] via-[#EFF6FF] to-[#DBEAFE] text-slate-900',
    dark: 'dark bg-gradient-to-r from-[#040B1A] via-[#071329] to-[#081A38] text-slate-100',
    midnight: 'dark bg-gradient-to-r from-[#020611] via-[#040D21] to-[#061531] text-slate-100',
    glass: 'dark bg-gradient-to-r from-[#050E24] via-[#091A3A] to-[#0C2552] text-slate-100',
    custom: 'dark bg-gradient-to-r from-[#040917] via-[#071226] to-[#091B38] text-slate-100',
  };

  const navItems: { id: NavSection; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: LayoutDashboard },
    { id: 'workforce', label: 'AI Workforce', icon: Bot },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'automation', label: 'Automation', icon: Workflow },
    { id: 'crm', label: 'CRM', icon: Users },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'sales', label: 'Sales', icon: Briefcase },
    { id: 'customers', label: 'Customers', icon: UserCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'transcriptions', label: 'Transcriptions', icon: FileAudio },
    { id: 'worldmap', label: 'World Map', icon: Globe2 },
    { id: 'marketplace', label: 'Marketplace', icon: Store },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: Blocks },
    { id: 'help', label: 'Help Centre', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${themeWrapperClasses[theme]} ${
        largeText ? 'text-[17px]' : 'text-sm'
      }`}
    >
      {/* STRICT 3-ZONE TOP BAR CONTRACT (Aligned West-to-East) */}
      <header className="sticky top-0 z-40 h-16 px-4 md:px-6 border-b border-blue-200/80 dark:border-blue-900/60 bg-gradient-to-r from-white/95 via-blue-50/90 to-sky-50/95 dark:from-[#040B1A]/95 dark:via-[#07142B]/95 dark:to-[#0A1D3B]/95 backdrop-blur-md flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/60 cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setActiveNav('home');
            }}
            className="text-xl font-display font-extrabold tracking-tight text-blue-950 dark:text-white whitespace-nowrap"
          >
            OMNI
          </a>
        </div>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300">
          {[
            { id: 'home', label: 'Overview' },
            { id: 'workforce', label: 'Workforce' },
            { id: 'automation', label: 'Automation' },
            { id: 'worldmap', label: 'World Map' },
            { id: 'marketplace', label: 'Marketplace' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveNav(item.id as NavSection)}
              className={`hover:text-blue-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap cursor-pointer py-1 ${
                activeNav === item.id
                  ? 'text-blue-600 dark:text-sky-400 underline underline-offset-8 decoration-2'
                  : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 2 Primary Actions (Theme/Currency Selector + Notifications) */}
        <div className="flex items-center gap-2.5">
          <select
            aria-label="Select preferred display currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="px-2.5 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-transparent text-xs font-mono font-semibold cursor-pointer"
          >
            {Object.keys(CURRENCIES).map((c) => (
              <option key={c} value={c} className="bg-white dark:bg-[#0B1528]">
                {c}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => {
              setShowThemePicker(!showThemePicker);
              setShowNotifications(false);
            }}
            className="px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-xs font-medium flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5 text-blue-500 dark:text-sky-400" />
            <span className="capitalize hidden sm:inline">{theme}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowThemePicker(false);
            }}
            className="p-2 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-blue-500 dark:text-sky-400" />
            <span className="sr-only">{notifications.length} notifications</span>
          </button>
        </div>
      </header>

      {/* Theme & Accessibility Popover */}
      {showThemePicker && (
        <div className="fixed right-4 top-18 z-50 w-80 p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-[#0B1528] shadow-xl space-y-3 text-xs">
          <div className="flex items-center justify-between font-bold">
            <span>Modern Blue Theme & Brand Identity</span>
            <button
              type="button"
              onClick={() => setShowThemePicker(false)}
              className="text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {(['light', 'dark', 'midnight', 'glass', 'business', 'custom'] as OmniTheme[]).map(
              (t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className={`px-2.5 py-2 rounded-lg border capitalize font-medium cursor-pointer ${
                    theme === t
                      ? 'border-blue-500 bg-blue-500/15 text-blue-600 dark:text-sky-400'
                      : 'border-blue-100 dark:border-blue-900/50'
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </div>
          {theme === 'custom' && (
            <div className="flex items-center justify-between pt-1">
              <span>Custom Brand Accent:</span>
              <input
                type="color"
                value={customAccent}
                onChange={(e) => setCustomAccent(e.target.value)}
                className="w-8 h-6 rounded cursor-pointer"
              />
            </div>
          )}
          <div className="pt-2 border-t border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
            <span>Accessibility Large Text</span>
            <button
              type="button"
              onClick={() => setLargeText(!largeText)}
              className="font-semibold text-blue-600 dark:text-sky-400 cursor-pointer"
            >
              {largeText ? 'Enabled' : 'Standard'}
            </button>
          </div>
          <div className="pt-2 border-t border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
            <span className="text-slate-400">Continuous Symbol Preview:</span>
            <OmniLogo variant={isDarkLike ? 'dark' : 'light'} size="sm" accentColor={customAccent} />
          </div>
        </div>
      )}

      {/* Notification Center Popover */}
      {showNotifications && (
        <div className="fixed right-4 top-18 z-50 w-88 p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-[#0B1528] shadow-xl space-y-3 text-xs">
          <div className="flex items-center justify-between font-bold border-b border-blue-100 dark:border-blue-900/50 pb-2">
            <span>OMNI Notification Center (In-App · Email · Push)</span>
            <button
              type="button"
              onClick={() => setShowNotifications(false)}
              className="text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2.5 max-h-72 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="pb-2 border-b border-blue-50 dark:border-blue-900/40 last:border-none"
              >
                <div className="flex justify-between font-semibold">
                  <span>{n.title}</span>
                  <span className="font-mono text-[10px] text-slate-400">{n.time}</span>
                </div>
                <p className="text-slate-500 mt-0.5">{n.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MAIN WORKSPACE CANVAS: 17-ITEM SIDEBAR + VIEWPORT */}
      <div className="flex-1 flex">
        {/* Sidebar Navigation (240px width on desktop, drawer on mobile) */}
        <aside
          className={`${
            mobileSidebarOpen ? 'fixed inset-y-16 left-0 z-30 block' : 'hidden'
          } lg:block w-60 shrink-0 border-r border-blue-200/80 dark:border-blue-900/60 bg-white dark:bg-[#050C1B]/90 p-3 flex flex-col justify-between overflow-y-auto`}
        >
          <div className="space-y-1">
            <div className="px-3 py-2 flex items-center justify-between">
              <OmniLogo
                variant={isDarkLike ? 'dark' : 'light'}
                size="sm"
                accentColor={customAccent}
              />
              <span className="text-[11px] font-mono text-blue-600 dark:text-sky-400">
                OS v1.0
              </span>
            </div>

            <nav className="space-y-0.5 pt-2" aria-label="OMNI Main Navigation">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveNav(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-900 dark:hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Proprietor & Business Owner Quick Identity Card */}
          <div className="mt-6 pt-4 border-t border-blue-100 dark:border-blue-900/50 px-3 space-y-1.5 text-[11px] text-slate-500">
            <div className="font-semibold text-slate-800 dark:text-slate-200">
              Proprietor: Caleb Akankwasa
            </div>
            <div>“One platform. Every business. Intelligent execution.”</div>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 max-w-[1440px] mx-auto w-full space-y-6">
          {/* Persistent Universal OMNI Command Center */}
          <OmniCommandCenter
            currentCurrency={currency}
            activeAgents={agents.filter((a) => a.active).map((a) => a.name)}
            autopilotEnabled={autopilotEnabled}
            onToggleAutopilot={() => setAutopilotEnabled(!autopilotEnabled)}
            aiCredits={aiCredits}
            onDeductCredits={(amt) => setAiCredits((prev) => Math.max(0, prev - amt))}
            onLogAction={handleLogAction}
            accentColor={customAccent}
          />

          {/* Active Section Router */}
          {activeNav === 'home' && (
            <HomeView
              currency={currency}
              agents={agents}
              goals={goals}
              logs={logs}
              onNavigate={setActiveNav}
              onTriggerCommand={(cmd) =>
                handleLogAction('OMNI Executive', cmd, 'Dispatched to AI Workforce', 'Level 3 (Auto Low-Risk)')
              }
            />
          )}

          {activeNav === 'workforce' && (
            <WorkforceView
              agents={agents}
              onToggleAgent={handleToggleAgent}
              onChangePermission={handleChangeAgentPermission}
              onDispatchTask={handleDispatchAgentTask}
            />
          )}

          {activeNav === 'goals' && (
            <GoalsView
              goals={goals}
              currency={currency}
              onAddGoal={(g) => setGoals((prev) => [g, ...prev])}
              onUpdateGoalProgress={handleUpdateGoalProgress}
              onTriggerCommand={(cmd) =>
                handleLogAction('OMNI CEO', cmd, '+10% goal acceleration', 'Level 3 (Auto Low-Risk)')
              }
            />
          )}

          {activeNav === 'automation' && (
            <AutomationView
              workflows={workflows}
              logs={logs}
              onAddWorkflow={(wf) => setWorkflows((prev) => [wf, ...prev])}
              onToggleWorkflow={(id) =>
                setWorkflows((prev) =>
                  prev.map((w) => (w.id === id ? { ...w, active: !w.active } : w))
                )
              }
              onLogAction={handleLogAction}
            />
          )}

          {(activeNav === 'crm' || activeNav === 'sales' || activeNav === 'customers') && (
            <CRMView
              contacts={contacts}
              currency={currency}
              subTab={activeNav}
              onAddContact={(c) => setContacts((prev) => [c, ...prev])}
              onLogAction={handleLogAction}
            />
          )}

          {activeNav === 'marketing' && (
            <MarketingView currency={currency} onLogAction={handleLogAction} />
          )}

          {activeNav === 'analytics' && (
            <AnalyticsView currency={currency} onLogAction={handleLogAction} />
          )}

          {activeNav === 'transcriptions' && (
            <TranscriptionsView
              onDeductCredits={(amt) => setAiCredits((prev) => Math.max(0, prev - amt))}
              onLogAction={handleLogAction}
            />
          )}

          {activeNav === 'worldmap' && (
            <WorldMapView
              currency={currency}
              onSelectCurrency={setCurrency}
              onTriggerCommand={(cmd) =>
                handleLogAction('Marketing Agent', cmd, 'Localized campaign queued', 'Level 2 (Draft)')
              }
            />
          )}

          {activeNav === 'marketplace' && (
            <MarketplaceView
              items={marketplaceItems}
              currency={currency}
              onToggleInstall={(id) =>
                setMarketplaceItems((prev) =>
                  prev.map((item) =>
                    item.id === id ? { ...item, installed: !item.installed } : item
                  )
                )
              }
              onPublishListing={(listing) =>
                setMarketplaceItems((prev) => [listing, ...prev])
              }
              onTriggerCommand={(cmd) => {
                handleLogAction('OMNI CEO', cmd, 'Industry pack activated', 'Level 3 (Auto Low-Risk)');
                setActiveNav('home');
              }}
            />
          )}

          {activeNav === 'wallet' && (
            <WalletView
              currency={currency}
              onChangeCurrency={setCurrency}
              onLogAction={handleLogAction}
            />
          )}

          {activeNav === 'billing' && (
            <BillingView
              currency={currency}
              aiCredits={aiCredits}
              onAddCredits={(amt) => setAiCredits((prev) => prev + amt)}
            />
          )}

          {activeNav === 'integrations' && <IntegrationsView />}

          {activeNav === 'help' && <HelpCentreView />}

          {activeNav === 'settings' && <SettingsSecurityView />}
        </main>
      </div>

      {/* OMNI CHATBOT AT-LARGE (Global Floating & Docked Assistant) */}
      <OmniChatbotAtLarge
        currency={currency}
        activeSection={activeNav}
        onNavigate={setActiveNav}
        onLogAction={handleLogAction}
      />

      {/* OMNI GLOBAL FOOTER */}
      <footer className="border-t border-blue-200/80 dark:border-blue-900/60 bg-gradient-to-r from-white via-blue-50/40 to-sky-50/40 dark:from-[#040B1A] dark:via-[#071328] dark:to-[#091B36] px-6 py-8 text-xs text-slate-500">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <OmniLogo variant={isDarkLike ? 'dark' : 'light'} size="sm" accentColor={customAccent} />
              <span className="text-slate-400">·</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                AI Business Operating System
              </span>
            </div>
            <p className="text-slate-500">
              Proprietor & Founder: <strong className="text-slate-800 dark:text-slate-200">Caleb Akankwasa</strong> · “Tell OMNI. OMNI makes it happen.”
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              { label: 'About', nav: 'home' },
              { label: 'Features', nav: 'workforce' },
              { label: 'Pricing', nav: 'billing' },
              { label: 'Marketplace', nav: 'marketplace' },
              { label: 'Help Centre', nav: 'help' },
              { label: 'Security', nav: 'settings' },
              { label: 'Privacy', nav: 'settings' },
              { label: 'Terms', nav: 'settings' },
              { label: 'Contact', nav: 'help' },
              { label: 'Developers', nav: 'integrations' },
              { label: 'Status', nav: 'integrations' },
              { label: 'Careers', nav: 'workforce' },
            ].map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => setActiveNav(link.nav as NavSection)}
                className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
