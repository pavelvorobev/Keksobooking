import {mainPin, MAP_INITIAL_COORDS, L} from './map.js';
import {offerForm, mapFiltersForm} from './form.js';


const main = document.querySelector('main');
const messageOnSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const messageOnFailTemplate = document.querySelector('#error').content.querySelector('.error');
const messageOnSuccess = messageOnSuccessTemplate.cloneNode(true);
const messageOnFail = messageOnFailTemplate.cloneNode(true);
const errorButton = messageOnFail.querySelector('.error__button');
const formsResetButton = document.querySelector('.ad-form__reset');

const formsDataReset = () => {
  mainPin.setLatLng(L.latLng(MAP_INITIAL_COORDS.lat, MAP_INITIAL_COORDS.lng));
  mapFiltersForm.reset();
  offerForm.reset();
}

formsResetButton.addEventListener('click', formsDataReset);

const onSuccessFormSubmit = () => {
  main.append(messageOnSuccess);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      messageOnSuccess.remove();
    }
  });
  document.addEventListener('click', () => {
    messageOnSuccess.remove();
  })
}

const onFailFormSubmit = () => {
  main.append(messageOnFail);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      messageOnFail.remove();
    }
  });
  document.addEventListener('click', () => {
    messageOnFail.remove();
  });
  errorButton.addEventListener('click', () => {
    messageOnFail.remove();
  })
}

const setOfferFormSubmit = () => {
  offerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://22.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then(() => {
        formsDataReset();
        onSuccessFormSubmit()
      })
      .catch(() => onFailFormSubmit())
  });
};

setOfferFormSubmit();
