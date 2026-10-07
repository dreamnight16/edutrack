import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '世界线 — 看见同龄人的路',
  description: '全国各地高中生在走什么路、用什么资源、什么时候做什么。打破信息差。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-background text-foreground font-body">
        <main className="mx-auto min-h-screen w-full max-w-6xl pb-[calc(4rem+env(safe-area-inset-bottom))] md:px-8 md:pb-24">{children}</main>
      </body>
    </html>
  );
}
