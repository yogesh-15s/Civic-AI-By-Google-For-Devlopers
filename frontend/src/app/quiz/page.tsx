'use client';
import { useState } from 'react';
import { Trophy, RotateCcw, CheckCircle, XCircle, Star, Zap } from 'lucide-react';

interface Question {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    q: 'What is the minimum age requirement to vote in India?',
    options: ['16 years', '18 years', '21 years', '25 years'],
    answer: 1,
    explanation: 'The 61st Constitutional Amendment (1989) lowered the voting age from 21 to 18 years.'
  },
  {
    q: 'What does NOTA stand for in Indian elections?',
    options: ['No Official Ticket Available', 'None of the Above', 'Not on the Alternative', 'National Option for Total Abstention'],
    answer: 1,
    explanation: 'NOTA (None of the Above) was introduced by the Supreme Court in 2013. It allows voters to reject all candidates.'
  },
  {
    q: 'Which form is used for NEW voter registration in India?',
    options: ['Form 6', 'Form 7', 'Form 8', 'Form 9'],
    answer: 0,
    explanation: 'Form 6 is for enrollment of new voters. Form 7 is for deletion, Form 8 for correction, and Form 8A for transposition.'
  },
  {
    q: 'What is the ECI Voter Helpline number?',
    options: ['1800', '100', '1950', '112'],
    answer: 2,
    explanation: '1950 is the toll-free ECI Voter Helpline for all queries related to voter registration, polling booths, and election information.'
  },
  {
    q: 'What does EVM stand for?',
    options: ['Electoral Voting Machine', 'Electronic Voter Module', 'Electronic Voting Machine', 'Election Verification Module'],
    answer: 2,
    explanation: 'EVM (Electronic Voting Machine) has replaced paper ballots in Indian elections since 2004. It is tamper-proof and has no internet connection.'
  },
  {
    q: 'What is the VVPAT machine used for?',
    options: ['To count votes digitally', 'To verify voter identity', 'To provide paper receipt of vote for transparency', 'To communicate results to ECI'],
    answer: 2,
    explanation: 'VVPAT (Voter Verifiable Paper Audit Trail) prints a paper slip showing the candidate\'s name and symbol for 7 seconds after voting, ensuring transparency.'
  },
  {
    q: 'Who is responsible for conducting Lok Sabha elections in India?',
    options: ['Prime Minister\'s Office', 'Supreme Court of India', 'Election Commission of India', 'Ministry of Home Affairs'],
    answer: 2,
    explanation: 'The Election Commission of India (ECI) is an autonomous constitutional authority responsible for conducting free and fair elections in India.'
  },
  {
    q: 'Which document was officially known as EPIC?',
    options: ['Aadhaar Card', 'PAN Card', 'Voter ID Card', 'Passport'],
    answer: 2,
    explanation: 'EPIC stands for Electors\' Photo Identity Card — the official Voter ID issued by the Election Commission of India.'
  },
  {
    q: 'Can a person vote without their Voter ID card on election day?',
    options: ['No, only Voter ID is accepted', 'Yes, with any government document', 'Yes, with any of 12 ECI-approved IDs including Aadhaar', 'Yes, but only with a court order'],
    answer: 2,
    explanation: 'ECI accepts 12 alternative photo identity documents including Aadhaar, Passport, Driving License, MNREGA card, PAN card, and more.'
  },
  {
    q: 'How many Lok Sabha seats are there in the Indian Parliament?',
    options: ['250', '543', '545', '552'],
    answer: 1,
    explanation: 'There are 543 elected seats in the Lok Sabha (House of the People). 2 more seats were for Anglo-Indian community (discontinued in 2020).'
  },
];

const BADGES = [
  { min: 0, max: 3, name: 'Civic Beginner', emoji: '🌱', color: '#6b7280', desc: 'Keep learning! Every expert was once a beginner.' },
  { min: 4, max: 6, name: 'Informed Voter', emoji: '📚', color: '#3b82f6', desc: 'Good knowledge! You know the basics of democracy.' },
  { min: 7, max: 8, name: 'Election Expert', emoji: '🏛️', color: '#8b5cf6', desc: 'Excellent! You have strong civic knowledge.' },
  { min: 9, max: 10, name: 'Democracy Champion', emoji: '🏆', color: '#f59e0b', desc: 'Perfect! You are a true champion of democracy!' },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[current];
  const score = answers.filter((a, i) => a === QUESTIONS[i].answer).length;
  const badge = BADGES.find(b => score >= b.min && score <= b.max)!;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setShowExplanation(false);
    setDone(false);
  };

  const progress = ((current + (done ? 1 : 0)) / QUESTIONS.length) * 100;

  if (done) {
    const finalBadge = BADGES.find(b => score >= b.min && score <= b.max)!;
    return (
      <div style={{ minHeight: '100vh', paddingTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        <div style={{ maxWidth: '560px', width: '100%', textAlign: 'center' }}>
          {/* Badge display */}
          <div style={{
            width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 28px',
            background: `radial-gradient(circle, ${finalBadge.color}30, ${finalBadge.color}10)`,
            border: `3px solid ${finalBadge.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '52px', boxShadow: `0 0 50px ${finalBadge.color}40`
          }}>
            {finalBadge.emoji}
          </div>

          <div className="badge" style={{ display: 'inline-flex', marginBottom: '16px', background: `${finalBadge.color}20`, color: finalBadge.color, border: `1px solid ${finalBadge.color}40`, fontSize: '14px', padding: '6px 16px' }}>
            🎖️ {finalBadge.name}
          </div>

          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '38px', fontWeight: 900, marginBottom: '12px' }}>
            Quiz Complete! <span className="gradient-text">{score}/{QUESTIONS.length}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', marginBottom: '32px', lineHeight: 1.7 }}>
            {finalBadge.desc}
          </p>

          {/* Score breakdown */}
          <div className="card" style={{ padding: '24px', marginBottom: '28px' }}>
            <div className="progress-bar" style={{ marginBottom: '12px', height: '10px' }}>
              <div className="progress-fill" style={{ width: `${(score / QUESTIONS.length) * 100}%`, background: `linear-gradient(90deg, ${finalBadge.color}, #8b5cf6)` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-secondary)' }}>
              <span>✅ Correct: {score}</span>
              <span>❌ Wrong: {QUESTIONS.length - score}</span>
              <span>📊 Score: {Math.round((score / QUESTIONS.length) * 100)}%</span>
            </div>
          </div>

          {/* Answer review */}
          <div className="card" style={{ padding: '24px', marginBottom: '28px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Answer Review</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {QUESTIONS.map((question, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 14px', borderRadius: '10px',
                  background: answers[i] === question.answer ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                  border: `1px solid ${answers[i] === question.answer ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`
                }}>
                  {answers[i] === question.answer
                    ? <CheckCircle size={16} color="#10b981" style={{ flexShrink: 0 }} />
                    : <XCircle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
                  }
                  <span style={{ fontSize: '13px', flex: 1 }}>Q{i + 1}: {question.q.slice(0, 50)}…</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={reset} className="btn-primary">
              <RotateCcw size={16} /> Retake Quiz
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
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: '10px' }}>
            Civic <span className="gradient-text">Knowledge Quiz</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Test your knowledge and earn your voter badge!
          </p>
        </div>

        {/* Progress bar + counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
          <div className="progress-bar" style={{ flex: 1 }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 600, flexShrink: 0 }}>
            {current + 1} / {QUESTIONS.length}
          </span>
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '32px', justifyContent: 'center' }}>
          {QUESTIONS.map((_, i) => (
            <div key={i} style={{
              width: i === current ? '24px' : '8px', height: '8px', borderRadius: '999px',
              transition: 'all 0.3s ease',
              background: i < current
                ? (answers[i] === QUESTIONS[i].answer ? '#10b981' : '#ef4444')
                : i === current ? 'linear-gradient(90deg,#3b82f6,#8b5cf6)' : 'var(--border-color)'
            }} />
          ))}
        </div>

        {/* Question card */}
        <div className="card" style={{ padding: '36px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span className="badge badge-purple">Question {current + 1}</span>
            <span className="badge badge-blue">
              <Zap size={11} /> {QUESTIONS.length - current - 1} remaining
            </span>
          </div>

          <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend className="sr-only">Question {current + 1}</legend>
            <h2 style={{ fontSize: 'clamp(17px, 2.5vw, 21px)', fontWeight: 700, lineHeight: 1.5, marginBottom: '28px' }}>
              {q.q}
            </h2>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {q.options.map((opt, idx) => {
                let optClass = 'quiz-option';
                if (selected !== null) {
                  if (idx === q.answer) optClass += ' correct';
                  else if (idx === selected && selected !== q.answer) optClass += ' wrong';
                } else if (selected === idx) {
                  optClass += ' selected';
                }
                return (
                  <label
                    key={idx}
                    className={optClass}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: selected === null ? 'pointer' : 'default' }}
                  >
                    <input
                      type="radio"
                      name="quiz-option"
                      className="sr-only"
                      checked={selected === idx}
                      onChange={() => handleSelect(idx)}
                      disabled={selected !== null}
                    />
                    <span style={{
                      width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                      background: selected !== null
                        ? idx === q.answer ? '#10b981' : idx === selected ? '#ef4444' : 'var(--bg-secondary)'
                        : 'var(--bg-secondary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '13px', fontWeight: 700, color: selected !== null && (idx === q.answer || idx === selected) ? 'white' : 'var(--text-muted)'
                    }}>
                      {selected !== null && idx === q.answer ? '✓' : selected !== null && idx === selected ? '✗' : String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Explanation */}
          {showExplanation && (
            <div style={{
              marginTop: '20px',
              background: selected === q.answer ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
              border: `1px solid ${selected === q.answer ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)'}`,
              borderRadius: '12px', padding: '16px 20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                {selected === q.answer
                  ? <CheckCircle size={18} color="#10b981" />
                  : <XCircle size={18} color="#ef4444" />}
                <span style={{ fontWeight: 700, fontSize: '15px', color: selected === q.answer ? '#10b981' : '#ef4444' }}>
                  {selected === q.answer ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>
                💡 {q.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Next button */}
        {selected !== null && (
          <button
            id="quiz-next"
            onClick={handleNext}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '16px', padding: '16px' }}
          >
            {current < QUESTIONS.length - 1 ? (
              <>Next Question <Star size={16} /></>
            ) : (
              <>See Results <Trophy size={16} /></>
            )}
          </button>
        )}

        {/* Live score */}
        <div style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)', fontSize: '13px' }}>
          Current score: <strong style={{ color: 'var(--text-primary)' }}>{score} / {current + (selected !== null ? 1 : 0)}</strong>
        </div>
      </div>
    </div>
  );
}
