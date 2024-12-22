# コード内容

```Javascript:title
console.log(console.log.toString());
const method = function () {
  return 100;
};
console.log(method.toString());
```

# 出力結果

```Javascript:title
function () { [native code] }
function () {
  return 100;
}
```
