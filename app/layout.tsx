import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const SITE_URL = 'https://agentic.aurimas.io';
const OG_IMAGE = `${SITE_URL}/linkedin-featured.svg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Agentic Mobile — B2B AI Agent Workspace',
  description:
    'A mobile-first AI agent workspace for B2B decision-makers. Manage agents, approve workflows, and access insights on the go. Built with Next.js, OpenAI, and Supabase by Aurimas A. Nausėdas.',
  keywords: [
    'AI Product Manager',
    'AI Architect',
    'Fractional AI PM',
    'B2B AI',
    'Agentic AI',
    'Mobile AI',
    'Generative UI',
    'Next.js',
    'OpenAI',
    'Aurimas Nausėdas',
  ],
  authors: [{ name: 'Aurimas A. Nausėdas', url: 'https://aurimas.io' }],
  creator: 'Aurimas A. Nausėdas',
  themeColor: '#FAF7F0',
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Agentic Mobile — B2B AI Agent Workspace',
    description:
      'Mobile-first AI agent workspace. A case study by Aurimas A. Nausėdas — Fractional AI Product Manager & AI Architect.',
    siteName: 'Agentic Mobile',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 627,
        alt: 'Agentic Mobile — B2B AI Agent Workspace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic Mobile — B2B AI Agent Workspace',
    description:
      'Mobile-first AI agent workspace. A case study by Aurimas A. Nausėdas — Fractional AI PM & AI Architect.',
    images: [OG_IMAGE],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-full`}>
        {children}
      </body>
    </html>
  );
}
