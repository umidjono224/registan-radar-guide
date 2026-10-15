import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Screen } from "@/components/app/shell";
import { Chip, Skeleton } from "@/components/app/primitives";
import { PlaceCard } from "@/components/app/place-card";
import { useApp } from "@/lib/app-store";
import { usePlacesWithGeo, useFormatters } from "@/lib/use-places";
import type { Category } from "@/lib/data";

export const Route = createFileRoute("/places/")({
  head: () => ({
    meta: [
      { title: "Joylar — Registon Guide" },
      { name: "description", content: "All monuments of the Registan area: madrasahs, mosques, mausoleums and museums — available offline." },
      { property: "og:title", content: "Places — Registon Guide" },
      { property: "og:description", content: "All Registan-area monuments, offline." },
    ],
  }),
  component: Places,
});

const cats: (Category | "all")[] = ["all", "madrasa", "mosque", "mausoleum", "museum", "historic"];
const catKey = { all: "catAll", madrasa: "catMadrasa", mosque: "catMosque", mausoleum: "catMausoleum", museum: "catMuseum", historic: "catHistoric" } as const;

function Places() {
  const { t, favourites, toggleFavourite } = useApp();
  const f = useFormatters();
  const all = usePlacesWithGeo();
  const [cat, setCat] = useState<Category | "all">("all");
  const [sort, setSort] = useState<"near" | "popular" | "alpha">("near");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const list = useMemo(() => {
    let l = all.filter((p) => (cat === "all" || p.category === cat) && f.name(p).toLowerCase().includes(q.toLowerCase()));
    if (sort === "popular") l = [...l].sort((a, b) => b.popularity - a.popularity);
    if (sort === "alpha") l = [...l].sort((a, b) => f.name(a).localeCompare(f.name(b)));
    return l;
  }, [all, cat, sort, q, f]);

  return (
    <Screen nav>
      <h1 className="pt-2 text-[28px] font-bold">{t("places")}</h1>
      <label className="mt-4 flex h-12 items-center gap-2 rounded-2xl border border-border bg-surface px-4">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search")} className="flex-1 bg-transparent outline-none" />
      </label>
      <div className="scrollbar-none -mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
        {cats.map((c) => <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{t(catKey[c])}</Chip>)}
      </div>
      <div className="mt-3 flex items-center gap-1 text-sm">
        {(["near", "popular", "alpha"] as const).map((s) => (
          <button key={s} onClick={() => setSort(s)} className={s === sort ? "rounded-lg bg-surface-2 px-3 py-1.5 font-bold" : "px-3 py-1.5 text-muted-foreground"}>
            {t(s === "near" ? "sortNear" : s === "popular" ? "sortPopular" : "sortAlpha")}
          </button>
        ))}
        <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1200); }} className="ml-auto text-xs text-muted-foreground underline">skeleton</button>
      </div>
      <div className="mt-4 grid gap-4">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="overflow-hidden rounded-3xl border border-border"><Skeleton className="aspect-[16/10] rounded-none" /><div className="flex gap-2 p-4"><Skeleton className="h-7 w-16" /><Skeleton className="h-7 flex-1" /></div></div>)
          : list.map((p) => (
              <PlaceCard key={p.placeId} placeId={p.placeId} name={f.name(p)} image={p.image} distance={f.dist(p.distance)} bearing={f.card(p.bearing)} category={p.category} short={p.short[f.lang]} favourite={favourites.includes(p.placeId)} availability={p.availability} onToggleFavourite={toggleFavourite} />
            ))}
      </div>
    </Screen>
  );
}
