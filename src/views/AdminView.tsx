import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course, Product, SiteSettings, Registration, Order, AppointmentBooking } from '../types';
import {
  ShieldCheck,
  Lock,
  LogOut,
  LayoutDashboard,
  GraduationCap,
  Users,
  ShoppingBag,
  Scissors,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  Database,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Mail,
  RefreshCw,
  Coins,
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    courses,
    updateCourse,
    addCourse,
    deleteCourse,
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    registrations,
    updateRegistrationStatus,
    deleteRegistration,
    orders,
    updateOrderStatus,
    deleteOrder,
    appointments,
    updateAppointmentStatus,
    deleteAppointment,
    gallery,
    addGalleryItem,
    deleteGalleryItem,
    messages,
    updateMessageStatus,
    deleteMessage,
    settings,
    updateSettings,
    resetToDemoData,
    t,
    language,
    isRtl,
  } = useApp();

  // Login form state
  const [email, setEmail] = useState('admin@chefbenzaza.dz');
  const [password, setPassword] = useState('admin123');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'courses'
    | 'registrations'
    | 'products'
    | 'orders'
    | 'appointments'
    | 'gallery'
    | 'messages'
    | 'settings'
    | 'database'
  >('overview');

  // Editing Course State
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Editing Product State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New Gallery Item State
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState<'pastry' | 'culinary' | 'pizza' | 'hair' | 'it'>('pastry');
  const [newGalleryImage, setNewGalleryImage] = useState('/src/assets/images/pastry_luxury_entremet_1794418831448.jpg');
  const [newGalleryStudent, setNewGalleryStudent] = useState('');

  // Editable settings local state
  const [localSettings, setLocalSettings] = useState<SiteSettings>(settings);

  // If not logged in, show secure login screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white text-[#2D241E] p-8 rounded-2xl border border-[#E8DEC8] shadow-xl space-y-6">
          <div className="text-center space-y-3">
            <img
              src="/logo.png"
              alt="Logo Chef Benzaza"
              className="h-24 w-auto mx-auto object-contain drop-shadow-[0_4px_12px_rgba(140,107,40,0.35)]"
            />
            <h2 className="text-xl font-bold font-display text-[#2D241E]">
              {t('adminLoginTitle')}
            </h2>
            <p className="text-xs text-[#7A6E63]">
              Espace sécurisé d'administration — Mostaganem
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              adminLogin(email, password);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1.5">
                {t('adminEmail')}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded px-3.5 py-2.5 text-xs text-[#2D241E] focus:outline-none focus:border-[#C9A45C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F44] mb-1.5">
                {t('adminPassword')}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded px-3.5 py-2.5 text-xs text-[#2D241E] focus:outline-none focus:border-[#C9A45C]"
              />
            </div>

            <div className="p-3 bg-[#FAF4E6] rounded border border-[#E8DEC8] text-[11px] text-[#8C6B28] font-medium">
              💡 {t('adminDemoHelp')} (admin@chefbenzaza.dz / admin123)
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#C9A45C] hover:bg-[#DFC283] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-xs"
            >
              {t('adminLoginButton')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalCourseRevenueEstimated = registrations
    .filter((r) => r.status === 'confirmed')
    .reduce((acc, r) => {
      const c = courses.find((x) => x.id === r.courseId);
      return acc + (c ? c.priceDZD : 35000);
    }, 0);

  const totalStoreRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((acc, o) => acc + o.total, 0);

  const totalRevenue = totalCourseRevenueEstimated + totalStoreRevenue;

  const pendingRegistrationsCount = registrations.filter((r) => r.status === 'pending').length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending' || o.status === 'preparing').length;
  const pendingAppointmentsCount = appointments.filter((a) => a.status === 'pending').length;
  const unreadMessagesCount = messages.filter((m) => m.status === 'unread').length;

  const tabs = [
    { id: 'overview', label: t('adminTabOverview'), icon: LayoutDashboard },
    { id: 'courses', label: `${t('adminTabCourses')} (${courses.length})`, icon: GraduationCap },
    { id: 'registrations', label: `${t('adminTabRegistrations')} (${pendingRegistrationsCount})`, icon: Users },
    { id: 'products', label: `${t('adminTabProducts')} (${products.length})`, icon: ShoppingBag },
    { id: 'orders', label: `${t('adminTabOrders')} (${pendingOrdersCount})`, icon: ShoppingBag },
    { id: 'appointments', label: `${t('adminTabAppointments')} (${pendingAppointmentsCount})`, icon: Scissors },
    { id: 'gallery', label: `${t('adminTabGallery')} (${gallery.length})`, icon: ImageIcon },
    { id: 'messages', label: `${t('adminTabMessages')} (${unreadMessagesCount})`, icon: MessageSquare },
    { id: 'settings', label: t('adminTabSettings'), icon: Settings },
    { id: 'database', label: t('adminTabDatabase'), icon: Database },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      
      {/* Top Admin Header Bar */}
      <div className="bg-gradient-to-br from-white to-[#FAF7F2] text-[#2D241E] p-6 rounded-2xl border border-[#E8DEC8] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FAF4E6] text-[#8C6B28] border border-[#E8DEC8] flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6 text-[#C9A45C]" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display text-[#2D241E]">
              {t('adminTitle')}
            </h1>
            <p className="text-xs text-[#7A6E63]">
              Mostaganem, Algérie — Connecté : admin@chefbenzaza.dz (Super Administrateur)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDemoData}
            className="px-3.5 py-2 bg-white hover:bg-[#FAF4E6] text-[#6B5E52] border border-[#E8DEC8] text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow-xs"
            title="Réinitialiser toutes les données"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>{t('resetDemoData')}</span>
          </button>

          <button
            onClick={adminLogout}
            className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('adminLogout')}</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-white border border-[#E8DEC8] rounded-xl shadow-xs scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#C9A45C] text-white shadow-xs'
                  : 'text-[#6B5E52] hover:text-[#8C6B28] hover:bg-[#FAF7F2]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}

      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Metrics strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-[#E6DFD3] shadow-xs space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                {t('metricTotalRevenue')}
              </span>
              <strong className="text-2xl font-bold font-mono text-[#8C6B28] tabular-nums block">
                {totalRevenue.toLocaleString()} {t('dzd')}
              </strong>
              <span className="text-[11px] text-neutral-400">Inscriptions & Ventes boutique</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E6DFD3] shadow-xs space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                {t('metricRegistrations')}
              </span>
              <strong className="text-2xl font-bold font-mono text-neutral-900 tabular-nums block">
                {registrations.length}
              </strong>
              <span className="text-[11px] text-amber-600 font-semibold">
                {pendingRegistrationsCount} en attente de traitement
              </span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E6DFD3] shadow-xs space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                {t('metricOrders')}
              </span>
              <strong className="text-2xl font-bold font-mono text-neutral-900 tabular-nums block">
                {orders.length}
              </strong>
              <span className="text-[11px] text-neutral-500">
                Total : {totalStoreRevenue} {t('dzd')}
              </span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E6DFD3] shadow-xs space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                {t('metricAppointments')}
              </span>
              <strong className="text-2xl font-bold font-mono text-neutral-900 tabular-nums block">
                {appointments.length}
              </strong>
              <span className="text-[11px] text-neutral-500">
                Salon & Barbershop
              </span>
            </div>
          </div>

          {/* Quick lists split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Registrations */}
            <div className="bg-white p-6 rounded-xl border border-[#E6DFD3] space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1ECE1] pb-3">
                <h3 className="text-sm font-bold text-[#2D241E] uppercase tracking-wider">
                  Dernières Inscriptions
                </h3>
                <button
                  onClick={() => setActiveTab('registrations')}
                  className="text-xs text-[#8C6B28] font-semibold hover:underline"
                >
                  Voir tout
                </button>
              </div>

              <div className="space-y-3">
                {registrations.slice(0, 4).map((reg) => (
                  <div
                    key={reg.id}
                    className="p-3 bg-[#FAF7F2] rounded border border-[#EAE3D6] flex items-center justify-between text-xs"
                  >
                    <div>
                      <strong className="block text-neutral-900 font-semibold">{reg.fullName}</strong>
                      <span className="text-neutral-500 font-mono">{reg.phone} · {reg.courseTitle}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      reg.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {reg.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Store Orders */}
            <div className="bg-white p-6 rounded-xl border border-[#E6DFD3] space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1ECE1] pb-3">
                <h3 className="text-sm font-bold text-[#2D241E] uppercase tracking-wider">
                  Commandes Boutique Récentes
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#8C6B28] font-semibold hover:underline"
                >
                  Voir tout
                </button>
              </div>

              <div className="space-y-3">
                {orders.slice(0, 4).map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3 bg-[#FAF7F2] rounded border border-[#EAE3D6] flex items-center justify-between text-xs"
                  >
                    <div>
                      <strong className="block text-neutral-900 font-mono text-[11px] text-[#8C6B28]">
                        {ord.orderCode} · {ord.customerName}
                      </strong>
                      <span className="text-neutral-500">{ord.commune} · {ord.total} {t('dzd')}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-neutral-200 text-neutral-800">
                      {ord.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. COURSES MANAGEMENT */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#2D241E] font-display">
              Gestion des Formations & Tarifs DZD
            </h2>
            <button
              onClick={() => {
                const newCourse: Course = {
                  id: 'course-' + Date.now(),
                  slug: 'nouvelle-formation-' + Date.now(),
                  category: 'culinary',
                  title: {
                    fr: 'Nouvelle Formation Professionnelle',
                    ar: 'دورة تكوينية جديدة',
                    en: 'New Professional Course',
                  },
                  shortDesc: {
                    fr: 'Description synthétique de la nouvelle formation.',
                    ar: 'وصف مختصر للدورة التكوينية.',
                    en: 'Short summary of the training course.',
                  },
                  fullDesc: {
                    fr: 'Programme détaillé de formation pratique en atelier à Mostaganem.',
                    ar: 'برنامج تدريبي تطبيقي مفصل في ورشات مستغانم.',
                    en: 'Full practical training syllabus in Mostaganem.',
                  },
                  image: '/src/assets/images/hero_chef_kitchen_1794418831073.jpg',
                  priceDZD: 35000,
                  duration: {
                    fr: '2 Mois',
                    ar: 'شهران',
                    en: '2 Months',
                  },
                  schedules: {
                    fr: ['Matinée', 'Soirée', 'Weekend'],
                    ar: ['صباحي', 'مسائي', 'نهاية الأسبوع'],
                    en: ['Morning', 'Evening', 'Weekend'],
                  },
                  objectives: {
                    fr: ['Objectif pratique 1', 'Objectif pratique 2'],
                    ar: ['هدف تطبيقي 1', 'هدف تطبيقي 2'],
                    en: ['Practical goal 1', 'Practical goal 2'],
                  },
                  modules: [
                    {
                      title: { fr: 'Module 1', ar: 'المحور 1', en: 'Module 1' },
                      content: { fr: 'Contenu du module', ar: 'محتوى المحور', en: 'Module content' },
                    },
                  ],
                  instructor: {
                    name: 'Chef Formateur',
                    role: { fr: 'Chef Formateur', ar: 'مدرب رئيسي', en: 'Lead Instructor' },
                    experience: { fr: '10 ans d’expérience', ar: '10 سنوات خبرة', en: '10 years experience' },
                  },
                };
                addCourse(newCourse);
                setEditingCourse(newCourse);
              }}
              className="px-4 py-2 bg-[#C9A45C] hover:bg-[#DFC283] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{t('addNewCourse')}</span>
            </button>
          </div>

          {/* List of courses with inline edit */}
          <div className="grid grid-cols-1 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-5 rounded-xl border border-[#E6DFD3] flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={course.image}
                    alt={course.title.fr}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-neutral-200 shrink-0"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 font-display">
                      {course.title[language] || course.title.fr}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {course.duration[language] || course.duration.fr} · {course.instructor.name}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs font-mono font-semibold text-[#8C6B28]">
                      <span>Tarif : {course.priceDZD} {t('dzd')}</span>
                      <span>·</span>
                      <span className="uppercase text-[11px] text-neutral-500">{course.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setEditingCourse(course)}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium rounded flex items-center gap-1.5 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Modifier</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Confirmer la suppression de cette formation ?')) {
                        deleteCourse(course.id);
                      }
                    }}
                    className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                    title={t('delete')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Course Edit Drawer/Modal */}
          {editingCourse && (
            <div className="fixed inset-0 z-50 bg-[#2D241E]/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white text-[#2D241E] w-full max-w-2xl rounded-xl border border-[#E8DEC8] shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b border-[#E8DEC8] pb-3">
                  <h3 className="text-base font-bold font-display text-[#2D241E]">
                    Modifier la formation : {editingCourse.title.fr}
                  </h3>
                  <button
                    onClick={() => setEditingCourse(null)}
                    className="text-[#7A6E63] hover:text-[#2D241E]"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#5C4F44] font-semibold mb-1">Titre (Français)</label>
                    <input
                      type="text"
                      value={editingCourse.title.fr}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          title: { ...editingCourse.title, fr: e.target.value },
                        })
                      }
                      className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded px-3 py-2 text-[#2D241E] focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#5C4F44] font-semibold mb-1">Titre (Arabe)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={editingCourse.title.ar}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          title: { ...editingCourse.title, ar: e.target.value },
                        })
                      }
                      className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded px-3 py-2 text-[#2D241E] font-arabic focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#5C4F44] font-semibold mb-1">Tarif en DZD *</label>
                      <input
                        type="number"
                        value={editingCourse.priceDZD}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            priceDZD: Number(e.target.value),
                          })
                        }
                        className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded px-3 py-2 text-[#2D241E] font-mono focus:outline-none focus:border-[#C9A45C]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5C4F44] font-semibold mb-1">Durée (ex: 3 Mois)</label>
                      <input
                        type="text"
                        value={editingCourse.duration.fr}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            duration: { ...editingCourse.duration, fr: e.target.value },
                          })
                        }
                        className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded px-3 py-2 text-[#2D241E] focus:outline-none focus:border-[#C9A45C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#5C4F44] font-semibold mb-1">Nom du formateur</label>
                    <input
                      type="text"
                      value={editingCourse.instructor.name}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          instructor: { ...editingCourse.instructor, name: e.target.value },
                        })
                      }
                      className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded px-3 py-2 text-[#2D241E] focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#5C4F44] font-semibold mb-1">Description courte</label>
                    <textarea
                      rows={3}
                      value={editingCourse.shortDesc.fr}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          shortDesc: { ...editingCourse.shortDesc, fr: e.target.value },
                        })
                      }
                      className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded p-2.5 text-[#2D241E] resize-none focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8DEC8] flex justify-end gap-3">
                  <button
                    onClick={() => setEditingCourse(null)}
                    className="px-4 py-2 bg-white text-[#6B5E52] border border-[#E8DEC8] rounded text-xs hover:bg-[#FAF7F2]"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => {
                      updateCourse(editingCourse);
                      setEditingCourse(null);
                    }}
                    className="px-5 py-2 bg-[#C9A45C] hover:bg-[#DFC283] text-white font-bold rounded text-xs uppercase tracking-wider shadow-xs"
                  >
                    Enregistrer la formation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. REGISTRATIONS MANAGEMENT */}
      {activeTab === 'registrations' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-[#2D241E] font-display">
            Gestion des Inscriptions ({registrations.length} dossiers)
          </h2>

          <div className="bg-white rounded-xl border border-[#E6DFD3] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-[#FAF7F2] border-b border-[#E6DFD3] text-neutral-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-3.5">Code</th>
                    <th className="p-3.5">Candidat</th>
                    <th className="p-3.5">Formation</th>
                    <th className="p-3.5">Créneau</th>
                    <th className="p-3.5">Statut</th>
                    <th className="p-3.5 text-right rtl:text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1ECE1]">
                  {registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-neutral-50">
                      <td className="p-3.5 font-mono font-bold text-[#8C6B28]">
                        {reg.registrationCode}
                      </td>
                      <td className="p-3.5">
                        <strong className="block text-neutral-900">{reg.fullName}</strong>
                        <span className="text-neutral-500 font-mono text-[11px]">{reg.phone}</span>
                        {reg.email && <span className="block text-[11px] text-neutral-400">{reg.email}</span>}
                      </td>
                      <td className="p-3.5 font-medium text-neutral-800">
                        {reg.courseTitle}
                      </td>
                      <td className="p-3.5 text-neutral-600">
                        {reg.preferredSchedule}
                      </td>
                      <td className="p-3.5">
                        <select
                          value={reg.status}
                          onChange={(e) =>
                            updateRegistrationStatus(reg.id, e.target.value as Registration['status'])
                          }
                          className={`text-xs font-semibold px-2 py-1 rounded border ${
                            reg.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : reg.status === 'contacted'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : reg.status === 'cancelled'
                              ? 'bg-red-50 text-red-800 border-red-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="pending">En attente</option>
                          <option value="contacted">Contacté</option>
                          <option value="confirmed">Confirmé</option>
                          <option value="cancelled">Annulé</option>
                        </select>
                      </td>
                      <td className="p-3.5 text-right rtl:text-left">
                        <button
                          onClick={() => {
                            if (confirm('Supprimer cette demande d’inscription ?')) {
                              deleteRegistration(reg.id);
                            }
                          }}
                          className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. PRODUCTS & STOCK MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#2D241E] font-display">
              Boutique & Gestion des Stocks
            </h2>
            <button
              onClick={() => {
                const newProd: Product = {
                  id: 'prod-' + Date.now(),
                  name: {
                    fr: 'Nouvelle Création Pâtissière',
                    ar: 'منتج حلويات جديد',
                    en: 'New Pastry Creation',
                  },
                  description: {
                    fr: 'Préparé fraîchement avec ingrédients de premier choix.',
                    ar: 'محضر طازجاً بمكونات فاخرة.',
                    en: 'Freshly prepared with prime ingredients.',
                  },
                  priceDZD: 1500,
                  category: 'pastry',
                  image: '/src/assets/images/pastry_luxury_entremet_1794418831448.jpg',
                  stock: 10,
                  isPopular: true,
                };
                addProduct(newProd);
                setEditingProduct(newProd);
              }}
              className="px-4 py-2 bg-[#C9A45C] hover:bg-[#DFC283] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{t('addNewProduct')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-5 rounded-xl border border-[#E6DFD3] flex flex-col justify-between space-y-4"
              >
                <div className="flex gap-3.5">
                  <img
                    src={product.image}
                    alt={product.name.fr}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-neutral-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-neutral-900 truncate">
                      {product.name[language] || product.name.fr}
                    </h3>
                    <span className="text-[11px] uppercase font-mono text-neutral-400 block mt-0.5">
                      Catégorie : {product.category}
                    </span>
                    <p className="text-xs font-mono font-bold text-[#8C6B28] mt-1">
                      {product.priceDZD} {t('dzd')}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F1ECE1] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500">Stock :</span>
                    <input
                      type="number"
                      min={0}
                      value={product.stock}
                      onChange={(e) =>
                        updateProduct({ ...product, stock: Math.max(0, Number(e.target.value)) })
                      }
                      className="w-16 p-1 bg-neutral-100 border border-neutral-300 rounded text-center font-mono font-bold"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="p-1.5 text-neutral-500 hover:text-[#2D241E] transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Supprimer ce produit ?')) deleteProduct(product.id);
                      }}
                      className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Product Modal */}
          {editingProduct && (
            <div className="fixed inset-0 z-50 bg-[#2D241E]/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white text-[#2D241E] w-full max-w-lg rounded-xl border border-[#E8DEC8] shadow-2xl p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-[#E8DEC8] pb-3">
                  <h3 className="text-base font-bold text-[#2D241E]">Modifier le produit</h3>
                  <button onClick={() => setEditingProduct(null)} className="text-[#7A6E63] hover:text-[#2D241E]">✕</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#5C4F44] font-semibold mb-1">Nom (FR)</label>
                    <input
                      type="text"
                      value={editingProduct.name.fr}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name: { ...editingProduct.name, fr: e.target.value },
                        })
                      }
                      className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded px-3 py-2 text-[#2D241E] focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#5C4F44] font-semibold mb-1">Prix DZD</label>
                      <input
                        type="number"
                        value={editingProduct.priceDZD}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            priceDZD: Number(e.target.value),
                          })
                        }
                        className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded px-3 py-2 text-[#2D241E] font-mono focus:outline-none focus:border-[#C9A45C]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5C4F44] font-semibold mb-1">Stock disponible</label>
                      <input
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            stock: Number(e.target.value),
                          })
                        }
                        className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded px-3 py-2 text-[#2D241E] font-mono focus:outline-none focus:border-[#C9A45C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#5C4F44] font-semibold mb-1">Description (FR)</label>
                    <textarea
                      rows={2}
                      value={editingProduct.description.fr}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          description: { ...editingProduct.description, fr: e.target.value },
                        })
                      }
                      className="w-full bg-[#FAF7F2] border border-[#E8DEC8] rounded p-2 text-[#2D241E] resize-none focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8DEC8] flex justify-end gap-3">
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 bg-white text-[#6B5E52] border border-[#E8DEC8] rounded text-xs hover:bg-[#FAF7F2]"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => {
                      updateProduct(editingProduct);
                      setEditingProduct(null);
                    }}
                    className="px-5 py-2 bg-[#C9A45C] hover:bg-[#DFC283] text-white font-bold rounded text-xs uppercase tracking-wider shadow-xs"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. CUSTOMER ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-[#2D241E] font-display">
            Gestion des Commandes Boutique ({orders.length} commandes)
          </h2>

          <div className="bg-white rounded-xl border border-[#E6DFD3] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-[#FAF7F2] border-b border-[#E6DFD3] text-neutral-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-3.5">N° Commande</th>
                    <th className="p-3.5">Client</th>
                    <th className="p-3.5">Articles</th>
                    <th className="p-3.5">Montant Total</th>
                    <th className="p-3.5">Mode</th>
                    <th className="p-3.5">Statut</th>
                    <th className="p-3.5 text-right rtl:text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1ECE1]">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-neutral-50">
                      <td className="p-3.5 font-mono font-bold text-[#8C6B28]">
                        {ord.orderCode}
                      </td>
                      <td className="p-3.5">
                        <strong className="block text-neutral-900">{ord.customerName}</strong>
                        <span className="text-neutral-500 font-mono text-[11px]">{ord.customerPhone}</span>
                        {ord.deliveryType === 'delivery' && (
                          <span className="block text-[11px] text-neutral-400">
                            {ord.address}, {ord.commune}
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-neutral-700">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="text-[11px]">
                            {it.quantity}x {it.name}
                          </div>
                        ))}
                      </td>
                      <td className="p-3.5 font-mono font-bold text-neutral-900">
                        {ord.total} {t('dzd')}
                      </td>
                      <td className="p-3.5">
                        <span className="text-[11px] font-semibold">
                          {ord.deliveryType === 'delivery' ? 'Livraison Mostaganem' : 'Retrait École'}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <select
                          value={ord.status}
                          onChange={(e) =>
                            updateOrderStatus(ord.id, e.target.value as Order['status'])
                          }
                          className={`text-xs font-semibold px-2 py-1 rounded border ${
                            ord.status === 'delivered'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : ord.status === 'in_delivery'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : ord.status === 'cancelled'
                              ? 'bg-red-50 text-red-800 border-red-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="pending">En attente</option>
                          <option value="preparing">En préparation</option>
                          <option value="in_delivery">En livraison</option>
                          <option value="delivered">Livré</option>
                          <option value="cancelled">Annulé</option>
                        </select>
                      </td>
                      <td className="p-3.5 text-right rtl:text-left">
                        <button
                          onClick={() => {
                            if (confirm('Supprimer cette commande ?')) deleteOrder(ord.id);
                          }}
                          className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. APPOINTMENTS MANAGEMENT */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-[#2D241E] font-display">
            Gestion des Rendez-vous Salon & Barbershop
          </h2>

          <div className="bg-white rounded-xl border border-[#E6DFD3] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-[#FAF7F2] border-b border-[#E6DFD3] text-neutral-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-3.5">Réf RDV</th>
                    <th className="p-3.5">Client</th>
                    <th className="p-3.5">Prestation</th>
                    <th className="p-3.5">Date & Heure</th>
                    <th className="p-3.5">Statut</th>
                    <th className="p-3.5 text-right rtl:text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1ECE1]">
                  {appointments.map((app) => (
                    <tr key={app.id} className="hover:bg-neutral-50">
                      <td className="p-3.5 font-mono font-bold text-[#8C6B28]">
                        {app.bookingCode}
                      </td>
                      <td className="p-3.5">
                        <strong className="block text-neutral-900">{app.customerName}</strong>
                        <span className="text-neutral-500 font-mono text-[11px]">{app.customerPhone}</span>
                      </td>
                      <td className="p-3.5 text-neutral-800">
                        {app.serviceTitle}
                      </td>
                      <td className="p-3.5 font-mono text-neutral-900 font-semibold">
                        {app.date} @ {app.timeSlot}
                      </td>
                      <td className="p-3.5">
                        <select
                          value={app.status}
                          onChange={(e) =>
                            updateAppointmentStatus(app.id, e.target.value as AppointmentBooking['status'])
                          }
                          className="text-xs font-semibold px-2 py-1 rounded border bg-neutral-50 text-neutral-800"
                        >
                          <option value="pending">En attente</option>
                          <option value="confirmed">Confirmé</option>
                          <option value="completed">Terminé</option>
                          <option value="cancelled">Annulé</option>
                        </select>
                      </td>
                      <td className="p-3.5 text-right rtl:text-left">
                        <button
                          onClick={() => {
                            if (confirm('Supprimer ce rendez-vous ?')) deleteAppointment(app.id);
                          }}
                          className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 7. GALLERY MANAGEMENT */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#2D241E] font-display">
              Gestion de la Galerie Étudiants
            </h2>
          </div>

          {/* Quick add photo box */}
          <div className="bg-white p-6 rounded-xl border border-[#E6DFD3] space-y-4">
            <h3 className="text-sm font-bold text-[#2D241E] uppercase tracking-wider">
              Ajouter une nouvelle réalisation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-neutral-600 mb-1">Titre de la photo</label>
                <input
                  type="text"
                  placeholder="Ex: Tarte au citron meringuée"
                  value={newGalleryTitle}
                  onChange={(e) => setNewGalleryTitle(e.target.value)}
                  className="w-full p-2 bg-[#FAF7F2] border border-[#E6DFD3] rounded"
                />
              </div>
              <div>
                <label className="block text-neutral-600 mb-1">Promotion / Étudiant</label>
                <input
                  type="text"
                  placeholder="Ex: Atelier Pâtisserie 2026"
                  value={newGalleryStudent}
                  onChange={(e) => setNewGalleryStudent(e.target.value)}
                  className="w-full p-2 bg-[#FAF7F2] border border-[#E6DFD3] rounded"
                />
              </div>
              <div>
                <label className="block text-neutral-600 mb-1">Catégorie</label>
                <select
                  value={newGalleryCategory}
                  onChange={(e) => setNewGalleryCategory(e.target.value as any)}
                  className="w-full p-2 bg-[#FAF7F2] border border-[#E6DFD3] rounded"
                >
                  <option value="pastry">Pâtisserie</option>
                  <option value="pizza">Pizza</option>
                  <option value="culinary">Cuisine</option>
                  <option value="hair">Coiffure & Barber</option>
                  <option value="it">Informatique</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (!newGalleryTitle.trim()) return;
                  addGalleryItem({
                    id: 'gal-' + Date.now(),
                    title: {
                      fr: newGalleryTitle,
                      ar: newGalleryTitle,
                      en: newGalleryTitle,
                    },
                    category: newGalleryCategory,
                    image: newGalleryImage,
                    studentName: newGalleryStudent || 'Promotion Chef Benzaza',
                  });
                  setNewGalleryTitle('');
                  setNewGalleryStudent('');
                }}
                className="px-4 py-2 bg-[#C9A45C] hover:bg-[#DFC283] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs"
              >
                Ajouter à la galerie
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((g) => (
              <div
                key={g.id}
                className="relative bg-white rounded-xl border border-[#E6DFD3] overflow-hidden group"
              >
                <img
                  src={g.image}
                  alt={g.title.fr}
                  referrerPolicy="no-referrer"
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <strong className="block text-xs font-semibold text-neutral-900 truncate">
                    {g.title.fr}
                  </strong>
                  <span className="text-[10px] text-neutral-500 uppercase">{g.category}</span>
                </div>
                <button
                  onClick={() => deleteGalleryItem(g.id)}
                  className="absolute top-2 right-2 p-1.5 bg-[#2D241E]/70 hover:bg-red-600 text-white rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. CONTACT MESSAGES */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-[#2D241E] font-display">
            Messages & Demandes d'Information
          </h2>

          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-5 rounded-xl border transition-colors ${
                  msg.status === 'unread'
                    ? 'bg-amber-50/50 border-amber-300'
                    : 'bg-white border-[#E6DFD3]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">
                      {msg.subject}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      De : <strong className="text-neutral-800">{msg.fullName}</strong> · Téléphone :{' '}
                      <span className="font-mono text-neutral-800">{msg.phone}</span>
                      {msg.email && ` · Email : ${msg.email}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateMessageStatus(
                          msg.id,
                          msg.status === 'unread' ? 'read' : 'unread'
                        )
                      }
                      className="px-2.5 py-1 text-xs rounded border border-neutral-300 hover:bg-neutral-100"
                    >
                      {msg.status === 'unread' ? 'Marquer comme lu' : 'Marquer non-lu'}
                    </button>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-neutral-200/60 text-xs text-neutral-700 leading-relaxed">
                  "{msg.message}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. SITE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white p-8 rounded-xl border border-[#E6DFD3] space-y-6">
          <div className="flex items-center justify-between border-b border-[#F1ECE1] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#2D241E] font-display">
                Paramètres & Coordonnées de l'École
              </h2>
              <p className="text-xs text-neutral-500">
                Toutes les informations ci-dessous sont modifiables sans toucher au code source.
              </p>
            </div>
            <button
              onClick={() => updateSettings(localSettings)}
              className="px-5 py-2.5 bg-[#C9A45C] hover:bg-[#DFC283] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>{t('saveChanges')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block text-neutral-700 font-semibold mb-1">Nom de l'établissement</label>
              <input
                type="text"
                value={localSettings.schoolName}
                onChange={(e) => setLocalSettings({ ...localSettings, schoolName: e.target.value })}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#E6DFD3] rounded text-neutral-900"
              />
            </div>

            <div>
              <label className="block text-neutral-700 font-semibold mb-1">Adresse à Mostaganem</label>
              <input
                type="text"
                value={localSettings.address}
                onChange={(e) => setLocalSettings({ ...localSettings, address: e.target.value })}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#E6DFD3] rounded text-neutral-900"
              />
            </div>

            <div>
              <label className="block text-neutral-700 font-semibold mb-1">Téléphone Principal</label>
              <input
                type="text"
                value={localSettings.phone}
                onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#E6DFD3] rounded text-neutral-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-neutral-700 font-semibold mb-1">Numéro WhatsApp Officiel</label>
              <input
                type="text"
                value={localSettings.whatsapp}
                onChange={(e) => setLocalSettings({ ...localSettings, whatsapp: e.target.value })}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#E6DFD3] rounded text-neutral-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-neutral-700 font-semibold mb-1">Email de contact</label>
              <input
                type="email"
                value={localSettings.email}
                onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#E6DFD3] rounded text-neutral-900"
              />
            </div>

            <div>
              <label className="block text-neutral-700 font-semibold mb-1">Frais de livraison standard (Mostaganem)</label>
              <input
                type="number"
                value={localSettings.standardDeliveryFee}
                onChange={(e) => setLocalSettings({ ...localSettings, standardDeliveryFee: Number(e.target.value) })}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#E6DFD3] rounded text-neutral-900 font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* 10. SUPABASE DATABASE SETUP GUIDE */}
      {activeTab === 'database' && (
        <div className="bg-white text-[#2D241E] p-8 rounded-2xl border border-[#E8DEC8] shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-[#2D241E]">
                Architecture & Connexion Supabase
              </h2>
              <p className="text-xs text-[#7A6E63]">
                Guide d'intégration et schéma PostgreSQL prêt pour déploiement en production
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] text-xs text-[#5C4F44] space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Système actuel opérationnel avec stockage persistant local</span>
            </div>
            <p>
              Toutes les inscriptions, commandes, réservations salon, produits et messages sont immédiatement fonctionnels et persistés via le moteur d’état local. Pour connecter votre projet cloud <strong>Supabase</strong> externe, suivez les instructions ci-dessous :
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6B28]">
              1. Variables d'environnement requises (.env)
            </h4>
            <pre className="bg-[#FAF7F2] p-4 rounded-xl font-mono text-[11px] text-[#2D241E] overflow-x-auto border border-[#E8DEC8]">
{`VITE_SUPABASE_URL="https://votre-projet.supabase.co"
VITE_SUPABASE_ANON_KEY="votre-anon-key-publique"
SUPABASE_SERVICE_ROLE_KEY="votre-cle-service-secrete"`}
            </pre>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6B28]">
              2. Schéma SQL pour tables & Row Level Security (RLS)
            </h4>
            <pre className="bg-[#FAF7F2] p-4 rounded-xl font-mono text-[11px] text-[#2D241E] overflow-x-auto border border-[#E8DEC8] max-h-60 overflow-y-auto">
{`-- Tables pour ECOLE CHEF BENZAZA
CREATE TABLE courses (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  title JSONB NOT NULL,
  short_desc JSONB NOT NULL,
  full_desc JSONB NOT NULL,
  price_dzd NUMERIC NOT NULL,
  duration JSONB NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE registrations (
  id TEXT PRIMARY KEY,
  registration_code TEXT UNIQUE NOT NULL,
  course_id TEXT REFERENCES courses(id),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  preferred_schedule TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name JSONB NOT NULL,
  price_dzd NUMERIC NOT NULL,
  stock INT DEFAULT 0,
  category TEXT NOT NULL,
  image TEXT NOT NULL
);

CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  order_code TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  total NUMERIC NOT NULL,
  delivery_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE appointments (
  id TEXT PRIMARY KEY,
  booking_code TEXT UNIQUE NOT NULL,
  service_title TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  UNIQUE(appointment_date, time_slot) -- Empeche le double-booking
);`}
            </pre>
          </div>
        </div>
      )}

    </div>
  );
};
