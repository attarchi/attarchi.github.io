'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button, Card, CardContent, CardHeader } from '@/components/micro';

// Animation variants for the success checkmark
const checkmarkVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.6, ease: "easeInOut" },
      opacity: { duration: 0.3 }
    }
  }
};

// Container animation variants
const containerVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
};

// Item animation variants
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function ThankYouPage() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-background text-text px-4"
      data-testid="thank-you-container"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card className="bg-surface border border-muted/20 shadow-lg" variant="elevated">
          <CardHeader className="text-center pb-4">
            <motion.div
              variants={itemVariants}
              className="mx-auto mb-6 relative"
            >
              {/* Animated green circle background */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.2,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center"
              >
                {/* Animated checkmark SVG */}
                <motion.svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-green-500"
                  data-testid="success-checkmark"
                  initial="hidden"
                  animate="visible"
                >
                  <motion.path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={checkmarkVariants}
                  />
                </motion.svg>
              </motion.div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-2xl font-mono font-semibold text-text mb-2"
            >
              Thank You!
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-muted font-normal"
            >
              Your message has been sent successfully. I'll get back to you as soon as possible.
            </motion.p>
          </CardHeader>

          <CardContent className="text-center">
            <motion.div variants={itemVariants}>
              <Button
                onClick={handleBackToHome}
                className="w-full bg-accent hover:bg-accent/90 text-background font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                size="lg"
              >
                Back to Home
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 