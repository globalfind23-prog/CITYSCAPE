export type OmniTheme = 'dark' | 'light' | 'midnight' | 'glass' | 'business' | 'custom';

export type NavSection =
  | 'home'
  | 'workforce'
  | 'goals'
  | 'automation'
  | 'crm'
  | 'marketing'
  | 'sales'
  | 'customers'
  | 'analytics'
  | 'transcriptions'
  | 'worldmap'
  | 'marketplace'
  | 'wallet'
  | 'billing'
  | 'integrations'
  | 'help'
  | 'settings';

export type CurrencyCode =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'UGX'
  | 'KES'
  | 'NGN'
  | 'ZAR'
  | 'AED'
  | 'CAD'
  | 'AUD'
  | 'INR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromUSD: number;
  name: string;
  region: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rateFromUSD: 1, name: 'US Dollar', region: 'United States' },
  EUR: { code: 'EUR', symbol: '€', rateFromUSD: 0.92, name: 'Euro', region: 'European Union' },
  GBP: { code: 'GBP', symbol: '£', rateFromUSD: 0.78, name: 'British Pound', region: 'United Kingdom' },
  UGX: { code: 'UGX', symbol: 'USh ', rateFromUSD: 3740, name: 'Ugandan Shilling', region: 'Uganda' },
  KES: { code: 'KES', symbol: 'KSh ', rateFromUSD: 129, name: 'Kenyan Shilling', region: 'Kenya' },
  NGN: { code: 'NGN', symbol: '₦', rateFromUSD: 1580, name: 'Nigerian Naira', region: 'Nigeria' },
  ZAR: { code: 'ZAR', symbol: 'R ', rateFromUSD: 17.8, name: 'South African Rand', region: 'South Africa' },
  AED: { code: 'AED', symbol: 'AED ', rateFromUSD: 3.67, name: 'UAE Dirham', region: 'United Arab Emirates' },
  CAD: { code: 'CAD', symbol: 'C$', rateFromUSD: 1.37, name: 'Canadian Dollar', region: 'Canada' },
  AUD: { code: 'AUD', symbol: 'A$', rateFromUSD: 1.51, name: 'Australian Dollar', region: 'Australia' },
  INR: { code: 'INR', symbol: '₹', rateFromUSD: 83.9, name: 'Indian Rupee', region: 'India' },
};

export function formatMoney(amountInUSD: number, currency: CurrencyCode): string {
  const cfg = CURRENCIES[currency] || CURRENCIES.USD;
  const converted = amountInUSD * cfg.rateFromUSD;
  if (cfg.rateFromUSD > 100) {
    return `${cfg.symbol}${Math.round(converted).toLocaleString('en-US')}`;
  }
  return `${cfg.symbol}${converted.toLocaleString('en-US', {
    minimumFractionDigits: converted % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  department: string;
  active: boolean;
  permissionLevel: 1 | 2 | 3 | 4 | 5;
  tasksCompleted: number;
  currentTask: string;
  collaboratesWith: string[];
  requiresLegalNotice?: boolean;
}

export const INITIAL_AGENTS: AIAgent[] = [
  {
    id: 'ceo',
    name: 'OMNI CEO',
    role: 'Business Strategy & Decision Support',
    department: 'Executive',
    active: true,
    permissionLevel: 4,
    tasksCompleted: 318,
    currentTask: 'Synchronizing Q4 revenue expansion plan across Marketing and Sales agents',
    collaboratesWith: ['Marketing Agent', 'Sales Agent', 'Finance Intelligence Agent'],
  },
  {
    id: 'marketing',
    name: 'Marketing Agent',
    role: 'Creates and manages multi-channel marketing campaigns',
    department: 'Growth',
    active: true,
    permissionLevel: 3,
    tasksCompleted: 842,
    currentTask: 'Optimizing mobile landing page conversion funnel (+14.2% lift)',
    collaboratesWith: ['Content Agent', 'Sales Agent', 'Data Analyst Agent'],
  },
  {
    id: 'sales',
    name: 'Sales Agent',
    role: 'Manages leads, prospects, scoring, and pipeline workflows',
    department: 'Revenue',
    active: true,
    permissionLevel: 3,
    tasksCompleted: 694,
    currentTask: 'Following up with 18 Hot enterprise prospects in North America & Europe',
    collaboratesWith: ['Marketing Agent', 'Customer Success Agent'],
  },
  {
    id: 'cs',
    name: 'Customer Success Agent',
    role: 'Handles customer inquiries, onboarding, and retention follow-ups',
    department: 'Retention',
    active: true,
    permissionLevel: 3,
    tasksCompleted: 1290,
    currentTask: 'Executing 127 inactive customer re-engagement sequences',
    collaboratesWith: ['Sales Agent', 'Ecommerce Agent'],
  },
  {
    id: 'research',
    name: 'Research Agent',
    role: 'Researches markets, industries, competitors, and pricing trends',
    department: 'Intelligence',
    active: true,
    permissionLevel: 1,
    tasksCompleted: 215,
    currentTask: 'Benchmarking SaaS & Ecommerce competitor pricing across 14 countries',
    collaboratesWith: ['OMNI CEO', 'Product Agent'],
  },
  {
    id: 'content',
    name: 'Content Agent',
    role: 'Creates articles, social posts, newsletters, and conversion copy',
    department: 'Creative',
    active: true,
    permissionLevel: 2,
    tasksCompleted: 960,
    currentTask: 'Drafting weekly product launch sequence and SEO landing pages',
    collaboratesWith: ['Marketing Agent', 'Product Agent'],
  },
  {
    id: 'ecommerce',
    name: 'Ecommerce Agent',
    role: 'Optimizes products, offers, abandoned carts, and checkout journeys',
    department: 'Commerce',
    active: true,
    permissionLevel: 3,
    tasksCompleted: 512,
    currentTask: 'Recovering abandoned carts via 24h personalized incentive workflow',
    collaboratesWith: ['Marketing Agent', 'Finance Intelligence Agent'],
  },
  {
    id: 'finance',
    name: 'Finance Intelligence Agent',
    role: 'Analyzes business financial metrics, margins, and multi-currency cashflow',
    department: 'Finance',
    active: true,
    permissionLevel: 4,
    tasksCompleted: 184,
    currentTask: 'Auditing unit economics and monthly CAC payback period',
    collaboratesWith: ['OMNI CEO', 'Data Analyst Agent'],
  },
  {
    id: 'operations',
    name: 'Operations Agent',
    role: 'Automates repetitive cross-system business processes',
    department: 'Operations',
    active: true,
    permissionLevel: 3,
    tasksCompleted: 730,
    currentTask: 'Syncing Shopify inventory levels with fulfillment and CRM records',
    collaboratesWith: ['Ecommerce Agent', 'HR Agent'],
  },
  {
    id: 'hr',
    name: 'HR Agent',
    role: 'Assists with recruitment workflows, onboarding, and internal policies',
    department: 'People',
    active: false,
    permissionLevel: 2,
    tasksCompleted: 92,
    currentTask: 'Standby — Ready to organize candidate scorecards and onboarding checklists',
    collaboratesWith: ['Operations Agent', 'Legal Workflow Agent'],
  },
  {
    id: 'product',
    name: 'Product Agent',
    role: 'Researches customer feedback and helps design product roadmaps',
    department: 'Product',
    active: true,
    permissionLevel: 2,
    tasksCompleted: 147,
    currentTask: 'Synthesizing 48 customer call transcripts into Q4 feature priorities',
    collaboratesWith: ['Research Agent', 'Data Analyst Agent'],
  },
  {
    id: 'analytics',
    name: 'Data Analyst Agent',
    role: 'Turns connected business telemetry into clear executive insights',
    department: 'Intelligence',
    active: true,
    permissionLevel: 1,
    tasksCompleted: 619,
    currentTask: 'Monitoring real-time cohort retention and mobile checkout conversion',
    collaboratesWith: ['OMNI CEO', 'Marketing Agent', 'Finance Intelligence Agent'],
  },
  {
    id: 'legal',
    name: 'Legal Workflow Agent',
    role: 'Organizes documents, compliance checklists, and contract preparation',
    department: 'Governance',
    active: false,
    permissionLevel: 5,
    tasksCompleted: 64,
    currentTask: 'Preparing GDPR & regional data-protection compliance checklist (Requires Counsel Review)',
    collaboratesWith: ['OMNI CEO', 'HR Agent'],
    requiresLegalNotice: true,
  },
  {
    id: 'assistant',
    name: 'Personal Assistant',
    role: 'Manages daily executive briefings, reminders, meetings, and priorities',
    department: 'Executive',
    active: true,
    permissionLevel: 3,
    tasksCompleted: 1105,
    currentTask: 'Preparing Daily Executive Briefing & 3 priority decisions for today',
    collaboratesWith: ['OMNI CEO', 'Sales Agent'],
  },
];

export interface BusinessGoal {
  id: string;
  title: string;
  category: 'Revenue' | 'Customers' | 'Leads' | 'Growth' | 'Marketing';
  targetValue: number;
  currentValue: number;
  unit: 'currency' | 'count' | 'percent';
  deadline: string;
  bottleneckExplanation: string;
  recommendedFix: string;
  assignedAgent: string;
}

export const INITIAL_GOALS: BusinessGoal[] = [
  {
    id: 'goal-rev',
    title: 'Monthly Recurring Revenue Target',
    category: 'Revenue',
    targetValue: 10000,
    currentValue: 7420,
    unit: 'currency',
    deadline: 'Oct 31, 2026',
    bottleneckExplanation: 'Mobile checkout abandonment is 23% higher than desktop due to a 3-step shipping form.',
    recommendedFix: 'Enable 1-click Express Checkout & activate 2-hour abandoned cart follow-up.',
    assignedAgent: 'Ecommerce Agent',
  },
  {
    id: 'goal-cust',
    title: 'Active Paying Customers',
    category: 'Customers',
    targetValue: 500,
    currentValue: 412,
    unit: 'count',
    deadline: 'Oct 31, 2026',
    bottleneckExplanation: '127 previous buyers have not reordered in 45 days across North America and UK.',
    recommendedFix: 'Trigger approved VIP win-back offer sequence via Customer Success Agent.',
    assignedAgent: 'Customer Success Agent',
  },
  {
    id: 'goal-leads',
    title: 'Qualified Inbound & Outbound Leads',
    category: 'Leads',
    targetValue: 2000,
    currentValue: 1640,
    unit: 'count',
    deadline: 'Oct 31, 2026',
    bottleneckExplanation: 'LinkedIn & Search landing page CTA conversion dipped 12% on mobile viewports.',
    recommendedFix: 'Deploy revised high-contrast landing page headline tested by Marketing Agent.',
    assignedAgent: 'Marketing Agent',
  },
  {
    id: 'goal-growth',
    title: 'Monthly Net Revenue Growth Rate',
    category: 'Growth',
    targetValue: 30,
    currentValue: 24.6,
    unit: 'percent',
    deadline: 'Oct 31, 2026',
    bottleneckExplanation: 'Enterprise deal cycle averages 18 days waiting on security questionnaire responses.',
    recommendedFix: 'Use Knowledge Vault auto-responder for standard SOC2/GDPR compliance FAQs.',
    assignedAgent: 'Sales Agent',
  },
];

export interface CRMContact {
  id: string;
  name: string;
  email: string;
  company: string;
  country: string;
  dealValueUSD: number;
  stage: 'Prospect' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won';
  temperature: 'Hot' | 'Warm' | 'Cold';
  score: number;
  aiReason: string;
  lastActivity: string;
  nextAction: string;
}

export const INITIAL_CRM_CONTACTS: CRMContact[] = [
  {
    id: 'c-1',
    name: 'Elena Rostova',
    email: 'elena@vanguardcloud.io',
    company: 'Vanguard Cloud Systems',
    country: 'United States',
    dealValueUSD: 28500,
    stage: 'Negotiation',
    temperature: 'Hot',
    score: 94,
    aiReason: 'Visited enterprise pricing page 4 times in 24h and requested API security documentation.',
    lastActivity: '14 mins ago',
    nextAction: 'Send custom annual contract with Level-4 human approval',
  },
  {
    id: 'c-2',
    name: 'Marcus Vance',
    email: 'm.vance@nordicretail.eu',
    company: 'Nordic Retail Group',
    country: 'United Kingdom',
    dealValueUSD: 19200,
    stage: 'Proposal',
    temperature: 'Hot',
    score: 89,
    aiReason: 'Attended live demo with 3 decision makers; asked for Shopify multi-currency integration.',
    lastActivity: '2 hours ago',
    nextAction: 'Deliver ROI breakdown and automated onboarding timeline',
  },
  {
    id: 'c-3',
    name: 'Amara Okafor',
    email: 'amara@kineticafrica.co',
    company: 'Kinetic Commerce Africa',
    country: 'Nigeria',
    dealValueUSD: 14800,
    stage: 'Qualified',
    temperature: 'Warm',
    score: 76,
    aiReason: 'Downloaded Ecommerce Growth Pack and opened 3 consecutive product emails.',
    lastActivity: 'Yesterday',
    nextAction: 'Schedule 15-minute discovery call with Sales Agent',
  },
  {
    id: 'c-4',
    name: 'David Kato',
    email: 'dkato@pearlventures.ug',
    company: 'Pearl FinTech Ventures',
    country: 'Uganda',
    dealValueUSD: 12400,
    stage: 'Proposal',
    temperature: 'Hot',
    score: 91,
    aiReason: 'Tested OMNI API webhooks in sandbox and invited 4 team members to workspace.',
    lastActivity: '35 mins ago',
    nextAction: 'Approve volume API credit tier discount',
  },
  {
    id: 'c-5',
    name: 'Sophia Lindqvist',
    email: 'sophia@atelierlumiere.fr',
    company: 'Atelier Lumière Skincare',
    country: 'France',
    dealValueUSD: 9600,
    stage: 'Closed Won',
    temperature: 'Hot',
    score: 98,
    aiReason: 'Expanded subscription to Growth plan after abandoned-cart workflow recovered $4,200.',
    lastActivity: '3 days ago',
    nextAction: 'Trigger 30-day upsell check-in',
  },
  {
    id: 'c-6',
    name: 'Rajesh Patel',
    email: 'r.patel@apexcyber.in',
    company: 'Apex Cyber Defense',
    country: 'India',
    dealValueUSD: 6400,
    stage: 'Prospect',
    temperature: 'Cold',
    score: 42,
    aiReason: 'No email engagement in 19 days; initial form inquiry lacked timeline.',
    lastActivity: '19 days ago',
    nextAction: 'Move to low-frequency quarterly research newsletter',
  },
];

export interface AutomationNode {
  id: string;
  type: 'WHEN' | 'THEN' | 'WAIT' | 'IF' | 'AI';
  title: string;
  detail: string;
  agent: string;
  permission: 'Observe' | 'Draft' | 'Approval Required' | 'Automatic' | 'Restricted';
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  active: boolean;
  safetyMode: 'Observe' | 'Draft' | 'Approval Required' | 'Automatic' | 'Restricted';
  runsCount: number;
  conversionLift: string;
  pythonCode: string;
  nodes: AutomationNode[];
}

export const INITIAL_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: 'wf-1',
    name: 'Post-Purchase Retention & Repeat Order Engine',
    description: 'Nurtures new customers from first purchase to second order with timed education and conditional offer.',
    active: true,
    safetyMode: 'Automatic',
    runsCount: 1428,
    conversionLift: '+18.4% repeat purchase rate',
    pythonCode: `from omni_os import OmniClient, Trigger, PermissionLevel

omni = OmniClient(workspace="global_prod", governance=PermissionLevel.AUTOMATIC)

@omni.workflow("post_purchase_retention")
def handle_new_order(event):
    customer = omni.crm.upsert_customer(event.customer)
    omni.agents.customer_success.send_welcome_message(customer.id)
    omni.wait(days=3)
    omni.agents.content.send_product_education(customer.id, product=event.sku)
    omni.wait(days=7)
    if not omni.ecommerce.has_repurchased(customer.id, since=event.timestamp):
        omni.agents.marketing.send_approved_offer(
            customer_id=customer.id,
            discount_pct=15,
            require_human_approval=False
        )`,
    nodes: [
      {
        id: 'n1',
        type: 'WHEN',
        title: 'New customer purchases',
        detail: 'Triggered via Shopify / Stripe webhook on order.paid',
        agent: 'Ecommerce Agent',
        permission: 'Observe',
      },
      {
        id: 'n2',
        type: 'THEN',
        title: 'Send welcome message & add to CRM',
        detail: 'Delivers personalized receipt + founder welcome note',
        agent: 'Customer Success Agent',
        permission: 'Automatic',
      },
      {
        id: 'n3',
        type: 'WAIT',
        title: 'Wait 3 days',
        detail: 'Pauses execution until optimal onboarding window',
        agent: 'Operations Agent',
        permission: 'Automatic',
      },
      {
        id: 'n4',
        type: 'THEN',
        title: 'Send product education guide',
        detail: 'Shares usage tips based on purchased SKU category',
        agent: 'Content Agent',
        permission: 'Automatic',
      },
      {
        id: 'n5',
        type: 'WAIT',
        title: 'Wait 7 days',
        detail: 'Monitors customer usage and store return visits',
        agent: 'Data Analyst Agent',
        permission: 'Observe',
      },
      {
        id: 'n6',
        type: 'IF',
        title: 'Customer has not purchased again',
        detail: 'Checks order ledger for second transaction',
        agent: 'Ecommerce Agent',
        permission: 'Observe',
      },
      {
        id: 'n7',
        type: 'THEN',
        title: 'Send approved 15% loyalty offer',
        detail: 'Dispatches pre-approved retention incentive code',
        agent: 'Marketing Agent',
        permission: 'Approval Required',
      },
    ],
  },
  {
    id: 'wf-2',
    name: 'High-Intent Lead Instant Qualification & Sales Alert',
    description: 'Scores inbound form submissions, enriches company profile, and books discovery calls.',
    active: true,
    safetyMode: 'Approval Required',
    runsCount: 612,
    conversionLift: '3.2x faster lead response',
    pythonCode: `from omni_os import OmniClient, PermissionLevel

omni = OmniClient(workspace="global_prod", governance=PermissionLevel.APPROVAL_REQUIRED)

@omni.workflow("inbound_lead_qualification")
def on_form_submission(lead):
    enriched = omni.agents.research.enrich_company(lead.domain)
    score = omni.agents.sales.score_lead(lead, enriched)
    omni.crm.create_deal(lead=lead, score=score.value, tier=score.tier)
    omni.agents.sales.draft_welcome_email(lead.email, context=enriched)
    omni.notify_team(channel="#sales-enterprise", summary=f"Hot Lead: {lead.company} ({score.value}/100)")`,
    nodes: [
      {
        id: 'w2-1',
        type: 'WHEN',
        title: 'Inbound lead fills website form',
        detail: 'Captures name, work email, company size, and objective',
        agent: 'Sales Agent',
        permission: 'Observe',
      },
      {
        id: 'w2-2',
        type: 'AI',
        title: 'Analyze & score lead in OMNI CRM',
        detail: 'Enriches firmographics and classifies Hot / Warm / Cold',
        agent: 'Research Agent',
        permission: 'Automatic',
      },
      {
        id: 'w2-3',
        type: 'THEN',
        title: 'Send tailored welcome email & notify sales team',
        detail: 'Dispatches calendar link and pings Slack #sales-alerts',
        agent: 'Sales Agent',
        permission: 'Approval Required',
      },
    ],
  },
];

export interface AutomationLogItem {
  id: string;
  time: string;
  agent: string;
  action: string;
  dataUsed: string;
  result: string;
  permissionLevel: 'Level 1 (Analyze)' | 'Level 2 (Draft)' | 'Level 3 (Auto Low-Risk)' | 'Level 4 (Human Approved)' | 'Level 5 (Restricted)';
  userApproval: 'Auto-Permitted' | 'Approved by Caleb A.' | 'Pending Approval';
}

export const INITIAL_AUTOMATION_LOGS: AutomationLogItem[] = [
  {
    id: 'log-1',
    time: 'Today, 14:22 UTC',
    agent: 'Ecommerce Agent',
    action: 'Triggered abandoned-cart recovery sequence for 14 high-value carts',
    dataUsed: 'Shopify Checkout Webhook + Customer Purchase History',
    result: '4 carts recovered ($1,480 net revenue)',
    permissionLevel: 'Level 3 (Auto Low-Risk)',
    userApproval: 'Auto-Permitted',
  },
  {
    id: 'log-2',
    time: 'Today, 13:05 UTC',
    agent: 'Marketing Agent',
    action: 'Reallocated $450 daily ad spend from Social Campaign B to Search Campaign A',
    dataUsed: '7-Day ROAS Telemetry & Conversion Funnel Metrics',
    result: 'Projected +22% reduction in customer acquisition cost',
    permissionLevel: 'Level 4 (Human Approved)',
    userApproval: 'Approved by Caleb A.',
  },
  {
    id: 'log-3',
    time: 'Today, 11:40 UTC',
    agent: 'Sales Agent',
    action: 'Scored 28 new enterprise leads and drafted personalized outreach emails',
    dataUsed: 'OMNI CRM Lead Form + Firmographic Research Index',
    result: '6 Hot leads escalated to negotiation pipeline',
    permissionLevel: 'Level 2 (Draft)',
    userApproval: 'Approved by Caleb A.',
  },
  {
    id: 'log-4',
    time: 'Today, 09:15 UTC',
    agent: 'Data Analyst Agent',
    action: 'Detected 12% mobile conversion drop on skincare product page',
    dataUsed: 'Web Session Analytics & Device Viewport Telemetry',
    result: 'Created priority fix ticket for Marketing & Ecommerce agents',
    permissionLevel: 'Level 1 (Analyze)',
    userApproval: 'Auto-Permitted',
  },
];

export interface CountryMarketData {
  id: string;
  name: string;
  region: 'North America' | 'South America' | 'Europe' | 'Africa' | 'Asia' | 'Oceania';
  westToEastOrder: number;
  coordinates: { x: number; y: number }; // SVG percentage coordinates (0-1000, 0-500)
  potentialMarket: 'High' | 'Very High' | 'Emerging' | 'Established';
  customers: number;
  revenueUSD: number;
  conversionRate: number;
  omniOpportunity: 'High' | 'Very High' | 'Moderate';
  currency: CurrencyCode;
  languages: string;
  activeCampaigns: number;
  topOpportunityNote: string;
}

export const WORLD_MARKET_DATA: CountryMarketData[] = [
  {
    id: 'ca',
    name: 'Canada',
    region: 'North America',
    westToEastOrder: 1,
    coordinates: { x: 195, y: 120 },
    potentialMarket: 'High',
    customers: 310,
    revenueUSD: 24600,
    conversionRate: 4.3,
    omniOpportunity: 'High',
    currency: 'CAD',
    languages: 'English, French',
    activeCampaigns: 3,
    topOpportunityNote: 'West-to-East Corridor #1: Bilingual French/English landing pages lifting conversion by +19%.',
  },
  {
    id: 'us',
    name: 'United States',
    region: 'North America',
    westToEastOrder: 2,
    coordinates: { x: 215, y: 175 },
    potentialMarket: 'Very High',
    customers: 1240,
    revenueUSD: 82400,
    conversionRate: 4.8,
    omniOpportunity: 'High',
    currency: 'USD',
    languages: 'English, Spanish',
    activeCampaigns: 8,
    topOpportunityNote: 'West-to-East Corridor #2: Enterprise B2B SaaS & automated outbound sales showing 5.4x ROAS.',
  },
  {
    id: 'br',
    name: 'Brazil (LATAM Hub)',
    region: 'South America',
    westToEastOrder: 3,
    coordinates: { x: 315, y: 345 },
    potentialMarket: 'Very High',
    customers: 285,
    revenueUSD: 29400,
    conversionRate: 4.5,
    omniOpportunity: 'Very High',
    currency: 'USD',
    languages: 'Portuguese, Spanish, English',
    activeCampaigns: 4,
    topOpportunityNote: 'West-to-East Corridor #3: Instant Pix & automated WhatsApp checkout flows scaling rapidly.',
  },
  {
    id: 'ar',
    name: 'Argentina & Andean Hub',
    region: 'South America',
    westToEastOrder: 4,
    coordinates: { x: 285, y: 420 },
    potentialMarket: 'High',
    customers: 142,
    revenueUSD: 14900,
    conversionRate: 4.2,
    omniOpportunity: 'High',
    currency: 'USD',
    languages: 'Spanish, English',
    activeCampaigns: 3,
    topOpportunityNote: 'West-to-East Corridor #4: Software agencies exporting services via OMNI Multi-Currency Wallet.',
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    region: 'Europe',
    westToEastOrder: 5,
    coordinates: { x: 472, y: 142 },
    potentialMarket: 'Very High',
    customers: 418,
    revenueUSD: 44800,
    conversionRate: 4.6,
    omniOpportunity: 'High',
    currency: 'GBP',
    languages: 'English',
    activeCampaigns: 5,
    topOpportunityNote: 'West-to-East Corridor #5: Strong fintech & agency adoption; 42 warm leads ready for Q4 upgrades.',
  },
  {
    id: 'fr',
    name: 'France & EU Core',
    region: 'Europe',
    westToEastOrder: 6,
    coordinates: { x: 498, y: 168 },
    potentialMarket: 'High',
    customers: 342,
    revenueUSD: 76200,
    conversionRate: 4.1,
    omniOpportunity: 'High',
    currency: 'EUR',
    languages: 'French, German, English',
    activeCampaigns: 6,
    topOpportunityNote: 'West-to-East Corridor #6: Luxury D2C brands adopting SEPA Instant & OMNI cart automation.',
  },
  {
    id: 'ng',
    name: 'Nigeria (West Africa)',
    region: 'Africa',
    westToEastOrder: 7,
    coordinates: { x: 505, y: 285 },
    potentialMarket: 'Very High',
    customers: 194,
    revenueUSD: 22900,
    conversionRate: 4.5,
    omniOpportunity: 'Very High',
    currency: 'NGN',
    languages: 'English, Yoruba, Hausa, Igbo',
    activeCampaigns: 4,
    topOpportunityNote: 'West-to-East Corridor #7: Paystack & Flutterwave social commerce automation growing fast.',
  },
  {
    id: 'za',
    name: 'South Africa (Southern Africa)',
    region: 'Africa',
    westToEastOrder: 8,
    coordinates: { x: 555, y: 405 },
    potentialMarket: 'High',
    customers: 215,
    revenueUSD: 31200,
    conversionRate: 4.4,
    omniOpportunity: 'High',
    currency: 'ZAR',
    languages: 'English, Afrikaans, Zulu',
    activeCampaigns: 4,
    topOpportunityNote: 'West-to-East Corridor #8: Mid-market retail and logistics firms adopting OMNI Operations Agent.',
  },
  {
    id: 'ug',
    name: 'Uganda (Pearl of Africa Hub)',
    region: 'Africa',
    westToEastOrder: 9,
    coordinates: { x: 575, y: 305 },
    potentialMarket: 'Very High',
    customers: 318,
    revenueUSD: 38400,
    conversionRate: 5.6,
    omniOpportunity: 'Very High',
    currency: 'UGX',
    languages: 'English, Luganda, Swahili, Runyankole',
    activeCampaigns: 7,
    topOpportunityNote: 'West-to-East Corridor #9: Flagship East African Hub — MTN MoMo, Airtel Money Uganda, Stanbic & Centenary Bank instant settlement.',
  },
  {
    id: 'ke',
    name: 'Kenya (East Africa)',
    region: 'Africa',
    westToEastOrder: 10,
    coordinates: { x: 595, y: 312 },
    potentialMarket: 'High',
    customers: 186,
    revenueUSD: 21800,
    conversionRate: 4.9,
    omniOpportunity: 'Very High',
    currency: 'KES',
    languages: 'English, Swahili',
    activeCampaigns: 4,
    topOpportunityNote: 'West-to-East Corridor #10: M-Pesa Daraja 3.0 & PesaPal automated B2B recurring billing.',
  },
  {
    id: 'ae',
    name: 'United Arab Emirates',
    region: 'Asia',
    westToEastOrder: 11,
    coordinates: { x: 632, y: 232 },
    potentialMarket: 'Very High',
    customers: 168,
    revenueUSD: 39500,
    conversionRate: 5.1,
    omniOpportunity: 'Very High',
    currency: 'AED',
    languages: 'Arabic, English',
    activeCampaigns: 4,
    topOpportunityNote: 'West-to-East Corridor #11: Real Estate & Hospitality packs generating highest average order value.',
  },
  {
    id: 'in',
    name: 'India & South Asia',
    region: 'Asia',
    westToEastOrder: 12,
    coordinates: { x: 715, y: 245 },
    potentialMarket: 'Very High',
    customers: 520,
    revenueUSD: 48200,
    conversionRate: 4.2,
    omniOpportunity: 'Very High',
    currency: 'INR',
    languages: 'English, Hindi',
    activeCampaigns: 6,
    topOpportunityNote: 'West-to-East Corridor #12: Rapid developer marketplace growth; 140+ custom AI agents published.',
  },
  {
    id: 'sg',
    name: 'Singapore & East Asia Hub',
    region: 'Asia',
    westToEastOrder: 13,
    coordinates: { x: 785, y: 295 },
    potentialMarket: 'Very High',
    customers: 290,
    revenueUSD: 52400,
    conversionRate: 4.9,
    omniOpportunity: 'Very High',
    currency: 'USD',
    languages: 'English, Mandarin, Malay',
    activeCampaigns: 5,
    topOpportunityNote: 'West-to-East Corridor #13: Cross-border APAC treasury & multi-currency B2B automation.',
  },
  {
    id: 'au',
    name: 'Australia & Oceania',
    region: 'Oceania',
    westToEastOrder: 14,
    coordinates: { x: 845, y: 395 },
    potentialMarket: 'High',
    customers: 230,
    revenueUSD: 34100,
    conversionRate: 4.7,
    omniOpportunity: 'High',
    currency: 'AUD',
    languages: 'English',
    activeCampaigns: 3,
    topOpportunityNote: 'West-to-East Corridor #14: High retention among digital agencies and professional consultants in Sydney & Auckland.',
  },
];

export interface PaymentGatewayConfig {
  id: string;
  name: string;
  scope: 'Uganda Local' | 'Pan-African' | 'Global Continental';
  continent: string;
  currencies: string;
  settlementTime: string;
  type: 'Mobile Money' | 'Commercial Bank' | 'Fintech Gateway' | 'Card & Wire';
  verified: boolean;
}

export const PAYMENT_METHODS_CATALOG: PaymentGatewayConfig[] = [
  // Ugandan Local Payment Rails
  {
    id: 'ug-mtn',
    name: 'MTN Mobile Money (MoMo) Uganda',
    scope: 'Uganda Local',
    continent: 'Africa (Uganda)',
    currencies: 'UGX, USD',
    settlementTime: 'Instant (Real-Time USSD / MoMoPay API)',
    type: 'Mobile Money',
    verified: true,
  },
  {
    id: 'ug-airtel',
    name: 'Airtel Money Uganda',
    scope: 'Uganda Local',
    continent: 'Africa (Uganda)',
    currencies: 'UGX',
    settlementTime: 'Instant (Merchant Pay & Bulk Payouts)',
    type: 'Mobile Money',
    verified: true,
  },
  {
    id: 'ug-stanbic',
    name: 'Stanbic Bank Uganda & FlexiPay',
    scope: 'Uganda Local',
    continent: 'Africa (Uganda)',
    currencies: 'UGX, USD, EUR, GBP',
    settlementTime: 'Instant FlexiPay / Same-Day RTGS',
    type: 'Commercial Bank',
    verified: true,
  },
  {
    id: 'ug-centenary',
    name: 'Centenary Bank Uganda (CenteMobile)',
    scope: 'Uganda Local',
    continent: 'Africa (Uganda)',
    currencies: 'UGX, USD',
    settlementTime: 'Instant CenteMobile / EFT',
    type: 'Commercial Bank',
    verified: true,
  },
  {
    id: 'ug-dfcu',
    name: 'dfcu Bank Uganda & QuickBanking',
    scope: 'Uganda Local',
    continent: 'Africa (Uganda)',
    currencies: 'UGX, USD',
    settlementTime: 'Same-Day Corporate Settlement',
    type: 'Commercial Bank',
    verified: true,
  },
  {
    id: 'ug-eversend',
    name: 'Eversend & Chipper Cash (Uganda Corridor)',
    scope: 'Uganda Local',
    continent: 'Africa (Uganda)',
    currencies: 'UGX, KES, NGN, USD',
    settlementTime: 'Instant Cross-Border Wallet',
    type: 'Fintech Gateway',
    verified: true,
  },
  {
    id: 'ug-yo',
    name: 'Yo! Uganda Payments & SchoolPay / EzeeMoney',
    scope: 'Uganda Local',
    continent: 'Africa (Uganda)',
    currencies: 'UGX',
    settlementTime: 'Instant Aggregator Settlement',
    type: 'Fintech Gateway',
    verified: true,
  },
  // Pan-African Payment Rails
  {
    id: 'af-mpesa',
    name: 'M-Pesa (Safaricom / Vodacom East & Southern Africa)',
    scope: 'Pan-African',
    continent: 'Africa (Kenya, TZ, DRC)',
    currencies: 'KES, TZS, USD',
    settlementTime: 'Instant Daraja API',
    type: 'Mobile Money',
    verified: true,
  },
  {
    id: 'af-flutterwave',
    name: 'Flutterwave (34+ African Countries)',
    scope: 'Pan-African',
    continent: 'Africa (Pan-African)',
    currencies: 'UGX, NGN, KES, ZAR, GHS, USD',
    settlementTime: 'T+1 / Instant Virtual Accounts',
    type: 'Fintech Gateway',
    verified: true,
  },
  {
    id: 'af-paystack',
    name: 'Paystack by Stripe (Nigeria, Ghana, Kenya, SA)',
    scope: 'Pan-African',
    continent: 'Africa (West, East & South)',
    currencies: 'NGN, GHS, KES, ZAR, USD',
    settlementTime: 'Next-Morning Automated Payout',
    type: 'Fintech Gateway',
    verified: true,
  },
  {
    id: 'af-pesapal',
    name: 'PesaPal & DPO Pay (East & Southern Africa)',
    scope: 'Pan-African',
    continent: 'Africa (Uganda, Kenya, TZ, Rwanda, Zambia)',
    currencies: 'UGX, KES, TZS, RWF, ZAR, USD',
    settlementTime: 'Instant Mobile & Card Acquiring',
    type: 'Fintech Gateway',
    verified: true,
  },
  {
    id: 'af-cellulant',
    name: 'Cellulant Tingg & Onafriq (MFS Africa)',
    scope: 'Pan-African',
    continent: 'Africa (35 Countries)',
    currencies: 'UGX, KES, NGN, XOF, XAF, ZAR',
    settlementTime: 'Real-Time Interoperable Hub',
    type: 'Fintech Gateway',
    verified: true,
  },
  // Global Continental Rails (West to East)
  {
    id: 'gl-stripe',
    name: 'Stripe Connect Global & ACH / FedNow',
    scope: 'Global Continental',
    continent: 'North America & Global',
    currencies: 'USD, CAD, EUR, GBP, AUD',
    settlementTime: 'Instant / 2-Day Rolling',
    type: 'Card & Wire',
    verified: true,
  },
  {
    id: 'gl-pix',
    name: 'Banco Central Pix & Mercado Pago',
    scope: 'Global Continental',
    continent: 'South America',
    currencies: 'USD, BRL, ARS',
    settlementTime: 'Instant 24/7 Settlement',
    type: 'Fintech Gateway',
    verified: true,
  },
  {
    id: 'gl-sepa',
    name: 'SEPA Instant, Faster Payments UK & Wise',
    scope: 'Global Continental',
    continent: 'Europe',
    currencies: 'EUR, GBP, USD',
    settlementTime: 'Under 10 Seconds (SEPA Inst)',
    type: 'Commercial Bank',
    verified: true,
  },
  {
    id: 'gl-upi',
    name: 'UPI India, PayNow Singapore & Alipay+ Corridor',
    scope: 'Global Continental',
    continent: 'Asia & Middle East',
    currencies: 'INR, AED, SGD, USD',
    settlementTime: 'Instant QR & Bank Rail',
    type: 'Fintech Gateway',
    verified: true,
  },
  {
    id: 'gl-npp',
    name: 'Australia New Payments Platform (PayID / BECS)',
    scope: 'Global Continental',
    continent: 'Oceania',
    currencies: 'AUD, NZD, USD',
    settlementTime: 'Real-Time PayID Settlement',
    type: 'Commercial Bank',
    verified: true,
  },
];

export interface HomeImageryFeature {
  number: string;
  title: string;
  regionCorridor: 'Americas (West)' | 'Europe & Africa (Center)' | 'Ugandan & East Africa Hub' | 'Asia & Oceania (East)';
  metric: string;
  description: string;
  imageUrl: string;
  objectPosition: string;
  targetNav: NavSection;
}

export const HOME_TWENTY_IMAGERY_FEATURES: HomeImageryFeature[] = [
  {
    number: '01',
    title: 'OMNI Executive Strategic Brain',
    regionCorridor: 'Americas (West)',
    metric: 'Goal → Execute in <4s',
    description: 'Transforms natural-language objectives into multi-agent execution plans with Level 1–5 governance.',
    imageUrl: '/src/assets/images/omni_blue_hero_banner_1791084498239.jpg',
    objectPosition: 'center center',
    targetNav: 'home',
  },
  {
    number: '02',
    title: '14-Agent Autonomous Workforce',
    regionCorridor: 'Americas (West)',
    metric: '14 Specialized AI Roles',
    description: 'Coordinated CEO, Marketing, Sales, Finance, Operations, Legal, and Research AI employees.',
    imageUrl: '/src/assets/images/omni_blue_ai_workforce_1791084510430.jpg',
    objectPosition: 'center top',
    targetNav: 'workforce',
  },
  {
    number: '03',
    title: 'OMNI Autopilot & Budget Guardrails',
    regionCorridor: 'Americas (West)',
    metric: '24/7 Continuous Optimization',
    description: 'Monitors campaigns, pauses risky ad spend, and requests human approval for sensitive actions.',
    imageUrl: '/src/assets/images/omni_blue_security_vault_1791085498877.jpg',
    objectPosition: 'center center',
    targetNav: 'workforce',
  },
  {
    number: '04',
    title: 'AI Measurable Goal Engine',
    regionCorridor: 'Americas (West)',
    metric: '82/100 Health Score',
    description: 'Tracks revenue, customer, and lead targets while diagnosing exact conversion bottlenecks.',
    imageUrl: '/src/assets/images/omni_blue_hero_banner_1791084498239.jpg',
    objectPosition: 'left center',
    targetNav: 'goals',
  },
  {
    number: '05',
    title: 'Visual No-Code Automation + Python SDK',
    regionCorridor: 'Americas (West)',
    metric: '2,040+ Automated Runs',
    description: 'Build WHEN → THEN → WAIT → IF flows visually or inspect live Python omni_os scripts.',
    imageUrl: '/src/assets/images/omni_blue_marketplace_pack_1791084531550.jpg',
    objectPosition: 'center center',
    targetNav: 'automation',
  },
  {
    number: '06',
    title: 'OMNI CRM & AI Lead Scoring',
    regionCorridor: 'Europe & Africa (Center)',
    metric: 'Hot / Warm / Cold AI Reasons',
    description: 'Scores every deal 0–100 with transparent behavioral reasoning and 1-click sales follow-up.',
    imageUrl: '/src/assets/images/omni_blue_ai_workforce_1791084510430.jpg',
    objectPosition: 'right center',
    targetNav: 'crm',
  },
  {
    number: '07',
    title: 'Privacy-Compliant B2B Lead Finder',
    regionCorridor: 'Europe & Africa (Center)',
    metric: 'GDPR & CAN-SPAM Compliant',
    description: 'Discovers high-fit companies matching your Ideal Customer Profile across all 6 continents.',
    imageUrl: '/src/assets/images/omni_blue_global_globe_1791085487918.jpg',
    objectPosition: 'left top',
    targetNav: 'crm',
  },
  {
    number: '08',
    title: 'Multi-Channel AI Marketing Studio',
    regionCorridor: 'Europe & Africa (Center)',
    metric: '4.8x Projected ROAS',
    description: 'Generates audience targeting, promotional offers, ad copy, and 3-part email sequences.',
    imageUrl: '/src/assets/images/omni_blue_marketing_studio_1791084522718.jpg',
    objectPosition: 'center center',
    targetNav: 'marketing',
  },
  {
    number: '09',
    title: 'Visual Website & HTML5 Landing Builder',
    regionCorridor: 'Europe & Africa (Center)',
    metric: 'Clean Exportable HTML5',
    description: 'Builds high-converting product landing pages with instant visual preview and source code export.',
    imageUrl: '/src/assets/images/omni_blue_marketing_studio_1791084522718.jpg',
    objectPosition: 'right bottom',
    targetNav: 'marketing',
  },
  {
    number: '10',
    title: 'Ecommerce Command & Cart Recovery',
    regionCorridor: 'Europe & Africa (Center)',
    metric: '+18.4% Repeat Orders',
    description: 'Syncs Shopify & WooCommerce inventory, recovers abandoned carts, and bundles cross-sells.',
    imageUrl: '/src/assets/images/omni_blue_fintech_payments_1791085476625.jpg',
    objectPosition: 'left center',
    targetNav: 'marketing',
  },
  {
    number: '11',
    title: 'Ugandan Local Payment Rails (MTN & Airtel)',
    regionCorridor: 'Ugandan & East Africa Hub',
    metric: 'Instant UGX Settlement',
    description: 'Native integration with MTN MoMo Uganda, Airtel Money, Stanbic FlexiPay, Centenary & dfcu Bank.',
    imageUrl: '/src/assets/images/omni_blue_fintech_payments_1791085476625.jpg',
    objectPosition: 'center center',
    targetNav: 'wallet',
  },
  {
    number: '12',
    title: 'Pan-African Fintech Settlement Mesh',
    regionCorridor: 'Ugandan & East Africa Hub',
    metric: '35+ African Markets',
    description: 'Seamless payouts and collections via M-Pesa, Flutterwave, Paystack, PesaPal, Eversend & Chipper.',
    imageUrl: '/src/assets/images/omni_blue_global_globe_1791085487918.jpg',
    objectPosition: 'center center',
    targetNav: 'wallet',
  },
  {
    number: '13',
    title: 'OMNI Transcribe & Call Intelligence',
    regionCorridor: 'Ugandan & East Africa Hub',
    metric: 'Multilingual Diarization',
    description: 'Transcribes meetings and customer calls into decisions, action items, and follow-up emails.',
    imageUrl: '/src/assets/images/omni_blue_voice_wave_1791085508561.jpg',
    objectPosition: 'center center',
    targetNav: 'transcriptions',
  },
  {
    number: '14',
    title: 'Voice OMNI Executive Briefing',
    regionCorridor: 'Ugandan & East Africa Hub',
    metric: '24kHz Neural Speech',
    description: 'Speak commands naturally and listen to synthesized daily executive briefings on desktop or mobile.',
    imageUrl: '/src/assets/images/omni_blue_voice_wave_1791085508561.jpg',
    objectPosition: 'right center',
    targetNav: 'home',
  },
  {
    number: '15',
    title: 'West-to-East 6-Continent World Map',
    regionCorridor: 'Ugandan & East Africa Hub',
    metric: 'Americas → Africa → Oceania',
    description: 'Interactive global market explorer spanning North/South America, Europe, Africa, Asia, and Oceania.',
    imageUrl: '/src/assets/images/omni_blue_global_globe_1791085487918.jpg',
    objectPosition: 'right bottom',
    targetNav: 'worldmap',
  },
  {
    number: '16',
    title: 'OMNI Competitor Research Lab',
    regionCorridor: 'Asia & Oceania (East)',
    metric: 'Real-Time Market Benchmarks',
    description: 'Analyzes competitor pricing, strengths, weaknesses, and regional positioning opportunities.',
    imageUrl: '/src/assets/images/omni_blue_ai_workforce_1791084510430.jpg',
    objectPosition: 'left bottom',
    targetNav: 'analytics',
  },
  {
    number: '17',
    title: 'Organizational Memory & Knowledge Vault',
    regionCorridor: 'Asia & Oceania (East)',
    metric: 'AES-256 Tenant Isolation',
    description: 'Indexes company policies, contracts, and product catalogs for instant verified answers.',
    imageUrl: '/src/assets/images/omni_blue_security_vault_1791085498877.jpg',
    objectPosition: 'left top',
    targetNav: 'analytics',
  },
  {
    number: '18',
    title: 'Creator Marketplace & Industry Packs',
    regionCorridor: 'Asia & Oceania (East)',
    metric: '80% Creator Revenue Share',
    description: 'One-click "Launch My Business" industry templates or monetize your own custom AI agents.',
    imageUrl: '/src/assets/images/omni_blue_marketplace_pack_1791084531550.jpg',
    objectPosition: 'right top',
    targetNav: 'marketplace',
  },
  {
    number: '19',
    title: 'Multi-Currency Treasury & FX Ledger',
    regionCorridor: 'Asia & Oceania (East)',
    metric: '11 Global Currencies',
    description: 'Retains original transaction currency and FX timestamps across UGX, KES, NGN, ZAR, USD, EUR, GBP.',
    imageUrl: '/src/assets/images/omni_blue_fintech_payments_1791085476625.jpg',
    objectPosition: 'right bottom',
    targetNav: 'wallet',
  },
  {
    number: '20',
    title: 'Enterprise Security Center & Public API',
    regionCorridor: 'Asia & Oceania (East)',
    metric: '94/100 Security Rating',
    description: 'Hardware passkeys, MFA, session controls, REST webhooks, and official Python SDK.',
    imageUrl: '/src/assets/images/omni_blue_security_vault_1791085498877.jpg',
    objectPosition: 'right center',
    targetNav: 'settings',
  },
];


export interface MarketplaceListing {
  id: string;
  title: string;
  category: 'AI Agent' | 'Workflow' | 'Template' | 'Business Pack';
  industry: string;
  creator: string;
  priceUSD: number;
  rating: number;
  installs: number;
  description: string;
  installed: boolean;
}

export const INITIAL_MARKETPLACE_ITEMS: MarketplaceListing[] = [
  {
    id: 'mp-1',
    title: 'Complete Ecommerce Growth System',
    category: 'Business Pack',
    industry: 'Ecommerce & D2C',
    creator: 'OMNI Official Studio',
    priceUSD: 49,
    rating: 4.9,
    installs: 3420,
    description: 'Includes Abandoned Cart Recovery, VIP Tier Segmentation, Dynamic Offer Generator, and Weekly SKU Margin Report.',
    installed: true,
  },
  {
    id: 'mp-2',
    title: 'Real Estate Autonomous Sales Agent',
    category: 'AI Agent',
    industry: 'Real Estate',
    creator: 'PropTech Labs',
    priceUSD: 29,
    rating: 4.8,
    installs: 1890,
    description: 'Qualifies property inquiries 24/7, matches buyer budgets against listings, and schedules viewings in Google Calendar.',
    installed: false,
  },
  {
    id: 'mp-3',
    title: 'Automated Multi-Touch Customer Follow-Up',
    category: 'Workflow',
    industry: 'Agencies & B2B',
    creator: 'Vanguard Automation',
    priceUSD: 19,
    rating: 4.9,
    installs: 4150,
    description: '7-step intelligent CRM follow-up sequence that adapts tone based on prospect email opens and website visits.',
    installed: true,
  },
  {
    id: 'mp-4',
    title: 'Restaurant & Hospitality Marketing System',
    category: 'Template',
    industry: 'Restaurants & Hotels',
    creator: 'Hospitality AI Collective',
    priceUSD: 24,
    rating: 4.7,
    installs: 980,
    description: 'Reservation reminders, post-dining review generation, weekend table-fill campaigns, and local SEO optimizer.',
    installed: false,
  },
  {
    id: 'mp-5',
    title: 'B2B Cybersecurity Lead Prospector Pack',
    category: 'Business Pack',
    industry: 'Professional Services',
    creator: 'SecOps Growth',
    priceUSD: 39,
    rating: 4.8,
    installs: 1120,
    description: 'Privacy-compliant ICP research workspace, security audit lead magnet landing page, and executive outreach cadence.',
    installed: false,
  },
  {
    id: 'mp-6',
    title: 'Creator & Freelancer Client OS',
    category: 'Template',
    industry: 'Creators & Freelancers',
    creator: 'Studio Akankwasa',
    priceUSD: 0,
    rating: 5.0,
    installs: 6840,
    description: 'Launch My Business starter kit: proposal generator, invoice follow-ups, client onboarding portal, and content calendar.',
    installed: true,
  },
];

export interface SubscriptionPlan {
  id: string;
  name: string;
  audience: string;
  monthlyPriceUSD: number;
  annualPriceUSD: number;
  aiCreditsMonthly: string;
  activeAgentsLimit: string;
  automationRuns: string;
  supportLevel: string;
  popular?: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    audience: 'For solo founders exploring OMNI',
    monthlyPriceUSD: 0,
    annualPriceUSD: 0,
    aiCreditsMonthly: '500 AI Credits',
    activeAgentsLimit: '2 Active AI Agents',
    automationRuns: '100 runs / mo',
    supportLevel: 'Help Centre & AI Assistant',
  },
  {
    id: 'starter',
    name: 'Starter',
    audience: 'For freelancers & early startups',
    monthlyPriceUSD: 19,
    annualPriceUSD: 15,
    aiCreditsMonthly: '2,500 AI Credits',
    activeAgentsLimit: '5 Active AI Agents',
    automationRuns: '1,500 runs / mo',
    supportLevel: 'Standard Email & AI Support',
  },
  {
    id: 'growth',
    name: 'Growth',
    audience: 'For scaling businesses & stores',
    monthlyPriceUSD: 49,
    annualPriceUSD: 39,
    aiCreditsMonthly: '10,000 AI Credits',
    activeAgentsLimit: 'All 14 AI Agents',
    automationRuns: '10,000 runs / mo',
    supportLevel: 'Priority Support + Autopilot Mode',
    popular: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    audience: 'For high-volume brands & agencies',
    monthlyPriceUSD: 149,
    annualPriceUSD: 119,
    aiCreditsMonthly: '35,000 AI Credits',
    activeAgentsLimit: 'Unlimited Custom Agents',
    automationRuns: '50,000 runs / mo',
    supportLevel: '24/7 Priority + API Webhooks',
  },
  {
    id: 'business',
    name: 'Business',
    audience: 'For multi-team organizations',
    monthlyPriceUSD: 499,
    annualPriceUSD: 399,
    aiCreditsMonthly: '150,000 AI Credits',
    activeAgentsLimit: 'Unlimited + Multi-Workspace',
    automationRuns: '250,000 runs / mo',
    supportLevel: 'Dedicated Success Manager + RBAC',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    audience: 'For global corporations & custom SLAs',
    monthlyPriceUSD: 1490,
    annualPriceUSD: 1190,
    aiCreditsMonthly: 'Custom Unlimited Pool',
    activeAgentsLimit: 'Custom Governance & On-Premise',
    automationRuns: 'Unlimited Enterprise SLA',
    supportLevel: 'Dedicated Solutions Architect',
  },
];
