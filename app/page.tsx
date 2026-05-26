import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustBand from "@/components/landing/TrustBand";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import LiveDemo from "@/components/landing/LiveDemo";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBand />
        <FeaturesGrid />
        <HowItWorks />
        <LiveDemo />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
