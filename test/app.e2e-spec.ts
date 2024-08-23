import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return a health check message when the / route is requested', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should return a student when the /students route is requested', () => {
    const requestBody = {
      name: 'John',
      address: 'Doe',
      phone: '123456789',
      email: 'jonh@doe.com',
      birthYear: 1990,
    };

    return request(app.getHttpServer())
      .post('/students')
      .send(requestBody)
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe(requestBody.name);
        expect(res.body.address).toBe(requestBody.address);
        expect(res.body.phone).toBe(requestBody.phone);
        expect(res.body.email).toBe(requestBody.email);
        expect(res.body).not.toHaveProperty('birthYear');
        expect(res.body.courses).toStrictEqual([]);
      });
  });
});
