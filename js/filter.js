import {debounce, checkArrayIntersection} from './utils.js';
import {mapFiltersForm, featuresFilterInputs} from './form.js';
import {getPins} from './map.js';
import {OFFER_COUNT} from './data.js'

const offerPrices = {
  low: 10000,
  high: 50000,
}

const RERENDER_DELAY = 500;

let regularPinsArr = [];

const filterOffers = debounce((offers) => {
  let featuresArr = [];
  regularPinsArr.forEach((marker) => marker.remove());
  regularPinsArr = [];


  const filterOffersByType = (offer) => {
    if (offer.offer.type === mapFiltersForm['housing-type'].value || mapFiltersForm['housing-type'].value === 'any') {
      return offer;
    }
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
    if (offer.offer.rooms === +mapFiltersForm['housing-rooms'].value || mapFiltersForm['housing-rooms'].value === 'any') {
      return offer;
    }
  };

  const filterOffersByGuests = (offer) => {
    if (offer.offer.guests === +mapFiltersForm['housing-guests'].value || mapFiltersForm['housing-guests'].value === 'any') {
      return offer;
    }
  };

  const filterOffersByFeatures = (offer) => checkArrayIntersection(offer.offer.features, featuresArr);

  featuresFilterInputs.forEach((input) => {
    if (input.checked) {
      featuresArr.push(input.value)
    }
  });

  const filteredOffers = offers.filter(filterOffersByType)
    .filter(filterOffersByPrice)
    .filter(filterOffersByRooms)
    .filter(filterOffersByGuests)
    .filter(filterOffersByFeatures);

  getPins(filteredOffers.slice(0, OFFER_COUNT));

}, RERENDER_DELAY )


export {regularPinsArr, filterOffers};
