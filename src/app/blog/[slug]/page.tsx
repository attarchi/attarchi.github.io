import { BlogPostPage } from '@/components/blog/blog-post-page';
import { BlogPost } from '@/types';
import { notFound } from 'next/navigation';

// Mock data - in a real app, this would come from a CMS or markdown files
const mockPosts: BlogPost[] = [
  {
    title: 'Building Offline-First Apps',
    slug: 'building-offline-first-apps',
    date: new Date('2025-01-15'),
    excerpt: 'Real-time synchronization strategies for mobile applications',
    tags: ['React Native', 'Offline', 'Sync'],
    category: 'Mobile Development',
    content: `
# Building Offline-First Apps

This is a comprehensive guide to building offline-first applications that work seamlessly even when users have poor or no internet connectivity.

## Why Offline-First?

Offline-first applications provide a superior user experience by:

- Working immediately without waiting for network requests
- Continuing to function in areas with poor connectivity
- Reducing server load and bandwidth usage
- Providing faster response times for common operations

## Key Components

### 1. Data Synchronization

\`\`\`javascript
const syncData = async () => {
  const offlineData = await getOfflineData();
  const onlineData = await fetchOnlineData();
  return mergeData(offlineData, onlineData);
};
\`\`\`

### 2. Conflict Resolution

When data changes occur both offline and online, you need a strategy to resolve conflicts:

- **Last Write Wins**: Simple but can lose data
- **Merge Strategies**: More complex but preserves all changes
- **User Resolution**: Let users choose which version to keep

### 3. Storage Strategy

Choose the right storage mechanism for your needs:

- **IndexedDB**: For complex data structures
- **LocalStorage**: For simple key-value pairs
- **SQLite**: For relational data (in mobile apps)

## Implementation Example

Here's a basic implementation using React Native and AsyncStorage:

\`\`\`javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

class OfflineFirstApp {
  async saveData(key, data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      await this.queueForSync(key, data);
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  }

  async loadData(key) {
    try {
      const offlineData = await AsyncStorage.getItem(key);
      return offlineData ? JSON.parse(offlineData) : null;
    } catch (error) {
      console.error('Failed to load data:', error);
      return null;
    }
  }

  async queueForSync(key, data) {
    const syncQueue = await this.getSyncQueue();
    syncQueue.push({ key, data, timestamp: Date.now() });
    await AsyncStorage.setItem('syncQueue', JSON.stringify(syncQueue));
  }
}
\`\`\`

## Best Practices

1. **Always cache critical data locally**
2. **Implement proper error handling for network failures**
3. **Use optimistic updates for better UX**
4. **Provide clear feedback about sync status**
5. **Test thoroughly with poor network conditions**

## Conclusion

Building offline-first applications requires careful planning and implementation, but the benefits in user experience are significant. Start with a simple caching strategy and gradually add more sophisticated sync capabilities as your app grows.

Remember: the goal is to make your app feel like it works instantly, regardless of network conditions.
`,
    readingTime: 8,
    published: true
  },
  {
    title: 'Microservices Architecture Patterns',
    slug: 'microservices-architecture-patterns',
    date: new Date('2025-01-10'),
    excerpt: 'Best practices for designing scalable microservices',
    tags: ['Microservices', 'Architecture', 'Scalability'],
    category: 'Backend Development',
    content: `
# Microservices Architecture Patterns

A comprehensive guide to designing and implementing scalable microservices architectures.

## What are Microservices?

Microservices are an architectural style where an application is built as a collection of small, autonomous services that communicate over well-defined APIs.

## Key Patterns

### 1. API Gateway Pattern

The API Gateway acts as a single entry point for all client requests, handling cross-cutting concerns like authentication, rate limiting, and routing.

### 2. Circuit Breaker Pattern

Circuit breakers prevent cascading failures by monitoring for failures and stopping the flow of requests when a threshold is reached.

### 3. Event-Driven Architecture

Services communicate through events, enabling loose coupling and better scalability.

## Implementation Considerations

- **Service Discovery**: How services find each other
- **Load Balancing**: Distributing traffic across instances
- **Monitoring**: Observability and health checks
- **Security**: Authentication and authorization
`,
    readingTime: 12,
    published: true
  },
  {
    title: 'Modern CSS Techniques',
    slug: 'modern-css-techniques',
    date: new Date('2025-01-05'),
    excerpt: 'Advanced CSS features for modern web development',
    tags: ['CSS', 'Frontend', 'Web Development'],
    category: 'Frontend Development',
    content: `
# Modern CSS Techniques

Exploring the latest CSS features and how to use them effectively in modern web development.

## CSS Grid Layout

CSS Grid provides a powerful two-dimensional layout system:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
\`\`\`

## CSS Custom Properties

Custom properties (CSS variables) enable dynamic theming and better maintainability:

\`\`\`css
:root {
  --primary-color: #0969da;
  --background-color: #ffffff;
}

.button {
  background-color: var(--primary-color);
  color: var(--background-color);
}
\`\`\`

## Modern Selectors

New CSS selectors provide more powerful targeting capabilities:

\`\`\`css
/* Select elements that are the first of their type */
p:first-of-type {
  font-weight: bold;
}

/* Select elements that match a pattern */
[class*="btn-"] {
  border-radius: 4px;
}
\`\`\`
`,
    readingTime: 6,
    published: true
  }
];

// Generate static params for all blog posts
export async function generateStaticParams() {
  return mockPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPageRoute({ params }: BlogPostPageProps) {
  const { slug } = params;
  
  // Find the post by slug
  const post = mockPosts.find(p => p.slug === slug);
  
  if (!post) {
    notFound();
  }
  
  // Find previous and next posts for navigation
  const currentIndex = mockPosts.findIndex(p => p.slug === slug);
  const prev = currentIndex > 0 ? mockPosts[currentIndex - 1] : undefined;
  const next = currentIndex < mockPosts.length - 1 ? mockPosts[currentIndex + 1] : undefined;
  
  return <BlogPostPage post={post} prev={prev} next={next} />;
} 