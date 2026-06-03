import { Spinner } from '../ui/Spinner';

export function GenerationProgress() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-12 shadow-sm">
      <div className="flex flex-col items-center justify-center text-center">
        <Spinner size="lg" className="mb-6" />
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          ✨ AI is crafting your story...
        </h3>
        <p className="text-sm text-slate-500 max-w-sm">
          Weaving your vocabulary words into a memorable English story...
        </p>
      </div>
    </div>
  );
}
