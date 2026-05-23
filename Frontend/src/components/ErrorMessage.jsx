export default function ErrorMessage({ message }) {
  return (
    <div style={{
      backgroundColor: '#fef2f2',
      borderLeft: '4px solid #ef4444',
      padding: '16px',
      margin: '24px 0',
      borderRadius: '6px',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flexShrink: 0 }}>
          <svg style={{ height: '20px', width: '20px', color: '#ef4444' }} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
        </div>
        <div style={{ marginLeft: '12px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#991b1b', margin: 0 }}>Error loading data</h3>
          <div style={{ marginTop: '8px', fontSize: '14px', color: '#b91c1c' }}>
            <p style={{ margin: 0 }}>{message || "Something went wrong. Please try again later."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
