import { Search, Bell, User, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Topbar = () => {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    const path = pathname.split('/')[1];
    if (path === 'dashboard') return 'Dashboard';
    if (path === 'enquiries') return 'Enquiries';
    if (path === 'blogs') return 'Blog Management';
    if (path === 'employees') return 'Team Members';
    if (path === 'products') return 'Products';
    if (path === 'portfolio') return 'Portfolio';
    if (path === 'demo-requests') return 'Demo Requests';
    if (path === 'job-applications') return 'Job Applications';
    if (path === 'newsletter') return 'Newsletter Subscribers';
    if (path === 'settings') return 'Settings';
    return 'Dashboard';
  };

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 text-oncy-navy animate-in fade-in duration-500">
      <h1 className="text-xl font-bold tracking-tight text-slate-800 uppercase">{getPageTitle(location.pathname)}</h1>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-oncy-mid transition-colors" />
          <input 
            type="text" 
            placeholder="Search documents..." 
            className="pl-10 pr-4 py-2 bg-slate-50 border border-transparent focus:border-oncy-light focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-lg text-sm font-medium transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:text-oncy-mid hover:bg-oncy-light/10 rounded-lg transition-all group">
          <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full shadow-sm" />
        </button>

        {/* User Card */}
        <div className="flex items-center gap-3 pl-6 border-l border-slate-100 cursor-pointer group">
          <div className="flex flex-col text-right">
            <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">Admin Account</span>
            <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Global Manager</span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-oncy-light transition-all p-0.5">
            <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center shadow-inner overflow-hidden">
              <User className="w-5 h-5 text-slate-400" />
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-oncy-mid transition-colors" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
