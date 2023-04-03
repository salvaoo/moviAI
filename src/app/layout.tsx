import { Inter } from "@next/font/google"
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

import { ThemeProvider } from "~/components/Theme-provider"

import "~/styles/globals.css";
import { cn } from "~/lib/utils";

const inter = Inter({
   subsets: ['latin'],
   variable: "--font-inter",
   display: 'swap',
 })

export const metadata: Metadata = {
   title: 'MoviAI',
   description: 'MoviAI is a movie recommendation website that uses GPT AI to recommend movies based on your preferences.',
   keywords: ['Next.js', 'React', 'openAI', 'GPT', 'movie', 'recommendation', 'website', 'moviAI'],
   authors: [{ name: 'salvagr', url: 'https://salvagr.com' }],
   themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: '#2e026d' },
   ],
   openGraph: {
      title: 'MoviAI',
      description: 'MoviAI is a movie recommendation website that uses GPT AI to recommend movies based on your preferences.',
      url: 'https://movi-ai.vercel.app',
      siteName: 'MoviAI',
      images: [
         {
            url: 'https://raw.githubusercontent.com/salvaoo/moviAI/main/public/light_mode_moviAI.png',
            width: 800,
            height: 600,
         },
         {
            url: 'https://raw.githubusercontent.com/salvaoo/moviAI/main/public/light_mode_moviAI.png',
            width: 1800,
            height: 1600,
            alt: 'MoviAI Light Mode',
         },
      ],
      locale: 'en_US',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'MoviAI',
      description: 'MoviAI is a movie recommendation website that uses GPT AI to recommend movies based on your preferences.',
      creator: '@salvagr_',
      images: ['https://raw.githubusercontent.com/salvaoo/moviAI/main/public/light_mode_moviAI.png'],
   },
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <head />
         <body
            className={cn(
               "min-h-screen font-sans bg-gradient-to-b from-slate-50 to-[hsl(280,100%,95%)] text-slate-900 antialiased dark:text-slate-50 dark:bg-gradient-to-b dark:from-[#2e026d] dark:to-[#15162c]",
               inter.variable
            )}
         >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
               {children}
               <Analytics />
            </ThemeProvider>
         </body>
      </html>
   );
}