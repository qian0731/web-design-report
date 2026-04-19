function renderSelect(id, items) {
  const select = document.getElementById(id);
  select.innerHTML = "";

  items.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item;
    opt.textContent = item;
    select.appendChild(opt);
  });
}

// 取得目前選單值
function getFilters() {
  return {
    gender: document.getElementById("gender").value,
    category: document.getElementById("category").value,
    type: document.getElementById("type").value
  };
}