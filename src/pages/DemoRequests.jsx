import { useState, useEffect } from 'react';
import { Search, Calendar, Clock, User, Building2, MoreHorizontal, CheckCircle2, XCircle, Clock4, Trash2 } from 'lucide-react';
import { 
  getAllDemoRequests, 
  getPendingDemoRequests, 
  getConfirmedDemoRequests, 
  getCompletedDemoRequests, 
  getCancelledDemoRequests 
} from '../lib/requests/requestService';

const PAGE_SIZE = 5;

const DemoRequests = () => {
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
          case 'Pending':
            response = await getPendingDemoRequests();
            break;
          case 'Confirmed':
            response = await getConfirmedDemoRequests();
            break;
          case 'Completed':
            response = await getCompletedDemoRequests();
            break;
          case 'Cancelled':
            response = await getCancelledDemoRequests();
            break;
          default:
            response = await getAllDemoRequests();
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
        console.error("Error fetching demo requests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-oncy-mid rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Requests...</span>
        </div>
      </div>
    );
  }

  const statusMap = {
    'PENDING': { color: 'blue', icon: Clock4 },
    'CONFIRMED': { color: 'indigo', icon: CheckCircle2 },
    'COMPLETED': { color: 'emerald', icon: CheckCircle2 },
    'CANCELLED': { color: 'red', icon: XCircle },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-100 shadow-sm w-fit group">
          {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((tab) => (
             <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                (filter === tab) 
                ? 'bg-oncy-navy text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Grid/Table */}
      <div key={filter} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Requester</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Service</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Schedule</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayData.map((req) => {
                const status = statusMap[req.status];
                return (
                  <tr key={req.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                          <User className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800 tracking-tight">{req.name}</span>
                          <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1 uppercase tracking-wider"><Building2 className="w-3 h-3" /> {req.company}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-slate-700">{req.service}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-300" /> {new Date(req.date).toLocaleDateString()}</span>
                        <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-300" /> {req.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider bg-${status.color}-50 text-${status.color}-700 border-${status.color}-100`}>
                        <status.icon className="w-3.5 h-3.5 shrink-0" />
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                       <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="px-4 py-2 border border-slate-200 rounded-lg text-[10px] font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest">Update</button>
                         <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                       </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing {totalReceivedCount} out of {totalEntriesCount} requests</span>
          <div className="flex items-center gap-2">
            <button disabled className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-300 bg-white cursor-not-allowed uppercase tracking-wider">Prev</button>
            <button className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors uppercase tracking-wider">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoRequests;
