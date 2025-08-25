import { routes } from './routes.js';
import { PageList } from './PageList.js';
import './styles/main.scss';

console.log("✅ Webpack fonctionne !");

const callRoute = () => {
  const pageContent = document.getElementById('pageContent'); // toujours récupéré au moment de l'appel
  const { hash } = window.location;
  const pathParts = hash.substring(1).split('/');
  const pageName = pathParts[0];
  const pageArgument = pathParts[1] || '';
  const pageFunction = routes[pageName];

  if (pageFunction) pageFunction(pageArgument);
};

// attach events
window.addEventListener('hashchange', callRoute);
window.addEventListener('DOMContentLoaded', callRoute);


if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(['./routes.js', './PageList.js'], () => {
    console.log('[HMR] JS mis à jour');
    callRoute();
  });

  import.meta.webpackHot.accept('./styles/main.scss', () => {
    console.log('[HMR] SCSS mis à jour');
  });
}