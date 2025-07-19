'use client';


export interface SlideNavigationProps {
  currentIndex: number;
  maxIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onGoToIndex: (index: number) => void;
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export function SlideNavigation({
  currentIndex,
  maxIndex,
  onPrev,
  onNext,
  onGoToIndex,
  variant = 'desktop',
  className = '',
}: SlideNavigationProps) {
  const isMobile = variant === 'mobile';
  const buttonSize = isMobile ? 'p-3' : 'p-2';
  const iconSize = isMobile ? 'w-6 h-6' : 'w-5 h-5';
  const indicatorSize = isMobile ? 'w-3 h-3' : 'w-2 h-2';
  const indicatorSpacing = isMobile ? 'space-x-2' : 'space-x-1';

  const navigationDots = Array.from({ length: maxIndex + 1 }, (_, index) => index);

  return (
    <div className={`flex items-center ${isMobile ? 'justify-center space-x-4' : 'space-x-2'} ${className}`}>
      <button
        onClick={onPrev}
        disabled={currentIndex === 0}
        className={`${buttonSize} rounded-full bg-[#f6f8fa] dark:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] hover:bg-[#e9ecef] dark:hover:bg-[#30363d] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`}
        data-testid={isMobile ? "mobile-prev-slide-button" : "prev-slide-button"}
        aria-label="Previous milestone"
      >
        <svg className={`${iconSize} text-[#24292f] dark:text-[#f0f6fc]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
      </button>
      
      <div className={`flex ${indicatorSpacing}`} data-testid={isMobile ? "mobile-slide-indicators" : "slide-indicators"}>
        {navigationDots.map((dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => onGoToIndex(dotIndex)}
            className={`${indicatorSize} rounded-full transition-all duration-200 ${
              currentIndex === dotIndex 
                ? 'bg-[#0969da] dark:bg-[#58a6ff]' 
                : 'bg-[#d0d7de] dark:bg-[#30363d] hover:bg-[#b1b8c0] dark:hover:bg-[#656d76]'
            }`}
            data-testid={isMobile ? `mobile-slide-indicator-${dotIndex}` : `slide-indicator-${dotIndex}`}
            aria-label={`Show milestones starting from position ${dotIndex + 1}`}
          />
        ))}
      </div>
      
      <button
        onClick={onNext}
        disabled={currentIndex === maxIndex}
        className={`${buttonSize} rounded-full bg-[#f6f8fa] dark:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] hover:bg-[#e9ecef] dark:hover:bg-[#30363d] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`}
        data-testid={isMobile ? "mobile-next-slide-button" : "next-slide-button"}
        aria-label="Next milestone"
      >
        <svg className={`${iconSize} text-[#24292f] dark:text-[#f0f6fc]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </button>
    </div>
  );
} 