import { retryWithExponentialBackoff } from "./index.ts";
import { jest } from "@jest/globals";

describe("ch13/ex11", () => {
  test("test once", async () => {
    const func = jest
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response("success"));
    const promise = retryWithExponentialBackoff(
      () => fetch("https://example.com"),
      5
    );
    await expect(promise).resolves.toBeInstanceOf(Response);
    expect(func).toHaveBeenCalledTimes(1);
    func.mockRestore();
  });
  test("test retry 2", async () => {
    // 3回目(2回目のリトライ)で成功して返値が得られるようにする
    const func = jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("fail"))
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue(new Response("success"));
    const promise = retryWithExponentialBackoff(
      () => fetch("https://example.com"),
      5
    );
    await expect(promise).resolves.toBeInstanceOf(Response);
    expect(func).toHaveBeenCalledTimes(3);
    func.mockRestore();
  });
  test("test retry max", async () => {
    // 6回目(最後のリトライ)で成功して返値が得られるようにする
    const func = jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("fail"))
      .mockRejectedValueOnce(new Error("fail"))
      .mockRejectedValueOnce(new Error("fail"))
      .mockRejectedValueOnce(new Error("fail"))
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue(new Response("success"));
    const promise = retryWithExponentialBackoff(
      () => fetch("https://example.com"),
      5
    );
    await expect(promise).resolves.toBeInstanceOf(Response);
    expect(func).toHaveBeenCalledTimes(6);
    func.mockRestore();
  });
  test("test false", async () => {
    const func = jest
      .spyOn(global, "fetch")
      .mockRejectedValue(new Error("fail"));
    const promise = retryWithExponentialBackoff(
      () => fetch("https://example.com"),
      5
    );
    await expect(promise).rejects.toThrow("fail");
    expect(func).toHaveBeenCalledTimes(6);
    func.mockRestore();
  });
});
