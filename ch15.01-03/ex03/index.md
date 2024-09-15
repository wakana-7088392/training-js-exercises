# ch15.01-03/ex03

## 自作のスクリプトに対し script タグで integrity 属性を付けると、適切な integrity 値の場合はロードされ、そうでない場合ロードされないことを確認しなさい。またこのようなセキュリティ機能があるとどのような攻撃を防御できるか記述しなさい。

- 誤ったハッシュ値に変えた場合
  - 以下のようなエラー文がコンソールに出力される
    - Failed to find a valid digest in the 'integrity' attribute for responce 'https://code.jquery.com/jquery-3.7.1.slim.min.js' with computed SHA-256 integrity 'kmHvs0B+OpCW5GVHUNjv9rOmY0IvSIRcf7zGUDTDQM8='. The responce has been blocked.
- integrityの効果

  - 外部スクリプトの改竄を防ぐことができる。
    - Subsource Integrity(SPI)はスクリプトのハッシュ値を指定することで、スクリプトが改竄されていないことを確認している。
    - CDN上のファイルに悪意のあるものを挿入したり、置き換えられるといった攻撃がされていないかを検証できるため、こういった攻撃のリスクを軽減できる。

- 参考情報
  - [jQuery CDN](https://releases.jquery.com/)
  - [MDN/サブリソース完全性](https://developer.mozilla.org/ja/docs/Web/Security/Subresource_Integrity)
