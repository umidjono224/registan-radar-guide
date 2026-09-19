import { useMemo } from "react";
import { places, USER_POSITION, type Place } from "./data";
import { bearingDeg, cardinal, distanceM, formatDistance, relativeAngle } from "./geo";
import { useApp } from "./app-store";

export interface PlaceWithGeo extends Place {
  distance: number;
  bearing: number;
}

/** Places enriched with distance & bearing from the (simulated) user position. */
export function usePlacesWithGeo(): PlaceWithGeo[] {
  return useMemo(
    () =>
      places
        .map((p) => ({ ...p, distance: distanceM(USER_POSITION, p.coords), bearing: bearingDeg(USER_POSITION, p.coords) }))
        .sort((a, b) => a.distance - b.distance),
    [],
  );
}

export function useFormatters() {
  const { t, lang } = useApp();
  return {
    dist: (m: number) => formatDistance(m, t("m"), t("km")),
    /** "5° o‘ngda" style relative direction. */
    rel: (heading: number, bearing: number) => {
      const d = Math.round(relativeAngle(heading, bearing));
      const a = Math.abs(d);
      if (a <= 5) return t("ahead");
      if (a >= 170) return t("behind");
      return `${a}° ${d > 0 ? t("right") : t("left")}`;
    },
    card: (bearing: number) => t(cardinal(bearing)),
    name: (p: Place) => p.name[lang],
    lang,
  };
}
