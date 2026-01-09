import { useRef, useEffect } from 'react';

export default function LaserFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const lines: { y: number, speed: number, opacity: number }[] = Array.from({ length: 15 }, () => ({
      y: Math.random() * height,
      speed: 0.2 + Math.random() * 0.5,
      opacity: 0.05 + Math.random() * 0.1
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = '#EDEDED';
      
      lines.forEach(line => {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.globalAlpha = line.opacity;
        ctx.moveTo(0, line.y);
        ctx.lineTo(width, line.y);
        ctx.stroke();

        line.y += line.speed;
        if (line.y > height) line.y = -10;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.1
      }}
    />
  );
}
