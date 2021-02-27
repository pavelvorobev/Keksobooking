import {createRandomOffer} from './data.js';
import {getDeclension} from './utils.js';

const offerCardTemplate = document.querySelector('#card').content.querySelector('.popup');
/* const mapCanvas = document.querySelector('.map__canvas'); */
const randomOffer = createRandomOffer();
const {author, offer} = randomOffer;
/* const randomOffersFragment = document.createDocumentFragment(); */
const APARTMENT_TYPES_MAP = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const getOfferCard = () => {
  const offerCard = offerCardTemplate.cloneNode(true);
  const popupPhoto = offerCard.querySelector('.popup__photo');
  const popupPhotos = offerCard.querySelector('.popup__photos');

  offerCard.querySelector('.popup__title').textContent = offer.title || '';
  offerCard.querySelector('.popup__text--address').textContent = offer.address || '';

  if (offer.price) {
    offerCard.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  } else {
    offerCard.querySelector('.popup__text--price').textContent = '';
  }

  offerCard.querySelector('.popup__type').textContent = APARTMENT_TYPES_MAP[offer.type];

  if (offer.rooms && offer.guests) {
    offerCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getDeclension(`${offer.rooms}`, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${getDeclension(`${offer.guests}`, ['гостя', 'гостей', 'гостей'])}`;
  } else {
    offerCard.querySelector('.popup__text--capacity').textContent = '';
  }

  if (offer.checkin && offer.checkout) {
    offerCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    offerCard.querySelector('.popup__text--time').textContent = '';
  }

  if (offer.features) {
    offerCard.querySelector('.popup__features').innerHTML = '';
    offer.features.forEach((feature) => {
      offerCard.querySelector('.popup__features').appendChild(document.createElement('li')).classList.add('popup__feature', `popup__feature--${feature}`);
    });
  } else {
    offerCard.querySelector('.popup__features').textContent = '';
  }

  offerCard.querySelector('.popup__description').textContent = offer.description || '';

  if (offer.photos) {
    popupPhotos.innerHTML = '';
    offer.photos.forEach((photo) => {
      const clonePopupPhoto = popupPhoto.cloneNode(true);
      popupPhotos.appendChild(clonePopupPhoto);
      clonePopupPhoto.src = photo;
    });
  }  else {
    popupPhotos.textContent = '';
  }

  offerCard.querySelector('.popup__avatar').src = author.avatar;

  return offerCard;
}

export {getOfferCard};


