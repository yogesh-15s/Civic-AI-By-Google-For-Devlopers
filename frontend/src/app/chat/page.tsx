'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Globe, Trash2, Sparkles, Plus } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const STARTERS = [
  'How do I register to vote for the first time?',
  'मुझे मतदान केंद्र कैसे खोजना है?',
  'What documents do I need to vote?',
  'What is NOTA and how does it work?',
  'How does the EVM machine work?',
  'Can I vote without Voter ID card?',
];

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '14px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px 18px 18px 4px', width: 'fit-content' }}>
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || loading) return;
    setInput('');

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          language: lang
        })
      });
      const data = await res.json();
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'Sorry, I could not process that. Please try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '⚠️ Connection error. Please check your API key in .env.local and try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => setMessages([]);

  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line.replace(/\*\*(.*?)\*\*/g, '$1')}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '94px' }}>
      {/* Header Actions */}
      <div style={{
        position: 'absolute', top: '110px', right: '24px', zIndex: 20,
        display: 'flex', alignItems: 'center', gap: '10px'
      }}>
        {/* Language toggle */}
        <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: '10px', padding: '3px' }}>
          {(['en', 'hi'] as const).map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: '13px', fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s',
              background: lang === l ? 'var(--bg-card)' : 'transparent',
              color: lang === l ? 'var(--text-primary)' : 'var(--text-secondary)'
            }}>
              {l === 'en' ? '🇺🇸 EN' : '🇮🇳 HI'}
            </button>
          ))}
        </div>

        {messages.length > 0 && (
          <button onClick={clearChat} style={{
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none',
            borderRadius: '999px', padding: '10px 16px', cursor: 'pointer',
            color: 'white', display: 'flex', alignItems: 'center', gap: '6px',
            fontWeight: 600, fontSize: '13px', fontFamily: 'Inter, sans-serif',
            boxShadow: '0 4px 12px rgba(59,130,246,0.2)'
          }} title="Start a new chat">
            <Plus size={16} /> New chat
          </button>
        )}
      </div>

      {/* Conversation area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '40px 24px 150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Empty state / Welcome */}
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '10vh' }}>
              <h1 style={{ fontFamily: 'Righteous, sans-serif', fontSize: 'clamp(36px, 6vw, 56px)', marginBottom: '8px', fontWeight: 400 }} className="gradient-text">
                Hello, Voter
              </h1>
              <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '48px' }}>
                How can Civic AI help you today?
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', textAlign: 'left' }}>
                {STARTERS.map((s, i) => (
                  <button key={i} onClick={() => sendMessage(s)} className="card" style={{
                    padding: '20px', border: 'none', background: 'var(--bg-secondary)',
                    borderRadius: '16px', cursor: 'pointer', color: 'var(--text-primary)',
                    fontSize: '14px', lineHeight: 1.5, transition: 'all 0.2s', textAlign: 'left'
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-secondary)'; }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '8px' }}>
              {msg.role === 'user' ? (
                <div style={{
                  background: 'var(--bg-secondary)', color: 'var(--text-primary)',
                  padding: '12px 20px', borderRadius: '24px', fontSize: '15px', lineHeight: 1.6,
                  maxWidth: '85%', wordWrap: 'break-word'
                }}>
                  {formatContent(msg.content)}
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '16px', maxWidth: '100%' }}>
                  <div style={{ marginTop: '2px', flexShrink: 0 }}>
                    <Sparkles size={24} className="gradient-text" style={{ color: '#8b5cf6' }} />
                  </div>
                  <div style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-primary)', flex: 1, wordWrap: 'break-word' }}>
                    <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>Civic AI</div>
                    {formatContent(msg.content)}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: '16px', maxWidth: '100%', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px', flexShrink: 0 }}>
                <Sparkles size={24} style={{ color: '#8b5cf6' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>Civic AI</div>
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input area */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '20px 24px 30px', background: 'var(--bg-primary)', zIndex: 10 }}>
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', background: 'var(--bg-secondary)', borderRadius: '24px', padding: '8px 16px', border: '1px solid var(--border-color)' }}>
            <textarea
              ref={inputRef}
              id="chat-input"
              rows={1}
              style={{ flex: 1, resize: 'none', lineHeight: 1.6, padding: '12px 0', minHeight: '48px', maxHeight: '120px', overflow: 'auto', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '15px' }}
              placeholder={lang === 'hi' ? 'चुनाव के बारे में कुछ भी पूछें…' : 'Ask Civic AI…'}
              value={input}
              onChange={e => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
              onKeyDown={handleKey}
            />
            <button
              id="chat-send"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              style={{
                padding: '12px', background: 'transparent', border: 'none', flexShrink: 0,
                opacity: !input.trim() || loading ? 0.3 : 1,
                cursor: !input.trim() || loading ? 'not-allowed' : 'pointer',
                color: 'var(--accent-primary)'
              }}
            >
              <Send size={20} />
            </button>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
            Civic AI may display inaccurate info, so double-check important election details at voter.eci.gov.in.
          </p>
        </div>
      </div>
    </div>
  );
}
