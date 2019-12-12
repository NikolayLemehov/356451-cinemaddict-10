const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = castTimeFormat(date.getMinutes());

  return hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`;
};

export {formatTime};
