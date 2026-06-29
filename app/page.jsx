import PortfolioPage from "../components/PortfolioPage";
import { readPortfolioContent } from "../lib/portfolio-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await readPortfolioContent();
  return <PortfolioPage content={content} />;
}
