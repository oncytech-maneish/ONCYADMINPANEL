import {
  jobApplicationsData,
  newJobApplicationsData,
  reviewingJobApplicationsData,
  interviewJobApplicationsData,
  hiredJobApplicationsData,
  rejectedJobApplicationsData
} from '../../data';

const API_DELAY = 1000;
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, API_DELAY));

export const getAllJobApplications = async () => {
  await simulateDelay();
  return {
    length: jobApplicationsData.length,
    data: jobApplicationsData,
    total: jobApplicationsData.length
  };
};

export const getNewJobApplications = async () => {
  await simulateDelay();
  return {
    length: newJobApplicationsData.length,
    data: newJobApplicationsData,
    total: newJobApplicationsData.length
  };
};

export const getReviewingJobApplications = async () => {
  await simulateDelay();
  return {
    length: reviewingJobApplicationsData.length,
    data: reviewingJobApplicationsData,
    total: reviewingJobApplicationsData.length
  };
};

export const getInterviewJobApplications = async () => {
  await simulateDelay();
  return {
    length: interviewJobApplicationsData.length,
    data: interviewJobApplicationsData,
    total: interviewJobApplicationsData.length
  };
};

export const getHiredJobApplications = async () => {
  await simulateDelay();
  return {
    length: hiredJobApplicationsData.length,
    data: hiredJobApplicationsData,
    total: hiredJobApplicationsData.length
  };
};

export const getRejectedJobApplications = async () => {
  await simulateDelay();
  return {
    length: rejectedJobApplicationsData.length,
    data: rejectedJobApplicationsData,
    total: rejectedJobApplicationsData.length
  };
};
