import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, Printer, Scissors, AlertCircle } from 'lucide-react';
import { AppointmentBooking, HairSalonService } from '../types';

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
  const {
    services,
    appointments,
    createAppointment,
    t,
    settings,
    language,
  } = useApp();

  const [serviceId, setServiceId] = useState(preselectedServiceId || (services[0]?.id || ''));
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('10:00');
  const [notes, setNotes] = useState('');

  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentBooking | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ customerName?: string; customerPhone?: string }>({});

  if (!isOpen) return null;

  const selectedService: HairSalonService =
    services.find((s: HairSalonService) => s.id === serviceId) || services[0];

  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  const isSlotBooked = (slot: string) => {
    return appointments.some(
      (b: AppointmentBooking) => b.date === date && b.timeSlot === slot && b.status !== 'cancelled'
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const newErrors: { customerName?: string; customerPhone?: string } = {};
    if (!customerName.trim()) {
      newErrors.customerName = t('requiredField');
    }
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

    if (!result.success || !result.booking) {
      setErrorMessage(result.error || t('bookingConflictError'));
      return;
    }

    setConfirmedBooking(result.booking);
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2D241E]/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white text-[#2D241E] w-full max-w-lg rounded-2xl border border-[#E8DEC8] shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-[#FAF7F2] border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C9A45C] text-white flex items-center justify-center font-bold shadow-xs">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2D241E] uppercase tracking-wider font-display">
                {t('bookAppointment')}
              </h3>
              <p className="text-xs text-[#8C6B28] font-semibold">Salon & Barbershop — Mostaganem</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-[#7A6E63] hover:text-[#2D241E] rounded-lg hover:bg-[#F5EEDB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {confirmedBooking ? (
            /* Success confirmation ticket */
            <div className="space-y-6 text-center py-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#2D241E] font-display">
                  {t('bookingSuccessTitle')}
                </h4>
                <p className="text-xs text-[#5C4F44] mt-1">
                  {t('bookingSuccessDesc')}
                </p>
              </div>

              {/* Printable Appointment Pass */}
              <div className="bg-[#FAF7F2] border border-[#E8DEC8] p-5 rounded-xl text-left rtl:text-right space-y-3 font-sans">
                <div className="flex justify-between items-center border-b border-[#E8DEC8] pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A6E63] block font-semibold">
                      Code Rendez-vous
                    </span>
                    <span className="text-base font-bold font-mono text-[#8C6B28]">
                      {confirmedBooking.bookingCode}
                    </span>
                  </div>
                  <div className="text-right rtl:text-left">
                    <span className="text-[10px] uppercase tracking-wider text-[#7A6E63] block font-semibold">
                      Date & Heure
                    </span>
                    <span className="text-xs font-semibold text-[#2D241E] font-mono">
                      {confirmedBooking.date} @ {confirmedBooking.timeSlot}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 py-1 text-xs">
                  <div>
                    <span className="text-[#7A6E63] block">Prestation :</span>
                    <strong className="text-[#2D241E] block mt-0.5 font-semibold">{confirmedBooking.serviceTitle}</strong>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[#7A6E63] block">Client :</span>
                      <span className="text-[#2D241E] block mt-0.5">{confirmedBooking.customerName}</span>
                    </div>
                    <div>
                      <span className="text-[#7A6E63] block">Téléphone :</span>
                      <span className="text-[#2D241E] font-mono block mt-0.5">{confirmedBooking.customerPhone}</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-[#7A6E63] pt-3 border-t border-[#E8DEC8]">
                  Lieu : Salon d’application École Chef Benzaza, {settings.address}, Mostaganem.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 py-2.5 px-4 bg-white hover:bg-[#FAF4E6] text-[#2D241E] border border-[#E8DEC8] text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4 text-[#8C6B28]" />
                  <span>Imprimer le coupon</span>
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
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Service selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1.5">
                  Prestation souhaitée *
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg px-3.5 py-2.5 text-xs text-[#2D241E] focus:bg-white focus:outline-none focus:border-[#C9A45C]"
                >
                  {services.map((s: HairSalonService) => (
                    <option key={s.id} value={s.id}>
                      {s.title[language] || s.title.fr} ({s.durationMinutes} min) — {s.priceDZD} {t('dzd')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1.5">
                    {t('appointmentDate')} *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg px-3.5 py-2 text-xs text-[#2D241E] focus:bg-white focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1.5">
                    {t('appointmentTime')} *
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg px-3.5 py-2 text-xs text-[#2D241E] font-mono focus:bg-white focus:outline-none focus:border-[#C9A45C]"
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1.5">
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: Bilal Mehdi"
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

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1.5">
                  {t('notes')}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Dégradé progressif, barbe longue..."
                  className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg px-3.5 py-2 text-xs text-[#2D241E] placeholder:text-[#A89F91] focus:bg-white focus:outline-none focus:border-[#C9A45C]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSlotBooked(timeSlot)}
                  className={`w-full py-3 font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md ${
                    isSlotBooked(timeSlot)
                      ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                      : 'bg-[#C9A45C] hover:bg-[#DFC283] text-white shadow-[#C9A45C]/25'
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
