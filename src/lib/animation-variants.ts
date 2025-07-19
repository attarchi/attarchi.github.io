import { Variants } from 'framer-motion';

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
    customDuration?: number,
    customDelay?: number
): Variants {
    return {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: customDuration || 0.8,
                delay: customDelay || 0,
                ease: 'easeOut'
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
                delayChildren: delayChildren
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
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const categorySlideInVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -30
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut'
        }
    }
};

export const skillProgressVariants: Variants = {
    hidden: {
        width: 0
    },
    visible: {
        width: '100%',
        transition: {
            duration: 1.2,
            ease: 'easeOut'
        }
    }
};

export const timelineVariants: Variants = {
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
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

export const timelineItemVariants: Variants = {
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

export const contactFormVariants: Variants = {
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

export const buttonVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.9
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
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

export const cardVariants: Variants = {
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
    },
    hover: {
        y: -5,
        transition: {
            duration: 0.2,
            ease: 'easeOut'
        }
    }
};

export const badgeVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: 'easeOut'
        }
    },
    hover: {
        scale: 1.1,
        transition: {
            duration: 0.2,
            ease: 'easeOut'
        }
    }
};

export const iconVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    },
    hover: {
        scale: 1.2,
        transition: {
            duration: 0.2,
            ease: 'easeOut'
        }
    }
};

export const textVariants: Variants = {
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

export const headingVariants: Variants = {
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

export const listVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const listItemVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -20
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    }
}; 