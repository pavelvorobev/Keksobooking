import {renderPins} from './map.js';
import {mainContent, onMessageEscKeydown, removeMessageElement} from './submit.js';
import {mapFiltersForm, toggleDisabledOnFilterFormNodes} from './form.js';
import {filterOffers} from './filter.js';

const messageOnFailGetData = document.querySelector('#error2').content.querySelector('.error').cloneNode(true);
const URL_FOR_GET_OFFERS = 'https://22.javascript.pages.academy/keksobooking/data';
const OFFER_COUNT = 10;

const onFailGetData = () => {
  mainContent.append(messageOnFailGetData);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', removeMessageElement);
};

fetch(URL_FOR_GET_OFFERS)
  .then((response) => response.json())
  .then((offers) => {
    offers = offers.slice(0, OFFER_COUNT)
    renderPins(offers);
    toggleDisabledOnFilterFormNodes();
    mapFiltersForm.addEventListener('change', () => {
      filterOffers(offers);
    });
  })
  .catch(() => onFailGetData());

export {OFFER_COUNT};
