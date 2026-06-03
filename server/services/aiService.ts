import Anthropic from '@anthropic-ai/sdk';
import type { StoryGenre } from '../../src/types/story';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const GENRE_DESCRIPTIONS: Record<StoryGenre, string> = {
  'sci-fi': 'science fiction — futuristic technology, space exploration, alternate realities, AI, robots',
  'fantasy': 'fantasy — magic, mythical creatures, enchanted worlds, wizards, dragons',
  'romance': 'romance — love stories, relationships, emotional connections, heartwarming encounters',
  'mystery': 'mystery — puzzles, investigations, detectives, unexpected twists, suspense',
  'comedy': 'comedy — humorous situations, witty dialogue, lighthearted and funny tone',
  'horror': 'horror — suspenseful, creepy atmosphere, psychological fear, supernatural elements',
  'adventure': 'adventure — quests, exploration, danger, treasure hunts, epic journeys',
  'fairy-tale': 'fairy tale — moral lessons, magical elements, whimsical, suitable for all ages',
  'daily-life': 'slice of life — everyday situations, relatable experiences, ordinary moments with meaning',
};

const STORY_STYLE_GUIDE = `
STORYTELLING PRINCIPLES:
- Hook the reader immediately with a strong opening line
- Every story needs a clear protagonist with a goal or desire
- Create tension or conflict (internal or external) that gets resolved
- End with a satisfying conclusion, twist, or emotional payoff
- Use vivid sensory details (sights, sounds, smells, textures)
- Vary sentence length — mix short punchy sentences with longer flowing ones
- Make the vocabulary words FEEL organic, never like a vocabulary list`;

const SYSTEM_PROMPT = `You are a master storyteller who helps English learners improve their vocabulary through truly memorable short stories.

Your mission: Write a COMPLETE, ENGAGING short story in English (100-300 words) that naturally incorporates ALL of the vocabulary words provided by the user.

${STORY_STYLE_GUIDE}

CRITICAL REQUIREMENTS:
1. Write in ENGLISH — this is for English learners, so the entire story must be in English.
2. You MUST naturally incorporate ALL vocabulary words provided. Do not skip any word. If you absolutely cannot fit one, explain why.
3. For each vocabulary word, wrap it in XML tags: <vocab word="THE_WORD">THE_WORD</vocab>
   Example: "She made the difficult decision to <vocab word="abandon">abandon</vocab> the sinking ship."
4. The story must be COMPLETE — beginning, middle, end. No cliffhangers unless it's a horror/mystery genre.
5. The story must be LOGICAL and COHERENT — events follow cause and effect.
6. The story must be INTERESTING and MEMORABLE — surprise the reader, make them feel something.
7. Length: 100-300 English words. Not too short, not too long.
8. Vocabulary words should feel like a NATURAL part of the story, not forced in.
9. Try to connect the vocabulary words thematically — if the words share a theme, build the story around that theme.

RESPONSE FORMAT:
You must respond with ONLY a valid JSON object (no markdown code fences, no surrounding text):
{
  "title": "An engaging English story title",
  "content": "Full English story text with <vocab word=\"X\">X</vocab> tags around vocabulary words",
  "wordsUsed": ["word1", "word2", "word3"]
}`;

function buildUserPrompt(words: string[], genre: StoryGenre): string {
  const genreDesc = GENRE_DESCRIPTIONS[genre];
  return `Genre: ${genreDesc}

Vocabulary words to incorporate: ${words.join(', ')}

Write me a complete, engaging English short story (100-300 words) that uses ALL of these words naturally. Make it memorable!

Remember:
- 100-300 English words
- Use ALL vocabulary words
- Wrap each vocab word in <vocab word="...">...</vocab>
- Make it a COMPLETE story with a satisfying ending
- Make it fun to read — surprise me!
- Respond with ONLY the JSON object (no markdown code fences)`;
}

export interface GeneratedStory {
  title: string;
  content: string;
  wordsUsed: string[];
}

export async function generateStory(
  words: string[],
  genre: StoryGenre,
  language: 'zh' | 'en' = 'en'
): Promise<GeneratedStory> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return generateMockStory(words, genre);
  }

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildUserPrompt(words, genre) }],
  });

  const text = response.content
    .filter((block) => block.type === 'text')
    .map((block) => (block as { type: 'text'; text: string }).text)
    .join('\n');

  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

  const parsed = JSON.parse(cleaned) as GeneratedStory;

  if (!parsed.title || !parsed.content || !parsed.wordsUsed) {
    throw new Error('AI response missing required fields');
  }

  return parsed;
}

// ─── Mock stories (used when no API key) ───

const MOCK_STORIES: Record<StoryGenre, Array<{ title: string; template: (words: string[]) => string }>> = {
  'sci-fi': [
    {
      title: 'The Last Transmission',
      template: (w) => `Dr. Chen stared at the flickering screen. The signal was ${word(w[0])} — unlike anything she had ever seen. For years, scientists had dismissed the possibility of alien life as merely ${word(w[1])}. But this was real.

"Captain, we need to ${word(w[2])} the protocol," she said, her voice trembling.

The ${word(w[3] || w[0])} patterns were undeniable. They weren't random noise; they were a message. She ${word(w.length > 4 ? w[4] : w[0])} every fragment of data, piecing together a puzzle that would change humanity forever.

With ${word(w.length > 5 ? w[5] : w[1])} determination, she began decoding. The message contained a warning — and an invitation. Earth had twenty-four hours to respond.

She took a deep breath. History would remember this moment.`,
    },
  ],
  'fantasy': [
    {
      title: 'The Enchanted Door',
      template: (w) => `Lila found the door at the back of the old library, hidden behind shelves of ${word(w[0])} books. It was made of wood that seemed to glow with an ${word(w[1])} light.

She pushed it open and stepped into a world she could barely ${word(w[2])}.

Floating islands drifted across a purple sky. Tiny creatures with ${word(w.length > 3 ? w[3] : w[0])} wings buzzed past her ears. A figure approached — an old woman with kind eyes.

"You have the ${word(w.length > 4 ? w[4] : w[1])} gift," the woman said. "But every gift demands a ${word(w.length > 5 ? w[5] : w[2])}."

Lila smiled. She had spent her whole life feeling ordinary. Not anymore.

"Teach me," she whispered. "I'm ready."`,
    },
  ],
  'romance': [
    {
      title: 'Rainy Day Coffee',
      template: (w) => `Emma didn't notice him until he spilled coffee on her notebook. The ${word(w[0])} stain spread across the page, ruining hours of work.

"I am so sorry," he said, his voice filled with genuine ${word(w[1])}.

She looked up — and forgot to be angry. His eyes were the kind of ${word(w[2])} that made you believe in fate.

"It's okay," she managed to ${word(w.length > 3 ? w[3] : w[0])}. "It was just a draft."

He insisted on buying her another coffee. One coffee turned into two, then three. They talked until the café closed.

Years later, at their wedding, he joked about that ${word(w.length > 4 ? w[4] : w[1])} first meeting. Emma just laughed and ${word(w.length > 5 ? w[5] : w[2])} his hand tighter.

Some accidents aren't accidents at all.`,
    },
  ],
  'mystery': [
    {
      title: 'The Missing Key',
      template: (w) => `Detective Rivera examined the ${word(w[0])} document on the desk. The handwriting was ${word(w[1])} — deliberately disguised, she was sure of it.

"The victim had no enemies," the butler said. "He was a man of ${word(w[2])} character."

Rivera wasn't convinced. She began to ${word(w.length > 3 ? w[3] : w[0])} the room inch by inch. Behind a painting, she found a small safe. Inside was a ${word(w.length > 4 ? w[4] : w[1])} box containing a single key.

The key didn't fit any lock in the house.

That's when Rivera noticed the ${word(w.length > 5 ? w[5] : w[2])} — a faint smell of jasmine perfume. The dead man's wife was allergic to jasmine.

The real mystery had just begun.`,
    },
  ],
  'comedy': [
    {
      title: 'The Worst Superpower Ever',
      template: (w) => `Kevin discovered his superpower on a Tuesday. He could ${word(w[0])} anything — but only on weekends.

"I want a refund," he told the universe. "This is completely ${word(w[1])}."

His best friend Mia found the situation ${word(w[2])}. "Think about it — you're a superhero who has to ${word(w.length > 3 ? w[3] : w[0])} everything on Friday nights."

Kevin tried to use his power for good. He ${word(w.length > 4 ? w[4] : w[1])} a plan. On Saturday morning, he'd save the city. On Sunday, he'd relax.

It worked perfectly — until he accidentally ${word(w.length > 5 ? w[5] : w[2])} his neighbor's cat into a talking philosopher.

The cat was very ${word(w.length > 6 ? w[6] : w[0])} about the meaning of life.

Kevin decided superheroing was overrated.`,
    },
  ],
  'horror': [
    {
      title: 'The Mirror Room',
      template: (w) => `The old house had a room full of mirrors. Everyone in town knew it was dangerous, but no one could ${word(w[0])} exactly why.

Maya decided to ${word(w[1])} the truth for herself.

She stepped inside at midnight. Her ${word(w[2])} multiplied across a hundred surfaces. But something was wrong — one of the reflections moved a second too late.

"Don't ${word(w.length > 3 ? w[3] : w[0])} your eyes," a voice whispered. "It knows when you look away."

Maya's heart raced. The ${word(w.length > 4 ? w[4] : w[1])} air grew cold. In the corner of her eye, she saw the reflection smile — even though her own face was frozen in terror.

She ran. The front door was gone.

The mirrors had ${word(w.length > 5 ? w[5] : w[2])} her inside.

Now she's just another reflection. Waiting. Smiling.`,
    },
  ],
  'adventure': [
    {
      title: 'The Forgotten Map',
      template: (w) => `The map was ${word(w[0])} in the attic, yellowed with age. Jack traced the faded ink with his finger. The route led to a ${word(w[1])} cave marked with a red X.

"I have to ${word(w[2])} this," he told his sister. "This could be the discovery of a lifetime."

They packed supplies and ${word(w.length > 3 ? w[3] : w[0])} through dense jungle for three days. The ${word(w.length > 4 ? w[4] : w[1])} terrain tested every ounce of their determination.

When they finally found the cave, it wasn't treasure that waited inside — it was something far more ${word(w.length > 5 ? w[5] : w[2])}.

An ancient library. Thousands of books. The lost ${word(w.length > 6 ? w[6] : w[0])} of a vanished civilization.

Jack's hands shook as he opened the first book. Some treasures aren't made of gold.`,
    },
  ],
  'fairy-tale': [
    {
      title: 'The Star Collector',
      template: (w) => `Once upon a time, in a village where ${word(w[0])} flowers bloomed all year, lived a girl named Iris. She had a most ${word(w[1])} dream — to collect fallen stars.

Every night, she would ${word(w[2])} the sky, waiting.

One evening, a star fell into the forest. Iris ran after it, her ${word(w.length > 3 ? w[3] : w[0])} heart racing. She found the star in a clearing, but it wasn't what she expected — it was a tiny, glowing creature.

"I'm lost," the star-creature said. "Can you ${word(w.length > 4 ? w[4] : w[1])} me home?"

Iris ${word(w.length > 5 ? w[5] : w[2])} and nodded. Together they climbed the highest mountain.

When the star returned to the sky, it left Iris a gift: the ability to speak with all the stars forever.

She never felt alone again.`,
    },
  ],
  'daily-life': [
    {
      title: 'Mrs. Chen\'s Garden',
      template: (w) => `Every morning, Mrs. Chen would ${word(w[0])} her tiny garden with the same care her grandmother once taught her. The ${word(w[1])} roses were her pride and joy.

Her neighbor Tom was a ${word(w[2])} businessman who never noticed the flowers. He rushed past them every day, phone in hand, ${word(w.length > 3 ? w[3] : w[0])} through life.

Then one morning, Tom's phone died on the front step. Forced to ${word(w.length > 4 ? w[4] : w[1])} the world around him, he finally noticed the garden.

"It's beautiful," he said, his voice filled with wonder.

Mrs. Chen smiled and ${word(w.length > 5 ? w[5] : w[2])} him a pair of gardening gloves. "Life isn't just about getting somewhere," she said. "Sometimes you need to stop and smell the ${word(w.length > 6 ? w[6] : w[0])}."

From that day on, Tom spent every Sunday morning in the garden. His ${word(w.length > 7 ? w[7] : w[1])} disappeared.

Turns out, the best medicine grows in the dirt.`,
    },
  ],
};

function word(w: string): string {
  return `<vocab word="${w}">${w}</vocab>`;
}

function generateMockStory(words: string[], genre: StoryGenre): GeneratedStory {
  const templates = MOCK_STORIES[genre];
  const template = templates[Math.floor(Math.random() * templates.length)];

  // Ensure we report all words as used (in the template, extra words may not appear)
  // So we build a best-effort usage list
  const content = template.template(words);
  const wordsUsed = words.filter((w) => content.includes(w));

  return {
    title: template.title,
    content: content.trim(),
    wordsUsed: wordsUsed.length >= Math.min(3, words.length) ? wordsUsed : words,
  };
}
