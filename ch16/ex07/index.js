import * as fs from "fs";

// const path = "../ex07/a/a.txt";

export function checkEntry(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                reject(err);
                return
            }
            if (stats.isFile()) {
                resolve("file");
            } else if (stats.isDirectory()) {
                resolve("directory");
            } else {
                resolve("other");
            }
        })
    })
}

// checkEntry(path)
//     .then(result => console.log(result))
//     .catch(error => console.error(error));
