import {getRandomOffers} from './data.js';

const offerCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');


const mapCanvas = document.querySelector('.map__canvas');
const randomOffers = getRandomOffers();
const randomOffersFragment = document.createDocumentFragment();

randomOffers.forEach(({author, offer}) => {
  const offerCard = offerCardTemplate.cloneNode(true);
  const popupPhoto = offerCard.querySelector('.popup__photo');
  const popupPhotos = offerCard.querySelector('.popup__photos');
  let offerType;

  offerCard.querySelector('.popup__title').textContent = offer.title;
  offerCard.querySelector('.popup__text--address').textContent = offer.address;
  offerCard.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;

  if (offer.type == 'palace') {
    offerType = 'Дворец';
  }
  if (offer.type == 'flat') {
    offerType = 'Квартира';
  }
  if (offer.type == 'house') {
    offerType = 'Дом';
  }
  if (offer.type == 'bungalow') {
    offerType = 'Бунгало';
  }

  offerCard.querySelector('.popup__type').textContent = offerType;
  offerCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  offerCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  offerCard.querySelector('.popup__features').textContent = offer.features;
  offerCard.querySelector('.popup__description').textContent = offer.description;
  popupPhotos.innerHTML = '';
  offer.photos.forEach((photo) => {
    const clonePopupPhoto = popupPhoto.cloneNode(true);
    popupPhotos.appendChild(clonePopupPhoto);
    clonePopupPhoto.src = photo;
  });
  offerCard.querySelector('.popup__avatar').src = author.avatar;

  randomOffersFragment.appendChild(offerCard);
});

mapCanvas.appendChild(randomOffersFragment.firstChild);

