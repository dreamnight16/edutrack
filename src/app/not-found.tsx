import Link from 'next/link';
import { fieldClass } from '@/lib/theme';

export default function NotFound() {
  return (
    <div className={fieldClass('steel')}>
      <div className="wl-masthead" style={{ paddingBlock: '5rem' }}>
        <p className="wl-kicker">404 · NOT FOUND</p>
        <h1 className="wl-h1" style={{ marginTop: '0.75rem' }}>
          这条世界线不存在
        </h1>
        <p className="wl-lead" style={{ marginTop: '1rem' }}>
          链接可能已经失效，或者这条赛道还没有被收录。已经收录的赛道可以从下面进去。
        </p>
        <div style={{ marginTop: '2rem' }}>
          <Link href="/" className="wl-btn dn-interactive dn-focus">
            回到全部赛道 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
