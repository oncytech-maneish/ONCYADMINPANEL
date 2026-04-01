import { productsData } from '../../data';

const API_DELAY = 1000;
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, API_DELAY));

export const getAllProducts = async () => {
  await simulateDelay();
  return {
    length: productsData.length,
    data: productsData,
    total: productsData.length
  };
};

export const searchProducts = async (query) => {
  await simulateDelay();
  let filtered = productsData;
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    filtered = productsData.filter(prod =>
      prod.title.toLowerCase().includes(lowercaseQuery) ||
      prod.category.toLowerCase().includes(lowercaseQuery) ||
      prod.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }
  return {
    length: filtered.length,
    data: filtered,
    total: filtered.length
  };
};
