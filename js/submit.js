/* global L:readonly */
import {mainPin, MAP_INITIAL_COORDS} from './map.js';
import {offerForm, mapFiltersForm} from './form.js';


const mainContent = document.querySelector('main');
const messageOnSuccess = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const messageOnFail = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = messageOnFail.querySelector('.error__button');
const formsResetButton = document.querySelector('.ad-form__reset');

const URL_FOR_SEND_DATA = 'https://22.javascript.pages.academy/keksobooking';

const onFormsReset = () => {
  mainPin.setLatLng(L.latLng(MAP_INITIAL_COORDS.lat, MAP_INITIAL_COORDS.lng));
  mapFiltersForm.reset();

  mapFiltersForm.dispatchEvent(new Event('change'));
  offerForm.reset();
  offerForm.address.value = `${MAP_INITIAL_COORDS.lat}, ${MAP_INITIAL_COORDS.lng}`;
}

formsResetButton.addEventListener('click', onFormsReset);

const onMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    removeMessageElement();
  }
};

const removeMessageElement = () => {
  const modalNode = document.querySelector('.success, .error');

  if (modalNode) {
    modalNode.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
    document.removeEventListener('click', removeMessageElement);
    errorButton.removeEventListener('click', removeMessageElement);
  }
};

const onSuccessFormSubmit = () => {
  mainContent.append(messageOnSuccess);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', removeMessageElement);
};

const onFailFormSubmit = () => {
  mainContent.append(messageOnFail);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', removeMessageElement);
  errorButton.addEventListener('click', removeMessageElement);
};

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  fetch(
    URL_FOR_SEND_DATA,
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


export {mainContent, onMessageEscKeydown, removeMessageElement};
