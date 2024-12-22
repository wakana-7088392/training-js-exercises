import { retryWithExponentialBackoff } from "./index.ts";

describe("ch11/ex16", () => {
  test("test once", (done) => {
    const mockFunc = jest.fn();
    mockFunc.mockReturnValue(true);
    retryWithExponentialBackoff(mockFunc, 5, (b) => {
      try {
        expect(b).toBe(true);
        expect(mockFunc).toHaveBeenCalledTimes(1);
      } finally {
        done();
      }
    });
  });
  test("test retry 1", (done) => {
    const mockFunc = jest.fn();
    mockFunc.mockReturnValueOnce(false);
    mockFunc.mockReturnValue(true);
    retryWithExponentialBackoff(mockFunc, 5, (b) => {
      try {
        expect(b).toBe(true);
        expect(mockFunc).toHaveBeenCalledTimes(2);
      } finally {
        done();
      }
    });
  });
  test("test retry 6 true", (done) => {
    const mockFunc = jest.fn();
    mockFunc.mockReturnValueOnce(false);
    mockFunc.mockReturnValueOnce(false);
    mockFunc.mockReturnValueOnce(false);
    mockFunc.mockReturnValueOnce(false);
    mockFunc.mockReturnValueOnce(false);
    mockFunc.mockReturnValueOnce(true);
    mockFunc.mockReturnValue(true);
    retryWithExponentialBackoff(mockFunc, 5, (b) => {
      try {
        expect(b).toBe(true);
        expect(mockFunc).toHaveBeenCalledTimes(6);
      } finally {
        done();
      }
    });
  });
  test("test retry 6 false", (done) => {
    const mockFunc = jest.fn();
    mockFunc.mockReturnValueOnce(false);
    mockFunc.mockReturnValueOnce(false);
    mockFunc.mockReturnValueOnce(false);
    mockFunc.mockReturnValueOnce(false);
    mockFunc.mockReturnValueOnce(false);
    mockFunc.mockReturnValueOnce(false);
    mockFunc.mockReturnValue(true);
    retryWithExponentialBackoff(mockFunc, 5, (b) => {
      try {
        expect(b).toBe(false);
        expect(mockFunc).toHaveBeenCalledTimes(6);
      } finally {
        done();
      }
    });
  });
});
