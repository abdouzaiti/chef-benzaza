import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    removeFromCart,
    updateCartQuantity,
    t,
    settings,
    language,
    isRtl,
  } = useApp();

  if (!isCartOpen) return null;

  const freeDeliveryRemaining = Math.max(0, settings.freeDeliveryThreshold - cartSubtotal);
  const freeDeliveryPercent = Math.min(100, (cartSubtotal / settings.freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10">
        <div className="w-screen max-w-md bg-[#171717] text-white border-l rtl:border-l-0 rtl:border-r border-[#2d2a24] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-[#2d2a24] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#C9A45C]" />
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-display">
                {t('cart')} ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-md hover:bg-[#252525] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free delivery threshold progress in Oran */}
          <div className="px-5 py-3 bg-[#202020] border-b border-[#2d2a24] text-xs">
            {freeDeliveryRemaining > 0 ? (
              <p className="text-neutral-300">
                {language === 'ar' ? (
                  <>أضف <strong className="text-[#C9A45C] tabular-nums font-mono">{freeDeliveryRemaining} دج</strong> للاستفادة من التوصيل المجاني بوهران</>
                ) : (
                  <>Ajoutez <strong className="text-[#C9A45C] tabular-nums font-mono">{freeDeliveryRemaining} DZD</strong> pour bénéficier de la livraison offerte à Oran !</>
                )}
              </p>
            ) : (
              <p className="text-[#C9A45C] font-semibold flex items-center gap-1.5">
                <span>✓</span>
                <span>{t('deliveryFree')} activée pour Oran !</span>
              </p>
            )}
            <div className="w-full bg-[#333] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#C9A45C] h-full transition-all duration-300"
                style={{ width: `${freeDeliveryPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#252525] flex items-center justify-center text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-semibold text-neutral-300">{t('cartEmpty')}</h4>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  {t('cartEmptyDesc')}
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-lg bg-[#222222] border border-[#2e2e2e]"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name[language] || item.product.name.fr}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 object-cover rounded bg-[#2b2b2b] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-white truncate">
                        {item.product.name[language] || item.product.name.fr}
                      </h4>
                      <p className="text-xs text-[#C9A45C] font-semibold font-mono tabular-nums mt-0.5">
                        {item.product.priceDZD} {t('dzd')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#2e2e2e]">
                      <div className="flex items-center bg-[#171717] rounded border border-[#333] overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-mono tabular-nums text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                        title={t('delete')}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Panel */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#2d2a24] bg-[#1e1e1e] space-y-3">
              <div className="space-y-1.5 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span className="font-mono tabular-nums text-white">
                    {cartSubtotal} {t('dzd')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t('deliveryFee')}</span>
                  <span className="font-mono tabular-nums text-white">
                    {deliveryFee === 0 ? (
                      <span className="text-[#C9A45C]">{t('deliveryFree')}</span>
                    ) : (
                      `${deliveryFee} ${t('dzd')}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#2d2a24]">
                  <span>{t('totalAmount')}</span>
                  <span className="font-mono tabular-nums text-[#C9A45C]">
                    {cartTotal} {t('dzd')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onOpenCheckout();
                }}
                className="w-full py-3 bg-[#C9A45C] hover:bg-[#DFC283] text-[#171717] font-bold text-xs uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#C9A45C]/15"
              >
                <span>{t('proceedCheckout')}</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
