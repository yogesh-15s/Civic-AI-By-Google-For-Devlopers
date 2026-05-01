'use client';
import { useState } from 'react';
import { GraduationCap, Briefcase, Star, ChevronDown } from 'lucide-react';

interface Candidate {
  name: string;
  party: string;
  partyShort: string;
  education: string;
  age: number;
  background: string;
  assets: string;
  criminal: string;
  color: string;
}

const CONSTITUENCIES: Record<string, Candidate[]> = {
  'Mumbai North': [
    { name: 'Arun Sharma', party: 'Independent A', partyShort: 'INA', education: 'B.Tech (IIT Bombay)', age: 52, background: 'Businessman, 3-term MLA', assets: '₹4.2 Crore', criminal: 'None', color: '#3b82f6' },
    { name: 'Priya Mehta', party: 'Independent B', partyShort: 'INB', education: 'MA (Political Science)', age: 44, background: 'Social Activist, Former Professor', assets: '₹1.8 Crore', criminal: 'None', color: '#8b5cf6' },
    { name: 'Ranjit Pawar', party: 'Independent C', partyShort: 'INC', education: 'LLB (Mumbai University)', age: 61, background: 'Lawyer, Panchayat Leader', assets: '₹6.5 Crore', criminal: '1 pending case', color: '#06b6d4' },
  ],
  'Delhi South': [
    { name: 'Sunita Gupta', party: 'Independent A', partyShort: 'INA', education: 'MBBS, MD (AIIMS)', age: 48, background: 'Doctor, Health Activist', assets: '₹2.1 Crore', criminal: 'None', color: '#3b82f6' },
    { name: 'Vikram Singh', party: 'Independent B', partyShort: 'INB', education: 'MBA (IIM Delhi)', age: 39, background: 'Entrepreneur, Startup Founder', assets: '₹3.7 Crore', criminal: 'None', color: '#8b5cf6' },
    { name: 'Harish Malhotra', party: 'Independent C', partyShort: 'INC', education: 'B.Com, CA', age: 56, background: 'Chartered Accountant, Ex-Councillor', assets: '₹5.2 Crore', criminal: 'None', color: '#06b6d4' },
  ],
  'Chennai Central': [
    { name: 'Kavitha Rajan', party: 'Independent A', partyShort: 'INA', education: 'M.Tech (Anna University)', age: 41, background: 'Engineer, RTI Activist', assets: '₹1.4 Crore', criminal: 'None', color: '#3b82f6' },
    { name: 'Murugan Selvan', party: 'Independent B', partyShort: 'INB', education: 'BA, MA (History)', age: 55, background: 'Teacher, Gram Panchayat President', assets: '₹0.8 Crore', criminal: 'None', color: '#8b5cf6' },
    { name: 'Deepa Chandrasekaran', party: 'Independent C', partyShort: 'INC', education: 'LLM (National Law School)', age: 46, background: 'Advocate, Women Rights Lawyer', assets: '₹2.9 Crore', criminal: 'None', color: '#06b6d4' },
  ],
  'Bengaluru South': [
    { name: 'Rajesh Nair', party: 'Independent A', partyShort: 'INA', education: 'B.E (Computer Science)', age: 37, background: 'IT Professional, Youth Leader', assets: '₹2.3 Crore', criminal: 'None', color: '#3b82f6' },
    { name: 'Anitha Srinivas', party: 'Independent B', partyShort: 'INB', education: 'PhD (Agriculture)', age: 49, background: 'Agricultural Scientist, Farmer Leader', assets: '₹1.1 Crore', criminal: 'None', color: '#8b5cf6' },
    { name: 'Suresh Gowda', party: 'Independent C', partyShort: 'INC', education: 'MCA, MBA', age: 53, background: 'Businessman, Ex-Mayor', assets: '₹8.1 Crore', criminal: '2 pending cases', color: '#06b6d4' },
  ],
};

const INFO_DISCLAIMER = '⚠️ This is mock/sample data for educational purposes only. No real candidates or parties are represented. All information is fictional and does not reflect any actual political entity.';

export default function CandidatesPage() {
  const [selected, setSelected] = useState('');
  const [compareMode, setCompareMode] = useState(false);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const candidates = selected ? CONSTITUENCIES[selected] : [];

  return (
    <div style={{ minHeight: '100vh', paddingTop: '94px', padding: '110px 24px 60px' }}>
      <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: '12px' }}>
            Candidate <span className="gradient-text">Comparison</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Compare candidates objectively by education, background, and declared assets.
          </p>

          {/* Disclaimer */}
          <div style={{
            display: 'inline-block', marginTop: '20px',
            background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: '12px', padding: '12px 20px', fontSize: '13px',
            color: '#f59e0b', maxWidth: '700px', lineHeight: 1.6
          }}>
            {INFO_DISCLAIMER}
          </div>
        </div>

        {/* Constituency selector */}
        <div className="card" style={{ padding: '28px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Select Constituency
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  id="constituency-select"
                  className="input-field"
                  style={{ width: '280px', appearance: 'none', paddingRight: '36px', cursor: 'pointer' }}
                  value={selected}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setSelected(e.target.value); setHighlighted(null); }}
                >
                  <option value="">— Choose a Constituency —</option>
                  {Object.keys(CONSTITUENCIES).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
              </div>
            </div>

            {selected && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>View:</span>
                <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: '10px', padding: '3px' }}>
                  {['Cards', 'Table'].map(v => (
                    <button key={v} onClick={() => setCompareMode(v === 'Table')} style={{
                      padding: '7px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                      fontWeight: 600, fontSize: '13px', fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.2s',
                      background: (v === 'Table') === compareMode ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)' : 'transparent',
                      color: (v === 'Table') === compareMode ? 'white' : 'var(--text-secondary)'
                    }}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* No selection state */}
        {!selected && (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🗺️</div>
            <p style={{ fontSize: '18px', fontWeight: 600 }}>Select a constituency to view candidates</p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>Compare by education, background, and assets</p>
          </div>
        )}

        {/* Cards view */}
        {selected && !compareMode && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {candidates.map(c => (
              <div
                key={c.name}
                className="card"
                style={{
                  padding: '28px', cursor: 'pointer',
                  borderColor: highlighted === c.name ? c.color : undefined,
                  boxShadow: highlighted === c.name ? `0 0 30px ${c.color}25` : undefined
                }}
                onClick={() => setHighlighted(highlighted === c.name ? null : c.name)}
              >
                {/* Avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: `linear-gradient(135deg, ${c.color}, ${c.color}88)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px', fontWeight: 700, color: 'white'
                  }}>
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{c.name}</h3>
                    <span className="badge" style={{ background: `${c.color}20`, color: c.color, border: `1px solid ${c.color}40`, fontSize: '11px' }}>
                      {c.partyShort}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { icon: <GraduationCap size={14} />, label: 'Education', value: c.education },
                    { icon: <Briefcase size={14} />, label: 'Background', value: c.background },
                    { icon: <Star size={14} />, label: 'Age', value: `${c.age} years` },
                    { icon: null, label: 'Declared Assets', value: c.assets },
                    { icon: null, label: 'Criminal Record', value: c.criminal, danger: c.criminal !== 'None' },
                  ].map(({ icon, label, value, danger }) => (
                    <div key={label} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <div style={{ minWidth: '110px', color: 'var(--text-muted)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', paddingTop: '2px' }}>
                        {icon}{label}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: danger ? '#ef4444' : 'var(--text-primary)', flex: 1 }}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table view */}
        {selected && compareMode && (
          <div className="card" style={{ overflow: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Age</th>
                  <th>Education</th>
                  <th>Background</th>
                  <th>Assets</th>
                  <th>Criminal Record</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(c => (
                  <tr key={c.name}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg, ${c.color}, ${c.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '14px' }}>
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '14px' }}>{c.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.partyShort}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '14px' }}>{c.age} yrs</td>
                    <td style={{ fontSize: '13px', maxWidth: '200px' }}>{c.education}</td>
                    <td style={{ fontSize: '13px', maxWidth: '220px' }}>{c.background}</td>
                    <td style={{ fontSize: '14px', fontWeight: 600 }}>{c.assets}</td>
                    <td>
                      <span style={{
                        padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
                        background: c.criminal === 'None' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                        color: c.criminal === 'None' ? '#10b981' : '#ef4444',
                        border: `1px solid ${c.criminal === 'None' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`
                      }}>
                        {c.criminal}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
