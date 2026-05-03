import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock next-auth server session
vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

vi.mock('@/lib/auth', () => ({
  authOptions: {},
  getSessionUserQuery: vi.fn(),
}));

vi.mock('@/lib/mongodb', () => ({
  default: Promise.resolve({
    db: () => ({
      collection: () => ({
        findOne: mockFindOne,
        updateOne: mockUpdateOne,
      }),
    }),
  }),
}));

const mockFindOne = vi.fn();
const mockUpdateOne = vi.fn();

import { getServerSession } from 'next-auth';
import { getSessionUserQuery } from '@/lib/auth';

describe('GET /api/me', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should return 401 if not authenticated', async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);
    const { GET } = await import('./route');
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it('should return 400 if session has no user identifier', async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { email: 'test@test.com' } } as Parameters<typeof getServerSession>[0]);
    vi.mocked(getSessionUserQuery).mockReturnValue(null);
    const { GET } = await import('./route');
    const res = await GET();
    expect(res.status).toBe(400);
  });

  it('should return user profile if authenticated', async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { id: 'user123', email: 'test@test.com' } } as Parameters<typeof getServerSession>[0]);
    vi.mocked(getSessionUserQuery).mockReturnValue({ email: 'test@test.com' });
    mockFindOne.mockResolvedValue({
      name: 'Test User', email: 'test@test.com', image: '', age: '25', state: 'Maharashtra', city: 'Mumbai', firstTimeVoter: 'no'
    });

    const { GET } = await import('./route');
    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.user.name).toBe('Test User');
    expect(data.user.state).toBe('Maharashtra');
  });
});

describe('PATCH /api/me', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should return 401 if not authenticated', async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);
    const { PATCH } = await import('./route');
    const res = await PATCH(new Request('http://localhost/api/me', {
      method: 'PATCH',
      body: JSON.stringify({ age: '25', state: 'Maharashtra', city: 'Mumbai', firstTimeVoter: 'no' }),
    }));
    expect(res.status).toBe(401);
  });

  it('should return 400 if age is below 18', async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { id: 'user123', email: 'test@test.com' } } as Parameters<typeof getServerSession>[0]);
    vi.mocked(getSessionUserQuery).mockReturnValue({ email: 'test@test.com' });

    const { PATCH } = await import('./route');
    const res = await PATCH(new Request('http://localhost/api/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: '16', state: 'Maharashtra', city: 'Mumbai', firstTimeVoter: 'yes' }),
    }));
    expect(res.status).toBe(400);
  });
});
