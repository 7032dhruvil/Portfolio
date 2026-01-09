interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({ text, disabled = false, speed = 5, className = "" }: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        display: 'inline-block',
        animation: disabled ? 'none' : `shiny ${animationDuration} linear infinite`,
      }}
    >
      {text}
      <style>{`
        @keyframes shiny {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        .shiny-text.disabled {
          color: inherit;
        }
      `}</style>
    </div>
  );
}
