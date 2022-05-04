const getNftPrice = (price: number, floor_price: number) => {
  if (floor_price === 0) return price;
  if (price <= floor_price) return price;
  return floor_price;
};

export default getNftPrice;
