import React from "react";

export default function Confetti() {
  const confettiColors =
    [
      '#ff0000',
      '#00ff00',
      '#0000ff',
      '#ffff00',
      '#ff00ff',
      '#00ffff'
    ];

  return (
    <div className="confetti-container">
      {[...Array(70)].map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            backgroundColor:
              confettiColors[Math.floor(Math.random() * confettiColors.length)],
            animationDuration: `${Math.random() * 1 + 1}s`,
            animationDelay: `${Math.random() * 0.5}s`
          }}
        />
      ))}
    </div>
  );
}
