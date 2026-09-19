import { Link } from "@tanstack/react-router";
import { Heart, Navigation2, WifiOff, CloudDownload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/app-store";
import { Badge } from "./primitives";
import type { Category } from "@/lib/data";

/** Backend-ready PlaceCard. Props mirror the Flutter widget contract. */
export interface PlaceCardProps {
  placeId: string;
  name: string;
  image: string;
  distance: string;
  bearing?: string;
  category: Category;
  short?: string;
  favourite: boolean;
  availability: "offline" | "update" | "remote";
  onToggleFavourite: (id: string) => void;
  compact?: boolean;
}

export const categoryKey: Record<Category, string> = {
  square: "catSquare", madrasa: "catMadrasa", mosque: "catMosque", mausoleum: "catMausoleum", museum: "catMuseum", historic: "catHistoric",
};

export function PlaceCard(p: PlaceCardProps) {
  const { t } = useApp();
  if (p.compact) {
    return (
      <Link to="/places/$placeId" params={{ placeId: p.placeId }} className="tap flex items-center gap-3 rounded-2xl border border-border bg-card p-2.5 shadow-card">
        <img src={p.image} alt="" width={64} height={64} loading="lazy" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">{p.name}</p>
          <p className="text-xs text-muted-foreground">{t(categoryKey[p.category])}</p>
          <div className="mt-1 flex gap-1.5">
            <Badge tone="primary" icon={Navigation2}>{p.distance}</Badge>
            {p.bearing && <Badge>{p.bearing}</Badge>}
          </div>
        </div>
        <FavButton on={p.favourite} onClick={() => p.onToggleFavourite(p.placeId)} />
      </Link>
    );
  }
  return (
    <Link to="/places/$placeId" params={{ placeId: p.placeId }} className="tap block overflow-hidden rounded-3xl border border-border bg-card shadow-card">
      <div className="relative aspect-[16/10]">
        <img src={p.image} alt={p.name} width={1024} height={768} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          <Badge tone="sand">{t(categoryKey[p.category])}</Badge>
          {p.availability === "offline" && <Badge tone="success" icon={WifiOff}>{t("offline")}</Badge>}
          {p.availability === "update" && <Badge tone="warning" icon={CloudDownload}>{t("updateAvailable")}</Badge>}
          {p.availability === "remote" && <Badge tone="neutral" icon={CloudDownload}>{t("download")}</Badge>}
        </div>
        <div className="absolute right-3 top-3">
          <FavButton on={p.favourite} onClick={() => p.onToggleFavourite(p.placeId)} />
        </div>
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-lg font-bold leading-tight">{p.name}</h3>
        </div>
      </div>
      <div className="flex items-center gap-2 p-4 pt-3">
        <Badge tone="primary" icon={Navigation2}>{p.distance}</Badge>
        {p.bearing && <Badge>{p.bearing}</Badge>}
        {p.short && <p className="ml-1 line-clamp-1 flex-1 text-xs text-muted-foreground">{p.short}</p>}
      </div>
    </Link>
  );
}

export function FavButton({ on, onClick, className }: { on: boolean; onClick: () => void; className?: string }) {
  const { t } = useApp();
  return (
    <button
      aria-label={t("favourites")}
      aria-pressed={on}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(); }}
      className={cn("tap flex h-11 w-11 items-center justify-center rounded-full bg-background/70 backdrop-blur", className)}
    >
      <Heart className={cn("h-5 w-5 transition-all", on ? "fill-destructive text-destructive animate-pop" : "text-foreground")} />
    </button>
  );
}
