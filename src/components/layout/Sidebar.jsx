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
  LogOut 
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
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 w-[260px] bg-oncy-navy text-slate-400 flex flex-col z-50 transition-all duration-300">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-oncy-mid rounded flex items-center justify-center shadow-lg shadow-oncy-mid/20">
            <div className="w-4 h-4 border border-white rotate-45" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase">ONCY<span className="text-oncy-mid font-medium italic">TECH</span></span>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-2 ml-1">Admin Panel</p>
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
                ? 'bg-slate-800/50 text-white shadow-sm' 
                : 'hover:bg-slate-800/30 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-oncy-light' : 'group-hover:text-slate-300'}`} />
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
      <div className="p-4 border-t border-slate-800/50 bg-slate-900/30">
        <div className="flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-slate-800 transition-all group cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-oncy-light to-oncy-blue flex items-center justify-center text-white font-bold shadow-md">
              AD
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white tracking-wide">Admin User</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Manager</span>
            </div>
          </div>
          <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
