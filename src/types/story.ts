export type StoryGenre =
  | 'sci-fi'
  | 'fantasy'
  | 'romance'
  | 'mystery'
  | 'comedy'
  | 'horror'
  | 'adventure'
  | 'fairy-tale'
  | 'daily-life';

export interface GenreDefinition {
  id: StoryGenre;
  label: string;
  emoji: string;
  description: string;
}

export const GENRES: GenreDefinition[] = [
  { id: 'sci-fi', label: 'Sci-Fi 科幻', emoji: '🚀', description: 'Futuristic tech, space exploration, AI' },
  { id: 'fantasy', label: 'Fantasy 奇幻', emoji: '🧙', description: 'Magic, mythical creatures, enchanted worlds' },
  { id: 'romance', label: 'Romance 爱情', emoji: '💕', description: 'Love stories, heartfelt connections' },
  { id: 'mystery', label: 'Mystery 悬疑', emoji: '🔍', description: 'Puzzles, detectives, unexpected twists' },
  { id: 'comedy', label: 'Comedy 喜剧', emoji: '😄', description: 'Humorous, witty, laugh-out-loud funny' },
  { id: 'horror', label: 'Horror 恐怖', emoji: '👻', description: 'Suspenseful, creepy, psychological fear' },
  { id: 'adventure', label: 'Adventure 冒险', emoji: '🗺️', description: 'Quests, exploration, epic journeys' },
  { id: 'fairy-tale', label: 'Fairy Tale 童话', emoji: '🏰', description: 'Magical, whimsical, moral lessons' },
  { id: 'daily-life', label: 'Daily Life 日常', emoji: '☕', description: 'Everyday moments, relatable stories' },
];

export interface GenerateStoryRequest {
  words: string[];
  genre: StoryGenre;
  language: 'zh' | 'en';
}

export interface Story {
  id: string;
  title: string;
  content: string;
  words: string[];
  genre: StoryGenre;
  language: 'zh' | 'en';
  createdAt: number;
  wordCount: number;
}
