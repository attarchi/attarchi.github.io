import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/lib/theme'
import { ProgressBar } from '@/components/micro';
import { RecaptchaProvider } from './RecaptchaProvider';

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Attarchi - Senior Full-Stack Developer | React, Node.js, Mobile",
  description: "Professional portfolio of Attarchi, a Senior Full-Stack Developer specializing in React, Node.js, TypeScript, and mobile app development. Based in Turkey with expertise in modern web technologies and offline-first architectures.",
  keywords: "Full-Stack Developer, React, Node.js, TypeScript, Mobile Apps, Turkey, JavaScript, Frontend, Backend, Web Development, Software Engineer",
  authors: [{ name: "Attarchi" }],
  creator: "Attarchi",
  publisher: "Attarchi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://attarchi.github.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Attarchi - Senior Full-Stack Developer | React, Node.js, Mobile",
    description: "Professional portfolio of Attarchi, a Senior Full-Stack Developer specializing in React, Node.js, TypeScript, and mobile app development. Based in Turkey with expertise in modern web technologies.",
    url: 'https://attarchi.github.io',
    siteName: 'Attarchi Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Attarchi - Senior Full-Stack Developer | React, Node.js, Mobile",
    description: "Professional portfolio of Attarchi, a Senior Full-Stack Developer specializing in React, Node.js, TypeScript, and mobile app development.",
    creator: '@attarchi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ProgressBar />
        <RecaptchaProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </RecaptchaProvider>
      </body>
    </html>
  );
}
