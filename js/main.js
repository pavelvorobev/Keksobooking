import './map.js';
import './form.js';
import './submit.js';
import {getPins} from './map.js';

fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((offers) => {
    getPins(offers);
  });


