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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-[#8C6B28]">
          Portfolio & Travaux Pratiques
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#2D241E] font-display text-balance">
          {t('galleryTitle')}
        </h1>
        <p className="text-sm text-[#6B5E52] leading-relaxed">
          {t('gallerySubtitle')}. Des réalisations 100% exécutées par nos apprenants en conditions réelles d'atelier.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none p-1.5 bg-white border border-[#E8DEC8] rounded-lg shadow-xs max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#C9A45C] text-white shadow-xs'
                  : 'text-[#6B5E52] hover:text-[#8C6B28] hover:bg-[#FAF7F2]'
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
            className="group relative h-72 rounded-xl overflow-hidden cursor-pointer bg-neutral-100 border border-[#E8DEC8] shadow-xs"
          >
            <img
              src={item.image}
              alt={item.title[language] || item.title.fr}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/90 via-[#2D241E]/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#DFC283] font-bold block mb-1">
                {item.category.toUpperCase()}
              </span>
              <h3 className="text-sm font-bold text-white font-display">
                {item.title[language] || item.title.fr}
              </h3>
              {item.studentName && (
                <p className="text-[11px] text-neutral-200 mt-1 flex items-center gap-1.5">
                  <User className="w-3 h-3 text-[#DFC283]" />
                  <span>{item.studentName}</span>
                </p>
              )}
            </div>

            <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-2 bg-white/90 text-[#2D241E] rounded-full shadow-sm">
              <ZoomIn className="w-4 h-4 text-[#8C6B28]" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 bg-[#2D241E]/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden border border-[#E8DEC8] shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 rtl:right-auto rtl:left-3 sm:rtl:left-4 z-10 p-2 bg-white/90 text-[#2D241E] rounded-full hover:bg-white shadow-md transition-colors border border-[#E8DEC8]"
            >
              <X className="w-5 h-5 text-[#8C6B28]" />
            </button>

            <div className="overflow-hidden bg-[#FAF7F2] flex items-center justify-center p-2 sm:p-4">
              <img
                src={previewItem.image}
                alt={previewItem.title[language] || previewItem.title.fr}
                referrerPolicy="no-referrer"
                className="max-h-[60vh] sm:max-h-[70vh] w-full object-contain rounded"
              />
            </div>

            <div className="p-5 bg-white border-t border-[#E8DEC8]">
              <span className="text-xs uppercase font-mono text-[#8C6B28] font-bold block mb-1">
                Réalisation Étudiante — {previewItem.category.toUpperCase()}
              </span>
              <h3 className="text-lg font-bold text-[#2D241E] font-display">
                {previewItem.title[language] || previewItem.title.fr}
              </h3>
              {previewItem.studentName && (
                <p className="text-xs text-[#7A6E63] mt-1">
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
