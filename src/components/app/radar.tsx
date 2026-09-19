import { cn } from "@/lib/utils";
import { relativeAngle } from "@/lib/geo";

/** Backend-ready radar marker contract. */
export interface RadarMarker {
  placeId: string;
  name: string;
  distance: number; // metres
  bearing: number; // degrees true
  selected: boolean;
  image?: string;
}

interface RadarProps {
  heading: number;
  markers: RadarMarker[];
  rangeM?: number;
  onSelect?: (placeId: string) => void;
  state?: "ready" | "searching" | "low" | "calibrate" | "unavailable" | "empty";
  labels: { N: string; E: string; S: string; W: string };
  className?: string;
}

/**
 * Heading-up radar. Markers are placed at (bearing - heading) so the phone's
 * facing direction is always at the top; the compass ring rotates underneath.
 */
export function Radar({ heading, markers, rangeM = 400, onSelect, state = "ready", labels, className }: RadarProps) {
  const dim = state !== "ready";
  const rings = [0.33, 0.66, 1];
  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[340px] select-none", className)} role="img" aria-label="Radar">
      {/* pulses */}
      <div className="absolute inset-0 rounded-full bg-radial-glow" />
      {!dim && (
        <>
          <div className="absolute inset-[30%] rounded-full border border-primary/40 animate-radar-pulse" />
          <div className="absolute inset-[30%] rounded-full border border-primary/40 animate-radar-pulse [animation-delay:1.2s]" />
        </>
      )}

      {/* rings */}
      {rings.map((r) => (
        <div
          key={r}
          className={cn("absolute rounded-full border", r === 1 ? "border-border" : "border-border/60 border-dashed")}
          style={{ inset: `${(1 - r) * 50}%` }}
        />
      ))}
      {/* range labels */}
      {rings.map((r) => (
        <span key={r} className="absolute left-1/2 -translate-x-1/2 text-[10px] tabular-nums text-muted-foreground" style={{ top: `calc(${(1 - r) * 50}% + 4px)` }}>
          {Math.round(rangeM * r)} m
        </span>
      ))}

      {/* rotating compass ring: ticks rotate with heading */}
      <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: `rotate(${-heading}deg)` }}>
        {Array.from({ length: 36 }).map((_, i) => (
          <span key={i} className={cn("absolute left-1/2 top-0 h-2 w-px bg-muted-foreground/40", i % 9 === 0 && "h-3 bg-muted-foreground")} style={{ transformOrigin: "50% 170px", transform: `translateX(-50%) rotate(${i * 10}deg)` }} />
        ))}
      </div>
      {/* cardinal labels: placed by trig so text stays upright */}
      {(["N", "E", "S", "W"] as const).map((c, i) => {
        const a = ((i * 90 - heading) * Math.PI) / 180;
        return (
          <span
            key={c}
            className={cn("absolute z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ease-out", c === "N" ? "bg-destructive text-destructive-foreground" : "bg-surface-2 text-muted-foreground")}
            style={{ left: `${50 + 50 * Math.sin(a)}%`, top: `${50 - 50 * Math.cos(a)}%` }}
          >
            {labels[c][0]}
          </span>
        );
      })}

      {/* heading cone */}
      {!dim && <div className="absolute left-1/2 top-1/2 h-1/2 w-24 -translate-x-1/2 -translate-y-full origin-bottom rounded-t-full bg-gradient-to-t from-primary/25 to-transparent" />}

      {/* markers */}
      {markers.map((m) => {
        const rel = relativeAngle(heading, m.bearing);
        const r = Math.min(1, m.distance / rangeM) * 46; // % of half-size
        const x = 50 + r * Math.sin((rel * Math.PI) / 180);
        const y = 50 - r * Math.cos((rel * Math.PI) / 180);
        return (
          <button
            key={m.placeId}
            onClick={() => onSelect?.(m.placeId)}
            aria-label={`${m.name}, ${Math.round(m.distance)} m`}
            aria-pressed={m.selected}
            className={cn("absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-all duration-300 ease-out", dim && "opacity-30")}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span
              className={cn(
                "flex items-center justify-center rounded-full border-2 transition-all",
                m.selected ? "h-12 w-12 border-primary bg-primary/20 shadow-glow" : "h-8 w-8 border-sand/70 bg-sand/20",
              )}
            >
              {m.image ? (
                <img src={m.image} alt="" className={cn("rounded-full object-cover", m.selected ? "h-9 w-9" : "h-5 w-5")} />
              ) : (
                <span className={cn("rounded-full bg-sand", m.selected ? "h-3 w-3" : "h-2 w-2")} />
              )}
            </span>
            <span className={cn("mt-1 max-w-[88px] truncate rounded-md px-1.5 py-0.5 text-[10px] font-semibold", m.selected ? "bg-primary text-primary-foreground" : "bg-background/80 text-foreground")}>
              {m.name}
            </span>
          </button>
        );
      })}

      {/* user */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="h-5 w-5 rounded-full border-[3px] border-background bg-accent shadow-[0_0_0_6px_oklch(from_var(--color-accent)_l_c_h/0.25)]" />
      </div>
      {/* heading arrow */}
      <div className="absolute left-1/2 top-[6px] -translate-x-1/2">
        <div className="h-0 w-0 border-x-[7px] border-b-[12px] border-x-transparent border-b-primary" />
      </div>
    </div>
  );
}
