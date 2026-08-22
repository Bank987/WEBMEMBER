"use client";

const snowflakes = Array.from({ length: 72 }, (_, index) => ({
  left: `${(index * 37) % 101}%`,
  size: `${2 + ((index * 5) % 5)}px`,
  duration: `${18 + ((index * 13) % 20)}s`,
  delay: `${-((index * 17) % 38)}s`,
  drift: `${-35 + ((index * 29) % 71)}px`,
  opacity: `${0.28 + ((index * 7) % 55) / 100}`,
}));

export function Snowfall() {
  return (
    <div aria-hidden="true" className="snowfall pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {snowflakes.map((flake, index) => (
        <span
          key={index}
          className="snowflake absolute -top-4 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.75)]"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
            ["--snow-drift" as string]: flake.drift,
          }}
        />
      ))}
    </div>
  );
}
