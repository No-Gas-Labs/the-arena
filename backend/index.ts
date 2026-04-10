import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Quad-exposure endpoint - sends prompt to 4 AI models
app.post('/api/quad-exposure', async (req: Request, res: Response) => {
  try {
    const { prompt, systemPrompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Simulate quad-exposure (in production, call actual APIs)
    const responses = {
      gemini: {
        model: 'Gemini',
        response: 'Gemini response to: ' + prompt,
        tokens: 150,
        latency: 1200,
      },
      grok: {
        model: 'Grok',
        response: 'Grok response to: ' + prompt,
        tokens: 180,
        latency: 1400,
      },
      claude: {
        model: 'Claude',
        response: 'Claude response to: ' + prompt,
        tokens: 165,
        latency: 1100,
      },
      chatgpt: {
        model: 'ChatGPT',
        response: 'ChatGPT response to: ' + prompt,
        tokens: 155,
        latency: 950,
      },
    };

    res.json({
      prompt,
      responses,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in quad-exposure:', error);
    res.status(500).json({ error: 'Failed to process quad-exposure' });
  }
});

// Publishing endpoint
app.post('/api/publish', async (req: Request, res: Response) => {
  try {
    const { content, channels } = req.body;

    if (!content || !channels || channels.length === 0) {
      return res.status(400).json({ error: 'Content and channels are required' });
    }

    const results = channels.map((channel: string) => ({
      channel,
      status: 'published',
      url: `https://${channel}.com/post/12345`,
      timestamp: new Date().toISOString(),
    }));

    res.json({
      content,
      results,
      message: 'Published to all channels',
    });
  } catch (error) {
    console.error('Error in publish:', error);
    res.status(500).json({ error: 'Failed to publish' });
  }
});

// Blockchain claiming endpoint
app.post('/api/claim-seniority', async (req: Request, res: Response) => {
  try {
    const { content, network } = req.body;

    if (!content || !network) {
      return res.status(400).json({ error: 'Content and network are required' });
    }

    // Generate mock hash
    const hash = 'Qm' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    res.json({
      network,
      hash,
      timestamp: new Date().toISOString(),
      message: `Content claimed on ${network}`,
    });
  } catch (error) {
    console.error('Error in claim-seniority:', error);
    res.status(500).json({ error: 'Failed to claim seniority' });
  }
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'THE ARENA API - Quad-Exposure AI Ensemble',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      quadExposure: 'POST /api/quad-exposure',
      publish: 'POST /api/publish',
      claimSeniority: 'POST /api/claim-seniority',
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 THE ARENA API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});
