import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  useEffect(() => {
    // Progressive enhancement: Fallback for browsers that do not support native CSS scroll-driven timelines
    if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');

      const observerOptions = {
        root: null, // use viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of element is visible
      };

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve once triggered to make it permanent and smooth
            obs.unobserve(entry.target);
          }
        });
      }, observerOptions);

      animatedElements.forEach(el => observer.observe(el));

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <CaseStudies />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
