import { Inter as FontSans } from "@next/font/google"
import { ThemeProvider } from "~/components/Theme-provider"

import "~/styles/globals.css";
import { cn } from "~/lib/utils";

const fontSans = FontSans({
   subsets: ["latin"],
   variable: "--font-sans",
   display: "swap",
})

export const metadata = {
   title: 'MoviAI',
   description: 'MoviAI is a movie recommendation website that uses GPT AI to recommend movies based on your preferences.',
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
               fontSans.variable
            )}
         >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
               {children}
            </ThemeProvider>
         </body>
      </html>
   );
}