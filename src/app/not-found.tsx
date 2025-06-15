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
          ページが見つかりません
        </h2>
        <p style={{ marginBottom: '24px', color: '#666' }}>
          お探しのページは存在しないか、移動された可能性があります。
          URLをご確認いただくか、ホームページから再度アクセスしてください。
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
          ホームに戻る
        </Link>
      </div>
    </div>
  )
}
