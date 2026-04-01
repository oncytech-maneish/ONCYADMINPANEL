import { portfolioProductsData } from '../../data';

const API_DELAY = 1000;
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, API_DELAY));

export const getPortfolioProducts = async () => {
  await simulateDelay();
  return {
    length: portfolioProductsData.length,
    data: portfolioProductsData,
    total: portfolioProductsData.length
  };
};

export const searchPortfolio = async (query) => {
  await simulateDelay();
  let filtered = portfolioProductsData;
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    filtered = portfolioProductsData.filter(item =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }
  return {
    length: filtered.length,
    data: filtered,
    total: filtered.length
  };
};
