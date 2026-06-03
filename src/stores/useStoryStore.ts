import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Story } from '../types/story';

interface StoryStoreState {
  stories: Story[];
  isGenerating: boolean;
  generationError: string | null;
  currentStory: Story | null;

  addStory: (story: Story) => void;
  removeStory: (storyId: string) => void;
  setGenerating: (v: boolean) => void;
  setError: (msg: string | null) => void;
  setCurrentStory: (story: Story | null) => void;
}

export const useStoryStore = create<StoryStoreState>()(
  persist(
    (set) => ({
      stories: [],
      isGenerating: false,
      generationError: null,
      currentStory: null,

      addStory: (story: Story) => {
        set((s) => ({ stories: [story, ...s.stories] }));
      },

      removeStory: (storyId: string) => {
        set((s) => ({
          stories: s.stories.filter((st) => st.id !== storyId),
        }));
      },

      setGenerating: (v: boolean) => set({ isGenerating: v }),
      setError: (msg: string | null) => set({ generationError: msg }),
      setCurrentStory: (story: Story | null) => set({ currentStory: story }),
    }),
    {
      name: 'vocab-stories',
      partialize: (state) => ({
        stories: state.stories,
      }),
    }
  )
);
