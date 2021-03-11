import { APARTMENT_TYPES_MAP } from './data.js';

const formNode = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
let isPageDisabled = false;

const toggleDisabledOnFormNodes = () => {
  isPageDisabled = !isPageDisabled;

  formNode.classList.toggle('ad-form--disabled', isPageDisabled);
  mapFiltersForm.classList.toggle('map__filters--disabled', isPageDisabled);
  Array.from(formNode.elements).forEach(it => it.disabled = isPageDisabled);
  Array.from(mapFiltersForm.elements).forEach(it => it.disabled = isPageDisabled);
};

toggleDisabledOnFormNodes();

const validatePriceInput = function () {
  formNode.price.placeholder = APARTMENT_TYPES_MAP[formNode.type.value].minPrice;
  formNode.price.min = APARTMENT_TYPES_MAP[formNode.type.value].minPrice;
};
validatePriceInput();

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

export {formNode, toggleDisabledOnFormNodes};
