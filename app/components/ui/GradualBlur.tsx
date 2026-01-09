import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GradualBlur({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(el,
      { filter: 'blur(30px)', opacity: 0 },
      {
        filter: 'blur(0px)',
        opacity: 1,
        duration: 1.5,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          end: 'top 50%',
          scrub: true,
        }
      }
    );
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
