document.addEventListener("DOMContentLoaded", () => {
  const naviData = {
    登録日: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
    あなたが使用しているもの: navigator.userAgent,
  };

  const table = document
    .getElementById("navigator-table")
    .getElementsByTagName("tbody")[0];

  for (let key in naviData) {
    let row = table.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.textContent = key;
    cell2.textContent = naviData[key];
  }
});

// document.getElementById("date").textContent =
//   new Date().toLocaleDateString + new Date().toLocaleTimeString;
// document.getElementById("userAgent").textContent = navigator.userAgent;
// document.getElementById("connection").textContent = connection.type;
// document.getElementById("latitude").textContent = location["経度"];
// document.getElementById("longitude").textContent = location["緯度"];
