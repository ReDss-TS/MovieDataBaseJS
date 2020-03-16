import View from "../view.js";


const resultsNode = document.querySelector('#results');
let film = [];

export default {
  setData(newFilm) {
    film = newFilm;
  },

  render() {
    resultsNode.innerHTML = View.render('film', film);
  }
};
