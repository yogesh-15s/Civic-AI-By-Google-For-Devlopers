export default function ChatLoading() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '94px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', padding: '24px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }}>
          <span style={{ fontSize: '28px' }}>✨</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ height: '20px', width: '200px', background: 'var(--border-color)', borderRadius: '8px', margin: '0 auto 8px', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
          <div style={{ height: '14px', width: '140px', background: 'var(--border-color)', borderRadius: '8px', margin: '0 auto', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
        </div>
      </div>
      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
