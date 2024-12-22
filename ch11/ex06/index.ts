export const isEmailAddress = (address?: string | null) => {
  // addressが未定義または、addressの長さが254より多い、@までの文字数が64より多い場合はfalseを返す
  // ドメインの最大値は252らしい
  if (!address || address.length > 254 || address.indexOf("@") > 64) {
    return false;
  }
  // 先頭・末尾が.、.が連続する、@の前後が.である場合はfalseを返す
  if (/^\.|\.\.|\.$|\.@|@\./.test(address)) {
    return false;
  }
  // 許容される文字、数値、記号をpatternに格納して、addressをtestにかける。その結果を返す。
  const pattern =
    /^[a-z0-9!#\$%&'\*\+\-/=\?\^_`\.\{\|\}~]+@[a-z0-9!#\$%&'\*\+\-/=\?\^_`\.\{\|\}~]+$/i;
  return pattern.test(address);
};
