import { render, screen } from '@testing-library/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  createFramerMotionHelpers,
  waitForMotionComplete,
  getMotionState,
  triggerMotionAnimation,
  testMotionVariants
} from '../framer-motion-helpers';

describe('Framer Motion Helpers', () => {
  describe('createFramerMotionHelpers', () => {
    it('should create Framer Motion test helpers with default configuration', () => {
      const helpers = createFramerMotionHelpers();
      
      expect(helpers).toBeDefined();
      expect(helpers.waitForMotionComplete).toBeDefined();
      expect(helpers.getMotionState).toBeDefined();
      expect(helpers.triggerMotionAnimation).toBeDefined();
      expect(helpers.testMotionVariants).toBeDefined();
    });

    it('should create helpers with custom configuration', () => {
      const helpers = createFramerMotionHelpers({
        animationTimeout: 2000,
        defaultDuration: 500,
      });
      
      expect(helpers).toBeDefined();
    });
  });

  describe('waitForMotionComplete', () => {
    it('should wait for motion animation to complete', async () => {
      const { waitForMotionComplete } = createFramerMotionHelpers();
      
      const TestComponent = () => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          data-testid="motion-element"
        >
          Animated Content
        </motion.div>
      );

      render(<TestComponent />);
      
      await waitForMotionComplete('motion-element');
      
      const element = screen.getByTestId('motion-element');
      expect(element).toBeInTheDocument();
    });

    it('should wait for specific animation duration', async () => {
      const { waitForMotionComplete } = createFramerMotionHelpers();
      
      const TestComponent = () => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05 }}
          data-testid="motion-element"
        >
          Animated Content
        </motion.div>
      );

      render(<TestComponent />);
      
      await waitForMotionComplete('motion-element', 200);
      
      const element = screen.getByTestId('motion-element');
      expect(element).toBeInTheDocument();
    });

    it('should handle AnimatePresence components', async () => {
      const { waitForMotionComplete } = createFramerMotionHelpers();
      
      const TestComponent = ({ isVisible }: { isVisible: boolean }) => (
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              data-testid="presence-element"
            >
              Presence Content
            </motion.div>
          )}
        </AnimatePresence>
      );

      const { rerender } = render(<TestComponent isVisible={true} />);
      
      await waitForMotionComplete('presence-element');
      
      rerender(<TestComponent isVisible={false} />);
      
      await waitForMotionComplete('presence-element', 200);
    });
  });

  describe('getMotionState', () => {
    it('should get current motion state', () => {
      const { getMotionState } = createFramerMotionHelpers();
      
      const TestComponent = () => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-testid="motion-element"
        >
          Animated Content
        </motion.div>
      );

      render(<TestComponent />);
      
      const state = getMotionState('motion-element');
      expect(state).toBeDefined();
    });

    it('should get motion state with custom properties', () => {
      const { getMotionState } = createFramerMotionHelpers();
      
      const TestComponent = () => (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          data-testid="motion-element"
        >
          Animated Content
        </motion.div>
      );

      render(<TestComponent />);
      
      const state = getMotionState('motion-element', ['opacity', 'scale']);
      expect(state).toBeDefined();
    });
  });

  describe('triggerMotionAnimation', () => {
    it('should trigger motion animation programmatically', async () => {
      const { triggerMotionAnimation } = createFramerMotionHelpers();
      
      const TestComponent = () => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-testid="motion-element"
        >
          Animated Content
        </motion.div>
      );

      render(<TestComponent />);
      
      await triggerMotionAnimation('motion-element', { opacity: 1 });
      
      const element = screen.getByTestId('motion-element');
      expect(element).toBeInTheDocument();
    });

    it('should trigger animation with custom transition', async () => {
      const { triggerMotionAnimation } = createFramerMotionHelpers();
      
      const TestComponent = () => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-testid="motion-element"
        >
          Animated Content
        </motion.div>
      );

      render(<TestComponent />);
      
      await triggerMotionAnimation('motion-element', { opacity: 1 }, { duration: 0.1 });
      
      const element = screen.getByTestId('motion-element');
      expect(element).toBeInTheDocument();
    });
  });

  describe('testMotionVariants', () => {
    it('should test motion variants', () => {
      const { testMotionVariants } = createFramerMotionHelpers();
      
      const variants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.5 },
      };
      
      const TestComponent = () => (
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          data-testid="motion-element"
        >
          Variant Content
        </motion.div>
      );

      render(<TestComponent />);
      
      const result = testMotionVariants('motion-element', variants);
      expect(result).toBeDefined();
    });

    it('should test specific variant states', () => {
      const { testMotionVariants } = createFramerMotionHelpers();
      
      const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
      
      const TestComponent = () => (
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          data-testid="motion-element"
        >
          Variant Content
        </motion.div>
      );

      render(<TestComponent />);
      
      const result = testMotionVariants('motion-element', variants, ['hidden', 'visible']);
      expect(result).toBeDefined();
    });
  });

  describe('Performance testing', () => {
    it('should measure animation frame rate', async () => {
      const { measureAnimationPerformance } = createFramerMotionHelpers();
      
      const TestComponent = () => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          data-testid="motion-element"
        >
          Performance Test
        </motion.div>
      );

      render(<TestComponent />);
      
      const performance = await measureAnimationPerformance('motion-element');
      
      expect(performance).toBeDefined();
      expect(performance.frameRate).toBeDefined();
      expect(performance.duration).toBeDefined();
    });

    it('should detect animation performance issues', async () => {
      const { detectAnimationIssues } = createFramerMotionHelpers();
      
      const TestComponent = () => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          data-testid="motion-element"
        >
          Performance Test
        </motion.div>
      );

      render(<TestComponent />);
      
      const issues = await detectAnimationIssues('motion-element');
      
      expect(issues).toBeDefined();
      expect(Array.isArray(issues)).toBe(true);
    });
  });
}); 