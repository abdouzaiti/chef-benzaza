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
        <div className="text-xs font-bold uppercase tracking-widest text-[#063B2E]">
          Portfolio & Travaux Pratiques
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#062B22] font-display text-balance">
          {t('galleryTitle')}
        </h1>
        <p className="text-sm text-[#5C6660] leading-relaxed">
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
                  ? 'bg-[#063B2E] text-[#E5BD5B] border border-[#D6AD4F]/50 shadow-xs'
                  : 'text-[#5C6660] hover:text-[#063B2E] hover:bg-[#FAF7F2]'
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
            className="group relative h-72 rounded-xl overflow-hidden cursor-pointer bg-[#021510] border border-[#E8DEC8] hover:border-[#D6AD4F]/60 shadow-xs transition-colors"
          >
            <img
              src={item.image}
              alt={item.title[language] || item.title.fr}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#021510]/95 via-[#042119]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
            
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#E5BD5B] font-bold block mb-1">
                {item.category.toUpperCase()}
              </span>
              <h3 className="text-sm font-bold text-[#FAF6ED] font-display">
                {item.title[language] || item.title.fr}
              </h3>
              {item.studentName && (
                <p className="text-[11px] text-[#EAE2CF]/90 mt-1 flex items-center gap-1.5">
                  <User className="w-3 h-3 text-[#E5BD5B]" />
                  <span>{item.studentName}</span>
                </p>
              )}
            </div>

            <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-2 bg-[#062B22]/90 border border-[#D6AD4F]/40 text-[#E5BD5B] rounded-full shadow-sm">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 bg-[#021510]/65 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden border border-[#D6AD4F]/50 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 rtl:right-auto rtl:left-3 sm:rtl:left-4 z-10 p-2 bg-white/95 text-[#063B2E] rounded-full hover:bg-white shadow-md transition-colors border border-[#E8DEC8]"
            >
              <X className="w-5 h-5" />
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
              <span className="text-xs uppercase font-mono text-[#063B2E] font-bold block mb-1">
                Réalisation Étudiante — {previewItem.category.toUpperCase()}
              </span>
              <h3 className="text-lg font-bold text-[#062B22] font-display">
                {previewItem.title[language] || previewItem.title.fr}
              </h3>
              {previewItem.studentName && (
                <p className="text-xs text-[#5C6660] mt-1">
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
