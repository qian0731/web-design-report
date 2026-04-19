// 選單資料
async function fetchMenuData() {
  return {
    gender: ["總計", "男", "女"],
    category: ["就業者", "失業率", "勞動力"],
    type: ["統計值", "增減率"]
  };
}

// 地圖數據
async function fetchMapData(filters) {
  console.log("目前篩選條件:", filters);

  return {
    "西屯區": Math.floor(Math.random() * 100),
    "北區": Math.floor(Math.random() * 100),
    "南區": Math.floor(Math.random() * 100)
  };
}