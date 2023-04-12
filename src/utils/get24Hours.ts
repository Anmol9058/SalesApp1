const get24Hours = value => {
  var quotient = Math.floor(value / 60);
  var remainder = value % 60;
  return `${quotient}h ${remainder}m`;
};

export default get24Hours;
