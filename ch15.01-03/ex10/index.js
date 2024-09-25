document.addEventListener("DOMContentLoaded", () => {
  const divElement = document.getElementById("editor-front");
  const inputElement = document.getElementById("editor-back");

  divElement.addEventListener("click", () => {
    inputElement.focus();
  });

  inputElement.addEventListener("focus", () => {
    divElement.style.backgroundColor = "rgb(192, 192, 192)";
  });

  inputElement.addEventListener("blur", () => {
    divElement.style.backgroundColor = "rgb(255, 255, 255)";
  });

  inputElement.addEventListener("input", () => {
    divElement.textContent = inputElement.value;
  });
});
