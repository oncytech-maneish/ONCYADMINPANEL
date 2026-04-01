import {
  enquiriesData,
  newEnquiriesData,
  inProgressEnquiriesData,
  completedEnquiriesData,
  rejectedEnquiriesData
} from '../../data';

const API_DELAY = 1000;
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, API_DELAY));

export const getAllEnquiries = async () => {
  await simulateDelay();
  return {
    length: enquiriesData.length,
    data: enquiriesData,
    total: enquiriesData.length
  };
};

export const getNewEnquiries = async () => {
  await simulateDelay();
  return {
    length: newEnquiriesData.length,
    data: newEnquiriesData,
    total: newEnquiriesData.length
  };
};

export const getInProgressEnquiries = async () => {
  await simulateDelay();
  return {
    length: inProgressEnquiriesData.length,
    data: inProgressEnquiriesData,
    total: inProgressEnquiriesData.length
  };
};

export const getCompletedEnquiries = async () => {
  await simulateDelay();
  return {
    length: completedEnquiriesData.length,
    data: completedEnquiriesData,
    total: completedEnquiriesData.length
  };
};

export const getRejectedEnquiries = async () => {
  await simulateDelay();
  return {
    length: rejectedEnquiriesData.length,
    data: rejectedEnquiriesData,
    total: rejectedEnquiriesData.length
  };
};
