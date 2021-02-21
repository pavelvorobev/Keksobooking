import {getRandomRoundedInt, getRandomFloatInt, getRandomArrayElement, getRandomArrayElements} from './utils.js';

const TOTAL_USERS = 8;
const OFFER_PRICE = {
  min: 5000,
  max: 100000,
};
const APARTMENT_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const ROOMS_AMOUNT = {
  min: 1,
  max: 6,
};
const GUESTS_AMOUNT = {
  min: 1,
  max: 12,
};
const CHECKIN_TIME = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
const APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const APARTMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const createRandomOffer = () => {
  let locationX = getRandomFloatInt(35.65000, 35.70000, 5);
  let locationY = getRandomFloatInt(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: `img/avatars/user0${getRandomRoundedInt(1, TOTAL_USERS)}.png`,
    },
    location: {
      x: locationX,
      y: locationY,
    },
    offer: {
      title: 'Заголовок',
      address: `${locationX},${locationY}`,
      price: getRandomRoundedInt(OFFER_PRICE.min, OFFER_PRICE.max),
      type: getRandomArrayElement(APARTMENT_TYPE),
      rooms: getRandomRoundedInt(ROOMS_AMOUNT.min, ROOMS_AMOUNT.max),
      guests: getRandomRoundedInt(GUESTS_AMOUNT.min, GUESTS_AMOUNT.max),
      checkin: getRandomArrayElement(CHECKIN_TIME),
      checkout: getRandomArrayElement(CHECKOUT_TIME),
      features: getRandomArrayElements(APARTMENT_FEATURES),
      description: 'Описание',
      photos: getRandomArrayElements(APARTMENT_PHOTOS),
    },
  };
};

const getRandomOffers = () => new Array(10).fill(null).map(createRandomOffer);

export {getRandomOffers};
