import { createFileRoute, Link } from "@tanstack/react-router";
import { Radar as RadarIcon, MapPin, Crosshair, User, ChevronRight, Package, Headphones } from "lucide-react";
import { Screen } from "@/components/app/shell";
import { Badge, SectionTitle, StatusPill } from "@/components/app/primitives";
import { PlaceCard } from "@/components/app/place-card";
import { useApp } from "@/lib/app-store";
import { LANGS } from "@/lib/i18n";
import { usePlacesWithGeo, useFormatters } from "@/lib/use-places";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Registon — Explore | Registon Guide" },
      { name: "description", content: "Start the radar and discover the monuments around Registan Square, offline." },
      { property: "og:title", content: "Explore Registan — Registon Guide" },
      { property: "og:description", content: "Start the radar and discover monuments nearby." },
    ],
  }),
  component: Explore,
});

function Explore() {
  const { t, lang, setLang, favourites, toggleFavourite } = useApp();
  const f = useFormatters();
  const nearby = usePlacesWithGeo().filter((p) => p.category !== "square").slice(0, 3);
  const next = LANGS[(LANGS.findIndex((l) => l.code === lang) + 1) % 3];
  return (
    <Screen nav>
      <header className="flex items-start justify-between pt-2">
        <div>
          <h1 className="text-[32px] font-bold leading-none">{t("registan")}</h1>
          <p className="mt-1.5 text-sm text-sand">{t("exploreSubtitle")}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setLang(next.code)} aria-label={t("language")} className="tap flex h-11 items-center gap-1 rounded-full border border-border bg-surface px-3 text-sm font-bold">
            {LANGS.find((l) => l.code === lang)?.flag} {lang.toUpperCase()}
          </button>
          <Link to="/profile" aria-label={t("profile")} className="tap flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface"><User className="h-5 w-5" /></Link>
        </div>
      </header>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge icon={MapPin}>{t("registanSquare")}</Badge>
        <Badge tone="success" icon={Crosshair}>±5 m</Badge>
        <StatusPill />
      </div>

      <Link to="/radar" className="tap relative mt-5 block overflow-hidden rounded-[32px] bg-primary p-6 text-primary-foreground shadow-glow">
        <div className="absolute inset-0 bg-girih opacity-10" aria-hidden />
        <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full border-2 border-primary-foreground/20" aria-hidden />
        <div className="absolute -right-2 top-0 h-40 w-40 rounded-full border-2 border-primary-foreground/25" aria-hidden />
        <div className="absolute right-6 top-6 h-24 w-24 animate-radar-sweep rounded-full" style={{ background: "conic-gradient(from 0deg, transparent 70%, oklch(from var(--color-primary-foreground) l c h / 0.35))" }} aria-hidden />
        <div className="relative">
          <RadarIcon className="h-10 w-10" strokeWidth={2.2} />
          <p className="mt-10 text-4xl font-bold tracking-wider">{t("radar")}</p>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-base font-semibold opacity-85">{t("radarSub")}</p>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground text-primary"><ChevronRight className="h-6 w-6" /></span>
          </div>
        </div>
      </Link>

      <section className="mt-7">
        <SectionTitle action={<Link to="/places" className="text-sm font-semibold text-primary">{t("seeAll")}</Link>}>{t("nearby")}</SectionTitle>
        <div className="grid gap-2.5">
          {nearby.map((p) => (
            <PlaceCard key={p.placeId} compact placeId={p.placeId} name={f.name(p)} image={p.image} distance={f.dist(p.distance)} bearing={f.card(p.bearing)} category={p.category} favourite={favourites.includes(p.placeId)} availability={p.availability} onToggleFavourite={toggleFavourite} />
          ))}
        </div>
      </section>

      <section className="mt-7 grid grid-cols-2 gap-3">
        <Link to="/offline" className="tap rounded-3xl border border-border bg-card p-4">
          <Package className="h-6 w-6 text-sand" />
          <p className="mt-3 font-bold">{t("offlinePack")}</p>
          <p className="text-xs text-success">● {t("offlineReady")}</p>
        </Link>
        <Link to="/audio/$placeId" params={{ placeId: "registan" }} className="tap rounded-3xl border border-border bg-card p-4">
          <Headphones className="h-6 w-6 text-primary" />
          <p className="mt-3 font-bold">{t("audioGuide")}</p>
          <p className="text-xs text-muted-foreground">18 · {t("offlineAvailable")}</p>
        </Link>
      </section>

      <Link to="/flow" className="mt-6 block text-center text-xs font-semibold text-muted-foreground underline underline-offset-4">{t("flow")} · {t("designSystem")} · {t("states")}</Link>
    </Screen>
  );
}
