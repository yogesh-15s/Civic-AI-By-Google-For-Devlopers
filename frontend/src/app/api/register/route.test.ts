import { describe, it, expect, vi } from 'vitest';
import { POST } from './route';

// Define the mock outside so it's accessible
const mockFindOne = vi.fn();
const mockInsertOne = vi.fn();

vi.mock('@/lib/mongodb', () => ({
  default: Promise.resolve({
    db: () => ({
      collection: () => ({
        findOne: mockFindOne,
        insertOne: mockInsertOne,
      }),
    }),
  }),
}));

vi.mock('@/lib/password', () => ({
  hashPassword: vi.fn().mockResolvedValue('hashed_password'),
}));

describe('Register API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 409 if user already exists', async () => {
    mockFindOne.mockResolvedValue({ email: 'test@example.com', passwordHash: 'existing_hash' });

    const request = new Request('http://localhost/api/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test',
        email: 'test@example.com',
        password: 'password123',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data.message).toBe('An account with this email already exists.');
  });

  it('should return 409 and prompt Google login if user exists without password', async () => {
    mockFindOne.mockResolvedValue({ email: 'google@example.com' }); // No passwordHash

    const request = new Request('http://localhost/api/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Google User',
        email: 'google@example.com',
        password: 'password123',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data.message).toContain('linked to Google sign-in');
  });
});
