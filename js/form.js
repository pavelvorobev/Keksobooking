const offerForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
const ROOMS_FOR_GUESTS_MAP = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0'],
};

const APARTMENT_TYPES_MAP = {
  palace: {
    name: 'Дворец',
    minPrice: 10000,
  },
  flat: {
    name: 'Квартира',
    minPrice: 1000,
  },
  house: {
    name: 'Дом',
    minPrice: 5000,
  },
  bungalow: {
    name: 'Бунгало',
    minPrice: 0,
  },
};

const featuresFilterInputs = document.querySelectorAll('.map__checkbox');
let isOfferFormDisabled = false;
let isFilterFormDisabled = false

const toggleDisabledOnOfferFormNodes = () => {
  isOfferFormDisabled = !isOfferFormDisabled;

  offerForm.classList.toggle('ad-form--disabled', isOfferFormDisabled);
  Array.from(offerForm.elements).forEach((it) => it.disabled = isOfferFormDisabled);
};

const toggleDisabledOnFilterFormNodes = () => {
  isFilterFormDisabled = !isFilterFormDisabled;

  mapFiltersForm.classList.toggle('map__filters--disabled', isFilterFormDisabled);
  Array.from(mapFiltersForm.elements).forEach(it => it.disabled = isFilterFormDisabled);
};

const validatePriceInput = () => {
  offerForm.price.placeholder = APARTMENT_TYPES_MAP[offerForm.type.value].minPrice;
  offerForm.price.min = APARTMENT_TYPES_MAP[offerForm.type.value].minPrice;
};

const validateTimeSelects = (evt) => {
  if (evt.target === offerForm.timein) {
    offerForm.timeout.value = offerForm.timein.value;
  } else {
    offerForm.timein.value = offerForm.timeout.value;
  }
};

const validateGuestsSelects = (evt) => {
  const capacityOptions = ROOMS_FOR_GUESTS_MAP[evt.target.value];

  for (let it of offerForm.capacity) {
    it.disabled = !capacityOptions.includes(it.value)
  }

  offerForm.capacity.value = capacityOptions[0];
};


const onOfferFormChange = (evt) => {
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

offerForm.addEventListener('change', onOfferFormChange);

toggleDisabledOnOfferFormNodes();
toggleDisabledOnFilterFormNodes();

export {offerForm, mapFiltersForm, toggleDisabledOnOfferFormNodes, toggleDisabledOnFilterFormNodes, APARTMENT_TYPES_MAP, featuresFilterInputs};
