'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  MessageCircle, Play, Vote, Trophy, BookOpen, Map,
  CheckCircle, Clock, AlertCircle, ChevronRight, User, Sparkles
} from 'lucide-react';

interface UserProfile {
  name?: string;
  email?: string;
  age?: string;
  state?: string;
  city?: string;
  firstTimeVoter?: string;
}

const roadmapSteps = [
  { id: 1, title: 'Check Voter Registration', desc: 'Verify if you are already registered', done: true, doc: 'Aadhaar / PAN Card' },
  { id: 2, title: 'Collect Required Documents', desc: 'Gather your ID and address proof', done: true, doc: 'Aadhaar, Passport, or Driving License' },
  { id: 3, title: 'Fill Form 6 (New) or Form 8 (Correction)', desc: 'Submit at voter.eci.gov.in', done: false, doc: 'Form 6 / Form 8' },
  { id: 4, title: 'Receive Voter ID Card (EPIC)', desc: 'Get your Elector Photo Identity Card', done: false, doc: 'EPIC Card' },
  { id: 5, title: 'Locate Your Polling Booth', desc: 'Find your designated voting location', done: false, doc: 'Voter Slip' },
  { id: 6, title: 'Cast Your Vote on Election Day', desc: 'Visit booth with valid ID and vote!', done: false, doc: 'EPIC / Aadhaar' },
];

const quickCards = [
  { href: '/chat', icon: MessageCircle, label: 'AI Chat', sub: 'Ask anything about elections', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  { href: '/simulation', icon: Play, label: 'Voting Simulation', sub: 'Practice before you vote', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  { href: '/candidates', icon: Vote, label: 'Candidate Comparison', sub: 'Compare candidates in your area', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
  { href: '/quiz', icon: Trophy, label: 'Civic Quiz', sub: 'Test your knowledge & earn badges', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  { href: '/voter-id', icon: BookOpen, label: 'Voter ID Help', sub: 'Register or update your Voter ID', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  { href: '/booth-guide', icon: Map, label: 'Booth Guide', sub: 'Find your nearest polling booth', color: '#ec4899', bg: 'rgba(236,72,153,0.1)' },
];

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserProfile>({});
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [completedSteps] = useState(2);
  const progress = Math.round((completedSteps / roadmapSteps.length) * 100);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
      return;
    }

    if (status !== 'authenticated') {
      return;
    }

    const loadProfile = async () => {
      try {
        const res = await fetch('/api/me');
        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
        }
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [router, status]);

  const displayName = user.name || session?.user?.name || 'Voter';
  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (status === 'loading' || (status === 'authenticated' && loadingProfile)) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', paddingTop: '110px' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '110px 24px 60px' }}>
      <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto' }}>

        {/* Welcome banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.15) 100%)',
          border: '1px solid rgba(59,130,246,0.25)',
          borderRadius: '24px', padding: '36px 40px',
          marginBottom: '36px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '24px'
        }}>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '6px' }}>
              {greeting()}, 👋
            </p>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, marginBottom: '10px' }}>
              Welcome back, <span className="gradient-text">{displayName}!</span>
            </h1>
            {user.state && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span className="badge badge-blue">📍 {user.city ? `${user.city}, ` : ''}{user.state}</span>
                {user.firstTimeVoter === 'yes' && <span className="badge badge-purple">🌟 First-Time Voter</span>}
                {user.age && <span className="badge badge-green">Age: {user.age}</span>}
              </div>
            )}
            {!user.state && (
              <Link href="/profile-setup" className="badge badge-amber" style={{ textDecoration: 'none', display: 'inline-flex', gap: '6px' }}>
                <AlertCircle size={12} /> Complete your profile for personalized guidance
              </Link>
            )}
          </div>
          <div style={{
            width: '96px', height: '96px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 40px rgba(59,130,246,0.4)'
          }}>
            <User size={44} color="white" />
          </div>
        </div>

        {/* Roadmap + Quick Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: '24px', marginBottom: '24px' }}>

          {/* Election Roadmap */}
          <div className="card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>
                  Your Election Roadmap
                </h2>
                <p id="roadmap-status" style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                  {completedSteps} of {roadmapSteps.length} steps completed
                </p>
              </div>
              <span aria-hidden="true" style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '28px', fontWeight: 800,
                background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                {progress}%
              </span>
            </div>

            {/* Progress bar */}
            <div 
              className="progress-bar" 
              style={{ marginBottom: '24px' }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-labelledby="roadmap-status"
            >
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>

            {/* Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {roadmapSteps.map((step) => (
                <div key={step.id} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '14px',
                  padding: '14px', borderRadius: '12px',
                  background: step.done ? 'rgba(16,185,129,0.05)' : 'var(--bg-secondary)',
                  border: `1px solid ${step.done ? 'rgba(16,185,129,0.2)' : 'var(--border-color)'}`,
                  opacity: step.id > completedSteps + 1 ? 0.5 : 1
                }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: step.done ? '#10b981' : step.id === completedSteps + 1 ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)' : 'var(--border-color)',
                  }}>
                    {step.done ? <CheckCircle size={16} color="white" /> :
                     step.id === completedSteps + 1 ? <Clock size={14} color="white" /> :
                     <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600 }}>{step.id}</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>{step.title}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>{step.desc}</div>
                    <div className="badge badge-blue" style={{ fontSize: '11px' }}>📄 {step.doc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: AI tip + stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* AI Tip Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.12))',
              border: '1px solid rgba(59,130,246,0.25)',
              borderRadius: '18px', padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Sparkles size={20} color="#8b5cf6" />
                <span style={{ fontWeight: 700, fontSize: '16px' }}>AI Tip of the Day</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
                Did you know? You can vote without your Voter ID if you carry your Aadhaar, Passport, or Driving License. The ECI accepts 12 alternative photo IDs!
              </p>
              <Link href="/chat" style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                color: '#3b82f6', fontSize: '13px', fontWeight: 600, textDecoration: 'none'
              }}>
                Ask AI for more tips <ChevronRight size={14} />
              </Link>
            </div>

            {/* Stats */}
            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Your Progress</h3>
              {[
                { label: 'Roadmap', value: `${progress}%`, color: '#3b82f6' },
                { label: 'Quiz Score', value: '—', color: '#f59e0b' },
                { label: 'Simulations', value: '0', color: '#8b5cf6' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{label}</span>
                  <span style={{ fontWeight: 700, color, fontSize: '16px' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Next action */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              borderRadius: '16px', padding: '20px'
            }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next Step</p>
              <p style={{ fontWeight: 700, fontSize: '15px', marginBottom: '12px' }}>{roadmapSteps[completedSteps]?.title}</p>
              <Link href="/voter-id" className="btn-primary" style={{ fontSize: '13px', padding: '10px 16px' }}>
                Get Started <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick access cards */}
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Quick Access</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {quickCards.map(({ href, icon: Icon, label, sub, color, bg }) => (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: '22px', cursor: 'pointer' }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '12px',
                  background: bg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '14px',
                  border: `1px solid ${color}30`
                }}>
                  <Icon size={22} color={color} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>{label}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.5 }}>{sub}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px', color, fontSize: '12px', fontWeight: 600 }}>
                  Open <ChevronRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
