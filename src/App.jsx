import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { FeaturedWork } from './components/FeaturedWork';
import { OtherWork } from './components/OtherWork';
import { Services } from './components/Services';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-hidden noise-overlay">
        <Navigation />
        <main>
          <Hero />
          <Introduction />
          <FeaturedWork />
          <OtherWork />
          <Services />
          <About />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
