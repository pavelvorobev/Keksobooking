const getDeclension = (number, titlesArr) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titlesArr[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

function debounce(fn, interval) {
  let timer;
  return function () {
    clearTimeout(timer);
    let args = arguments;
    let context = this;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, interval);
  };
}

export {getDeclension, debounce};
