import * as fs from "fs/promises";
import * as path from "path";

// インターフェースを使って返却するプロパティを定義
interface Data {
  path: string;
  isDirectory: boolean;
}

/**
 * 指定されたディクトリ内のファイル/ディレクトリを再帰的に探索する非同期ジェネレータ関数
 * @param rootPath ディレクトリのパス
 */
export async function* walk(rootPath: string): AsyncGenerator<Data> {
  const dirent = await fs.readdir(rootPath, { withFileTypes: true });
  for (let d of dirent) {
    const changePath = path.join(rootPath, d.name);
    const isDirectory = d.isDirectory();
    yield { path: changePath, isDirectory: isDirectory };
    if (isDirectory) {
      yield* walk(changePath);
    }
  }
}

// 利用例
// (async () => {
//   // カレントディレクトリ (.) のファイル・フォルダを再帰的に取得し表示する
//   for await (const elem of walk(".")) {
//     console.log(elem);
//   }

//   // NOTE: walk に与えたパスが以下のようなディレクトリ・ファイルを持つ時を考える
//   // .
//   // ├── A
//   // ├── B
//   // │   └── C
//   // │       └── buz.txt
//   // └── foo.txt
//   //
//   // この時 `walk` は以下を返す (順序は任意):
//   // - { path: "A", isDirectory: true }
//   // - { path: "B", isDirectory: true }
//   // - { path: "B/C", isDirectory: true }
//   // - { path: "B/C/buz.txt", isDirectory: false }
//   // - { path: "foo.txt", isDirectory: false }
// })();
