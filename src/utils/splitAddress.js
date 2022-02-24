const splitAddress = (str) => {
  return str.substr(0, 5) + '...' + str.substr(str.length - 5, str.length);
};

export default splitAddress;
