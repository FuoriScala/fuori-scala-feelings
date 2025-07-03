// Funzione per prendere parametri URL
function getParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}
