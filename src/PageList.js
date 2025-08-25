import { API_KEY } from './config.js';

export const PageList = (argument = '') => {
  const pageContent = document.getElementById('pageContent');

  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    const displayResults = (articles) => {
      const resultsContent = articles.map(article => `
        <article class="cardGame">
          <h1>${article.name}</h1>
          <h2>${article.released}</h2>
          <a href="#pagedetail/${article.id}">${article.id}</a>
        </article>
      `);
      pageContent.innerHTML = `<section class="page-list">${resultsContent.join('')}</section>`;
    };

    fetch(`https://api.rawg.io/api/games?key=${API_KEY}${cleanedArgument ? `&search=${cleanedArgument}` : ''}`)
      .then(res => res.json())
      .then(data => displayResults(data.results));
  };

  preparePage();
};
