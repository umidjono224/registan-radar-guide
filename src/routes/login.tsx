import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Screen, TopBar } from "@/components/app/shell";
import { Btn, StatusPill } from "@/components/app/primitives";
import { AuthBanner, AuthHeader, Field, LegalLine, StateSwitcher, type AuthState } from "@/components/app/auth-form";
import { useApp } from "@/lib/app-store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Kirish — Registon Guide" },
      { name: "description", content: "Sign in to Registon Guide to manage your subscription and offline pack." },
      { property: "og:title", content: "Kirish — Registon Guide" },
      { property: "og:description", content: "Sign in to manage your subscription and offline pack." },
    ],
  }),
  component: Login,
});

function Login() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>("idle");
  const submit = () => {
    setState("loading");
    setTimeout(() => { setState("success"); setTimeout(() => navigate({ to: "/plans" }), 500); }, 900);
  };
  return (
    <Screen>
      <TopBar right={<StatusPill state={state === "offline" ? "offline" : "online"} />} />
      <AuthHeader title={t("login")} sub={t("exploreSubtitle")} />
      <StateSwitcher value={state} onChange={(v) => setState(v as AuthState)} options={["idle", "loading", "invalid", "server", "offline", "success"]} />
      <form className="mt-5 grid gap-4" onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <AuthBanner state={state} />
        <Field label={t("emailOrPhone")} placeholder="name@example.com" defaultValue={state === "invalid" ? "name@" : ""} error={state === "invalid" ? t("invalidEmail") : undefined} inputMode="email" autoComplete="username" />
        <Field label={t("password")} type="password" placeholder="••••••••" autoComplete="current-password" />
        <div className="-mt-1 text-right">
          <Link to="/forgot" className="text-sm font-semibold text-primary">{t("forgot")}</Link>
        </div>
        <Btn type="submit" size="lg" full loading={state === "loading"} disabled={state === "offline"}>{t("login")}</Btn>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t("noAccount")} <Link to="/register" className="font-bold text-primary">{t("register")}</Link>
      </p>
      <div className="mt-auto pt-6">
        <Btn variant="ghost" full onClick={() => navigate({ to: "/explore" })}>{t("continueOffline")}</Btn>
        <LegalLine />
      </div>
    </Screen>
  );
}
