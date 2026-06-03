import { Router, type Request, type Response } from 'express';
import { generateStory } from '../services/aiService';
import { v4 as uuidv4 } from 'uuid';
import type { Story } from '../../src/types/story';

const router = Router();

router.post('/generate', async (req: Request, res: Response) => {
  try {
    const { words, genre, language } = req.body;

    if (!words || !Array.isArray(words) || words.length < 3) {
      res.status(400).json({
        success: false,
        error: '至少需要 3 个单词',
      });
      return;
    }

    if (!genre) {
      res.status(400).json({
        success: false,
        error: '请选择故事类型',
      });
      return;
    }

    const generated = await generateStory(words, genre, language || 'zh');

    // Count actual English words (strip <vocab> tags first)
    const plainText = generated.content.replace(/<[^>]+>/g, '');
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;

    const story: Story = {
      id: uuidv4(),
      title: generated.title,
      content: generated.content,
      words: generated.wordsUsed,
      genre,
      language: language || 'en',
      createdAt: Date.now(),
      wordCount,
      source: generated.source,
    };

    res.json({
      success: true,
      data: story,
    });
  } catch (err) {
    console.error('Story generation error:', err);
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : '生成故事时发生错误',
    });
  }
});

export { router as storyRouter };
