const request = require('supertest');
const app = require('../app');
const Task = require('../models/Task');

describe('Task API Endpoints', () => {
    it('should retrieve all tasks', async () => {
        const response = await request(app).get('/tasks').expect(200);
        expect(Array.isArray(response.body.tasks)).toBe(true);
    });
});
