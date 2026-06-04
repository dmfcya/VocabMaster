import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Word, NotebookWord } from '../types/word';

interface NotebookStoreState {
  words: NotebookWord[];
  selectedWordIds: string[];

  addWord: (word: Word) => void;
  removeWord: (notebookId: string) => void;
  isWordInNotebook: (wordId: string) => boolean;
  toggleWordSelection: (notebookId: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  markAsReviewed: (notebookId: string) => void;
  getStats: () => { total: number; byCategory: Record<string, number> };
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export const useNotebookStore = create<NotebookStoreState>()(
  persist(
    (set, get) => ({
      words: [],
      selectedWordIds: [],

      addWord: (word: Word) => {
        const { words } = get();
        if (words.some((w) => w.wordId === word.id)) return;

        const entry: NotebookWord = {
          id: generateId(),
          wordId: word.id,
          word: word.word,
          category: word.category,
          definition: word.definition,
          addedAt: Date.now(),
          lastReviewedAt: null,
          reviewCount: 0,
        };
        set({ words: [...words, entry] });
      },

      removeWord: (notebookId: string) => {
        const { words, selectedWordIds } = get();
        set({
          words: words.filter((w) => w.id !== notebookId),
          selectedWordIds: selectedWordIds.filter((id) => id !== notebookId),
        });
      },

      isWordInNotebook: (wordId: string) => {
        return get().words.some((w) => w.wordId === wordId);
      },

      toggleWordSelection: (notebookId: string) => {
        const { selectedWordIds } = get();
        const isSelected = selectedWordIds.includes(notebookId);
        if (isSelected) {
          set({ selectedWordIds: selectedWordIds.filter((id) => id !== notebookId) });
        } else {
          if (selectedWordIds.length >= 10) return; // Max 10 words
          set({ selectedWordIds: [...selectedWordIds, notebookId] });
        }
      },

      selectAll: () => {
        set({ selectedWordIds: get().words.map((w) => w.id).slice(0, 10) });
      },

      deselectAll: () => {
        set({ selectedWordIds: [] });
      },

      markAsReviewed: (notebookId: string) => {
        const { words } = get();
        set({
          words: words.map((w) =>
            w.id === notebookId
              ? { ...w, reviewCount: w.reviewCount + 1, lastReviewedAt: Date.now() }
              : w
          ),
        });
      },

      getStats: () => {
        const { words } = get();
        const byCategory: Record<string, number> = {};
        words.forEach((w) => {
          byCategory[w.category] = (byCategory[w.category] || 0) + 1;
        });
        return { total: words.length, byCategory };
      },
    }),
    {
      name: 'vocab-notebook',
      partialize: (state) => ({
        words: state.words,
      }),
    }
  )
);
