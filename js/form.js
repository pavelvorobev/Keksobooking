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

let isPageDisabled = false;

const toggleDisabledOnFormNodes = () => {
  isPageDisabled = !isPageDisabled;

  offerForm.classList.toggle('ad-form--disabled', isPageDisabled);
  mapFiltersForm.classList.toggle('map__filters--disabled', isPageDisabled);
  Array.from(offerForm.elements).forEach((it) => {
    if (it.name != 'address') {
      it.disabled = isPageDisabled
    }
  });
  Array.from(mapFiltersForm.elements).forEach(it => it.disabled = isPageDisabled);
};

toggleDisabledOnFormNodes();

const validatePriceInput = function () {
  offerForm.price.placeholder = APARTMENT_TYPES_MAP[offerForm.type.value].minPrice;
  offerForm.price.min = APARTMENT_TYPES_MAP[offerForm.type.value].minPrice;
};
validatePriceInput();

const validateTimeSelects = function(evt) {
  if (evt.target === offerForm.timein) {
    offerForm.timeout.value = offerForm.timein.value;
  } else {
    offerForm.timein.value = offerForm.timeout.value;
  }
};

const validateGuestsSelects = function(evt) {
  const capacityOptions = ROOMS_FOR_GUESTS_MAP[evt.target.value];

  for (let it of offerForm.capacity) {
    it.disabled = !capacityOptions.includes(it.value)
  }

  offerForm.capacity.value = capacityOptions[0];
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



export {offerForm, mapFiltersForm, toggleDisabledOnFormNodes, APARTMENT_TYPES_MAP};
