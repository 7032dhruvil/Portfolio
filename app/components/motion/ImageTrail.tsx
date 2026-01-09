import { useRef, useEffect, useState } from 'react';

interface TrailImage {
  id: number;
  x: number;
  y: number;
  src: string;
}

export default function ImageTrail({ src, alt = "Project visual" }: { src: string, alt?: string }) {
  const [trail, setTrail] = useState<TrailImage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });

  const threshold = 50; // Distance to move before adding new image

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);

      if (dist > threshold) {
        const newImage = { id: nextId.current++, x, y, src };
        setTrail(prev => [...prev.slice(-10), newImage]);
        lastPos.current = { x, y };

        // Auto remove after time
        setTimeout(() => {
          setTrail(prev => prev.filter(img => img.id !== newImage.id));
        }, 500);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [src]);

  return (
    <div ref={containerRef} style={{ 
      position: 'relative', 
      width: '100%', 
      height: '300px', 
      background: '#111', 
      overflow: 'hidden',
      cursor: 'pointer'
    }}>
      {trail.map(img => (
        <img
          key={img.id}
          src={img.src}
          alt={alt}
          style={{
            position: 'absolute',
            top: img.y - 75,
            left: img.x - 100,
            width: '200px',
            height: '150px',
            objectFit: 'cover',
            filter: 'grayscale(100%)',
            pointerEvents: 'none',
            zIndex: img.id,
            animation: 'trailFade 0.5s forwards'
          }}
        />
      ))}
      <style>{`
        @keyframes trailFade {
          from { opacity: 0.6; transform: scale(0.9); }
          to { opacity: 0; transform: scale(1.1); }
        }
      `}</style>
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '1rem',
        zIndex: 100
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Project Title</h3>
        <p className="muted" style={{ fontSize: '0.8rem' }}>Conceptual / Web / 2026</p>
      </div>
    </div>
  );
}
