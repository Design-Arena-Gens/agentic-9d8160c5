import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Idea Studio',
  description: 'Creative uses for everyday items',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
