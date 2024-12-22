export function checkTypeofTmpLiteral(
  strings: TemplateStringsArray,
  ...values: any[]
) {
  return values.map((value) => typeof value).join(",");
}

console.log(checkTypeofTmpLiteral`${"A"}`);
