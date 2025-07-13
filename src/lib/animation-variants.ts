import { Variants } from 'framer-motion';

// Type definitions for animation variants
export interface AnimationVariants {
    hidden: Record<string, any>;
    visible: Record<string, any>;
    hover?: Record<string, any>;
    tap?: Record<string, any>;
    exit?: Record<string, any>;
}

export interface SlideInVariants {
    left: AnimationVariants;
    right: AnimationVariants;
}

export interface TypewriterVariants extends AnimationVariants {
    typing: Record<string, any>;
}

// Section variants for main sections (opacity 0→1, y: 50→0, duration: 0.8s, easeOut)
export const sectionVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 50
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    }
};

// Stagger variants for staggered children animations
export const staggerVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

// Slide up variants for elements sliding up from bottom
export const slideUpVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    }
};

// Slide in variants for elements sliding in from sides (left/right)
export const slideInVariants: SlideInVariants = {
    left: {
        hidden: {
            opacity: 0,
            x: -50
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: 'easeOut'
            }
        }
    },
    right: {
        hidden: {
            opacity: 0,
            x: 50
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: 'easeOut'
            }
        }
    }
};

// Scale variants for elements that scale in (hover effects)
export const scaleVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.2,
            ease: 'easeOut'
        }
    },
    tap: {
        scale: 0.95
    }
};

// Typewriter variants for typewriter text animation
export const typewriterVariants: TypewriterVariants = {
    hidden: {
        opacity: 0,
        width: 0
    },
    visible: {
        opacity: 1,
        width: '100%',
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    },
    typing: {
        width: '100%',
        transition: {
            duration: 2,
            ease: 'linear'
        }
    }
};

// Fade variants for simple fade in/out
export const fadeVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: 'easeIn'
        }
    }
};

// Utility function to create custom variants with custom timing
export function createCustomVariants(
    baseVariants: Variants,
    customDuration?: number,
    customDelay?: number
): Variants {
    const duration = customDuration ?? 0.8;
    const delay = customDelay ?? 0;

    return {
        ...baseVariants,
        visible: {
            ...baseVariants.visible,
            transition: {
                ...(baseVariants.visible as any)?.transition,
                duration,
                delay
            }
        }
    };
}

// Utility function to create stagger variants with custom timing
export function createStaggerVariants(
    staggerDelay: number = 0.1,
    delayChildren: number = 0.2
): Variants {
    return {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
                staggerChildren: staggerDelay,
                delayChildren
            }
        }
    };
} 