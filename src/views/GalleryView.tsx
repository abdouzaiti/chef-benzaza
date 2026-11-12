import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GalleryItem } from '../types';
import { Sparkles, X, ZoomIn, User } from 'lucide-react';

export const GalleryView: React.FC = () => {
  const { gallery, t, language } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: t('all') },
    { id: 'pastry', label: t('categoryPastry') },
    { id: 'pizza', label: t('categoryPizza') },
    { id: 'culinary', label: t('categoryCulinary') },
    { id: 'hair', label: t('categoryHair') },
    { id: 'it', label: t('categoryIt') },
  ];

  const filteredGallery = gallery.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C]">
          Portfolio & Travaux Pratiques
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] font-display text-balance">
          {t('galleryTitle')}
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          {t('gallerySubtitle')}. Des réalisations 100% exécutées par nos apprenants en conditions réelles d'atelier.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-white border border-[#E6DFD3] rounded-lg shadow-xs max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#171717] text-[#C9A45C] shadow-sm'
                  : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setPreviewItem(item)}
            className="group relative h-72 rounded-xl overflow-hidden cursor-pointer bg-neutral-900 border border-[#E6DFD3] shadow-xs"
          >
            <img
              src={item.image}
              alt={item.title[language] || item.title.fr}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A45C] block mb-1">
                {item.category.toUpperCase()}
              </span>
              <h3 className="text-sm font-bold text-white font-display">
                {item.title[language] || item.title.fr}
              </h3>
              {item.studentName && (
                <p className="text-[11px] text-neutral-300 mt-1 flex items-center gap-1.5">
                  <User className="w-3 h-3 text-[#C9A45C]" />
                  <span>{item.studentName}</span>
                </p>
              )}
            </div>

            <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-black/50 text-white rounded-full">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-[#141414] rounded-xl overflow-hidden border border-[#333] shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10 p-2 bg-black/60 text-white rounded-full hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-hidden bg-black flex items-center justify-center">
              <img
                src={previewItem.image}
                alt={previewItem.title[language] || previewItem.title.fr}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-5 bg-[#171717] border-t border-[#2d2a24]">
              <span className="text-xs uppercase font-mono text-[#C9A45C] block mb-1">
                Réalisation Étudiante — {previewItem.category.toUpperCase()}
              </span>
              <h3 className="text-lg font-bold text-white font-display">
                {previewItem.title[language] || previewItem.title.fr}
              </h3>
              {previewItem.studentName && (
                <p className="text-xs text-neutral-400 mt-1">
                  Atelier / Promotion : {previewItem.studentName}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
