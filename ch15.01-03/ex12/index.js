// 無難なもの
// 入力したキーワードにハイライトをつける
javascript: (function () {
  var keyword = prompt("ハイライトするキーワードを入力してください:");
  if (keyword) {
    var regex = new RegExp("(" + keyword + ")", "gi");
    document.body.innerHTML = document.body.innerHTML.replace(
      regex,
      '<span style="background-color: yellow;">$1</span>'
    );
    alert("キーワードがハイライトされました。");
  } else {
    alert("キーワードが入力されていません。");
  }
})();

// 選択したら音声が再生される(音声読み上げ)
javascript: (function () {
  var text = document.body.innerText;
  var msg = new SpeechSynthesisUtterance(text);
  msg.lang = "ja-JP";
  window.speechSynthesis.speak(msg);

  alert("音声を停止する際は、この画面をとじてください");
  window.speechSynthesis.cancel();
})();
