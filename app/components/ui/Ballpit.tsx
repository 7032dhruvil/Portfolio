import { useRef, useEffect } from 'react';

export default function Ballpit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement?.clientHeight || 400;

    const balls: Ball[] = [];
    const ballCount = 30;

    class Ball {
      x: number; y: number; vx: number; vy: number; radius: number;
      constructor() {
        this.radius = Math.random() * 15 + 5;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < this.radius || this.x > width - this.radius) this.vx *= -1;
        if (this.y < this.radius || this.y > height - this.radius) this.vy *= -1;
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(237, 237, 237, 0.2)';
        ctx.fill();
        ctx.closePath();
      }
    }

    for (let i = 0; i < ballCount; i++) balls.push(new Ball());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      balls.forEach(ball => {
        ball.update();
        ball.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();
    
    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}
