const request = require('supertest');

const app = require('../app');

describe('# admin router', () => {
  it('GET /admin/management should redirect to ' +
      '/admin without session cookies', (done) => {
    request(app)
        .get('/admin/management')
        .expect(302)
        .expect('Location', /admin$/, done);
  });
  it('GET /admin should redirect to ' +
      '/admin/login without session cookies', (done) => {
    request(app)
        .get('/admin')
        .expect(302)
        .expect('Location', /admin\/login$/, done);
  });
});
