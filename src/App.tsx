import React, { useState } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Material3DStudio } from './components/Material3DStudio';
import { AboutUs } from './components/AboutUs';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

export const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div className="bg-midnight text-warmWhite min-h-screen selection:bg-builderOrange selection:text-white">
      <Navbar language={language} onLanguageChange={setLanguage} />
      <main>
        <Hero language={language} />
        <Products language={language} />
        <Material3DStudio language={language} />
        <AboutUs language={language} />
        <WhyChooseUs language={language} />
        <Services language={language} />
        <Gallery language={language} />
        <ContactForm language={language} />
      </main>
      <Footer language={language} />
      <FloatingActions />
    </div>
  );
};

export default App;
