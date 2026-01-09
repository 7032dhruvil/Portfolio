import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ children }: { children: string }) {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const words = textRef.current.innerText.split(' ');
    textRef.current.innerHTML = words
      .map(word => `<span class="reveal-word" style="display: inline-block; filter: blur(10px); opacity: 0; transform: translateY(20px);">${word}&nbsp;</span>`)
      .join('');

    const spans = textRef.current.querySelectorAll('.reveal-word');

    gsap.to(spans, {
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power3.out',
    });
  }, [children]);

  return <p ref={textRef} style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.2 }}>{children}</p>;
}
