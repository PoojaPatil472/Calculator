const display = document.getElementById("display");
const resultDiv = document.getElementById("live-result");
const historyList = document.getElementById("history");
const themeToggle = document.getElementById("theme-toggle");

let lastSavedExpression = "";

function appendValue(value) {
  display.value += value;
  liveCalculate();
}
function applyFunction(funcName) {
  if (display.value.trim() === "") return;

  try {
    const expression = `${funcName}(${display.value})`;
    const result = eval(expression);
    addToHistory(`${funcName}(${display.value}) = ${result}`);
    display.value = result;
    resultDiv.textContent = "";
    lastSavedExpression = result;
  } catch {
    alert("Invalid input for function");
  }
}


function clearDisplay() {
  display.value = "";
  resultDiv.textContent = "";
  lastSavedExpression = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
  liveCalculate();
}

function calculateResult() {
  try {
    const result = eval(display.value);
    addToHistory(`${display.value} = ${result}`);
    display.value = result;
    resultDiv.textContent = "";
    lastSavedExpression = result;
  } catch {
    // do nothing
  }
}

function liveCalculate() {
  try {
    if (display.value.trim() === "") {
      resultDiv.textContent = "";
      return;
    }
    const result = eval(display.value);
    resultDiv.textContent = `= ${result}`;
    if (display.value !== lastSavedExpression) {
      addToHistory(`${display.value} = ${result}`);
      lastSavedExpression = display.value;
    }
  } catch {
    resultDiv.textContent = "";
  }
}

function addToHistory(entry) {
  const li = document.createElement("li");
  li.textContent = entry;
  historyList.prepend(li);
}

themeToggle.onclick = () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
};

document.addEventListener("keydown", (e) => {
  if (e.key.match(/[0-9+\-*/%.]/)) {
    appendValue(e.key);
    e.preventDefault();
  } else if (e.key === "Enter") {
    calculateResult();
    e.preventDefault();
  } else if (e.key === "Backspace") {
    deleteLast();
    e.preventDefault();
  } else if (e.key === "Escape") {
    clearDisplay();
    e.preventDefault();
  }
});
