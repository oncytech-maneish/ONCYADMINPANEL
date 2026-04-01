import {
  employeesData,
  activeEmployeesData,
  inactiveEmployeesData
} from '../../data';

const API_DELAY = 1000;
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, API_DELAY));

export const getAllTeamMembers = async () => {
  await simulateDelay();
  return {
    length: employeesData.length,
    data: employeesData,
    total: employeesData.length
  };
};

export const getActiveTeamMembers = async () => {
  await simulateDelay();
  return {
    length: activeEmployeesData.length,
    data: activeEmployeesData,
    total: activeEmployeesData.length
  };
};

export const getInactiveTeamMembers = async () => {
  await simulateDelay();
  return {
    length: inactiveEmployeesData.length,
    data: inactiveEmployeesData,
    total: inactiveEmployeesData.length
  };
};
