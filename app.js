// -----------------------------
// ACCOUNT SYSTEM (LOCALSTORAGE + REMEMBER ME)
// -----------------------------

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    showMessage("Please enter email and password");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[email]) {
    showMessage("Account already exists");
    return;
  }

  users[email] = { password };
  localStorage.setItem("users", JSON.stringify(users));

  showMessage("Account created! You can log in now.");
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const remember = document.getElementById("rememberMe").checked;

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!users[email]) {
    showMessage("Account does not exist");
    return;
  }

  if (users[email].password !== password) {
    showMessage("Incorrect password");
    return;
  }

  if (remember) {
    localStorage.setItem("loggedInUser", email);
  } else {
    sessionStorage.setItem("loggedInUser", email);
  }

  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("loggedInUser");
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

function showMessage(msg) {
  document.getElementById("loginMessage").textContent = msg;
}

// Redirect if not logged in
if (window.location.pathname.includes("index.html")) {
  const user = localStorage.getItem("loggedInUser") ||
               sessionStorage.getItem("loggedInUser");

  if (!user) window.location.href = "login.html";
}

// -----------------------------
// HELMET DASHBOARD LOGIC
// -----------------------------
function updateHelmetData(helmetWorn, motionDetected) {
  const statusBox = document.getElementById('statusBox');
  const statusText = document.getElementById('statusText');
  const detailsText = document.getElementById('detailsText');

  const time = Date.now();
  let state = 'safe';
  let message = '';

  if (!helmetWorn && motionDetected) {
    state = 'danger';
    message = 'ALERT: Helmet is NOT worn and motion is detected!';
    addAlert('Helmet not worn while moving at ' + new Date(time).toLocaleTimeString());
  } else if (!helmetWorn) {
    state = 'warning';
    message = 'Warning: Helmet is NOT worn.';
  } else {
    message = 'Helmet is worn. Child appears safe.';
  }

  statusBox.className = 'status ' + state;
  statusText.textContent = message;

  // Update description box
  detailsText.textContent =
    `Helmet worn: ${helmetWorn} | Motion: ${motionDetected} | Last update: ${new Date(time).toLocaleString()}`;
}

function addAlert(text) {
  const alertsList = document.getElementById('alertsList');
  const li = document.createElement('li');
  li.textContent = text;
  alertsList.prepend(li);
}

// -----------------------------
// SIMULATION BUTTONS
// -----------------------------

function simulateHelmetSafe() {
  updateHelmetData(true, false);
}

function simulateHelmetWarning() {
  updateHelmetData(false, false);
}

function simulateHelmetDanger() {
  updateHelmetData(false, true);
}
