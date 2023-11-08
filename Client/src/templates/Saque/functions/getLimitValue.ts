export const getLimitValue = (limit: number, value: number) => {
  if (value > limit) {
    return limit;
  }
  return value;
};
