import { useState, type InputHTMLAttributes } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, WifiOff, AlertTriangle, CheckCircle2, Compass } from "lucide-react";
import { Btn, Chip } from "./primitives";
import { useApp } from "@/lib/app-store";
import { cn } from "@/lib/utils";

export function Field({ label, error, type, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const [show, setShow] = useState(false);
  const isPw = type === "password";
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      <span className="relative block">
        <input
          {...rest}
          type={isPw ? (show ? "text" : "password") : type}
          aria-invalid={!!error}
          className={cn("h-13 w-full rounded-2xl border bg-surface px-4 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/30", error ? "border-destructive" : "border-border", isPw && "pr-12")}
        />
        {isPw && (
          <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide" : "Show"} className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-muted-foreground">
            {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </span>
      {error && <span className="mt-1.5 flex items-center gap-1 text-xs font-medium text-destructive"><AlertTriangle className="h-3.5 w-3.5" />{error}</span>}
    </label>
  );
}

export type AuthState = "idle" | "loading" | "success" | "invalid" | "server" | "offline" | "verify";

/** Demo state switcher so every auth state can be reviewed. */
export function StateSwitcher({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="scrollbar-none -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1">
      {options.map((o) => (
        <Chip key={o} active={value === o} onClick={() => onChange(o)}>{o}</Chip>
      ))}
    </div>
  );
}

export function AuthBanner({ state }: { state: AuthState }) {
  const { t } = useApp();
  const navigate = useNavigate();
  if (state === "offline")
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning/10 p-3 text-sm">
        <WifiOff className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
        <div className="flex-1">
          <p>{t("offlineAuth")}</p>
          <button onClick={() => navigate({ to: "/explore" })} className="mt-2 font-bold text-warning">{t("continueOffline")} →</button>
        </div>
      </div>
    );
  if (state === "server")
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-3 text-sm">
        <AlertTriangle className="h-5 w-5 shrink-0 text-destructive" />
        <p className="flex-1">{t("serverError")}</p>
        <button className="font-bold text-destructive">{t("retry")}</button>
      </div>
    );
  if (state === "success")
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success/10 p-3 text-sm animate-pop">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
        <p className="flex-1 font-semibold">{t("done")}</p>
      </div>
    );
  return null;
}

export function AuthHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mt-2">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
        <Compass className="h-6 w-6" />
      </div>
      <h1 className="text-[28px] font-bold">{title}</h1>
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function LegalLine() {
  const { t } = useApp();
  const parts = t("agree").split(/(\{terms\}|\{privacy\})/);
  return (
    <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
      {parts.map((p, i) =>
        p === "{terms}" ? <Link key={i} to="/legal/$doc" params={{ doc: "terms" }} className="font-semibold text-primary">{t("terms")}</Link>
        : p === "{privacy}" ? <Link key={i} to="/legal/$doc" params={{ doc: "privacy" }} className="font-semibold text-primary">{t("privacy")}</Link>
        : <span key={i}>{p}</span>,
      )}
    </p>
  );
}

export { Btn };
