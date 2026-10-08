import type { Metadata } from 'next';
import './globals.css';
import { SiteNav } from '@/components/layout/SiteNav';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — 看见同龄人的路`,
    template: `%s · ${SITE.name}`,
  },
  description:
    '全国各地高中生在走什么路、用什么资源、什么时候做什么。数据来自仓库内置的静态文件，打破信息差。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        {/* DNDL v1.0 (implementation 1.1.0) — vendored verbatim, see public/vendor/dndl/VERSION.
            tokens.css must load before materials.css and motion.css. */}
        <link rel="stylesheet" href="/vendor/dndl/tokens.css" />
        <link rel="stylesheet" href="/vendor/dndl/materials.css" />
        <link rel="stylesheet" href="/vendor/dndl/motion.css" />
      </head>
      <body>
        <a className="wl-skip" href="#main">
          跳到主要内容
        </a>
        <SiteNav />
        <div className="wl-shell">
          <main id="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
