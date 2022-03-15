import request from 'supertest';
import { getServer } from 'app';

const server = getServer();

describe('Testing Root Routes', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      return request(server).get('/').expect(200);
    });
  });
  describe('[GET] /healthcheck', () => {
    it('response statusCode 200', () => {
      return request(server).get('/healthcheck').expect(200);
    });
    it('returns server info', async () => {
      const { text } = await request(server).get('/healthcheck').expect(200);
      const healthcheck = JSON.parse(text);
      expect(healthcheck).toHaveProperty('ts');
      expect(healthcheck).toHaveProperty('ip');
      expect(healthcheck).toHaveProperty('ips');
      expect(healthcheck).toHaveProperty('created_at');
    });
  });
});
