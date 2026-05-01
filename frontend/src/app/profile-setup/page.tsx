'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, MapPin, CheckCircle, ChevronRight, ChevronLeft, Calendar } from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Chandigarh','Puducherry','Jammu & Kashmir','Ladakh'
];

const steps = ['Personal Info', 'Location', 'Voter Status', 'Review'];

export default function ProfileSetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    age: '',
    state: '',
    city: '',
    firstTimeVoter: '' as 'yes' | 'no' | '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('civicai-user');
    if (stored) {
      const user = JSON.parse(stored);
      setProfile(prev => ({
        ...prev,
        age: user.age || '',
        state: user.state || '',
        city: user.city || '',
        firstTimeVoter: user.firstTimeVoter || '',
      }));
      if (user.age && user.state && user.city && user.firstTimeVoter) {
        setStep(3); // Go to review step directly
      }
    }
  }, []);

  const update = (field: keyof typeof profile, value: string) =>
    setProfile(prev => ({ ...prev, [field]: value }));

  const canNext = () => {
    if (step === 0) return profile.age !== '' && parseInt(profile.age) >= 18;
    if (step === 1) return profile.state !== '' && profile.city.trim() !== '';
    if (step === 2) return profile.firstTimeVoter !== '';
    return true;
  };

  const handleSave = async () => {
    setSaving(true);
    const stored = localStorage.getItem('civicai-user');
    const user = stored ? JSON.parse(stored) : {};
    localStorage.setItem('civicai-user', JSON.stringify({ ...user, ...profile }));
    await new Promise(r => setTimeout(r, 1000));
    router.push('/dashboard');
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '80px 24px 40px',
      background: `radial-gradient(ellipse at 25% 30%, rgba(59,130,246,0.12) 0%, transparent 55%),
                   radial-gradient(ellipse at 75% 70%, rgba(139,92,246,0.12) 0%, transparent 55%),
                   var(--bg-primary)`
    }}>
      <div style={{ width: '100%', maxWidth: '520px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>
            Set Up Your <span className="gradient-text">Profile</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Help us personalize your election experience
          </p>
        </div>

        {/* Step indicators */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '13px', transition: 'all 0.3s',
                background: i < step ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)'
                          : i === step ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)'
                          : 'var(--bg-card)',
                color: i <= step ? 'white' : 'var(--text-muted)',
                border: i > step ? '2px solid var(--border-color)' : 'none',
              }}>
                {i < step ? <CheckCircle size={16} /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`step-connector ${i < step ? 'active' : ''}`} />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          {steps.map((s, i) => (
            <span key={s} style={{
              fontSize: '11px', fontWeight: 500,
              color: i === step ? 'var(--accent-primary)' : 'var(--text-muted)',
              textAlign: 'center', flex: 1
            }}>{s}</span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="progress-bar" style={{ marginBottom: '32px' }}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Card */}
        <div className="card" style={{ padding: '36px' }}>
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ width:'44px',height:'44px',borderRadius:'12px',background:'rgba(59,130,246,0.1)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                  <User size={22} color="#3b82f6" />
                </div>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Personal Information</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Let&apos;s start with the basics</p>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                  <Calendar size={13} style={{ display: 'inline', marginRight: '6px' }} />
                  Your Age
                </label>
                <input
                  id="profile-age"
                  type="number" min="18" max="120"
                  className="input-field"
                  placeholder="Enter your age (18+)"
                  value={profile.age}
                  onChange={e => update('age', e.target.value)}
                />
                {profile.age && parseInt(profile.age) < 18 && (
                  <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>You must be at least 18 years old to vote.</p>
                )}
              </div>
            </div>
          )}

          {/* Step 1: Location */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ width:'44px',height:'44px',borderRadius:'12px',background:'rgba(139,92,246,0.1)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                  <MapPin size={22} color="#8b5cf6" />
                </div>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Your Location</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>For state-specific guidance</p>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>State / UT</label>
                <select
                  id="profile-state"
                  className="input-field"
                  value={profile.state}
                  onChange={e => update('state', e.target.value)}
                >
                  <option value="">Select your state or UT</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>City / District</label>
                <input
                  id="profile-city"
                  type="text"
                  className="input-field"
                  placeholder="e.g. Mumbai, Jaipur, Lucknow"
                  value={profile.city}
                  onChange={e => update('city', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: Voter Status */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ marginBottom: '8px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>Are you a first-time voter?</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>This helps us give you the right guidance.</p>
              </div>

              {[
                { value: 'yes', label: "Yes, I'm voting for the first time! 🎉", sub: 'Get extra guidance on registration and the process' },
                { value: 'no', label: "No, I've voted before ✅", sub: 'Get refresher tips and latest updates' }
              ].map(({ value, label, sub }) => (
                <button
                  key={value}
                  id={`voter-${value}`}
                  onClick={() => update('firstTimeVoter', value)}
                  style={{
                    background: profile.firstTimeVoter === value ? 'rgba(59,130,246,0.1)' : 'var(--bg-secondary)',
                    border: profile.firstTimeVoter === value ? '2px solid #3b82f6' : '2px solid var(--border-color)',
                    borderRadius: '14px', padding: '20px', cursor: 'pointer',
                    textAlign: 'left', transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>{label}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{sub}</div>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>Review Your Profile</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Everything look correct?</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                {[
                  { label: 'Age', value: `${profile.age} years old` },
                  { label: 'State', value: profile.state },
                  { label: 'City', value: profile.city },
                  { label: 'First-Time Voter', value: profile.firstTimeVoter === 'yes' ? 'Yes 🎉' : 'No ✅' }
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '14px 16px', background: 'var(--bg-secondary)', borderRadius: '12px'
                  }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{label}</span>
                    <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>{value}</span>
                  </div>
                ))}
              </div>

              <button
                id="profile-save"
                onClick={handleSave}
                disabled={saving}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', opacity: saving ? 0.8 : 1 }}
              >
                {saving ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width:'16px',height:'16px',border:'2px solid rgba(255,255,255,0.4)',borderTopColor:'white',borderRadius:'50%',animation:'spin 0.8s linear infinite',display:'inline-block' }} />
                    Saving…
                  </span>
                ) : (
                  <>Save & Go to Dashboard <ChevronRight size={18} /></>
                )}
              </button>
            </div>
          )}

          {/* Navigation */}
          {step < 3 && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  <ChevronLeft size={16} /> Back
                </button>
              )}
              <button
                id="profile-next"
                onClick={() => setStep(step + 1)}
                disabled={!canNext()}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', opacity: canNext() ? 1 : 0.5, cursor: canNext() ? 'pointer' : 'not-allowed' }}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
