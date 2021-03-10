import { APARTMENT_TYPES_MAP } from './data.js';

const formNode = document.querySelector('.ad-form');
const formHeaderFieldset = formNode.querySelector('.ad-form-header');
const formElementFieldests = formNode.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormItems = mapFiltersForm.querySelectorAll('.map__filter');

formNode.address.setAttribute('disabled', 'disabled');
formNode.address.value = '35.65283, 139.83947'
formNode.classList.add('ad-form--disabled');
mapFiltersForm.classList.add('map__filters--disabled');
formHeaderFieldset.setAttribute('disabled', 'disabled');

formElementFieldests.forEach((element) => {
  element.setAttribute('disabled', 'disabled');
})

mapFiltersFormItems.forEach((item) => {
  item.setAttribute('disabled', 'disabled');
})

const validatePriceInput = function () {
  formNode.price.placeholder = APARTMENT_TYPES_MAP[formNode.type.value].minPrice;
  formNode.price.min = APARTMENT_TYPES_MAP[formNode.type.value].minPrice;
};

const validateTimeSelects = function(evt) {
  if (evt.target === formNode.timein) {
    formNode.timeout.value = formNode.timein.value;
  }
  if (evt.target === formNode.timeout) {
    formNode.timein.value = formNode.timeout.value;
  }
};

const onFormNodeChange = function (evt) {
  switch (evt.target) {
    case formNode.timein:
    case formNode.timeout:
      validateTimeSelects(evt);
      break;
    case formNode.type:
      validatePriceInput();
      break;
  }
};

formNode.addEventListener('change', onFormNodeChange);

export {formNode, formHeaderFieldset, formElementFieldests, mapFiltersForm, mapFiltersFormItems};
