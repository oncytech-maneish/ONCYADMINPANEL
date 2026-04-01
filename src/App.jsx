import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedLayout from './components/layout/ProtectedLayout';
import Login from './pages/auth/login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import BlogList from './pages/blogs/BlogList';
import CreateBlog from './pages/blogs/CreateBlog';
import EditBlog from './pages/blogs/EditBlog';
import Employees from './pages/Employees';
import Products from './pages/Products';
import Portfolio from './pages/Portfolio';
import DemoRequests from './pages/DemoRequests';
import JobApplications from './pages/JobApplications';
import Newsletter from './pages/Newsletter';
import Settings from './pages/Settings';
import AddProject from './pages/portfolio/AddProject';
import AddProduct from './pages/products/AddProduct';
import AddTeamMember from './pages/team/AddTeamMember';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Dashboard Routes */}
      <Route element={<ProtectedLayout />}>
        {/* Core */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enquiries" element={<Enquiries />} />
        
        {/* Content Management */}
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/new" element={<CreateBlog />} />
        <Route path="/blogs/:id/edit" element={<EditBlog />} />
        
        {/* Team & Assets */}
        <Route path="/employees" element={<Employees />} />
        <Route path="/team/addTeamMember" element={<AddTeamMember />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/addproduct" element={<AddProduct />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/addproject" element={<AddProject />} />
        
        {/* Requests & Communications */}
        <Route path="/demo-requests" element={<DemoRequests />} />
        <Route path="/job-applications" element={<JobApplications />} />
        <Route path="/newsletter" element={<Newsletter />} />
        
        {/* System & Profile */}
        <Route path="/settings" element={<Settings />} />
        
        {/* Internal Redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
