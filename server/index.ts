import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { storyRouter } from './routes/story';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Detect if we have a built frontend to serve
const distPath = path.resolve(__dirname, '..', 'dist');
const hasStaticFiles = fs.existsSync(distPath);

// CORS — allow Vite dev server when running separately
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));

app.use(express.json());

// ─── API routes ───
app.use('/api/story', storyRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', servingStatic: hasStaticFiles });
});

// ─── Serve built frontend (if dist/ exists) ───
if (hasStaticFiles) {
  app.use(express.static(distPath));

  // SPA fallback — all non-API routes serve index.html
  app.use((_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 VocabMaster server running on http://localhost:${PORT}`);
  if (hasStaticFiles) {
    console.log(`   📦 Serving static files from dist/`);
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log('   ⚠️  ANTHROPIC_API_KEY not set — using mock story generation');
  }
});
