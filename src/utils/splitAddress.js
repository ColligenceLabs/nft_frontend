const splitAddress = (str = '') => {
  return str
    ? str !== '0x0000000000000000000000000000000000000000'
      ? str.substr(0, 5) + '...' + str.substr(str.length - 5, str.length)
      : '-'
    : '-';
};

export default splitAddress;
