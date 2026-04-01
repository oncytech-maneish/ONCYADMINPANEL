import { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Package, 
  Briefcase, 
  Calendar, 
  Mail, 
  ArrowUpRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../lib/dashboard/dashboardService';

const iconMap = {
  Users,
  MessageSquare,
  FileText,
  Calendar,
};

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentBlogActivity, setRecentBlogActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response.data);
        setRecentEnquiries(response.recentEnquiries);
        setRecentBlogActivity(response.recentBlogActivity);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-oncy-mid rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = iconMap[stat.icon] || MessageSquare;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 transition-colors`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-800 tracking-tight">{stat.value}</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enquiries Table Placeholder */}
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight uppercase tracking-widest text-sm">Recent Enquiries</h3>
            <Link to="/enquiries" className="text-xs font-bold text-oncy-mid hover:text-oncy-blue flex items-center gap-1 transition-colors group">
              View All <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentEnquiries.map((enquiry) => (
              <div key={enquiry.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">{enquiry.name}</span>
                    <span className="text-xs text-slate-400 font-medium">{enquiry.project}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase tracking-wider">{enquiry.timeAgo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Activity */}
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight uppercase tracking-widest text-sm">Recent Blog Activity</h3>
            <Link to="/blogs" className="text-xs font-bold text-oncy-mid hover:text-oncy-blue flex items-center gap-1 transition-colors group">
              View All <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentBlogActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors rounded-xl cursor-default">
                <div className="w-12 h-12 bg-slate-100 rounded-lg shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700">{activity.title}</span>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Published {activity.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
