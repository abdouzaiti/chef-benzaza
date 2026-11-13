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
        className="absolute inset-0 bg-[#021510]/55 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex pl-4 sm:pl-10 rtl:pl-0 rtl:pr-4 sm:rtl:pr-10">
        <div className="w-screen max-w-md bg-white text-[#062B22] border-l rtl:border-l-0 rtl:border-r border-[#D6AD4F]/40 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#D6AD4F]/40 bg-[#063B2E] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#042119] border border-[#D6AD4F]/40 text-[#E5BD5B] flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#FAF6ED] uppercase tracking-wider font-display truncate">
                {t('cart')} ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#EAE2CF]/80 hover:text-[#E5BD5B] rounded-md hover:bg-[#042119] transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free delivery threshold progress in Mostaganem */}
          <div className="px-4 sm:px-5 py-3 bg-[#FAF7F2] border-b border-[#E8DEC8] text-xs">
            {freeDeliveryRemaining > 0 ? (
              <p className="text-[#5C6660]">
                {language === 'ar' ? (
                  <>أضف <strong className="text-[#063B2E] tabular-nums font-mono">{freeDeliveryRemaining} دج</strong> للاستفادة من التوصيل المجاني بمستغانم</>
                ) : (
                  <>Ajoutez <strong className="text-[#063B2E] tabular-nums font-mono">{freeDeliveryRemaining} DZD</strong> pour bénéficier de la livraison offerte à Mostaganem !</>
                )}
              </p>
            ) : (
              <p className="text-[#063B2E] font-semibold flex items-center gap-1.5">
                <span className="text-[#D6AD4F]">✓</span>
                <span>{t('deliveryFree')} activée pour Mostaganem !</span>
              </p>
            )}
            <div className="w-full bg-[#E8DEC8] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#063B2E] to-[#D6AD4F] h-full transition-all duration-300"
                style={{ width: `${freeDeliveryPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 sm:space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-center text-[#063B2E]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-semibold text-[#062B22]">{t('cartEmpty')}</h4>
                <p className="text-xs text-[#5C6660] max-w-xs mx-auto">
                  {t('cartEmptyDesc')}
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name[language] || item.product.name.fr}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 sm:w-18 sm:h-18 object-cover rounded-lg bg-[#E8DEC8]/50 shrink-0 border border-[#E8DEC8]"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-[#062B22] truncate">
                        {item.product.name[language] || item.product.name.fr}
                      </h4>
                      <p className="text-xs text-[#063B2E] font-bold font-mono tabular-nums mt-0.5">
                        {item.product.priceDZD} {t('dzd')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E8DEC8]">
                      <div className="flex items-center bg-white rounded-md border border-[#E8DEC8] overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-[#5C6660] hover:text-[#063B2E] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-mono tabular-nums text-[#062B22] font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-[#5C6660] hover:text-[#063B2E] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#5C6660] hover:text-red-500 p-1 transition-colors"
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
            <div className="p-4 sm:p-5 border-t border-[#E8DEC8] bg-[#FAF7F2] space-y-3">
              <div className="space-y-1.5 text-xs text-[#5C6660]">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span className="font-mono tabular-nums text-[#062B22] font-semibold">
                    {cartSubtotal} {t('dzd')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t('deliveryFee')}</span>
                  <span className="font-mono tabular-nums text-[#062B22] font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-[#063B2E] font-bold">{t('deliveryFree')}</span>
                    ) : (
                      `${deliveryFee} ${t('dzd')}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#062B22] pt-2 border-t border-[#E8DEC8]">
                  <span>{t('totalAmount')}</span>
                  <span className="font-mono tabular-nums text-[#063B2E]">
                    {cartTotal} {t('dzd')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onOpenCheckout();
                }}
                className="w-full py-3 bg-[#063B2E] hover:bg-[#042119] text-[#FAF6ED] border border-[#D6AD4F]/50 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#063B2E]/20"
              >
                <span>{t('proceedCheckout')}</span>
                <ArrowRight className={`w-4 h-4 text-[#E5BD5B] ${isRtl ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
