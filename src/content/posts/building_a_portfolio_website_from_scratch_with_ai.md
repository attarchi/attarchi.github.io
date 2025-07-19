---
title: Building a Portfolio Website from Scratch with AI&colon; A Complete Development Workflow
date: 2025-07-19
excerpt: How I leveraged Claude AI and Cursor AI to build a professional portfolio with complex animations in just 7 days using TDD principles, step-by-step prompts, and systematic validation cycles.
tags: [AI Development, Claude AI, Cursor AI, TDD, Portfolio Development, Next.js, Framer Motion, Development Workflow]
category: AI-Assisted Development
readingTime: 15
published: true
---
# Building a Portfolio Website from Scratch with AI: A Complete Development Workflow

*How I leveraged Claude AI and Cursor AI to build a professional portfolio (current project) with complex animations, TDD principles, and automated deployment - and what I learned about AI-assisted development.*

---

## The Challenge: Building a Professional Portfolio in 7 Days

As a senior full-stack developer, I wanted to create a portfolio that would truly showcase my technical abilities - not just another template-based site. My requirements were ambitious:

- **GitHub-style professional aesthetics** with custom design system
- **Complex scroll-triggered animations** using Framer Motion
- **TDD-driven development** with comprehensive testing
- **Automated deployment** to GitHub Pages
- **Blog system** with markdown support
- **Performance-optimized** with 90+ Lighthouse scores

Instead of spending weeks on this project, I decided to experiment with AI-assisted development using Claude AI for planning and Cursor AI for implementation. The result? A complete, production-ready portfolio built in just 7 focused days.

## The 5-Phase AI Development Strategy

### Phase 1: Technical Foundation with Claude AI

**The Prompt Strategy:**
```
I need to build a professional developer portfolio with these requirements:
- Next.js 14 with static export for GitHub Pages
- Interactive scroll animations
- Professional GitHub-style design
- Blog functionality
- Automated deployment

Create a comprehensive technical proposal with technology choices, 
architecture decisions, and success criteria.
```

**What Claude Delivered:**
- Complete technology stack justification (Next.js 14, Framer Motion, Tailwind CSS)
- Deployment strategy for GitHub Pages static export
- Performance considerations for animation-heavy site
- Clear success criteria and measurable goals
You can see the [technical foundation here](https://github.com/attarchi/attarchi.github.io/blob/master/docs/technical-proposal.md)

**Key Insight:** Starting with a detailed technical proposal prevents scope creep and ensures all stakeholders (even if it's just you) understand the project boundaries.

### Phase 2: Design System Architecture

**The Approach:**
In a fresh conversation, I shared the technical proposal and asked Claude to create a comprehensive design outline:

```
Based on this technical proposal, create a detailed design system 
with GitHub-inspired aesthetics. Include:
- Color palette for light/dark themes
- Typography hierarchy
- Component design patterns
- Animation specifications
- Responsive behavior
```

**Claude's Output:**
- **Simplified 5-color palette** inspired by GitHub's design
- **Typography system** using JetBrains Mono + Inter fonts
- **Animation specifications** (0.8s duration, easeOut curve)
- **7-section homepage layout** with detailed component patterns
- **Responsive breakpoints** and mobile-first approach

**Result:** A 40-page [design specification](https://github.com/attarchi/attarchi.github.io/blob/master/docs/design-outline-proposal.md) that became my development bible.


### Phase 3: Project Breakdown & Task Planning

**The Strategy:**
I asked Claude to break down the project into manageable phases:

```
Create a detailed project breakdown for implementation with Cursor AI.
Each phase should have:
- Clear deliverables
- Validation criteria  
- Specific Cursor AI prompts
- Time estimates
```

**The 8-Phase Breakdown:**
1. **Project Foundation** (Day 1) - Basic Next.js setup
2. **Design System Implementation** (Day 1-2) - UI components and styling
3. **Homepage Layout** (Day 2-3) - Static sections without animations
4. **Create Step-by-Step TDD Prompts** (Planning) - Detailed Cursor AI prompts
5. **Animation System Implementation** (Day 3-4) - Using the prepared prompts
6. **Content Integration** (Day 4-5) - Real content and blog system
7. **GitHub Pages Deployment** (Day 6) - Automated deployment
8. **Optimization & Polish** (Day 7) - Performance and final touches


The project break down is [here](https://github.com/attarchi/attarchi.github.io/blob/master/docs/project-breakdown.md)

### Phase 4: Creating Step-by-Step TDD Prompts for Cursor AI

This was the most crucial phase - asking Claude to create detailed, step-by-step prompts that I could feed directly to Cursor AI. Each prompt needed a very specific structure:

```
Create step-by-step TDD prompts for the animation system implementation.
Each step should include:

- Purpose: Clear objective of the step
- Git commit message: Professional commit for the change  
- CursorAI Prompt: Starting with TDD instruction
- Validation Criteria: What I should check
- Expected Output: What should be delivered

Each CursorAI prompt must start with:
"You should develop in TDD mode. Please prepare unit tests first, 
then make your changes. Then confirm your changes with 'npm test' 
command, and then make the next change. Continue this cycle with 
small changes until everything is correct."
```

**Example Step Claude Generated:**

**Step 4.2: Create Base Animation Hook with Tests**
- **Purpose:** Build the core hook that handles scroll-triggered animations
- **Git Commit:** `feat: implement useScrollAnimation hook with intersection observer`  
- **Time Estimate:** 45 minutes

**CursorAI Prompt:**
```
You should develop in TDD mode. Please prepare unit tests first, then make your changes. Then confirm your changes with 'npm test' command, and then make the next change. Continue this cycle with small changes until everything is correct.

Create a custom hook `useScrollAnimation` that manages scroll-triggered animations with these specifications:

Hook Requirements:
1. Use Intersection Observer API for performance
2. Return animation state (visible/hidden) and ref to attach to elements
3. Support custom threshold values (default: 0.2 for 20% visibility)
4. Handle cleanup properly to prevent memory leaks
5. Respect prefers-reduced-motion setting

Test Requirements:
1. Hook returns correct initial state
2. Intersection Observer is created with correct options
3. Animation state updates when element becomes visible
4. Cleanup happens on unmount
5. prefers-reduced-motion is respected

Start by writing comprehensive tests for all these behaviors, then implement the hook incrementally.
```

**Validation Criteria:**
- [ ] All hook tests pass with 100% coverage
- [ ] Hook properly creates/destroys Intersection Observer
- [ ] Animation state updates correctly on visibility changes
- [ ] prefers-reduced-motion setting is respected
- [ ] Memory leaks are prevented (cleanup works)

**Expected Output:**
- `hooks/useScrollAnimation.ts` with full implementation
- `__tests__/hooks/useScrollAnimation.test.ts` with comprehensive tests
- Proper TypeScript interfaces exported

**Why This Phase Was Critical:**
Claude generated 12 detailed steps like this for the entire animation system. Each step was perfectly structured for Cursor AI to understand and implement using TDD principles.

**The Breakthrough Insight:**
Instead of improvising prompts during implementation, I had Claude create a complete "prompt library" that I could execute systematically. This approach had several advantages:

1. **Consistency:** Every prompt followed the same TDD structure
2. **Completeness:** Claude thought through all requirements upfront  
3. **Quality:** Each prompt included comprehensive validation criteria
4. **Speed:** No thinking required during implementation - just execute prompts
5. **Repeatability:** I could reuse this approach for future projects

### Phase 5: Implementation with Cursor AI Using the Prepared Prompts

**Why Cursor AI Was Game-Changing:**

Unlike chat-based AI tools, Cursor AI has several critical advantages:

1. **Full Codebase Context:** Understands your entire project structure
2. **CLI Integration:** Can run tests, builds, and linting automatically  
3. **File-Level Edits:** Makes precise changes across multiple files
4. **Git Integration:** Helps with commit messages and change tracking

**My Cursor AI Workflow:**

```bash
# For each step, I used the pre-prepared prompts from Claude:
1. Copy the exact CursorAI prompt from Claude's step-by-step plan
2. Paste it into Cursor AI (starting with the TDD instruction)
3. Let Cursor implement the feature using TDD approach
4. Run validation: yarn test && yarn lint && yarn build && yarn dev
5. Review ALL changes line by line before committing
6. Use the git commit message Claude provided
7. Move to the next step
```

**Example in Action:**
When implementing the animation hook, I literally copied Claude's prompt that started with "You should develop in TDD mode..." and Cursor AI would:
1. Write failing tests for `useScrollAnimation` 
2. Implement the hook to pass tests
3. Run `npm test` to verify
4. Refactor while keeping tests green
5. Show me exactly what to validate

## Key Lessons Learned

### 1. The Power of Detailed Planning

**Before AI:** I would start coding immediately and figure things out as I went.

**With AI:** The upfront planning phase with Claude was incredibly valuable. Having detailed specifications meant Cursor AI could implement exactly what I envisioned.

### 2. TDD is Essential with AI

**The Problem:** AI can be "lazy" and skip edge cases or proper error handling.

**The Solution:** Test-Driven Development forces AI to think through requirements completely:

```typescript
// This prompt got much better results:
"Write a failing test for useScrollAnimation hook that handles 
cleanup on unmount, then implement the hook to pass the test."

// vs this generic prompt:
"Create a scroll animation hook"
```

### 3. Always Validate Everything

**My Validation Command:**
```bash
yarn test && yarn lint && yarn build && yarn dev
```

**Why Each Step Matters:**
- **`yarn test`:** Catches logic errors and regressions
- **`yarn lint`:** Ensures code quality and consistency  
- **`yarn build`:** Verifies production build works
- **`yarn dev`:** Confirms development experience is smooth

**Real Example:** Cursor AI once implemented a beautiful animation system that passed tests but broke the production build due to a missing dependency. The validation cycle caught this immediately.

### 4. Review Every Line Before Committing

**AI Laziness is Real:** Even with good prompts, AI sometimes:
- Uses outdated syntax
- Skips error boundaries
- Forgets accessibility attributes
- Misses edge cases

**My Review Process:**
1. Use Git diff to see every change
2. Question any pattern that looks unfamiliar
3. Test edge cases manually
4. Verify responsive behavior on mobile

## The Results: What We Built Together

### Technical Achievements

**Homepage Features:**
- Typewriter animation in hero section
- Staggered project card reveals (200ms delays)
- Left-to-right skills cascade animation
- Progressive timeline reveals
- Smooth micro-interactions throughout

**Performance Metrics:**
- First Contentful Paint: 1.2s
- Animation frame rate: 60fps consistently
- Zero accessibility violations

**Animation System:**
```typescript
// Custom hook with Intersection Observer
const { ref, isVisible } = useScrollAnimation({
  threshold: 0.2,
  triggerOnce: true
});

// Framer Motion variants matching design specs
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};
```

### Deployment Success
- **Automated GitHub Actions** deployment
- **Static export** optimized for GitHub Pages
- **Custom domain** configuration
- **Zero-downtime** deployments

## When AI Development Works Best

### Perfect Scenarios
✅ **Well-defined requirements** with clear success criteria  
✅ **Modular architecture** where components can be built independently  
✅ **Established patterns** (React hooks, Next.js conventions)  
✅ **Comprehensive testing** to validate AI implementations  

### Challenging Scenarios
❌ **Vague requirements** ("make it look modern")  
❌ **Novel integrations** between unfamiliar libraries  
❌ **Complex business logic** requiring domain expertise  
❌ **Performance debugging** of edge cases  

## The Economics of AI-Assisted Development

### Time Investment Breakdown
- **Planning Phase:** 4 hours with Claude AI
- **Implementation:** 3 days with Cursor AI (vs estimated 2 weeks manual)
- **Testing & Polish:** 1 day
- **Total:** 4.5 days vs 2-3 weeks traditional development

### Cost Analysis
- **Claude AI Pro:** $20/month
- **Cursor AI Pro:** $20/month  
- **Time Saved:** ~10-15 development days
- **ROI:** Approximately 2000% on subscription costs

## Best Practices for AI-Assisted Development

### 1. Start with Strategic AI (Claude)
- Use Claude for planning, architecture, and design decisions
- Get detailed specifications before touching code
- Create comprehensive task breakdowns

### 2. Create Detailed Step-by-Step Prompts
- Have Claude generate complete prompt libraries for complex features
- Each prompt should include TDD instructions, validation criteria, and expected outputs
- Structure prompts to start with: "You should develop in TDD mode..."
- Include git commit messages and time estimates
- Test the prompts are comprehensive before implementation

### 3. Implement with Tactical AI (Cursor)
- Execute the pre-prepared prompts systematically
- Follow the TDD cycle exactly as specified in each prompt
- Leverage Cursor's codebase understanding for complex refactors
- Don't improvise - stick to the planned prompt sequence

### 3. Maintain Quality Gates
- Never skip the validation cycle
- Review every change before committing
- Test edge cases manually
- Run full test suite before each commit

### 4. Effective Prompting Strategies

**For Planning & Prompt Creation (Claude):**
```
Create step-by-step TDD prompts for [complex feature] with:
- Purpose and git commit message for each step
- CursorAI prompts starting with TDD instructions
- Validation criteria and expected outputs
- Time estimates for each step
```

**For Implementation (Cursor - using prepared prompts):**
```
You should develop in TDD mode. Please prepare unit tests first, 
then make your changes. Then confirm your changes with 'npm test' 
command, and then make the next change. Continue this cycle with 
small changes until everything is correct.

[Specific feature requirements and test specifications]
```

## The Future of AI-Assisted Development

Based on this experience, I believe we're entering a new era where:

1. **AI handles the "what" and "how"** - implementation details, boilerplate, testing
2. **Developers focus on the "why"** - requirements, architecture, user experience
3. **Quality gates become critical** - testing and validation are more important than ever
4. **Planning skills are premium** - the better your specifications, the better your AI output

## Conclusion: A New Development Paradigm

Building this portfolio was my first serious experiment with AI-assisted development, and the results exceeded my expectations. The combination of Claude AI for strategic planning and step-by-step prompt creation, followed by Cursor AI for systematic TDD implementation, created a workflow that was both faster and higher quality than traditional development.

**The Revolutionary Insight:** The breakthrough was realizing that I could have Claude create a complete "prompt library" for complex features, then execute those prompts systematically with Cursor AI. This separated the creative planning phase from the mechanical implementation phase.

**The key insight:** AI doesn't replace developer skills - it amplifies them. The better developer you are, the better you can leverage AI tools.

**What's Next?**
I'm now applying this workflow to client projects and seeing similar results. The investment in learning AI-assisted development patterns pays dividends across every subsequent project.

The portfolio website is live at [attarchi.github.io](https://attarchi.github.io) - a testament to what's possible when human creativity meets AI capability.

---

*Want to try this approach on your next project? Start with the planning phase using Claude AI, then move to implementation with Cursor AI. Remember: validate everything, review every change, and never skip the testing cycle.*

**Tools Used:**
- [Claude AI](https://claude.ai) for strategic planning and design
- [Cursor AI](https://cursor.sh) for code implementation  
- Next.js 14, Framer Motion, Tailwind CSS
- GitHub Actions for automated deployment

**Repository:** [View the complete codebase and commit history](https://github.com/attarchi/attarchi.github.io)