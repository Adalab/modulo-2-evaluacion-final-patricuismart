'use strict';

//Declaración de variables globales////////////////
const butonReset = document.querySelector('.js_reset');

// BOTÓN RESEST ///////////////

function handleReset() {
  location.reload();
}

//Eventos ///////////////

butonReset.addEventListener('click', handleReset);