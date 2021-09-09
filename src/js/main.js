'use strict';

//Declaración de variables globales////////////////

const input = document.querySelector('.js_input');
const butonSearch = document.querySelector('.js_button');
const resultsContainer = document.querySelector('.js_results');

//let series = [];

//FETCH ////////////////

function handleSearch() {
  event.preventDefault();
  let inputValue = input.value.toLowerCase();

  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((globalData) => {
      for (const data of globalData) {
        resultsContainer.innerHTML += ` <li id = "${data.show.id}">
  <img
    src="${data.show.image.medium}"
    alt=""
  />
  <h2>${data.show.name}</h2>
</li>`;
      }
    });
  console.log(inputValue);
}

// PINTAR EN HTML ////////////////

//Eventos ////////////////

butonSearch.addEventListener('click', handleSearch);
