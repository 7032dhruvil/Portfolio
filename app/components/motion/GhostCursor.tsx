import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function GhostCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Direct move for the main cursor (crosshair)
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      // Lagged move for the ghost
      gsap.to(ghostRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      {/* Main Cursor / Crosshair */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '24px',
          height: '24px',
          margin: '-12px 0 0 -12px',
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'var(--accent)', opacity: 0.5 }}></div>
        <div style={{ position: 'absolute', width: '1px', height: '100%', background: 'var(--accent)', opacity: 0.5 }}></div>
        <div style={{ width: '4px', height: '4px', background: 'var(--accent)', borderRadius: '50%' }}></div>
      </div>

      {/* Ghost */}
      <div
        ref={ghostRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          margin: '-20px 0 0 -20px',
          border: '1px solid var(--accent)',
          borderRadius: '50%',
          opacity: 0.1,
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      ></div>
    </>
  );
}
