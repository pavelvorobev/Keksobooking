import {debounce} from './utils.js';
import {mapFiltersForm, featuresFilterInputs} from './form.js';
import {renderPins} from './map.js';
import {OFFER_COUNT} from './data.js'

const FILTER_DEFAULT_VALUE = 'any';
const RERENDER_DELAY = 500;

const offerPrices = {
  low: 10000,
  high: 50000,
}

let regularPinsArr = [];

const filterByValues = (offer, offerField, pageField) => {
  if (pageField.value === offerField.toString() || pageField.value === FILTER_DEFAULT_VALUE) {
    return offer;
  }
};

const filterOffersByType = (offer) => {
  return filterByValues(offer, offer.offer.type, mapFiltersForm['housing-type']);
};

const filterOffersByPrice = (offer) => {
  switch (mapFiltersForm['housing-price'].value) {
    case 'low':
      return offer.offer.price < offerPrices.low;
    case 'middle':
      return offer.offer.price >= offerPrices.low && offer.offer.price < offerPrices.high;
    case 'high':
      return offer.offer.price >= offerPrices.high;
    default:
      return offer;
  }
};

const filterOffersByRooms = (offer) => {
  return filterByValues(offer, offer.offer.rooms, mapFiltersForm['housing-rooms']);
};

const filterOffersByGuests = (offer) => {
  return filterByValues(offer, offer.offer.guests, mapFiltersForm['housing-guests']);
};

const filterOffersByFeatures = (offer) => !Array.from(featuresFilterInputs).some((element) => element.checked && !offer.offer.features.includes(element.value));

const filterOffers = debounce((offers) => {
  regularPinsArr.forEach((marker) => marker.remove());
  regularPinsArr = [];

  const filteredOffers = offers.filter(filterOffersByType)
    .filter(filterOffersByPrice)
    .filter(filterOffersByRooms)
    .filter(filterOffersByGuests)
    .filter(filterOffersByFeatures);

  renderPins(filteredOffers.slice(0, OFFER_COUNT));

}, RERENDER_DELAY )


export {regularPinsArr, filterOffers};
