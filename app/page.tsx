import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { PartnerAdvantages } from '@/components/PartnerAdvantages';
import { ExpertiseSection } from '@/components/ExpertiseSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ReviewsSection />
      <PartnerAdvantages />
      <ExpertiseSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
