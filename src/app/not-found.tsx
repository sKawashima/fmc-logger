import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        padding: '32px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '480px' }}>
        <h2 style={{ color: '#d14343', marginBottom: '16px' }}>
          Page Not Found
        </h2>
        <p style={{ marginBottom: '24px', color: '#666' }}>
          The page you are looking for does not exist or may have been moved.
          Please check the URL or access again from the home page.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: '#1070ca',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
          }}
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
