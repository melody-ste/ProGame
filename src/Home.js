import { PageHeader, attachHeaderEvents } from "./components/PageHeader.js";
import { PageList } from './PageList.js';

export const Home = () => {
  const pageContent = document.getElementById('pageContent');
  PageList('');
};
