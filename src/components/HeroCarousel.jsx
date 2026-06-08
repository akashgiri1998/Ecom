import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Flame, Clock } from 'lucide-react';
import './HeroCarousel.css';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 15 });

  const slides = [
    {
      id: 1,
      title: "SUMMER ESSENTIALS",
      tagline: "SASTO RAMRO WEAR",
      description: "Upgrade your style with up to 70% off our lightweight linen shirts, floral summer dresses, and premium retro accessories.",
      image: "/akarien_brand_banner.png",
      accent: "NEW ARRIVALS",
      buttonText: "EXPLORE COLLECTION"
    },
    {
      id: 2,
      title: "STREETWEAR DROPS",
      tagline: "AKARIÉN PREMIUM",
      description: "Discover oversized heavyweight hoodies, tailored commuter chinos, active jogger knits, and rugged vintage truckers.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&auto=format&fit=crop",
      accent: "TRENDING NOW",
      buttonText: "SHOP STREETWEAR"
    },
    {
      id: 3,
      title: "KIDS' PLAYTIME DROPS",
      tagline: "MADE FOR ADVENTURE",
      description: "Soft, durable, organic cotton overalls, matching striped sets, and ripstop windbreakers for all-day running around.",
      image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1600&auto=format&fit=crop",
      accent: "BACK TO SCHOOL",
      buttonText: "SHOP KIDS"
    }
  ];

  // Carousel slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Flash Sale Countdown timer
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset countdown to 6 hours
          return { hours: 5, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const formatNumber = (num) => num.toString().padStart(2, '0');

  const scrollToCatalog = () => {
    const catalog = document.getElementById("catalog-section");
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-carousel-section">
      {/* 1. Main Slider Container */}
      <div className="slider-wrapper">
        {slides.map((slide, idx) => (
          <div 
            key={slide.id} 
            className={`slide-item ${idx === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.45)), url(${slide.image})` }}
          >
            <div className="slide-overlay-content">
              <span className="slide-accent-badge">
                <Sparkles size={14} style={{ marginRight: 6 }} />
                {slide.accent}
              </span>
              <h1 className="slide-title">{slide.title}</h1>
              <h2 className="slide-tagline">{slide.tagline}</h2>
              <p className="slide-desc">{slide.description}</p>
              <button className="slide-cta-btn" onClick={scrollToCatalog}>
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}

        {/* Carousel Arrows */}
        <button className="slider-arrow arrow-left" onClick={prevSlide}>
          <ChevronLeft size={24} />
        </button>
        <button className="slider-arrow arrow-right" onClick={nextSlide}>
          <ChevronRight size={24} />
        </button>

        {/* Dots indicator */}
        <div className="slider-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`dot-indicator ${idx === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </div>

      {/* 2. Live Flash Sale Banner Panel */}
      <div className="flash-sale-banner" onClick={scrollToCatalog}>
        <div className="flash-title-area">
          <Flame className="flash-icon" size={24} />
          <span className="flash-label">LIMITED TIME FLASH SALE</span>
        </div>
        <div className="flash-offer-area">
          <span className="flash-tag">UP TO 80% OFF</span>
          <span className="flash-subtag">Hurry, prices will rise soon!</span>
        </div>
        <div className="flash-clock-area">
          <Clock size={16} style={{ marginRight: 8, color: '#fcfbfa' }} />
          <span className="ends-in">ENDS IN:</span>
          <div className="clock-digits">
            <span className="digit-box">{formatNumber(timeLeft.hours)}</span>
            <span className="clock-separator">:</span>
            <span className="digit-box">{formatNumber(timeLeft.minutes)}</span>
            <span className="clock-separator">:</span>
            <span className="digit-box">{formatNumber(timeLeft.seconds)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
