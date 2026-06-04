import { cn } from '../../utils/cn';
import { useTTS } from '../../hooks/useTTS';

interface SpeakButtonProps {
  word: string;
  className?: string;
}

export function SpeakButton({ word, className }: SpeakButtonProps) {
  const { speak, isSpeaking } = useTTS();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        speak(word);
      }}
      className={cn(
        'inline-flex items-center justify-center rounded-full p-1.5 transition-colors cursor-pointer',
        isSpeaking
          ? 'text-primary-500 bg-primary-50'
          : 'text-slate-400 hover:text-primary-500 hover:bg-primary-50',
        className
      )}
      title={isSpeaking ? '正在朗读...' : '朗读发音'}
      aria-label={`朗读 ${word}`}
    >
      {/* Speaker icon */}
      <svg
        className={cn('w-4 h-4', isSpeaking && 'animate-pulse')}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Speaker body */}
        <path d="M11 5L6 9H2v6h4l5 4V5z" fill={isSpeaking ? 'currentColor' : 'none'} stroke="currentColor" />
        {/* Sound waves - show when speaking */}
        {isSpeaking && (
          <>
            <path d="M15.54 8.46a5 5 0 010 7.07" />
            <path d="M19.07 4.93a10 10 0 010 14.14" />
          </>
        )}
        {!isSpeaking && (
          <path d="M15.54 8.46a5 5 0 010 7.07" opacity={0.4} />
        )}
      </svg>
    </button>
  );
}
