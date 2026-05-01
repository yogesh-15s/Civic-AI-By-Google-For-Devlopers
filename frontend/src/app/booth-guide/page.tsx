'use client';
import { useState } from 'react';
import { MapPin, Search, Navigation, Clock, Info, ChevronRight, Phone } from 'lucide-react';

const STEPS_TO_FIND = [
  { num: 1, title: 'Visit the ECI Voter Portal', desc: 'Go to voter.eci.gov.in or use the Voter Helpline App (available on Android & iOS).', icon: '🌐' },
  { num: 2, title: "Search by Voter ID or Name", desc: "Enter your EPIC number or search by name, state, and district to find your entry in the electoral roll.", icon: '🔍' },
  { num: 3, title: 'Get Your Part Number & Serial', desc: 'Your voter information page will show your Assembly Constituency, Part Number, and Serial Number.', icon: '📋' },
  { num: 4, title: 'Find the Booth Address', desc: 'The Part Number corresponds to your polling booth. The address is listed in the voter details.', icon: '📍' },
  { num: 5, title: 'Collect Your Voter Slip', desc: 'Before elections, BLOs (Booth Level Officers) distribute voter slips at your home with booth details.', icon: '📄' },
  { num: 6, title: 'Arrive on Election Day', desc: 'Carry your Voter ID / Aadhaar. Follow the queue. The booth will have clear signage for your serial range.', icon: '🗳️' },
];

const TIPS = [
  { icon: '⏰', title: 'Booth Timing', desc: 'Most booths open 7:00 AM – 6:00 PM. Check official notification for your area.' },
  { icon: '📱', title: 'Voter Helpline', desc: 'Call 1950 (toll-free) for instant assistance finding your booth.' },
  { icon: '♿', title: 'Accessibility', desc: 'PwD voters get priority access. Wheelchairs and ramps are mandated at all booths.' },
  { icon: '🚫', title: 'Restricted Zone', desc: 'Campaigning is prohibited within 100 meters of polling booths on election day.' },
];

export default function BoothGuidePage() {
  const [location, setLocation] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) setSearched(true);
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '94px', padding: '110px 24px 60px' }}>
      <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: '12px' }}>
            Polling Booth <span className="gradient-text">Finder</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Find your nearest polling booth and everything you need to vote.
          </p>
        </div>

        {/* Search input */}
        <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
          <form onSubmit={handleSearch}>
            <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '12px' }}>
              <MapPin size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Enter your area, PIN code, or constituency
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  id="booth-location-input"
                  type="text"
                  className="input-field"
                  style={{ paddingLeft: '44px' }}
                  placeholder="e.g. Andheri West, 400058, or Mumbai North"
                  value={location}
                  onChange={e => { setLocation(e.target.value); setSearched(false); }}
                />
              </div>
              <button id="booth-search-btn" type="submit" className="btn-primary" style={{ flexShrink: 0 }}>
                <Search size={16} /> Find Booth
              </button>
            </div>
          </form>

          {/* Quick link */}
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Quick links:</span>
            {[
              { label: 'voter.eci.gov.in', href: 'https://voter.eci.gov.in' },
              { label: 'nvsp.in', href: 'https://nvsp.in' },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                color: '#3b82f6', fontSize: '13px', fontWeight: 600,
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px'
              }}>
                {label} <ChevronRight size={12} />
              </a>
            ))}
          </div>
        </div>

        {/* Map placeholder / result */}
        {searched && (
          <div className="card" style={{ padding: '28px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Navigation size={20} color="#3b82f6" />
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700 }}>Booths near: {location}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Showing map view — Please use official ECI portal for exact booth address</p>
              </div>
            </div>

            {/* Map placeholder */}
            <div style={{
              width: '100%', height: '280px', borderRadius: '16px', overflow: 'hidden',
              background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '16px', position: 'relative'
            }}>
              {/* Fake map grid */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `
                  linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }} />
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                borderRadius: '50%', width: '48px', height: '48px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1, boxShadow: '0 0 30px rgba(59,130,246,0.5)'
              }}>
                <MapPin size={24} color="white" />
              </div>
              <div style={{ textAlign: 'center', zIndex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>Polling Booth Found!</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                  For the actual map, visit <strong>voter.eci.gov.in</strong> and search with your Voter ID
                </p>
              </div>
            </div>

            {/* Mock booth info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '12px', marginTop: '16px' }}>
              {[
                { label: 'Booth No.', value: 'Part #' + Math.floor(Math.random()*200 + 1) },
                { label: 'Distance', value: '~1.2 km away' },
                { label: 'Opens', value: '7:00 AM' },
                { label: 'Closes', value: '6:00 PM' },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '14px 16px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 600, marginBottom: '4px' }}>{label}</div>
                  <div style={{ fontWeight: 700, fontSize: '15px' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How to find booth steps */}
        <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>
            How to Find Your Polling Booth
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {STEPS_TO_FIND.map((step) => (
              <div key={step.num} style={{
                display: 'flex', gap: '16px', alignItems: 'flex-start',
                padding: '16px', borderRadius: '14px',
                background: 'var(--bg-secondary)', border: '1px solid var(--border-color)'
              }}>
                <div style={{ fontSize: '24px', flexShrink: 0 }}>{step.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{
                      width: '22px', height: '22px', borderRadius: '50%',
                      background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
                      color: 'white', fontSize: '11px', fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>{step.num}</span>
                    <h3 style={{ fontWeight: 700, fontSize: '15px' }}>{step.title}</h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, paddingLeft: '32px' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips grid */}
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Important Tips</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '16px', marginBottom: '32px' }}>
          {TIPS.map(({ icon, title, desc }) => (
            <div key={title} className="card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{icon}</div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Helpline */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.12))',
          border: '1px solid rgba(59,130,246,0.25)',
          borderRadius: '20px', padding: '28px',
          display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap'
        }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <Phone size={24} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>Need Help? Call 1950</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              ECI Voter Helpline is available 24/7 during elections. Toll-free for all networks.
            </p>
          </div>
          <a href="tel:1950" className="btn-primary" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <Phone size={16} /> Call 1950
          </a>
        </div>
      </div>
    </div>
  );
}
