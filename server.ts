import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), aiAvailable: !!process.env.GEMINI_API_KEY });
  });

  // AI Assistant Query Endpoint
  app.post('/api/ai/ask', async (req, res) => {
    try {
      const { prompt, context } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      if (!ai) {
        // Fallback response if GEMINI_API_KEY is missing or initializing
        return res.json({
          reply: `[AXON Pilot Offline Mode]: Processing requested command "${prompt}". Current metrics show 1,435 total orders with $162,900 revenue. Key priority: Restock AXON Wireless Headphones before inventory reaches zero in 3 days.`,
          actionSuggestions: [
            { id: 'act-1', title: 'Generate Automated Supplier Purchase Order', priority: 'High', type: 'Inventory' },
            { id: 'act-2', title: 'Launch Flash Retargeting Campaign for Abandoned Carts', priority: 'Medium', type: 'Marketing' }
          ]
        });
      }

      const systemInstruction = `You are AXON Pilot, an elite AI E-Commerce Executive Copilot and Chief Operating Officer for an online store.
You have real-time access to dashboard metrics (Revenue: $162.9k, Orders: 1,435, Inventory: 18,420 units across 80 SKUs, Net Margin: 28.6%, Ad Spend: $18.4k, CAC: $24.10, LTV: $380, Low stock items: 5).
Provide concise, highly actionable, strategic insights, root-cause analyses, or execution scripts.
Format your output with clear markdown headings, bullet points, and actionable next steps.
Always be professional, crisp, and direct.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt + (context ? `\n\n[Current Dashboard Context: ${JSON.stringify(context)}]` : ''),
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'No response generated.';
      return res.json({ reply: replyText });
    } catch (err: any) {
      console.error('Error in /api/ai/ask:', err);
      return res.status(500).json({
        error: 'Failed to process AI query',
        details: err?.message || 'Unknown server error'
      });
    }
  });

  // AI Strategic Risk & Opportunity Scanner Endpoint
  app.post('/api/ai/analyze', async (req, res) => {
    try {
      const { metrics } = req.body;

      if (!ai) {
        return res.json({
          summary: 'AXON AI Analysis Complete (Standard Engine)',
          risks: [
            'Low inventory on top seller SKU-HEADPHONES-PRO (Est. stockout in 3.2 days)',
            'Checkout abandonment spike (+4.2% on Mobile Safari)'
          ],
          opportunities: [
            'Cross-sell accessory bundle with smart watches (+ $14,200 potential MRR)',
            'Optimize Meta Ads targeting for 25-34 demographic (+1.8x ROAS)'
          ],
          recommendedActions: [
            'Trigger automated PO #4091 to Shenzhen Electronics Co.',
            'Deploy 1-click Apple Pay checkout patch to reduce friction'
          ]
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Analyze these e-commerce metrics and generate 3 top risks, 3 high-yield opportunities, and 3 priority recommended actions:\n${JSON.stringify(metrics || {})}`,
        config: {
          systemInstruction: 'Output valid JSON with keys: risks (array of strings), opportunities (array of strings), recommendedActions (array of strings), and summary (string).',
          responseMimeType: 'application/json',
        },
      });

      try {
        const data = JSON.parse(response.text || '{}');
        return res.json(data);
      } catch (pErr) {
        return res.json({
          summary: 'AI Analysis completed successfully.',
          rawText: response.text
        });
      }
    } catch (err: any) {
      console.error('Error in /api/ai/analyze:', err);
      return res.status(500).json({ error: 'AI analysis request failed' });
    }
  });

  // AI Marketing Campaign Creator
  app.post('/api/ai/campaign', async (req, res) => {
    try {
      const { productName, targetAudience, goal } = req.body;

      if (!ai) {
        return res.json({
          headline: `Upgrade Your Audio Experience with ${productName || 'AXON Pro Headphones'}`,
          body: `Engineered for crisp acoustics and active noise cancellation. Order today and receive free express delivery & 2-year extended warranty!`,
          suggestedChannels: ['Meta Ads', 'Klaviyo VIP Email', 'Google Search'],
          estimatedROAS: '4.5x'
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Create an e-commerce ad campaign copy for product: "${productName || 'AXON Wireless Studio Buds'}". Target Audience: "${targetAudience || 'Tech Enthusiasts, Remote Workers'}". Campaign Goal: "${goal || 'Increase Sales & Clear High Margin Inventory'}".`,
        config: {
          systemInstruction: 'Output JSON with keys: headline, body, callToAction, suggestedChannels (array), estimatedROAS.',
          responseMimeType: 'application/json',
        },
      });

      const data = JSON.parse(response.text || '{}');
      return res.json(data);
    } catch (err: any) {
      console.error('Error in /api/ai/campaign:', err);
      return res.status(500).json({ error: 'Campaign generation failed' });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AXON Pilot Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
