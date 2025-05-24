const request = require('supertest');
const app = require('../src/app');

describe('Orçamentos', () => {
  it('cria um orçamento', async () => {
    const res = await request(app)
      .post('/budgets')
      .send({
        number: 'ORC-001',
        description: 'Teste API Zeus',
        estimatedValue: 1000.00,
        memberId: 1,
        clientId: 1,
        projectId: 1
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
