import Hero from "@/components/Hero";
import About from "@/components/About";
import Philosophy from "@/components/Philosophy";
import Process from "@/components/Process";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LenisProvider from "@/components/LenisProvider";

export default function Home() {
  return (
    <LenisProvider>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Philosophy />
        <Process />
        <Menu />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </LenisProvider>
  );
}
