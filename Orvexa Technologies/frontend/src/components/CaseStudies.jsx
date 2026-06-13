import React from 'react';

export default function CaseStudies() {
  const cases = [
    {
      title: 'Global Fintech Mobile App',
      service: 'Mobile App Development',
      description: 'Engineered a highly secure, offline-first mobile banking wallet that supports instant local transfers and cross-currency exchanges.',
      metrics: [
        { label: 'User Rating', value: '4.9 ★' },
        { label: 'Active Users', value: '+140%' }
      ],
      tags: ['React Native', 'Node.js', 'Biometrics API', 'WebSockets']
    },
    {
      title: 'Enterprise SaaS Dashboard',
      service: 'Website Development & SEO',
      description: 'Re-platformed a legacy analytics portal into a server-rendered system. Scaled organic search rankings through technical audits.',
      metrics: [
        { label: 'LCP Speed', value: '0.8s' },
        { label: 'Organic Visits', value: '+230%' }
      ],
      tags: ['Next.js', 'PostgreSQL', 'Tailwind', 'Schema Markup']
    },
    {
      title: 'E-Commerce Scaling Engine',
      service: 'Paid Ads & SMS Marketing',
      description: 'Orchestrated dynamic retargeting campaigns on Meta and Google Search paired with automated post-purchase SMS sequences.',
      metrics: [
        { label: 'Avg ROAS', value: '6.8x' },
        { label: 'Repeat Sales', value: '+85%' }
      ],
      tags: ['Meta Ads', 'Klaviyo', 'Copywriting', 'A/B Testing']
    }
  ];

  return (
    <section id="case-studies" className="section">
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }} className="animate-on-scroll">
          <h2 style={{ marginBottom: '16px' }}>
            Driving Results <span className="gradient-text">That Matter</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', marginInline: 'auto' }}>
            A glimpse into digital products and growth campaigns we have launched, along with their business performance metrics.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}>
          {cases.map((project, index) => (
            <div 
              key={project.title}
              className="glass-panel animate-on-scroll"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.2fr',
                gap: '32px',
                padding: '40px',
                alignItems: 'center',
                border: '1px solid var(--glass-border)',
                transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal)',
                animationDelay: `${index * 150}ms`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(124, 77, 255, 0.25)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(124, 77, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Left Column: Context */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <span style={{ 
                  fontSize: '0.85rem', 
                  fontWeight: 700, 
                  color: 'var(--color-accent-cyan)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em' 
                }}>
                  {project.service}
                </span>
                
                <h3 style={{ fontSize: '1.8rem', fontWeight: 700 }}>
                  {project.title}
                </h3>
                
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                  {project.tags.map(tag => (
                    <span 
                      key={tag}
                      style={{
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '4px',
                        color: 'var(--color-text)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: High-Impact Metrics */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '24px', 
                backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                padding: '32px', 
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.03)',
                textAlign: 'center'
              }} className="case-metrics">
                {project.metrics.map(metric => (
                  <div key={metric.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ 
                      fontSize: 'clamp(2rem, 1.8rem + 1vw, 3.2rem)', 
                      fontWeight: 800, 
                      fontFamily: 'var(--font-heading)',
                      background: 'linear-gradient(135deg, #fff, var(--color-accent-hover))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      {metric.value}
                    </div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: 'var(--color-text-muted)', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.05em' 
                    }}>
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
      
      <style>{`
        @media (max-width: 768px) {
          #case-studies div.glass-panel {
            grid-template-columns: 1fr !important;
            padding: 24px !important;
          }
          .case-metrics {
            padding: 20px !important;
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
