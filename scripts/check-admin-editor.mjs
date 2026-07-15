import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const adminDashboard = readFileSync(join(root, "components", "AdminDashboard.jsx"), "utf8");
const portfolioPage = readFileSync(join(root, "components", "PortfolioPage.jsx"), "utf8");
const content = JSON.parse(readFileSync(join(root, "data", "portfolio-content.json"), "utf8"));

const mutableKeyPatterns = [
  "key={`${project.title}-${index}`}",
  "key={`${stack.title}-${index}`}",
  "key={`${item.role}-${index}`}",
  "key={`${certificate.title}-${index}`}",
];

for (const pattern of mutableKeyPatterns) {
  if (adminDashboard.includes(pattern)) {
    throw new Error(`Admin editor uses mutable text in a React key: ${pattern}`);
  }
}

const requiredDashboardMarkers = [
  '"Home"',
  "function HomeEditor",
  "updateMetric",
  "updateChapter",
  "heroSubtitle",
  "marqueeItems",
  "onMakerSignalsChange",
];

for (const marker of requiredDashboardMarkers) {
  if (!adminDashboard.includes(marker)) {
    throw new Error(`Admin dashboard is missing editable home/story control marker: ${marker}`);
  }
}

if (!portfolioPage.includes("heroSubtitle = defaultHeroSubtitle")) {
  throw new Error("Portfolio hero subtitle must come from editable content with a default fallback.");
}

if (!portfolioPage.includes("function Marquee({ items = defaultMarqueeItems })")) {
  throw new Error("Portfolio marquee text must come from editable content with a default fallback.");
}

if (!content.heroSubtitle) {
  throw new Error("Portfolio content must include editable heroSubtitle seed content.");
}

if (!Array.isArray(content.marqueeItems) || !content.marqueeItems.length) {
  throw new Error("Portfolio content must include editable marqueeItems seed content.");
}

console.log("Admin editor regression checks passed.");
