'use strict';

//Declaración de variables globales////////////////
//input
const input = document.querySelector('.js_input');
//botón
const butonSearch = document.querySelector('.js_button');
//ul donde se pintan resultados búsqueda
const resultsContainer = document.querySelector('.js_results');
// ul donde se pintan favoritos
const favoritesContainer = document.querySelector('.js_favorites');
//para cuando no hay imagen
const imageDefautl =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

// meter info de (arrays) de las series
let globalData = [];
// meter info de (arrays) de las series favoritas
let favorites = [];

// Recuperamos datos si tenemos series favoritas seleccionadas

if (localStorage.getItem('selected') !== null) {
  getLocalStorage();
}

// funcion búsqueda con llamada a pintar los li////////////////

function handleSearch(event) {
  event.preventDefault();
  let inputValue = input.value.toLowerCase();

  // FETCH /////////////

  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      globalData = data;
      paintInput();
    });
  console.log(inputValue);
}

// PINTAR

// PINTAR si son favoritos //////////////////////

function paintInput() {
  resultsContainer.innerHTML = '';

  // si la serie no tiene imagen
  for (const data of globalData) {
    if (data.show.image === null) {
      resultsContainer.innerHTML += ` <li class = "results__list js_list" id = "${data.show.id}"><img src="${imageDefautl} "alt=""/><h2 class = "results__name">${data.show.name}</h2></li>`;
    } else {
      resultsContainer.innerHTML += ` <li class = "results__list js_list " id = "${data.show.id}"><img src="${data.show.image.medium} "alt=""/><h2 class = "results__name">${data.show.name}</h2></li>`;
    }
  }
  listenListResults();
}

function handleListResults(event) {
  const selectedShow = parseInt(event.currentTarget.id);
  const clickedShow = globalData.find((data) => {
    return data.show.id === selectedShow;
  });

  // si devuelve -1 no esta selecionado, si no devuelve la posición

  const favoritesCheck = favorites.findIndex((data) => {
    return data.show.id === selectedShow;
  });
  if (favoritesCheck === -1) {
    favorites.push(clickedShow);
  } else {
    favorites.splice(favoritesCheck, 1);
  }
  console.log(favoritesCheck);

  console.log(favorites);
  console.log(favoritesCheck);

  // Añadir clase a elemento del listado de resultados que se seleccione

  event.currentTarget.classList.toggle('selected');

  // LLamada a función pintar favoritos

  paintFavorites();
}

//Me traigo todos los resultados y escucho evento

function listenListResults() {
  const listResults = document.querySelectorAll('.js_list');
  for (const resultEl of listResults) {
    resultEl.addEventListener('click', handleListResults);
  }
}
// Evento búsqueda de series ////////////////

butonSearch.addEventListener('click', handleSearch);

////// SERIES FAVORITAS /////

function handleListFavResults(event) {
  debugger;
  const selectedFavShow = parseInt(event.currentTarget.id);
  const clickedFavShow = globalData.find((data) => {
    return data.show.id === selectedFavShow;
  });

  // si devuelve -1 no esta selecionado, si no devuelve la posición

  const favoritesFavCheck = favorites.findIndex((favorite) => {
    return favorite.show.id === selectedFavShow;
  });
  if (favoritesFavCheck === -1) {
    favorites.push(clickedFavShow);
  } else {
    favorites.splice(favoritesFavCheck, 1);
  }
  //guardo en LS
  setLocalStorage();

  //llamada a funciones volver a pintar series y pintar favoritos
  paintFavorites();
  //paintInput();
}

function listenListFavResults() {
  console.log('imin2');
  const listFavResults = document.querySelectorAll('.js_list');
  for (const resultFavEl of listFavResults)
    resultFavEl.addEventListener('click', handleListFavResults);
}

function paintFavorites() {
  let html = '';
  console.log('imin');
  for (const favorite of favorites) {
    if (favorite.show.image === null) {
      html += `<li class = "favorites__list js_list" id = "${favorite.show.id}"><img src="${imageDefautl}"alt=""/><h2 class = "favorites__name">${favorite.show.name}></h2></li>`;
    } else {
      html += `<li class = "favorites__list js_list" id = "${favorite.show.id}"><img src="${favorite.show.image.medium} "alt=""/><h2 class = "favorites__name">${favorite.show.name}></h2></li>`;
    }
  }
  favoritesContainer.innerHTML = html;
  setLocalStorage();
}

//////////////// LOCAL STORAGE /////////

function setLocalStorage() {
  localStorage.setItem('selected', JSON.stringify(favorites));
}

function getLocalStorage() {
  //Se recupera el array de favoritos almacenado en localStorage
  favorites = JSON.parse(localStorage.getItem('selected'));
  //Se pinta favoritos con lo almacenado localStorage
  paintFavorites();
  //Se pintan los resultados
  //paintInput();
}
