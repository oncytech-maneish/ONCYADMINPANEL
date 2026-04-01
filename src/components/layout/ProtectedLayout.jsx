import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const ProtectedLayout = () => {
  // Simulating authentication context
  const isAuthenticated = true; // In a real app, check auth state here

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900 antialiased overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-[1280px] mx-auto animate-in fade-in duration-700">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
