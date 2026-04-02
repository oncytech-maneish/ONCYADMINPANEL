import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Users, 
  Package, 
  Briefcase, 
  Calendar, 
  UserPlus, 
  Mail, 
  Settings, 
  LogOut,
  Globe
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: MessageSquare, label: 'Enquiries', path: '/enquiries', badge: 'RED' },
  { icon: FileText, label: 'Blogs', path: '/blogs' },
  { icon: Users, label: 'Team', path: '/employees' },
  { icon: Package, label: 'Products', path: '/products' },
  { icon: Briefcase, label: 'Portfolio', path: '/portfolio' },
  { icon: Calendar, label: 'Demo Requests', path: '/demo-requests', badge: 'RED' },
  { icon: UserPlus, label: 'Applications', path: '/job-applications', badge: 'RED' },
  { icon: Mail, label: 'Newsletter', path: '/newsletter' },
  { icon: Globe, label: 'Site Control', path: '/site-control' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 w-[260px] bg-white border-r border-slate-100 text-slate-600 flex flex-col z-50 transition-all duration-300">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-100">
        <img src="/ONCYTECHLOGO.png" alt="OncyTech Logo" className="h-16 w-auto object-contain drop-shadow-sm rounded-[10%]" />
        <p className="text-sm font-semibold tracking-wide text-slate-800 mt-3 ml-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                isActive 
                ? 'bg-oncy-blue/10 text-oncy-blue shadow-sm' 
                : 'hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-oncy-blue' : 'group-hover:text-oncy-mid'}`} />
                <span className="text-sm font-semibold tracking-wide">{item.label}</span>
              </div>
              {item.badge && (
                <div className="w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User / Logout */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-slate-200 hover:bg-white transition-all group cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-oncy-mid to-oncy-blue flex items-center justify-center text-white font-bold shadow-md">
              AD
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800 tracking-wide">Admin User</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Manager</span>
            </div>
          </div>
          <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
