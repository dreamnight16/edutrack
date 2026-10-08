'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BackLinkProps {
  href: string;
  label: string;
}

/**
 * Origin & Return: when the visitor arrived from inside Worldline we go back
 * through the session history so the previous list, its filters and its scroll
 * position survive. A real href stays on the element, so middle-click, "open in
 * new tab" and the reload/deep-link case still work.
 */
export function BackLink({ href, label }: BackLinkProps) {
  const router = useRouter();
  const [fromSite, setFromSite] = useState(false);

  useEffect(() => {
    if (!document.referrer) return;
    try {
      setFromSite(new URL(document.referrer).origin === window.location.origin);
    } catch {
      setFromSite(false);
    }
  }, []);

  return (
    <Link
      href={href}
      className="wl-link dn-focus"
      style={{ display: 'inline-block', fontSize: '0.875rem', fontWeight: 600 }}
      onClick={(event) => {
        if (!fromSite) return;
        event.preventDefault();
        router.back();
      }}
    >
      <span aria-hidden="true">← </span>
      {label}
    </Link>
  );
}
