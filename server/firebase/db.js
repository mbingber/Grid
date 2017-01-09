const firebase = require('firebase');

const config = {
  apiKey: "AIzaSyDYpFnmJwriO6pznGuh4zQz-LSefgiSiLg",
  authDomain: "power-grid-97de2.firebaseapp.com",
  databaseURL: "https://power-grid-97de2.firebaseio.com",
  storageBucket: "power-grid-97de2.appspot.com",
  messagingSenderId: "708415010778"
};

firebase.initializeApp(config);

module.exports = firebase.database();