import Model from './model.js';
import trandingPage from './pages/tranding.js';
import filmsPage from './pages/films.js';
import filmPage from './pages/film.js';
import recomendationsPage from './pages/recomendations.js';
import searchPage from './pages/search.js';

const url = document.querySelector('[data-role=nav-tranding]');

const trandingNavNode = document.querySelector('[data-role=nav-tranding]');
const filmsNavNode = document.querySelector('[data-role=nav-films]');
const searchNavNode = document.querySelector('[data-role=nav-search]');

let activeNavNode;

function setActiveNavNode(node) {
  if (activeNavNode) {
    activeNavNode.classList.remove('active');
  }

  activeNavNode = node;
  activeNavNode.classList.add('active');
}

export default {
  async trandingRoute(params) {
      const tranding = await Model.getTranding().then(function(response) {
        trandingPage.setData(JSON.parse(response).results);
        trandingPage.render();
      });
      setActiveNavNode(trandingNavNode);
  },
  async filmsRoute(params) {
      if (params.id) {
        const films = await Model.getById(
            params.id
          ).then(function(response) {
          filmPage.setData(JSON.parse(response));
          filmPage.render();
        });
        const recomendations = await Model.getRecomendationById(
            params.id
          ).then(function(response) {
          recomendationsPage.setData(JSON.parse(response).results);
          recomendationsPage.render();
        });
      } else {
        const films = await Model.getTopRated().then(function(response) {
          filmsPage.setData(JSON.parse(response).results);
          filmsPage.render();
        });
        setActiveNavNode(filmsNavNode);
      }
  },
  async searchRoute(params) {
      const searchValue = document.getElementById("searchInput").value;

      if (searchValue) {
        const hash = window.location.hash;
        window.history.replaceState(null, null, hash + "/" + searchValue);
        params.id = searchValue;
      }

      if (params.id) {
        console.log(params);
        const search = await Model.getByQuery(params.id).then(function(response) {
          searchPage.setData(JSON.parse(response).results);
          searchPage.render();
        });
      } else {
        alert("Set search parameter, please!");
        filmsPage.render();
      }  
  }
};
