async function main() {
  // 初始化地圖
  initMap();

  // 載入選單
  const menuData = await fetchMenuData();
  renderSelect("gender", menuData.gender);
  renderSelect("category", menuData.category);
  renderSelect("type", menuData.type);

  // 初始載入地圖
  let filters = getFilters();
  let data = await fetchMapData(filters);
  updateMap(data);

  // 綁定選單事件
  document.querySelectorAll("select").forEach(sel => {
    sel.addEventListener("change", async () => {
      const filters = getFilters();
      const data = await fetchMapData(filters);
      updateMap(data);
    });
  });
}

main();