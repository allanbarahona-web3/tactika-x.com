import './barmentech.css';
import { Header } from './components/header';
import { Hero } from './components/hero';
import { Templates } from './components/templates';
import { Pricing } from './components/pricing';
import { Features } from './components/features';
import { Testimonials } from './components/testimonials';
import { FAQ } from './components/faq';
import { Footer } from './components/footer';

export default function BarmentechPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Templates />
      <Pricing />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
