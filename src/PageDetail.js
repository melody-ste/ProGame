import { API_KEY } from './config.js';
import { PageHeader } from "./components/PageHeader.js";
import { PageFooter } from "./components/Footer.js";

export const PageDetail = (argument) => {
  const pageContent = document.getElementById('pageContent');

  const preparePage = () => {
    const cleanedArgument = argument.trim();

    const displayGame = (gameData) => {
      pageContent.innerHTML = `
        ${PageHeader()}
        <section class="page-detail">
        <img src="${gameData.background_image}" alt="${gameData.name}" class="bg-image"/>
        <button id="checkwebsite">Check Website</button>
        </section>

        <h1 class="title">${gameData.name}</h1>
        <p>${gameData.rating} (${gameData.ratings_count} votes)</p>

        <section class="page-detail">
          <div>
            <h6>Plot</h6>
            <p>${gameData.description}</p>
          </div>
          <div>
            <h6>GamePlay</h6>
            <p></p>
          </div>
        </section>

        <section class="page-four-column">
          <div>
            <h6>Release Date</h6>
            <p>${gameData.released}</p>
          </div>
          <div>
            <h6>Developer</h6>
            <p></p>
          </div>
          <div>
            <h6>Plateforms</h6>
            <p>${gameData.platforms}</p>
          </div>
          <div>
            <h6>Publisher</h6>
            <p>${gameData.publishers}</p>
          </div>
        </section>

        <section class="page-two-column">
          <div>
            <h6>Genre</h6>
            <p>${gameData.genres}</p>
          </div>
          <div>
            <h6>Tages</h6>
            <p></p>
          </div>
        </section>

        <section>
          <h1>BUY</h1>
        </section>

        <section>
          <h1>TRAILER</h1>
        </section>

        <section>
          <h1>SCREENSHOTS</h1>
        </section>

        <section>
          <h1>SIMILAR GAMES</h1>
        </section>

        
        ${PageFooter()}
      `;
    };

    fetch(`https://api.rawg.io/api/games/${cleanedArgument}?key=${API_KEY}`)
      .then(res => res.json())
      .then(data => displayGame(data));
  };

  preparePage();
};
