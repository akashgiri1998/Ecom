import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={{
        backgroundColor: '#05030b',
        borderTop: '1px solid var(--glass-border)',
        paddingBlock: '64px 32px'
      }}
    >
      <div className="container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr',
            gap: '48px',
            marginBottom: '48px'
          }}
          className="footer-grid"
        >
          {/* Brand Col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a 
              href="#" 
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontWeight: 800, 
                fontSize: '1.4rem', 
                letterSpacing: '-0.03em', 
                display: 'flex', 
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span 
                style={{ 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '6px', 
                  background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-cyan))',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: '#fff'
                }}
              >
                O
              </span>
              <span className="gradient-text">Orvexa Technologies</span>
            </a>
            
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '300px' }}>
              Boutique app development and search marketing agency. Building high-performing software systems for modern brands.
            </p>

            <a 
              href="mailto:orvexatechnologies@gmail.com" 
              style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--color-accent-hover)' }}
            >
              orvexatechnologies@gmail.com
            </a>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fff' }}>Company</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <a href="#services" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', transition: 'color var(--transition-normal)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}>
                  Services
                </a>
              </li>
              <li>
                <a href="#case-studies" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', transition: 'color var(--transition-normal)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}>
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#testimonials" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', transition: 'color var(--transition-normal)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}>
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Social connections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fff' }}>Social</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', transition: 'color var(--transition-normal)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', transition: 'color var(--transition-normal)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', transition: 'color var(--transition-normal)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}>
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower footer */}
        <div 
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
          className="footer-lower"
        >
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            © {currentYear} Orvexa Technologies. All Rights Reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', transition: 'color var(--transition-normal)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}>Privacy Policy</a>
            <a href="#" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', transition: 'color var(--transition-normal)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}>Terms of Service</a>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .footer-lower {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
