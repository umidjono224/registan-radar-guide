import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, Navigation2, Share2, Headphones, Clock, MapPin, Landmark, Compass } from "lucide-react";
import { Badge, Btn, LinkBtn } from "@/components/app/primitives";
import { FavButton, categoryKey } from "@/components/app/place-card";
import { AudioPlayer } from "@/components/app/audio-player";
import { useApp } from "@/lib/app-store";
import { getPlace, USER_POSITION } from "@/lib/data";
import { bearingDeg, distanceM } from "@/lib/geo";
import { useFormatters } from "@/lib/use-places";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/places/$placeId")({
  loader: ({ params }) => {
    const p = getPlace(params.placeId);
    if (!p) throw notFound();
    return { name: p.name.en, short: p.short.en };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — Registon Guide" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${loaderData.name} — Registon Guide` },
        { name: "description", content: loaderData.short },
        { property: "og:title", content: `${loaderData.name} — Registon Guide` },
        { property: "og:description", content: loaderData.short },
      ],
    };
  },
  component: Detail,
});

function Detail() {
  const { placeId } = Route.useParams();
  const p = getPlace(placeId)!;
  const { t, lang, favourites, toggleFavourite, pushHistory } = useApp();
  const f = useFormatters();
  const router = useRouter();
  const [tab, setTab] = useState<"main" | "history" | "photos" | "audio">("main");
  const [img, setImg] = useState(0);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => { pushHistory(placeId); }, [placeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const dist = distanceM(USER_POSITION, p.coords);
  const bear = bearingDeg(USER_POSITION, p.coords);
  const tabs = [["main", "tabMain"], ["history", "tabHistory"], ["photos", "tabPhotos"], ["audio", "tabAudio"]] as const;

  return (
    <div className="mx-auto min-h-dvh max-w-[430px] bg-background pb-10">
      <div className="relative h-[46vh] min-h-80">
        <img src={p.gallery[img]} alt={p.name[lang]} width={1024} height={768} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="safe-top absolute inset-x-0 top-0 flex justify-between px-4">
          <button onClick={() => router.history.back()} aria-label="Back" className="tap flex h-11 w-11 items-center justify-center rounded-full bg-background/70 backdrop-blur"><ChevronLeft className="h-6 w-6" /></button>
          <div className="flex gap-2">
            <button aria-label={t("share")} className="tap flex h-11 w-11 items-center justify-center rounded-full bg-background/70 backdrop-blur"><Share2 className="h-5 w-5" /></button>
            <FavButton on={favourites.includes(p.placeId)} onClick={() => toggleFavourite(p.placeId)} />
          </div>
        </div>
        <div className="absolute inset-x-5 bottom-4">
          <Badge tone="sand">{t(categoryKey[p.category])}</Badge>
          <h1 className="mt-2 text-[30px] font-bold leading-tight">{p.name[lang]}</h1>
        </div>
      </div>

      <div className="px-5">
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Navigation2, label: t("distance"), v: f.dist(dist) },
            { icon: Compass, label: t("direction"), v: f.card(bear) },
            { icon: Clock, label: t("period"), v: p.period[lang] },
          ].map((x) => (
            <div key={x.label} className="rounded-2xl border border-border bg-card p-3">
              <x.icon className="h-4 w-4 text-primary" />
              <p className="mt-2 text-[11px] text-muted-foreground">{x.label}</p>
              <p className="truncate text-sm font-bold">{x.v}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{t("registanSquare")}, Samarqand · {p.coords.lat.toFixed(5)}, {p.coords.lng.toFixed(5)}</p>

        <div role="tablist" className="mt-5 grid grid-cols-4 rounded-2xl bg-surface p-1">
          {tabs.map(([k, l]) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={cn("h-10 rounded-xl text-sm font-semibold transition-colors", tab === k ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>{t(l)}</button>
          ))}
        </div>

        <div className="mt-4 animate-fade-up" key={tab}>
          {tab === "main" && (
            <div className="grid gap-4">
              <div className="rounded-3xl border border-border bg-card p-5">
                <p className="text-[15px] leading-relaxed">{p.short[lang]}</p>
                {expanded && <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{p.history[lang]}</p>}
                <Btn variant="outline" full className="mt-4" onClick={() => setExpanded(!expanded)}>{t("moreInfo")}</Btn>
              </div>
              <AudioPlayer compact audioId={p.audio.audioId} title={`${t("audioGuide")} · ${p.name[lang]}`} duration={p.audio.durationSec} downloaded={p.audio.downloaded} />
            </div>
          )}
          {tab === "history" && (
            <div className="rounded-3xl border border-border bg-card p-5">
              <Landmark className="h-6 w-6 text-sand" />
              <p className="mt-3 text-[15px] leading-relaxed">{p.history[lang]}</p>
            </div>
          )}
          {tab === "photos" && (
            <div>
              <img src={p.gallery[img]} alt="" className="aspect-[4/3] w-full rounded-3xl object-cover" />
              <div className="mt-3 flex gap-2">
                {p.gallery.map((g, i) => (
                  <button key={i} onClick={() => setImg(i)} className={cn("tap overflow-hidden rounded-xl border-2", i === img ? "border-primary" : "border-transparent opacity-70")}>
                    <img src={g} alt="" loading="lazy" className="h-16 w-20 object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
          {tab === "audio" && <AudioPlayer audioId={p.audio.audioId} title={p.name[lang]} duration={p.audio.durationSec} downloaded={p.audio.downloaded} />}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <LinkBtn to="/map" search={{ to: p.placeId }}><Navigation2 className="h-4 w-4" />{t("directions")}</LinkBtn>
          <LinkBtn variant="secondary" to="/audio/$placeId" params={{ placeId: p.placeId }}><Headphones className="h-4 w-4" />{t("tabAudio")}</LinkBtn>
        </div>
        <Link to="/radar" className="mt-4 block text-center text-sm font-semibold text-primary">← {t("radar")}</Link>
      </div>
    </div>
  );
}
