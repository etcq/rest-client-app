'use client';

import { Link } from '@/i18n/navigation';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body style={{ fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
        <h2>Something went wrong 😢</h2>
        <h3>{error.digest}</h3>
        <div style={{ marginTop: '1.5rem' }}>
          <button
            onClick={() => reset()}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: 'none',
              background: '#0070f3',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Link href="/" style={{ color: '#0070f3', textDecoration: 'underline' }}>
            Go back main
          </Link>
        </div>
      </body>
    </html>
  );
}
