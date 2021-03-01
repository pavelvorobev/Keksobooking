
import { getOfferCard } from './card.js';
import './form.js';

const mapCanvas = document.querySelector('.map__canvas');

const generateOffers = (number) => {
  const randomOffersFragment = document.createDocumentFragment();
  for (let i = 1; i <= number; i++) {
    randomOffersFragment.appendChild(getOfferCard());
  }

  return randomOffersFragment;
}

mapCanvas.appendChild(generateOffers(1));
