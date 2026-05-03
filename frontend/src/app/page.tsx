// Landing page is a Server Component — no 'use client' needed
// This improves FCP, LCP, and reduces JS bundle size
import Link from 'next/link';
import { ArrowRight, MessageCircle, Map, Play, CheckCircle, ChevronRight, Vote, Shield, Zap, Globe } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CivicAI – Your Personal Election Guide for India',
  description: 'AI-powered civic education for every Indian citizen. Understand elections, register to vote, and participate with confidence. Available in Hindi and English.',
  keywords: 'election guide India, voter registration, CivicAI, voting help, EVM, NOTA, Election Commission India, first time voter',
  openGraph: {
    title: 'CivicAI – Your Personal Election Guide',
    description: 'Understand, Prepare, and Vote with Confidence. AI-powered civic education for every Indian citizen.',
    type: 'website',
    locale: 'en_IN',
  },
  alternates: {
    canonical: 'https://civic-ai-by-google-for-devlopers-3k.vercel.app/',
  },
};

const features = [
  {
    icon: '💬',
    title: 'AI Chat Assistant',
    desc: 'Get instant answers about elections, voting rights, and procedures in Hindi or English.',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.1)',
  },
  {
    icon: '🗺️',
    title: 'Election Roadmap',
    desc: 'Personalized step-by-step guide tailored to your state, age, and voter status.',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
  },
  {
    icon: '▶️',
    title: 'Voting Simulation',
    desc: 'Practice the entire voting process with our interactive EVM simulation.',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.1)',
  },
  {
    icon: '🗳️',
    title: 'Candidate Comparison',
    desc: 'Compare candidates objectively by education, background, and track record.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
  },
  {
    icon: '🪪',
    title: 'Voter ID Help',
    desc: 'Apply for new Voter ID, request corrections, or track your application status.',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
  },
  {
    icon: '🏆',
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

const stats = [
  { value: '90Cr+', label: 'Registered Voters in India' },
  { value: '28', label: 'States & UTs Supported' },
  { value: '2', label: 'Languages (Hindi & English)' },
  { value: '24/7', label: 'AI Assistance Available' },
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
            <span aria-hidden="true">🌐</span> 🇮🇳 Made for Indian Citizens · Powered by Google Gemini AI
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
            Understand, Prepare, and Vote with Confidence. Powered by Google Gemini AI — available in Hindi and English.
          </p>

          <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth" id="landing-get-started" className="btn-primary" style={{ fontSize: '17px', padding: '16px 32px' }}>
              Get Started Free <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/chat" className="btn-secondary" style={{ fontSize: '17px', padding: '16px 32px' }}>
              Try AI Chat <MessageCircle size={18} aria-hidden="true" />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="animate-fade-up delay-400" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '24px', marginTop: '48px', flexWrap: 'wrap'
          }}>
            {[
              { emoji: '✅', text: 'Politically Neutral', color: '#10b981' },
              { emoji: '🔒', text: 'Privacy First', color: '#3b82f6' },
              { emoji: '🌐', text: 'Hindi & English', color: '#8b5cf6' },
              { emoji: '⚡', text: 'Google Gemini AI', color: '#f59e0b' },
            ].map(({ emoji, text, color }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                <span aria-hidden="true">{emoji}</span>
                <span style={{ color }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Hero visual — chat preview */}
          <div className="animate-float" style={{
            marginTop: '60px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '24px',
            maxWidth: '600px',
            margin: '60px auto 0',
            boxShadow: '0 40px 80px rgba(0,0,0,0.3)'
          }}
          role="img"
          aria-label="Preview of CivicAI chat interface showing a bilingual conversation about voter registration"
          >
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }} aria-hidden="true">
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
                Great question! To register as a first-time voter: <br/>
                ✅ Age 18+ · ✅ Aadhaar card · ✅ Visit voter.eci.gov.in and fill Form 6.
                <br/>I&apos;ll guide you step by step! 🗳️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, marginBottom: '8px' }} className="gradient-text">
                  {value}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '100px 24px', background: 'var(--bg-secondary)' }} aria-labelledby="features-heading">
        <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="badge badge-purple" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              ✨ Features
            </div>
            <h2 id="features-heading" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, marginBottom: '16px' }}>
              Everything you need to vote{' '}
              <span className="gradient-text">confidently</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '500px', margin: '0 auto' }}>
              Six powerful tools to guide you through India&apos;s election process.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {features.map(({ icon, title, desc, color, bg }) => (
              <article key={title} className="card" style={{ padding: '28px' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: bg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '16px',
                  border: `1px solid ${color}30`, fontSize: '24px'
                }} aria-hidden="true">
                  {icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '100px 24px' }} aria-labelledby="how-it-works-heading">
        <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="badge badge-green" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              🔍 How It Works
            </div>
            <h2 id="how-it-works-heading" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800 }}>
              Ready to vote in <span className="gradient-text">4 simple steps</span>
            </h2>
          </div>

          <ol style={{ display: 'flex', flexDirection: 'column', gap: '24px', listStyle: 'none', padding: 0, margin: 0 }}>
            {steps.map(({ num, title, desc }) => (
              <li key={num} className="card" style={{
                padding: '28px 32px', display: 'flex', alignItems: 'center', gap: '24px'
              }}>
                <div style={{
                  minWidth: '56px', height: '56px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
                  border: '1px solid rgba(59,130,246,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Outfit, sans-serif', fontWeight: 800,
                  fontSize: '20px', color: 'var(--accent-primary)',
                }} aria-hidden="true">
                  {num}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '6px' }}>{title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>{desc}</p>
                </div>
                <ChevronRight size={20} color="var(--text-muted)" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }} aria-labelledby="cta-heading">
        <div style={{
          maxWidth: '700px', margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
          border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: '28px', padding: '60px 40px'
        }}>
          <h2 id="cta-heading" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, marginBottom: '16px' }}>
            Your vote matters. <span className="gradient-text">Be prepared.</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', marginBottom: '32px' }}>
            Join thousands of first-time voters who used CivicAI to vote with confidence.
          </p>
          <Link href="/auth" className="btn-primary" style={{ fontSize: '17px', padding: '16px 36px' }}>
            Start Your Journey <ArrowRight size={18} aria-hidden="true" />
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
      }} role="contentinfo">
        <p>🇮🇳 CivicAI — Educating citizens for a stronger democracy. Politically neutral. No party affiliation.</p>
        <p style={{ marginTop: '8px' }}>
          Built with ❤️ for India&apos;s voters · {new Date().getFullYear()} ·{' '}
          <span style={{ color: 'var(--text-secondary)' }}>Powered by Google Gemini AI</span>
        </p>
        <nav aria-label="Footer links" style={{ marginTop: '12px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/auth" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Sign In</Link>
          <Link href="/voter-id" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Voter ID Help</Link>
          <Link href="/quiz" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Civic Quiz</Link>
          <a href="https://voter.eci.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>ECI Portal</a>
        </nav>
      </footer>
    </div>
  );
}
