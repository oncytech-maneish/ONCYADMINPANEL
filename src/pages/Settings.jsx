import { useState, useEffect } from 'react';
import { User, Lock, Mail, Shield, ShieldCheck, ChevronRight, Save } from 'lucide-react';
import { getAdminData } from '../lib/admin/adminService';

const Settings = () => {
  const [completeData, setCompleteData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [totalReceivedCount, setTotalReceivedCount] = useState(0);
  const [totalEntriesCount, setTotalEntriesCount] = useState(0);
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await getAdminData();
        setCompleteData(prev => [...prev, ...response.data]);
        setTotalReceivedCount(prev => prev + response.length);
        setTotalEntriesCount(response.total);
        setDisplayData(response.data);
        if (response.data.length > 0) {
          const admin = response.data[0];
          setAdminData({
            name: admin.name,
            email: admin.email,
            role: admin.role,
          });
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-oncy-mid rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Profile Section */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-oncy-light/5 blur-[80px] pointer-events-none" />
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3.5 bg-oncy-light/10 text-oncy-mid rounded-2xl border border-oncy-light/20 shadow-sm">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Admin Profile</h3>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Manage your identity information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
            <input type="text" value={adminData.name} onChange={(e) => setAdminData({ ...adminData, name: e.target.value })} className="w-full px-4 py-3 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-sm font-bold text-slate-800 transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <input type="email" value={adminData.email} className="w-full px-4 py-3 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-sm font-bold text-slate-800 transition-all disabled:opacity-50" disabled />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Account Role</label>
            <div className="flex items-center gap-2 px-4 py-3 bg-oncy-navy rounded-xl text-white">
              <ShieldCheck className="w-4 h-4 text-oncy-light" />
              <span className="text-xs font-black uppercase tracking-widest">{adminData.role}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-50 flex justify-between items-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing {totalReceivedCount} out of {totalEntriesCount} admins</span>
          <button className="flex items-center gap-2 px-8 py-3 bg-oncy-gradient text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-oncy-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Save className="w-4 h-4" /> Save Profile
          </button>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3.5 bg-red-50 text-red-500 rounded-2xl border border-red-100 shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Security & Password</h3>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Manage your credentials and login safety</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-sm font-bold text-slate-800 transition-all italic" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-sm font-bold text-slate-800 transition-all italic" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Confirm New Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-sm font-bold text-slate-800 transition-all italic" />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-50 flex justify-end">
          <button className="flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
