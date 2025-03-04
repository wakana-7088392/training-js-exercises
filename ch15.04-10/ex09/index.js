document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    const outputData = new Uint8ClampedArray(imageData.data.length);

    // カーネルの算出
    function gaussianKernel(size, sigma) {
      const kernel = [];
      const center = Math.floor(size / 2);
      let sum = 0;

      for (let y = 0; y < size; y++) {
        kernel[y] = [];
        for (let x = 0; x < size; x++) {
          const dx = x - center;
          const dy = y - center;
          const value =
            (1 / (2 * Math.PI * sigma * sigma)) *
            Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
          kernel[y][x] = value;
          sum += value;
        }
      }

      // 正規化
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          kernel[y][x] /= sum;
        }
      }

      return kernel;
    }

    // 例: 5x5 カーネル, σ = 1.0
    const kernelSize = 20;
    const kernel = gaussianKernel(kernelSize, 10.0);
    console.log(kernel);

    // ガウシアンフィルタのカーネル (5x5)

    const width = img.width;
    const height = img.height;

    // ガウシアンフィルタの適用
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0,
          g = 0,
          b = 0;
        for (let ky = 0; ky < kernelSize; ky++) {
          for (let kx = 0; kx < kernelSize; kx++) {
            let px = x + kx - Math.floor(kernelSize / 2);
            let py = y + ky - Math.floor(kernelSize / 2);
            // サンプリングする範囲をインプットした画像内に収める
            px = Math.min(Math.max(px, 0), width - 1);
            py = Math.min(Math.max(py, 0), height - 1);

            const offset = (py * width + px) * 4;
            const weight = kernel[ky][kx];
            r += data[offset] * weight;
            g += data[offset + 1] * weight;
            b += data[offset + 2] * weight;
          }
        }
        const i = (y * width + x) * 4;
        outputData[i] = r;
        outputData[i + 1] = g;
        outputData[i + 2] = b;
        outputData[i + 3] = data[i + 3]; // アルファチャンネルはそのまま
      }
    }

    const outputImageData = new ImageData(outputData, img.width, img.height);
    filteredCtx.putImageData(outputImageData, 0, 0);
  });

  reader.readAsDataURL(file);
});
