const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = castTimeFormat(date.getMinutes());

  return hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`;
};

const getRandomIntegerNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const getRandomArrayItem = (array) => array[getRandomIntegerNumber(0, array.length - 1)];

export {formatTime, getRandomIntegerNumber, getRandomArrayItem};
