const human = {
  name: "taro",
  age: 20,
};

with (human) {
  console.log(name + " " + age + "歳");
}
