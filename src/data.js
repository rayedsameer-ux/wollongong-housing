export const historical = [
  { year: "2017-18", migration: 1287, population: 212188, housePrice: 620000, rent: 450, supply: 1632, popGrowth: 0, demand: 1287, gap: -345 },
  { year: "2018-19", migration: 1524, population: 213480, housePrice: 680000, rent: 480, supply: 1064, popGrowth: 1292, demand: 2816, gap: 1752 },
  { year: "2019-20", migration: 1845, population: 214552, housePrice: 780000, rent: 520, supply: 1202, popGrowth: 1072, demand: 2917, gap: 1715 },
  { year: "2020-21", migration: 3742, population: 215063, housePrice: 900000, rent: 550, supply: 1375, popGrowth: 511, demand: 4253, gap: 2878 },
  { year: "2021-22", migration: 2196, population: 214700, housePrice: 1050000, rent: 620, supply: 1226, popGrowth: -363, demand: 1833, gap: 607 },
  { year: "2022-23", migration: 1436, population: 216835, housePrice: 1150000, rent: 680, supply: 1340, popGrowth: 2135, demand: 3571, gap: 2231 },
  { year: "2023-24", migration: 1102, population: 219497, housePrice: 1220000, rent: 720, supply: 890, popGrowth: 2662, demand: 3764, gap: 2874 },
  { year: "2024-25", migration: 1000, population: 222204, housePrice: 1280000, rent: 750, supply: 1559, popGrowth: 2707, demand: 3707, gap: 2148 },
];

export const forecastHouse = {
  low: [1369600, 1465472, 1568055, 1677819, 1795266, 1920935],
  base: [1420800, 1577088, 1750568, 1943130, 2156874, 2394130],
  high: [1472000, 1692800, 1946720, 2238728, 2574537, 2960718],
  arima: [1374286, 1468571, 1562857, 1657143, 1751429, 1845714],
};

export const forecastRent = {
  low: [788, 827, 868, 911, 957, 1005],
  base: [807, 868, 934, 1005, 1081, 1163],
  high: [825, 908, 999, 1099, 1209, 1330],
  arima: [793, 836, 879, 921, 964, 1007],
};

export const forecastYears = ["2025-26", "2026-27", "2027-28", "2028-29", "2029-30", "2030-31"];

export const scenarios = {
  low: { label: "Low", tag: "7%", color: "#64748b", desc: "Migration slows significantly" },
  base: { label: "Base", tag: "11%", color: "#2563eb", desc: "Current trend continues" },
  high: { label: "High", tag: "15%", color: "#f97316", desc: "Migration accelerates" },
};

export const theme = {
  navy: "#0f172a",
  ink: "#172033",
  muted: "#64748b",
  soft: "#f8fafc",
  line: "#e2e8f0",
  blue: "#2563eb",
  cyan: "#0891b2",
  violet: "#7c3aed",
  green: "#059669",
  amber: "#f59e0b",
  red: "#e11d48",
};

export const fmt = (v) =>
  v >= 1e6 ? `$${(v / 1e6).toFixed(2)}M` : v >= 1e3 ? `$${(v / 1e3).toFixed(0)}K` : `$${v}`;

export const growthData = historical.slice(1).map((d, i) => ({
  year: d.year,
  priceGrowth: Number((((d.housePrice - historical[i].housePrice) / historical[i].housePrice) * 100).toFixed(1)),
  rentGrowth: Number((((d.rent - historical[i].rent) / historical[i].rent) * 100).toFixed(1)),
}));

export const buildCombinedData = (priceKey) => {
  const src = priceKey === "house" ? forecastHouse : forecastRent;
  const histKey = priceKey === "house" ? "housePrice" : "rent";
  return [
    ...historical.map((d) => ({ year: d.year, actual: d[histKey] })),
    ...forecastYears.map((y, i) => ({ year: y, low: src.low[i], base: src.base[i], high: src.high[i], arima: src.arima[i] })),
  ];
};

export const tooltipStyle = {
  background: "rgba(255,255,255,0.98)",
  border: "1px solid #e2e8f0",
  borderRadius: 16,
  boxShadow: "0 22px 60px rgba(15,23,42,0.18)",
  color: theme.ink,
};
