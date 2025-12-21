"use client";

import { useEffect, useState } from 'react';

export function RotatingGlobe() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <style jsx>{`
        .globe-container {
          width: 300px;
          height: 300px;
          perspective: 1000px;
        }
        @media (min-width: 768px) {
            .globe-container {
                width: 400px;
                height: 400px;
            }
        }
        .globe {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotate 20s infinite linear;
        }
        @keyframes rotate {
          from {
            transform: rotateY(0deg) rotateX(15deg);
          }
          to {
            transform: rotateY(360deg) rotateX(15deg);
          }
        }
        .ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid hsl(var(--primary) / 0.5);
          border-radius: 50%;
          transform-style: preserve-3d;
        }
        .equator {
          transform: rotateX(90deg);
        }
      `}</style>
      <div className="globe-container">
        <div className="globe">
          <div className="ring equator"></div>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="ring"
              style={{ transform: `rotateY(${i * 15}deg)` }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
