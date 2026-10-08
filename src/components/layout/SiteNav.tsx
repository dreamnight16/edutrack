'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/site';

const TABS = [
  { href: '/', label: '发现', latin: 'DISCOVER' },
  { href: '/timeline', label: '时间线', latin: 'TIMELINE' },
  { href: '/resources', label: '资源库', latin: 'RESOURCES' },
  { href: '/ask', label: '快速查找', latin: 'LOOKUP' },
] as const;

/** Track detail pages belong to the discover section. */
function isCurrent(href: string, pathname: string): boolean {
  if (href === '/') return pathname === '/' || pathname.startsWith('/tracks');
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="wl-nav dn-acrylic" aria-label="主导航">
      <div className="wl-nav__inner">
        <Link href="/" className="wl-nav__brand">
          <span className="wl-h3">{SITE.name}</span>
          <span className="wl-kicker wl-secondary">{SITE.latinName}</span>
        </Link>
        <ul className="wl-nav__list">
          {TABS.map((tab) => {
            const current = isCurrent(tab.href, pathname);
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  className="wl-nav__link dn-focus"
                  aria-current={current ? 'page' : undefined}
                >
                  <span className="wl-nav__label">{tab.label}</span>
                  <span className="wl-nav__latin" aria-hidden="true">
                    {tab.latin}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
