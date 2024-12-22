describe("3.4test", () => {
  const emoji = "💯";
  test("Hundred Points Symbol length", () => {
    expect(emoji.length).toBe(2);
  });

  test("compare emoji point", () => {
    const utf16 = "\uD83D\uDCAF";
    const utf32 = "\u{0001F4AF}";
    expect(utf16 === emoji).toBe(true);
    expect(utf32 === emoji).toBe(true);
  });
});
