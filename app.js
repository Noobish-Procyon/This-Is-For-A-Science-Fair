// -----------------------------
// HELMET DASHBOARD LOGIC
// -----------------------------

function updateHelmetData(helmetWorn, motionDetected) {
  const statusBox = document.getElementById('statusBox');
  const statusText = document.getElementById('statusText');
  const detailsText = document.getElementById('detailsText');
  const alertsList = document.getElementById('alertsList');

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
