import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Screen, TopBar } from "@/components/app/shell";
import { Btn } from "@/components/app/primitives";
import { useApp } from "@/lib/app-store";
import { LANGS } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/language")({
  head: () => ({
    meta: [
      { title: "Language — Registon Guide" },
      { name: "description", content: "Choose O‘zbekcha, Русский or English (UK). Your choice works offline." },
      { property: "og:title", content: "Language — Registon Guide" },
      { property: "og:description", content: "Choose O‘zbekcha, Русский or English (UK)." },
    ],
  }),
  component: LanguagePage,
});

function LanguagePage() {
  const { t, lang, setLang } = useApp();
  const navigate = useNavigate();
  return (
    <Screen>
      <TopBar title={t("chooseLang")} />
      <p className="mt-2 text-sm text-muted-foreground">uz-UZ · ru-RU · en-GB</p>
      <div className="mt-6 grid gap-3">
        {LANGS.map((l) => (
          <button key={l.code} onClick={() => setLang(l.code)} className={cn("tap flex h-16 items-center gap-4 rounded-2xl border px-4 text-left", lang === l.code ? "border-primary bg-primary/10 shadow-glow" : "border-border bg-card")}>
            <span className="text-3xl">{l.flag}</span>
            <span className="flex-1">
              <span className="block font-bold">{l.label}</span>
              <span className="block text-xs text-muted-foreground">{l.tag}</span>
            </span>
            {lang === l.code && <Check className="h-5 w-5 text-primary" />}
          </button>
        ))}
      </div>
      <div className="mt-auto pt-8">
        <Btn size="lg" full onClick={() => navigate({ to: "/login" })}>{t("continue")}</Btn>
      </div>
    </Screen>
  );
}
