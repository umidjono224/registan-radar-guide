import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Screen, TopBar } from "@/components/app/shell";
import { Btn } from "@/components/app/primitives";
import { AuthHeader, Field } from "@/components/app/auth-form";
import { useApp } from "@/lib/app-store";

export const Route = createFileRoute("/forgot")({
  head: () => ({
    meta: [
      { title: "Parolni tiklash — Registon Guide" },
      { name: "description", content: "Reset your Registon Guide password by email or phone." },
      { property: "og:title", content: "Parolni tiklash — Registon Guide" },
      { property: "og:description", content: "Reset your Registon Guide password." },
    ],
  }),
  component: Forgot,
});

function Forgot() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <Screen>
      <TopBar />
      <AuthHeader title={t("resetTitle")} sub={t("resetBody")} />
      <form className="mt-6 grid gap-4" onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => navigate({ to: "/verify" }), 800); }}>
        <Field label={t("emailOrPhone")} placeholder="name@example.com" inputMode="email" />
        <Btn type="submit" size="lg" full loading={loading}>{t("send")}</Btn>
      </form>
    </Screen>
  );
}
