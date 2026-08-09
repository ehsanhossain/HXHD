import { Hero } from './components/Hero';
import { SearchStrip } from './components/SearchStrip';
import { SolutionsAndProducts } from './components/SolutionsAndProducts';
import { CredibilityAndCTA } from './components/CredibilityAndCTA';
import { ResourcesAndInsights } from './components/ResourcesAndInsights';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchStrip />
      <SolutionsAndProducts />
      <CredibilityAndCTA />
      <ResourcesAndInsights />
    </>
  );
}
