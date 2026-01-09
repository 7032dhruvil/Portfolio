import { useRef, useEffect } from 'react';

export default function LetterGlitch({ text }: { text: string }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const chars = "!@#$%^&*()_+{}[];,./<>?";

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const original = text;
    let iteration = 0;
    let interval: any = null;

    const startGlitch = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        el.innerText = original
          .split("")
          .map((char, index) => {
            if (index < iteration) return original[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= original.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3;
      }, 30);
    };

    el.addEventListener('mouseenter', () => {
      iteration = 0;
      startGlitch();
    });

    return () => clearInterval(interval);
  }, [text]);

  return <span ref={textRef} className="glitch-text" style={{ fontFamily: 'monospace' }}>{text}</span>;
}
