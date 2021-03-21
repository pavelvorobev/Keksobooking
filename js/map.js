/* global L:readonly */
import { offerForm, toggleDisabledOnOfferFormNodes, toggleDisabledOnFilterFormNodes, mapFiltersForm } from './form.js';
import { getOfferCard } from './card.js';

const MAP_INITIAL_COORDS = {
  lat: 35.65283,
  lng: 139.83947,
}

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

mainPin.addTo(map)

mainPin.on('drag', (evt) => {
  const coords = evt.target.getLatLng();
  offerForm.address.value = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
});

let regularPinsArr = [];

const getPins = (offers) => {
  offers.forEach((offer) => {

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
  toggleDisabledOnFilterFormNodes();
  mapFiltersForm.housingtype.addEventListener('change', (evt) => {
    toggleDisabledOnFilterFormNodes();
    regularPinsArr.forEach((marker) => {
      marker.remove();
    })
    regularPinsArr = [];
    let filteredOffers = offers.filter((offer) => {
      if (offer.offer.type === evt.target.value || evt.target.value === 'any') {
        return offer;
      }
    });

    filteredOffers.forEach((offer) => {
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
    toggleDisabledOnFilterFormNodes();
  })
}

export {getPins, mainPin, MAP_INITIAL_COORDS};



