from __future__ import annotations
import math


def environmental_profile(hours: int = 48):
    rows = []
    for h in range(hours):
        hour = h % 24
        solar = max(0.0, math.sin((hour - 6) * math.pi / 12))
        carbon = round(720 - 230 * solar + 18 * math.sin(h * 0.31), 1)
        wet = round(23 + 8 * max(0, math.sin((hour - 7) * math.pi / 12)) + 1.5 * math.sin(h * 0.18), 1)
        water = round(35 + max(0, wet - 20) * 4.6, 1)
        renewable = round(18 + 67 * solar, 1)
        rows.append({'hour': h, 'label': f'{hour:02d}:00', 'carbon': carbon, 'wet_bulb': wet, 'water_impact': water, 'renewable': renewable})
    return rows
