import { newsletterSubscribersData } from '../../data';

const API_DELAY = 1000;
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, API_DELAY));

export const getNewsletterData = async () => {
  await simulateDelay();

  return {
    length: newsletterSubscribersData.length,
    data: newsletterSubscribersData,
    total: 1248
  };
};
