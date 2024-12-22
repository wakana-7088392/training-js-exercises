// nav 要素内のリンク (<a>)
console.log(document.querySelectorAll("nav a")); // NodeList(4)[a,a,a,a] 中身を見ると、「ホーム」「商品一覧」「お問い合わせ」「会社情報」が出てきた

// 商品リスト (.product-list) 内の最初の商品 (.product-item)
console.log(document.querySelector(".product-list .product-item:first-child")); // 商品1が含まれるdivが出力

// カートアイコンの画像 (<img>)
console.log(document.querySelector(".cart img")); // <img src="./30" alt="カート" />

// 商品リスト (.product-list) 内の価格 (.price) を表示する要素
console.log(document.querySelectorAll(".product-list .price")); // NodeList(4)[p.price,p.price,p.price,p.price] 中に各値段が含まれていた

// 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)
console.log(document.querySelectorAll(".product-list .product-item img")); // NodeList(4)[img,img,img,img]

// 検索バー (.search-bar) 内の検索ボタン (<button>)
console.log(document.querySelector(".search-bar button")); // <button>検索</button>

// フッター (footer) 内のパラグラフ (<p>) 要素
console.log(document.querySelector("footer p")); // <p>&copy; 2024 家電オンラインショップ. All rights reserved.</p>

// 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
console.log(
  document.querySelectorAll(".product-list .product-item:nth-child(even)")
); // NodeList(2)[div.product-item, div.product-item]

// ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)
console.log(document.querySelector(".account img")); // <img src="./30" alt="アカウント" /></a>

// ナビゲーションリンクのうち、"会社情報" のリンク
console.log(document.querySelector('nav a[href="#about"]')); // <a href="#about">会社情報</a>
