import { useState, useEffect } from 'react';
import { Search, Plus, Linkedin, Mail, MoreHorizontal, User, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  getAllTeamMembers, 
  getActiveTeamMembers, 
  getInactiveTeamMembers 
} from '../lib/team/teamService';

const PAGE_SIZE = 4;

const Employees = () => {
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
          case 'Active':
            response = await getActiveTeamMembers();
            break;
          case 'Inactive':
            response = await getInactiveTeamMembers();
            break;
          default:
            response = await getAllTeamMembers();
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
        console.error("Error fetching team members:", err);
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
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Team...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-100 shadow-sm w-fit transition-all hover:shadow-md">
          {['All', 'Active', 'Inactive'].map((tab) => (
             <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                (filter === tab) 
                ? 'bg-oncy-navy text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <button 
          onClick={() => navigate('/team/addTeamMember')}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-oncy-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-oncy-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus className="w-5 h-5 font-black" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Grid */}
      <div key={filter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
        {displayData.map((emp, i) => (
          <div key={emp.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group hover:shadow-xl hover:border-oncy-light/20 transition-all cursor-pointer relative overflow-hidden" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex flex-col items-center text-center">
              {/* Profile Image / Initials */}
              <div className="relative mb-4 group-hover:scale-105 transition-transform duration-500">
                <div className="w-24 h-24 rounded-full bg-slate-50 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                  {emp.image ? (
                     <img src={emp.image} alt={emp.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-slate-200" />
                  )}
                </div>
                <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-white shadow-sm flex items-center justify-center transition-colors ${emp.active ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                   {emp.active ? <CheckCircle2 className="w-3 h-3 text-white" /> : <XCircle className="w-3 h-3 text-white" />}
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-800 tracking-tight group-hover:text-oncy-mid transition-colors">{emp.name}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{emp.position}</p>
              <div className="mt-4 px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest">
                {emp.department}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 w-full flex items-center justify-center gap-4">
                <button className="p-2.5 bg-slate-50 hover:bg-oncy-light/10 text-slate-400 hover:text-oncy-mid rounded-xl transition-all"><Linkedin className="w-4 h-4" /></button>
                <button className="p-2.5 bg-slate-50 hover:bg-oncy-mid hover:text-white text-slate-400 rounded-xl transition-all"><Mail className="w-4 h-4" /></button>
                <button className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl transition-all"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
            </div>
            
            {/* Top Indicator */}
            <div className="absolute top-4 right-4">
               <span className="text-[10px] font-bold text-slate-300">#{emp.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex items-center justify-between rounded-2xl">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing {totalReceivedCount} out of {totalEntriesCount} team members</span>
        <div className="flex items-center gap-2">
          <button disabled className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-300 bg-white cursor-not-allowed uppercase tracking-wider">Prev</button>
          <button className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors uppercase tracking-wider">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Employees;
