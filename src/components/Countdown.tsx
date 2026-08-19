import { useEffect, useState } from "react";

const TARGET = new Date("2026-10-24T12:30:00+01:00").getTime();

function diff() {
  const ms = Math.max(0, TARGET - Date.now());
  return {
    jours: Math.floor(ms / 86400000),
    heures: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    secondes: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setTime(diff());
    const id = setInterval(() => setTime(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: [string, number][] = [
    ["Jours", time?.jours ?? 0],
    ["Heures", time?.heures ?? 0],
    ["Minutes", time?.minutes ?? 0],
    ["Secondes", time?.secondes ?? 0],
  ];

  return (
    <div className="mx-auto mt-10 max-w-xl">
      <p className="font-hand text-base text-primary sm:text-lg">Plus que</p>
      <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-4">
        {units.map(([label, value], i) => (
          <div
            key={label}
            className="animate-fade-in rounded-sm border border-gold-deep/40 bg-card/70 px-2 py-3 shadow-[var(--shadow-elegant)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${i * 120}ms`, animationFillMode: "both" }}
          >
            <p
              className="font-serif text-3xl font-bold tabular-nums text-primary sm:text-4xl"
              aria-hidden={time === null}
            >
              {String(value).padStart(2, "0")}
            </p>
            <p className="mt-1 font-serif text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground sm:text-xs">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
