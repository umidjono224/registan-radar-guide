import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Compass, WifiOff, Footprints } from "lucide-react";
import { Screen } from "@/components/app/shell";
import { Btn } from "@/components/app/primitives";
import { useApp } from "@/lib/app-store";
import { LANGS } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import registan from "@/assets/registan.jpg";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Onboarding — Registon Guide" },
      { name: "description", content: "Discover the Registan by turning your phone. No internet needed." },
      { property: "og:title", content: "Onboarding — Registon Guide" },
      { property: "og:description", content: "Discover the Registan by turning your phone. No internet needed." },
    ],
  }),
  component: Onboarding,
});

function Onboarding() {
  const { t, lang, setLang } = useApp();
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const steps = [
    { icon: Compass, title: t("ob1Title"), body: t("ob1Body") },
    { icon: WifiOff, title: t("ob2Title"), body: t("ob2Body") },
    { icon: Footprints, title: t("ob3Title"), body: t("ob3Body") },
  ];
  const s = steps[step];
  return (
    <Screen padded={false}>
      <div className="relative h-[46vh] overflow-hidden">
        <img src={registan} alt="" width={1024} height={768} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="absolute right-5 top-4">
          <Link to="/language" className="rounded-full bg-background/60 px-4 py-2 text-sm font-semibold backdrop-blur">{t("skip")}</Link>
        </div>
      </div>
      <div className="-mt-10 flex flex-1 flex-col px-6">
        <div key={step} className="animate-fade-up flex-1">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <s.icon className="h-7 w-7" />
          </div>
          <h1 className="text-[28px] font-bold leading-tight">{s.title}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.body}</p>

          {step === 2 && (
            <div className="mt-6 grid gap-2">
              {LANGS.map((l) => (
                <button key={l.code} onClick={() => setLang(l.code)} className={cn("tap flex h-14 items-center gap-3 rounded-2xl border px-4 text-left font-semibold", lang === l.code ? "border-primary bg-primary/10" : "border-border bg-card")}>
                  <span className="text-2xl">{l.flag}</span>
                  <span className="flex-1">{l.label}</span>
                  <span className="text-xs text-muted-foreground">{l.tag}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between py-6">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <span key={i} className={cn("h-1.5 rounded-full transition-all", i === step ? "w-6 bg-primary" : "w-1.5 bg-primary/30")} />
            ))}
          </div>
          <Btn size="lg" className="min-w-36" onClick={() => (step < 2 ? setStep(step + 1) : navigate({ to: "/login" }))}>
            {step < 2 ? t("next") : t("start")}
          </Btn>
        </div>
      </div>
    </Screen>
  );
}
