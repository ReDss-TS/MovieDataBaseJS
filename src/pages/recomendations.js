import View from "../view.js";


const recomendationsNode = document.querySelector('#recomendations');
let items = [];

export default {
  setData(newItems) {
    items = newItems;
  },

  render() {
    recomendationsNode.innerHTML = View.render('recomendations', { films: items });
  }
};
