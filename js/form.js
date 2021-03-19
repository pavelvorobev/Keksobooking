import { APARTMENT_TYPES_MAP } from './data.js';

const offerForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
const ROOMS_FOR_GUESTS_MAP = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0'],
};

let isPageDisabled = false;

const toggleDisabledOnOfferForm = () => {
  isPageDisabled = !isPageDisabled;

  offerForm.classList.toggle('ad-form--disabled', isPageDisabled);
  mapFiltersForm.classList.toggle('map__filters--disabled', isPageDisabled);
  Array.from(offerForm.elements).forEach((it) => {
    if (it.name == 'address') {
      it.readOnly = true;
    } else {
      it.disabled = isPageDisabled
    }
  });
  Array.from(mapFiltersForm.elements).forEach(it => it.disabled = isPageDisabled);
};

toggleDisabledOnOfferForm();

const validatePriceInput = function () {
  offerForm.price.placeholder = APARTMENT_TYPES_MAP[offerForm.type.value].minPrice;
  offerForm.price.min = APARTMENT_TYPES_MAP[offerForm.type.value].minPrice;
};
validatePriceInput();

const validateTimeSelects = function(evt) {
  if (evt.target === offerForm.timein) {
    offerForm.timeout.value = offerForm.timein.value;
  }
  if (evt.target === offerForm.timeout) {
    offerForm.timein.value = offerForm.timeout.value;
  }
};

const validateGuestsSelects = function(evt) {
  const ARR = ROOMS_FOR_GUESTS_MAP[evt.target.value];

  for (let it of offerForm.capacity) {
    if (ARR.includes(it.value)) {
      it.disabled = false;
    } else {
      it.disabled = true;
    }
  }

  offerForm.capacity.value = ARR[0];
};


const onofferFormChange = function(evt) {
  switch (evt.target) {
    case offerForm.timein:
    case offerForm.timeout:
      validateTimeSelects(evt);
      break;
    case offerForm.type:
      validatePriceInput();
      break;
    case offerForm.rooms:
      validateGuestsSelects(evt);
      break;
  }
};

offerForm.addEventListener('change', onofferFormChange);



export {offerForm, mapFiltersForm, toggleDisabledOnOfferForm};
