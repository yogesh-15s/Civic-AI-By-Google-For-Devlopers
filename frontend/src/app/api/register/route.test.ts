import { describe, it, expect, vi, beforeEach } from 'vitest';

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

// Helper to create a mock Request
function makeRequest(body: object) {
  return new Request('http://localhost/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/register', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Input validation', () => {
    it('should return 400 if name is missing', async () => {
      const { POST } = await import('./route');
      const res = await POST(makeRequest({ email: 'test@test.com', password: 'password123' }));
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.message).toBeTruthy();
    });

    it('should return 400 if email is invalid', async () => {
      const { POST } = await import('./route');
      const res = await POST(makeRequest({ name: 'Test', email: 'not-an-email', password: 'password123' }));
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.message).toBeTruthy();
    });

    it('should return 400 if password is too short', async () => {
      const { POST } = await import('./route');
      const res = await POST(makeRequest({ name: 'Test', email: 'test@test.com', password: '123' }));
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.message).toBeTruthy(); // Zod returns the message; fallback covers mocked env
    });
  });

  describe('Account conflict detection', () => {
    it('should return 409 if user with password already exists', async () => {
      const { POST } = await import('./route');
      mockFindOne.mockResolvedValue({ email: 'test@example.com', passwordHash: 'existing_hash' });

      const res = await POST(makeRequest({ name: 'Test', email: 'test@example.com', password: 'password123' }));
      const data = await res.json();

      expect(res.status).toBe(409);
      expect(data.message).toBe('An account with this email already exists.');
    });

    it('should return 409 and prompt Google login if user exists without password (OAuth account)', async () => {
      const { POST } = await import('./route');
      mockFindOne.mockResolvedValue({ email: 'google@example.com' }); // No passwordHash

      const res = await POST(makeRequest({ name: 'Google User', email: 'google@example.com', password: 'password123' }));
      const data = await res.json();

      expect(res.status).toBe(409);
      expect(data.message).toContain('linked to Google sign-in');
    });
  });

  describe('Successful registration', () => {
    it('should return 201 when a new user registers successfully', async () => {
      const { POST } = await import('./route');
      mockFindOne.mockResolvedValue(null);
      mockInsertOne.mockResolvedValue({ insertedId: 'new_id' });

      const res = await POST(makeRequest({ name: 'New User', email: 'new@example.com', password: 'password123' }));
      const data = await res.json();

      expect(res.status).toBe(201);
      expect(data.message).toBe('Account created successfully.');
      expect(mockInsertOne).toHaveBeenCalledOnce();
    });
  });
});
