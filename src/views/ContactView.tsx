import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { settings, sendContactMessage, t, language } = useApp();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !message.trim()) return;

    sendContactMessage({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      subject: subject.trim() || 'Renseignement général',
      message: message.trim(),
    });

    setIsSubmitted(true);
    setFullName('');
    setPhone('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${settings.address}, ${settings.city}, Algérie`
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10 sm:space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-[#063B2E]">
          Accès & Renseignements
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#062B22] font-display text-balance">
          {t('contactTitle')}
        </h1>
        <p className="text-sm text-[#5C6660] leading-relaxed">
          {t('contactSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#063B2E] via-[#062B22] to-[#021510] text-[#FAF6ED] p-5 sm:p-8 lg:p-10 rounded-2xl border border-[#D6AD4F]/40 shadow-lg space-y-6 sm:space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#E5BD5B] font-bold block mb-1">
              Siège Officiel
            </span>
            <h2 className="text-2xl font-bold font-display text-[#FAF6ED]">
              {settings.schoolName}
            </h2>
            <p className="text-xs text-[#EAE2CF]/80 mt-1">
              Institut de Formation Professionnelle Agréé — Mostaganem, Algérie
            </p>
          </div>

          <div className="space-y-5 text-xs">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded bg-[#042119] text-[#E5BD5B] shrink-0 border border-[#D6AD4F]/35">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-[#FAF6ED] text-sm">{t('address')}</strong>
                <span className="text-[#EAE2CF]/85 mt-0.5 block leading-relaxed">
                  {settings.address}, {settings.city}, {settings.country}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded bg-[#042119] text-[#E5BD5B] shrink-0 border border-[#D6AD4F]/35">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-[#FAF6ED] text-sm">{t('callUs')}</strong>
                <a
                  href={`tel:${settings.phone}`}
                  className="text-[#EAE2CF]/90 hover:text-[#E5BD5B] font-mono tabular-nums block mt-0.5 transition-colors font-medium"
                >
                  {settings.phone} / {settings.phoneSecondary}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded bg-[#042119] text-[#E5BD5B] shrink-0 border border-[#D6AD4F]/35">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-[#FAF6ED] text-sm">Email</strong>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-[#EAE2CF]/90 hover:text-[#E5BD5B] block mt-0.5 transition-colors"
                >
                  {settings.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded bg-[#042119] text-[#E5BD5B] shrink-0 border border-[#D6AD4F]/35">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-[#FAF6ED] text-sm">{t('openingHoursTitle')}</strong>
                <span className="text-[#EAE2CF]/85 mt-0.5 block leading-relaxed">
                  {settings.openingHours[language] || settings.openingHours.fr}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#D6AD4F]/25">
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Contacter sur WhatsApp</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="pt-2 text-center text-xs text-[#EAE2CF]/70">
            <span className="block mb-2">Suivez nos ateliers sur les réseaux :</span>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs font-semibold text-[#EAE2CF]/90">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#E5BD5B]">Facebook</a>
              <span>·</span>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#E5BD5B]">Instagram</a>
              <span>·</span>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-[#E5BD5B]">TikTok</a>
              <span>·</span>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#E5BD5B]">YouTube</a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-8 lg:p-10 rounded-2xl border border-[#E8DEC8] shadow-sm space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#062B22] font-display">
              {t('sendMessageTitle')}
            </h2>
            <p className="text-xs text-[#5C6660] mt-1">
              Une question sur les tarifs, les dates de rentrée ou nos ateliers ? Écrivez-nous directement.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#063B2E] text-[#E5BD5B] border border-[#D6AD4F]/50 flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#062B22]">Message envoyé avec succès !</h3>
              <p className="text-xs text-[#5C6660] max-w-sm mx-auto">
                {t('messageSentSuccess')}
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-4 py-2 bg-[#063B2E] hover:bg-[#042119] text-[#FAF6ED] border border-[#D6AD4F]/50 text-xs font-semibold rounded transition-colors shadow-xs"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#062B22] uppercase tracking-wider mb-1">
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Sofiane Belkacem"
                    className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded px-3.5 py-2 text-xs text-[#062B22] focus:outline-none focus:border-[#063B2E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#062B22] uppercase tracking-wider mb-1">
                    {t('phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('phonePlaceholder')}
                    className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded px-3.5 py-2 text-xs text-[#062B22] font-mono focus:outline-none focus:border-[#063B2E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#5C6660] mb-1">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@domaine.com"
                    className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded px-3.5 py-2 text-xs text-[#062B22] focus:outline-none focus:border-[#063B2E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#062B22] uppercase tracking-wider mb-1">
                    {t('subject')}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ex: Renseignement formation Pizza"
                    className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded px-3.5 py-2 text-xs text-[#062B22] focus:outline-none focus:border-[#063B2E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#062B22] uppercase tracking-wider mb-1">
                  {t('yourMessage')} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écrivez votre message ici..."
                  className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded p-3 text-xs text-[#062B22] focus:outline-none focus:border-[#063B2E] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#063B2E] hover:bg-[#042119] text-[#FAF6ED] border border-[#D6AD4F]/50 font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#E5BD5B]" />
                <span>{t('sendButton')}</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Google Maps Embed with editable location in Mostaganem */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8DEC8] shadow-sm space-y-3">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#062B22]">
            <MapPin className="w-4 h-4 text-[#063B2E]" />
            <span>Localisation satellite de l'école à Mostaganem</span>
          </div>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(
              `${settings.address}, ${settings.city}, Algérie`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#063B2E] hover:underline flex items-center gap-1 font-medium"
          >
            <span>Ouvrir dans Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="h-80 w-full rounded-xl overflow-hidden bg-neutral-200 border border-[#EAE3D6]">
          <iframe
            title="Google Maps Location Mostaganem"
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

    </div>
  );
};
