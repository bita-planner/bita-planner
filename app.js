
const planner = document.getElementById("planner");
const dateDisplay = document.getElementById("dateDisplay");
const today = new Date().toLocaleDateString();
dateDisplay.innerText = "Today: " + today;

const saveKey = "bitaPlanner_" + today;

function createBlock(i, data) {
  const div = document.createElement("div");
  div.className = "block";

  const start = document.createElement("input");
  start.type = "time";
  start.value = data?.start || "";

  const end = document.createElement("input");
  end.type = "time";
  end.value = data?.end || "";

  const title = document.createElement("input");
  title.type = "text";
  title.placeholder = "Study topic...";
  title.value = data?.title || "";

  start.oninput = end.oninput = title.oninput = () => saveData();

  div.append("Block " + (i + 1) + ": ", start, " - ", end, title);
  planner.appendChild(div);
}

function saveData() {
  const blocks = Array.from(document.querySelectorAll(".block")).map(block => {
    const inputs = block.querySelectorAll("input");
    return {
      start: inputs[0].value,
      end: inputs[1].value,
      title: inputs[2].value,
    };
  });
  localStorage.setItem(saveKey, JSON.stringify(blocks));
}

function clearAll() {
  localStorage.removeItem(saveKey);
  location.reload();
}

function loadPlanner() {
  const saved = localStorage.getItem(saveKey);
  const blocks = saved ? JSON.parse(saved) : Array(10).fill({});
  blocks.forEach((data, i) => createBlock(i, data));
}

loadPlanner();
