import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { settings, language } = useApp();

  const cleanNumber = settings.whatsapp.replace(/[^0-9]/g, '');

  const prefilledMessage =
    language === 'ar'
      ? 'السلام عليكم، أود الاستفسار عن برامج ودورات مدرسة الشيف بن زازة بوهران.'
      : language === 'en'
      ? 'Hello, I would like to inquire about training programs at Chef Benzaza Academy in Oran.'
      : 'Bonjour, je souhaite obtenir des informations sur les formations de l’École Chef Benzaza à Oran.';

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(prefilledMessage)}`;

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 whatsapp-floating-btn"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter l'École Chef Benzaza sur WhatsApp"
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 border-2 border-white/20"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          WhatsApp Oran
        </span>
      </a>
    </aside>
  );
};
