import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ContinuityCards } from '@/components/ContinuityCards';
import { PartnerAdvantages } from '@/components/PartnerAdvantages';
import { ExpertiseSection } from '@/components/ExpertiseSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ContinuityCards />
      <PartnerAdvantages />
      <ExpertiseSection />
      
      {/* Placeholder for team section */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Whittico Family</h2>
          <p className="text-gray-600">Family team profiles coming soon...</p>
        </div>
      </section>
      
      <ContactSection />
      <Footer />
    </main>
  );
}
