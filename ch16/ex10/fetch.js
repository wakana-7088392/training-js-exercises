import * as fs from 'fs';

const filePath = `mypath`; // アップロードするファイルのパス
const url = 'http://localhost:8000/hello.txt'; // アップロード先のURL

async function uploadFile() {
    const response = await fetch(url, {
        method: 'PUT',
        body: fs.readFileSync(filePath),
        duplex: 'half',
    });

    if (response.ok) {
        console.log('ファイルのアップロードが成功しました');
    } else {
        console.error('ファイルのアップロードに失敗しました', response.statusText);
    }
}

uploadFile();