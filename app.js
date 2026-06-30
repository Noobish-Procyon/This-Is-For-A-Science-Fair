const statusBox = document.getElementById('statusBox');
const statusText = document.getElementById('statusText');
const detailsText = document.getElementById('detailsText');
const alertsList = document.getElementById('alertsList');

// This function is what you'd call when new data comes from the helmet
function updateHelmetData(helmetWorn, motionDetected) {
  const time = Date.now();

  let state = 'safe';
  let message = '';

  if (!helmetWorn && motionDetected) {
    state = 'danger';
    message = 'ALERT: Helmet is NOT worn and motion is detected!';
    addAlert('Helmet not worn while moving at ' + new Date(time).toLocaleTimeString());
    playWarningSound();
  } else if (!helmetWorn) {
    state = 'warning';
    message = 'Warning: Helmet is NOT worn.';
  } else if (helmetWorn && motionDetected) {
    state = 'safe';
    message = 'Helmet is worn. Child is moving.';
  } else {
    state = 'safe';
    message = 'Helmet is worn. Child appears safe.';
  }

  statusBox.className = 'status ' + state;
  statusText.textContent = message;
  detailsText.textContent =
    `Helmet worn: ${helmetWorn} | Motion: ${motionDetected} | Last update: ${new Date(time).toLocaleString()}`;
}

function addAlert(text) {
  const li = document.createElement('li');
  li.textContent = text;
  alertsList.prepend(li);
}

function playWarningSound() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(900, audioCtx.currentTime);
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  setTimeout(() => oscillator.stop(), 400);
}

// Initial fake data so it doesn't say "Loading..."
updateHelmetData(true, false);
