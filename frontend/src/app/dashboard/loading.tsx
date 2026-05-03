export default function DashboardLoading() {
  return (
    <div style={{ minHeight: '100vh', padding: '110px 24px 60px' }}>
      <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto' }}>
        {/* Welcome banner skeleton */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-color)',
          borderRadius: '24px', padding: '36px 40px', marginBottom: '36px',
          animation: 'skeleton-pulse 1.5s ease-in-out infinite'
        }}>
          <div style={{ height: '14px', width: '120px', background: 'var(--border-color)', borderRadius: '8px', marginBottom: '12px' }} />
          <div style={{ height: '32px', width: '60%', background: 'var(--border-color)', borderRadius: '8px', marginBottom: '16px' }} />
          <div style={{ height: '24px', width: '200px', background: 'var(--border-color)', borderRadius: '999px' }} />
        </div>

        {/* Grid skeleton */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: '24px', marginBottom: '24px' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '28px', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ height: '60px', background: 'var(--border-color)', borderRadius: '12px', marginBottom: '12px' }} />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[1,2].map(i => (
              <div key={i} style={{ height: '120px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        </div>

        {/* Quick cards skeleton */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ height: '140px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
