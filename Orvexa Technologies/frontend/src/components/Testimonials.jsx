import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Orvexa completely rebuilt our mobile application and backend server structure. The app load time dropped by 50% and crash rates plummeted. They are our go-to digital engineering team.",
      author: "Sophia Vance",
      role: "CTO, FinFlow Technologies",
      avatarBg: '#7c4dff'
    },
    {
      quote: "Their SEO audit and subsequent re-coding of our SaaS frontend in Next.js was a game-changer. Our search engine impressions doubled in under 3 months. Incredibly skilled developers!",
      author: "Marcus Sterling",
      role: "VP of Growth, CoreMetric Inc.",
      avatarBg: '#00e5ff'
    },
    {
      quote: "The PPC advertising management provided by Orvexa transformed our customer acquisition funnel. We saw a 6.8x ROAS and scaled our monthly budgets profitably. High integrity and transparency.",
      author: "Elena Rostova",
      role: "Founder, Bloom & Co. E-Commerce",
      avatarBg: '#ff007f'
    }
  ];

  return (
    <section id="testimonials" className="section" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }} className="animate-on-scroll">
          <h2 style={{ marginBottom: '16px' }}>
            Loved by <span className="gradient-text">Our Clients</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', marginInline: 'auto' }}>
            Hear directly from the technology leaders and brand founders who partner with Orvexa Technologies.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}
        >
          {testimonials.map((t, index) => (
            <div 
              key={t.author}
              className="glass-panel animate-on-scroll"
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                border: '1px solid var(--glass-border)',
                position: 'relative',
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Quote Mark Decor */}
              <div 
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '32px',
                  fontSize: '4rem',
                  fontFamily: 'var(--font-heading)',
                  color: 'rgba(255, 255, 255, 0.03)',
                  lineHeight: 1,
                  pointerEvents: 'none'
                }}
              >
                ”
              </div>

              {/* Body */}
              <p style={{ 
                fontSize: '1rem', 
                color: 'var(--color-text-muted)', 
                lineHeight: 1.6,
                fontStyle: 'italic'
              }}>
                "{t.quote}"
              </p>

              {/* Author Info */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px',
                marginTop: 'auto',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                paddingTop: '20px'
              }}>
                {/* Avatar Placeholder */}
                <div 
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: t.avatarBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#fff',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  {t.author.charAt(0)}
                </div>

                {/* Details */}
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff' }}>{t.author}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
