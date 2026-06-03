import type { ReactNode } from 'react';

/**
 * Highlights vocabulary words in story content.
 * Replaces <vocab word="X">X</vocab> tags with <mark> elements.
 */
export function highlightStoryContent(content: string): string {
  return content.replace(
    /<vocab word="([^"]+)">([^<]+)<\/vocab>/g,
    (_, word, text) =>
      `<mark class="word-highlight" title="${word}">${text}</mark>`
  );
}

/**
 * Parses highlighted HTML into segments for React rendering.
 * Returns segments of type 'text' or 'vocab'.
 */
export interface HighlightSegment {
  type: 'text' | 'vocab';
  content: string;
  word?: string;
}

export function parseHighlightSegments(content: string): HighlightSegment[] {
  const segments: HighlightSegment[] = [];
  const regex = /<vocab word="([^"]+)">([^<]+)<\/vocab>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: content.slice(lastIndex, match.index),
      });
    }
    segments.push({
      type: 'vocab',
      content: match[2],
      word: match[1],
    });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < content.length) {
    segments.push({
      type: 'text',
      content: content.slice(lastIndex),
    });
  }

  return segments;
}
