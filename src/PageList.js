import { API_KEY } from './config.js';
import { PageHeader, attachHeaderEvents } from "./components/PageHeader.js";
import { PageFooter } from "./components/Footer.js";

export const PageList = (argument = '') => {
  let games = [];
  let displayedCount = 9;

  const init = () => {
    renderBase();
    attachHeaderEvents();
    attachEventListeners();
    const searchQuery = argument.trim().replace(/\s+/g, '-');
    fetchGames(searchQuery);
  };

  const renderBase = () => {
    const pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = `
      ${PageHeader()}
      <section>
        <h1>Welcome,</h1>
        <p> The Hyper Progame is the world's premier event for computer and video games and related products. At The Hyper Progame, the video game industry's top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brighest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies, groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progam connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented explosure</p>
      </section>
      <section class="page-list">
        <div class="controls">
          <select id="platformSelect">
            <option value="">Platform : Any</option>
            <option value="4">Platform : PC</option>
            <option value="187">Platform : PlayStation 5</option>
            <option value="1">Platform : Xbox One</option>
          </select>
        </div>
        <div class="cards-grid articles">
        </div>
        <button id="showMore">Show more</button>
      </section>
      ${PageFooter()}
    `;
  };

  const createCard = (game) => {
    return `
      <article class="cardGame" onclick="location.href='#pagedetail/${game.id}'">
        <div class="card-inner">
          <div class="card-front">
            <img src="${game.background_image}" alt="${game.name}" class="card-image"/>
            <div>
              <h2>${game.name}</h2>
              <h3>${game.platforms.map(p => p.platform.name).join(', ')}</h3>
            </div>
          </div>
          <div class="card-hover">
            <p>${game.released}</p>
            <p>${game.publishers?.map(p => p.name).join(', ') || 'N/A'}</p>
            <p>${game.genres.map(g => g.name).join(', ')}</p>
            <p>${game.rating} (${game.ratings_count} votes)</p>
          </div>
        </div>
      </article>
    `;
  };

  const displayResults = () => {
    const pageContent = document.getElementById('pageContent'); 
    const articlesContainer = pageContent.querySelector('.articles');
    articlesContainer.innerHTML = games
      .slice(0, displayedCount)
      .map(createCard)
      .join('');

    const showMoreBtn = pageContent.querySelector('#showMore');
    if (displayedCount >= games.length || displayedCount >= 27) {
      showMoreBtn.style.display = 'none';
    } else {
      showMoreBtn.style.display = 'block';
      showMoreBtn.onclick = () => {
        displayedCount += 9;
        displayResults();
      };
    }
  };

  const attachEventListeners = () => {
    const pageContent = document.getElementById('pageContent');
    const searchInput = pageContent.querySelector('#searchInput');
    const platformSelect = pageContent.querySelector('#platformSelect');

    const updateGames = () => {
      const query = searchInput.value.trim().replace(/\s+/g, '-');
      fetchGames(query, platformSelect.value, developerSelect.value, publisherSelect.value);
    };

    if (searchInput) searchInput.addEventListener('input', updateGames);
    if (platformSelect) platformSelect.addEventListener('change', updateGames);
  };

  const fetchGames = (search = '', platform = '', developer = '', publisher = '') => {
    const pageContent = document.getElementById('pageContent');
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=50`;
    if (search) url += `&search=${search}`;
    if (platform) url += `&platforms=${platform}`;
    if (developer) url += `&developers=${developer}`;
    if (publisher) url += `&publishers=${publisher}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        games = data.results;
        displayedCount = 9;
        displayResults();
      })
      .catch(err => {
        console.error('Erreur fetch RAWG :', err);
        pageContent.querySelector('.articles').innerHTML = '<p>Impossible de charger les jeux.</p>';
      });
  };

  init();
};
