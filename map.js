var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 23.858987, lng: 120.917631}
  });

  // ✅ 正確路徑（依你的結構）
  map.data.loadGeoJson('data/taichung.geojson');

  // ✅ 顏色分級函式
  function getColor(value) {
    return value > 80 ? '#800026' :
           value > 60 ? '#BD0026' :
           value > 40 ? '#E31A1C' :
           value > 20 ? '#FC4E2A' :
                        '#FEB24C';
  }

  // ✅ 模擬資料（之後可換 API）
  const data = {
    "台北市": 90,
    "台中市": 70,
    "台東縣": 40
  };

  // ✅ 套用樣式（關鍵🔥）
  map.data.setStyle(function(feature) {
    let name = feature.getProperty('COUNTYNAME') || feature.getProperty('name');

    // 🔥 解決 台 / 臺 問題
    name = name.replace('臺', '台');

    const value = data[name] || 0;

    return {
      strokeWeight: 1,
      strokeOpacity: 0.5,
      strokeColor: '#000',
      fillColor: getColor(value),
      fillOpacity: 0.6
    };
  });

  // ✅ hover 效果
  map.data.addListener('mouseover', function(event) {
    map.data.overrideStyle(event.feature, {
      fillOpacity: 1,
      strokeWeight: 2
    });
  });

  map.data.addListener('mouseout', function(event) {
    map.data.revertStyle();
  });

  // ✅ 點擊顯示資訊
  map.data.addListener('click', function(event) {
    let name = event.feature.getProperty('COUNTYNAME') || event.feature.getProperty('name');
    name = name.replace('臺', '台');

    const value = data[name] || 0;

    alert(`${name}：${value}`);
  });
}