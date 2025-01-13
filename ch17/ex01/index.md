# 問題文

- ESLint と Prettier は昨今よく使われおり、併用されることもよくある。
  この二つを package.json にscriptsを追加してそれぞれ実行できるようにしなさい。
  追加した 「Prettier の scripts 実行時は警告が表示されるだけでなく、コードの修正がされるようオプションで設定する」こと。
  Prettier vs. Lintersにあるように ESLint ではバグ検知のための検知を、フォーマットに関しては Prettier で行うようにすること。
  ESLint、Prettier の各種設定はプロジェクトで採用したスタイルによって設定すべき内容も変わるが、ここでは設定の練習として「Google JavaScript Style Guideになるべく従うように設定しなさい。」
  実行確認用のファイルとして ex01 にformat_sample.js と lint_sample.js を用意した。「それぞれのファイルに追加した scripts を実行し、lint の警告は修正しなさい。」
  ただし 「format_sample.js は lint の警告を修正するのではなく、ESLint の設定で lint 対象から除外し、警告がでないようにすること。」
  実行確認用のファイルはあくまで例として上記のガイドのいくつかを反映されているのみであるため、設定に関しては実行確認用ファイルがガイドに従う最小設定ではなく、Google JavaScript Style Guideに従うこと。

# 実施内容

1. ○　eslintとprettierのインストール
    - npm install -D ○○でインストール
1. ○　eslintとprettierとでコンフリクトを起こさないようにする？
    - js.config.recommendをeslintに追加
1. ○　(consoleで警告が出たりしたので)不要な警告を出さないようにする
    - eslint.config.js
        - languageOptions内のglobalで設定

1. ○　「Prettier の scripts 実行時は警告が表示されるだけでなく、コードの修正がされるようオプションで設定する」
    - "format": "prettier . --check --write"でcheckとwriteのオプションを付けた
1. 「Google JavaScript Style Guideになるべく従うように設定しなさい。」
- eslint.config.js
    - 'no-var': 'error',
        - [const と letを使用](https://google.github.io/styleguide/jsguide.html#features-use-const-and-let)
- prettierrc.json
    - "arrowParens": "avoid",　可能な場合は括弧を省略する
        - [矢印関数](https://google.github.io/styleguide/jsguide.html#features-functions-arrow-functions)
        - 非構造化パラメータが1つしかない場合はパラメータを囲む括弧は省略可能
    - "useTabs": false,
        - [空白文字 インデントにはタブ文字は使用しない](https://google.github.io/styleguide/jsguide.html#whitespace-characters)
    - "prettier-plugin-curly"
        - [すべての制御構造に中括弧が使用される](https://google.github.io/styleguide/jsguide.html#formatting-braces-all)
    - "tabWidth": 2,
        - [ブロックのインデント： +2スペース](https://google.github.io/styleguide/jsguide.html#formatting-block-indentation)
    - "semi": true,
        - [セミコロンは必須](https://google.github.io/styleguide/jsguide.html#formatting-semicolons-are-required)
    - "printWidth": 80,
        - [列数制限: 80](https://google.github.io/styleguide/jsguide.html#formatting-column-limit)
    - "trailingComma": "es5", 
        - [末尾にカンマを使用する](https://google.github.io/styleguide/jsguide.html#features-arrays-trailing-comma)
    - "singleQuote": true,
        - [シングルクォートを使用する](https://google.github.io/styleguide/jsguide.html#features-strings-use-single-quotes)
1. ○　「(format_sample.js と lint_sample.js)それぞれのファイルに追加した scripts を実行し、lint の警告は修正しなさい。」
    - with文修正

1. ○　「format_sample.js は lint の警告を修正するのではなく、ESLint の設定で lint 対象から除外し、警告がでないようにすること。」
    - eslint.config.jsのignoresで「format_sample」がつくファイルを除外