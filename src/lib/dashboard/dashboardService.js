import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { enquiriesData, blogsData, employeesData, demoRequestsData } from '../../data';

dayjs.extend(relativeTime);

const API_DELAY = 3000;
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, API_DELAY));

const RECENT_THRESHOLD_HOURS = 168;

export const getRecentEnquiries = async () => {
  const thresholdDate = dayjs().subtract(RECENT_THRESHOLD_HOURS, 'hours');
  const filtered = enquiriesData
    .filter(e => dayjs(e.createdAt).isBefore(thresholdDate))
    .sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)))
    .slice(0, 3)
    .map(e => ({
      ...e,
      project: e.project || 'Project Request',
      timeAgo: dayjs(e.createdAt).fromNow()
    }));
  return {
    length: filtered.length,
    data: filtered,
    total: filtered.length
  };
};

export const getRecentBlogActivity = async () => {
  const thresholdDate = dayjs().subtract(RECENT_THRESHOLD_HOURS, 'hours');
  const filtered = blogsData
    .filter(b => dayjs(b.createdAt).isBefore(thresholdDate))
    .sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)))
    .slice(0, 3)
    .map(b => ({
      ...b,
      timeAgo: dayjs(b.createdAt).fromNow()
    }));
  return {
    length: filtered.length,
    data: filtered,
    total: filtered.length
  };
};

export const getDashboardStats = async () => {
  await simulateDelay();

  const publishedCount = blogsData.filter(b => b.status === 'PUBLISHED').length;
  const recentEnquiriesResponse = await getRecentEnquiries();
  const recentBlogActivityResponse = await getRecentBlogActivity();

  return {
    length: 4,
    data: [
      { label: 'Total Enquiries', value: enquiriesData.length.toString(), icon: 'MessageSquare', color: 'blue' },
      { label: 'Published Blogs', value: publishedCount.toString(), icon: 'FileText', color: 'emerald' },
      { label: 'Team Members', value: employeesData.length.toString(), icon: 'Users', color: 'indigo' },
      { label: 'Pending Demos', value: demoRequestsData.length.toString(), icon: 'Calendar', color: 'orange' },
    ],
    total: 4,
    recentEnquiries: recentEnquiriesResponse.data,
    recentBlogActivity: recentBlogActivityResponse.data
  };
};
