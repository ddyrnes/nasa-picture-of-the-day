import { errorMessage } from "./modules/error.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const apiKey = "BZLussQS2DFtQcKmh6P5Yagab4TWFSDTqqx8fomU";
const date = `date=${id}`;
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&${date}`;
const loader = document.querySelector(".loader");

const descriptionContainer = document.querySelector(".description-container");

async function getApi() {
  try {
    const response = await fetch(url);
    const results = await response.json();
    createHtml(results);
  } catch (error) {
    loader.style.display = "none";
    descriptionContainer.innerHTML = errorMessage(error);
    console.log(error);
  }
}
getApi();

function createHtml(results) {
  loader.style.display = "none";
  document.title = `${results.title}`;
  descriptionContainer.innerHTML = `
  <div class="card card-details">
  <img class="image-details" src="${results.hdurl}" alt='${results.title}'>
  <div class="text-details">
  <h2> ${results.title}</h2>
  <p>${results.explanation}</p>
  <div class="time"> Date: ${results.date}</div>
  <a class="back-button" href="index.html">Back</a>
  </div>
  </div>
  `;
}
