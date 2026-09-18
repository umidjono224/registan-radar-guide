export type LatLng = { lat: number; lng: number };

const R = 6371000;
const toRad = (d: number) => (d * Math.PI) / 180;
const toDeg = (r: number) => (r * 180) / Math.PI;

/** Haversine distance in metres. */
export function distanceM(a: LatLng, b: LatLng): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Initial bearing from a to b, 0..360 (0 = North). */
export function bearingDeg(a: LatLng, b: LatLng): number {
  const φ1 = toRad(a.lat);
  const φ2 = toRad(b.lat);
  const Δλ = toRad(b.lng - a.lng);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

/** Signed difference (-180..180): positive = target is to the right. */
export function relativeAngle(heading: number, bearing: number): number {
  let d = (bearing - heading + 540) % 360;
  return d - 180;
}

export function formatDistance(m: number, unitM = "m", unitKm = "km"): string {
  if (m < 1000) return `${Math.round(m)} ${unitM}`;
  return `${(m / 1000).toFixed(1)} ${unitKm}`;
}

export type Cardinal = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
export function cardinal(bearing: number): Cardinal {
  const dirs: Cardinal[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(((bearing % 360) / 45)) % 8];
}
