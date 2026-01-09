import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function BlurText({ text, delay = 0, className }: BlurTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(el,
      { 
        filter: 'blur(20px)',
        opacity: 0,
        y: 20
      },
      {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, [text, delay]);

  return <div ref={containerRef} className={className}>{text}</div>;
}
