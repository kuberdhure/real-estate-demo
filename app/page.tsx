import { Hero, About, Properties, Testimonials, CTA, Footer } from "@/app/components"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <About />
      <Properties />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
