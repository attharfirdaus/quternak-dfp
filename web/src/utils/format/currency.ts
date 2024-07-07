export const formatCurrency = (number: Number) => {
  if (number !== undefined && number !== null) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return 0;
};
