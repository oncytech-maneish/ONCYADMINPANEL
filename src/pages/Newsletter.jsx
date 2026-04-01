import { useState, useEffect } from 'react';
import { Search, Download, Trash2, CheckCircle, XCircle, MoreVertical, LogOut, Mail, Calendar } from 'lucide-react';
import { getNewsletterData } from '../lib/newsletter/newsletterService';

const PAGE_SIZE = 5;

const Newsletter = () => {
  const [completeData, setCompleteData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [totalReceivedCount, setTotalReceivedCount] = useState(0);
  const [totalEntriesCount, setTotalEntriesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setCompleteData([]);
      setDisplayData([]);
      setTotalReceivedCount(0);
      try {
        const response = await getNewsletterData();
        setCompleteData(prev => [...prev, ...response.data]);
        setTotalReceivedCount(prev => prev + response.length);
        setTotalEntriesCount(response.total);
        setDisplayData(prev => {
          const newData = [...prev, ...response.data];
          return newData.slice(-PAGE_SIZE);
        });
      } catch (err) {
        console.error("Error fetching newsletter data:", err);
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
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Newsletter...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="flex items-center gap-4">
          <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Subscribers</span>
            <span className="text-xl font-bold text-slate-800 tracking-tight">{totalEntriesCount.toLocaleString()}</span>
          </div>
          <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Received</span>
            <span className="text-xl font-bold text-emerald-600 tracking-tight">+{totalReceivedCount}</span>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:shadow-lg transition-all hover:bg-slate-50">
          <Download className="w-5 h-5 text-oncy-mid" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Subscriber Info</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Subscribed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayData.map((sub) => (
                <tr key={sub.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-slate-50 text-slate-400 group-hover:text-oncy-mid group-hover:bg-oncy-light/10 rounded-xl transition-all">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-slate-700 tracking-tight">{sub.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider ${sub.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-400 border-slate-200'
                      }`}>
                      {sub.status === 'ACTIVE' ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-300" />
                      {new Date(sub.date).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing {totalReceivedCount} out of {totalEntriesCount} subscribers</span>
          <div className="flex items-center gap-2">
            <button disabled className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-300 bg-white cursor-not-allowed uppercase tracking-wider">Prev</button>
            <button className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors uppercase tracking-wider">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
