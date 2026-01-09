import { useRef, useEffect } from 'react';

export default function LightningBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    interface Bolt {
      segments: { x: number, y: number }[];
      opacity: number;
    }
    let bolts: Bolt[] = [];

    const createBolt = () => {
      const segments: { x: number, y: number }[] = [];
      let curX = Math.random() * width;
      let curY = 0;
      segments.push({ x: curX, y: curY });

      while (curY < height) {
        curX += (Math.random() - 0.5) * 50;
        curY += Math.random() * 50;
        segments.push({ x: curX, y: curY });
      }
      return { segments, opacity: 1 };
    };

    const render = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
      ctx.fillRect(0, 0, width, height);

      if (Math.random() < 0.01) { // Rare flashes
        bolts.push(createBolt());
      }

      bolts = bolts.filter(bolt => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(110, 168, 255, ${bolt.opacity * 0.2})`;
        ctx.lineWidth = 2;
        ctx.moveTo(bolt.segments[0].x, bolt.segments[0].y);
        for (let i = 1; i < bolt.segments.length; i++) {
          ctx.lineTo(bolt.segments[i].x, bolt.segments[i].y);
        }
        ctx.stroke();
        bolt.opacity -= 0.02;
        return bolt.opacity > 0;
      });

      requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} style={{ 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    pointerEvents: 'none', 
    zIndex: -1 
  }} />;
}
