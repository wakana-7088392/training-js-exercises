let res = "";

const demoNormal = () => {
  try {
    res += "try\n";
  } catch (e) {
    res += "catch\n";
  } finally {
    res += "finally\n";
  }
  return res;
};

console.log("正常な処理:\n" + demoNormal());

const demoFail = () => {
  try {
    res += "try\n";
    throw new Error();
  } catch (e) {
    res += "catch\n";
  } finally {
    res += "finally\n";
  }
  return res;
};

console.log("エラー発生時:\n" + demoFail());
