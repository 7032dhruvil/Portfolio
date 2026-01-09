import { useRef } from "react";

export default function ElectricBorder({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef} 
      className="electric-container"
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '2px', // Space for the "border"
        overflow: 'hidden',
        borderRadius: '4px',
      }}
    >
      <div className="electric-effect" />
      <div style={{
        position: 'relative',
        background: '#050505',
        padding: '1.5rem 3rem',
        zIndex: 1,
        borderRadius: '3px',
      }}>
        {children}
      </div>
      <style>{`
        .electric-container .electric-effect {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            transparent,
            transparent,
            transparent,
            var(--accent)
          );
          animation: rotate 2s linear infinite;
          z-index: 0;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
