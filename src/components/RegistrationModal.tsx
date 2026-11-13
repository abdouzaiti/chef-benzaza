import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, Printer, GraduationCap } from 'lucide-react';
import { Registration } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourseId?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  preselectedCourseId,
}) => {
  const { courses, addRegistration, t, language } = useApp();

  const [courseId, setCourseId] = useState(preselectedCourseId || (courses[0]?.id || ''));
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [schedule, setSchedule] = useState('Matinée (09h00 - 13h00)');
  const [message, setMessage] = useState('');

  const [submittedReg, setSubmittedReg] = useState<Registration | null>(null);
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({});

  if (!isOpen) return null;

  const selectedCourse = courses.find((c) => c.id === courseId) || courses[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { fullName?: string; phone?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = t('requiredField');
    }
    if (!phone.trim()) {
      newErrors.phone = t('requiredField');
    } else if (phone.trim().length < 8) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const reg = addRegistration({
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title[language] || selectedCourse.title.fr,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      dateOfBirth: dateOfBirth || undefined,
      preferredSchedule: schedule,
      message: message.trim() || undefined,
    });

    setSubmittedReg(reg);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setSubmittedReg(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setDateOfBirth('');
    setMessage('');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#021510]/60 backdrop-blur-xs flex items-start sm:items-center justify-center p-2 sm:p-4">
      <div className="relative bg-white text-[#062B22] w-full max-w-xl rounded-2xl border border-[#D6AD4F]/50 shadow-2xl overflow-hidden my-4 sm:my-8">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#063B2E] border-b border-[#D6AD4F]/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#D6AD4F] to-[#C89B3C] text-[#05261D] flex items-center justify-center font-bold shadow-xs shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-[#FAF6ED] uppercase tracking-wider font-display truncate">
                {t('regModalTitle')}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#E5BD5B] font-semibold truncate">ECOLE CHEF BENZAZA — Mostaganem</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-[#EAE2CF]/80 hover:text-[#E5BD5B] rounded-lg hover:bg-[#042119] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {submittedReg ? (
            /* Success confirmation ticket */
            <div className="space-y-5 sm:space-y-6 text-center py-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold text-[#2D241E] font-display">
                  {t('regSuccessTitle')}
                </h4>
                <p className="text-xs text-[#5C4F44] mt-1 max-w-md mx-auto">
                  {t('regSuccessDesc')}
                </p>
              </div>

              {/* Printable Registration Slip */}
              <div
                id="registration-ticket"
                className="bg-[#FAF7F2] border border-[#E8DEC8] p-4 sm:p-5 rounded-xl text-left rtl:text-right space-y-3 font-sans"
              >
                <div className="flex flex-wrap justify-between items-center gap-2 border-b border-[#E8DEC8] pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A6E63] block font-semibold">
                      Code Dossier
                    </span>
                    <span className="text-sm sm:text-base font-bold font-mono text-[#8C6B28]">
                      {submittedReg.registrationCode}
                    </span>
                  </div>
                  <div className="text-left sm:text-right rtl:sm:text-left">
                    <span className="text-[10px] uppercase tracking-wider text-[#7A6E63] block font-semibold">
                      Statut
                    </span>
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded uppercase">
                      {t('status_pending')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs pt-1">
                  <div>
                    <span className="text-[#7A6E63] block">Candidat :</span>
                    <strong className="text-[#2D241E] block mt-0.5 font-semibold break-words">{submittedReg.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-[#7A6E63] block">Téléphone :</span>
                    <strong className="text-[#2D241E] block font-mono mt-0.5">{submittedReg.phone}</strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[#7A6E63] block">Formation choisie :</span>
                    <strong className="text-[#8C6B28] block mt-0.5 break-words">{submittedReg.courseTitle}</strong>
                  </div>
                  <div>
                    <span className="text-[#7A6E63] block">Session préférée :</span>
                    <span className="text-[#2D241E] block mt-0.5">{submittedReg.preferredSchedule}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6E63] block">Lieu de formation :</span>
                    <span className="text-[#2D241E] block mt-0.5">Mostaganem (Siège Benzaza)</span>
                  </div>
                </div>

                <div className="text-[11px] text-[#7A6E63] pt-3 border-t border-[#E8DEC8] italic">
                  {t('regSuccessNotice')}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 py-2.5 px-4 bg-white hover:bg-[#FAF7F2] text-[#062B22] border border-[#E8DEC8] text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4 text-[#063B2E]" />
                  <span>{t('downloadReceipt')}</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-2.5 px-4 bg-[#063B2E] hover:bg-[#042119] text-[#FAF6ED] border border-[#D6AD4F]/50 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
                >
                  {t('close')}
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-[#5C4F44]">
                {t('regSubtitle')}
              </p>

              {/* Course selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1.5">
                  {t('selectCourse')} *
                </label>
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg px-3.5 py-2.5 text-xs text-[#2D241E] focus:bg-white focus:outline-none focus:border-[#C9A45C]"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title[language] || c.title.fr} — {c.priceDZD} {t('dzd')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1.5">
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Karim Benali"
                    className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg px-3.5 py-2 text-xs text-[#2D241E] placeholder:text-[#A89F91] focus:bg-white focus:outline-none focus:border-[#C9A45C]"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1.5">
                    {t('phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('phonePlaceholder')}
                    className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg px-3.5 py-2 text-xs text-[#2D241E] font-mono placeholder:text-[#A89F91] focus:bg-white focus:outline-none focus:border-[#C9A45C]"
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Email & Date of Birth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1.5">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@domaine.com"
                    className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg px-3.5 py-2 text-xs text-[#2D241E] placeholder:text-[#A89F91] focus:bg-white focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1.5">
                    {t('dob')}
                  </label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg px-3.5 py-2 text-xs text-[#2D241E] focus:bg-white focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
              </div>

              {/* Schedule selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1.5">
                  {t('selectSchedule')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    t('scheduleMorning'),
                    t('scheduleAfternoon'),
                    t('scheduleWeekend'),
                    t('scheduleAccelerated'),
                  ].map((item) => (
                    <label
                      key={item}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                        schedule === item
                          ? 'border-[#063B2E] bg-[#063B2E] text-[#E5BD5B] font-semibold'
                          : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#062B22] hover:bg-white hover:border-[#063B2E]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="schedule"
                        value={item}
                        checked={schedule === item}
                        onChange={(e) => setSchedule(e.target.value)}
                        className="accent-[#D6AD4F]"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#062B22] mb-1.5">
                  {t('message')}
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Questions sur le matériel, projet professionnel, facilités de paiement..."
                  className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg p-3 text-xs text-[#062B22] placeholder:text-[#A89F91] focus:bg-white focus:outline-none focus:border-[#063B2E] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#063B2E] hover:bg-[#042119] text-[#FAF6ED] border border-[#D6AD4F]/50 font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md shadow-[#063B2E]/20"
                >
                  {t('submitRegistration')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
