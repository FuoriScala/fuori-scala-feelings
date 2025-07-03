// Sostituisci con il tuo endpoint reale da SheetDB
const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/m9769bwpvfaga';

// Elementi DOM
const bubble = document.getElementById('emotionBubble');
const materialSpan = document.getElementById('material');
const colorSpan = document.getElementById('color');
const emotionSpan = document.getElementById('emotion');
const form = document.getElementById('saveForm');
const qrSection = document.getElementById('qrSection');
const qrCanvas = document.getElementById('qrCanvas');

let currentData = {};

// Funzione: genera ID unico
function generateId(name) {
  const date = new Date().toISOString().replace(/[-:.]/g, '');
  const cleanName = name ? name.trim().toLowerCase().replace(/\s+/g, '_') : 'anonimo';
  return `${cleanName}_${date}`;
}

// Funzione: visualizza i dati sulla pagina
function displayData(data) {
  bubble.style.background = `linear-gradient(270deg, ${data.color}, #00f2fe, ${data.color})`;
  materialSpan.textContent = data.material;
  colorSpan.textContent = data.color;
  emotionSpan.textContent = data.emotion;
  bubble.textContent = data.emotion;
}

// Funzione: leggi dati da URL
function loadData() {
  const urlParams = new URLSearchParams(window.location.search);
  const material = urlParams.get('material') || 'juta';
  const color = urlParams.get('color') || '#C19A6B';
  const emotion = urlParams.get('emotion') || 'calma';

  currentData = { material, color, emotion };
  displayData(currentData);
}

// Funzione: invia dati a SheetDB
function saveData(data) {
  fetch(SHEETDB_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  })
    .then(response => {
      if (!response.ok) throw new Error('Errore salvataggio');
      return response.json();
    })
    .then(json => {
      console.log('Dati salvati:', json);
    })
    .catch(error => {
      console.error('Errore:', error);
    });
}

// Funzione: genera QR code
function generateQR(url) {
  const qr = new QRious({
    element: qrCanvas,
    value: url,
    size: 200,
  });
  qrSection.classList.add('visible');
}

// Gestione invio form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value || 'anonimo';
  const thought = form.thought.value || '';
  const id = generateId(name);

  const payload = {
    timestamp: new Date().toISOString(),
    material: currentData.material,
    color: currentData.color,
    emotion: currentData.emotion,
    thought,
    name,
    id,
  };

  // Salva su SheetDB
  saveData(payload);

  // Genera URL con dati e QR code
  const url = `${window.location.origin}${window.location.pathname}?material=${encodeURIComponent(currentData.material)}&color=${encodeURIComponent(currentData.color)}&emotion=${encodeURIComponent(currentData.emotion)}&id=${encodeURIComponent(id)}`;
  generateQR(url);
});

// Avvia caricamento dati
loadData();
