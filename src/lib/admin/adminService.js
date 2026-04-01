import { adminsData } from '../../data';

const API_DELAY = 3000;
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, API_DELAY));

export const getAdminData = async () => {
  await simulateDelay();
  return {
    length: adminsData.length,
    data: adminsData,
    total: adminsData.length
  };
};
