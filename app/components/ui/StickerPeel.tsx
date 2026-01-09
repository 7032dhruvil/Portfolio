import { useState } from 'react';

export default function StickerPeel({ children, overlay }: { children: React.ReactNode, overlay: string }) {
  const [isPeeled, setIsPeeled] = useState(false);

  return (
    <div 
      className="sticker-container"
      onMouseEnter={() => setIsPeeled(true)}
      onMouseLeave={() => setIsPeeled(false)}
      style={{
        position: 'relative',
        width: 'fit-content',
        cursor: 'pointer',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'var(--accent)',
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          transformOrigin: 'top left',
          transform: isPeeled ? 'rotate(-110deg) translate(-20%, -20%)' : 'rotate(0deg)',
          zIndex: 2,
          pointerEvents: 'none',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}
      >
        {overlay}
      </div>
    </div>
  );
}
