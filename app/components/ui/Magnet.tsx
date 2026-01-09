import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagnetProps {
  children: React.ReactNode;
  strength?: number;
}

export default function Magnet({ children, strength = 30 }: MagnetProps) {
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const magnet = magnetRef.current;
    if (!magnet) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = magnet.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      
      const deltaX = clientX - x;
      const deltaY = clientY - y;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < 100) {
        gsap.to(magnet, {
          x: deltaX * (strength / 100),
          y: deltaY * (strength / 100),
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(magnet, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)',
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [strength]);

  return (
    <div ref={magnetRef} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
}
