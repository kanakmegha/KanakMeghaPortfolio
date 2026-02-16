import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

import { UnifrakturMaguntia, Playfair_Display, Inter } from 'next/font/google';

const fontBlackletter = UnifrakturMaguntia({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-blackletter',
});

const fontSerif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Kanak's AI Portfolio",
  description: 'A personal portfolio showcasing projects and skills, enhanced with AI features.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    'news-bg': '#FDFBF7',
                    'news-ink': '#2C2C2C',
                    'news-accent': '#B22222',
                  },
                  fontFamily: {
                    blackletter: ['UnifrakturMaguntia', 'serif'],
                    serif: ['Playfair Display', 'serif'],
                    sans: ['Inter', 'sans-serif'],
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body 
        className={cn(
          'font-body antialiased', 
          fontPoppins.variable, 
          fontBlackletter.variable, 
          fontSerif.variable, 
          fontInter.variable
        )}
        style={{ 
          backgroundColor: '#FDFBF7', 
          color: '#2C2C2C',
          fontFamily: "'Playfair Display', serif",
          margin: 0,
          padding: 0
        }}
      >
        {children}
        <Toaster />
        <svg style={{ display: 'none' }}>
          <filter id="paper-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          </filter>
        </svg>
      </body>
    </html>
  );
}
