import { Link, useRouter } from "@tanstack/react-router";
import { Compass, MapPin, Map as MapIcon, Heart, User, ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/app-store";

/** Phone-sized frame: 390px reference, adapts to any width. */
export function Screen({ children, className, nav = false, padded = true }: { children: ReactNode; className?: string; nav?: boolean; padded?: boolean }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-background">
      <div className={cn("flex-1 safe-top", padded && "px-5", nav ? "pb-28" : "safe-bottom", className)}>{children}</div>
      {nav && <BottomNav />}
    </div>
  );
}

export function TopBar({ title, right, back = true, subtitle }: { title?: ReactNode; subtitle?: string; right?: ReactNode; back?: boolean }) {
  const router = useRouter();
  return (
    <header className="flex h-14 items-center gap-2">
      {back && (
        <button onClick={() => router.history.back()} aria-label="Back" className="tap -ml-2 flex h-11 w-11 items-center justify-center rounded-full">
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      <div className="min-w-0 flex-1">
        {title && <h1 className="truncate text-lg font-bold">{title}</h1>}
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}

export function BottomNav() {
  const { t } = useApp();
  const items = [
    { to: "/explore", icon: Compass, label: t("explore") },
    { to: "/places", icon: MapPin, label: t("places") },
    { to: "/map", icon: MapIcon, label: t("map") },
    { to: "/favourites", icon: Heart, label: t("favourites") },
    { to: "/profile", icon: User, label: t("profile") },
  ] as const;
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[430px] border-t border-border bg-background/85 backdrop-blur-xl safe-bottom" aria-label="Main">
      <ul className="grid grid-cols-5 px-2 pt-2">
        {items.map((it) => (
          <li key={it.to}>
            <Link
              to={it.to}
              className="tap flex h-14 flex-col items-center justify-center gap-1 rounded-2xl text-muted-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {({ isActive }) => (
                <>
                  <span className={cn("flex h-7 w-12 items-center justify-center rounded-full transition-colors", isActive && "bg-primary/15")}>
                    <it.icon className="h-5 w-5" strokeWidth={isActive ? 2.4 : 2} />
                  </span>
                  <span className="text-[11px] font-semibold">{it.label}</span>
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
