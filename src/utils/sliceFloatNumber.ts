const sliceFloatNumber = (flotNumber: string) => {
  if (parseFloat(flotNumber) === 0) return '0';

  const array = flotNumber.split('.');
  let withoutZeroLength = 2;
  let spliceFloatArray: (string | undefined)[] = [];
  if (array.length === 2) {
    const floatArray = array[1].split('');
    spliceFloatArray = floatArray.map((str) => {
      if (withoutZeroLength > 0) {
        if (str === '0') return str;
        else {
          withoutZeroLength = withoutZeroLength - 1;
          return str;
        }
      }
    });
  }

  return `${array[0]}.${spliceFloatArray.join('')}`;
};

export default sliceFloatNumber;
