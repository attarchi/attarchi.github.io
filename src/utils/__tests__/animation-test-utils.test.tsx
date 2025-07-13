import { render, screen } from '@testing-library/react';
import { motion } from 'framer-motion';
import { createAnimationTestUtils } from '../animation-test-utils';

describe('Animation Test Utils', () => {
  describe('createAnimationTestUtils', () => {
    it('should create animation test utilities with default configuration', () => {
      const utils = createAnimationTestUtils();
      
      expect(utils).toBeDefined();
      expect(utils.renderWithAnimation).toBeDefined();
      expect(utils.waitForAnimation).toBeDefined();
      expect(utils.getAnimationState).toBeDefined();
      expect(utils.mockIntersectionObserver).toBeDefined();
    });

    it('should create utilities with custom configuration', () => {
      const utils = createAnimationTestUtils({
        animationDuration: 1000,
        intersectionThreshold: 0.5,
      });
      
      expect(utils).toBeDefined();
    });
  });

  describe('renderWithAnimation', () => {
    it('should render component with animation context', () => {
      const { renderWithAnimation } = createAnimationTestUtils();
      
      const TestComponent = () => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-testid="animated-element"
        >
          Test Content
        </motion.div>
      );

      renderWithAnimation(<TestComponent />);
      
      const element = screen.getByTestId('animated-element');
      expect(element).toBeInTheDocument();
    });

    it('should include intersection observer mock', () => {
      const { renderWithAnimation } = createAnimationTestUtils();
      
      const TestComponent = () => (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          data-testid="scroll-triggered"
        >
          Scroll Triggered
        </motion.div>
      );

      renderWithAnimation(<TestComponent />);
      
      const element = screen.getByTestId('scroll-triggered');
      expect(element).toBeInTheDocument();
    });
  });

  describe('waitForAnimation', () => {
    it('should wait for animation to complete', async () => {
      const { renderWithAnimation, waitForAnimation } = createAnimationTestUtils();
      
      const TestComponent = () => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          data-testid="animated-element"
        >
          Test Content
        </motion.div>
      );

      renderWithAnimation(<TestComponent />);
      
      await waitForAnimation();
      
      const element = screen.getByTestId('animated-element');
      expect(element).toBeInTheDocument();
    });

    it('should wait for specific animation duration', async () => {
      const { renderWithAnimation, waitForAnimation } = createAnimationTestUtils();
      
      const TestComponent = () => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05 }}
          data-testid="animated-element"
        >
          Test Content
        </motion.div>
      );

      renderWithAnimation(<TestComponent />);
      
      await waitForAnimation(100);
      
      const element = screen.getByTestId('animated-element');
      expect(element).toBeInTheDocument();
    });
  });

  describe('getAnimationState', () => {
    it('should get current animation state', () => {
      const { renderWithAnimation, getAnimationState } = createAnimationTestUtils();
      
      const TestComponent = () => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-testid="animated-element"
        >
          Test Content
        </motion.div>
      );

      renderWithAnimation(<TestComponent />);
      
      const state = getAnimationState('animated-element');
      expect(state).toBeDefined();
    });
  });

  describe('mockIntersectionObserver', () => {
    it('should mock intersection observer with default settings', () => {
      const { mockIntersectionObserver } = createAnimationTestUtils();
      
      const mock = mockIntersectionObserver();
      
      expect(mock.observe).toBeDefined();
      expect(mock.unobserve).toBeDefined();
      expect(mock.disconnect).toBeDefined();
    });

    it('should mock intersection observer with custom settings', () => {
      const { mockIntersectionObserver } = createAnimationTestUtils();
      
      const mock = mockIntersectionObserver({
        isIntersecting: true,
        intersectionRatio: 0.8,
      });
      
      expect(mock.observe).toBeDefined();
      expect(mock.unobserve).toBeDefined();
      expect(mock.disconnect).toBeDefined();
    });
  });
}); 