import { Variants } from 'framer-motion';
import { AnimationVariants, SlideInVariants, TypewriterVariants } from '@/types';

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

export const projectStaggerVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 50
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

export const projectCardVariants: Variants = {
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

export const techBadgeVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
            delay: 0.3
        }
    }
};

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

export const categoryStaggerVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -50
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

export const categorySlideInVariants: Variants = {
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
};

export const skillStaggerVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

export const skillFadeVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut'
        }
    }
};

export const proficiencyScaleVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.5,
        transformOrigin: "left center"
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            delay: 0.3
        }
    }
};

export const proficiencyFillVariants: Variants = {
    hidden: {
        scaleX: 0,
        transformOrigin: "left center"
    },
    visible: {
        scaleX: 1,
        transition: {
            duration: 1.2,
            ease: "easeOut",
            delay: 0.8
        }
    }
}; 