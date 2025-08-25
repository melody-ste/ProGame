import { routes } from './routes.js';
import './styles/main.scss';

const callRoute = () => {
  const { hash } = window.location;
  const pathParts = hash.substring(1).split('/');
  const pageName = pathParts[0];
  const pageArgument = pathParts[1] || '';
  const pageFunction = routes[pageName];

  if (pageFunction) pageFunction(pageArgument);
};

window.addEventListener('hashchange', callRoute);
window.addEventListener('DOMContentLoaded', callRoute);