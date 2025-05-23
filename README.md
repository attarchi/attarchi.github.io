# Professional Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

[![codecov](https://codecov.io/gh/attarchi/attarchi.github.io/branch/master/graph/badge.svg)](https://codecov.io/gh/attarchi/attarchi.github.io)


## Features

- Modern, responsive design
- TypeScript for type safety
- Blog system with MDX support
- Project showcase
- Professional timeline
- Contact section
- Dark/light theme
- SEO optimized
- Performance focused

## Technologies

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- MDX
- GitHub Pages

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/attarchi/attarchi.github.io.git
cd attarchi.github.io
```

2. Install dependencies:
```bash
yarn install
```

3. Run the development server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── layout/         # Layout components
│   ├── sections/       # Page sections
│   └── shared/         # Shared components
├── content/            # Content files
│   ├── posts/         # Blog posts
│   └── projects/      # Project data
├── lib/               # Library code
├── types/             # TypeScript interfaces
├── utils/             # Utility functions
└── constants/         # Configuration constants
```

## Development

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn type-check` - Run TypeScript type checking


## Design System

- **Typography**: JetBrains Mono (headings) and Inter (body)
- **Colors**: GitHub-inspired palette with light/dark mode support
- **Animations**: Scroll-triggered with Framer Motion
- **Components**: Custom-built with shadcn/ui and Tailwind CSS

## Deployment

The site is automatically deployed to GitHub Pages using GitHub Actions. Each push to the main branch triggers a new deployment.

### Manual GitHub Pages Setup

1. **Repository Configuration**
   - Go to your repository settings
   - Navigate to "Pages" under "Code and automation"
   - Set the source to "GitHub Actions"

2. **Environment Setup**
   - Create a `.env` file with your GitHub Pages base path (folder settings)
   - For GitHub Actions, add the environment variable to your GitHub repository:
     1. Go to your repository settings
     2. Navigate to "Secrets and variables" → "Actions"
     3. Click "New repository secret"
     4. Name: `NEXT_PUBLIC_BASE_PATH`
     5. Value: `GitHub Pages base path`
     6. Click "Add secret"

3. **Custom Domain (Optional)**
   - Add your custom domain in repository settings
   - Create a CNAME file in the `public` directory
   - Update DNS settings with your domain provider

### Deployment Verification

After deployment:
1. Wait for the GitHub Actions workflow to complete
2. Visit `https://<youname>.github.io`
3. Verify all pages and assets load correctly
4. Check that all animations and interactions work
5. Test the site on different devices and browsers

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Feel free to open issues or submit pull requests for any improvements.

## License

MIT License - feel free to use this code for your own portfolio!