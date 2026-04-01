import { useState, useEffect } from 'react';
import { Search, Download, ExternalLink, MoreVertical, FileArchive, CheckCircle, Clock } from 'lucide-react';
import {
  getAllJobApplications,
  getNewJobApplications,
  getReviewingJobApplications,
  getInterviewJobApplications,
  getHiredJobApplications,
  getRejectedJobApplications
} from '../lib/applications/applicationService';

const PAGE_SIZE = 5;

const JobApplications = () => {
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
            response = await getNewJobApplications();
            break;
          case 'Reviewing':
            response = await getReviewingJobApplications();
            break;
          case 'Interview':
            response = await getInterviewJobApplications();
            break;
          case 'Hired':
            response = await getHiredJobApplications();
            break;
          case 'Rejected':
            response = await getRejectedJobApplications();
            break;
          default:
            response = await getAllJobApplications();
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
        console.error("Error fetching job applications:", err);
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
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Applications...</span>
        </div>
      </div>
    );
  }

  const statusStyles = {
    'NEW': 'bg-blue-50 text-blue-700 border-blue-100',
    'REVIEWING': 'bg-amber-50 text-amber-700 border-amber-100',
    'INTERVIEW': 'bg-indigo-50 text-indigo-700 border-indigo-100',
    'HIRED': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'REJECTED': 'bg-red-50 text-red-700 border-red-100',
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="flex items-center gap-2">
          {['All', 'New', 'Reviewing', 'Interview', 'Hired', 'Rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all ${(filter === tab)
                  ? 'bg-oncy-navy text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div key={filter} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Applicant</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Applied Role</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Assets</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayData.map((app) => (
                <tr key={app.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800 tracking-tight">{app.name}</span>
                      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">{app.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-slate-700 tracking-tight">{app.role}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <a href={app.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-oncy-light/10 text-oncy-mid rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border border-transparent hover:border-oncy-light/20">
                        <ExternalLink className="w-3 h-3" /> Portfolio
                      </a>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border border-transparent hover:border-emerald-200">
                        <Download className="w-3 h-3" /> Resume
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${statusStyles[app.status]}`}>
                      {app.status === 'NEW' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all rotate-90">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing {totalReceivedCount} out of {totalEntriesCount} applications</span>
          <div className="flex items-center gap-2">
            <button disabled className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-300 bg-white cursor-not-allowed uppercase tracking-wider">Prev</button>
            <button className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors uppercase tracking-wider">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplications;
