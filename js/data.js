import {getPins} from './map.js';
import {mainContent, onMessageEscKeydown, removeMessageElement} from './submit.js';

const messageOnFailGetData = document.querySelector('#error2').content.querySelector('.error').cloneNode(true);
const OFFER_COUNT = 10;

const onFailGetData = () => {
  mainContent.append(messageOnFailGetData);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', removeMessageElement);
};

fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((offers) => {
    /* console.log(offers); */

    getPins(offers.slice(0, OFFER_COUNT));
  })
  .catch(() => onFailGetData());
