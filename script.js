// Inserisci qui il tuo endpoint SheetDB
const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/m9769bwpvfaga';

const bubble = document.getElementById('emotionBubble');
const materialSpan = document.getElementById('material');
const colorSpan = document.getElementById('color');
const emotionSpan = document.getElementById('emotion');
const form = document.getElementById('saveForm');
const qrSection = document.getElementById('qrSection');
const qrCanvas = document.getElementById('qrCanvas');

let currentData = {};

function generateId(name) {
  const date = new Date().toISOString().replace(/[-:.]/g, '');
  const cleanName = name ? name.trim().toLowerCase().replace(/\s+/g, '_') : 'anonimo';
  return `${cleanName}_${date}`;
}

function displayData(data) {
  bubble.style.background = `linear-gradient(270deg, ${data.color}, #00f2fe, ${data.color})`;
  bubble.textContent = data.emotion;

  materialSpan.textContent = data.material;
  colorSpan.textContent = data.color;
  emotionSpan.textContent = data.emotion;

  const descriptions = {
    'Gioia': {
      title: 'Giallo – Gioia',
      text: 'Luminoso, solare, energizzante. Stimola creatività e allegria.'
    },
    'Tristezza': {
      title: 'Blu – Tristezza',
      text: 'Profondo, calmo, introspettivo. Richiama la riflessione e la malinconia.'
    },
    'Rabbia': {
      title: 'Rosso – Rabbia',
      text: 'Intenso, passionale, forte. Colore del fuoco e delle emozioni impulsive.'
    },
    'Paura': {
      title: 'Nero – Paura',
      text: 'Scuro, misterioso, protettivo. Spesso legato all\'incertezza o all\'ignoto.'
    },
    'Serenità': {
      title: 'Verde – Serenità',
      text: 'Naturale, rilassante, equilibrato. Simbolo di calma e rinascita.'
    },
    'Amore': {
      title: 'Rosa – Amore',
      text: 'Dolce, accogliente, emotivo. Rappresenta affetto e tenerezza.'
    }
  };

  const desc = descriptions[data.emotion] || {
    title: 'Emozione sconosciuta',
    text: 'Descrizione non disponibile.'
  };

  document.getElementById('emotionTitle').textContent = desc.title;
  document.getElementById('emotionText').textContent = desc.text;
}

function loadData() {
  const urlParams = new URLSearchParams(window.location.search);
  const material = urlParams.get('material') || 'juta';
  const emotion = urlParams.get('emotion') || 'Serenità';

  const emotionColors = {
    'Gioia': '#FFD700',
    'Tristezza': '#4682B4',
    'Rabbia': '#DC143C',
    'Paura': '#000000',
    'Serenità': '#3CB371',
    'Amore': '#FF69B4'
  };

  const color = emotionColors[emotion] || '#CCCCCC';

  currentData = { material, color, emotion };
  displayData(currentData);
}

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

function generateQR(url) {
  const qr = new QRious({
    element: qrCanvas,
    value: url,
    size: 200,
  });
  qrSection.classList.add('visible');
}

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

  saveData(payload);

  const url = `${window.location.origin}${window.location.pathname}?material=${encodeURIComponent(currentData.material)}&emotion=${encodeURIComponent(currentData.emotion)}&id=${encodeURIComponent(id)}`;
  generateQR(url);
});

loadData();
