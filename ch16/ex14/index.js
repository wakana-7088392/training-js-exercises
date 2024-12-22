import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagePath = 'C:/Users/XX/Pictures/gaussian.jpg';
const workerPath = path.resolve(__dirname, 'worker.js');

const worker = new Worker(workerPath, {
    workerData: { imagePath }
})

worker.on('message', (message) => {
    console.log('Filtered image saved as:', message);
});

worker.on('error', (error) => {
    console.error('Worker error:', error);
});

worker.on('exit', (code) => {
    if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
    }
});

// マルチスレッドにする方法(考え中)
// import { Worker } from 'worker_threads';
// import { fileURLToPath } from 'url';
// import * as path from 'path';
// import { Jimp } from 'jimp';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const imagePath = 'C:/Users/XXX/Pictures/gaussian.jpg';
// const workerPath = path.resolve(__dirname, 'worker.js');

// const processThreads = async () => {
//     const image = await Jimp.read(imagePath).raw;
//     const width = image.bitmap.width;
//     const height = image.bitmap.height;

//     const outputData = new Uint8ClampedArray(image.getBuffer().size);
//     console.log(outputData);

//     let completed = 0;
//     const result = [];

//     segments.forEach((segment, index) => {
//         const worker = new Worker(workerPath, {
//             workerData: { imagePath, segment, index }
//         });

//         worker.on('message', (message) => {
//             result[message.index] = message.outputPath;
//             completed++;
//             if (completed === segments.length) {
//                 console.log('Filtered image saved as:', message);
//                 margeImage();
//             }
//         });

//         worker.on('error', (error) => {
//             console.error('Worker error:', error);
//         });

//         worker.on('exit', (code) => {
//             if (code !== 0) {
//                 console.error(`Worker stopped with exit code ${code}`);
//             }
//         });
//     })
// }

// const margeImage = async () => {

// }

processThreads();