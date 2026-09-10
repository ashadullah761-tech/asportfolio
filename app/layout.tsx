import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import JsonLd from '@/components/sections/JsonLd';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ashadullah | Senior Full Stack Engineer & UI/UX Architect',
  description:
    'Production-ready personal portfolio of Ashadullah. Senior Full Stack Engineer specializing in Next.js 14, Supabase, TypeScript, and Framer Motion interactive web apps.',
  keywords: [
    'Full Stack Engineer',
    'Next.js 14 Portfolio',
    'Supabase Developer',
    'TypeScript Architect',
    'UI/UX Designer',
    'Web Application Specialist',
  ],
  authors: [{ name: 'Ashadullah' }],
  creator: 'Ashadullah',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Ashadullah | Senior Full Stack Engineer & UI/UX Architect',
    description:
      'Explore high-impact projects, tech stack proficiency, client endorsements, and interactive engineering solutions.',
    url: 'https://ashadullah.dev',
    siteName: 'Ashadullah Portfolio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200',
        width: 1200,
        height: 630,
        alt: 'Ashadullah Portfolio Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashadullah | Senior Full Stack Engineer',
    description: 'High-performance Next.js 14 & Supabase full-stack personal portfolio.',
    creator: '@ashadullah',
    images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <JsonLd />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="bg-background text-foreground selection:bg-purple-600 selection:text-white font-sans antialiased min-h-screen relative">
        {/* Ambient Glowing Orbs + Centered Golden Glowing Background Grid */}
        <div className="fixed inset-0 glowing-orbs-layer pointer-events-none z-0" />
        <div className="fixed inset-0 bg-golden-grid pointer-events-none z-0 opacity-95" />
        <div className="relative z-10">
          {children}
        </div>
        <Toaster position="bottom-right" theme="dark" closeButton />
      </body>
    </html>
  );
}
