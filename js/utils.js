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

const getRandomArrayElements = (array) => array.slice(getRandomRoundedInt(0, array.length - 1));

export {getRandomRoundedInt, getRandomFloatInt, getRandomArrayElement, getRandomArrayElements};
