import * as http from "http";
import * as url from "url";
import * as path from "path";
import * as fs from "fs";


function serve(rootDirectory, port) {
    const server = new http.Server();
    server.listen(port);
    console.log("Listening on Port", port);

    server.on("request", (request, response) => {
        console.log(request.method)
        const endpoint = url.parse(request.url).pathname;

        if (endpoint === "/test/mirror") {
            response.setHeader("Content-Type", "text/plain; charset=UTF-8");
            response.writeHead(200)
            response.write(`${request.method} ${request.url} HTTP/${request.httpVersion
                }\r\n`)

            let headers = request.rawHeaders;
            for (let i = 0; i < headers.length; i += 2) {
                response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
            }
            response.write("\r\n");
            request.pipe(response);
        } else if (request.method === "PUT") {
            const filename = getFilename(rootDirectory, endpoint);
            const fileStream = fs.createWriteStream(filename);
            request.pipe(fileStream);

            fileStream.on("finish", () => {
                response.setHeader("Content-Type", "text/plain; charset=UTF-8");
                response.writeHead(201);
                response.end("ファイルのアップロードが成功しました");
            });

            fileStream.on("error", (err) => {
                response.setHeader("Content-Type", "text/plain; charset=UTF-8");
                response.writeHead(500);
                response.end(err.message);
            })
        } else {
            const filename = getFilename(rootDirectory, endpoint);
            let type;
            switch (path.extname(filename)) {
                case ".html":
                case ".htm": type = "text/html"; break;
                case ".js": type = "text/javascript"; break;
                case ".css": type = "text/css"; break;
                case ".png": type = "image/png"; break;
                case ".txt": type = "text/plain"; break;
                default: type = "application/octet-stream"; break;
            }
            const stream = fs.createReadStream(filename);
            stream.once("readable", () => {
                response.setHeader("Content-Type", type);
                response.writeHead(200);
                stream.pipe(response);
            });

            stream.on("error", (err) => {
                response.setHeader("Content-Type", "text/plain; charset=UTF-8");
                response.writeHead(404);
                response.end(err.message);
            })
        }
    });
}

function getFilename(rootDirectory, endpoint) {
    let filename = endpoint.substring(1);
    filename = filename.replace(/\.\.\//g, "");
    filename = path.resolve(rootDirectory, filename);
    return filename;
}

serve(process.argv[2] || "/tmp", parseInt(process.argv[3] || 8000));