import {
  blogsData,
  publishedBlogsData,
  draftBlogsData
} from '../../data';

const API_DELAY = 1000;
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, API_DELAY));

export const getAllBlogs = async () => {
  await simulateDelay();
  return {
    length: blogsData.length,
    data: blogsData,
    total: blogsData.length
  };
};

export const getPublishedBlogs = async () => {
  await simulateDelay();
  return {
    length: publishedBlogsData.length,
    data: publishedBlogsData,
    total: publishedBlogsData.length
  };
};

export const getDraftBlogs = async () => {
  await simulateDelay();
  return {
    length: draftBlogsData.length,
    data: draftBlogsData,
    total: draftBlogsData.length
  };
};
