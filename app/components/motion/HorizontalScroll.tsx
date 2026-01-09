import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll({ items }: { items: string[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-70%", // Adjust based on container width vs items
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <div ref={triggerRef} style={{ overflow: 'hidden' }}>
      <div ref={sectionRef} style={{ 
        display: 'flex', 
        gap: '4rem', 
        paddingLeft: 'var(--container-padding)', 
        height: '100vh', 
        alignItems: 'center',
        whiteSpace: 'nowrap' 
      }}>
        {items.map((item, i) => (
          <div key={i} className="skill-item" style={{ 
            fontSize: 'clamp(4rem, 10vw, 15rem)', 
            fontWeight: 400,
            fontFamily: 'var(--font-heading-secondary)',
            opacity: 0.8,
            transition: 'opacity 0.3s ease'
          }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
