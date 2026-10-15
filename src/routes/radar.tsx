import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Crosshair, Loader2, CheckCircle2, AlertTriangle, CompassIcon, Ban, SearchX, WifiOff, Navigation2, ChevronRight } from "lucide-react";
import { Screen, TopBar } from "@/components/app/shell";
import { Badge, Btn, Chip, LinkBtn } from "@/components/app/primitives";
import { Radar, type RadarMarker } from "@/components/app/radar";
import { useApp } from "@/lib/app-store";
import { usePlacesWithGeo, useFormatters } from "@/lib/use-places";
import { relativeAngle } from "@/lib/geo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/radar")({
  head: () => ({
    meta: [
      { title: "Radar — Registon Guide" },
      { name: "description", content: "Point your phone and the radar shows which monument is in front of you, with distance and direction." },
      { property: "og:title", content: "Radar — Registon Guide" },
      { property: "og:description", content: "Point your phone to find the monument in front of you." },
    ],
  }),
  component: RadarPage,
});

type RState = "ready" | "searching" | "low" | "calibrate" | "unavailable" | "empty" | "offline";

function RadarPage() {
  const { t } = useApp();
  const f = useFormatters();
  const navigate = useNavigate();
  const all = usePlacesWithGeo().filter((p) => p.distance < 400 && p.category !== "square");
  const [heading, setHeading] = useState(287);
  const [state, setState] = useState<RState>("ready");
  const [pinned, setPinned] = useState<string | null>(null);
  const [live, setLive] = useState(false);

  // Real device compass when available (iOS needs permission via user gesture).
  useEffect(() => {
    if (!live) return;
    const h = (e: DeviceOrientationEvent & { webkitCompassHeading?: number }) => {
      const v = e.webkitCompassHeading ?? (e.alpha != null ? 360 - e.alpha : null);
      if (v != null) setHeading(Math.round(v));
    };
    window.addEventListener("deviceorientation", h as EventListener, true);
    return () => window.removeEventListener("deviceorientation", h as EventListener, true);
  }, [live]);

  const enableLive = async () => {
    const D = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    if (D?.requestPermission) { try { await D.requestPermission(); } catch {} }
    setLive(true);
  };

  // Target = monument closest to current heading (within 30°), unless pinned.
  const target = useMemo(() => {
    if (pinned) return all.find((p) => p.placeId === pinned) ?? null;
    let best = null as (typeof all)[number] | null;
    let bd = 31;
    for (const p of all) { const d = Math.abs(relativeAngle(heading, p.bearing)); if (d < bd) { bd = d; best = p; } }
    return best;
  }, [all, heading, pinned]);

  const markers: RadarMarker[] = (state === "empty" ? [] : all).map((p) => ({ placeId: p.placeId, name: f.name(p), distance: p.distance, bearing: p.bearing, selected: target?.placeId === p.placeId, image: p.image }));

  const statusMap: Record<RState, { icon: typeof Crosshair; text: string; tone: string; spin?: boolean }> = {
    ready: { icon: CheckCircle2, text: t("gpsReady"), tone: "text-success" },
    searching: { icon: Loader2, text: t("gpsSearching"), tone: "text-primary", spin: true },
    low: { icon: AlertTriangle, text: t("gpsLow"), tone: "text-warning" },
    calibrate: { icon: CompassIcon, text: t("compassCalibrate"), tone: "text-warning" },
    unavailable: { icon: Ban, text: t("compassUnavailable"), tone: "text-destructive" },
    empty: { icon: SearchX, text: t("noNearby"), tone: "text-muted-foreground" },
    offline: { icon: WifiOff, text: t("offlineWorking"), tone: "text-warning" },
  };
  const s = statusMap[state];
  const radarState = state === "offline" ? "ready" : state === "searching" || state === "low" || state === "calibrate" || state === "unavailable" || state === "empty" ? state : "ready";

  return (
    <Screen>
      <TopBar title={t("radar")} right={<Badge tone="success" icon={Crosshair}>±{state === "low" ? 38 : 5} m</Badge>} />

      <div className="mt-1 flex items-center justify-center gap-2 text-sm font-semibold" role="status" aria-live="polite">
        <s.icon className={cn("h-4 w-4", s.tone, s.spin && "animate-spin")} />
        <span className={s.tone}>{s.text}</span>
      </div>

      <div className="relative mt-4">
        <Radar heading={heading} markers={markers} state={radarState} onSelect={(id) => setPinned(id === pinned ? null : id)} labels={{ N: t("N"), E: t("E"), S: t("S"), W: t("W") }} />
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 rounded-full bg-surface-2 px-3 py-1 text-sm font-bold tabular-nums">{heading}° {f.card(heading)}</div>
      </div>

      {/* heading control (simulator + live compass) */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-3">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>{t("simulateHeading")}</span>
          <button onClick={enableLive} className={cn("rounded-full px-2.5 py-1", live ? "bg-success/15 text-success" : "bg-primary/15 text-primary")}>{live ? "● Live compass" : "Use device compass"}</button>
        </div>
        <input type="range" min={0} max={359} value={heading} onChange={(e) => { setHeading(Number(e.target.value)); setPinned(null); }} aria-label={t("heading")} className="mt-2 w-full accent-primary" />
      </div>

      {/* state content */}
      <div className="mt-4">
        {state === "ready" || state === "offline" ? (
          target ? (
            <div key={target.placeId} className="animate-fade-up rounded-3xl border border-primary/40 bg-card p-4 shadow-glow">
              <div className="flex gap-3">
                <img src={target.image} alt="" className="h-20 w-20 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold leading-tight">{f.name(target)}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Badge tone="primary" icon={Navigation2}>{f.dist(target.distance)}</Badge>
                    <Badge tone="sand">{f.rel(heading, target.bearing)}</Badge>
                  </div>
                  <p className="mt-1.5 text-[11px] tabular-nums text-muted-foreground">{t("heading")} {heading}° → {Math.round(target.bearing)}°</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Btn onClick={() => navigate({ to: "/places/$placeId", params: { placeId: target.placeId } })}>{t("details")}<ChevronRight className="h-4 w-4" /></Btn>
                <LinkBtn variant="secondary" to="/map" search={{ to: target.placeId }}><Navigation2 className="h-4 w-4" />{t("directions")}</LinkBtn>
              </div>
            </div>
          ) : (
            <p className="rounded-3xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">↻ {t("ob1Body")}</p>
          )
        ) : (
          <StateCard state={state} />
        )}
      </div>

      <p className="mb-2 mt-6 text-xs font-semibold text-muted-foreground">{t("states")}</p>
      <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-2">
        {(Object.keys(statusMap) as RState[]).map((k) => <Chip key={k} active={state === k} onClick={() => setState(k)}>{k}</Chip>)}
      </div>
    </Screen>
  );
}

function StateCard({ state }: { state: RState }) {
  const { t } = useApp();
  const conf: Partial<Record<RState, { title: string; body: string; action: React.ReactNode }>> = {
    searching: { title: t("gpsSearching"), body: t("gpsLowHint"), action: <Btn variant="secondary" full loading /> },
    low: { title: t("gpsLow"), body: t("gpsLowHint"), action: <LinkBtn variant="secondary" full to="/map">{t("openMap")}</LinkBtn> },
    calibrate: { title: t("compassCalibrate"), body: t("compassCalibrateHint"), action: <LinkBtn full to="/calibrate">{t("calibrateNow")}</LinkBtn> },
    unavailable: { title: t("compassUnavailable"), body: t("compassUnavailableHint"), action: <LinkBtn full to="/map">{t("openMap")}</LinkBtn> },
    empty: { title: t("noNearby"), body: t("noNearbyHint"), action: <LinkBtn full to="/map">{t("openMap")}</LinkBtn> },
  };
  const c = conf[state]!;
  return (
    <div className="animate-fade-up rounded-3xl border border-border bg-card p-5 text-center">
      <p className="font-bold">{c.title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
      <div className="mt-4">{c.action}</div>
      {state === "calibrate" && <Link to="/permission" className="mt-3 block text-xs text-muted-foreground underline">{t("permTitle")}</Link>}
    </div>
  );
}
