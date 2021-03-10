import {createRandomOffer, APARTMENT_TYPES_MAP} from './data.js';
import {getDeclension} from './utils.js';

const offerCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const getOfferCard = () => {
  const randomOffer = createRandomOffer();
  const {author, offer} = randomOffer;
  const offerCard = offerCardTemplate.cloneNode(true);
  const popupPhoto = offerCard.querySelector('.popup__photo');
  const popupPhotos = offerCard.querySelector('.popup__photos');

  offerCard.querySelector('.popup__title').textContent = offer.title || '';
  offerCard.querySelector('.popup__text--address').textContent = offer.address || '';
  offerCard.querySelector('.popup__text--price').textContent = offer.price ? `${offer.price} ₽/ночь` : '';
  offerCard.querySelector('.popup__type').textContent = APARTMENT_TYPES_MAP[offer.type.name];
  offerCard.querySelector('.popup__text--capacity').textContent = offer.rooms && offer.guests ? `${offer.rooms} ${getDeclension(`${offer.rooms}`, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${getDeclension(`${offer.guests}`, ['гостя', 'гостей', 'гостей'])}` :  '';
  offerCard.querySelector('.popup__text--time').textContent = offer.checkin && offer.checkout ? `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` : '';

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
    offer.photos.forEach((photoSrc) => {
      const clonePopupPhoto = popupPhoto.cloneNode(true);
      clonePopupPhoto.src = photoSrc;
      popupPhotos.appendChild(clonePopupPhoto);
    });
  }  else {
    popupPhotos.textContent = '';
  }

  offerCard.querySelector('.popup__avatar').src = author.avatar;

  return offerCard;
}

export {getOfferCard};


