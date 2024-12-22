import * as fs from "fs";
import * as path from "path";

// インターフェースを使って返却するプロパティを定義
interface Data {
  path: string;
  isDirectory: boolean;
}

/**
 * 指定されたディクトリ内のファイル/ディレクトリを再帰的に探索するジェネレータ関数
 * @param rootPath ディレクトリのパス
 */
export function* walk(rootPath: string): Generator<Data> {
  // fs.readdirSyncでディレクトリやファイル名を取得する
  // withFileTypesをtrueにするとfs.Direntオブジェクトで取得可能
  const dirent = fs.readdirSync(rootPath, { withFileTypes: true });
  for (let d of dirent) {
    // パスを結合する(path.join)
    // d.nameでfs.Direntオブジェクトが参照しているファイル名を取得可
    const changePath = path.join(rootPath, d.name);
    // d.isDirectory()メソッドでディレクトリか否かを判定してもらう
    const isDirectory = d.isDirectory();
    yield { path: changePath, isDirectory: isDirectory };
    if (isDirectory) {
      // 結合されたパスを使用して再帰的に探索する
      yield* walk(changePath);
    }
  }
}

// 試運転用
const a = walk("C:/Users/XXX/Documents/training-js-exercises/ch12");
for (let i = 0; i < 10; i++) {
  console.log(a.next().value);
}
