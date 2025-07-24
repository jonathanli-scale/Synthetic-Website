import { HeroSection } from '../components/home/HeroSection';
import { PopularDestinations } from '../components/home/PopularDestinations';
import { SpecialDeals } from '../components/home/SpecialDeals';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PopularDestinations />
      <SpecialDeals />
    </div>
  );
}
