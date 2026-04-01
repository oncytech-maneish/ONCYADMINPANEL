import { useState } from 'react';
import { Save, Globe, Eye, Image as ImageIcon, Plus, X, ChevronLeft, Calendar, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('DRAFT');
  const [tags, setTags] = useState(['AI', 'Tech']);
  const [newTag, setNewTag] = useState('');

  const generateSlug = (val) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  const addTag = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
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
            onClick={() => navigate('/blogs')}
            className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Create New Blog Post</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Insights Management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Save as Draft</button>
          <button className="px-8 py-2.5 bg-oncy-gradient text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-oncy-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
            <Globe className="w-4 h-4" /> Publish Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Post Title</label>
              <input 
                type="text" 
                placeholder="Enter a compelling title..."
                className="w-full px-5 py-4 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-lg font-bold text-slate-800 transition-all"
                value={title}
                onChange={(e) => generateSlug(e.target.value)}
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">URL Slug</label>
              <div className="flex items-center gap-2 bg-slate-100/50 px-4 py-2.5 rounded-lg border border-slate-100">
                <span className="text-xs font-bold text-slate-400">oncytech.com/insights/</span>
                <input 
                  type="text" 
                  className="bg-transparent text-xs font-bold text-oncy-mid focus:outline-none flex-1"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5 pt-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Main Content</label>
              <div className="min-h-[400px] border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center p-12 text-center group hover:border-oncy-light/50 transition-colors cursor-text">
                 <Plus className="w-8 h-8 text-slate-200 group-hover:text-oncy-light transition-colors mb-4" />
                 <p className="text-sm font-bold text-slate-300">Start writing your professional insight here...</p>
                 <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mt-2">Rich text editor initialized</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
             <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Post Excerpt (Summary)</label>
             <textarea 
               rows="3" 
               placeholder="Write a brief overview of the post..."
               className="w-full px-5 py-4 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-sm font-medium text-slate-600 transition-all resize-none"
             ></textarea>
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">Publishing Settings</h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg">
                  <span className="text-xs font-bold text-slate-600">Status:</span>
                  <select 
                    className="bg-transparent text-xs font-black text-oncy-mid focus:outline-none uppercase"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                  </select>
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Visible to Public</span>
                  <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer active:scale-95 transition-transform">
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
             </div>
          </div>

          {/* Cover Image Upload */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">Cover Image</h3>
             <div className="aspect-video rounded-xl border-2 border-dashed border-slate-100 bg-slate-50 flex flex-col items-center justify-center hover:bg-slate-100/50 hover:border-slate-200 transition-all cursor-pointer group">
                <ImageIcon className="w-6 h-6 text-slate-300 group-hover:text-slate-400 transition-colors mb-2" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Image</span>
                <span className="text-[9px] text-slate-300 font-bold mt-1">Recommended: 1200x630px</span>
             </div>
          </div>

          {/* Category & Tags */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
             <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                <select className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-oncy-light/20">
                  <option value="">Select Category</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
             </div>
             
             <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <Tag className="w-3 h-3" /> Tags
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
                  placeholder="Add tag and press Enter..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-700 focus:outline-none placeholder:text-slate-300"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={addTag}
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
