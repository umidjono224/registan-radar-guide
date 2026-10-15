import { cn } from "@/lib/utils";
import type { LatLng } from "@/lib/geo";

/**
 * Replaceable map surface. Contract mirrors a future Mapbox widget:
 * centre, markers, selected, route, user. Swap the body for Mapbox GL / mapbox_maps_flutter.
 */
export interface MapMarker { id: string; coords: LatLng; label: string; image?: string }
interface Props {
  centre: LatLng;
  user: LatLng;
  markers: MapMarker[];
  selectedId?: string | null;
  showRoute?: boolean;
  zoom: number; // metres per 100px
  bearing?: number;
  offline?: boolean;
  onSelect?: (id: string) => void;
}

export function MapView({ centre, user, markers, selectedId, showRoute, zoom, bearing = 0, onSelect, offline }: Props) {
  const proj = (c: LatLng) => {
    const dx = (c.lng - centre.lng) * 111320 * Math.cos((centre.lat * Math.PI) / 180);
    const dy = (c.lat - centre.lat) * 110540;
    return { x: 50 + (dx / zoom) * 25, y: 50 - (dy / zoom) * 25 };
  };
  const u = proj(user);
  const sel = markers.find((m) => m.id === selectedId);
  const sp = sel ? proj(sel.coords) : null;
  return (
    <div className="absolute inset-0 overflow-hidden bg-surface" style={{ transform: `rotate(${-bearing}deg)` }}>
      {/* stylised vector base (placeholder for Mapbox tiles) */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="var(--color-border)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <path d="M0 62 Q30 58 50 60 T100 55" stroke="var(--color-surface-2)" strokeWidth="14" fill="none" vectorEffect="non-scaling-stroke" transform="scale(4 6)" />
        <line x1="0" y1="35%" x2="100%" y2="42%" stroke="var(--color-surface-2)" strokeWidth="18" />
        <line x1="62%" y1="0" x2="55%" y2="100%" stroke="var(--color-surface-2)" strokeWidth="14" />
        <line x1="20%" y1="100%" x2="45%" y2="0" stroke="var(--color-surface-2)" strokeWidth="10" />
        {showRoute && sp && (
          <line x1={`${u.x}%`} y1={`${u.y}%`} x2={`${sp.x}%`} y2={`${sp.y}%`} stroke="var(--color-primary)" strokeWidth="5" strokeDasharray="2 8" strokeLinecap="round" />
        )}
      </svg>
      <div className="absolute rounded-xl border border-sand/30 bg-sand/10" style={{ left: "38%", top: "36%", width: "26%", height: "22%" }} aria-hidden />

      {markers.map((m) => {
        const p = proj(m.coords);
        if (p.x < -10 || p.x > 110 || p.y < -10 || p.y > 110) return null;
        const s = m.id === selectedId;
        return (
          <button key={m.id} onClick={() => onSelect?.(m.id)} className="absolute z-10 -translate-x-1/2 -translate-y-full transition-transform" style={{ left: `${p.x}%`, top: `${p.y}%`, transform: `translate(-50%,-100%) rotate(${bearing}deg)` }} aria-label={m.label} aria-pressed={s}>
            <span className={cn("flex flex-col items-center", s && "animate-pop")}>
              <span className={cn("rounded-full border-2 p-0.5", s ? "border-primary bg-primary shadow-glow" : "border-sand bg-background")}>
                {m.image ? <img src={m.image} alt="" className={cn("rounded-full object-cover", s ? "h-11 w-11" : "h-7 w-7")} /> : <span className="block h-3 w-3 rounded-full bg-sand" />}
              </span>
              <span className={cn("-mt-0.5 h-2 w-2 rotate-45", s ? "bg-primary" : "bg-sand")} />
              {s && <span className="mt-1 whitespace-nowrap rounded-md bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground">{m.label}</span>}
            </span>
          </button>
        );
      })}

      <div className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={{ left: `${u.x}%`, top: `${u.y}%` }}>
        <span className="absolute -inset-4 animate-radar-pulse rounded-full bg-accent/30" />
        <span className="relative block h-5 w-5 rounded-full border-[3px] border-background bg-accent" />
      </div>
      {offline && <div className="pointer-events-none absolute inset-0 bg-girih opacity-[0.025]" />}
    </div>
  );
}
