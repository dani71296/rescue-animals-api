const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('GET /users', () => {

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should respond with status 200 and a list of users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }, 15000);

    it('should respond with status 400 or 404 if searching for an invalid user ID', async () => {
        const res = await request(app).get('/users/invalid-id-999');
        expect([400, 404]).toContain(res.statusCode);
    });
});