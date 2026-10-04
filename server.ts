import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '25mb' }));

  // 1. OMNI AI Executive Command Endpoint
  app.post('/api/omni/execute-command', async (req, res) => {
    try {
      const { command, businessContext, activeAgents, currentCurrency } = req.body;
      if (!command) {
        return res.status(400).json({ error: 'Command is required' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `User Command: "${command}"
Business Context: ${JSON.stringify(businessContext || { company: 'OMNI Enterprise', revenue: 112400, omniScore: 82 })}
Active AI Agents: ${(activeAgents || ['OMNI CEO', 'Marketing Agent', 'Sales Agent', 'Analytics Agent']).join(', ')}
Preferred Currency: ${currentCurrency || 'USD'}

Act as OMNI AI Executive (the central strategic intelligence layer of OMNI — The World's AI Business Operating System, founded by Caleb Akankwasa).
Convert the user's goal/command into a structured execution plan following the workflow: Goal -> Understand -> Plan -> Ask approval where necessary -> Execute -> Measure -> Optimize -> Report.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              goalSummary: { type: Type.STRING, description: 'Clear 1-sentence strategic objective' },
              executiveAnalysis: { type: Type.STRING, description: 'Concise analysis of business impact and opportunity' },
              coordinatingAgents: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Ordered chain of specialized AI agents collaborating on this goal',
              },
              steps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    stepNumber: { type: Type.INTEGER },
                    stage: { type: Type.STRING, description: 'Understand, Plan, Approval, Execute, Measure, or Optimize' },
                    action: { type: Type.STRING },
                    assignedAgent: { type: Type.STRING },
                    permissionLevel: { type: Type.INTEGER, description: '1=Analyze, 2=Draft, 3=Auto Low-Risk, 4=Human Approval Required, 5=Restricted Safeguard' },
                    requiresApproval: { type: Type.BOOLEAN },
                    estimatedImpact: { type: Type.STRING },
                  },
                  required: ['stepNumber', 'stage', 'action', 'assignedAgent', 'permissionLevel', 'requiresApproval', 'estimatedImpact'],
                },
              },
              projectedMetricDelta: { type: Type.STRING, description: 'Quantified expected business outcome with timeframe' },
              riskAssessment: { type: Type.STRING, description: 'Key governance or operational risk and mitigation' },
            },
            required: ['goalSummary', 'executiveAnalysis', 'coordinatingAgents', 'steps', 'projectedMetricDelta', 'riskAssessment'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (error: any) {
      console.error('OMNI Command Error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate OMNI execution plan' });
    }
  });

  // 2. Natural-Language Automation Workflow Generator
  app.post('/api/omni/generate-workflow', async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Workflow prompt is required' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Build a visual no-code OMNI automation workflow for the following request: "${prompt}".
Include a sequence of nodes using types: WHEN (Trigger), THEN (Action), WAIT (Delay), IF (Condition), AI (Agent Intelligence).
Assign realistic permission levels (Observe, Draft, Approval Required, Automatic, Restricted).`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              workflowName: { type: Type.STRING },
              description: { type: Type.STRING },
              safetyMode: { type: Type.STRING, description: 'Observe, Draft, Approval Required, Automatic, or Restricted' },
              pythonCode: { type: Type.STRING, description: 'Equivalent Python SDK automation script using omni_os client' },
              nodes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    type: { type: Type.STRING, description: 'WHEN, THEN, WAIT, IF, or AI' },
                    title: { type: Type.STRING },
                    detail: { type: Type.STRING },
                    agent: { type: Type.STRING },
                    permission: { type: Type.STRING },
                  },
                  required: ['id', 'type', 'title', 'detail', 'agent', 'permission'],
                },
              },
            },
            required: ['workflowName', 'description', 'safetyMode', 'pythonCode', 'nodes'],
          },
        },
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (error: any) {
      console.error('Workflow Generation Error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate automation workflow' });
    }
  });

  // 3. Marketing Campaign & Website/Content Generator
  app.post('/api/omni/generate-marketing', async (req, res) => {
    try {
      const { prompt, mode, brandVoice } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Generate a comprehensive ${mode || 'campaign'} for: "${prompt}".
Brand Voice: ${brandVoice || 'Executive, clear, high-converting, trustworthy'}.
Include campaign strategy, target audience, headline, offer, ad copy, email sequence, and a clean semantic HTML5 landing page snippet.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              campaignTitle: { type: Type.STRING },
              audienceSegment: { type: Type.STRING },
              coreOffer: { type: Type.STRING },
              headline: { type: Type.STRING },
              adCopy: { type: Type.STRING },
              emailSubject: { type: Type.STRING },
              emailBody: { type: Type.STRING },
              landingPageCta: { type: Type.STRING },
              expectedRoi: { type: Type.STRING },
              htmlExport: { type: Type.STRING, description: 'Complete clean responsive HTML5 snippet for the landing page' },
            },
            required: [
              'campaignTitle',
              'audienceSegment',
              'coreOffer',
              'headline',
              'adCopy',
              'emailSubject',
              'emailBody',
              'landingPageCta',
              'expectedRoi',
              'htmlExport',
            ],
          },
        },
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (error: any) {
      console.error('Marketing Generation Error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate marketing assets' });
    }
  });

  // 4. Smart Transcription & Audio Intelligence (`gemini-3.5-transcribe` or `gemini-3.8-flash`)
  app.post('/api/omni/transcribe-analyze', async (req, res) => {
    try {
      const { transcriptText, question, audioBase64, mimeType } = req.body;

      if (audioBase64) {
        const audioResponse = await ai.models.generateContent({
          model: 'gemini-3.5-transcribe',
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: mimeType || 'audio/webm',
                  data: audioBase64,
                },
              },
              {
                text: 'Transcribe this audio recording accurately and identify key business action items.',
              },
            ],
          },
        });
        return res.json({ rawTranscript: audioResponse.text });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Analyze this business meeting transcript:
"""
${transcriptText}
"""
${question ? `Specific User Question: "${question}"` : 'Provide a complete executive breakdown.'}`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              directAnswer: { type: Type.STRING, description: 'Direct answer to the user question or key takeaway' },
              detectedLanguage: { type: Type.STRING },
              keyDecisions: { type: Type.ARRAY, items: { type: Type.STRING } },
              actionItems: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    owner: { type: Type.STRING },
                    task: { type: Type.STRING },
                    priority: { type: Type.STRING },
                  },
                  required: ['owner', 'task', 'priority'],
                },
              },
              followUpEmailDraft: { type: Type.STRING },
            },
            required: ['summary', 'directAnswer', 'detectedLanguage', 'keyDecisions', 'actionItems', 'followUpEmailDraft'],
          },
        },
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (error: any) {
      console.error('Transcription Intelligence Error:', error);
      res.status(500).json({ error: error.message || 'Failed to analyze transcript' });
    }
  });

  // 5. OMNI Voice Executive TTS (`gemini-3.8-flash-lite-tts`)
  app.post('/api/omni/tts', async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Text is required for speech synthesis' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text,
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        return res.status(500).json({ error: 'No audio returned from model' });
      }
      res.json({ audioWavBase64: base64Audio });
    } catch (error: any) {
      console.error('TTS Error:', error);
      res.status(500).json({ error: error.message || 'Speech synthesis failed' });
    }
  });

  // 6. OMNI Research Lab & AI Support Assistant
  app.post('/api/omni/research-or-support', async (req, res) => {
    try {
      const { query, mode } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents:
          mode === 'support'
            ? `You are OMNI AI Help Assistant. Diagnose this user issue on the OMNI platform: "${query}". Provide root cause, step-by-step fix, and an automated resolution action.`
            : `You are OMNI Research Lab Agent. Conduct a competitive & market intelligence analysis for: "${query}". Provide competitor positioning, strengths, weaknesses, pricing comparison, and strategic recommendations.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              diagnosisOrOverview: { type: Type.STRING },
              findings: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    detail: { type: Type.STRING },
                    metricOrImpact: { type: Type.STRING },
                  },
                  required: ['title', 'detail', 'metricOrImpact'],
                },
              },
              recommendedAction: { type: Type.STRING },
            },
            required: ['headline', 'diagnosisOrOverview', 'findings', 'recommendedAction'],
          },
        },
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (error: any) {
      console.error('Research/Support Error:', error);
      res.status(500).json({ error: error.message || 'Failed to complete request' });
    }
  });

  // 7. OMNI Chatbot At-Large (Conversational Multi-Turn AI Executive & Payment/Global Advisor)
  app.post('/api/omni/chat', async (req, res) => {
    try {
      const { message, history, currentCurrency, activeSection } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const formattedHistory = Array.isArray(history)
        ? history.map((m: any) => `${m.role === 'user' ? 'User' : 'OMNI'}: ${m.text}`).join('\n')
        : '';

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Conversation History:
${formattedHistory}

Current Active Module: ${activeSection || 'home'}
Preferred Currency: ${currentCurrency || 'UGX / USD'}
User Message: "${message}"

You are the OMNI Chatbot At-Large — the omnipresent AI Business Operating System assistant founded by Proprietor Caleb Akankwasa.
You assist users across all 6 inhabited continents (West-to-East alignment: North America, South America, Europe, Africa, Asia, Oceania) and support Ugandan local payment rails (MTN Mobile Money Uganda, Airtel Money Uganda, Stanbic Bank Uganda, Centenary Bank, DFCU, FlexiPay, Eversend, Chipper Cash), Pan-African gateways (M-Pesa, Flutterwave, Paystack, PesaPal, Cellulant, Mukuru), and global payment corridors.
Respond concisely with actionable guidance, suggested next steps, and optional navigation target.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: { type: Type.STRING, description: 'Clear, helpful executive response' },
              suggestedAction: { type: Type.STRING, description: '1-line actionable next step' },
              recommendedNav: {
                type: Type.STRING,
                description: 'One of: home, workforce, goals, automation, crm, marketing, analytics, transcriptions, worldmap, marketplace, wallet, billing, integrations, help, settings',
              },
            },
            required: ['reply', 'suggestedAction', 'recommendedNav'],
          },
        },
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (error: any) {
      console.error('OMNI Chatbot Error:', error);
      res.status(500).json({ error: error.message || 'Failed to process chat message' });
    }
  });

  // Public Developer API preview endpoints
  app.get('/api/v1/status', (_req, res) => {
    res.json({
      system: 'OMNI AI Business Operating System',
      proprietor: 'Caleb Akankwasa',
      version: '1.0.0',
      status: 'operational',
      timestamp: new Date().toISOString(),
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OMNI OS Server running on http://localhost:${PORT}`);
  });
}

startServer();
