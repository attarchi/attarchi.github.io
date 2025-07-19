
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
  const testIdPrefix = isMobile ? 'mobile' : '';
  
  return (
    <div className={`slide-navigation ${className}`} data-testid={`${testIdPrefix}slide-navigation`}>
      <button
        onClick={onPrev}
        disabled={currentIndex === 0}
        data-testid={`${testIdPrefix}prev-slide-button`}
        aria-label="Previous milestone"
      >
        Previous
      </button>
      
      <div data-testid={`${testIdPrefix}slide-indicators`}>
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            onClick={() => onGoToIndex(index)}
            data-testid={`${testIdPrefix}slide-indicator-${index}`}
            aria-label={`Show milestones starting from position ${index + 1}`}
          >
            {index}
          </button>
        ))}
      </div>
      
      <button
        onClick={onNext}
        disabled={currentIndex === maxIndex}
        data-testid={`${testIdPrefix}next-slide-button`}
        aria-label="Next milestone"
      >
        Next
      </button>
    </div>
  );
} 