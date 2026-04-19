let map;
let infoWindow;

// 模擬資料（你之後可以換成主計處）
let stats = {
  "台北市": { value: 100 },
  "台中市": { value: 80 },
  "台東縣": { value: 30 }
};

// 勾選狀態
let selected = {
  "台北市": true,
  "台中市": true,
  "台東縣": true
};

function initMap() {

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 23.8, lng: 121 },
    zoom: 7
  });

  infoWindow = new google.maps.InfoWindow();

  map.data.loadGeoJson("data/map.geojson");

  // 設定樣式（根據勾選控制顯示🔥）
  map.data.setStyle(function(feature) {

    let name = feature.getProperty("name");

    // ❌ 沒勾選 → 隱藏
    if (!selected[name]) {
      return { visible: false };
    }

    // ✔ 顯示
    return {
      fillColor: "#66ccff",
      strokeColor: "#333",
      strokeWeight: 1,
      fillOpacity: 0.5,
      visible: true
    };
  });

  // Hover 顯示資料
  map.data.addListener("mouseover", function(event) {

    let name = event.feature.getProperty("name");
    let value = stats[name] ? stats[name].value : "無資料";

    infoWindow.setContent(`
      <b>${name}</b><br>
      數值: ${value}
    `);

    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  map.data.addListener("mouseout", function() {
    infoWindow.close();
  });

  // 綁定勾選框事件🔥
  bindCheckbox("taipei", "台北市");
  bindCheckbox("taichung", "台中市");
  bindCheckbox("taitung", "台東縣");

}

// 控制勾選
function bindCheckbox(id, name) {
  document.getElementById(id).addEventListener("change", function(e) {

    selected[name] = e.target.checked;

    // 重新套用樣式（關鍵🔥）
    map.data.setStyle(map.data.getStyle());
  });
}