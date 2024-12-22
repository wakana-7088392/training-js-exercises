// ログインなどの認証でエラーが発生した際に使用する
class AuthenticationError extends Error {
  navigation: string;
  constructor(message: string, navigation: string = "") {
    super(`${message}  ${navigation}`);
    this.navigation = navigation;
  }
  get name() {
    return "AuthenticationError";
  }
}

function test1() {
  throw new AuthenticationError("認証に失敗しました");
}

try {
  test1();
} catch (e: any) {
  console.log(e.message); // 認証に失敗しました
  console.log(e.name); //AuthenticationError
  console.log(e.stack); // AuthenticationError: 認証に失敗しました …(以下略)
}

function test2() {
  throw new AuthenticationError(
    "認証に失敗しました",
    "パスワードの再発行をしますか？"
  );
}

try {
  test2();
} catch (e: any) {
  console.log(e.message); // 認証に失敗しました パスワードの再発行をしますか？
  console.log(e.name); //AuthenticationError
  console.log(e.stack); // AuthenticationError: 認証に失敗しました パスワードの再発行をしますか？ …(以下略)
}
