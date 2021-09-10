'use strict';

//Declaración de variables globales////////////////

const input = document.querySelector('.js_input');
const butonSearch = document.querySelector('.js_button');
const resultsContainer = document.querySelector('.js_results');

const imageDefautl =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let globalData = [];

//FETCH ////////////////

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

// PAINT //////////////////////

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

//FAVORITOS //////////////

function handleListResults(event) {
  console.log(event.currentTarget.id);
}

function listenListResults() {
  console.log('estoy dentro');
  const listResults = document.querySelectorAll('.js_list');
  for (const resultEl of listResults) {
    resultEl.addEventListener('click', handleListResults);
  }
}

//Eventos ////////////////

butonSearch.addEventListener('click', handleSearch);
