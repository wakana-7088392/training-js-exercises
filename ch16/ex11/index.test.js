import * as net from 'net';
import { createServer } from './index'

describe('ch16/ex11', () => {
    let server;
    let client;

    beforeAll((done) => {
        server = createServer();
        server.listen(8080, done);
    });

    afterAll((done) => {
        server.close(done);
    });

    beforeEach((done) => {
        client = new net.Socket();
        client.connect(8080, '127.0.0.1', done);
    });

    afterEach((done) => {
        if (client) {
            client.end(done);
        }
    });

    test('GET / returns the form', (done) => {
        client.once('data', (data) => {
            const response = data.toString();
            expect(response).toContain('<title>Greeting Form</title>');
            done();
        });
        client.write('GET / HTTP/1.1\r\nHost: localhost\r\n\r\n');
    });

    test('POST /greeting returns the greeting', (done) => {
        client.once('data', (data) => {
            const response = data.toString();
            expect(response).toContain('<title>Greeting</title>');
            expect(response).toContain('<h1>Hello, John!</h1>');
            expect(response).toContain('<p>Hello there!</p>');
            done();
        });
        const body = 'name=John&greeting=Hello+there!';
        client.write(`POST /greeting HTTP/1.1\r\nHost: localhost\r\nContent-Length: ${body.length}\r\n\r\n${body}`);
    });

    test('GET /unknown returns 404', (done) => {
        client.once('data', (data) => {
            const response = data.toString();
            expect(response).toContain('404 Not Found');
            done();
        });
        client.write('GET /unknown HTTP/1.1\r\nHost: localhost\r\n\r\n');
    });

    test('PUT / returns 405', (done) => {
        client.once('data', (data) => {
            const response = data.toString();
            expect(response).toContain('405 Method Not Allowed');
            done();
        });
        client.write('PUT / HTTP/1.1\r\nHost: localhost\r\n\r\n');
    });
});

