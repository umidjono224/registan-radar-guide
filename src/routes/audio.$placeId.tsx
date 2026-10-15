import { createFileRoute, notFound } from "@tanstack/react-router";
import { Screen, TopBar } from "@/components/app/shell";
import { AudioPlayer } from "@/components/app/audio-player";
import { useApp } from "@/lib/app-store";
import { getPlace } from "@/lib/data";

export const Route = createFileRoute("/audio/$placeId")({
  loader: ({ params }) => { const p = getPlace(params.placeId); if (!p) throw notFound(); return { name: p.name.en }; },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Audio"} audio guide — Registon Guide` },
      { name: "description", content: "Offline audio guide with seek, 15-second skip and playback speed." },
      { property: "og:title", content: `${loaderData?.name ?? "Audio"} audio guide — Registon Guide` },
      { property: "og:description", content: "Offline audio guide for the Registan monuments." },
    ],
  }),
  component: AudioPage,
});

function AudioPage() {
  const { placeId } = Route.useParams();
  const p = getPlace(placeId)!;
  const { t, lang } = useApp();
  return (
    <Screen>
      <TopBar title={t("audioGuide")} />
      <div className="relative mx-auto mt-4 aspect-square w-full max-w-[300px] overflow-hidden rounded-[40px] shadow-float">
        <img src={p.image} alt={p.name[lang]} className="h-full w-full object-cover" />
        <div className="absolute inset-0 rounded-[40px] ring-1 ring-inset ring-primary/30" />
      </div>
      <div className="mt-6">
        <AudioPlayer audioId={p.audio.audioId} title={p.name[lang]} subtitle={`${t("audioGuide")} · ${lang === "en" ? "en-GB" : lang === "ru" ? "ru-RU" : "uz-UZ"}`} duration={p.audio.durationSec} downloaded={p.audio.downloaded} />
      </div>
    </Screen>
  );
}
