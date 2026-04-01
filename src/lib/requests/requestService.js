import {
  demoRequestsData,
  pendingDemoRequestsData,
  confirmedDemoRequestsData,
  completedDemoRequestsData,
  cancelledDemoRequestsData
} from '../../data';

const API_DELAY = 1000;
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, API_DELAY));

export const getAllDemoRequests = async () => {
  await simulateDelay();
  return {
    length: demoRequestsData.length,
    data: demoRequestsData,
    total: demoRequestsData.length
  };
};

export const getPendingDemoRequests = async () => {
  await simulateDelay();
  return {
    length: pendingDemoRequestsData.length,
    data: pendingDemoRequestsData,
    total: pendingDemoRequestsData.length
  };
};

export const getConfirmedDemoRequests = async () => {
  await simulateDelay();
  return {
    length: confirmedDemoRequestsData.length,
    data: confirmedDemoRequestsData,
    total: confirmedDemoRequestsData.length
  };
};

export const getCompletedDemoRequests = async () => {
  await simulateDelay();
  return {
    length: completedDemoRequestsData.length,
    data: completedDemoRequestsData,
    total: completedDemoRequestsData.length
  };
};

export const getCancelledDemoRequests = async () => {
  await simulateDelay();
  return {
    length: cancelledDemoRequestsData.length,
    data: cancelledDemoRequestsData,
    total: cancelledDemoRequestsData.length
  };
};
