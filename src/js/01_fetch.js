'use strict';
//Declaración de variables
const input = document.querySelector('.js_input');
const butonSearch = document.querySelector('.js_button');
const resultsContainer = document.querySelector('.js_results');

let series = [];

function handleSearch() {
  event.preventDefault();
  let inputValue = input.value.toLowerCase();

  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((allSeries) => {
      series = allSeries;
    });
  console.log(inputValue);
}
//Eventos

butonSearch.addEventListener('click', handleSearch);
