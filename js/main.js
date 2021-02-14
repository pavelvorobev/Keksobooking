'use strict';

const TOTAL_USERS = 8;
const OFFER_PRICE = {
  min: 5000,
  max: 100000,
};
const APARTMENT_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const ROOMS_NUMBER = {
  min: 1,
  max: 6,
};
const GUESTS_NUMBER = {
  min: 1,
  max: 12,
};
const CHECKIN_TIME = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
const APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const APARTMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const getRandomRoundedInt = (min, max) => {
  if (min < max && min >= 0 && max > 0) {
    // Источник https://learn.javascript.ru/task/random-int-min-max
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  throw new Error('getRandomRoundedInt - диапазон не соответствует условию');
};

const getRandomFloatInt = (min, max, precision) => {
  if (min < max && min >= 0 && max > 0 && precision > 0) {
    return (Math.random() * (max - min) + min).toFixed(precision);
  }

  throw new Error('getRandomFloatInt - диапазон или точность не соответствуют условию');
};

const getRandomArrayElement = (array) => array[getRandomRoundedInt(0, array.length - 1)];

const getRandomArrayElements = (array) => array.slice(getRandomRoundedInt(1, array.length - 1));

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
      OFFER_PRICE: getRandomRoundedInt(OFFER_PRICE.min, OFFER_PRICE.max),
      type: getRandomArrayElement(APARTMENT_TYPE),
      rooms: getRandomRoundedInt(ROOMS_NUMBER.min, ROOMS_NUMBER.max),
      guests: getRandomRoundedInt(GUESTS_NUMBER.min, GUESTS_NUMBER.max),
      checkin: getRandomArrayElement(CHECKIN_TIME),
      checkout: getRandomArrayElement(CHECKOUT_TIME),
      features: getRandomArrayElements(APARTMENT_FEATURES),
      description: 'Описание',
      photos: getRandomArrayElements(APARTMENT_PHOTOS),
    },
  };
};

const getRandomOffers = () => {
  let randomOffers = new Array(10).fill(null).map(createRandomOffer);
  return randomOffers;
};

getRandomOffers();
