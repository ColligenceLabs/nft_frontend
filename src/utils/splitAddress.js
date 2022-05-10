const splitAddress = (str = '') => {
  return str ? str.substr(0, 5) + '...' + str.substr(str.length - 5, str.length) : '-';
};

export default splitAddress;
