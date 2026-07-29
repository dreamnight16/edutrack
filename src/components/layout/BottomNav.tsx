'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, Calendar, BookOpen, MessageCircle } from 'lucide-react';

const TABS = [
  { id: 'home', label: '发现', icon: Home, href: '/' },
  { id: 'timeline', label: '时间线', icon: Calendar, href: '/timeline' },
  { id: 'resources', label: '资源库', icon: BookOpen, href: '/resources' },
  { id: 'ask', label: 'AI 问问', icon: MessageCircle, href: '/ask' },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-primary/10 z-50">
      <div className="max-w-lg mx-auto flex justify-around py-2">
        {TABS.map((tab) => {
          const isActive =
            tab.href === '/'
              ? pathname === '/'
              : pathname.startsWith(tab.href);

          return (
            <button
              key={tab.id}
              onClick={() => router.push(tab.href)}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-card transition-colors ${
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
