import { Inter } from 'next/font/google';
import { Metadata } from 'next';

import './[lang]/globals.css';

const inter = Inter({
  weight: ['300','400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});



export const metadata: Metadata = {
  title: 'Yougazine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        className={`${inter.variable}`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
