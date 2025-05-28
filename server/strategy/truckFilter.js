// strategy/truckFilter.js

// Стратегия фильтрации по бренду
const filterByBrand = (trucks, brand) =>
  trucks.filter(t => t.brand === brand);

// Стратегия фильтрации по диапазону цен
const filterByPrice = (trucks, min, max) =>
  trucks.filter(t => t.price >= min && t.price <= max);

module.exports = {
  filterByBrand,
  filterByPrice
};
