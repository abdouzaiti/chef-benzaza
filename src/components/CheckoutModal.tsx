import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, Printer, ShoppingBag, Truck, Store } from 'lucide-react';
import { Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    cartSubtotal,
    deliveryFee,
    createOrder,
    t,
    settings,
  } = useApp();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [commune, setCommune] = useState('Mostaganem Centre');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [errors, setErrors] = useState<{ customerName?: string; customerPhone?: string; address?: string }>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { customerName?: string; customerPhone?: string; address?: string } = {};

    if (!customerName.trim()) {
      newErrors.customerName = t('requiredField');
    }
    if (!customerPhone.trim()) {
      newErrors.customerPhone = t('requiredField');
    } else if (customerPhone.trim().length < 8) {
      newErrors.customerPhone = 'Numéro invalide';
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
      address: deliveryType === 'delivery' ? address.trim() : settings.address,
      wilaya: 'Mostaganem',
      commune: deliveryType === 'delivery' ? commune : 'Mostaganem (Retrait boutique)',
      notes: notes.trim() || undefined,
      paymentMethod: deliveryType === 'delivery' ? 'cod' : 'pickup_cash',
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2D241E]/40 backdrop-blur-xs flex items-start sm:items-center justify-center p-2 sm:p-4">
      <div className="relative bg-white text-[#2D241E] w-full max-w-xl rounded-2xl border border-[#E8DEC8] shadow-2xl overflow-hidden my-4 sm:my-8">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] border-b border-[#E8DEC8] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#C9A45C] text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-[#2D241E] uppercase tracking-wider font-display truncate">
                {t('checkoutTitle')}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#8C6B28] font-semibold truncate">Boutique Gourmande — Mostaganem</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-[#7A6E63] hover:text-[#2D241E] rounded-lg hover:bg-[#F5EEDB] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {confirmedOrder ? (
            /* Order confirmation state */
            <div className="space-y-5 sm:space-y-6 text-center py-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold text-[#2D241E] font-display">
                  {t('orderSuccessTitle')}
                </h4>
                <p className="text-xs text-[#5C4F44] mt-1">
                  {t('orderSuccessDesc')}
                </p>
              </div>

              {/* Order slip */}
              <div className="bg-[#FAF7F2] border border-[#E8DEC8] p-4 sm:p-5 rounded-xl text-left rtl:text-right space-y-3 font-sans">
                <div className="flex flex-wrap justify-between items-center gap-2 border-b border-[#E8DEC8] pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A6E63] block font-semibold">
                      N° Commande
                    </span>
                    <span className="text-sm sm:text-base font-bold font-mono text-[#8C6B28]">
                      {confirmedOrder.orderCode}
                    </span>
                  </div>
                  <div className="text-left sm:text-right rtl:sm:text-left">
                    <span className="text-[10px] uppercase tracking-wider text-[#7A6E63] block font-semibold">
                      Paiement
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase inline-block">
                      {confirmedOrder.paymentMethod === 'cod'
                        ? 'Espèces à la livraison'
                        : 'Espèces au retrait'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 py-1 text-xs">
                  <div className="text-[#2D241E] font-semibold mb-1">Articles commandés :</div>
                  {confirmedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between gap-2 text-[#5C4F44]">
                      <span className="break-words">{it.quantity}x {it.name}</span>
                      <span className="font-mono tabular-nums text-[#2D241E] font-medium shrink-0">{it.unitPrice * it.quantity} {t('dzd')}</span>
                    </div>
                  ))}
                  <div className="border-t border-[#E8DEC8] pt-2 flex justify-between text-[#7A6E63]">
                    <span>{t('deliveryFee')} :</span>
                    <span className="font-mono tabular-nums text-[#2D241E]">
                      {confirmedOrder.deliveryFee === 0 ? t('deliveryFree') : `${confirmedOrder.deliveryFee} ${t('dzd')}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#2D241E] pt-1">
                    <span>{t('totalAmount')} :</span>
                    <span className="font-mono text-[#8C6B28] tabular-nums">{confirmedOrder.total} {t('dzd')}</span>
                  </div>
                </div>

                <div className="text-[11px] text-[#7A6E63] pt-3 border-t border-[#E8DEC8]">
                  {confirmedOrder.deliveryType === 'delivery' ? (
                    <p>
                      <strong className="text-[#2D241E]">Livraison à :</strong> {confirmedOrder.address}, {confirmedOrder.commune} ({confirmedOrder.wilaya}). Contact : {confirmedOrder.customerPhone} ({confirmedOrder.customerName}).
                    </p>
                  ) : (
                    <p>
                      <strong className="text-[#2D241E]">Retrait sur place :</strong> À l’École Chef Benzaza, {settings.address}, Mostaganem.
                    </p>
                  )}
                  <p className="mt-1 text-[#8C6B28] italic font-medium">{t('orderSuccessPhoneNotice')}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 py-2.5 px-4 bg-white hover:bg-[#FAF4E6] text-[#2D241E] border border-[#E8DEC8] text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4 text-[#8C6B28]" />
                  <span>Imprimer le reçu</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-2.5 px-4 bg-[#C9A45C] hover:bg-[#DFC283] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-2">
                  {t('deliveryMethod')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-3 rounded-xl border text-left rtl:text-right flex items-start gap-2.5 transition-colors ${
                      deliveryType === 'delivery'
                        ? 'border-[#C9A45C] bg-[#FAF4E6] text-[#2D241E]'
                        : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#5C4F44] hover:bg-white'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-[#8C6B28] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold text-[#2D241E]">Livraison à domicile</span>
                      <span className="text-[11px] text-[#7A6E63]">Wilaya de Mostaganem</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-3 rounded-xl border text-left rtl:text-right flex items-start gap-2.5 transition-colors ${
                      deliveryType === 'pickup'
                        ? 'border-[#C9A45C] bg-[#FAF4E6] text-[#2D241E]'
                        : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#5C4F44] hover:bg-white'
                    }`}
                  >
                    <Store className="w-5 h-5 text-[#8C6B28] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold text-[#2D241E]">Retrait à l’École</span>
                      <span className="text-[11px] text-[#8C6B28] font-semibold">Gratuit (Mostaganem Centre)</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1.5">
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: Amina Mokhtari"
                    className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg px-3.5 py-2 text-xs text-[#2D241E] placeholder:text-[#A89F91] focus:bg-white focus:outline-none focus:border-[#C9A45C]"
                  />
                  {errors.customerName && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1.5">
                    {t('phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder={t('phonePlaceholder')}
                    className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg px-3.5 py-2 text-xs text-[#2D241E] font-mono placeholder:text-[#A89F91] focus:bg-white focus:outline-none focus:border-[#C9A45C]"
                  />
                  {errors.customerPhone && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.customerPhone}</p>
                  )}
                </div>
              </div>

              {/* Delivery Address fields (if delivery) */}
              {deliveryType === 'delivery' && (
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1">
                        {t('wilaya')}
                      </label>
                      <input
                        type="text"
                        disabled
                        value="27 - Mostaganem"
                        className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg px-3 py-1.5 text-xs text-[#7A6E63] cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1">
                        {t('commune')} *
                      </label>
                      <select
                        value={commune}
                        onChange={(e) => setCommune(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg px-3 py-1.5 text-xs text-[#2D241E] focus:bg-white focus:outline-none focus:border-[#C9A45C]"
                      >
                        <option value="Mostaganem Centre">Mostaganem Centre</option>
                        <option value="Salamandre">Salamandre</option>
                        <option value="Front de Mer">Front de Mer</option>
                        <option value="Mazagran">Mazagran</option>
                        <option value="Stidia">Stidia</option>
                        <option value="Kharouba">Kharouba</option>
                        <option value="Tidjelit">Tidjelit</option>
                        <option value="Hassi Mameche">Hassi Mameche</option>
                        <option value="Sayada">Sayada</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1">
                      {t('deliveryAddress')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t('deliveryAddressPlaceholder')}
                      className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg px-3.5 py-2 text-xs text-[#2D241E] placeholder:text-[#A89F91] focus:bg-white focus:outline-none focus:border-[#C9A45C]"
                    />
                    {errors.address && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1">
                  Instructions de livraison / Préférence horaire (optionnel)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Livrer entre 12h et 14h, sonner chez Mokhtari..."
                  className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg px-3 py-2 text-xs text-[#2D241E] placeholder:text-[#A89F91] focus:bg-white focus:outline-none focus:border-[#C9A45C]"
                />
              </div>

              {/* Payment Info */}
              <div className="p-3.5 bg-[#FAF4E6] rounded-xl border border-[#E8DEC8] text-xs space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#7A6E63] font-semibold block">
                  {t('paymentMethod')}
                </span>
                <p className="font-bold text-[#8C6B28]">
                  {deliveryType === 'delivery'
                    ? '💵 Espèces à la livraison (Cash on Delivery)'
                    : '🏪 Paiement en espèces au comptoir de l’école'}
                </p>
                <p className="text-[11px] text-[#7A6E63]">
                  (Paiement par carte CIB / Edahabia prochainement disponible)
                </p>
              </div>

              {/* Summary */}
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DEC8] text-xs space-y-1.5">
                <div className="flex justify-between text-[#5C4F44]">
                  <span>{t('subtotal')} ({cart.reduce((a, b) => a + b.quantity, 0)} articles)</span>
                  <span className="font-mono tabular-nums text-[#2D241E] font-medium">{cartSubtotal} {t('dzd')}</span>
                </div>
                <div className="flex justify-between text-[#5C4F44]">
                  <span>{t('deliveryFee')}</span>
                  <span className="font-mono tabular-nums text-[#2D241E] font-medium">
                    {currentFee === 0 ? t('deliveryFree') : `${currentFee} ${t('dzd')}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#2D241E] pt-2 border-t border-[#E8DEC8]">
                  <span>{t('totalAmount')}</span>
                  <span className="font-mono text-[#8C6B28] tabular-nums">{currentTotal} {t('dzd')}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C9A45C] hover:bg-[#DFC283] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md shadow-[#C9A45C]/25"
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
