import {formNode, formHeaderFieldset, formElementFieldests, mapFiltersForm, mapFiltersFormItems} from './form.js';
import { getOfferCard } from './card.js';

const L = window.L;
const map = L.map('map-canvas')
  .on('load', () => {
    formNode.classList.remove('ad-form--disabled');
    mapFiltersForm.classList.remove('map__filters--disabled');
    formHeaderFieldset.removeAttribute('disabled');
    formElementFieldests.forEach((element) => {
      element.removeAttribute('disabled');
    })
    mapFiltersFormItems.forEach((item) => {
      item.removeAttribute('disabled');
    })
  })
  .setView({
    lat: 35.65283,
    lng: 139.83947,
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
    lat: 35.652832,
    lng: 139.839478,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPin.addTo(map)

mainPin.on('moveend', (evt) => {
  const coords = evt.target.getLatLng();
  const lng = coords.lng.toFixed(5);
  const lat = coords.lat.toFixed(5);
  formNode.address.value = `${lat}, ${lng}`;
});

const generateOffers = (number) => {
  const randomOffersFragment = document.createDocumentFragment();
  for (let i = 1; i <= number; i++) {
    randomOffersFragment.appendChild(getOfferCard());
  }

  return randomOffersFragment;
}

const offers = generateOffers(10);

for (let child of offers.children) {
  const regularPin = L.marker(
    {
      lat: 35.652122,
      lng: 139.839478,
    },
    {
      draggable: true,
      icon: regularPinIcon,
    },
  )

  regularPin.addTo(map).bindPopup(child);
}
