let up = document.querySelector("#increment");
let down = document.querySelector("#decrement");
let reset = document.querySelector("#reset");
let p = document.querySelector("#counter");
let save = document.querySelector("#save");
let formDiv = document.querySelector("#formDiv");
let formCard = document.querySelector("#formCard");
let mainDiv = document.querySelector("#main");
let inps = document.querySelectorAll("input");
let backgroundColor = document.querySelector("#bg-select");
let buttons = document.querySelectorAll("button");
let buttonColor = document.querySelector("#button-select");
let keyPressed = document.querySelector("#keyPressed");

let timerElement = document.getElementById('timer');
let TIMER_KEY = 'timerEndTime';

(function () {
  let endTime;

  // Check if timer already exists in localStorage
  if (localStorage.getItem(TIMER_KEY)) {
    endTime = parseInt(localStorage.getItem(TIMER_KEY));
  } else {
    // Set new timer for 15 minutes from now
    endTime = Date.now() + (15 * 60 * 1000);
    localStorage.setItem(TIMER_KEY, endTime);
  }

  // IMMEDIATELY update display (yeh line add karo)
  updateDisplay();

  const countdown = setInterval(function () {
    updateDisplay();
  }, 1000);

  function updateDisplay() {
    const now = Date.now();
    const timeLeft = Math.floor((endTime - now) / 1000);

    if (timeLeft <= 0) {
      clearInterval(countdown);
      timerElement.textContent = "Time's up!";
      localStorage.removeItem(TIMER_KEY);
      return;
    }

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerElement.textContent = `Time remaining: ${minutes}:${seconds} min`;
  }
})();

let currCount = Number(p.textContent);

// overlay
let overlay = document.createElement("div");
overlay.classList.add("overlay");

let overlayCard = document.createElement("div");
overlayCard.classList.add("card");
overlayCard.style.width = "300px";
overlayCard.style.borderRadius = "10px";
overlayCard.style.padding = "30px";
overlayCard.style.display = "flex";
overlayCard.style.flexDirection = "column";
overlayCard.style.alignItems = "center";
overlayCard.style.gap = "15px";


let resetLabelWraperDiv = document.createElement("div");
let yesNoButtonWraperDiv = document.createElement("div");


let yesBtn = document.createElement("button");
let noBtn = document.createElement("button");
let closeBtn = document.createElement("button");
let label = document.createElement("label");

yesBtn.textContent = "Yes";
yesBtn.style.marginRight = "30px";
yesBtn.style.color = "red";
yesBtn.style.backgroundColor = "white";

noBtn.textContent = "No";
noBtn.style.color = "red";
noBtn.style.backgroundColor = "white";

closeBtn.textContent = "⨯";
closeBtn.style.display = "flex";
closeBtn.style.color = "red";
closeBtn.style.backgroundColor = "white";

label.textContent = "Reset! Are you sure?";
label.style.color = "Red";
label.style.fontWeight = "bold";
label.style.width = "100%";
label.style.display = "block";
console.dir(label);

resetLabelWraperDiv.appendChild(label);
overlayCard.appendChild(resetLabelWraperDiv);
yesNoButtonWraperDiv.appendChild(yesBtn);
yesNoButtonWraperDiv.appendChild(noBtn);
overlayCard.appendChild(yesNoButtonWraperDiv);
overlay.appendChild(overlayCard);

formCard.appendChild(closeBtn);
formCard.style.flexDirection = "column";
closeBtn.style.marginTop = "20px";

// Counter logic
up.addEventListener("click", () => {
  currCount++;
  p.textContent = currCount;
});
up.addEventListener("mouseover", function () {
  up.style.backgroundColor = "green";
});
up.addEventListener("mouseout", function () {
  up.style.backgroundColor = selectedColor;
});

down.addEventListener("click", () => {
  currCount--;
  p.textContent = currCount;
});
down.addEventListener("mouseover", function () {
  down.style.backgroundColor = "green";
});
down.addEventListener("mouseout", function () {
  down.style.backgroundColor = selectedColor;
});

reset.addEventListener("click", () => {
  document.body.appendChild(overlay);
  localStorage.removeItem(TIMER_KEY);
  location.reload();
});
reset.addEventListener("mouseover", function () {
  reset.style.backgroundColor = "green";
});
reset.addEventListener("mouseout", function () {
  reset.style.backgroundColor = selectedColor;
});

// YES → reset
yesBtn.addEventListener("click", () => {
  currCount = 0;
  p.textContent = currCount;
  overlay.remove();
  recordsContainer.textContent = "";
  recordsContainer.style.display = "none";
});

// NO → cancel
noBtn.addEventListener("click", () => {
  overlay.remove();
});

// Save button → show form
save.addEventListener("click", function () {
  formDiv.hidden = !formDiv.hidden;
});
save.addEventListener("mouseover", function () {
  save.style.backgroundColor = "green";
});
save.addEventListener("mouseout", function () {
  save.style.backgroundColor = selectedColor;
});

// Close button → hide form
closeBtn.addEventListener("click", () => {
  formDiv.hidden = !formDiv.hidden;
  form.reset();
  keyPressed.textContent = "Hey Press Key To See";
});

let form = document.querySelector("form");
let recordsContainer = document.querySelector("#recordsContainer");


form.addEventListener("submit", (dets) => {
  dets.preventDefault();
  let name = form.elements["name"].value.trim() || "Undefined";
  let email = form.elements["email"].value.trim() || "Undefined";

  // Create new card each time
  let recordDiv = document.createElement("div");
  recordDiv.classList.add("savedInfoCard");

  let h2 = document.createElement("h2");
  let h3 = document.createElement("h3");
  let h4 = document.createElement("h4");

  h2.textContent = `Name: ${name}`;
  h3.textContent = `Email: ${email}`;
  h4.textContent = `Count Lap: ${currCount}`;

  recordDiv.appendChild(h2);
  recordDiv.appendChild(h3);
  recordDiv.appendChild(h4);

  // Append inside container instead of body
  recordsContainer.style.display = "flex";
  recordsContainer.appendChild(recordDiv);
  formDiv.hidden = true;
  form.reset();
});

backgroundColor.addEventListener("change", (dets) => {
  mainDiv.style.backgroundColor = dets.target.value;
});

function hexToRgb(hex) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}
function getBrightness(hex) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}
let currentBgColor = "#00FFFF";
backgroundColor.addEventListener("change", (dets) => {
  currentBgColor = dets.target.value;
  [...backgroundColor.options].forEach(opt => opt.disabled = false);
  dets.target.selectedOptions[0].disabled = true;
  mainDiv.style.backgroundColor = currentBgColor;
});

let selectedColor = "black";
buttonColor.addEventListener("change", (dets) => {
  selectedColor = dets.target.value;
  [...buttonColor.options].forEach(opt => opt.disabled = false);
  dets.target.selectedOptions[0].disabled = true;
  buttons.forEach(element => {
    element.style.backgroundColor = selectedColor;

    if (selectedColor === currentBgColor) {
      element.style.color = "red";
    } else if (getBrightness(selectedColor) > 128) {
      element.style.color = "black";
    } else {
      element.style.color = "white";
    }
  });
});

function syncDisabledOptions() {
  [...backgroundColor.options].forEach(opt => opt.disabled = false);
  [...buttonColor.options].forEach(opt => opt.disabled = false);

  // current selected values disable karo
  backgroundColor.options[backgroundColor.selectedIndex].disabled = true;
  buttonColor.options[buttonColor.selectedIndex].disabled = true;
}

// page load pe chalao
syncDisabledOptions();

window.addEventListener("keydown", function (dets) {
  if (dets.key === " ") {
    keyPressed.textContent = "Space";
  } else {
    keyPressed.textContent = dets.key;
  }
});
