export function createEnvironment(profile, refreshKey = 0) {
  const jitter = refreshKey * 13;
  return Array.from({ length: 48 }, (_, hour) => {
    const local = hour % 24;
    const solar = Math.max(0, Math.sin((local - 6) * Math.PI / 12));
    const noise = Math.sin((hour + jitter) * 1.71) * 12;
    const wetBulb = +(22 + profile.heat * 8 * Math.max(0, Math.sin((local - 7) * Math.PI / 12)) + noise / 18).toFixed(1);
    return { hour, label: `${String(local).padStart(2, '0')}:00`, carbon: +(profile.baseCarbon - 220 * solar + noise).toFixed(1), wetBulb, waterImpact: +(32 + Math.max(0, wetBulb - 19) * 4.8 + profile.waterStress * 12).toFixed(1), renewable: +(15 + 70 * solar + noise / 4).toFixed(1) };
  });
}
