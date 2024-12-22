import * as request from 'supertest';
import { app, rootDirectory } from './app.js';

describe('ch16/ex09', () => {
    beforeAll(() => {
        rootDirectory = './test'
    })
    test('/test/mirror', async () => {
        const response = await request(app).get('/test/mirror');
        expect(response.status).toBe(200);
        expect(response.text).toContain('GET /test/mirror HTTP/');
    });
    test('ファイル', async () => {
        const response = await request(app).get('/test.txt');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toBe('text/plain');
        expect(response.text).toBe('This is a test file.');
    });

    test('404エラー', async () => {
        const response = await request(app).get('/nonexistentfile.txt');
        expect(response.status).toBe(404);
    });
});