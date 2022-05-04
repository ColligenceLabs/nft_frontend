const getNftPrice = (price: number, floor_price: number) => {
  console.log(`price : ${price}`);
  console.log(`floor_price : ${floor_price}`);

  if (floor_price === 0) return price;
  if (price <= floor_price) return price;
  return floor_price;
};

export default getNftPrice;
