import { useState } from 'react';
import { Save, Plus, X, ChevronLeft, User, Mail, Briefcase, Phone, MapPin, Linkedin, Github, Globe, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddTeamMember = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="max-w-[1100px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/employees')}
            className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Onboard Team Member</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Human Resources</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/employees')}
            className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button className="px-8 py-2.5 bg-oncy-gradient text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-oncy-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal & Professional */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
               <div className="relative group self-center md:self-start">
                  <div className="w-24 h-24 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group-hover:bg-slate-100/50 group-hover:border-oncy-mid/50 transition-all cursor-pointer overflow-hidden">
                    <User className="w-8 h-8 text-slate-300 transition-colors" />
                    <span className="text-[8px] font-black font-sans uppercase tracking-widest text-slate-400 mt-2">Upload Photo</span>
                  </div>
               </div>
               <div className="flex-1 w-full space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Johnathan Doe"
                      className="w-full px-5 py-4 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-lg font-bold text-slate-800 transition-all"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5" /> Job Role
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. Senior Frontend Architect"
                        className="w-full px-4 py-3 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-sm font-bold text-slate-700 transition-all"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Department</label>
                      <select 
                        className="w-full px-4 py-3 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-sm font-bold text-slate-700 transition-all"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      >
                        <option value="">Select Dept</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Product">Product</option>
                      </select>
                    </div>
                  </div>
               </div>
            </div>

            <div className="border-t border-slate-50 pt-8 space-y-6">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1 flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email Address
                  </label>
                  <input 
                    type="email" 
                    placeholder="john@oncytech.com"
                    className="w-full px-4 py-3 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-oncy-light/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1 flex items-center gap-2">
                    <Phone className="w-3 h-3" /> Phone Number
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-oncy-light/20"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Work Summary */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
             <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Professional Bio</label>
             <textarea 
               rows="4" 
               placeholder="Write a brief professional summary..."
               className="w-full px-5 py-4 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-sm font-medium text-slate-600 transition-all resize-none"
             ></textarea>
          </div>
        </div>

        {/* Right Column: Socials & Settings */}
        <div className="space-y-6">
          {/* Social Links */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
             <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Social Profiles</h3>
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <input type="url" placeholder="LinkedIn URL" className="flex-1 bg-transparent border-b border-slate-100 text-[10px] font-bold text-oncy-mid py-1 outline-none" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                    <Github className="w-4 h-4" />
                  </div>
                  <input type="url" placeholder="GitHub URL" className="flex-1 bg-transparent border-b border-slate-100 text-[10px] font-bold text-oncy-mid py-1 outline-none" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input type="url" placeholder="Portfolio URL" className="flex-1 bg-transparent border-b border-slate-100 text-[10px] font-bold text-oncy-mid py-1 outline-none" />
                </div>
             </div>
          </div>

          {/* Hiring Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
             <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Employment Context</h3>
             <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Joining Date</label>
                  <input type="date" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-500 outline-none" />
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg border border-slate-100">
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Show on Web</span>
                   <div className="w-10 h-5 bg-oncy-mid rounded-full relative cursor-pointer active:scale-95 transition-all">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-oncy-mid p-6 rounded-2xl shadow-xl shadow-oncy-blue/20">
             <h3 className="text-[11px] font-black uppercase tracking-widest text-white/50 mb-2">Team Status</h3>
             <p className="text-white text-xs font-bold leading-relaxed opacity-90">Please ensure all regulatory docs are verified before onboarding.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMember;
