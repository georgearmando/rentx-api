import { app } from '@shared/infra/http/app';
import request from 'supertest'

describe('Create Category Controller', () => {
  it('Should be able to create a new category', async () => {
    const response = await request(app).post('/categories').send({
      name: 'Category Name',
      description: 'Category Description'
    });

    expect(response.status).toBe(201);
  });
});
