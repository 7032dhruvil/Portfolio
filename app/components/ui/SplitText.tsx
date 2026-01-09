import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, className, delay = 0 }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.innerText.split('');
    el.innerHTML = chars
      .map(char => `<span class="char" style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    const charSpans = el.querySelectorAll('.char');

    gsap.fromTo(charSpans, 
      { 
        y: 40, 
        opacity: 0,
        rotateX: -90,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.02,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, [text, delay]);

  return <div ref={containerRef} className={className} style={{ display: 'inline-block', perspective: '1000px' }}>{text}</div>;
}
