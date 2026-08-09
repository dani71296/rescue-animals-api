const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('GET /reports', () => {

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it('should respond with status 200 and a list of reports', async () => {
        const res = await request(app).get('/reports');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }, 15000);

    it('should respond with status 400 or 404 if searching for an invalid report ID', async () => {
        const res = await request(app).get('/reports/invalid-id-777');
        expect([400, 404]).toContain(res.statusCode);
    });
});