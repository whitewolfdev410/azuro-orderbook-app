/* eslint-disable @next/next/no-page-custom-font */
import { Notification } from '@/components/Noti';
import { RootLayoutHeader } from '@/layouts/root/components';
import { AppProvider } from '@/providers';
import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';

export const metadata: Metadata = {
  title: 'WhalesBet',
  description: 'The decentralized betting',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const initialChainId = cookieStore.get('appChainId')?.value;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#1A1F26] text-white text-[14px]">
        <AppProvider initialChainId={initialChainId}>
          <Notification />
          <div className="md:max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12">
            <RootLayoutHeader />
            <main>{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
