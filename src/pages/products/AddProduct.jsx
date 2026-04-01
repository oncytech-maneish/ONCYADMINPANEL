import { useState } from 'react';
import { Save, Plus, X, ChevronLeft, Image as ImageIcon, Tag, Package, ShoppingBag, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(['Software', 'SaaS']);
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
            onClick={() => navigate('/products')}
            className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Add New Product</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Product Inventory</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/products')}
            className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all"
          >
            Discard
          </button>
          <button className="px-8 py-2.5 bg-oncy-gradient text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-oncy-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Product Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <Package className="w-3.5 h-3.5" /> Product Title
              </label>
              <input 
                type="text" 
                placeholder="e.g. Oncy Tech AI Assistant"
                className="w-full px-5 py-4 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-lg font-bold text-slate-800 transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                <select 
                  className="w-full px-5 py-3.5 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-sm font-bold text-slate-700 transition-all appearance-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Enterprise Software">Enterprise Software</option>
                  <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                  <option value="AI Solutions">AI Solutions</option>
                  <option value="DevTools">DevTools</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                   <ShoppingBag className="w-3.5 h-3.5" /> Starting Price
                </label>
                <div className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input 
                    type="number" 
                    placeholder="99.00"
                    className="w-full pl-9 pr-5 py-3.5 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-xl text-sm font-bold text-slate-700 transition-all"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Detailed Description</label>
              <textarea 
                rows="8"
                placeholder="Break down the product features, benefits and roadmap..."
                className="w-full px-5 py-4 bg-slate-50/50 border border-transparent focus:border-oncy-mid focus:bg-white focus:ring-4 focus:ring-oncy-light/10 rounded-2xl text-sm font-medium text-slate-600 transition-all resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          
          {/* Feature highlights */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
             <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
               <LayoutGrid className="w-3.5 h-3.5" /> Key Feature Highlights
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="p-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors cursor-pointer group flex flex-col items-center justify-center text-center">
                    <Plus className="w-5 h-5 text-slate-300 group-hover:text-oncy-mid transition-colors mb-2" />
                    <span className="text-[10px] font-bold text-slate-400">Add Highlight</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Right Column: Asset & Specs */}
        <div className="space-y-6">
          {/* Display Asset */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4 ml-1 flex items-center gap-2">
               <ImageIcon className="w-3.5 h-3.5" /> Product Packshot
             </h3>
             <div className="aspect-square rounded-xl border-2 border-dashed border-slate-100 bg-slate-50 flex flex-col items-center justify-center hover:bg-slate-100/50 hover:border-slate-200 transition-all cursor-pointer group relative overflow-hidden">
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <Plus className="w-8 h-8 text-slate-300 group-hover:text-oncy-mid transition-colors mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Product Image</span>
                  <span className="text-[9px] text-slate-300 font-bold mt-1">Recommended: 1000x1000px</span>
                </div>
             </div>
          </div>

          {/* Classification Tags */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
             <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <Tag className="w-3 h-3" /> Search Meta Tags
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
                  placeholder="e.g. AI Model, press Enter..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-700 focus:outline-none placeholder:text-slate-300"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={addTag}
                />
             </div>
          </div>

          {/* Product Lifecycle */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
             <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Stock & Status</h3>
             <div className="space-y-3">
                <div className="flex items-center justify-between px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Inventory Status</span>
                  <span className="text-[10px] font-black text-emerald-600 uppercase">In Stock</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Visibility</span>
                  <div className="w-10 h-5 bg-oncy-mid rounded-full relative cursor-pointer shadow-sm shadow-oncy-mid/20 transition-all">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
