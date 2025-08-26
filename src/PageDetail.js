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
        <button id="checkwebsite">
            <a href="${gameData.website}" target="_blank">Check Website</a>
          </button>
        </section>

        <div class="page-d-title">
          <h1>${gameData.name}</h1>
          <p class="rating">${gameData.rating}/5 -${gameData.ratings_count} votes</p>
        </div>

        <section class="page-detail">
          <div>
            <p><strong>Plot</strong></p>
            <p>${gameData.description}</p>
          </div>
          <div>
            <p><strong>GamePlay</strong></p>
            <p></p>
          </div>
        </section>

        <section class="page-four-column">
          <div>
            <p><strong>Release Date</strong></p>
            <p>${gameData.released}</p>
          </div>
          <div>
            <p><strong>Developer</strong></p>
            <p></p>
          </div>
          <div>
            <p><strong>Plateforms</strong></p>
            <p>${gameData.platforms.map(p => p.platform.name).join(', ')}</p>
          </div>
          <div>
            <p><strong>Publisher</strong></p>
            <p>${gameData.publishers?.map(p => p.name).join(', ') || 'N/A'}</p>
          </div>
        </section>

        <section class="page-two-column">
          <div>
            <p><strong>Genre</strong></p>
            <p>${gameData.genres.map(g => g.name).join(', ')}</p>
          </div>
          <div>
            <p><strong>Tags</strong></p>
            <p>${gameData.tags.map(t => t.name).join(', ')}</p>
          </div>
        </section>

        <section>
          <h1 class="titles">BUY</h1>
        </section>

        <section>
          <h1 class="titles">TRAILER</h1>
        </section>

        <section>
          <h1 class="titles">SCREENSHOTS</h1>
        </section>

        <section>
          <h1 class="titles">SIMILAR GAMES</h1>
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
