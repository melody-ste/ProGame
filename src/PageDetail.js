import { API_KEY } from './config.js';

export const PageDetail = (argument) => {
  const pageContent = document.getElementById('pageContent');

  const preparePage = () => {
    const cleanedArgument = argument.trim();

    const displayGame = (gameData) => {
      pageContent.innerHTML = `
        <section class="page-detail">
          <h1>${gameData.name}</h1>
          <p>${gameData.released}</p>
          <p>${gameData.description}</p>
        </section>
      `;
    };

    fetch(`https://api.rawg.io/api/games/${cleanedArgument}?key=${API_KEY}`)
      .then(res => res.json())
      .then(data => displayGame(data));
  };

  preparePage();
};
