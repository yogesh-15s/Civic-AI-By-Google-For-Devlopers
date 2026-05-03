'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { Vote, Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';

type Mode = 'login' | 'signup';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  form?: string;
}

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<FormData>({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [router, status]);

  const validate = (): boolean => {
    const e: Errors = {};
    if (mode === 'signup' && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});

    try {
      if (mode === 'signup') {
        const registerRes = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        });

        const registerData = await registerRes.json();

        if (!registerRes.ok) {
          setErrors({ form: registerData.message || 'Unable to create your account.' });
          return;
        }
      }

      const result = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ form: mode === 'login' ? 'Invalid email or password.' : 'Account created, but sign-in failed. Please try logging in.' });
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 800);
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Checking your session...</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: `radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.18) 0%, transparent 55%),
                   radial-gradient(ellipse at 75% 70%, rgba(139,92,246,0.15) 0%, transparent 55%),
                   var(--bg-primary)`
    }}>
      {/* Floating orbs */}
      <div style={{
        position: 'fixed', top: '10%', left: '5%', width: '300px', height: '300px',
        borderRadius: '50%', background: 'rgba(59,130,246,0.06)',
        filter: 'blur(60px)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'fixed', bottom: '15%', right: '8%', width: '250px', height: '250px',
        borderRadius: '50%', background: 'rgba(139,92,246,0.06)',
        filter: 'blur(60px)', pointerEvents: 'none'
      }} />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Righteous, sans-serif', fontSize: '46px', fontWeight: 400, marginBottom: '6px', letterSpacing: '1px' }}
              className="gradient-text">
            CivicAI
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Smart Election Assistant for Every Citizen
          </p>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: '36px', background: 'var(--bg-card)' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'rgba(16,185,129,0.15)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
              }}>
                <CheckCircle size={32} color="#10b981" />
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>
                {mode === 'login' ? 'Welcome back!' : 'Account created!'}
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>Redirecting to your dashboard…</p>
            </div>
          ) : (
            <>
              {/* Mode toggle */}
              <div style={{
                display: 'flex', background: 'var(--bg-secondary)',
                borderRadius: '12px', padding: '4px', marginBottom: '28px'
              }}>
                {(['login', 'signup'] as Mode[]).map(m => (
                  <button
                    key={m}
                    onClick={() => { setMode(m); setErrors({}); }}
                    style={{
                      flex: 1, padding: '10px', border: 'none', cursor: 'pointer',
                      borderRadius: '9px', fontWeight: 600, fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.2s ease',
                      background: mode === m ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)' : 'transparent',
                      color: mode === m ? 'white' : 'var(--text-secondary)',
                    }}
                  >
                    {m === 'login' ? 'Login' : 'Sign Up'}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {errors.form && (
                  <div style={{
                    border: '1px solid rgba(239,68,68,0.35)',
                    background: 'rgba(239,68,68,0.08)',
                    color: '#fca5a5',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    fontSize: '13px'
                  }}>
                    {errors.form}
                  </div>
                )}

                {/* Name (signup only) */}
                {mode === 'signup' && (
                  <div>
                    <label htmlFor="auth-name" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                      Full Name
                    </label>
                    <div style={{ position: 'relative' }}>
                      <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        id="auth-name"
                        type="text"
                        className="input-field"
                        style={{ paddingLeft: '42px', border: errors.name ? '1px solid #ef4444' : undefined }}
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={e => updateField('name', e.target.value)}
                      />
                    </div>
                    {errors.name && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>{errors.name}</p>}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label htmlFor="auth-email" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      id="auth-email"
                      type="email"
                      className="input-field"
                      style={{ paddingLeft: '42px', border: errors.email ? '1px solid #ef4444' : undefined }}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => updateField('email', e.target.value)}
                    />
                  </div>
                  {errors.email && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="auth-password" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      id="auth-password"
                      type={showPw ? 'text' : 'password'}
                      className="input-field"
                      style={{ paddingLeft: '42px', paddingRight: '44px', border: errors.password ? '1px solid #ef4444' : undefined }}
                      placeholder="Min. 6 characters"
                      value={form.password}
                      onChange={e => updateField('password', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                    >
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>{errors.password}</p>}
                </div>

                {/* Submit */}
                <button
                  id="auth-submit"
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                  style={{ width: '100%', justifyContent: 'center', marginTop: '8px', opacity: loading ? 0.8 : 1 }}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)',
                        borderTopColor: 'white', borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite', display: 'inline-block'
                      }} />
                      {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                    </span>
                  ) : (
                    <>{mode === 'login' ? 'Login to CivicAI' : 'Create Account'} <ArrowRight size={16} /></>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
              </div>

              {/* Google Button */}
              <button
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                className="btn-secondary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  gap: '12px',
                  fontWeight: 600,
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                <Image
                  src="/google-logo.png"
                  alt="Google"
                  width={20}
                  height={20}
                  style={{ flexShrink: 0 }}
                />
                Google Login
              </button>

              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', marginTop: '20px' }}>
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrors({}); }}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>
                  {mode === 'login' ? 'Sign Up' : 'Login'}
                </button>
              </p>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px', marginTop: '24px' }}>
          Educating citizens for a stronger democracy
        </p>
      </div>
    </div>
  );
}
