'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, Calendar, BookOpen, MessageCircle } from 'lucide-react';

const TABS = [
  { id: 'home', label: '发现', icon: Home, href: '/' },
  { id: 'timeline', label: '时间线', icon: Calendar, href: '/timeline' },
  { id: 'resources', label: '资源库', icon: BookOpen, href: '/resources' },
  { id: 'ask', label: '快速查找', icon: MessageCircle, href: '/ask' },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/10 bg-surface md:bottom-5 md:left-1/2 md:right-auto md:w-auto md:-translate-x-1/2 md:rounded-chip md:border md:shadow-card">
      <div className="mx-auto flex max-w-lg justify-around py-2 md:px-2">
        {TABS.map((tab) => {
          const isActive =
            tab.href === '/'
              ? pathname === '/'
              : pathname.startsWith(tab.href);

          return (
            <button
              key={tab.id}
              onClick={() => router.push(tab.href)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-11 flex-col items-center justify-center gap-1 rounded-card px-3 py-1 transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <tab.icon size={20} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
