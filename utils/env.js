const isDevMode = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 8080;

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = {
  isDevMode,
  PORT,
};
