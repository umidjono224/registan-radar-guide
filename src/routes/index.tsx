import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/lib/app-store";
import { Compass } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Registon Guide — Samarqand tarixini kashf eting" },
      { name: "description", content: "Offline-first radar tourist guide for Registan Square and the monuments of Samarkand. Works without internet." },
      { property: "og:title", content: "Registon Guide" },
      { property: "og:description", content: "Point your phone, find the monument, listen to its story — all offline." },
    ],
  }),
  component: Splash,
});

function Splash() {
  const { t } = useApp();
  return (
    <Link to="/onboarding" className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col items-center justify-center overflow-hidden bg-background text-center">
      <div className="absolute inset-0 bg-girih opacity-[0.06]" aria-hidden />
      <div className="absolute inset-0 bg-radial-glow" aria-hidden />
      <div className="relative animate-fade-up">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[28px] bg-primary shadow-glow">
          <Compass className="h-12 w-12 text-primary-foreground" strokeWidth={2.2} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{t("appName")}</h1>
        <p className="mt-3 text-base text-sand">{t("tagline")}</p>
      </div>
      <div className="absolute bottom-16 flex gap-1.5">
        <span className="h-1.5 w-6 rounded-full bg-primary" />
        <span className="h-1.5 w-1.5 rounded-full bg-primary/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-primary/30" />
      </div>
      <p className="absolute bottom-8 text-xs text-muted-foreground">Samarqand · Registon</p>
    </Link>
  );
}
