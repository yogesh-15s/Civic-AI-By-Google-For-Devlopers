'use client';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Map, Play, CheckCircle, ChevronRight, Vote, Shield, Zap, Globe } from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: 'AI Chat Assistant',
    desc: 'Get instant answers about elections, voting rights, and procedures in Hindi or English.',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.1)',
  },
  {
    icon: Map,
    title: 'Election Roadmap',
    desc: 'Personalized step-by-step guide tailored to your state, age, and voter status.',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
  },
  {
    icon: Play,
    title: 'Voting Simulation',
    desc: 'Practice the entire voting process with our interactive EVM simulation.',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.1)',
  },
  {
    icon: Vote,
    title: 'Candidate Comparison',
    desc: 'Compare candidates objectively by education, background, and track record.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
  },
  {
    icon: Shield,
    title: 'Voter ID Help',
    desc: 'Apply for new Voter ID, request corrections, or track your application status.',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
  },
  {
    icon: Zap,
    title: 'Civic Quiz',
    desc: 'Test your knowledge and earn badges. Become a certified informed voter!',
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.1)',
  },
];

const steps = [
  { num: '01', title: 'Create your profile', desc: 'Tell us your state, age, and voter status for a personalized experience.' },
  { num: '02', title: 'Get your roadmap', desc: 'Receive a custom step-by-step guide for registering to vote in your region.' },
  { num: '03', title: 'Chat with AI', desc: 'Ask anything about elections in Hindi or English — available 24/7.' },
  { num: '04', title: 'Practice & prepare', desc: 'Use our voting simulation to feel confident before Election Day.' },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* Hero Section */}
      <section className="hero-bg" style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: '80px 24px 60px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="badge badge-blue animate-fade-up" style={{ display: 'inline-flex', marginBottom: '24px' }}>
            <Globe size={12} /> 🇮🇳 Made for Indian Citizens
          </div>

          <h1 className="animate-fade-up delay-100" style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(42px, 7vw, 80px)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '24px',
            letterSpacing: '-2px'
          }}>
            Your Personal{' '}
            <span className="gradient-text">Election Guide</span>
          </h1>

          <p className="animate-fade-up delay-200" style={{
            fontSize: 'clamp(16px, 2.5vw, 22px)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Understand, Prepare, and Vote with Confidence. Powered by AI — available in Hindi and English.
          </p>

          <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth" id="landing-get-started" className="btn-primary" style={{ fontSize: '17px', padding: '16px 32px' }}>
              Get Started Free <ArrowRight size={18} />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="animate-fade-up delay-400" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '24px', marginTop: '48px', flexWrap: 'wrap'
          }}>
            {[
              { icon: CheckCircle, text: 'Politically Neutral', color: '#10b981' },
              { icon: Shield, text: 'Privacy First', color: '#3b82f6' },
              { icon: Globe, text: 'Hindi & English', color: '#8b5cf6' },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                <Icon size={16} color={color} />
                {text}
              </div>
            ))}
          </div>

          {/* Hero visual */}
          <div className="animate-float" style={{
            marginTop: '60px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '24px',
            maxWidth: '600px',
            margin: '60px auto 0',
            boxShadow: '0 40px 80px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {['#ef4444','#f59e0b','#10b981'].map(c => (
                <div key={c} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <div className="chat-bubble-ai" style={{ fontSize: '14px' }}>
                👋 नमस्ते! मैं CivicAI हूँ। आपकी चुनाव संबंधी किसी भी प्रश्न में मदद कर सकता हूँ।
              </div>
              <div className="chat-bubble-user" style={{ fontSize: '14px' }}>
                How do I register to vote for the first time?
              </div>
              <div className="chat-bubble-ai" style={{ fontSize: '14px' }}>
                Great question! To register as a first-time voter, you need: 1) Age 18+ 2) Aadhaar card 3) Visit voter.eci.gov.in and fill Form 6. I&apos;ll guide you step by step! 🗳️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '100px 24px', background: 'var(--bg-secondary)' }}>
        <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="badge badge-purple" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              ✨ Features
            </div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, marginBottom: '16px' }}>
              Everything you need to vote{' '}
              <span className="gradient-text">confidently</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '500px', margin: '0 auto' }}>
              Six powerful tools to guide you through India&apos;s election process.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {features.map(({ icon: Icon, title, desc, color, bg }, i) => (
              <div key={title} className="card" style={{ padding: '28px', animationDelay: `${i * 0.1}s` }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: bg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '16px',
                  border: `1px solid ${color}30`
                }}>
                  <Icon size={24} color={color} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="badge badge-green" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              🔍 How It Works
            </div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800 }}>
              Ready to vote in <span className="gradient-text">4 simple steps</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {steps.map(({ num, title, desc }, i) => (
              <div key={num} className="card" style={{
                padding: '28px 32px', display: 'flex', alignItems: 'center',
                gap: '24px', animationDelay: `${i * 0.1}s`
              }}>
                <div style={{
                  minWidth: '56px', height: '56px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
                  border: '1px solid rgba(59,130,246,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Outfit, sans-serif', fontWeight: 800,
                  fontSize: '20px', color: 'var(--accent-primary)'
                }}>
                  {num}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '6px' }}>{title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>{desc}</p>
                </div>
                <ChevronRight size={20} color="var(--text-muted)" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{
          maxWidth: '700px', margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
          border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: '28px', padding: '60px 40px'
        }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, marginBottom: '16px' }}>
            Your vote matters. <span className="gradient-text">Be prepared.</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', marginBottom: '32px' }}>
            Join thousands of first-time voters who used CivicAI to vote with confidence.
          </p>
          <Link href="/auth" className="btn-primary" style={{ fontSize: '17px', padding: '16px 36px' }}>
            Start Your Journey <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '32px 24px',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '13px'
      }}>
        <p>🇮🇳 CivicAI — Educating citizens for a stronger democracy. Politically neutral. No party affiliation.</p>
        <p style={{ marginTop: '8px' }}>Built with ❤️ for India&apos;s voters · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
