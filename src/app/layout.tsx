import type { Metadata } from 'next';
import { Manrope, Jost } from 'next/font/google';
import '@/app/globals.css';
import { ReduxProvider } from '@/redux/provider';
import AppShell from '@/components/AppShell';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mighty Luck Casino - Premium Online Casino',
  description: 'Unleash the Power of Mighty Luck. Play slots, table games, and enjoy instant payouts.',
  icons: { icon: '/images/logo.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${jost.variable} antialiased bg-[#03081e]`}>
        <ReduxProvider>
          <AppShell>{children}</AppShell>
        </ReduxProvider>
      </body>
    </html>
  );
}
