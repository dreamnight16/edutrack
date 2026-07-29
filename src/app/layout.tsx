import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '望塔 — 看见同龄人的路',
  description: '全国各地高中生在走什么路、用什么资源、什么时候做什么。打破信息差。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-background text-foreground font-body min-h-screen">
        <main className="max-w-lg mx-auto pb-16">{children}</main>
      </body>
    </html>
  );
}
