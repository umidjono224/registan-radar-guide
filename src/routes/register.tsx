import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Screen, TopBar } from "@/components/app/shell";
import { Btn } from "@/components/app/primitives";
import { AuthBanner, AuthHeader, Field, LegalLine, StateSwitcher, type AuthState } from "@/components/app/auth-form";
import { useApp } from "@/lib/app-store";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Ro‘yxatdan o‘tish — Registon Guide" },
      { name: "description", content: "Create a Registon Guide account to unlock the Registan Offline Pack." },
      { property: "og:title", content: "Ro‘yxatdan o‘tish — Registon Guide" },
      { property: "og:description", content: "Create an account to unlock the Registan Offline Pack." },
    ],
  }),
  component: Register,
});

function Register() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>("idle");
  const submit = () => {
    setState("loading");
    setTimeout(() => navigate({ to: "/verify" }), 900);
  };
  return (
    <Screen>
      <TopBar />
      <AuthHeader title={t("register")} />
      <StateSwitcher value={state} onChange={(v) => setState(v as AuthState)} options={["idle", "loading", "invalid", "server", "offline"]} />
      <form className="mt-5 grid gap-4" onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <AuthBanner state={state} />
        <Field label={t("name")} placeholder="Aziza Karimova" autoComplete="name" />
        <Field label={t("emailOrPhone")} placeholder="+998 90 000 00 00" inputMode="email" autoComplete="username" />
        <Field label={t("password")} type="password" placeholder="••••••••" autoComplete="new-password" error={state === "invalid" ? t("passwordShort") : undefined} />
        <Field label={t("confirmPassword")} type="password" placeholder="••••••••" autoComplete="new-password" error={state === "invalid" ? t("passwordsMismatch") : undefined} />
        <Btn type="submit" size="lg" full loading={state === "loading"} disabled={state === "offline"}>{t("register")}</Btn>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t("haveAccount")} <Link to="/login" className="font-bold text-primary">{t("login")}</Link>
      </p>
      <div className="mt-auto pt-6"><LegalLine /></div>
    </Screen>
  );
}
