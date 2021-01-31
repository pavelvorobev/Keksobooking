'use strict';

let getRandomInteger = (min, max) => {
  if (min < max && min >= 0 && max > 0) {
    // Источник https://learn.javascript.ru/task/random-int-min-max
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  return 'Ошибка';
}

let getRandomFloat = (min, max, precision) => {
  if (min < max && min >= 0 && max > 0 && precision > 0) {
    let rand = Math.random() * (max - min) + min;

    return rand.toFixed(precision);
  }

  return 'Ошибка';
}

getRandomInteger(1, 3);
getRandomFloat(1.2, 1.3, 2);
