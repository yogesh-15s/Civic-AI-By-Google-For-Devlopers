'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useTheme } from './ThemeProvider';
import { useState } from 'react';
import {
  LayoutDashboard, MessageCircle, Play, User, Vote,
  Sun, Moon, Menu, X, BookOpen, Map, Trophy, LogOut
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/chat', label: 'AI Chat', icon: MessageCircle },
  { href: '/simulation', label: 'Simulation', icon: Play },
  { href: '/candidates', label: 'Candidates', icon: Vote },
  { href: '/voter-id', label: 'Voter ID', icon: BookOpen },
  { href: '/booth-guide', label: 'Booth Guide', icon: Map },
  { href: '/quiz', label: 'Quiz', icon: Trophy },
  { href: '/profile-setup', label: 'Profile', icon: User },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
    setMenuOpen(false);
  };

  const hideOn = ['/', '/auth'];
  if (hideOn.includes(pathname)) return null;

  return (
    <nav className="navbar" style={{ flexDirection: 'column', display: 'flex' }}>
      <div style={{ background: 'linear-gradient(90deg, #1e3a8a, #4c1d95)', color: '#e2e8f0', fontSize: '13px', fontWeight: 500, textAlign: 'center', padding: '6px 24px', width: '100%' }}>
        <span style={{ opacity: 0.9 }}>Election Commission of India Voter Helpline:</span> <strong style={{ color: 'white', letterSpacing: '1px' }}>1950</strong> <span style={{ opacity: 0.7, fontSize: '11px', marginLeft: '4px' }}>(Toll Free)</span>
      </div>
      <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'Righteous, sans-serif', fontWeight: 400, fontSize: '26px', letterSpacing: '1px' }} className="gradient-text">
              CivicAI
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden-mobile">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={`nav-link ${pathname === href ? 'active' : ''}`}>
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={toggleTheme}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '8px',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              title="Toggle theme"
            >
              {isDark ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#3b82f6" />}
            </button>

            <button
              onClick={() => void handleLogout()}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '8px',
                cursor: 'pointer',
                color: 'var(--accent-danger)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              title="Logout"
              className="hidden-mobile"
            >
              <LogOut size={16} />
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '8px',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
              className="show-mobile"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{
            padding: '16px 0',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link ${pathname === href ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
            <button
              onClick={() => void handleLogout()}
              className="nav-link"
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: 'var(--accent-danger)' }}
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
