import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, ProductCategory } from '../types';
import {
  ShoppingBag,
  Plus,
  Minus,
  Search,
  Check,
  Truck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const StoreView: React.FC = () => {
  const { products, addToCart, setIsCartOpen, t, language, settings, isRtl } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const categories = [
    { id: 'all', label: t('filterAll') },
    { id: 'pastry', label: t('filterPastry') },
    { id: 'pizza', label: t('filterPizza') },
    { id: 'meals', label: t('filterMeals') },
    { id: 'bakery', label: t('filterBakery') },
  ];

  const filteredProducts = products.filter((prod) => {
    const matchesCat = activeCategory === 'all' || prod.category === activeCategory;
    const nameStr = (prod.name[language] || prod.name.fr).toLowerCase();
    const descStr = (prod.description[language] || prod.description.fr).toLowerCase();
    const matchesSearch =
      nameStr.includes(searchQuery.toLowerCase()) || descStr.includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getQty = (id: string) => quantities[id] || 1;

  const setQty = (id: string, val: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, val) }));
  };

  const handleAddToCart = (product: Product) => {
    const qty = getQty(product.id);
    addToCart(product, qty);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
      
      {/* Store Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-[#8C6B28]">
          Ateliers & Créations d'Élite
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#2D241E] font-display text-balance">
          {t('storeTitle')}
        </h1>
        <p className="text-sm text-[#6B5E52] leading-relaxed">
          {t('storeSubtitle')}. Préparations artisanales avec livraison sur la wilaya de Mostaganem ou retrait direct à l'école.
        </p>
      </div>

      {/* Trust Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-white rounded-xl border border-[#E8DEC8] text-xs shadow-xs">
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-[#C9A45C] shrink-0" />
          <div>
            <strong className="block text-[#2D241E]">Livraison Wilaya de Mostaganem</strong>
            <span className="text-[#7A6E63]">Gratuite dès {settings.freeDeliveryThreshold} {t('dzd')}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l rtl:sm:border-l-0 rtl:sm:border-r border-[#EAE3D6] pt-3 sm:pt-0 sm:pl-4 rtl:sm:pl-0 rtl:sm:pr-4">
          <Sparkles className="w-5 h-5 text-[#C9A45C] shrink-0" />
          <div>
            <strong className="block text-[#2D241E]">100% Fait Maison</strong>
            <span className="text-[#7A6E63]">Matières premières de haute gastronomie</span>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l rtl:sm:border-l-0 rtl:sm:border-r border-[#EAE3D6] pt-3 sm:pt-0 sm:pl-4 rtl:sm:pl-0 rtl:sm:pr-4">
          <ShieldCheck className="w-5 h-5 text-[#C9A45C] shrink-0" />
          <div>
            <strong className="block text-[#2D241E]">Paiement à la Livraison</strong>
            <span className="text-[#7A6E63]">Réglez en espèces à réception</span>
          </div>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E8DEC8] shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#C9A45C] text-white shadow-xs'
                  : 'text-[#6B5E52] hover:text-[#8C6B28] hover:bg-[#FAF7F2]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-[#8C6B28] absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une pâtisserie, pizza..."
            className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 text-xs bg-[#FAF7F2] border border-[#E8DEC8] text-[#2D241E] rounded-md focus:outline-none focus:border-[#C9A45C]"
          />
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-[#E8DEC8]">
          <ShoppingBag className="w-12 h-12 mx-auto text-[#C9A45C] opacity-60 mb-3" />
          <h3 className="text-base font-bold text-[#2D241E]">Aucun produit disponible</h3>
          <p className="text-xs text-[#6B5E52] mt-1">Modifiez vos critères pour voir nos douceurs.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filteredProducts.map((product) => {
            const qty = getQty(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-[#E8DEC8] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
              >
                {/* Product Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-neutral-100">
                  <img
                    src={product.image}
                    alt={product.name[language] || product.name.fr}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-white/95 text-neutral-800 text-[11px] font-semibold px-2.5 py-0.5 rounded shadow-xs border border-[#EADFC7]">
                    {product.stock > 0 ? (
                      <span className="text-emerald-700">En stock ({product.stock})</span>
                    ) : (
                      <span className="text-red-700">Rupture</span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h2 className="text-base font-bold text-[#2D241E] font-display">
                      {product.name[language] || product.name.fr}
                    </h2>
                    <p className="text-xs text-[#6B5E52] line-clamp-2 mt-2 leading-relaxed">
                      {product.description[language] || product.description.fr}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F1ECE1] space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase text-[#7A6E63] block">{t('unitPrice')}</span>
                        <span className="text-base font-bold font-mono text-[#8C6B28] tabular-nums">
                          {product.priceDZD} {t('dzd')}
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      {product.stock > 0 && (
                        <div className="flex items-center bg-[#FAF7F2] rounded border border-[#E8DEC8]">
                          <button
                            onClick={() => setQty(product.id, qty - 1)}
                            className="px-2 py-1 text-[#6B5E52] hover:text-[#8C6B28] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-mono font-bold text-[#2D241E]">
                            {qty}
                          </span>
                          <button
                            onClick={() => setQty(product.id, qty + 1)}
                            className="px-2 py-1 text-[#6B5E52] hover:text-[#8C6B28] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock <= 0}
                      className={`w-full py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs ${
                        product.stock <= 0
                          ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                          : 'bg-[#C9A45C] hover:bg-[#DFC283] text-white'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{t('addToCart')}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
