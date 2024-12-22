const sJson = '{"key": 0, "value": "OK"}';
const sJsonNg = "{key: 0, value: OK}";

export const sParseJson = (s: string) => {
  try {
    const json = JSON.parse(s);
    return { success: true, data: json };
  } catch (e) {
    return { success: false, error: e };
  }
};

console.log(sParseJson(sJson));
console.log(sParseJson(sJsonNg));
