const num = [
  { label: "Infinity", value: Infinity },
  { label: "-Infinity", value: -Infinity },
  { label: "NaN", value: NaN },
  { label: "-NaN", value: -NaN },
];

const ops = [
  { label: "+", operation: (x, y) => x + y },
  { label: "-", operation: (x, y) => x - y },
  { label: "*", operation: (x, y) => x * y },
  { label: "/", operation: (x, y) => x / y },
];

for (let i = 0; i < num.length; i++) {
  for (let j = 0; j < num.length; j++) {
    for (let k = 0; k < ops.length; k++) {
      console.log(
        `${num[i].label} ${ops[k].label} ${num[j].label} = ${ops[k].operation(
          num[i].value,
          num[j].value
        )}`
      );
    }
  }
}
