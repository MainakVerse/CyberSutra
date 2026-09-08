import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Capabilities } from "@/components/sections/capabilities";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Compliance } from "@/components/sections/compliance";
import { RoleTabs } from "@/components/sections/role-tabs";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <Capabilities />
        <HowItWorks />
        <Compliance />
        <RoleTabs />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
