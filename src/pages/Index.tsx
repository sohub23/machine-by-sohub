import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import NormalizeSection from "@/components/landing/NormalizeSection";
import MachinesSection from "@/components/landing/MachinesSection";
import WhyFailsSection from "@/components/landing/WhyFailsSection";
import BackendSection from "@/components/landing/BackendSection";
import PaymentsSection from "@/components/landing/PaymentsSection";
import UseCasesSection from "@/components/landing/UseCasesSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import VideoShowcaseSection from "@/components/landing/VideoShowcaseSection";
import OurInitiatives from "@/components/landing/OurInitiatives";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <HeroSection />
      <NormalizeSection />
      <MachinesSection />
      <VideoShowcaseSection />
      <WhyFailsSection />
      <BackendSection />
      <PaymentsSection />
      <UseCasesSection />
      <PricingSection />
      <FAQSection />
      <OurInitiatives />
    </main>
    <Footer />
  </div>
);

export default Index;
