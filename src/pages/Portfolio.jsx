import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Tag, Globe, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getPortfolioProducts, searchPortfolio } from '../lib/portfolio/portfolioService';

const PAGE_SIZE = 5;

const Portfolio = () => {
  const navigate = useNavigate();
  const [completeData, setCompleteData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [totalReceivedCount, setTotalReceivedCount] = useState(0);
  const [totalEntriesCount, setTotalEntriesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (completeData.length === 0) setLoading(true);
      try {
        const response = await searchPortfolio(searchQuery);
        setCompleteData(prev => [...prev, ...response.data]);
        setTotalReceivedCount(prev => prev + response.length);
        setTotalEntriesCount(response.total);
        setDisplayData(prev => {
          const newData = [...prev, ...response.data];
          return newData.slice(-PAGE_SIZE);
        });
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  useEffect(() => {
    setCompleteData([]);
    setDisplayData([]);
    setTotalReceivedCount(0);
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-oncy-mid rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Portfolio...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="relative group min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-oncy-mid transition-colors" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-oncy-light/10 shadow-sm"
          />
        </div>

        <button 
          onClick={() => navigate('/portfolio/addproject')}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-oncy-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-oncy-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Grid */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Project Details</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Category & Tech</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayData.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl border border-slate-100 overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-500">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 tracking-tight">{item.title}</span>
                        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">Ref: PJ-00{item.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wide bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 w-fit">{item.category}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((t, index) => (
                          <span key={index} className="text-[10px] font-bold text-oncy-mid bg-oncy-light/5 px-2 py-0.5 rounded border border-oncy-light/10">{t}</span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-oncy-mid hover:bg-slate-100 rounded-lg transition-all" title="Edit"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing {totalReceivedCount} out of {totalEntriesCount} projects</span>
          <div className="flex items-center gap-2">
            <button disabled className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-300 bg-white cursor-not-allowed uppercase tracking-wider">Prev</button>
            <button className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors uppercase tracking-wider">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
