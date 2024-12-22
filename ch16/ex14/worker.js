// jimpをフル活用した簡略版
import { parentPort, workerData } from 'worker_threads';
import { Jimp } from 'jimp';

const applyGaussianFilter = async (imagePath) => {
    try {
        const image = await Jimp.read(imagePath);
        image.gaussian(5); // ガウシアンフィルタの適用
        const outputPath = 'filtered_image.jpg';
        await image.write(outputPath);
        parentPort.postMessage(outputPath);
    } catch (error) {
        parentPort.postMessage(`Error: ${error.message}`);
    }
};

applyGaussianFilter(workerData.imagePath);