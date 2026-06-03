import type { GenerateStoryRequest, Story } from '../types/story';
import type { ApiResponse } from '../types/common';

const API_BASE = '/api';

export async function generateStory(request: GenerateStoryRequest): Promise<Story> {
  const res = await fetch(`${API_BASE}/story/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  const json: ApiResponse<Story> = await res.json();

  if (!json.success || !json.data) {
    throw new Error(json.error || '生成故事失败，请重试');
  }

  return json.data;
}
