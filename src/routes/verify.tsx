import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Screen, TopBar } from "@/components/app/shell";
import { Btn } from "@/components/app/primitives";
import { AuthHeader } from "@/components/app/auth-form";
import { useApp } from "@/lib/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Tasdiqlash — Registon Guide" },
      { name: "description", content: "Enter the 6-digit verification code sent to your email or phone." },
      { property: "og:title", content: "Tasdiqlash — Registon Guide" },
      { property: "og:description", content: "Enter your 6-digit verification code." },
    ],
  }),
  component: Verify,
});

function Verify() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Screen>
      <TopBar />
      <AuthHeader title={t("verifyTitle")} sub={t("verifyBody", { target: "+998 90 •••• 12" })} />
      <div className="relative mt-8">
        <input value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" aria-label="Code" className="absolute inset-0 opacity-0" />
        <div className="grid grid-cols-6 gap-2" aria-hidden>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={cn("flex h-14 items-center justify-center rounded-2xl border bg-surface text-2xl font-bold tabular-nums", i === code.length ? "border-primary ring-2 ring-primary/30" : "border-border")}>
              {code[i] ?? ""}
            </div>
          ))}
        </div>
      </div>
      <button className="mt-5 text-sm font-semibold text-primary">{t("resend")} · 0:42</button>
      <div className="mt-auto pt-6">
        <Btn size="lg" full disabled={code.length < 6} loading={loading} onClick={() => { setLoading(true); setTimeout(() => navigate({ to: "/plans" }), 800); }}>{t("verify")}</Btn>
      </div>
    </Screen>
  );
}
