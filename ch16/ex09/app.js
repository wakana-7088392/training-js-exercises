import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';

export const app = express();
export let rootDirectory = '';

// /test/mirrorの場合はリクエストの詳細を返す
app.get('/test/mirror', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);

    for (let [key, value] of Object.entries(req.headers)) {
        res.write(`${key}: ${value}\r\n`);
    }
    res.write('\r\n');
    req.pipe(res);
});

// ファイルが指定された場合は種類を判別して返す
app.get('*', (req, res) => {
    let filename = req.path.substring(1);
    filename = filename.replace(/\.\.\//g, '');
    filename = path.resolve(rootDirectory, filename);

    console.log(filename);
    let type;
    switch (path.extname(filename)) {
        case '.html':
        case '.htm': type = 'text/html'; break;
        case '.js': type = 'text/javascript'; break;
        case '.css': type = 'text/css'; break;
        case '.png': type = 'image/png'; break;
        case '.txt': type = 'text/plain'; break;
        default: type = 'application/octet-stream'; break;
    }

    fs.createReadStream(filename)
        .on('open', () => {
            res.setHeader('Content-Type', type);
            res.status(200);
            fs.createReadStream(filename).pipe(res);
        })
        .on('error', (err) => {
            res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
            res.status(404).end(err.message);
        });
});