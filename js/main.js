
import { getOfferCard } from './card.js';

const mapCanvas = document.querySelector('.map__canvas');
const randomOffersFragment = document.createDocumentFragment();

const renderOffers = (number) => {
  for (let i = 1; i <= number; i++) {
    randomOffersFragment.appendChild(getOfferCard());
  }
}

renderOffers(1);
mapCanvas.appendChild(randomOffersFragment);


