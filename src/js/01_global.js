'use strict';

//Declaración de variables globales////////////////

const input = document.querySelector('.js_input');
const butonSearch = document.querySelector('.js_button');
const resultsContainer = document.querySelector('.js_results');

const imageDefautl =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let globalData = [];
let favorites = [];

//FETCH  con llamada a pintar los li////////////////

function handleSearch(event) {
  event.preventDefault();
  let inputValue = input.value.toLowerCase();

  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      globalData = data;
      paintInput();
    });
  console.log(inputValue);
}

// PINTAR los li con id, imagen y nombre//////////////////////

function paintInput() {
  for (const data of globalData) {
    if (data.show.image === null) {
      resultsContainer.innerHTML += ` <li class = "results__list js_list" id = "${data.show.id}"><img src="${imageDefautl} "alt=""/><h2 class = "results__name">${data.show.name}</h2></li>`;
    } else {
      resultsContainer.innerHTML += ` <li class = "results__list js_list" id = "${data.show.id}"><img src="${data.show.image.medium} "alt=""/><h2 class = "results__name">${data.show.name}</h2></li>`;
    }
  }
  listenListResults();
}

// FAVORITOS //////////////

// Añadir clase a elemento del listado de resultados que se seleccione

function handleListResults(event) {
  const selectedShow = parseInt(event.currentTarget.id);
  const clickedShow = globalData.find((data) => {
    return data.show.id === selectedShow;
  });

  // si devuelve -1 no esta selecionado, si no devuelve la posición

  const favoritesCheck = favorites.findIndex((favorite) => {
    return favorite.show.id === selectedShow;
  });
  if (favoritesCheck === -1) {
    favorites.push(clickedShow);
  } else {
    favorites.splice(favoritesCheck, 1);
  }

  event.currentTarget.classList.toggle('selected');
}

// Recoger todos los li de los resultados con evento sobre li que se pulse

function listenListResults() {
  const listResults = document.querySelectorAll('.js_list');
  for (const resultEl of listResults) {
    resultEl.addEventListener('click', handleListResults);
  }
}

// Evento búsqueda de series ////////////////

butonSearch.addEventListener('click', handleSearch);
