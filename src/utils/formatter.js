export const getPriceString = price => {
  return `${Number(price)
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}
