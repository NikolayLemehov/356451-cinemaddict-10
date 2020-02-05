import moment from 'moment';

const formatTime = (minutes) => {
  const m = moment.duration(minutes, `m`);
  return `${m.hours() > 0 ? `${m.hours()}h ${m.minutes()}m` : `${m.minutes()}m`}`;
};

const getRandomIntegerNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

export {formatTime, getRandomIntegerNumber};
