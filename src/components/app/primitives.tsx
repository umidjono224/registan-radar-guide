import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link, type LinkProps } from "@tanstack/react-router";
import { Loader2, WifiOff, Wifi, RefreshCw, Download, ArrowUpCircle, type LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useApp, type Connectivity } from "@/lib/app-store";

/* ---------- Buttons ---------- */
export const btn = cva(
  "tap inline-flex items-center justify-center gap-2 font-semibold rounded-2xl select-none disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-glow",
        secondary: "bg-surface-2 text-foreground border border-border",
        ghost: "bg-transparent text-foreground hover:bg-surface-2",
        sand: "bg-sand text-sand-foreground",
        danger: "bg-destructive/15 text-destructive border border-destructive/30",
        outline: "border border-primary/50 text-primary bg-transparent",
      },
      size: {
        lg: "h-14 px-6 text-base",
        md: "h-12 px-5 text-[15px]",
        sm: "h-10 px-4 text-sm rounded-xl",
        icon: "h-11 w-11 rounded-full",
        iconSm: "h-9 w-9 rounded-full",
      },
      full: { true: "w-full" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof btn> & { loading?: boolean };
export function Btn({ className, variant, size, full, loading, children, ...rest }: BtnProps) {
  return (
    <button className={cn(btn({ variant, size, full }), className)} disabled={loading || rest.disabled} {...rest}>
      {loading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : children}
    </button>
  );
}
export function LinkBtn({ className, variant, size, full, children, ...rest }: LinkProps & VariantProps<typeof btn> & { className?: string; children: ReactNode }) {
  return (
    <Link className={cn(btn({ variant, size, full }), className)} {...rest}>
      {children}
    </Link>
  );
}

/* ---------- Chips / badges ---------- */
export function Chip({ active, children, onClick, className }: { active?: boolean; children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "tap h-9 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors",
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Badge({ children, tone = "neutral", icon: Icon, className }: { children: ReactNode; tone?: "neutral" | "primary" | "success" | "warning" | "danger" | "sand"; icon?: LucideIcon; className?: string }) {
  const tones = {
    neutral: "bg-surface-2 text-foreground",
    primary: "bg-primary/15 text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    danger: "bg-destructive/15 text-destructive",
    sand: "bg-sand/20 text-sand",
  };
  return (
    <span className={cn("inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-xs font-semibold tabular-nums", tones[tone], className)}>
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden />}
      {children}
    </span>
  );
}

/* ---------- Connectivity status ---------- */
export function StatusPill({ state, className }: { state?: Connectivity; className?: string }) {
  const { t, connectivity } = useApp();
  const s = state ?? connectivity;
  const map: Record<Connectivity, { icon: LucideIcon; label: string; tone: "success" | "warning" | "primary" | "neutral"; spin?: boolean }> = {
    online: { icon: Wifi, label: t("online"), tone: "success" },
    offline: { icon: WifiOff, label: t("offlineMode"), tone: "warning" },
    syncing: { icon: RefreshCw, label: t("syncing"), tone: "primary", spin: true },
    downloading: { icon: Download, label: t("downloading"), tone: "primary" },
    updating: { icon: ArrowUpCircle, label: t("updating"), tone: "primary", spin: true },
  };
  const m = map[s];
  return (
    <Badge tone={m.tone} className={className}>
      <m.icon className={cn("h-3.5 w-3.5", m.spin && "animate-spin")} aria-hidden />
      {m.label}
    </Badge>
  );
}

/* ---------- Progress / skeleton ---------- */
export function ProgressBar({ value, tone = "primary", className }: { value: number; tone?: "primary" | "success" | "danger"; className?: string }) {
  const c = { primary: "bg-primary", success: "bg-success", danger: "bg-destructive" }[tone];
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-2", className)} role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}>
      <div className={cn("h-full rounded-full transition-[width] duration-300", c)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-surface-2", className)} aria-hidden />;
}

/* ---------- Cards ---------- */
export function Card({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className={cn("rounded-3xl border border-border bg-card p-4 shadow-card", onClick && "tap cursor-pointer", className)}>
      {children}
    </div>
  );
}

/* ---------- Empty / Error ---------- */
export function StateBlock({ icon: Icon, title, body, tone = "neutral", action, secondary, className }: { icon: LucideIcon; title: string; body?: string; tone?: "neutral" | "danger" | "warning" | "success" | "primary"; action?: ReactNode; secondary?: ReactNode; className?: string }) {
  const ring = {
    neutral: "bg-surface-2 text-muted-foreground",
    danger: "bg-destructive/15 text-destructive",
    warning: "bg-warning/15 text-warning",
    success: "bg-success/15 text-success",
    primary: "bg-primary/15 text-primary",
  }[tone];
  return (
    <div className={cn("flex flex-col items-center px-6 py-10 text-center", className)}>
      <div className={cn("mb-5 flex h-20 w-20 items-center justify-center rounded-full", ring)}>
        <Icon className="h-9 w-9" aria-hidden />
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      {body && <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{body}</p>}
      {(action || secondary) && (
        <div className="mt-6 flex w-full max-w-xs flex-col gap-2">
          {action}
          {secondary}
        </div>
      )}
    </div>
  );
}

/* ---------- Section header ---------- */
export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-base font-bold">{children}</h2>
      {action}
    </div>
  );
}

/* ---------- Toggle ---------- */
export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} className={cn("relative h-7 w-12 rounded-full transition-colors", on ? "bg-primary" : "bg-surface-2 border border-border")}>
      <span className={cn("absolute top-0.5 h-6 w-6 rounded-full bg-background shadow transition-transform", on ? "translate-x-5.5 left-0" : "left-0")} style={{ transform: on ? "translateX(22px)" : "translateX(2px)" }} />
    </button>
  );
}
