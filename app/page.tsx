import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { Premise } from "@/components/sections/premise";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Work } from "@/components/sections/work";
import { Pricing } from "@/components/sections/pricing";
import { About } from "@/components/sections/about";
import { ContactForm } from "@/components/sections/contact-form";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Premise />
        <WhatWeDo />
        <HowWeWork />
        <Work />
        <Pricing />
        <About />
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
