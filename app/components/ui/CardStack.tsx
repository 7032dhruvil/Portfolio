import { useState } from "react";

export default function CardStack({ items }: { items: React.ReactNode[] }) {
  const [cards, setCards] = useState(items);

  const moveToEnd = () => {
    setCards((prev) => {
      const newCards = [...prev];
      const first = newCards.shift();
      if (first) newCards.push(first);
      return newCards;
    });
  };

  return (
    <div className="card-stack-container" style={{ position: 'relative', height: '400px', width: '300px', margin: '0 auto' }}>
      {cards.map((item, index) => {
        const isTop = index === 0;
        return (
          <div
            key={index}
            onClick={isTop ? moveToEnd : undefined}
            style={{
              position: "absolute",
              top: index * 10,
              left: index * 10,
              zIndex: cards.length - index,
              width: "100%",
              height: "100%",
              background: "#111",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "2rem",
              cursor: isTop ? "pointer" : "default",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s",
              transform: `scale(${1 - index * 0.05}) translateY(${index * 10}px)`,
              opacity: 1 - index * 0.2,
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
