import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Agentic Mobile — B2B AI Agent Workspace',
  description: 'Mobile-first AI agent workspace for B2B teams. Manage agents, approve workflows, and access insights on the go. Built with Next.js, OpenAI, and Supabase.',
  themeColor: '#09090b',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden h-full`}>
        {children}
      </body>
    </html>
  );
}
