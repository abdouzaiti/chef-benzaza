import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, ShoppingBag, Truck, Store, MapPin, Phone, User, Printer } from 'lucide-react';
import { Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, cartSubtotal, deliveryFee, cartTotal, createOrder, t, language, settings, isRtl } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [commune, setCommune] = useState('Bir El Djir');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'pickup_cash'>('cod');

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [errors, setErrors] = useState<{ customerName?: string; customerPhone?: string; address?: string }>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { customerName?: string; customerPhone?: string; address?: string } = {};

    if (!customerName.trim()) newErrors.customerName = t('requiredField');
    if (!customerPhone.trim()) {
      newErrors.customerPhone = t('requiredField');
    } else if (customerPhone.trim().length < 8) {
      newErrors.customerPhone = 'Numéro de téléphone invalide';
    }
    if (deliveryType === 'delivery' && !address.trim()) {
      newErrors.address = t('requiredField');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const order = createOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryType,
      address: deliveryType === 'delivery' ? address.trim() : undefined,
      wilaya: 'Oran',
      commune: deliveryType === 'delivery' ? commune : 'Siège École Chef Benzaza',
      notes: notes.trim() || undefined,
      paymentMethod: deliveryType === 'pickup' ? 'pickup_cash' : paymentMethod,
    });

    setConfirmedOrder(order);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setConfirmedOrder(null);
    setCustomerName('');
    setCustomerPhone('');
    setAddress('');
    setNotes('');
    setErrors({});
    onClose();
  };

  const currentFee = deliveryType === 'pickup' ? 0 : deliveryFee;
  const currentTotal = cartSubtotal + currentFee;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#1A1A1A] text-white w-full max-w-xl rounded-xl border border-[#2e2e2e] shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-[#141414] border-b border-[#2d2a24] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[#C9A45C] text-[#171717] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-display">
                {t('checkoutTitle')}
              </h3>
              <p className="text-xs text-[#C9A45C]">Boutique Gourmande — Oran</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-[#252525] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {confirmedOrder ? (
            /* Order confirmation state */
            <div className="space-y-6 text-center py-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-white font-display">
                  {t('orderSuccessTitle')}
                </h4>
                <p className="text-xs text-neutral-400 mt-1">
                  {t('orderSuccessDesc')}
                </p>
              </div>

              {/* Order slip */}
              <div className="bg-[#242424] border border-[#383838] p-5 rounded-lg text-left rtl:text-right space-y-3 font-sans">
                <div className="flex justify-between items-center border-b border-[#333] pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                      N° Commande
                    </span>
                    <span className="text-base font-bold font-mono text-[#C9A45C]">
                      {confirmedOrder.orderCode}
                    </span>
                  </div>
                  <div className="text-right rtl:text-left">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                      Paiement
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 uppercase">
                      {confirmedOrder.paymentMethod === 'cod'
                        ? 'Espèces à la livraison'
                        : 'Espèces au retrait'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 py-1 text-xs">
                  <div className="text-neutral-300 font-semibold mb-1">Articles commandés :</div>
                  {confirmedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-neutral-300">
                      <span>{it.quantity}x {it.name}</span>
                      <span className="font-mono tabular-nums">{it.unitPrice * it.quantity} {t('dzd')}</span>
                    </div>
                  ))}
                  <div className="border-t border-[#333] pt-2 flex justify-between text-neutral-400">
                    <span>{t('deliveryFee')} :</span>
                    <span className="font-mono tabular-nums">
                      {confirmedOrder.deliveryFee === 0 ? t('deliveryFree') : `${confirmedOrder.deliveryFee} ${t('dzd')}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-1">
                    <span>{t('totalAmount')} :</span>
                    <span className="font-mono text-[#C9A45C] tabular-nums">{confirmedOrder.total} {t('dzd')}</span>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 pt-3 border-t border-[#333]">
                  {confirmedOrder.deliveryType === 'delivery' ? (
                    <p>
                      <strong>Livraison à :</strong> {confirmedOrder.address}, {confirmedOrder.commune} ({confirmedOrder.wilaya}). Contact : {confirmedOrder.customerPhone} ({confirmedOrder.customerName}).
                    </p>
                  ) : (
                    <p>
                      <strong>Retrait sur place :</strong> À l’École Chef Benzaza, {settings.address}, Oran.
                    </p>
                  )}
                  <p className="mt-1 text-amber-300 italic">{t('orderSuccessPhoneNotice')}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 py-2.5 px-4 bg-[#2e2e2e] hover:bg-[#383838] text-white text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4 text-[#C9A45C]" />
                  <span>Imprimer le reçu</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-2.5 px-4 bg-[#C9A45C] hover:bg-[#DFC283] text-[#171717] text-xs font-bold uppercase tracking-wider rounded transition-colors"
                >
                  {t('close')}
                </button>
              </div>
            </div>
          ) : (
            /* Order Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Delivery method toggle */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                  {t('deliveryMethod')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryType('delivery');
                      setPaymentMethod('cod');
                    }}
                    className={`p-3 rounded border text-left rtl:text-right flex items-start gap-2.5 transition-colors ${
                      deliveryType === 'delivery'
                        ? 'border-[#C9A45C] bg-[#C9A45C]/10 text-white'
                        : 'border-[#333] bg-[#222] text-neutral-400'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold text-white">Livraison à domicile</span>
                      <span className="text-[11px] text-neutral-400">Wilaya d’Oran</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryType('pickup');
                      setPaymentMethod('pickup_cash');
                    }}
                    className={`p-3 rounded border text-left rtl:text-right flex items-start gap-2.5 transition-colors ${
                      deliveryType === 'pickup'
                        ? 'border-[#C9A45C] bg-[#C9A45C]/10 text-white'
                        : 'border-[#333] bg-[#222] text-neutral-400'
                    }`}
                  >
                    <Store className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold text-white">Retrait à l’École</span>
                      <span className="text-[11px] text-[#C9A45C]">Gratuit (Akid Lotfi)</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: Amina Mokhtari"
                    className="w-full bg-[#242424] border border-[#333] rounded px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#C9A45C]"
                  />
                  {errors.customerName && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    {t('phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder={t('phonePlaceholder')}
                    className="w-full bg-[#242424] border border-[#333] rounded px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#C9A45C]"
                  />
                  {errors.customerPhone && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.customerPhone}</p>
                  )}
                </div>
              </div>

              {/* Delivery Address fields (if delivery) */}
              {deliveryType === 'delivery' && (
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">
                        {t('wilaya')}
                      </label>
                      <input
                        type="text"
                        disabled
                        value="31 - Oran"
                        className="w-full bg-[#242424] border border-[#333] rounded px-3 py-1.5 text-xs text-neutral-400 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        {t('commune')} *
                      </label>
                      <select
                        value={commune}
                        onChange={(e) => setCommune(e.target.value)}
                        className="w-full bg-[#242424] border border-[#333] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#C9A45C]"
                      >
                        <option value="Bir El Djir">Bir El Djir</option>
                        <option value="Akid Lotfi">Akid Lotfi</option>
                        <option value="Oran Centre">Oran Centre / Front de Mer</option>
                        <option value="Maraval">Maraval</option>
                        <option value="Es Senia">Es Senia</option>
                        <option value="Canastel">Canastel</option>
                        <option value="Belgaid">Belgaid</option>
                        <option value="Khemisti">Khemisti / Gambetta</option>
                        <option value="Saint Hubert">Saint Hubert / Choupot</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      {t('deliveryAddress')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t('deliveryAddressPlaceholder')}
                      className="w-full bg-[#242424] border border-[#333] rounded px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#C9A45C]"
                    />
                    {errors.address && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Instructions de livraison / Préférence horaire (optionnel)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Livrer entre 12h et 14h, sonner chez Mokhtari..."
                  className="w-full bg-[#242424] border border-[#333] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C9A45C]"
                />
              </div>

              {/* Payment Info */}
              <div className="p-3 bg-[#202020] rounded border border-[#2e2e2e] text-xs space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block">
                  {t('paymentMethod')}
                </span>
                <p className="font-semibold text-[#C9A45C]">
                  {deliveryType === 'delivery'
                    ? '💵 Espèces à la livraison (Cash on Delivery)'
                    : '🏪 Paiement en espèces au comptoir de l’école'}
                </p>
                <p className="text-[11px] text-neutral-400">
                  (Paiement par carte CIB / Edahabia prochainement disponible)
                </p>
              </div>

              {/* Summary */}
              <div className="bg-[#1f1f1f] p-3.5 rounded border border-[#2d2a24] text-xs space-y-1.5">
                <div className="flex justify-between text-neutral-400">
                  <span>{t('subtotal')} ({cart.reduce((a, b) => a + b.quantity, 0)} articles)</span>
                  <span className="font-mono tabular-nums">{cartSubtotal} {t('dzd')}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>{t('deliveryFee')}</span>
                  <span className="font-mono tabular-nums">
                    {currentFee === 0 ? t('deliveryFree') : `${currentFee} ${t('dzd')}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-1.5 border-t border-[#333]">
                  <span>{t('totalAmount')}</span>
                  <span className="font-mono text-[#C9A45C] tabular-nums">{currentTotal} {t('dzd')}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C9A45C] hover:bg-[#DFC283] text-[#171717] font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-md shadow-[#C9A45C]/20"
              >
                {t('confirmOrder')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
