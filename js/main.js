'use strict';

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

const TOTAL_USERS = 8;
const PRICE = {
  min: 5000,
  max: 100000,
};
const TYPE = ['palace', 'flat', 'house', 'bungalow'];
const ROOMS = {
  min: 1,
  max: 6,
};
const GUESTS = {
  min: 1,
  max: 12,
};
const CHECKIN_TIME = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const getRandomArrayElement = (array) => {
  return array[getRandomRoundedInt(0, array.length - 1)];
};

const getRandomArrayElements = (array) => {
 return array.slice(getRandomRoundedInt(1, array.length - 1));
};

const createRandomAnnouncement = () => {
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
      price: getRandomRoundedInt(PRICE.min, PRICE.max),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomRoundedInt(ROOMS.min, ROOMS.max),
      guests: getRandomRoundedInt(GUESTS.min, GUESTS.max),
      checkin: getRandomArrayElement(CHECKIN_TIME),
      checkout: getRandomArrayElement(CHECKOUT_TIME),
      features: getRandomArrayElements(FEATURES),
      description: 'Описание',
      photos: getRandomArrayElements(PHOTOS),
    },
  };
};

const randomAnnouncements = new Array(10).fill(null).map(() => createRandomAnnouncement());

