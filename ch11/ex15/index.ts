interface UrlObject {
  base: string;
  addQuery?: string[][];
  path?: string;
}
export function modifyUrl(
  obj: UrlObject = { base: "", addQuery: [], path: "" }
) {
  let url: URL;
  try {
    url = new URL(obj.base);
  } catch (e) {
    throw new Error();
  }

  if (obj.addQuery) {
    for (let query of obj.addQuery) {
      url.searchParams.append(query[0], query[1]);
    }
  }
  if (obj.path) {
    url.pathname = obj.path;
  }
  return url.href;
}

const obj = {
  base: "https://example.com/foo?a=b",
  addQuery: [
    ["p", "x"],
    ["パラメータ", "y"],
  ],
  path: "",
};

console.log(modifyUrl(obj));
