# Phase 3: Homepage Layout & Structure - Detailed TDD Plan

## **Project Rules for CursorAI** (Add to your project context)

```
DEVELOPMENT RULES:
1. You MUST develop in strict TDD mode
2. For every feature: Write test FIRST → Implement code → Run 'yarn test' → Refactor if needed
3. Make tiny incremental changes (one test at a time)
4. Every component must match the GitHub-style design from design-outline-proposal.md
5. Use JetBrains Mono for headings, Inter for body text
6. Colors: Light (#ffffff bg, #24292f text, #0969da accent) / Dark (#0d1117 bg, #f0f6fc text, #58a6ff accent)
7. All components must be responsive-first
8. Every interactive element needs hover states
9. Confirm each change with 'yarn test' before proceeding
10. Keep commits atomic (one failing test → one passing test → one commit)
```

---

## **Phase 3: Step-by-Step Implementation**

### **Step 3.1: Hero Section Typography Foundation**
**Purpose**: Establish the exact typography hierarchy matching the design proposal
**Commit**: `feat: implement hero section typography with design system fonts`

**CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

Create a Hero section component following these EXACT design specifications from the proposal:

TYPOGRAPHY REQUIREMENTS:
- Main heading: JetBrains Mono, 3.5rem desktop (2.5rem mobile), font-bold
- Subtitle: Inter, 1rem, font-normal
- Colors: #24292f (light mode), #f0f6fc (dark mode)

TEST FIRST: Write tests that verify:
1. Heading renders with correct font family (JetBrains Mono)
2. Heading has correct font size on desktop (3.5rem)
3. Heading has correct font size on mobile (2.5rem) 
4. Subtitle uses Inter font family
5. Colors match design system in both themes

CONTENT:
- Main heading: "Senior Full-Stack Developer"
- Subtitle: "Building scalable solutions with modern technologies"

Start with just the typography - no layout yet. Make one test pass at a time.
```

**Validation**:
- [ ] Typography test passes for heading font family
- [ ] Typography test passes for heading sizes (desktop/mobile)
- [ ] Typography test passes for subtitle font family
- [ ] Color tests pass for both light/dark themes
- [ ] `yarn test` shows all tests passing

---

### **Step 3.2: Hero Section Layout Structure**
**Purpose**: Add the viewport height layout and centered positioning
**Commit**: `feat: add hero section layout with viewport height and centering`

**CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

Continue with the Hero component, adding layout specifications:

LAYOUT REQUIREMENTS:
- Full viewport height on desktop (h-screen)
- Auto height on mobile (h-auto with proper padding)
- Content centered both horizontally and vertically
- Max width container (max-w-4xl)
- Proper spacing between heading and subtitle (space-y-6)

TEST FIRST: Write tests that verify:
1. Component has viewport height class on desktop
2. Component has auto height on mobile breakpoint
3. Content is centered (flex justify-center items-center)
4. Container has max-width applied
5. Spacing between elements is correct

Build on the existing typography component. One test at a time.
```

**Validation**:
- [ ] Layout tests pass for viewport height
- [ ] Mobile responsive tests pass
- [ ] Centering tests pass
- [ ] Container width tests pass
- [ ] `yarn test` shows all tests passing

---

### **Step 3.3: Hero Section Location Badge**
**Purpose**: Add the location badge with GitHub-style design
**Commit**: `feat: add location badge with GitHub-style design to hero section`

**CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

Add a location badge to the Hero section with these specifications:

BADGE DESIGN (GitHub-style):
- Background: #f6f8fa (light) / #21262d (dark)
- Border: 1px solid #d0d7de (light) / #30363d (dark)
- Text: #656d76 (light) / #8b949e (dark)
- Font: Inter, 0.875rem
- Padding: px-3 py-1
- Rounded corners: rounded-full
- Position: Below subtitle

TEST FIRST: Write tests that verify:
1. Badge renders with correct background colors (light/dark)
2. Badge has correct border styling
3. Badge text color matches design system
4. Badge has correct padding and border radius
5. Badge appears in correct position (after subtitle)

Content: "📍 Available for remote opportunities"

Add this incrementally to existing Hero component.
```

**Validation**:
- [ ] Badge styling tests pass
- [ ] Theme-specific color tests pass
- [ ] Positioning tests pass
- [ ] Typography tests pass for badge
- [ ] `yarn test` shows all tests passing

---

### **Step 3.4: Hero Section CTA Buttons**
**Purpose**: Add Call-to-Action buttons with GitHub button styling
**Commit**: `feat: add CTA buttons with GitHub-style hover effects to hero`

**CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

Add CTA buttons to Hero section with GitHub-style design:

BUTTON SPECIFICATIONS:
Primary Button:
- Background: #0969da (light) / #58a6ff (dark)
- Text: white
- Padding: px-4 py-2
- Font: Inter, font-medium
- Hover: Slightly darker background
- Border radius: rounded-md

Secondary Button:
- Background: transparent
- Border: 1px solid #d0d7de (light) / #30363d (dark)
- Text: #24292f (light) / #f0f6fc (dark)
- Same padding and font as primary
- Hover: Background #f6f8fa (light) / #21262d (dark)

TEST FIRST: Write tests that verify:
1. Primary button has correct background colors
2. Secondary button has correct border styling
3. Both buttons have correct padding and typography
4. Buttons are positioned correctly (side by side with gap)
5. Hover states can be tested (hover classes present)

Content: Primary "Contact Me", Secondary "View Projects"
Layout: Flex row with gap-4, centered
```

**Validation**:
- [ ] Primary button styling tests pass
- [ ] Secondary button styling tests pass
- [ ] Button layout tests pass
- [ ] Hover state classes are present
- [ ] `yarn test` shows all tests passing

---

### **Step 3.5: Hero Section Scroll Indicator**
**Purpose**: Add animated scroll indicator at bottom of hero
**Commit**: `feat: add animated scroll indicator to hero section`

**CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

Add a scroll indicator to the Hero section:

SCROLL INDICATOR SPECIFICATIONS:
- Position: Absolute bottom of hero section (bottom-8)
- Design: Downward arrow or "scroll" text with arrow
- Animation: Gentle bounce animation (animate-bounce)
- Color: #656d76 (light) / #8b949e (dark) - muted color
- Size: Small and subtle
- Font: Inter, text-sm

TEST FIRST: Write tests that verify:
1. Scroll indicator renders at bottom of hero
2. Indicator has correct positioning (absolute bottom-8)
3. Indicator has correct color in both themes
4. Animation class is applied (animate-bounce)
5. Indicator has correct typography

Content: "Scroll to explore" with a down arrow icon
Use a simple Unicode arrow (↓) or chevron for now

Position it centered horizontally at the bottom of the hero section.
```

**Validation**:
- [ ] Scroll indicator positioning tests pass
- [ ] Animation class tests pass
- [ ] Theme color tests pass
- [ ] Typography tests pass
- [ ] `yarn test` shows all tests passing

---

### **Step 3.6: Featured Projects Section Foundation**
**Purpose**: Create the basic structure for the projects section
**Commit**: `feat: create featured projects section foundation with design system`

**CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

Create a new FeaturedProjects component with basic structure:

SECTION SPECIFICATIONS:
- Section padding: py-20 (large vertical spacing)
- Container: max-w-6xl mx-auto px-4
- Background: #ffffff (light) / #0d1117 (dark)
- Section heading: "Featured Projects"
- Heading style: JetBrains Mono, 2.5rem desktop (2rem mobile), font-semibold
- Heading color: #24292f (light) / #f0f6fc (dark)

TEST FIRST: Write tests that verify:
1. Section renders with correct padding
2. Container has correct max-width and margins
3. Heading renders with correct text
4. Heading has correct font family (JetBrains Mono)
5. Heading has correct sizes (desktop/mobile)
6. Colors work in both themes

Start with just the section container and heading - no project cards yet.
```

**Validation**:
- [ ] Section structure tests pass
- [ ] Heading typography tests pass  
- [ ] Container sizing tests pass
- [ ] Theme color tests pass
- [ ] `yarn test` shows all tests passing

---

### **Step 3.7: Project Card Component Foundation**
**Purpose**: Create the individual project card component structure
**Commit**: `feat: create project card component with GitHub-style design`

**CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

Create a ProjectCard component with GitHub-style card design:

CARD SPECIFICATIONS:
- Background: #f6f8fa (light) / #21262d (dark) 
- Border: 1px solid #d0d7de (light) / #30363d (dark)
- Border radius: rounded-lg
- Padding: p-6
- Hover effect: shadow-lg transition-all duration-300
- Hover background: slightly lighter/darker

CARD CONTENT STRUCTURE:
- Project title: JetBrains Mono, text-xl, font-semibold
- Project description: Inter, text-base, #656d76 (light) / #8b949e (dark)
- Spacing between elements: space-y-4

TEST FIRST: Write tests that verify:
1. Card has correct background colors (light/dark)
2. Card has correct border styling
3. Card has correct padding and border radius
4. Hover classes are present (shadow-lg, transition-all)
5. Title and description have correct typography
6. Content spacing is correct

Props interface:
interface ProjectCardProps {
  title: string;
  description: string;
}


Test with sample data: title="CCPTools Ecosystem", description="Comprehensive nutrition platform..."
```

**Validation**:
- [ ] Card styling tests pass
- [ ] Typography tests pass
- [ ] Hover effect classes present
- [ ] Props interface works correctly
- [ ] `yarn test` shows all tests passing

---

### **Step 3.8: Technology Badges for Project Cards**
**Purpose**: Add technology tag badges to project cards
**Commit**: `feat: add technology badges to project cards with hover effects`

**CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

Add technology badges to the ProjectCard component:

BADGE SPECIFICATIONS:
- Background: #0969da (light) / #58a6ff (dark) - accent color
- Text color: white
- Font: JetBrains Mono, text-xs, font-medium
- Padding: px-2 py-1
- Border radius: rounded-md
- Hover effect: Slightly darker background

LAYOUT:
- Badges container: flex flex-wrap gap-2
- Position: After description, before any other content
- Spacing: mt-4 from description

TEST FIRST: Write tests that verify:
1. Badges container has correct flex layout
2. Individual badges have correct styling
3. Badge text uses JetBrains Mono font
4. Badges have correct colors in both themes
5. Hover effect classes are present
6. Multiple badges render correctly

Update ProjectCard props:
interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
}


Test with: technologies={["React Native", "Node.js", "PostgreSQL"]}
```

**Validation**:
- [ ] Badge layout tests pass
- [ ] Badge styling tests pass
- [ ] Multiple badges render correctly
- [ ] Theme color tests pass
- [ ] `yarn test` shows all tests passing

---

### **Step 3.9: Project Cards Grid Layout**
**Purpose**: Implement responsive grid layout for project cards
**Commit**: `feat: implement responsive grid layout for featured projects`

**CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

Add grid layout to FeaturedProjects component:

GRID SPECIFICATIONS:
- Desktop: 3 columns (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Gap between cards: gap-8
- Cards container: mt-12 (space from heading)

PROJECT DATA STRUCTURE:
Create sample data for 3 projects:
1. CCPTools Ecosystem - React Native, Node.js, PostgreSQL
2. Multi-Tenant Nutrition Platform - Next.js, Prisma, tRPC  
3. Healthcare Management System - React, Express, MongoDB

TEST FIRST: Write tests that verify:
1. Grid container has correct responsive classes
2. Correct gap spacing between cards
3. All 3 project cards render
4. Each card receives correct props
5. Grid is responsive (test different screen sizes)

Update FeaturedProjects to accept projects array as prop and map over them.
```

**Validation**:
- [ ] Grid layout tests pass
- [ ] Responsive classes are correct
- [ ] All project cards render
- [ ] Props mapping works correctly
- [ ] `yarn test` shows all tests passing

---

### **Step 3.10: Technical Expertise Section Foundation**
**Purpose**: Create the technical skills section structure
**Commit**: `feat: create technical expertise section with category structure`

**CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

Create TechnicalExpertise component with category-based structure:

SECTION SPECIFICATIONS:
- Same container styling as FeaturedProjects (py-20, max-w-6xl, etc.)
- Section heading: "Technical Expertise"
- Heading style: Same as other sections (JetBrains Mono, 2.5rem, etc.)

CATEGORY STRUCTURE:
Create 4 skill categories:
1. Frontend Development
2. Backend Development  
3. Mobile Development
4. DevOps & Tools

CATEGORY CARD DESIGN:
- Background: #f6f8fa (light) / #21262d (dark)
- Border: Same as project cards
- Padding: p-6
- Grid: 2x2 on desktop, 1 column on mobile (grid-cols-1 md:grid-cols-2)

TEST FIRST: Write tests that verify:
1. Section has correct structure and styling
2. Heading renders correctly
3. Category grid has correct responsive classes
4. 4 category cards render
5. Each category card has correct styling

Start with just category titles, no individual skills yet.
```

**Validation**:
- [ ] Section structure tests pass
- [ ] Category grid tests pass
- [ ] Card styling tests pass
- [ ] All categories render
- [ ] `yarn test` shows all tests passing

---

### **Step 3.11: Skill Items with Proficiency Indicators**
**Purpose**: Add individual skills with visual proficiency levels
**Commit**: `feat: add skill items with proficiency bars to expertise section`

**CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

Add individual skills to each category with proficiency indicators:

SKILL ITEM DESIGN:
- Skill name: Inter, text-sm, font-medium
- Proficiency bar: Background #e1e4e8 (light) / #30363d (dark)
- Proficiency fill: #0969da (light) / #58a6ff (dark) - accent color
- Bar dimensions: h-2, rounded-full
- Bar container: mt-1, relative positioning

PROFICIENCY LEVELS:
- Expert (90%): React, TypeScript, Node.js
- Advanced (75%): PostgreSQL, Docker, AWS
- Proficient (60%): GraphQL, Redis, Kubernetes

LAYOUT:
- Skills list: space-y-3 within each category
- Each skill: skill name + proficiency bar

TEST FIRST: Write tests that verify:
1. Skill names render with correct typography
2. Proficiency bars have correct background colors
3. Proficiency fill has correct width percentages
4. Bar styling (height, border radius) is correct
5. Skills are properly spaced within categories

Add 3-4 skills per category with realistic proficiency levels.
```

**Validation**:
- [ ] Skill name typography tests pass
- [ ] Proficiency bar styling tests pass
- [ ] Proficiency percentages render correctly
- [ ] Theme colors work for bars
- [ ] `yarn test` shows all tests passing

---

### **Step 3.12: Professional Journey Timeline Foundation**
**Purpose**: Create the career timeline section structure
**Commit**: `feat: create professional journey timeline section foundation`

**CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

Create ProfessionalJourney component with timeline structure:

SECTION SPECIFICATIONS:
- Same container styling as other sections
- Section heading: "Professional Journey"
- Background: Alternate section color #fafbfc (light) / #0d1117 (dark)

TIMELINE STRUCTURE:
- Desktop: Horizontal timeline
- Mobile: Vertical timeline (responsive)
- Timeline line: 2px solid #d0d7de (light) / #30363d (dark)
- Timeline container: relative positioning for absolute timeline elements

RESPONSIVE DESIGN:
- Desktop: timeline-horizontal class (custom)
- Mobile: timeline-vertical class (custom)
- Breakpoint: Switch at md (768px)

TEST FIRST: Write tests that verify:
1. Section has correct background color
2. Timeline container has relative positioning
3. Timeline line renders with correct styling
4. Responsive classes are applied correctly
5. Section heading renders correctly

Start with just the timeline structure - no timeline items yet.
```

**Validation**:
- [ ] Timeline structure tests pass
- [ ] Background color tests pass
- [ ] Timeline line styling tests pass
- [ ] Responsive classes present
- [ ] `yarn test` shows all tests passing

---

### **Step 3.13: Timeline Milestone Cards**
**Purpose**: Add milestone cards to the timeline
**Commit**: `feat: add timeline milestone cards with achievement badges`

**CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

Add milestone cards to the ProfessionalJourney timeline:

MILESTONE CARD DESIGN:
- Card background: #ffffff (light) / #21262d (dark)
- Card border: Same as other cards
- Card padding: p-4
- Card shadow: shadow-md
- Position: Connected to timeline line

MILESTONE CONTENT:
- Date: JetBrains Mono, text-sm, #656d76 (light) / #8b949e (dark)
- Role/Title: Inter, text-lg, font-semibold, main text color
- Company: Inter, text-base, accent color (#0969da / #58a6ff)
- Description: Inter, text-sm, muted color
- Achievement badge: Small rounded badge with key accomplishment

SAMPLE MILESTONES:
1. 2023-Present: Senior Full-Stack Developer at TechCorp
2. 2021-2023: Full-Stack Developer at StartupXYZ  
3. 2019-2021: Frontend Developer at DevAgency

TEST FIRST: Write tests that verify:
1. Milestone cards have correct styling
2. All content elements render with correct typography
3. Date formatting is consistent
4. Achievement badges render correctly
5. Cards are positioned relative to timeline

Create 3 milestone cards with realistic career progression.
```

**Validation**:
- [ ] Milestone card styling tests pass
- [ ] Content typography tests pass
- [ ] Achievement badges render correctly
- [ ] Timeline positioning works
- [ ] `yarn test` shows all tests passing

---

### **Step 3.14: Contact Section Foundation**
**Purpose**: Create the contact section with professional layout
**Commit**: `feat: create contact section with professional card layout`

**CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

Create ContactSection component with professional layout:

SECTION SPECIFICATIONS:
- Same container styling as other sections (py-20, max-w-6xl)
- Section heading: "Let's Work Together"
- Subheading: "Available for exciting projects and opportunities"
- Background: #f6f8fa (light) / #0d1117 (dark)

LAYOUT STRUCTURE:
- Two-column layout on desktop: Contact info + Contact form
- Single column on mobile
- Grid: grid-cols-1 lg:grid-cols-2 gap-12

CONTACT INFO CARD:
- Background: #ffffff (light) / #21262d (dark) 
- Same card styling as other components
- Content: Email, LinkedIn, GitHub links
- Availability status badge

TEST FIRST: Write tests that verify:
1. Section has correct background and spacing
2. Heading and subheading render correctly
3. Grid layout has correct responsive classes
4. Contact info card has correct styling
5. Two-column layout works on desktop

Start with section structure and contact info card - no form yet.
```

**Validation**:
- [ ] Section structure tests pass
- [ ] Grid layout tests pass
- [ ] Contact info card styling tests pass
- [ ] Responsive layout works
- [ ] `yarn test` shows all tests passing

---

### **Step 3.15: Contact Form with Validation**
**Purpose**: Add contact form with proper validation styling
**Commit**: `feat: add contact form with GitHub-style validation states`

**CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

Add contact form to ContactSection with GitHub-style form design:

FORM SPECIFICATIONS:
- Form background: Same as contact info card
- Form padding: p-6
- Form fields: Name, Email, Message
- Label styling: Inter, text-sm, font-medium, mb-2
- Input styling: GitHub form input design

INPUT DESIGN:
- Background: #ffffff (light) / #0d1117 (dark)
- Border: 1px solid #d0d7de (light) / #30363d (dark)
- Focus border: #0969da (light) / #58a6ff (dark)
- Padding: px-3 py-2
- Border radius: rounded-md
- Font: Inter

VALIDATION STATES:
- Error border: #d1242f (red)
- Success border: #1a7f37 (green)
- Error text: text-red-600, text-sm

TEST FIRST: Write tests that verify:
1. Form renders with correct styling
2. All form fields have correct input styling
3. Labels have correct typography
4. Focus states apply correct border colors
5. Validation error states can be applied

Note: Form submission should show "Feature coming soon" message since this is static export.
```

**Validation**:
- [ ] Form styling tests pass
- [ ] Input field styling tests pass
- [ ] Label typography tests pass
- [ ] Validation states work
- [ ] `yarn test` shows all tests passing

---

### **Step 3.16: Homepage Integration**
**Purpose**: Integrate all sections into the main homepage
**Commit**: `feat: integrate all sections into cohesive homepage layout`

**CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

Integrate all components into the main homepage (app/page.tsx):

INTEGRATION REQUIREMENTS:
- Import all section components: Hero, FeaturedProjects, TechnicalExpertise, ProfessionalJourney, ContactSection
- Proper section ordering with consistent spacing
- No gaps between sections (sections handle their own padding)
- Smooth scrolling behavior for future navigation

SECTION ORDER:
1. HeroSection
2. FeaturedProjects  
3. TechnicalExpertise
4. ProfessionalJourney
5. ContactSection

PAGE STRUCTURE:
- Main wrapper: min-h-screen
- Each section: full-width
- Semantic HTML: <main> wrapper with proper section tags

TEST FIRST: Write tests that verify:
1. All sections render in correct order
2. Page has proper semantic structure
3. No layout conflicts between sections
4. Page scrolling works smoothly
5. All sections receive correct props/data

Create a complete, working homepage that showcases all implemented sections.
```

**Validation**:
- [ ] All sections render correctly
- [ ] Section ordering is correct
- [ ] Page structure is semantic
- [ ] No layout conflicts
- [ ] `yarn test` shows all tests passing

---

## **Final Phase 3 Validation Checklist**

### **Visual Design Compliance**:
- [ ] JetBrains Mono used for all headings
- [ ] Inter used for all body text
- [ ] GitHub color palette correctly applied
- [ ] Consistent spacing and padding throughout
- [ ] All hover effects work smoothly
- [ ] Cards have proper GitHub-style borders and backgrounds

### **Responsive Design**:
- [ ] All sections work on mobile (320px+)
- [ ] Tablet layout (768px) works correctly
- [ ] Desktop layout (1024px+) is optimal
- [ ] Typography scales appropriately
- [ ] Grid layouts collapse correctly

### **Technical Requirements**:
- [ ] All components have comprehensive tests
- [ ] Every test passes with `yarn test`
- [ ] TypeScript compiles without errors
- [ ] No console errors in browser
- [ ] Components are properly typed

### **Performance & Accessibility**:
- [ ] Page loads quickly
- [ ] All images have alt text
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG standards

## **Git Workflow Summary**

Each step should follow this pattern:
```bash
# Before starting each step
git checkout main
git pull origin main

# After completing each step
yarn test  # Must pass before commit
git add .
git commit -m "[commit message from step]"
git push origin main
```

## **CursorAI Context Setup**

Add this to your CursorAI project rules:
```
VISUAL DESIGN REQUIREMENTS:
- Follow design-outline-proposal.md exactly
- Use JetBrains Mono for headings, Inter for body
- GitHub color palette: #ffffff/#0d1117 (bg), #24292f/#f0f6fc (text), #0969da/#58a6ff (accent)
- All components must have hover effects
- Cards use #f6f8fa/#21262d backgrounds with proper borders
- Responsive design is mandatory (mobile-first)

TDD REQUIREMENTS:
- Write test first, then implementation
- Run 'yarn test' after every change
- One failing test → one passing test → one commit
- Test typography, colors, layouts, and interactions
- Verify both light and dark theme support
```