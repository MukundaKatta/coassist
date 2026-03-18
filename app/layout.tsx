import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'CoAssist - Cobot Programming Platform', description: 'Visual programming, safety zones, and production line optimization for cobots' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className="dark"><body className="min-h-screen bg-[#050810] text-gray-100 antialiased">{children}</body></html>);
}
