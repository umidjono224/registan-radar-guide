import { createFileRoute } from "@tanstack/react-router";
import { Screen, TopBar } from "@/components/app/shell";
import { useApp } from "@/lib/app-store";

export const Route = createFileRoute("/legal/$doc")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.doc === "terms" ? "Terms of Use" : "Privacy Policy"} — Registon Guide` },
      { name: "description", content: "Legal information for the Registon Guide app." },
      { property: "og:title", content: `${params.doc === "terms" ? "Terms of Use" : "Privacy Policy"} — Registon Guide` },
      { property: "og:description", content: "Legal information for the Registon Guide app." },
    ],
  }),
  component: Legal,
});

function Legal() {
  const { doc } = Route.useParams();
  const { t } = useApp();
  return (
    <Screen>
      <TopBar title={doc === "terms" ? t("terms") : t("privacy")} />
      <div className="prose-sm mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p className="rounded-2xl border border-border bg-card p-4 text-foreground">Placeholder — final legal text is supplied by the backend content service and cached in the offline pack in all three languages.</p>
        {Array.from({ length: 5 }).map((_, i) => (
          <p key={i}>
            {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Location data is processed on the device only and is never transmitted. Audio and images are stored locally for offline use.
          </p>
        ))}
      </div>
    </Screen>
  );
}
