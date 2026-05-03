import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/me', () => {
    return HttpResponse.json({
      user: {
        name: 'Test User',
        email: 'test@example.com',
      }
    });
  }),
  http.get('/api/chat-history', () => {
    return HttpResponse.json({
      messages: [],
      language: 'en'
    });
  }),
];
