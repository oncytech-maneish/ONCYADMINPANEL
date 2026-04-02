import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Film, Plus, Trash2, LayoutTemplate, Eye, GripVertical } from 'lucide-react';

const MediaCard = ({ media, onRemove, onUpdateAlt, draggableProps, isDragging }) => {
  const isVideo = media.type.startsWith('video/');

  return (
    <div 
      className={`flex flex-col gap-2 transition-all ${isDragging ? 'opacity-40 scale-[0.98]' : ''}`}
      {...draggableProps}
    >
      <div className={`relative group rounded-xl overflow-hidden border bg-white aspect-[4/3] flex items-center justify-center shadow-sm hover:shadow-md transition-all ${draggableProps ? 'cursor-grab active:cursor-grabbing' : ''} ${isDragging ? 'border-oncy-blue ring-2 ring-oncy-blue/30' : 'border-slate-200'}`}>
        
        {/* Drag Handle Indicator */}
        {draggableProps && (
          <div className="absolute top-3 left-3 z-10 p-1.5 bg-white/90 backdrop-blur-md rounded-md shadow-sm border border-slate-200 opacity-60 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <GripVertical className="w-4 h-4 text-slate-700" title="Drag to reorder" />
          </div>
        )}

        {isVideo ? (
          <video 
            src={media.url} 
            className="w-full h-full object-cover" 
            controls 
          />
        ) : (
          <img 
            src={media.url} 
            alt={media.alt || "Media preview"} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      
      {/* Action Overlay */}
      <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end p-3 gap-2">
        <button 
          onClick={() => window.open(media.url, '_blank', 'noopener,noreferrer')}
          className="p-2 bg-slate-800/90 text-white rounded-full hover:bg-slate-900 hover:scale-110 transition-all shadow-md"
          title="Preview Full Size"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onRemove(media.id)}
          className="p-2 bg-red-500/90 text-white rounded-full hover:bg-red-600 hover:scale-110 transition-all shadow-md"
          title="Remove Media"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Type badge */}
      <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg text-xs font-semibold text-slate-800 shadow-sm border border-slate-100 flex items-center gap-2">
        {isVideo ? <Film className="w-3 h-3 text-blue-400" /> : <ImageIcon className="w-3 h-3 text-emerald-400" />}
        {isVideo ? 'Video' : 'Image'}
      </div>
    </div>
    
    {/* Alt Text Input */}
    <input 
      type="text"
      placeholder="Add descriptive alt text..."
      value={media.alt || ''}
      onChange={(e) => onUpdateAlt(media.id, e.target.value)}
      className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-oncy-blue/20 focus:border-oncy-blue transition-all"
      title="Alternative Text for Accessibility"
    />
  </div>
  );
};

const UploadZone = ({ onUpload, multiple = false, disabled = false, text = "Drag & drop or click to upload" }) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  };

  return (
    <label className={`
      relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all cursor-pointer group
      ${disabled ? 'border-slate-200 bg-slate-50 cursor-not-allowed opacity-50' : 'border-slate-300 hover:border-oncy-blue bg-white hover:bg-slate-50'}
    `}>
      <input 
        type="file" 
        multiple={multiple} 
        accept="image/*,video/*" 
        className="hidden" 
        onChange={handleFileChange}
        disabled={disabled}
      />
      <div className="w-16 h-16 rounded-full bg-slate-50 group-hover:bg-oncy-blue/10 flex items-center justify-center mb-4 transition-colors">
        <Upload className={`w-8 h-8 ${disabled ? 'text-slate-400' : 'text-oncy-blue'}`} />
      </div>
      <p className="text-sm font-semibold text-slate-700 mb-1">{text}</p>
      <p className="text-xs text-slate-500">Supports JPG, PNG, MP4</p>
    </label>
  );
};

import { siteControlData } from '../data';

const SiteControl = () => {
  // --- Header Control State ---
  const [headerLogo, setHeaderLogo] = useState(siteControlData.headerLogo);
  const [menuItems, setMenuItems] = useState(siteControlData.menuItems);

  // --- About Control State ---
  const [titleMedia, setTitleMedia] = useState(siteControlData.titleMedia);
  const [galleryMedia, setGalleryMedia] = useState(siteControlData.galleryMedia);

  // --- Footer Control State ---
  const [footerText, setFooterText] = useState(siteControlData.footerText);

  const [draggedMenuIdx, setDraggedMenuIdx] = useState(null);
  const [draggedMedia, setDraggedMedia] = useState({ type: null, idx: null });

  const handleMediaDragStart = (type, idx) => {
    setDraggedMedia({ type, idx });
  };

  const handleMediaDragEnter = (type, targetIdx) => {
    if (draggedMedia.type !== type || draggedMedia.idx === targetIdx || draggedMedia.idx === null) return;
    
    if (type === 'title') {
      setTitleMedia(prev => {
        const newItems = [...prev];
        const draggedItem = newItems[draggedMedia.idx];
        newItems.splice(draggedMedia.idx, 1);
        newItems.splice(targetIdx, 0, draggedItem);
        return newItems;
      });
    } else if (type === 'gallery') {
      setGalleryMedia(prev => {
        const newItems = [...prev];
        const draggedItem = newItems[draggedMedia.idx];
        newItems.splice(draggedMedia.idx, 1);
        newItems.splice(targetIdx, 0, draggedItem);
        return newItems;
      });
    }
    setDraggedMedia({ type, idx: targetIdx });
  };

  const handleMediaDragEnd = () => {
    setDraggedMedia({ type: null, idx: null });
  };

  const handleDragStart = (idx) => {
    setDraggedMenuIdx(idx);
  };

  const handleDragEnter = (e, targetIdx) => {
    if (draggedMenuIdx === null || draggedMenuIdx === targetIdx) return;
    
    setMenuItems((prev) => {
      const newItems = [...prev];
      const draggedItem = newItems[draggedMenuIdx];
      newItems.splice(draggedMenuIdx, 1);
      newItems.splice(targetIdx, 0, draggedItem);
      return newItems;
    });
    setDraggedMenuIdx(targetIdx);
  };

  const handleDragEnd = () => {
    setDraggedMenuIdx(null);
  };

  const handleUploadHeaderLogo = (files) => {
    const file = files[0];
    if (file) {
      setHeaderLogo({
        id: Math.random().toString(36).substr(2, 9),
        file,
        url: URL.createObjectURL(file),
        type: file.type,
        alt: 'Site Logo'
      });
    }
  };

  const addMenuItem = () => {
    setMenuItems([...menuItems, { id: Math.random().toString(), label: '', url: '' }]);
  };

  const updateMenuItem = (id, field, value) => {
    setMenuItems(menuItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeMenuItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const handleUploadTitleMedia = (files) => {
    const newMedia = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file),
      type: file.type
    }));

    setTitleMedia(prev => {
      const combined = [...prev, ...newMedia];
      return combined.slice(0, 2); // Max 2
    });
  };

  const handleUploadGalleryMedia = (files) => {
    const newMedia = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file),
      type: file.type
    }));

    setGalleryMedia(prev => [...prev, ...newMedia]);
  };

  const removeTitleMedia = (id) => {
    setTitleMedia(prev => prev.filter(m => m.id !== id));
  };

  const removeGalleryMedia = (id) => {
    setGalleryMedia(prev => prev.filter(m => m.id !== id));
  };

  const updateTitleAlt = (id, alt) => {
    setTitleMedia(prev => prev.map(m => m.id === id ? { ...m, alt } : m));
  };

  const updateGalleryAlt = (id, alt) => {
    setGalleryMedia(prev => prev.map(m => m.id === id ? { ...m, alt } : m));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 animate-fade-in pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Site Control</h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">Manage global site headers, footers, and page sections.</p>
        </div>
      </div>

      {/* HEADER CONTROL SECTION */}
      <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="mb-6 flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3 tracking-wide">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                <LayoutTemplate className="w-4 h-4" />
              </span>
              Header Control
            </h2>
            <p className="text-sm text-slate-500 mt-2 ml-11">Manage the site's main logo and navigation menu items.</p>
          </div>
          <button className="px-5 py-2 bg-oncy-blue text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">
            Save Header
          </button>
        </div>

        <div className="ml-11 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Logo Section */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-semibold text-slate-700">Logo Section</h3>
            {headerLogo ? (
              <MediaCard media={headerLogo} onRemove={() => setHeaderLogo(null)} onUpdateAlt={(id, alt) => setHeaderLogo({...headerLogo, alt})} />
            ) : (
              <UploadZone onUpload={handleUploadHeaderLogo} text="Upload navigation logo" />
            )}
          </div>

          {/* Menu Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-700">Menu Section</h3>
              <button 
                onClick={addMenuItem} 
                className="flex items-center gap-2 text-sm text-oncy-blue hover:text-blue-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
              {menuItems.map((item, idx) => (
                <div 
                  key={item.id} 
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragEnter={(e) => handleDragEnter(e, idx)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className={`flex items-center gap-3 bg-white p-3 rounded-lg border shadow-sm group transition-all ${draggedMenuIdx === idx ? 'opacity-40 border-oncy-blue scale-[0.99] shadow-inner' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <GripVertical className="w-4 h-4 text-slate-300 cursor-grab active:cursor-grabbing hover:text-slate-500" />
                  <span className="text-slate-400 font-bold text-xs w-4">{idx + 1}.</span>
                  <input 
                    type="text" 
                    placeholder="Label (e.g. About)" 
                    value={item.label}
                    onChange={(e) => updateMenuItem(item.id, 'label', e.target.value)}
                    className="flex-1 text-sm border-none focus:ring-0 p-1 font-medium text-slate-800 bg-transparent"
                  />
                  <div className="w-px h-6 bg-slate-200 mx-2"></div>
                  <input 
                    type="text" 
                    placeholder="URL (e.g. /about)" 
                    value={item.url}
                    onChange={(e) => updateMenuItem(item.id, 'url', e.target.value)}
                    className="flex-1 text-sm text-slate-500 border-none focus:ring-0 p-1 bg-transparent"
                  />
                  <button 
                    onClick={() => removeMenuItem(item.id)} 
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {menuItems.length === 0 && <p className="text-sm text-slate-500 text-center py-4">No menu items added.</p>}
            </div>
          </div>
        </div>
      </section>

      <div className="pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">About Page Controls</h2>
        <p className="text-sm text-slate-500 font-medium">Control the media content presented on the About page.</p>
      </div>

      {/* Title Media Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3 tracking-wide">
              <span className="w-8 h-8 rounded-lg bg-oncy-blue/10 flex items-center justify-center text-oncy-blue">1</span>
              Title Media
            </h2>
            <p className="text-sm text-slate-500 mt-2 ml-11">The top 2 main images or videos describing 'About OncyTech'</p>
          </div>
          <button className="px-5 py-2 bg-oncy-blue text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">
            Save Title Media
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-11">
          {titleMedia.map((media, idx) => (
            <MediaCard 
              key={media.id} 
              media={media} 
              onRemove={removeTitleMedia} 
              onUpdateAlt={updateTitleAlt} 
              isDragging={draggedMedia.type === 'title' && draggedMedia.idx === idx}
              draggableProps={{
                draggable: true,
                onDragStart: () => handleMediaDragStart('title', idx),
                onDragEnter: () => handleMediaDragEnter('title', idx),
                onDragEnd: handleMediaDragEnd,
                onDragOver: (e) => e.preventDefault()
              }}
            />
          ))}
          
          {titleMedia.length < 2 && (
            <UploadZone 
              onUpload={handleUploadTitleMedia} 
              multiple={true}
              disabled={titleMedia.length >= 2}
              text={`Upload up to ${2 - titleMedia.length} more media file(s)`}
            />
          )}
        </div>
      </section>

      {/* Gallery Media Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3 tracking-wide">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">2</span>
              Gallery Media
            </h2>
            <p className="text-sm text-slate-500 mt-2 ml-11">Infinite scrolling gallery under 'Inside OncyTech'</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-4 py-1.5 bg-slate-50 text-slate-600 rounded-full text-xs font-bold border border-slate-200">
              {galleryMedia.length} Items Uploaded
            </span>
            <button className="px-5 py-2 bg-oncy-blue text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">
              Save Gallery
            </button>
          </div>
        </div>

        <div className="ml-11">
          <UploadZone 
            onUpload={handleUploadGalleryMedia} 
            multiple={true} 
            text="Upload multiple images to the gallery"
          />

          {galleryMedia.length > 0 && (
             <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
               {galleryMedia.map((media, idx) => (
                 <MediaCard 
                   key={media.id} 
                   media={media} 
                   onRemove={removeGalleryMedia} 
                   onUpdateAlt={updateGalleryAlt}
                   isDragging={draggedMedia.type === 'gallery' && draggedMedia.idx === idx}
                   draggableProps={{
                     draggable: true,
                     onDragStart: () => handleMediaDragStart('gallery', idx),
                     onDragEnter: () => handleMediaDragEnter('gallery', idx),
                     onDragEnd: handleMediaDragEnd,
                     onDragOver: (e) => e.preventDefault()
                   }}
                 />
               ))}
             </div>
          )}
        </div>
      </section>

      {/* FOOTER CONTROL */}
      <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="mb-6 flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3 tracking-wide">
              <span className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600">
                <LayoutTemplate className="w-4 h-4 rotate-180" />
              </span>
              Footer Control
            </h2>
            <p className="text-sm text-slate-500 mt-2 ml-11">Manage bottom footer text and links.</p>
          </div>
          <button className="px-5 py-2 bg-oncy-blue text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">
            Save Footer
          </button>
        </div>
        <div className="ml-11 max-w-xl">
          <label className="block text-sm font-semibold text-slate-700 mb-2 mt-4">Copyright Text</label>
          <input 
            type="text" 
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-oncy-blue focus:ring-1 focus:ring-oncy-blue transition-all"
          />
        </div>
      </section>

    </div>
  );
};

export default SiteControl;
