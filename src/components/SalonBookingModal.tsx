import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, Calendar, Clock, Scissors, Phone, User, AlertCircle, Printer } from 'lucide-react';
import { AppointmentBooking } from '../types';

interface SalonBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const SalonBookingModal: React.FC<SalonBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  const { services, appointments, createAppointment, t, language, settings } = useApp();

  const [serviceId, setServiceId] = useState(preselectedServiceId || (services[0]?.id || ''));
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  
  // Default to tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(tomorrowStr);
  const [timeSlot, setTimeSlot] = useState('10:00');
  const [notes, setNotes] = useState('');

  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentBooking | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ customerName?: string; customerPhone?: string }>({});

  if (!isOpen) return null;

  const selectedService = services.find((s) => s.id === serviceId) || services[0];

  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  // Helper to check if a specific time slot is already taken on the selected date
  const isSlotBooked = (slot: string) => {
    return appointments.some(
      (app) => app.date === date && app.timeSlot === slot && app.status !== 'cancelled'
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const newErrors: { customerName?: string; customerPhone?: string } = {};

    if (!customerName.trim()) newErrors.customerName = t('requiredField');
    if (!customerPhone.trim()) {
      newErrors.customerPhone = t('requiredField');
    } else if (customerPhone.trim().length < 8) {
      newErrors.customerPhone = 'Numéro invalide';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = createAppointment({
      serviceId: selectedService.id,
      serviceTitle: selectedService.title[language] || selectedService.title.fr,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      date,
      timeSlot,
      notes: notes.trim() || undefined,
    });

    if (result.success && result.booking) {
      setConfirmedBooking(result.booking);
    } else {
      setErrorMessage(result.error || t('bookingConflictError'));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setCustomerName('');
    setCustomerPhone('');
    setNotes('');
    setErrorMessage(null);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#1A1A1A] text-white w-full max-w-lg rounded-xl border border-[#2e2e2e] shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-[#141414] border-b border-[#2d2a24] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[#C9A45C] text-[#171717] flex items-center justify-center font-bold">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-display">
                {t('bookAppointment')}
              </h3>
              <p className="text-xs text-[#C9A45C]">Salon & Barbershop — Oran</p>
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
          {confirmedBooking ? (
            /* Success confirmation ticket */
            <div className="space-y-6 text-center py-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-white font-display">
                  {t('bookingSuccessTitle')}
                </h4>
                <p className="text-xs text-neutral-400 mt-1">
                  {t('bookingSuccessDesc')}
                </p>
              </div>

              {/* Printable Appointment Pass */}
              <div className="bg-[#242424] border border-[#383838] p-5 rounded-lg text-left rtl:text-right space-y-3 font-sans">
                <div className="flex justify-between items-center border-b border-[#333] pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                      Code Rendez-vous
                    </span>
                    <span className="text-base font-bold font-mono text-[#C9A45C]">
                      {confirmedBooking.bookingCode}
                    </span>
                  </div>
                  <div className="text-right rtl:text-left">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                      Date & Heure
                    </span>
                    <span className="text-xs font-semibold text-white font-mono">
                      {confirmedBooking.date} @ {confirmedBooking.timeSlot}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 py-1 text-xs">
                  <div>
                    <span className="text-neutral-400 block">Prestation :</span>
                    <strong className="text-white block mt-0.5">{confirmedBooking.serviceTitle}</strong>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-neutral-400 block">Client :</span>
                      <span className="text-white block mt-0.5">{confirmedBooking.customerName}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block">Téléphone :</span>
                      <span className="text-white font-mono block mt-0.5">{confirmedBooking.customerPhone}</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 pt-3 border-t border-[#333]">
                  Lieu : Salon d’application École Chef Benzaza, {settings.address}, Oran.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 py-2.5 px-4 bg-[#2e2e2e] hover:bg-[#383838] text-white text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4 text-[#C9A45C]" />
                  <span>Imprimer le coupon</span>
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
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMessage && (
                <div className="p-3 bg-red-900/30 border border-red-500/40 rounded text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Service selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Prestation souhaitée *
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full bg-[#242424] border border-[#333] rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C9A45C]"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title[language] || s.title.fr} ({s.durationMinutes} min) — {s.priceDZD} {t('dzd')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    {t('appointmentDate')} *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#242424] border border-[#333] rounded px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    {t('appointmentTime')} *
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#242424] border border-[#333] rounded px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#C9A45C]"
                  >
                    {timeSlots.map((slot) => {
                      const booked = isSlotBooked(slot);
                      return (
                        <option key={slot} value={slot} disabled={booked}>
                          {slot} {booked ? '(Déjà réservé)' : '(Disponible)'}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Customer Info */}
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
                    placeholder="Ex: Bilal Mehdi"
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

              {/* Notes */}
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  {t('notes')}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Dégradé progressif, barbe longue..."
                  className="w-full bg-[#242424] border border-[#333] rounded px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#C9A45C]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSlotBooked(timeSlot)}
                  className={`w-full py-3 font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-md ${
                    isSlotBooked(timeSlot)
                      ? 'bg-neutral-600 text-neutral-300 cursor-not-allowed'
                      : 'bg-[#C9A45C] hover:bg-[#DFC283] text-[#171717] shadow-[#C9A45C]/20'
                  }`}
                >
                  {isSlotBooked(timeSlot) ? 'Créneau non disponible' : t('submitBooking')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
