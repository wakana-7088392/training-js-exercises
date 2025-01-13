# ch17/ex04

## npm install すると作成される package-lock.json はどのような役割を持つのか。
- プロジェクトが依存しているライブラリやパッケージのバージョン等を正確に管理するjsonファイル
- npm installを実行しpackage.jsonを変更した際に自動的に生成及び更新される
- 生成されたツリーを正確に記述し、後続のインストールで中間の依存関係の更新に関係なく同一のツリーを生成可能
- 追加したライブラリ、パッケージに依存しているものも記録する

## また、リポジトリにコミットすべきか、について説明しなさい。
- コミットすべき
    - 同じプロジェクトに関わる人同士で全く同じ依存関係がインストールされていることを保証することができる。
    - これさえコミットすればnode_modulesをコミットしなくても正確に確認可能
    - コミットすることでツリーの変更を可視化しやすくなる。
    - npmのドキュメントにも「This file is intended to be committed into source repositories（ソースリポジトリにコミットすることを意図している）」という記載がある。

## 参考リンク

- [package-lock.json/npm](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json)
