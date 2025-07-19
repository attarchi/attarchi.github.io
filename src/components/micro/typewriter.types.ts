export interface TypewriterProps {
    text: string;
    speed?: number;
    className?: string;
    onComplete?: () => void;
}

export interface CenteredTypewriterProps extends TypewriterProps {
    // CenteredTypewriter uses the same props as Typewriter
} 