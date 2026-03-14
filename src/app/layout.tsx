import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'CARE | HR Consultation Intelligence',
    template: '%s | CARE Agent',
  },
  description: 'CARE (Consultation Analysis & Recommendation Engine) — AI-powered HR consultation monitoring and coaching for the JSO Phase-2 platform.',
  applicationName: 'CARE Agent',
  generator: 'Next.js',
  keywords: ['HR AI', 'consultation analysis', 'agentic AI', 'JSO', 'career intelligence', 'LLM pipeline', 'recruitment', 'HR ethics'],
  authors: [{ name: 'AariyaTech Corp', url: 'https://care.aariyatech.com' }],
  creator: 'AariyaTech Corp',
  publisher: 'AariyaTech Corp',
  robots: 'index, follow', // Changed for production simulation
  openGraph: {
    title: 'CARE Agent — HR Consultation Intelligence',
    description: 'Multi-agent AI pipeline for HR consultation monitoring, tone analysis, and coaching.',
    type: 'website',
    siteName: 'CARE Agent',
    locale: 'en_US',
    url: 'https://care.aariyatech.com',
  },
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen flex bg-background text-foreground antialiased`}>
        <Sidebar />
        <div className="flex-1 overflow-y-auto pl-64">
          <div className="min-h-screen p-8 pt-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
