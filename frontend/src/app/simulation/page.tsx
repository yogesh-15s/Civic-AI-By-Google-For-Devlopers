'use client';
import { useState } from 'react';
import { CheckCircle, ChevronRight, RotateCcw, Vote, Shield, Eye, Hand, Star } from 'lucide-react';

const STEPS = [
  {
    id: 1, icon: '🏛️',
    title: 'Enter the Polling Booth',
    desc: 'You arrive at the designated polling booth in your constituency. Look for the booth with your voter serial number. There will be queue management by election officials.',
    action: 'Enter Booth',
    tip: '💡 Tip: Arrive early to avoid long queues. Booths open at 7:00 AM.',
    color: '#3b82f6',
  },
  {
    id: 2, icon: '🪪',
    title: 'Show Your ID',
    desc: 'Present your Voter ID (EPIC card) or any one of the 12 ECI-approved alternative photo IDs to the Presiding Officer at the first table.',
    action: 'Show ID Documents',
    tip: '💡 Accepted: Aadhaar, Passport, Driving License, MNREGA Card, PAN Card, and 7 more.',
    color: '#8b5cf6',
    docs: ['Voter ID (EPIC)', 'Aadhaar Card', 'Passport', 'Driving License', 'PAN Card']
  },
  {
    id: 3, icon: '✅',
    title: 'Verify Your Identity',
    desc: 'The officer will find your name in the electoral roll. They will mark your name and you will sign or put your thumb impression in the register. Your left index finger will be marked with indelible ink.',
    action: 'Verify Identity',
    tip: '💡 The ink lasts 2-3 weeks and prevents double voting.',
    color: '#06b6d4',
  },
  {
    id: 4, icon: '🖥️',
    title: 'Go to the EVM',
    desc: 'Proceed to the voting compartment where the EVM (Electronic Voting Machine) is kept. The VVPAT machine will also be present. The Polling Officer will press the ballot button to enable your vote.',
    action: 'Approach EVM',
    tip: '💡 EVM has no internet connection — completely tamper-proof and secure.',
    color: '#10b981',
  },
  {
    id: 5, icon: '🗳️',
    title: 'Cast Your Vote!',
    desc: 'Press the blue button next to your chosen candidate\'s name and symbol. A beep sound confirms your vote. The VVPAT will display a paper slip with the candidate\'s symbol for 7 seconds. If you don\'t want any candidate, press NOTA (None of the Above).',
    action: 'Cast Vote ✓',
    tip: '💡 Your vote is 100% secret. No one can see who you voted for.',
    color: '#f59e0b',
  },
];

export default function SimulationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const step = STEPS[currentStep];
  const progress = ((currentStep) / STEPS.length) * 100;

  const handleAction = () => {
    if (!completed.includes(currentStep)) {
      setCompleted(prev => [...prev, currentStep]);
    }
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setCompleted([]);
    setDone(false);
  };

  if (done) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 0 50px rgba(16,185,129,0.4)',
            fontSize: '40px'
          }}></div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '36px', fontWeight: 800, marginBottom: '16px' }}>
            <span className="gradient-text">Vote Cast Successfully!</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', lineHeight: 1.7, marginBottom: '32px' }}>
            Congratulations! You have completed the voting simulation. You are now ready to vote with confidence on Election Day! 🇮🇳
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
            {[
              { icon: <Shield size={20} color="#10b981" />, text: 'Vote is Secret' },
              { icon: <CheckCircle size={20} color="#3b82f6" />, text: 'Process Complete' },
              { icon: <Star size={20} color="#f59e0b" />, text: 'Civic Duty Done!' }
            ].map(({ icon, text }) => (
              <div key={text} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 18px', background: 'var(--bg-card)',
                border: '1px solid var(--border-color)', borderRadius: '12px'
              }}>
                {icon}
                <span style={{ fontWeight: 600, fontSize: '14px' }}>{text}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={reset} className="btn-secondary">
              <RotateCcw size={16} /> Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '94px', padding: '110px 24px 60px' }}>
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: '10px' }}>
            Voting <span className="gradient-text">Simulation</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Practice the complete voting process step by step
          </p>
        </div>

        {/* Step tracker */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          {STEPS.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <button
                onClick={() => i <= Math.max(...completed, 0) && setCurrentStep(i)}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                  border: 'none', flexShrink: 0, transition: 'all 0.3s',
                  background: completed.includes(i) ? '#10b981'
                            : i === currentStep ? `linear-gradient(135deg, ${step.color}, #8b5cf6)`
                            : 'var(--bg-card)',
                  color: completed.includes(i) || i === currentStep ? 'white' : 'var(--text-muted)',
                  boxShadow: i === currentStep ? `0 0 20px ${step.color}60` : 'none',
                  outline: i === currentStep ? `2px solid ${step.color}` : 'none',
                  outlineOffset: '2px'
                }}
              >
                {completed.includes(i) ? <CheckCircle size={18} /> : s.id}
              </button>
              {i < STEPS.length - 1 && (
                <div className={`step-connector ${completed.includes(i) ? 'active' : ''}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step labels */}
        <div style={{ display: 'flex', marginBottom: '32px' }}>
          {STEPS.map((s, i) => (
            <div key={s.id} style={{ flex: 1, textAlign: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: 500, color: i === currentStep ? step.color : 'var(--text-muted)' }}>
                {s.title.split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="progress-bar" style={{ marginBottom: '36px' }}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Current step card */}
        <div className="card" style={{ padding: '40px', marginBottom: '24px', borderColor: `${step.color}40` }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
            {/* Icon */}
            <div style={{
              width: '88px', height: '88px', borderRadius: '24px',
              background: `rgba(${step.color === '#3b82f6' ? '59,130,246' : step.color === '#8b5cf6' ? '139,92,246' : step.color === '#06b6d4' ? '6,182,212' : step.color === '#10b981' ? '16,185,129' : '245,158,11'}, 0.12)`,
              border: `2px solid ${step.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '40px', marginBottom: '8px',
              boxShadow: `0 0 30px ${step.color}30`
            }}>
              {step.icon}
            </div>

            <div>
              <div className="badge badge-blue" style={{ marginBottom: '12px', display: 'inline-flex' }}>
                Step {step.id} of {STEPS.length}
              </div>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 800, marginBottom: '16px' }}>
                {step.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.8, maxWidth: '560px' }}>
                {step.desc}
              </p>
            </div>

            {/* Documents if any */}
            {step.docs && (
              <div style={{ width: '100%', maxWidth: '400px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>ACCEPTED DOCUMENTS</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  {step.docs.map(doc => (
                    <span key={doc} className="badge badge-blue">{doc}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Tip */}
            <div style={{
              background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: '12px', padding: '14px 20px', fontSize: '14px',
              color: 'var(--text-secondary)', width: '100%', maxWidth: '480px',
              lineHeight: 1.6
            }}>
              {step.tip}
            </div>

            {/* Action button */}
            <button
              id={`sim-step-${step.id}`}
              onClick={handleAction}
              className="btn-primary"
              style={{
                fontSize: '16px', padding: '16px 36px',
                background: `linear-gradient(135deg, ${step.color}, #8b5cf6)`
              }}
            >
              {step.action}
              {currentStep < STEPS.length - 1 ? <ChevronRight size={18} /> : <Vote size={18} />}
            </button>
          </div>
        </div>

        {/* All steps overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
            All Steps Overview
          </h3>
          {STEPS.map((s, i) => (
            <div key={s.id} style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '12px 16px', borderRadius: '12px',
              background: i === currentStep ? `${step.color}15` : 'var(--bg-secondary)',
              border: `1px solid ${i === currentStep ? step.color + '30' : 'var(--border-color)'}`,
              opacity: i > currentStep && !completed.includes(i) ? 0.5 : 1
            }}>
              <span style={{ fontSize: '20px' }}>{s.icon}</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 600, fontSize: '14px', color: i === currentStep ? step.color : 'var(--text-primary)' }}>
                  {s.title}
                </span>
              </div>
              {completed.includes(i) && <CheckCircle size={16} color="#10b981" />}
              {i === currentStep && !completed.includes(i) && <Eye size={16} color={step.color} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
