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
//botón rest
const butonReset = document.querySelector('.js_reset');
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

  //event.currentTarget.classList.toggle('selected');

  //guardo en LS
  setLocalStorage();

  // LLamada a función pintar favoritos
  paintFavorites();

  // Rellamada a pintar resultados
  paintInput();
}

//Me traigo todos los resultados y escucho evento

function listenListResults() {
  const listResults = document.querySelectorAll('.js_list');
  for (const resultEl of listResults) {
    resultEl.addEventListener('click', handleListResults);
  }
}

// Funcion que busca si ya estaba en favoritos o no

function isFavorite(data) {
  const findFavorite = favorites.find((fav) => {
    return fav.show.id === data.show.id;
  });
  // si retorna undefine el elemento no es favorito = false

  if (findFavorite === undefined) {
    return false;

    // si lo encuentra retorna true
  } else {
    return true;
  }
}
// PINTAR

// PINTAR si son favoritos //////////////////////

function paintInput() {
  let html = '';
  let favClass = '';

  // Si ya era favorito(true) le añado la clase selected, si no (false), no le añado clase

  for (const data of globalData) {
    const isFav = isFavorite(data);
    if (isFav === true) {
      favClass = 'selected';
    } else {
      favClass = '';
    }

    // si la serie no tiene imagen
    if (data.show.image === null) {
      html += `<li class = "results__list js_list ${favClass}" id = "${data.show.id}">`;
      html += `<img class = "results__img" src="${imageDefautl} "alt=""/>`;
      html += `<h2 class = "results__name">${data.show.name}</h2>`;
      html += `</li>`;
    } else {
      html += `<li class = "results__list js_list ${favClass}" id = "${data.show.id}">`;
      html += `<img class = "results__img" src="${data.show.image.medium} "alt=""/>`;
      html += `<h2 class = "results__name">${data.show.name}</h2>`;
      html += `</li>`;
    }
    resultsContainer.innerHTML = html;
  }
  listenListResults();
}

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
  paintInput();
}

function listenListFavResults() {
  const listFavResults = document.querySelectorAll('.js_list');
  for (const resultFavEl of listFavResults)
    resultFavEl.addEventListener('click', handleListFavResults);
}

//Función para pintar series en columna favoritas

function paintFavorites() {
  let html2 = '';
  for (const favorite of favorites) {
    if (favorite.show.image === null) {
      html2 += `<li class = "favorites__list js_list" id = "${favorite.show.id}">`;
      html2 += `<img class="favorites__img" src="${imageDefautl}"alt=""/>`;
      html2 += `<h2 class = "favorites__name">${favorite.show.name}></h2>`;
      html2 += `</li>`;
    } else {
      html2 += `<li class = "favorites__list js_list" id = "${favorite.show.id}">`;
      html2 += `<img class="favorites__img" src="${favorite.show.image.medium} "alt=""/>`;
      html2 += `<h2 class = "favorites__name">${favorite.show.name}></h2>`;
      html2 += `</li>`;
    }
  }
  // Pinto el html

  favoritesContainer.innerHTML = html2;

  // guardo series favoritas en LS
  setLocalStorage();
}

//LOCAL STORAGE  almacenamiento de favoritos al recagar página/////////

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

// RESET ///////

function handleReset(event) {
  event.preventDefault();
  //vaciamos el array de favoritos
  favorites = [];
  //limpiamos LocalStorage
  localStorage.clear();
  //recargar la página después de borrar
  location.reload();
}

// Evento búsqueda de series ////////////////

butonSearch.addEventListener('click', handleSearch);

// Evento Reset ////////////////

butonReset.addEventListener('click', handleReset);
