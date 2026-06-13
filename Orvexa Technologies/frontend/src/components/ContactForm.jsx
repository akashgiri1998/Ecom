import React, { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  
  const [status, setStatus] = useState({ type: null, message: '' });
  const [submitting, setSubmitting] = useState(false);

  const availableServices = [
    'Mobile Apps',
    'Web Development',
    'SEO Optimization',
    'Paid Ads (PPC)',
    'Email Marketing'
  ];

  const handleServiceToggle = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          services: selectedServices,
          message
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ type: 'success', message: data.message });
        setName('');
        setEmail('');
        setMessage('');
        setSelectedServices([]);
      } else {
        setStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Could not connect to the server. Please check your network connection.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative' }}>
      <div className="glow-orb glow-orb-primary" style={{ top: '20%', right: '10%' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '64px',
            alignItems: 'start'
          }}
          className="contact-grid"
        >
          {/* Left Column: Context info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} className="animate-on-scroll">
            <div>
              <span style={{ 
                fontSize: '0.85rem', 
                fontWeight: 700, 
                color: 'var(--color-accent-cyan)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em' 
              }}>
                Get In Touch
              </span>
              <h2 style={{ marginTop: '8px', marginBottom: '16px' }}>
                Let's Build Something <span className="gradient-text">Great Together</span>
              </h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Have an idea for a mobile application, website rebuild, or looking to scale your organic search results? Send us a message and our digital strategists will get back to you within 24 hours.
              </p>
            </div>

            {/* Direct Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-accent-hover)'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Email Us</div>
                  <a href="mailto:orvexatechnologies@gmail.com" style={{ fontSize: '1rem', fontWeight: 600, color: '#fff' }}>
                    orvexatechnologies@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-accent-hover)'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Business Hours</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff' }}>Monday – Friday, 9:00 AM – 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="glass-panel animate-on-scroll" style={{ padding: '40px' }}>
            <form onSubmit={handleSubmit} noValidate>
              
              {/* Service Selection chips */}
              <div style={{ marginBottom: '32px' }}>
                <span className="form-label" style={{ display: 'block', marginBottom: '16px' }}>
                  I'm interested in...
                </span>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {availableServices.map(service => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => handleServiceToggle(service)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          backgroundColor: isSelected ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid',
                          borderColor: isSelected ? 'var(--color-accent)' : 'var(--glass-border)',
                          color: isSelected ? '#fff' : 'var(--color-text-muted)',
                          transition: 'all var(--transition-normal)'
                        }}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input: Name */}
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">Full Name *</label>
                <input
                  type="text"
                  id="contact-name"
                  className="form-control"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Input: Email */}
              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">Email Address *</label>
                <input
                  type="email"
                  id="contact-email"
                  className="form-control"
                  placeholder="e.g. john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Input: Message */}
              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">Tell us about your project *</label>
                <textarea
                  id="contact-message"
                  className="form-control"
                  rows="4"
                  placeholder="Describe your app, website, or goals..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ resize: 'vertical' }}
                  required
                ></textarea>
              </div>

              {/* Status Display Messages */}
              {status.message && (
                <div 
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '24px',
                    fontSize: '0.95rem',
                    backgroundColor: status.type === 'success' ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 82, 82, 0.1)',
                    border: '1px solid',
                    borderColor: status.type === 'success' ? 'rgba(0, 230, 118, 0.2)' : 'rgba(255, 82, 82, 0.2)',
                    color: status.type === 'success' ? '#00e676' : '#ff5252'
                  }}
                >
                  {status.message}
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', paddingBlock: '14px' }}
                disabled={submitting}
              >
                {submitting ? 'Sending Message...' : 'Send Message'}
              </button>

            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
