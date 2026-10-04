import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Minimize2,
  Maximize2,
  X,
  Sparkles,
  ArrowUpRight,
  Globe,
  CreditCard,
} from 'lucide-react';
import { CurrencyCode, NavSection } from '../data/omniData';

interface ChatMessage {
  id: string;
  role: 'user' | 'omni';
  text: string;
  suggestedAction?: string;
  recommendedNav?: NavSection;
  timestamp: string;
}

interface OmniChatbotAtLargeProps {
  currentCurrency: CurrencyCode;
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  onTriggerCommand: (cmd: string) => void;
}

export const OmniChatbotAtLarge: React.FC<OmniChatbotAtLargeProps> = ({
  currentCurrency,
  activeSection,
  onNavigate,
  onTriggerCommand,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpandedAtLarge, setIsExpandedAtLarge] = useState(false);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      role: 'omni',
      text: 'Welcome to OMNI Chatbot At-Large (Founded by Proprietor Caleb Akankwasa). I coordinate your 14 AI agents, West-to-East 6-continent market intelligence, and Ugandan (MTN MoMo, Airtel Money, Stanbic, Centenary) + Pan-African & Global payment corridors. How can I help grow your business right now?',
      suggestedAction: 'Explore Ugandan & African Payment Rails in Wallet',
      recommendedNav: 'wallet',
      timestamp: 'Online · West-to-East Mesh',
    },
  ]);

  const quickPrompts = [
    'Set up MTN MoMo & Airtel Money Uganda payouts',
    'Compare West-to-East revenue across all 6 continents',
    'How do I get 100 new customers this month?',
    'Connect Flutterwave, Paystack & M-Pesa',
  ];

  const handleSend = async (customText?: string) => {
    const textToSend = (customText ?? input).trim();
    if (!textToSend || isSending) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setIsSending(true);

    try {
      const res = await fetch('/api/omni/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-6),
          currentCurrency,
          activeSection,
        }),
      });
      const data = await res.json();
      const omniMsg: ChatMessage = {
        id: `o-${Date.now()}`,
        role: 'omni',
        text:
          data.reply ||
          'I have analyzed your request across the OMNI Operating System and prepared the next workflow action.',
        suggestedAction: data.suggestedAction,
        recommendedNav: data.recommendedNav as NavSection,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, omniMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `o-${Date.now()}`,
          role: 'omni',
          text: `OMNI Executive processed "${textToSend}". You can execute this directly via the Universal Command Center or inspect your Ugandan, Pan-African, and Global payment rails in OMNI Wallet.`,
          suggestedAction: 'Execute in Command Center',
          recommendedNav: 'wallet',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-5 right-5 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#0284C7] text-white font-semibold text-xs shadow-lg border border-sky-400/40 flex items-center gap-2.5 hover:opacity-95 transition-opacity cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-sky-200" />
          <span>OMNI Chatbot At-Large</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`fixed z-50 transition-all ${
        isExpandedAtLarge
          ? 'inset-4 md:inset-10'
          : 'bottom-5 right-5 w-[92vw] sm:w-[440px] h-[560px]'
      } rounded-2xl border border-blue-400/40 dark:border-blue-700/80 bg-white dark:bg-[#071124] shadow-2xl flex flex-col overflow-hidden`}
    >
      {/* West-to-East Gradient Header */}
      <div className="px-4 py-3.5 bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#0284C7] text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-sky-200 shrink-0" />
          <div>
            <div className="text-xs font-display font-bold tracking-tight">
              OMNI Chatbot At-Large · Global AI Executive
            </div>
            <div className="text-[10px] text-sky-100">
              West-to-East 6 Continents · Ugandan, African & Global Rails
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsExpandedAtLarge(!isExpandedAtLarge)}
            title={isExpandedAtLarge ? 'Dock Chatbot' : 'Expand Chatbot At-Large'}
            className="p-1.5 rounded-lg hover:bg-white/15 cursor-pointer"
          >
            {isExpandedAtLarge ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            title="Minimize Chatbot"
            className="p-1.5 rounded-lg hover:bg-white/15 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-blue-50/30 dark:bg-[#050C1A]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl p-3.5 leading-relaxed ${
                m.role === 'user'
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#0284C7] text-white'
                  : 'bg-white dark:bg-[#0B1730] border border-blue-200/80 dark:border-blue-900/70 text-slate-800 dark:text-slate-100'
              }`}
            >
              <p>{m.text}</p>

              {m.suggestedAction && (
                <div className="mt-2.5 pt-2 border-t border-blue-100 dark:border-blue-800/70 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (m.recommendedNav) onNavigate(m.recommendedNav);
                      onTriggerCommand(m.suggestedAction!);
                    }}
                    className="text-blue-600 dark:text-sky-400 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{m.suggestedAction}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
          </div>
        ))}

        {isSending && (
          <div className="text-xs text-blue-600 dark:text-sky-400 font-mono">
            OMNI Chatbot At-Large is coordinating across 14 agents...
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="px-3 py-2 border-t border-blue-100 dark:border-blue-900/60 bg-white dark:bg-[#081226] flex items-center gap-1.5 overflow-x-auto">
        {quickPrompts.map((qp) => (
          <button
            key={qp}
            type="button"
            onClick={() => handleSend(qp)}
            className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/80 text-[11px] text-blue-700 dark:text-sky-300 hover:bg-blue-100 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 border-t border-blue-200/80 dark:border-blue-900/70 bg-white dark:bg-[#0B1528] flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask OMNI Chatbot At-Large anything (goals, UGX MoMo, 6 continents)..."
          className="flex-1 px-3.5 py-2.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-[#060D1E] text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isSending}
          className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#0284C7] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};
