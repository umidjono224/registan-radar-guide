import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, RotateCw, WifiOff, CloudDownload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/app-store";
import { Badge, Btn } from "./primitives";

/** Backend-ready audio player contract (mirrors Flutter widget). */
export interface AudioPlayerProps {
  audioId: string;
  title: string;
  subtitle?: string;
  duration: number; // seconds
  localFile?: string;
  remoteUrl?: string;
  downloaded: boolean;
  initialState?: "idle" | "playing" | "paused";
  compact?: boolean;
}

export const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function AudioPlayer({ title, subtitle, duration, downloaded, initialState = "idle", compact }: AudioPlayerProps) {
  const { t } = useApp();
  const [playing, setPlaying] = useState(initialState === "playing");
  const [pos, setPos] = useState(0);
  const [speed, setSpeed] = useState(1);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setPos((p) => (p + 0.25 * speed >= duration ? (setPlaying(false), duration) : p + 0.25 * speed)), 250);
    return () => window.clearInterval(id);
  }, [playing, speed, duration]);
  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);

  const seek = (d: number) => setPos((p) => Math.max(0, Math.min(duration, p + d)));
  const pct = (pos / duration) * 100;

  if (compact) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-card">
        <Btn size="icon" aria-label={playing ? t("pause") : "Play"} onClick={() => setPlaying(!playing)} disabled={!downloaded}>
          {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
        </Btn>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{title}</p>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div className="h-full bg-primary transition-[width]" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">{fmt(duration)}</span>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">{t("audioGuide")}</p>
          <h3 className="mt-1 text-lg font-bold leading-tight">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {downloaded ? <Badge tone="success" icon={WifiOff}>{t("offlineAvailable")}</Badge> : <Badge tone="warning" icon={CloudDownload}>{t("download")}</Badge>}
      </div>

      {/* equaliser */}
      <div className="mt-5 flex h-10 items-end justify-center gap-1" aria-hidden>
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} className={cn("w-1.5 origin-bottom rounded-full", i / 28 < pct / 100 ? "bg-primary" : "bg-surface-2", playing && i / 28 < pct / 100 && "animate-eq")} style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${(i % 7) * 0.1}s` }} />
        ))}
      </div>

      {/* seek */}
      <input
        type="range"
        min={0}
        max={duration}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Seek"
        className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-2 accent-primary"
      />
      <div className="mt-1 flex justify-between text-xs tabular-nums text-muted-foreground">
        <span>{fmt(pos)}</span>
        <span>{fmt(duration)}</span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button onClick={() => setSpeed(speed === 1 ? 1.25 : speed === 1.25 ? 1.5 : speed === 1.5 ? 0.75 : 1)} className="tap h-10 min-w-12 rounded-xl bg-surface-2 px-2 text-sm font-bold tabular-nums" aria-label={t("speed")}>
          {speed}×
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => seek(-15)} aria-label="-15 s" className="tap relative flex h-12 w-12 items-center justify-center rounded-full bg-surface-2">
            <RotateCcw className="h-6 w-6" />
            <span className="absolute text-[9px] font-bold">15</span>
          </button>
          <button onClick={() => setPlaying(!playing)} disabled={!downloaded} aria-label={playing ? t("pause") : "Play"} className="tap flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow disabled:opacity-40">
            {playing ? <Pause className="h-7 w-7" /> : <Play className="ml-1 h-7 w-7" />}
          </button>
          <button onClick={() => seek(15)} aria-label="+15 s" className="tap relative flex h-12 w-12 items-center justify-center rounded-full bg-surface-2">
            <RotateCw className="h-6 w-6" />
            <span className="absolute text-[9px] font-bold">15</span>
          </button>
        </div>
        <span className="min-w-12 text-right text-xs text-muted-foreground">{downloaded ? "Local" : "Remote"}</span>
      </div>
    </div>
  );
}
