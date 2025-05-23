# Portfolio Website Implementation Plan - Phases 1-3
## Test-Driven Development with CursorAI

---

## **Phase 1: Project Foundation & Setup**

### **Step 1.1: Initialize Next.js Project with TypeScript**
**Purpose**: Create the base Next.js project with proper TypeScript configuration
**Git Commit**: `feat: initialize Next.js 14 project with TypeScript and Tailwind`

**CursorAI Prompt**:
```
Create a new Next.js 14 project using the App Router with the following specifications:
- TypeScript enabled
- Tailwind CSS configured
- ESLint enabled
- App directory structure
- Configure for static export to GitHub Pages
- Add proper .gitignore for Next.js projects
- Include package.json scripts for development, build, and static export

Please provide the complete setup commands and initial configuration files.
```

**Validation Tests**:
- [ ] `yarn run dev` starts development server
- [ ] TypeScript compilation works without errors
- [ ] Tailwind CSS classes apply correctly
- [ ] ESLint runs without critical errors

**Expected Files**:
- `package.json`, `next.config.js`, `tailwind.config.js`, `tsconfig.json`

---

### **Step 1.2: Setup Jest Testing Framework**
**Purpose**: Configure Jest with React Testing Library for TDD approach
**Git Commit**: `feat: configure Jest and React Testing Library for TDD`

**CursorAI Prompt**:
```
Set up Jest testing framework for a Next.js 14 TypeScript project with the following requirements:
- Jest configuration for Next.js App Router
- React Testing Library integration
- TypeScript support for tests
- Test utilities for component testing
- Setup files for global test configuration
- Custom matchers for better assertions
- Mock setup for Next.js specific features (Image, Link, etc.)

Include example test files and yarn scripts for running tests. Create a test structure that supports testing components, pages, and utilities.
```

**Validation Tests**:
- [ ] `yarn test` runs successfully
- [ ] Sample component test passes
- [ ] TypeScript types work in test files
- [ ] Test coverage report generates

**Expected Files**:
- `jest.config.js`, `jest.setup.js`, `__tests__/` directory, example test files

---

### **Step 1.3: Configure Static Export for GitHub Pages**
**Purpose**: Setup Next.js for static export compatible with GitHub Pages
**Git Commit**: `feat: configure static export for GitHub Pages deployment`

**CursorAI Prompt**:
```
Configure Next.js 14 for static export to GitHub Pages with these requirements, first please check which one is needed and which one already done:
- Update next.config.js for static export
- Configure proper asset prefix and base path
- Handle routing for static sites
- Create GitHub Actions workflow for automated deployment
- Ensure all dynamic features are static-compatible
- Add deployment scripts to package.json
- Include proper error handling for 404 pages

Provide the complete configuration files and explain any limitations of static export.
```

**Validation Tests**:
- [ ] `yarn run build` creates static export
- [ ] All pages render without JavaScript
- [ ] Asset paths are correct for GitHub Pages
- [ ] 404 page works properly

**Expected Files**:
- Updated `next.config.js`, `.github/workflows/deploy.yml`, `out/` directory after build

---

### **Step 1.4: Setup Project Structure and TypeScript Interfaces**
**Purpose**: Create organized folder structure and type definitions
**Git Commit**: `feat: setup project structure and TypeScript interfaces`

**CursorAI Prompt**:
```
Create a professional folder structure for a portfolio website with these requirements:
- Organized component structure with clear separation
- TypeScript interfaces for all data types (projects, blog posts, skills, etc.)
- Utility functions with proper typing
- Constants file for configuration
- Types directory for shared interfaces
- Lib directory for utilities and helpers

Based on the portfolio requirements, create interfaces for:
- Project data (title, description, technologies, links)
- Blog post metadata (title, date, slug, tags, excerpt)
- Skill categories and proficiency levels
- Professional timeline entries
- Contact information

Include proper JSDoc comments and export statements.
```

**Validation Tests**:
- [ ] All TypeScript interfaces compile without errors
- [ ] Folder structure is logical and scalable
- [ ] Import/export statements work correctly
- [ ] Type checking catches expected errors

**Expected Files**:
- `types/index.ts`, `lib/`, `components/`, proper folder structure

---

## **Phase 2: Design System Implementation**

### **Step 2.1: Configure Custom Tailwind Theme**
**Purpose**: Setup GitHub-inspired color palette and typography in Tailwind
**Git Commit**: `feat: implement GitHub-inspired design system in Tailwind`

**CursorAI Prompt**:
```
Configure Tailwind CSS with a custom theme based on GitHub's design system:

Color Palette (light/dark modes):
- Background: #ffffff / #0d1117
- Text: #24292f / #f0f6fc  
- Accent: #0969da / #58a6ff
- Muted: #656d76 / #8b949e
- Surface: #f6f8fa / #21262d

Typography:
- Primary font: JetBrains Mono (Google Fonts)
- Secondary font: Inter (Google Fonts)
- Proper font loading optimization

Custom utilities:
- Animation classes for smooth transitions
- Spacing scale optimized for professional layouts
- Shadow utilities for depth

Include CSS custom properties for theme switching and proper font loading configuration.
```

**Validation Tests**:
- [ ] All custom colors render correctly
- [ ] Fonts load without layout shift
- [ ] Dark/light mode CSS variables work
- [ ] Custom utilities apply properly

**Expected Files**:
- Updated `tailwind.config.js`, custom CSS files, font loading configuration

---

### **Step 2.2: Create Core UI Components with Tests**
**Purpose**: Build reusable components following the design system
**Git Commit**: `feat: implement core UI components with comprehensive tests`

**CursorAI Prompt**:
```
Create a set of core UI components with comprehensive tests:

Components needed:
1. Badge - with variants (default, outline, secondary) and hover effects
2. Card - with hover animations and different layouts
3. Button - with loading states, variants, and animations
4. Section - container component with proper spacing
5. Typography components (headings, body text) with consistent styling

Requirements:
- Each component should be fully typed with TypeScript
- Include comprehensive tests for all props and interactions
- Implement hover animations using Tailwind classes
- Follow accessibility best practices
- Support both light and dark themes
- Include Storybook-style prop variations in tests

Write tests that verify:
- Component renders with correct default props
- All variants render correctly
- Hover states work properly
- Accessibility attributes are present
- Theme switching works
```

**Validation Tests**:
- [ ] All component tests pass
- [ ] Components render in both light/dark themes
- [ ] Hover effects work smoothly
- [ ] TypeScript props are enforced
- [ ] Accessibility attributes are present

**Expected Files**:
- `components/ui/` directory with Badge, Card, Button, Section components and tests

---

### **Step 2.3: Implement Theme Toggle System**
**Purpose**: Create working dark/light mode toggle with persistence
**Git Commit**: `feat: implement theme toggle with local storage persistence`

**CursorAI Prompt**:
```
Create a complete theme toggle system with these requirements:
- React Context for theme management
- Hook for theme consumption throughout the app
- Toggle component with smooth transitions
- Local storage persistence (with SSR considerations)
- System preference detection
- Proper TypeScript typing

The system should:
- Automatically detect user's system preference
- Allow manual override with toggle
- Persist user choice across sessions
- Handle SSR/hydration without flashing
- Provide smooth transitions between themes
- Work with Next.js App Router

Include comprehensive tests for:
- Theme context functionality
- Local storage persistence
- System preference detection
- Toggle component interactions
- SSR hydration scenarios
```

**Validation Tests**:
- [ ] Theme toggle works without hydration issues
- [ ] Persistence works across browser sessions
- [ ] System preference detection works
- [ ] No theme flashing on page load
- [ ] All tests pass including SSR scenarios

**Expected Files**:
- `components/theme-provider.tsx`, `hooks/use-theme.ts`, theme toggle component with tests

---

### **Step 2.4: Create Component Documentation and Storybook**
**Purpose**: Document all components with interactive examples
**Git Commit**: `feat: add component documentation and interactive examples`

**CursorAI Prompt**:
```
Create comprehensive documentation for all UI components:

Requirements:
- Interactive component playground (similar to Storybook)
- Documentation page showing all component variants
- Code examples for each component
- Props documentation with TypeScript interfaces
- Usage guidelines and best practices
- Accessibility information for each component

Create a `/components-demo` page that showcases:
- All component variants side by side
- Interactive controls for props
- Code snippets showing usage
- Dark/light mode previews
- Responsive behavior examples

Include proper TypeScript documentation comments and ensure all examples are working and tested.
```

**Validation Tests**:
- [ ] Documentation page renders all components
- [ ] Interactive examples work correctly
- [ ] Code snippets are accurate and runnable
- [ ] TypeScript documentation is complete
- [ ] Responsive examples display properly

**Expected Files**:
- `app/components-demo/page.tsx`, component documentation, interactive examples

---

## **Phase 3: Homepage Layout & Structure**

### **Step 3.1: Create Hero Section with Tests**
**Purpose**: Build the main hero section with professional layout
**Git Commit**: `feat: implement hero section with responsive layout and tests`

**CursorAI Prompt**:
```
Create a professional hero section component with these specifications:

Layout requirements:
- Full viewport height on desktop, auto on mobile
- Centered content with proper typography hierarchy
- Professional headline: "Senior Full-Stack Developer"
- Subtitle with location badge
- Call-to-action buttons (Contact, View Work)
- Scroll indicator animation placeholder
- Professional avatar/photo placeholder

Technical requirements:
- Fully responsive design (mobile-first)
- TypeScript interfaces for all props
- Accessibility compliant (proper heading hierarchy, alt text)
- Semantic HTML structure
- Integration with the design system colors and typography

Testing requirements:
- Unit tests for component rendering
- Responsive behavior tests
- Accessibility tests (headings, alt text, etc.)
- Props validation tests
- Integration tests with theme system

The component should accept props for customizing content while maintaining the professional layout.
```

**Validation Tests**:
- [ ] Hero section renders correctly on all screen sizes
- [ ] All text content is properly styled
- [ ] CTA buttons are interactive and accessible
- [ ] Component tests cover all functionality
- [ ] Responsive breakpoints work correctly

**Expected Files**:
- `components/sections/hero-section.tsx`, comprehensive tests, responsive utilities

---

### **Step 3.2: Build Featured Projects Section**
**Purpose**: Create project showcase with card layout and technology badges
**Git Commit**: `feat: implement featured projects section with interactive cards`

**CursorAI Prompt**:
```
Create a featured projects section with these requirements:

Project data structure:
- Project title, description, technologies used
- Project type/category
- Links (live demo, GitHub, etc.)
- Status (completed, in progress, etc.)

Layout specifications:
- Grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Project cards with hover effects
- Technology badges with consistent styling
- Image/diagram placeholders with proper aspect ratios
- "View All Projects" link

Interactive features:
- Card hover animations (subtle lift and shadow)
- Technology badge hover effects
- Smooth transitions for all interactions
- Loading states for future API integration

Testing requirements:
- Test with different numbers of projects
- Verify responsive grid behavior
- Test hover animations and interactions
- Accessibility testing for screen readers
- Performance testing with many projects

Include sample project data that matches the portfolio requirements (CCPTools, etc.).
```

**Validation Tests**:
- [ ] Project cards render correctly with sample data
- [ ] Grid layout responds properly on all devices
- [ ] Hover effects work smoothly
- [ ] Technology badges display consistently
- [ ] All tests pass including accessibility

**Expected Files**:
- `components/sections/featured-projects.tsx`, project data types, sample data, tests

---

### **Step 3.3: Implement Technical Expertise Section**
**Purpose**: Create skills showcase with interactive grid layout
**Git Commit**: `feat: create technical expertise section with skill categories`

**CursorAI Prompt**:
```
Build a technical expertise section with these specifications:

Data structure:
- Skill categories (Frontend, Backend, DevOps, etc.)
- Individual skills with proficiency levels
- Years of experience per technology
- Certification or notable achievements

Layout design:
- Category-based grid layout
- Skill proficiency indicators (visual bars or badges)
- Interactive hover states showing additional details
- Responsive grid (4 columns desktop, 2 tablet, 1 mobile)
- Professional iconography for technologies

Interactive features:
- Hover effects revealing experience details
- Smooth animations for proficiency indicators
- Category filtering (future enhancement preparation)
- Expandable sections for mobile

Testing strategy:
- Test with various skill data configurations
- Verify proficiency indicators render correctly
- Test responsive grid behavior
- Accessibility tests for screen readers
- Performance tests with large skill datasets

Include realistic skill data based on the technical proposal requirements.
```

**Validation Tests**:
- [ ] Skill categories display in organized grid
- [ ] Proficiency indicators render accurately
- [ ] Hover interactions provide additional context
- [ ] Responsive layout works on all devices
- [ ] Component tests cover all functionality

**Expected Files**:
- `components/sections/technical-expertise.tsx`, skill data types, sample skill data, tests

---

### **Step 3.4: Create Professional Journey Timeline**
**Purpose**: Build career timeline with milestone cards
**Git Commit**: `feat: implement professional journey timeline with responsive design`

**CursorAI Prompt**:
```
Create a professional journey timeline component:

Timeline requirements:
- Horizontal layout on desktop, vertical on mobile
- Career milestones with dates and descriptions
- Achievement badges and key accomplishments
- Company/role information with proper formatting
- Visual timeline connection between milestones

Data structure:
- Timeline entries with dates, roles, companies
- Achievement objects with titles and descriptions
- Technology highlights for each role
- Project highlights and impacts

Design specifications:
- Clean, professional timeline visual
- Consistent card design for each milestone
- Proper spacing and typography hierarchy
- Achievement badges with hover details
- Responsive behavior (horizontal ↔ vertical)

Interactive features:
- Hover effects on timeline entries
- Expandable achievement details
- Smooth scrolling between milestones
- Progressive disclosure of information

Testing approach:
- Test with different timeline lengths
- Verify responsive layout transitions
- Test interactive elements and hover states
- Accessibility testing for timeline navigation
- Performance with large timeline datasets

Include sample career data that reflects the portfolio requirements.
```

**Validation Tests**:
- [ ] Timeline renders correctly in both orientations
- [ ] Milestone cards display all information properly
- [ ] Responsive transition works smoothly
- [ ] Interactive elements function correctly
- [ ] Timeline is accessible via keyboard navigation

**Expected Files**:
- `components/sections/professional-journey.tsx`, timeline data types, sample career data, tests

---

### **Step 3.5: Build Contact Section and Form**
**Purpose**: Create professional contact section with form or direct links
**Git Commit**: `feat: implement contact section with form validation and tests`

**CursorAI Prompt**:
```
Create a contact section with these requirements:

Contact options:
- Contact form with validation (name, email, message)
- Direct contact links (email, LinkedIn, GitHub)
- Professional availability status
- Location and timezone information

Form specifications:
- Client-side validation with error states
- Loading states for form submission
- Success/error feedback messages
- Accessibility compliant form labels
- Form data validation using TypeScript

Design requirements:
- Professional card-based layout
- Consistent with overall design system
- Proper spacing and visual hierarchy
- Responsive form layout
- Social media icons with hover effects

Testing strategy:
- Form validation testing (valid/invalid inputs)
- Accessibility testing for form controls
- Error state rendering tests
- Success state behavior tests
- Responsive layout verification

Note: Since this is static export, the form should show a "coming soon" message or direct to email, but maintain full functionality for future enhancement.
```

**Validation Tests**:
- [ ] Contact form renders with proper validation
- [ ] All form states (loading, error, success) work
- [ ] Direct contact links are functional
- [ ] Form is fully accessible
- [ ] Responsive layout works correctly

**Expected Files**:
- `components/sections/contact-section.tsx`, form validation utilities, contact data types, tests

---

### **Step 3.6: Integrate All Sections into Homepage**
**Purpose**: Combine all sections into cohesive homepage layout
**Git Commit**: `feat: integrate all sections into complete homepage layout`

**CursorAI Prompt**:
```
Integrate all homepage sections into a cohesive layout:

Layout requirements:
- Proper section ordering and spacing
- Consistent padding and margins
- Smooth section transitions
- Navigation between sections (future enhancement)
- Proper semantic HTML structure

Integration tasks:
- Import and arrange all section components
- Create consistent section wrapper component
- Implement proper spacing between sections
- Add section navigation IDs for future anchor links
- Ensure consistent theme application across all sections

Performance considerations:
- Lazy loading for non-critical sections
- Optimize rendering performance
- Proper error boundaries for each section
- Loading states for dynamic content

Testing strategy:
- Full page integration tests
- Performance testing with all sections
- Accessibility testing for page structure
- Responsive behavior across all sections
- Theme switching across entire page

Create a complete homepage that showcases all implemented sections working together professionally.
```

**Validation Tests**:
- [ ] All sections render correctly together
- [ ] Page layout is visually cohesive
- [ ] Performance is acceptable with all sections
- [ ] Theme switching works across entire page
- [ ] Page is fully accessible and semantic

**Expected Files**:
- `app/page.tsx` (main homepage), section wrapper components, integration tests

---

## **Validation Summary for Each Phase**

### **Phase 1 Success Criteria**:
- ✅ Next.js project runs locally and builds successfully
- ✅ Jest testing framework is fully configured
- ✅ Static export works for GitHub Pages
- ✅ Project structure is organized and TypeScript compiles

### **Phase 2 Success Criteria**:
- ✅ Design system is implemented with GitHub aesthetics
- ✅ All UI components work with comprehensive tests
- ✅ Theme toggle works with persistence
- ✅ Component documentation is complete and interactive

### **Phase 3 Success Criteria**:
- ✅ All homepage sections render correctly
- ✅ Layout is fully responsive on all devices
- ✅ Content structure is professional and complete
- ✅ All components have passing tests
- ✅ Performance is optimized for user experience

## **Git Workflow**

Each step should result in a focused commit:
```bash
# Example workflow for each step
git add .
git commit -m "feat: implement hero section with responsive layout and tests"
git push origin main
```

## **Testing Strategy**

Each component should have:
- **Unit tests**: Individual component functionality
- **Integration tests**: Component interaction with others
- **Accessibility tests**: Screen reader and keyboard navigation
- **Responsive tests**: Layout behavior across breakpoints
- **Performance tests**: Rendering speed and memory usage