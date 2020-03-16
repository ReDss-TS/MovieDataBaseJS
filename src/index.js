// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import Model from './model.js';
import View from './view.js';
import Router from './router.js';

const headerNode = document.querySelector('#header');
headerNode.innerHTML = View.render('header', {name:"Apiko"});


(async () => {
  try {
    const resultsNode = document.querySelector('#results');
    const tranding = Model.getTranding().then(function(response) {
      resultsNode.innerHTML = View.render('films', { films:JSON.parse(response).results });
    });
    Router.init();
  } catch (e) {
    console.error(e);
    window.alert('Error: ' + e.message);
  }
})();