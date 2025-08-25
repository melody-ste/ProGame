import { API_KEY } from './config.js';
import { PageHeader } from "./components/PageHeader.js";


export const PageList = (argument = '') => {
  let games = [];
  let displayedCount = 9;

  const init = () => {
    renderBase();
    attachEventListeners();
    const searchQuery = argument.trim().replace(/\s+/g, '-');
    fetchGames(searchQuery);
  };

  const renderBase = () => {
    const pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = `
      ${PageHeader()}
      <section class="page-list">
        <div class="controls">
          <select id="platformSelect">
            <option value="">Any</option>
            <option value="pc">PC</option>
            <option value="playstation">PlayStation</option>
            <option value="xbox">Xbox</option>
          </select>
        </div>
        <div class="cards-grid articles">
        </div>
        <button id="showMore">Show more</button>
      </section>
    `;
  };

  const createCard = (game) => {
    return `
      <article class="cardGame">
        <div class="card-inner">
          <div class="card-front">
            <img src="${game.background_image}" alt="${game.name}" class="card-image"/>
            <div class="text-column">
              <h2>${game.name}</h2>
              <h3>${game.platforms.map(p => p.platform.name).join(', ')}</h3>
            </div>
          </div>
          <div class="card-hover">
            <p>Date de sortie : ${game.released}</p>
            <p>Éditeur : ${game.publishers?.map(p => p.name).join(', ') || 'N/A'}</p>
            <p>Genres : ${game.genres.map(g => g.name).join(', ')}</p>
            <p>Note : ${game.rating} (${game.ratings_count} votes)</p>
          </div>
          <button class="details-link" onclick="location.href='#pagedetail/${game.id}'">Voir détail</button>
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
    const pageContent = document.getElementById('pageContent'); // récupéré au moment de l'ajout
    const searchInput = pageContent.querySelector('#searchInput');
    const platformSelect = pageContent.querySelector('#platformSelect');

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().replace(/\s+/g, '-');
      fetchGames(query, platformSelect.value);
    });

    platformSelect.addEventListener('change', () => {
      const query = searchInput.value.trim().replace(/\s+/g, '-');
      fetchGames(query, platformSelect.value);
    });
  };

  const fetchGames = (search = '', platform = '') => {
    const pageContent = document.getElementById('pageContent'); // récupéré ici aussi
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=50`;
    if (search) url += `&search=${search}`;
    if (platform) url += `&platforms=${platform}`;

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
