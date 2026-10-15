import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Plus, Minus, LocateFixed, Navigation, Footprints, WifiOff, Download, ChevronRight, X } from "lucide-react";
import { Screen } from "@/components/app/shell";
import { Badge, Btn } from "@/components/app/primitives";
import { MapView } from "@/components/app/map-view";
import { useApp } from "@/lib/app-store";
import { USER_POSITION } from "@/lib/data";
import { usePlacesWithGeo, useFormatters } from "@/lib/use-places";

export const Route = createFileRoute("/map")({
  validateSearch: z.object({ to: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Xarita — Registon Guide" },
      { name: "description", content: "Offline map of the Registan area with monuments, your location and walking routes." },
      { property: "og:title", content: "Map — Registon Guide" },
      { property: "og:description", content: "Offline map of the Registan area with walking routes." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const { t } = useApp();
  const f = useFormatters();
  const { to } = Route.useSearch();
  const navigate = useNavigate();
  const all = usePlacesWithGeo();
  const [sel, setSel] = useState<string | null>(to ?? "sherdor");
  const [zoom, setZoom] = useState(120);
  const [bearing, setBearing] = useState(0);
  const [route, setRoute] = useState(!!to);
  const [centre, setCentre] = useState(USER_POSITION);
  const p = all.find((x) => x.placeId === sel);

  return (
    <Screen nav padded={false} className="relative !pb-0">
      <div className="relative h-dvh">
        <MapView centre={centre} user={USER_POSITION} zoom={zoom} bearing={bearing} offline showRoute={route} selectedId={sel} onSelect={(id) => { setSel(id); setRoute(false); }} markers={all.map((x) => ({ id: x.placeId, coords: x.coords, label: f.name(x), image: x.image }))} />

        <div className="safe-top absolute inset-x-4 top-0 z-30 flex items-center justify-between">
          <h1 className="rounded-2xl bg-background/85 px-4 py-2.5 text-lg font-bold backdrop-blur">{t("map")}</h1>
          <Link to="/offline-map"><Badge tone="success" icon={WifiOff} className="h-9 bg-background/85 backdrop-blur">{t("mapOffline")}</Badge></Link>
        </div>

        <div className="absolute right-4 top-24 z-30 flex flex-col gap-2">
          <button onClick={() => setBearing(0)} aria-label="Compass" className="tap flex h-12 w-12 items-center justify-center rounded-full bg-background/90 shadow-float backdrop-blur">
            <Navigation className="h-5 w-5 text-destructive" style={{ transform: `rotate(${-bearing}deg)` }} />
          </button>
          <div className="overflow-hidden rounded-full bg-background/90 shadow-float backdrop-blur">
            <button onClick={() => setZoom((z) => Math.max(30, z / 1.5))} aria-label="Zoom in" className="tap flex h-12 w-12 items-center justify-center"><Plus className="h-5 w-5" /></button>
            <div className="mx-3 h-px bg-border" />
            <button onClick={() => setZoom((z) => Math.min(1200, z * 1.5))} aria-label="Zoom out" className="tap flex h-12 w-12 items-center justify-center"><Minus className="h-5 w-5" /></button>
          </div>
          <button onClick={() => setCentre(USER_POSITION)} aria-label={t("myLocation")} className="tap flex h-12 w-12 items-center justify-center rounded-full bg-background/90 text-primary shadow-float backdrop-blur"><LocateFixed className="h-5 w-5" /></button>
          <button onClick={() => setBearing((b) => (b + 45) % 360)} className="tap h-8 rounded-full bg-background/90 text-[10px] font-bold backdrop-blur">↻ 45°</button>
        </div>

        {p && (
          <div className="absolute inset-x-4 bottom-28 z-30 animate-fade-up rounded-3xl border border-border bg-background/95 p-4 shadow-float backdrop-blur">
            <div className="flex gap-3">
              <img src={p.image} alt="" className="h-16 w-16 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">{f.name(p)}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <Badge tone="primary">{f.dist(p.distance)}</Badge>
                  <Badge icon={Footprints}>{Math.max(1, Math.round(p.distance / 80))} min {t("walk")}</Badge>
                </div>
              </div>
              <button onClick={() => setSel(null)} aria-label="Close" className="h-9 w-9 shrink-0"><X className="mx-auto h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Btn size="sm" variant={route ? "secondary" : "primary"} onClick={() => setRoute(!route)}><Navigation className="h-4 w-4" />{t("route")}</Btn>
              <Btn size="sm" variant="secondary" onClick={() => navigate({ to: "/places/$placeId", params: { placeId: p.placeId } })}>{t("details")}<ChevronRight className="h-4 w-4" /></Btn>
            </div>
          </div>
        )}
        {!p && (
          <Link to="/offline-map" className="absolute inset-x-4 bottom-28 z-30 flex items-center gap-3 rounded-2xl bg-background/95 p-3 text-sm shadow-float">
            <Download className="h-5 w-5 text-primary" /><span className="flex-1 font-semibold">{t("offlineMap")}</span><span className="text-success">● {t("downloaded")}</span>
          </Link>
        )}
      </div>
    </Screen>
  );
}
