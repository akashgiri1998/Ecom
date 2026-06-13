import React from 'react';
import heroBackdrop from '../assets/hero_backdrop.png';

export default function Hero() {
  return (
    <section 
      id="hero" 
      style={{
        paddingTop: 'clamp(8rem, 6rem + 10vh, 12rem)',
        paddingBottom: 'clamp(4rem, 2rem + 6vh, 8rem)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Decorative Orbs */}
      <div className="glow-orb glow-orb-primary" />
      <div className="glow-orb glow-orb-secondary" style={{ right: '5%', bottom: '5%' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '48px',
          alignItems: 'center'
        }} className="hero-grid">
          
          {/* Text Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                backgroundColor: 'rgba(124, 77, 255, 0.1)',
                border: '1px solid rgba(124, 77, 255, 0.2)',
                borderRadius: '9999px',
                width: 'fit-content',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--color-accent-hover)',
                letterSpacing: '0.02em'
              }}
            >
              🚀 Modern Digital Agency
            </div>

            <h1 style={{ letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              We Scale Brands With{' '}
              <span className="gradient-text">Digital Products & Marketing</span>
            </h1>

            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '540px' }}>
              Orvexa Technologies builds premium mobile apps, custom website systems, and high-performance SEO marketing funnels for ambitious brands worldwide.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
              <a href="#contact" className="btn btn-primary" id="hero-cta-contact">
                Start Your Project
              </a>
              <a href="#services" className="btn btn-secondary" id="hero-cta-services">
                Explore Services
              </a>
            </div>

            {/* Quick Metrics */}
            <div style={{ 
              display: 'flex', 
              gap: '40px', 
              marginTop: '32px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '24px'
            }}>
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '2px' }}>99%</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client Retention</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '2px' }}>10x</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Average Traffic ROI</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '2px' }}>24/7</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dedicated Support</p>
              </div>
            </div>
          </div>

          {/* Graphics Column */}
          <div 
            style={{ 
              position: 'relative', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}
            className="hero-graphic-container"
          >
            <div 
              className="glass-panel"
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                maxWidth: '480px',
                aspectRatio: '1/1',
                transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                transition: 'transform var(--transition-slow)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
              }}
            >
              <img 
                src={heroBackdrop} 
                alt="Orvexa futuristic digital mesh and glowing node connection illustration representing app development" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)'
                }}
              />
              
              {/* Floating Stat Overlay */}
              <div 
                className="glass-panel"
                style={{
                  position: 'absolute',
                  bottom: '32px',
                  left: '32px',
                  padding: '12px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(7, 5, 15, 0.7)'
                }}
              >
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#00e676', boxShadow: '0 0 10px #00e676' }}></div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Active Projects: Running Smoothly</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
            text-align: center;
          }
          .hero-grid p {
            margin-inline: auto;
          }
          .hero-grid div {
            align-items: center;
            justify-content: center;
          }
          .hero-grid > div:first-child {
            align-items: center !important;
          }
          .hero-graphic-container {
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
