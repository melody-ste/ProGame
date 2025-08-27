import { API_KEY } from './config.js';
import { PageHeader, attachHeaderEvents } from "./components/PageHeader.js";
import { PageFooter } from "./components/Footer.js";

const fetchJsonSafe = (url) => {
  return fetch(url)
    .then(res => res.ok ? res.json() : null)
    .catch(() => null);
};

export const PageDetail = (argument) => {
  const pageContent = document.getElementById('pageContent');
  const cleanedArgument = argument.trim();

  const displaySimilarGames = (similarGamesArray) => {
    const container = document.getElementById("similarGames");
    if (!container || !similarGamesArray) return;

    container.innerHTML = similarGamesArray.slice(0,3).map(game => `
      <article class="cardGame" onclick="location.href='#pagedetail/${game.id}'">
        <div class="card-inner">
          <div class="card-front">
            <img src="${game.background_image || ''}" alt="${game.name}" class="card-image"/>
            <div>
              <h2>${game.name || 'N/A'}</h2>
              <h3>${game.platforms?.map(p => p.platform.name).join(', ') || 'N/A'}</h3>
            </div>
          </div>
          <div class="card-hover">
            <p>Date de sortie : ${game.released || 'N/A'}</p>
            <p>Éditeur : ${game.publishers?.map(p => p.name).join(', ') || 'N/A'}</p>
            <p>Genres : ${game.genres?.map(g => g.name).join(', ') || 'N/A'}</p>
            <p>Note : ${game.rating || 'N/A'} (${game.ratings_count || 0} votes)</p>
          </div>
        </div>
      </article>
    `).join('');
  };

  const preparePage = () => {
    const displayGame = (gameData, trailerData, similarGames, screenshotsData) => {
      pageContent.innerHTML = `
        ${PageHeader()}
        <section class="page-detail">
          <img src="${gameData.background_image || ''}" alt="${gameData.name}" class="bg-image"/>
          ${gameData.website ? `<button id="checkwebsite"><a href="${gameData.website}" target="_blank">Check Website</a></button>` : ''}
        </section>

        <div class="page-d-title">
          <h1>${gameData.name || 'N/A'}</h1>
          <p class="rating">${gameData.rating || 'N/A'}/5 - ${gameData.ratings_count || 0} votes</p>
        </div>

        <section>
          <div>
            <p><strong>Plot</strong></p>
            <p>${gameData.description || 'No description available'}</p>
          </div>
        </section>

        <section class="page-four-column">
          <div>
            <p><strong>Release Date</strong></p>
            <p>${gameData.released || 'N/A'}</p>
          </div>
          <div>
            <p><strong>Developer</strong></p>
            <p>${gameData.developers?.map(d => d.name).join(', ') || "N/A"}</p>
          </div>
          <div>
            <p><strong>Plateforms</strong></p>
            <p>${gameData.platforms?.map(p => p.platform.name).join(', ') || 'N/A'}</p>
          </div>
          <div>
            <p><strong>Publisher</strong></p>
            <p>${gameData.publishers?.map(p => p.name).join(', ') || 'N/A'}</p>
          </div>
        </section>

        <section class="page-two-column">
          <div>
            <p><strong>Genre</strong></p>
            <p>${gameData.genres?.map(g => g.name).join(', ') || 'N/A'}</p>
          </div>
          <div>
            <p><strong>Tags</strong></p>
            <p>${gameData.tags?.map(t => t.name).join(', ') || 'N/A'}</p>
          </div>
        </section>

        <section>
          <h1 class="titles">BUY</h1>
          <ul>
            ${gameData.stores?.map(s => `<li><a href="https://${s.store.domain}" target="_blank">${s.store.name}</a></li>`).join('') || "<p>No store links available</p>"}
          </ul>
        </section>

        <section>
          <h1 class="titles">TRAILER</h1>
          ${trailerData?.results?.length > 0 
            ? `<video controls class="trailer">
                 <source src="${trailerData.results[0].data.max}" type="video/mp4">
               </video>`
            : "<p>No trailer available</p>"
          }
        </section>

        <section>
          <h1 class="titles">SCREENSHOTS</h1>
          <div class="screenshots">
            ${screenshotsData?.results?.length > 0
              ? screenshotsData.results
                  .slice(0, 4) 
                  .map(s => `
                    <img src="${s.image}" alt="screenshot" class="screenshot"/>
                  `).join('')
              : '<p>No screenshots available</p>'
            }
          </div>
        </section>

        <section>
          <h1 class="titles">SIMILAR GAMES</h1>
          <div id="similarGames" class="cards-container"></div>
        </section>

        ${PageFooter()}
      `;

      attachHeaderEvents();

      if (similarGames?.results?.length > 0) {
        displaySimilarGames(similarGames.results);
      } else {
        document.getElementById("similarGames").innerHTML = "<p>No similar games found</p>";
      }
    };
    
    Promise.all([
      fetchJsonSafe(`https://api.rawg.io/api/games/${cleanedArgument}?key=${API_KEY}`),
      fetchJsonSafe(`https://api.rawg.io/api/games/${cleanedArgument}/movies?key=${API_KEY}`),
      fetchJsonSafe(`https://api.rawg.io/api/games/${cleanedArgument}/suggested?key=${API_KEY}`),
      fetchJsonSafe(`https://api.rawg.io/api/games/${cleanedArgument}/screenshots?key=${API_KEY}`)
    ]).then(([gameData, trailerData, similarGames, screenshotsData]) => {
      if (!gameData) return pageContent.innerHTML = "<p>Impossible de charger les informations du jeu.</p>";
      displayGame(gameData, trailerData, similarGames, screenshotsData);
    });
  };

  preparePage();
};
