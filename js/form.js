import {OFFER_PRICE} from './data.js'

const apartmentTypeInput = document.querySelector('#type');
const offerPriceInput = document.querySelector('#price');
const checkinTimeInput = document.querySelector('#timein');
const checkoutTimeInput = document.querySelector('#timeout');

apartmentTypeInput.addEventListener('change', function() {
  if (this.value == 'palace') {
    offerPriceInput.placeholder = 10000;
    OFFER_PRICE.min = 10000;
  }
  if (this.value == 'bungalow') {
    offerPriceInput.placeholder = 0;
    OFFER_PRICE.min = 0;
  }
  if (this.value == 'house') {
    offerPriceInput.placeholder = 5000;
    OFFER_PRICE.min = 5000;
  }
  if (this.value == 'flat') {
    offerPriceInput.placeholder = 1000;
    OFFER_PRICE.min = 1000;
  }
});

checkinTimeInput.addEventListener('change', function() {
  checkoutTimeInput.value = this.value;
});

checkoutTimeInput.addEventListener('change', function() {
  checkinTimeInput.value = this.value;
});
