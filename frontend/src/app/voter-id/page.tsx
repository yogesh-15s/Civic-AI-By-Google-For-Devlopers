'use client';
import { useState } from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';

type TabKey = 'new' | 'correction' | 'track';

interface TabData {
  label: string;
  emoji: string;
  title: string;
  subtitle: string;
  steps: { icon: string; title: string; desc: string; link?: string; linkText?: string }[];
  note: string;
}

const TABS: Record<TabKey, TabData> = {
  new: {
    label: 'New Registration',
    emoji: '📝',
    title: 'Register as a New Voter',
    subtitle: "Apply for your Voter ID (EPIC card) for the first time",
    steps: [
      { icon: '✅', title: 'Check Eligibility', desc: 'You must be: (a) Citizen of India, (b) Age 18 or above, (c) Ordinarily resident of the area. NRIs with Indian passport can also register.' },
      { icon: '📂', title: 'Gather Documents', desc: 'Keep ready: Proof of Age (Aadhaar / Birth Certificate / Class 10 Marksheet), Proof of Residence (Aadhaar / Utility Bill / Bank Passbook), 2 passport-size photographs.' },
      { icon: '🌐', title: 'Visit the NVSP Portal', desc: 'Go to voter.eci.gov.in or nvsp.in and click on "New Voter Registration". You can also download the Voter Helpline App.', link: 'https://voter.eci.gov.in', linkText: 'Open voter.eci.gov.in' },
      { icon: '📋', title: 'Fill Form 6', desc: 'Fill Form 6 (English/Hindi). Enter your personal details, address, and constituency. Upload scanned copies of your documents.' },
      { icon: '📤', title: 'Submit the Form', desc: 'Submit online. You will receive a reference number. You can also submit Form 6 offline at your local ERO (Electoral Registration Officer) office.' },
      { icon: '🔍', title: 'BLO Verification', desc: 'A Booth Level Officer (BLO) will visit your residence to verify details. Be available at home or coordinate with them.' },
      { icon: '🎉', title: 'Receive Your Voter ID', desc: 'After verification (usually 30–45 days), your name is added to the electoral roll and you receive your EPIC card by post or can download the e-EPIC from the portal.' },
    ],
    note: 'The entire process is free of cost. No agent or middleman is required.'
  },
  correction: {
    label: 'Correction / Update',
    emoji: '✏️',
    title: 'Correct or Update Your Voter ID',
    subtitle: 'Fix errors in name, address, photo, or other details',
    steps: [
      { icon: '🔍', title: 'Identify the Error', desc: 'Common corrections: Name spelling mistake, Wrong date of birth, Outdated address, Photo mismatch, Relative\'s name error.' },
      { icon: '📋', title: 'Choose the Right Form', desc: 'Form 8: For correction in entries (name, DOB, address, photo)\nForm 8A: For transposition (moving your entry within the same constituency)\nForm 8B: For enrollment of overseas electors' },
      { icon: '🌐', title: 'Apply Online', desc: 'Login to voter.eci.gov.in → My Profile → Click Edit. Fill in the corrected details and upload supporting documents.', link: 'https://voter.eci.gov.in', linkText: 'Go to Portal' },
      { icon: '📎', title: 'Attach Documents', desc: 'For address change: Utility bill, bank statement, or Aadhaar with new address.\nFor name/DOB: Aadhaar, PAN, or birth certificate.\nFor photo: Recent passport-size photograph.' },
      { icon: '📬', title: 'Track Your Application', desc: 'Note the reference number. Use the Track Application Status option on the portal or call 1950.' },
      { icon: '✅', title: 'Correction Applied', desc: 'Changes are typically processed within 30 days. Download your updated e-EPIC or collect the new physical card.' },
    ],
    note: 'Always keep photocopies of submitted documents. Corrections are completely free.'
  },
  track: {
    label: 'Track Status',
    emoji: '🔎',
    title: 'Track Your Application Status',
    subtitle: 'Monitor the progress of your Voter ID application',
    steps: [
      { icon: '🌐', title: 'Go to the ECI Portal', desc: 'Visit voter.eci.gov.in or use the Voter Helpline App on your smartphone.', link: 'https://voter.eci.gov.in', linkText: 'Visit Portal' },
      { icon: '🔢', title: 'Enter Reference Number', desc: 'Use the reference number provided when you submitted your form. It is a unique alphanumeric code (e.g., SW-MHMBM-XXXXXX).' },
      { icon: '📊', title: 'View Application Status', desc: 'Possible statuses:\n🟡 Submitted – Application received\n🔵 Under Process – BLO verification in progress\n🟢 Approved – Added to electoral roll\n🔴 Rejected – Check reason and re-apply' },
      { icon: '📞', title: 'Call 1950 (Helpline)', desc: 'For real-time status, call the ECI Voter Helpline 1950 (toll-free). Available in multiple languages.' },
      { icon: '📱', title: 'Check Electoral Roll', desc: 'Once approved, search for your name in the electoral roll at electoralsearch.eci.gov.in using your name, state, and district.', link: 'https://electoralsearch.eci.gov.in', linkText: 'Search Electoral Roll' },
      { icon: '⬇️', title: 'Download e-EPIC', desc: 'After verification, log in to voter.eci.gov.in → My Profile → Download e-EPIC as a PDF. Carry it on your phone on election day!' },
    ],
    note: 'New registrations typically take 30–45 days. Track your status regularly.'
  }
};

export default function VoterIdPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('new');
  const tab = TABS[activeTab];

  return (
    <div style={{ minHeight: '100vh', paddingTop: '94px', padding: '110px 24px 60px' }}>
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: '12px' }}>
            Voter ID <span className="gradient-text">Help Center</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '550px', margin: '0 auto' }}>
            Step-by-step guidance for registration, corrections, and tracking.
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px', padding: '6px',
          marginBottom: '32px', gap: '4px'
        }}>
          {(Object.keys(TABS) as TabKey[]).map(key => (
            <button
              key={key}
              id={`voter-tab-${key}`}
              onClick={() => setActiveTab(key)}
              style={{
                flex: 1, padding: '12px 16px', border: 'none', cursor: 'pointer',
                borderRadius: '12px', fontWeight: 600, fontSize: '14px',
                fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease',
                background: activeTab === key ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'transparent',
                color: activeTab === key ? 'white' : 'var(--text-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
              }}
            >
              <span>{TABS[key].emoji}</span>
              <span>{TABS[key].label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="card" style={{ padding: '36px', marginBottom: '24px' }}>
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>
              {tab.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{tab.subtitle}</p>
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {tab.steps.map((step, i) => (
              <div key={i} style={{
                display: 'flex', gap: '16px', padding: '20px',
                background: 'var(--bg-secondary)', borderRadius: '14px',
                border: '1px solid var(--border-color)'
              }}>
                {/* Step number + icon */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
                    border: '1px solid rgba(59,130,246,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    {step.icon}
                  </div>
                  {i < tab.steps.length - 1 && (
                    <div style={{ width: '2px', flex: 1, background: 'var(--border-color)', minHeight: '20px' }} />
                  )}
                </div>

                <div style={{ flex: 1, paddingBottom: i < tab.steps.length - 1 ? '8px' : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{
                      background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      fontSize: '11px', fontWeight: 700
                    }}>
                      STEP {i + 1}
                    </span>
                    <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{step.title}</h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                    {step.desc}
                  </p>
                  {step.link && (
                    <a
                      href={step.link} target="_blank" rel="noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        color: '#3b82f6', fontSize: '13px', fontWeight: 600,
                        textDecoration: 'none', marginTop: '10px',
                        padding: '6px 14px', background: 'rgba(59,130,246,0.1)',
                        border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px'
                      }}
                    >
                      {step.linkText} <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div style={{
            marginTop: '24px', background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '12px', padding: '16px 20px',
            display: 'flex', gap: '10px', alignItems: 'flex-start'
          }}>
            <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '1px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
              <strong style={{ color: '#10b981' }}>Note: </strong>{tab.note}
            </p>
          </div>
        </div>

        {/* Quick links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr))', gap: '16px' }}>
          {[
            { icon: '🌐', title: 'ECI Voter Portal', desc: 'Register, correct, track, download e-EPIC', link: 'https://voter.eci.gov.in', label: 'voter.eci.gov.in' },
            { icon: '📋', title: 'NVSP Portal', desc: 'National Voters\' Service Portal', link: 'https://nvsp.in', label: 'nvsp.in' },
            { icon: '🔍', title: 'Electoral Search', desc: 'Search your name in the electoral roll', link: 'https://electoralsearch.eci.gov.in', label: 'electoralsearch.eci.gov.in' },
          ].map(({ icon, title, desc, link, label }) => (
            <a key={title} href={link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: '20px', cursor: 'pointer' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '10px' }}>{desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3b82f6', fontSize: '12px', fontWeight: 600 }}>
                  {label} <ExternalLink size={11} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
