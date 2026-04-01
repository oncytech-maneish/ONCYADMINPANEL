import { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, ArrowRight, Eye, Trash2 } from 'lucide-react';
import {
  getAllEnquiries,
  getNewEnquiries,
  getInProgressEnquiries,
  getCompletedEnquiries,
  getRejectedEnquiries
} from '../lib/enquiries/enquiryService';

const PAGE_SIZE = 5;

const Enquiries = () => {
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
          case 'New':
            response = await getNewEnquiries();
            break;
          case 'In Progress':
            response = await getInProgressEnquiries();
            break;
          case 'Completed':
            response = await getCompletedEnquiries();
            break;
          case 'Rejected':
            response = await getRejectedEnquiries();
            break;
          default:
            response = await getAllEnquiries();
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
        console.error("Error fetching enquiries:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filter]);

  const statusColors = {
    'NEW': 'bg-blue-50 text-blue-700 border-blue-100',
    'IN_PROGRESS': 'bg-amber-50 text-amber-700 border-amber-100',
    'COMPLETED': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'REJECTED': 'bg-red-50 text-red-700 border-red-100',
  };

  const formatBudget = (lower, upper) => {
    if (!lower && !upper) return 'Unknown';
    if (!upper) return `$${(lower / 1000).toFixed(0)}k+`;
    return `$${(lower / 1000).toFixed(0)}k - $${(upper / 1000).toFixed(0)}k`;
  };

  const sortedDisplayData = [...displayData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-oncy-mid rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Enquiries...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-100 shadow-sm w-fit">
          {['All', 'New', 'In Progress', 'Completed', 'Rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${(filter === tab)
                ? 'bg-oncy-navy text-white shadow-md'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table Card */}
      <div key={filter} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Enquiry Details</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Budget & Source</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {sortedDisplayData.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                        {item.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 tracking-tight">{item.name}</span>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1"><Mail className="w-3 h-3" /> {item.email}</span>
                          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1"><Phone className="w-3 h-3" /> {item.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700">{formatBudget(item.budgetLowerLimit, item.budgetUpperLimit)}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.source}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${statusColors[item.status]}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-300" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-oncy-mid hover:bg-oncy-light/10 rounded-lg transition-all" title="View Detail">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing {totalReceivedCount} out of {totalEntriesCount} enquiries</span>
          <div className="flex items-center gap-2">
            <button disabled className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-300 bg-white cursor-not-allowed uppercase tracking-wider">Prev</button>
            <button className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors uppercase tracking-wider">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiries;
