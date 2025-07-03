// Configurazione Google Apps Script endpoint (modifica con il tuo URL)
const GOOGLE_SHEET_WEB_APP_URL = 'https://script.google.com/macros/s/YOUR_WEB_APP_ID/exec';

const urlParams = new URLSearchParams(window.location.search);

const bubble = document.getElementById('emotionBubble');
const materialSpan = document.getElementById('material');
const colorSpan = document.getElementById('color');
const emotionSpan = document.getElementById('emotion');

const form = document.getElementById('saveForm');
const qrSection = document.getElementById('qrSection');
const qrCanvas = document.getElementById('qrCanvas');

let currentData = {};

// Funzione per generare ID unico
function generateId(name) {
  const date = new Date().toISOString().replace(/[-:.]/g, '');
  const cleanName = name ? name.trim().toLowerCase().replace(/\s+/g, '_') : 'anonimo';
  return `${cleanName}_${date}`;
}

// Funzione per mostrare i dati nella pagina
function displayData(data) {
  bubble.style.background = data.color;
  materialSpan.textContent = data.material;
  colorSpan.textContent = data.color;
  emotionSpan.textContent = data.emotion;
}

// Carica dati da URL
function loadData() {
  if (urlParams.has('material') && urlParams.has('color') && urlParams.has('emotion')) {
    const material = urlParams.get('material');
    const color = urlParams.get('color');
    const emotion = urlParams.get('emotion');
    currentData = { material, color, emotion };
    displayData(currentData);
  } else if (urlParams.has('id')) {
    // Qui si potrebbe implementare il fetch dei dati salvati tramite ID
    // Per ora lasciamo vuoto o con messaggio
    alert('Caricamento da ID non ancora implementato.');
  } else {
    // Valori di default
    currentData = { material: 'juta', color: '#C19A6B', emotion: 'stabilità' };
    displayData(currentData);
  }
}

// Invia dati a Google Sheets
function saveData(data) {
  fetch(GOOGLE_SHEET_WEB_APP_URL, {
    method: 'POST',
    mode: 'no-cors', // evita problemi CORS
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      console.log('Dati salvati con successo.');
    })
    .catch((e) => {
      console.error('Errore nel salvataggio:', e);
    });
}

// Genera QR code
function generateQR(url) {
  const qr = new QRious({
    element: qrCanvas,
    value: url,
    size: 200,
  });
  qrSection.classList.remove('hidden');
}

// Gestore submit form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value || 'anonimo';
  const thought = form.thought.value || '';
  const id = generateId(name);

  const savePayload = {
    timestamp: new Date().toISOString(),
    material: currentData.material,
    color: currentData.color,
    emotion: currentData.emotion,
    thought,
    name,
    id,
  };

  saveData(savePayload);

  const url = `${window.location.origin}${window.location.pathname}?id=${id}`;
  generateQR(url);
});

// Avvio caricamento dati
loadData();
