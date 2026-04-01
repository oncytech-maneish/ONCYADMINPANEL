import { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2, Eye, EyeOff, CheckCircle, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  getAllBlogs,
  getPublishedBlogs,
  getDraftBlogs
} from '../../lib/blogs/blogService';

const PAGE_SIZE = 5;

const BlogList = () => {
  const navigate = useNavigate();
  const [completeData, setCompleteData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [totalReceivedCount, setTotalReceivedCount] = useState(0);
  const [totalEntriesCount, setTotalEntriesCount] = useState(0);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setCompleteData([]);
      setDisplayData([]);
      setTotalReceivedCount(0);
      try {
        let response;
        switch (filter) {
          case 'Published':
            response = await getPublishedBlogs();
            break;
          case 'Drafts':
            response = await getDraftBlogs();
            break;
          default:
            response = await getAllBlogs();
            break;
        }
        setCompleteData(prev => [...prev, ...response.data]);
        setTotalReceivedCount(prev => prev + response.length);
        setTotalEntriesCount(response.total);
        setDisplayData(prev => {
          const newData = [...prev, ...response.data];
          return newData.slice(-PAGE_SIZE);
        });
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filter]);

  const sortedDisplayData = [...displayData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-oncy-mid rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Blogs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-100 shadow-sm w-fit">
          {['All', 'Published', 'Drafts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all ${(filter === tab)
                ? 'bg-oncy-navy text-white shadow-md'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/blogs/new')}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-oncy-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-oncy-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>New Blog Post</span>
        </button>
      </div>

      {/* Blog Grid */}
      <div key={filter} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Main Details</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Author</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 border-b border-slate-100">
              {sortedDisplayData.map((blog) => (
                <tr key={blog.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl border border-slate-100 overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-500">
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-oncy-mid transition-colors cursor-pointer">{blog.title}</span>
                        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">Created {new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wide bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 transition-colors group-hover:border-slate-200">{blog.category}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">{blog.author.charAt(0)}</div>
                      <span className="text-xs font-bold text-slate-600 tracking-tight">{blog.author}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${blog.status === 'PUBLISHED'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                        {blog.status === 'PUBLISHED' ? <Globe className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        {blog.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-oncy-mid hover:bg-slate-50 rounded-lg transition-all" title="Edit Post"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-all" title="Toggle Publish"><CheckCircle className="w-4 h-4" /></button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Trash"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing {totalReceivedCount} out of {totalEntriesCount} blogs</span>
          <div className="flex items-center gap-2">
            <button disabled className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-300 bg-white cursor-not-allowed uppercase tracking-wider">Prev</button>
            <button className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors uppercase tracking-wider">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
