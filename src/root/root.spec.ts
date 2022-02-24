import request from 'supertest';
import { getServer } from 'app';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      return request(getServer()).get('/').expect(200);
    });
  });
});
