export default function Spinner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '12rem', gap: '1rem' }}>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            50% { opacity: .5; }
          }
          .custom-spinner {
            border: 2px solid transparent;
            border-top-color: #4f46e5;
            border-bottom-color: #4f46e5;
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            animation: spin 1s linear infinite;
          }
          .custom-pulse {
            color: #6b7280;
            font-weight: 500;
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}
      </style>
      <div className="custom-spinner"></div>
      <p className="custom-pulse">Loading data...</p>
    </div>
  );
}
