// 無難なもの
// 選択したら音声が再生される(音声読み上げ)
javascript: (function () {
  var text = document.body.innerText;
  var msg = new SpeechSynthesisUtterance(text);
  msg.lang = "ja-JP";
  window.speechSynthesis.speak(msg);

  alert("音声を停止する際は、この画面をとじてください");
  window.speechSynthesis.cancel();
})();

// create link
// URLをmd形式で取得する
