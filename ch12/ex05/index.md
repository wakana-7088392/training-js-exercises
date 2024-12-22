## Node.jsのファイルシステムモジュール

# fs.openSync

- 役割
  - 指定されたファイルを開く
- シグネチャ
  - fs.openSync(path: string, flags: string | number, mode?: number): number
- 引数
  - path: 開くファイルのパス
  - flags: ファイルを開くモード。'r' は読み取り専用、'w' は書き込み専用、'a' は追記モードなど。(デフォルトは'r')
  - mode: ファイルのパーミッション(デフォルトは 0o666)
- 戻り値
  - ファイルディスクリプタ（ファイルを識別するための整数）

# fs.readSync

- 役割
  - 開かれたファイルからデータを読み取る
- シグネチャ
  - fs.readSync(fd: number, buffer: Buffer, offset: number, length: number, position: number | null): number
- 引数
  - fd: ファイルディスクリプタ(fs.openSync() で取得したもの)
  - buffer: 読み取ったデータを格納するバッファ
  - offset: バッファ内の開始位置
  - length: 読み取るバイト数
  - position: ファイル内の読み取り開始位置。null を指定すると現在のファイルポインタ位置から読み取ります
- 戻り値
  - 読み取ったバイト数

# fs.closeSync

- 役割
  - 開かれたファイルを閉じる
- シグネチャ
  - fs.closeSync(fd: number): void
- 引数
  - fd: ファイルディスクリプタ(fs.openSync() で取得したもの)
- 戻り値
  - なし

これらの関数を使うことで、ファイルのオープン、読み取り、クローズを同期的に行うことができます。同期的な操作は、処理が完了するまで次の行に進まないため、シンプルなスクリプトやエラーハンドリングが必要な場合に便利です。
