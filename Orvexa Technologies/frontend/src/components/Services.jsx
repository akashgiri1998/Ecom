import React from 'react';

export default function Services() {
  const services = [
    {
      title: 'Mobile App Development',
      description: 'Crafting high-performance iOS and Android applications utilizing React Native, Flutter, or native Swift and Kotlin.',
      features: ['Cross-platform efficiency', 'Store publishing & ASO', 'Offline support & synchronization', 'Push notification pipelines'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      )
    },
    {
      title: 'Website Development',
      description: 'Building modern, SEO-optimized, super-fast React and Next.js websites. Custom web apps with Node backends.',
      features: ['Headless CMS integration', 'Tailwind or CSS system design', 'Core Web Vitals optimization', 'Interactive user dashboards'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      title: 'Search Engine Optimization (SEO)',
      description: 'Acquiring organic traffic that converts. Keyword targeting, technical audits, speed enhancements, and backlink strategies.',
      features: ['Comprehensive keyword research', 'Technical speed optimization', 'On-page content strategies', 'Competitor gap analysis'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      )
    },
    {
      title: 'Paid Ads Management (PPC)',
      description: 'Deploying ROI-driven campaigns on Google Search, Meta (Facebook/Instagram), TikTok, and LinkedIn.',
      features: ['Audience demographic mapping', 'High-CTR ad creative stubs', 'Retargeting setup & analytics', 'Weekly budget reviews'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      )
    },
    {
      title: 'Email & SMS Marketing',
      description: 'Developing automated customer journeys and retention campaigns that drive continuous repeat purchases.',
      features: ['Abandoned cart workflows', 'Newsletter calendar layout', 'List segmentation systems', 'A/B subject line tests'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="section" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }} className="animate-on-scroll">
          <h2 style={{ marginBottom: '16px' }}>
            Services We <span className="gradient-text">Excel At</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', marginInline: 'auto' }}>
            From high-end software development to visibility campaigns, we deploy comprehensive strategies to help digital businesses thrive.
          </p>
        </div>

        {/* Services Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}
        >
          {services.map((service, index) => (
            <div 
              key={service.title} 
              className="glass-panel animate-on-scroll"
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform var(--transition-normal), border-color var(--transition-normal)',
                animationDelay: `${index * 100}ms`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(124, 77, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--glass-border)';
              }}
            >
              {/* Icon container */}
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(124, 77, 255, 0.1)',
                  color: 'var(--color-accent-hover)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 0 10px rgba(124, 77, 255, 0.1)'
                }}
              >
                {service.icon}
              </div>

              {/* Text */}
              <div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', fontWeight: 600 }}>{service.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  {service.description}
                </p>
              </div>

              {/* Features List */}
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '20px' }}>
                {service.features.map((feature) => (
                  <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--color-accent-cyan)', fontWeight: 'bold' }}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
