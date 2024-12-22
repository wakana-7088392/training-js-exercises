- 以下の入れ子の関数とアロー関数のコード実行結果を予想してから実行し、結果を説明しなさい。

  - ソースコード

    ```javascript:title
    const obj = {
      om: function () {
        const nest = {
          nm: function () {
            console.log(this === obj, this === nest);
          },
          arrow: () => {
            console.log(this === obj, this === nest);
          },
        };
        nest.nm();
        nest.arrow();
      },
    };
    obj.om();

    ```

  - 実行前の予想
    - nest.nm()とnest.arrow()が実行される。
    - nest4つの真偽値が出力される…？
  - 実行結果
    ```javascript:実行結果
    false true
    true false
    ```
  - 教材を読んだ上での結果の解釈
    - nest.nm()の出力結果について
      > > アロー関数以外の入れ子型の関数は外側のthisの値を継承しません。入れ子型の関数がメソッドとして呼び出された場合、関数を呼び出したオブジェクトがthisの値になります。
      - という記述を踏まえると、外側のobjは継承されず、関数を呼び出しているのはnestなのでnestがthisの値であると考えられる。よって一つ目の真偽値はfalse、二つ目の真偽値がtrueとなる。
    - nest.arrow()の出力結果について
      - 上記の引用を踏まえて逆に考えると、アロー関数の場合は「外側のthisの値」を継承すると言える。今回の場合は外側にあるobjを継承することになる。その結果、一つ目の真偽値はtrue、二つ目の真偽値がfalseとなる。
