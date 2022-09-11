import { errorMessage } from "./modules/error.js";

const startDate = "start_date=2022-08-01";
const endDate = "end_date=2022-08-10";
const apiKey = "BZLussQS2DFtQcKmh6P5Yagab4TWFSDTqqx8fomU";
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&${startDate}&${endDate}`;
const loader = document.querySelector(".loader");
const selectContainer = document.querySelector(".card-container");

async function fetchApi() {
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (error) {
    loader.style.display = "none";
    selectContainer.innerHTML = errorMessage(error);
    console.log(error);
  }
}

// Skipping all results that does not have an image (some results had a video)
async function createHtml() {
  try {
    const data = await fetchApi();
    loader.style.display = "none";
    for (let i = 0; i < data.length; i++) {
      if (data[i].media_type === "image") {
        selectContainer.innerHTML += `
        <div class="card">
        <img src="${data[i].hdurl}" alt='${data[i].title}'>
        <h2>${data[i].title}</h2>
        <div class="time"> Date: ${data[i].date}</div>
        <a class="details-button" href="details.html?id=${data[i].date}">Learn More</a>
        </div>
      `;
      } else {
        continue;
      }
    }
  } catch (error) {
    loader.style.display = "none";
    selectContainer.innerHTML = errorMessage(error);
    console.log(error);
  }
}
createHtml();
