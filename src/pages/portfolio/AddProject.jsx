import { useState } from 'react';
import { Save, Plus, X, ChevronLeft, Image as ImageIcon, Link as LinkIcon, Calendar, Tag, Globe, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(['React', 'Node.js']);
  const [newTag, setNewTag] = useState('');

  const addTag = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const removeTag = (t) => setTags(tags.filter(item => item !== t));

  return (
    <div className="max-w-[1100px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/portfolio')}
            className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Add New Project</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Portfolio Management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/portfolio')}
            className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button className="px-8 py-2.5 bg-oncy-gradient text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-oncy-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Project Title</label>
              <input 
                type="text" 
                placeholder="e.g. E-commerce Platform Redesign"
                className="w-full px-5 py-4 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-lg font-bold text-slate-800 transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Client Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Oncy Tech"
                  className="w-full px-5 py-3.5 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-sm font-bold text-slate-700 transition-all"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                <select 
                  className="w-full px-5 py-3.5 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-sm font-bold text-slate-700 transition-all appearance-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Cloud Solutions">Cloud Solutions</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5 pt-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Case Study Description</label>
              <textarea 
                rows="8"
                placeholder="Describe the project goals, challenges, and solutions..."
                className="w-full px-5 py-4 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-2xl text-sm font-medium text-slate-600 transition-all resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
             <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
               <LinkIcon className="w-3.5 h-3.5" /> Project Links
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Live Demo URL</label>
                  <input type="url" placeholder="https://" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-oncy-mid" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Source Code (Private/Public)</label>
                  <input type="url" placeholder="https://github.com/..." className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-oncy-mid" />
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Assets & Tags */}
        <div className="space-y-6">
          {/* Main Display Image */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4 ml-1 flex items-center gap-2">
               <ImageIcon className="w-3.5 h-3.5" /> Featured Image
             </h3>
             <div className="aspect-[4/3] rounded-xl border-2 border-dashed border-slate-100 bg-slate-50 flex flex-col items-center justify-center hover:bg-slate-100/50 hover:border-slate-200 transition-all cursor-pointer group relative overflow-hidden">
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <Plus className="w-8 h-8 text-slate-300 group-hover:text-oncy-mid transition-colors mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Project Cover</span>
                  <span className="text-[9px] text-slate-300 font-bold mt-1">Recommended: 1600x1200px</span>
                </div>
             </div>
          </div>

          {/* Project Stats */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
             <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
               <Calendar className="w-3.5 h-3.5" /> Project Timeline
             </h3>
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <label className="text-[9px] font-black uppercase tracking-widest text-slate-300">Started</label>
                 <input type="date" className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 focus:outline-none" />
               </div>
               <div className="space-y-1">
                 <label className="text-[9px] font-black uppercase tracking-widest text-slate-300">Completed</label>
                 <input type="date" className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 focus:outline-none" />
               </div>
             </div>
          </div>

          {/* Technologies */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
             <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <Tag className="w-3 h-3" /> Technologies Used
                </label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t, index) => (
                    <span key={index} className="flex items-center gap-2 px-2.5 py-1 bg-oncy-light/5 text-oncy-mid rounded-lg border border-oncy-light/10 text-[10px] font-black uppercase tracking-wider">
                      {t}
                      <button onClick={() => removeTag(t)}><X className="w-3 h-3 text-oncy-mid/50 hover:text-oncy-mid transition-colors" /></button>
                    </span>
                  ))}
                </div>
                <input 
                  type="text" 
                  placeholder="e.g. Docker, press Enter..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-700 focus:outline-none placeholder:text-slate-300"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={addTag}
                />
             </div>
          </div>

          {/* Settings */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
             <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Visibility Settings</h3>
             <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Home Page</span>
                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-oncy-mid focus:ring-oncy-light/20" />
             </div>
             <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Status</span>
                <span className="text-[10px] font-black text-emerald-600 uppercase">Public</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
