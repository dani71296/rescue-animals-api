const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('GET /adoptions', () => {

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should respond with status 200 and the list of adoptions', async () => {
        const res = await request(app).get('/adoptions');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }, 15000);

    it('should respond with status 400 or 404 if an invalid adoption ID is searched', async () => {
        const res = await request(app).get('/adoptions/invalid-id-555');
        expect([400, 404]).toContain(res.statusCode);
    });
});