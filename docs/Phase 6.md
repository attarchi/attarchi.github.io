# Phase 6: Blog System Setup - Detailed TDD Implementation

## **Development Rules for CursorAI**

**MANDATORY TDD WORKFLOW**: You must follow this exact process for every change:
1. Write failing unit test first
2. Run `yarn test` to confirm test fails
3. Write minimal code to make test pass
4. Run `yarn test` to confirm test passes
5. Refactor if needed while keeping tests green
6. Only then move to next small change

**Design System Requirements**:
- Use ONLY the GitHub-inspired color palette from design-outline-proposal.md
- Follow the exact typography system (JetBrains Mono for code, Inter for body)
- Implement all animations and hover effects as specified
- Maintain responsive behavior patterns established in phases 1-5

**Code Quality Standards**:
- Every component must have TypeScript interfaces
- All props must be typed
- Use semantic HTML with proper ARIA attributes
- Follow the established folder structure from phases 1-5
- Maximum 50 lines per component file (split if larger)

---

## **Step 6.1: Create Blog Post Type Interfaces**
**Purpose**: Define TypeScript interfaces for blog post data structure
**Git Commit**: `feat: add blog post TypeScript interfaces with validation tests`
**Time Estimate**: 20 minutes

### **Visual Requirements from Design Outline**:
- Blog posts must support the card design pattern specified
- Frontmatter structure for metadata
- Support for code syntax highlighting with JetBrains Mono
- Category badges using the accent color (`#0969da` / `#58a6ff`)

### **CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

DESIGN SYSTEM REQUIREMENTS:
- Use GitHub color palette: Background #ffffff/#0d1117, Text #24292f/#f0f6fc, Accent #0969da/#58a6ff
- Typography: JetBrains Mono for code, Inter for body text
- Follow the established component patterns from phases 1-5

TASK: Create TypeScript interfaces for blog post data structure:

1. First, create a failing test in `__tests__/types/blog.test.ts` that validates:
   - BlogPost interface exists with required fields
   - BlogPostFrontmatter interface for metadata
   - BlogPostMetadata interface for parsed data
   - Proper date handling and slug generation types

2. Required BlogPost interface fields:
   - title: string
   - slug: string (snake_case format)
   - date: Date
   - excerpt: string
   - tags: string[]
   - category: string
   - content: string
   - readingTime: number
   - published: boolean

3. Create the interfaces in `types/blog.ts` to make tests pass

4. Include JSDoc comments for all interfaces

5. Run `yarn test` after each small change to ensure TDD cycle

Keep changes minimal - create interfaces incrementally, one test at a time.
```

### **Validation Checklist**:
- [ ] Test file exists and initially fails
- [ ] All interface fields are properly typed
- [ ] JSDoc comments are comprehensive
- [ ] `yarn test` passes for all blog type tests
- [ ] Interfaces follow established project patterns

---

## **Step 6.2: Create Blog Post Card Component**
**Purpose**: Build the blog post preview card following design system
**Git Commit**: `feat: implement blog post card component with TDD approach`
**Time Estimate**: 45 minutes

### **Visual Requirements from Design Outline**:
```tsx
// Exact design from design-outline-proposal.md
<Card className="border-l-4 border-l-accent hover:border-l-8 transition-all">
  <CardHeader>
    <time className="text-muted text-sm font-mono">2025-05-22</time>
    <h4 className="font-mono font-medium">Building Offline-First Apps</h4>
    <p className="text-muted">Real-time synchronization strategies...</p>
  </CardHeader>
</Card>
```

### **CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

DESIGN SYSTEM REQUIREMENTS:
- Use exact design from design-outline-proposal.md for blog preview cards
- Colors: border-l-accent (#0969da/#58a6ff), text-muted (#656d76/#8b949e)
- Typography: font-mono for dates and titles, Inter for excerpts
- Hover effect: border-l-4 to border-l-8 with transition-all
- Card component should use the existing Card from phases 1-5

TASK: Create BlogPostCard component with TDD approach:

1. First, create failing test in `__tests__/components/blog-post-card.test.tsx`:
   - Test component renders with blog post data
   - Test hover effects on border
   - Test date formatting (YYYY-MM-DD format)
   - Test excerpt truncation
   - Test category badge rendering

2. Create minimal BlogPostCard component in `components/blog/blog-post-card.tsx`:
   - Accept BlogPost interface as prop
   - Implement exact design from design-outline-proposal.md
   - Use existing Card component from design system
   - Include proper hover animations

3. Required features (implement one at a time with tests):
   - Date formatting using font-mono
   - Title with proper typography
   - Excerpt with text truncation
   - Category badge with accent color
   - Hover border animation
   - Reading time indicator

4. Run `yarn test` after each small feature addition

Keep component under 50 lines. Split into smaller components if needed.
```

### **Validation Checklist**:
- [ ] Component matches exact design from design-outline-proposal.md
- [ ] All hover effects work smoothly
- [ ] Date formatting is correct
- [ ] Typography follows JetBrains Mono/Inter system
- [ ] All tests pass with `yarn test`
- [ ] Component is under 50 lines

---

## **Step 6.3: Implement Slug Generation Utility**
**Purpose**: Create snake_case slug generation from blog post titles
**Git Commit**: `feat: add slug generation utility with comprehensive tests`
**Time Estimate**: 30 minutes

### **Requirements from Technical Proposal**:
- Auto-convert titles to `snake_case` format
- SEO-friendly URLs
- Consistent naming convention

### **CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

TASK: Create slug generation utility with TDD approach:

1. First, create failing test in `__tests__/lib/slug-generator.test.ts`:
   - Test "Building Offline-First Apps" → "building_offline_first_apps"
   - Test special characters removal
   - Test multiple spaces handling
   - Test empty string handling
   - Test numbers and hyphens
   - Test unicode characters

2. Create `lib/slug-generator.ts` with generateSlug function:
   - Convert to lowercase
   - Replace spaces with underscores
   - Remove special characters except letters, numbers, underscores
   - Handle multiple consecutive spaces/underscores
   - Trim leading/trailing underscores

3. Test cases should include:
   - "React Native Cross-Platform" → "react_native_cross_platform"
   - "Building Apps with Next.js 14" → "building_apps_with_nextjs_14"
   - "API Design & Implementation" → "api_design_implementation"

4. Run `yarn test` after each small change

Keep function pure and well-documented with JSDoc.
```

### **Validation Checklist**:
- [ ] All test cases pass
- [ ] Function handles edge cases properly
- [ ] snake_case format is consistent
- [ ] Special characters are properly handled
- [ ] Function is pure (no side effects)

---

## **Step 6.4: Create Markdown Parser with Syntax Highlighting**
**Purpose**: Setup MDX parsing with code syntax highlighting
**Git Commit**: `feat: implement markdown parser with syntax highlighting`
**Time Estimate**: 40 minutes

### **Visual Requirements from Design Outline**:
- JetBrains Mono for code blocks
- Syntax highlighting that matches GitHub theme
- Proper code block styling with background colors

### **CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

DESIGN SYSTEM REQUIREMENTS:
- Code blocks use JetBrains Mono font
- Syntax highlighting matches GitHub theme colors
- Background colors: #f6f8fa (light) / #21262d (dark)
- Proper contrast ratios for accessibility

TASK: Create markdown parser with syntax highlighting:

1. First, install required dependencies:
   - `yarn add react-markdown react-syntax-highlighter`
   - `yarn add -D @types/react-syntax-highlighter`

2. Create failing test in `__tests__/lib/markdown-parser.test.ts`:
   - Test basic markdown parsing
   - Test code block syntax highlighting
   - Test frontmatter extraction
   - Test reading time calculation

3. Create `lib/markdown-parser.ts` with:
   - parseMarkdown function
   - extractFrontmatter function
   - calculateReadingTime function
   - Syntax highlighting configuration

4. Features to implement incrementally:
   - Basic markdown to HTML conversion
   - Frontmatter parsing (title, date, tags, etc.)
   - Code syntax highlighting with GitHub theme
   - Reading time estimation (average 200 words/minute)

5. Run `yarn test` after each function implementation

Keep each function focused and testable.
```

### **Validation Checklist**:
- [ ] Markdown parsing works correctly
- [ ] Code blocks render with proper syntax highlighting
- [ ] Frontmatter extraction works
- [ ] Reading time calculation is accurate
- [ ] All tests pass with `yarn test`

---

## **Step 6.5: Create Blog Post List Component**
**Purpose**: Build the main blog listing page with filtering
**Git Commit**: `feat: implement blog post list with filtering and search`
**Time Estimate**: 50 minutes

### **Visual Requirements from Design Outline**:
- Grid layout for blog cards
- Filter badges for categories
- Search functionality
- Responsive design (3-2-1 columns)

### **CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

DESIGN SYSTEM REQUIREMENTS:
- Use established grid patterns from phases 1-5
- Filter badges use accent color (#0969da/#58a6ff)
- Search input follows design system styling
- Responsive: 3 columns desktop, 2 tablet, 1 mobile

TASK: Create BlogPostList component with TDD approach:

1. First, create failing test in `__tests__/components/blog-post-list.test.tsx`:
   - Test renders list of blog posts
   - Test category filtering
   - Test search functionality
   - Test responsive grid layout
   - Test empty state handling

2. Create `components/blog/blog-post-list.tsx`:
   - Accept array of BlogPost props
   - Implement grid layout (3-2-1 responsive)
   - Use BlogPostCard component from step 6.2
   - Include category filter badges
   - Add search input with debounced filtering

3. Features to implement incrementally:
   - Basic list rendering
   - Category filtering
   - Search by title/excerpt
   - Sort by date (newest first)
   - Empty state message
   - Loading state

4. Create `components/blog/blog-filters.tsx` for filter controls:
   - Category filter badges
   - Search input
   - Sort options

5. Run `yarn test` after each feature addition

Keep components under 50 lines each.
```

### **Validation Checklist**:
- [ ] Grid layout is responsive (3-2-1 columns)
- [ ] Filtering works correctly
- [ ] Search functionality is debounced
- [ ] Empty states are handled
- [ ] All tests pass with `yarn test`

---

## **Step 6.6: Create Individual Blog Post Page**
**Purpose**: Build the single blog post display page
**Git Commit**: `feat: implement individual blog post page with navigation`
**Time Estimate**: 40 minutes

### **Visual Requirements from Design Outline**:
- Professional typography hierarchy
- Code blocks with proper styling
- Navigation between posts
- Reading time and metadata display

### **CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

DESIGN SYSTEM REQUIREMENTS:
- Follow typography hierarchy from design-outline-proposal.md
- Code blocks use JetBrains Mono with proper backgrounds
- Metadata uses muted colors (#656d76/#8b949e)
- Navigation links use accent color

TASK: Create individual blog post page component:

1. First, create failing test in `__tests__/components/blog-post-page.test.tsx`:
   - Test renders blog post content
   - Test metadata display (date, reading time, tags)
   - Test navigation links
   - Test code block rendering
   - Test SEO elements

2. Create `components/blog/blog-post-page.tsx`:
   - Accept BlogPost prop
   - Render parsed markdown content
   - Display metadata header
   - Include navigation to previous/next posts
   - Add back to blog list link

3. Features to implement incrementally:
   - Post header with metadata
   - Markdown content rendering
   - Tag badges
   - Navigation controls
   - SEO metadata

4. Create `components/blog/post-navigation.tsx`:
   - Previous/next post links
   - Back to blog list
   - Social sharing buttons (future)

5. Run `yarn test` after each component

Keep typography consistent with design system.
```

### **Validation Checklist**:
- [ ] Blog post content renders correctly
- [ ] Metadata is properly displayed
- [ ] Navigation works smoothly
- [ ] Typography follows design system
- [ ] All tests pass with `yarn test`

---

## **Step 6.7: Create Blog Page Routes**
**Purpose**: Setup Next.js App Router pages for blog system
**Git Commit**: `feat: add blog page routes with static generation`
**Time Estimate**: 35 minutes

### **Requirements from Technical Proposal**:
- Static export compatibility
- SEO-optimized pages
- Proper routing for GitHub Pages

### **CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

TASK: Create Next.js App Router pages for blog system:

1. First, create failing test in `__tests__/app/blog.test.tsx`:
   - Test blog listing page renders
   - Test individual post page renders
   - Test 404 handling for non-existent posts
   - Test SEO metadata generation

2. Create `app/blog/page.tsx`:
   - Import BlogPostList component
   - Fetch blog posts from markdown files
   - Generate proper SEO metadata
   - Handle loading states

3. Create `app/blog/[slug]/page.tsx`:
   - Dynamic route for individual posts
   - Use generateStaticParams for static export
   - Parse markdown file for content
   - Generate SEO metadata per post

4. Create `lib/blog-data.ts`:
   - getAllBlogPosts function
   - getBlogPostBySlug function
   - getStaticPaths helper
   - File system operations for markdown files

5. Features to implement incrementally:
   - Blog listing page
   - Individual post pages
   - Static generation setup
   - SEO metadata
   - 404 handling

6. Run `yarn test` after each page creation

Ensure static export compatibility throughout.
```

### **Validation Checklist**:
- [ ] `/blog` page renders correctly
- [ ] `/blog/[slug]` pages work
- [ ] Static generation works
- [ ] SEO metadata is generated
- [ ] 404 pages work properly

---

## **Step 6.8: Create Sample Blog Posts**
**Purpose**: Add 2-3 initial blog posts with proper formatting
**Git Commit**: `feat: add initial blog posts with proper markdown formatting`
**Time Estimate**: 30 minutes

### **Content Requirements from Technical Proposal**:
- Technical topics relevant to portfolio
- Proper code examples
- Professional writing style

### **CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

TASK: Create sample blog posts with proper markdown formatting:

1. First, create failing test in `__tests__/content/blog-posts.test.ts`:
   - Test all blog posts have valid frontmatter
   - Test markdown content is properly formatted
   - Test code blocks have proper syntax
   - Test reading time is calculated correctly

2. Create `content/posts/building_offline_first_apps.md`:
   - Frontmatter with title, date, tags, excerpt
   - Technical content about offline-first architecture
   - Code examples with proper syntax highlighting
   - Professional writing style

3. Create `content/posts/react_native_cross_platform.md`:
   - Cross-platform development strategies
   - Performance optimization tips
   - Real-world examples

4. Create `content/posts/nextjs_static_optimization.md`:
   - Static site generation techniques
   - Performance optimization
   - Deployment strategies

5. Each post should include:
   - Proper frontmatter structure
   - Technical code examples
   - Professional insights
   - 800-1200 word count

6. Run `yarn test` after each post creation

Ensure all posts follow the established slug naming convention.
```

### **Validation Checklist**:
- [ ] All posts have valid frontmatter
- [ ] Code examples work properly
- [ ] Content is professional and technical
- [ ] Slugs follow snake_case convention
- [ ] All tests pass with `yarn test`

---

## **Step 6.9: Integrate Blog System with Homepage**
**Purpose**: Add blog preview section to homepage
**Git Commit**: `feat: integrate blog system with homepage preview section`
**Time Estimate**: 25 minutes

### **Visual Requirements from Design Outline**:
- "Latest Blog Posts" section on homepage
- 3 recent posts preview
- "View All Posts" link
- Consistent with homepage design

### **CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

DESIGN SYSTEM REQUIREMENTS:
- Follow homepage section patterns from phases 1-5
- Use established spacing and typography
- Blog preview cards should match design system

TASK: Integrate blog system with homepage:

1. First, create failing test in `__tests__/components/homepage-blog-preview.test.tsx`:
   - Test renders 3 latest blog posts
   - Test "View All Posts" link
   - Test responsive layout
   - Test integration with existing homepage

2. Create `components/sections/blog-preview-section.tsx`:
   - Fetch 3 latest blog posts
   - Use BlogPostCard component
   - Add section header "Latest Blog Posts"
   - Include "View All Posts" link

3. Update `app/page.tsx`:
   - Add BlogPreviewSection to homepage
   - Maintain proper section spacing
   - Ensure smooth integration

4. Features to implement incrementally:
   - Blog preview section component
   - Homepage integration
   - Responsive layout
   - Navigation links

5. Run `yarn test` after each integration step

Keep section consistent with other homepage sections.
```

### **Validation Checklist**:
- [ ] Blog preview appears on homepage
- [ ] Shows 3 latest posts correctly
- [ ] "View All Posts" link works
- [ ] Responsive design is maintained
- [ ] Integration is seamless

---

## **Step 6.10: Optimize Blog System Performance**
**Purpose**: Ensure blog system works efficiently with static export
**Git Commit**: `feat: optimize blog system for static export performance`
**Time Estimate**: 30 minutes

### **CursorAI Prompt**:
```
You should develop in TDD mode. Please prepare a unit test first, then make your changes. Then confirm your changes with the 'yarn test' command, and then make the next change. Continue this cycle with small changes until you make everything correctly.

TASK: Optimize blog system for performance:

1. First, create failing test in `__tests__/lib/blog-optimization.test.ts`:
   - Test static generation performance
   - Test markdown parsing caching
   - Test image optimization
   - Test bundle size impact

2. Optimize `lib/blog-data.ts`:
   - Add caching for parsed markdown
   - Optimize file system operations
   - Implement lazy loading for blog content

3. Optimize components:
   - Add proper React.memo usage
   - Implement loading states
   - Optimize re-renders

4. Performance improvements:
   - Static generation optimization
   - Markdown parsing caching
   - Image lazy loading
   - Bundle size optimization

5. Run `yarn test` and `yarn build` after each optimization

Monitor build times and bundle sizes.
```

### **Validation Checklist**:
- [ ] Static export builds successfully
- [ ] Performance is optimized
- [ ] Bundle size is reasonable
- [ ] All tests pass
- [ ] Build time is acceptable

---

## **Phase 6 Success Criteria**

After completing all steps, verify:
- [ ] `/blog` page displays all posts correctly
- [ ] Individual post pages (`/blog/[slug]`) work
- [ ] Homepage shows latest 3 posts
- [ ] All components have comprehensive tests
- [ ] Static export includes all blog pages
- [ ] Performance is optimized
- [ ] SEO metadata is properly generated
- [ ] Design system consistency is maintained
- [ ] All hover effects and animations work
- [ ] Mobile responsiveness is perfect

## **Final Validation Commands**
```bash
# Test everything
yarn test

# Build static export
yarn build

# Verify all pages exist in /out directory
ls -la out/blog/

# Check no TypeScript errors
yarn build

# Verify responsive design
# Test on mobile/tablet/desktop manually
```

Each step should take 20-50 minutes and result in a focused, working feature with comprehensive tests.