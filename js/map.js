/* global L:readonly */
/* global _:readonly */
import { offerForm, toggleDisabledOnOfferFormNodes, toggleDisabledOnFilterFormNodes, mapFiltersForm, featuresFilterInputs} from './form.js';
import { getOfferCard } from './card.js';

const MAP_INITIAL_COORDS = {
  lat: 35.65283,
  lng: 139.83947,
};

const RERENDER_DELAY = 500;

const map = L.map('map-canvas')
  .on('load', () => {
    toggleDisabledOnOfferFormNodes();
    offerForm.address.value = `${MAP_INITIAL_COORDS.lat}, ${MAP_INITIAL_COORDS.lng}`;
  })
  .setView({
    lat: MAP_INITIAL_COORDS.lat,
    lng: MAP_INITIAL_COORDS.lng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const regularPinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPin = L.marker(
  {
    lat: MAP_INITIAL_COORDS.lat,
    lng: MAP_INITIAL_COORDS.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const contains = (where, what) => {
  for(let i=0; i<what.length; i++){
    if (where.indexOf(what[i]) == -1) return false;
  }
  return true;
};

mainPin.addTo(map)

mainPin.on('drag', (evt) => {
  const coords = evt.target.getLatLng();
  offerForm.address.value = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
});

let regularPinsArr = [];

const getPins = (offers) => {
  mapFiltersForm.addEventListener('change', _.debounce(() => {
    let featuresArr = [];
    regularPinsArr.forEach((marker) => marker.remove());
    regularPinsArr = [];

    let filteredOffersByType = offers.filter((offer) => {
      if (offer.offer.type === mapFiltersForm['housing-type'].value || mapFiltersForm['housing-type'].value === 'any') {
        return offer;
      }
    });

    let filteredOffersByPrice = filteredOffersByType.filter((offer) => {
      switch (mapFiltersForm['housing-price'].value) {
        case 'any':
          return offer;
        case 'middle':
          if (offer.offer.price >= 10000 && offer.offer.price < 50000) {
            return offer;
          }
          break;
        case 'low':
          if (offer.offer.price <= 10000) {
            return offer;
          }
          break;
        case 'high':
          if (offer.offer.price >= 50000 ) {
            return offer;
          }
          break;
      }
    });

    let filteredOffersByRooms = filteredOffersByPrice.filter((offer) => {
      if (offer.offer.rooms === +mapFiltersForm['housing-rooms'].value || mapFiltersForm['housing-rooms'].value === 'any') {
        return offer;
      }
    });

    let filteredOffersByGuests = filteredOffersByRooms.filter((offer) => {
      if (offer.offer.guests === +mapFiltersForm['housing-guests'].value || mapFiltersForm['housing-guests'].value === 'any') {
        return offer;
      }
    });

    featuresFilterInputs.forEach((input) => {
      if (input.checked) {
        featuresArr.push(input.value)
      }
    })

    let filteredOffersByFeatures = filteredOffersByGuests.filter((offer) => {
      if (contains(offer.offer.features, featuresArr)) {
        return offer;
      }
    });

    filteredOffersByFeatures.forEach((offer) => {
      const regularPin = L.marker(
        {
          lat: offer.location.lat,
          lng: offer.location.lng,
        },
        {
          draggable: false,
          icon: regularPinIcon,
        },
      );
      regularPinsArr.push(regularPin);
      regularPin
        .addTo(map)
        .bindPopup(getOfferCard(offer));
    });
  }, RERENDER_DELAY ))

  mapFiltersForm.dispatchEvent(new Event('change'));
  toggleDisabledOnFilterFormNodes();
}

export {getPins, mainPin, MAP_INITIAL_COORDS};



