import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        paddingBlock: isScrolled ? '12px' : '24px',
        transition: 'padding var(--transition-normal), background-color var(--transition-normal), border-color var(--transition-normal)',
        backgroundColor: isScrolled ? 'rgba(7, 5, 15, 0.8)' : 'transparent',
        borderBottom: isScrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a 
          href="#" 
          style={{ 
            fontFamily: 'var(--font-heading)', 
            fontWeight: 800, 
            fontSize: '1.5rem', 
            letterSpacing: '-0.03em', 
            display: 'flex', 
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span 
            style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '8px', 
              background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-cyan))',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: '#fff'
            }}
          >
            O
          </span>
          <span className="gradient-text">Orvexa</span>
        </a>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          <ul style={{ display: 'flex', gap: '32px' }}>
            {navItems.map((item) => (
              <li key={item.label}>
                <a 
                  href={item.href} 
                  style={{ 
                    fontSize: '0.95rem', 
                    fontWeight: 500, 
                    color: 'var(--color-text-muted)',
                    transition: 'color var(--transition-normal)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <a 
            href="#contact" 
            className="btn btn-secondary" 
            style={{ 
              padding: '8px 20px', 
              minBlockSize: '36px', 
              minInlineSize: 'auto',
              fontSize: '0.9rem' 
            }}
          >
            Get In Touch
          </a>
        </nav>

        {/* Hamburger Icon */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ 
            display: 'none', 
            flexDirection: 'column', 
            gap: '6px', 
            padding: '8px',
            zIndex: 1001,
            cursor: 'pointer'
          }}
          className="hamburger-btn"
          aria-label="Toggle navigation menu"
        >
          <span style={{ width: '24px', height: '2px', backgroundColor: '#fff', transition: 'transform var(--transition-normal)', transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}></span>
          <span style={{ width: '24px', height: '2px', backgroundColor: '#fff', transition: 'opacity var(--transition-normal)', opacity: isMenuOpen ? 0 : 1 }}></span>
          <span style={{ width: '24px', height: '2px', backgroundColor: '#fff', transition: 'transform var(--transition-normal)', transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--color-bg)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '32px',
            padding: '24px'
          }}
        >
          <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            {navItems.map((item) => (
              <li key={item.label}>
                <a 
                  href={item.href} 
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontSize: '1.8rem', fontWeight: 600 }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a 
            href="#contact" 
            onClick={() => setIsMenuOpen(false)}
            className="btn btn-primary"
            style={{ width: '80%', maxWidth: '300px' }}
          >
            Get In Touch
          </a>
        </div>
      )}

      {/* Inline styles for responsive nav hiding */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
