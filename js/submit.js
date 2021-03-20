/* global L:readonly */
import {mainPin, MAP_INITIAL_COORDS} from './map.js';
import {offerForm, mapFiltersForm} from './form.js';


const main = document.querySelector('main');
const messageOnSuccess = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const messageOnFail = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = messageOnFail.querySelector('.error__button');
const formsResetButton = document.querySelector('.ad-form__reset');

const onFormsReset = () => {
  mainPin.setLatLng(L.latLng(MAP_INITIAL_COORDS.lat, MAP_INITIAL_COORDS.lng));
  mapFiltersForm.reset();
  offerForm.reset();
  offerForm.address.value = `${MAP_INITIAL_COORDS.lat}, ${MAP_INITIAL_COORDS.lng}`;
  /* console.log(offerForm.address.value);
  value по факту имеет верное значение, но почему-то визуально поле всё равно остаётся пустым */
}

formsResetButton.addEventListener('click', onFormsReset);

const removeMessageElement = () => {
  const modalNode = document.querySelector('.success, .error');

  if (modalNode) {
    modalNode.remove();
    document.removeEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        removeMessageElement();
      }
    });
    document.removeEventListener('click', removeMessageElement);
    errorButton.removeEventListener('click', removeMessageElement);
  }
};

const onSuccessFormSubmit = () => {
  main.append(messageOnSuccess);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      removeMessageElement();
    }
  });
  document.addEventListener('click', removeMessageElement);
};

const onFailFormSubmit = () => {
  main.append(messageOnFail);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      removeMessageElement();
    }
  });
  document.addEventListener('click', removeMessageElement);
  errorButton.addEventListener('click', removeMessageElement);
};

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
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
      .then(handleErrors)
      .then(() => {
        onFormsReset();
        onSuccessFormSubmit()
      })
      .catch(() => onFailFormSubmit())
  });
};

setOfferFormSubmit();
