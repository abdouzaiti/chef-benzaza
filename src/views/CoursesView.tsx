import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import {
  Clock,
  User,
  GraduationCap,
  ArrowRight,
  Search,
  X,
  CheckCircle2,
  Sparkles,
  Award,
} from 'lucide-react';

interface CoursesViewProps {
  onOpenRegistration: (courseId?: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ onOpenRegistration }) => {
  const { courses, t, language, isRtl } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeCourseId, setActiveCourseId] = useState<string>('');

  const sidebarRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: t('all') },
    { id: 'pastry', label: t('courseCategory_pastry') },
    { id: 'pizza', label: t('courseCategory_pizza') },
    { id: 'culinary', label: t('courseCategory_culinary') },
    { id: 'barber', label: t('courseCategory_barber') },
    { id: 'hairdressing', label: t('courseCategory_hairdressing') },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const titleText = (course.title[language] || course.title.fr).toLowerCase();
    const descText = (course.shortDesc[language] || course.shortDesc.fr).toLowerCase();
    const instructorText = (course.instructor.name || '').toLowerCase();
    const matchesSearch =
      titleText.includes(searchQuery.toLowerCase()) ||
      descText.includes(searchQuery.toLowerCase()) ||
      instructorText.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Set default active course ID when filtered list changes
  useEffect(() => {
    if (filteredCourses.length > 0 && !activeCourseId) {
      setActiveCourseId(filteredCourses[0].id);
    }
  }, [filteredCourses, activeCourseId]);

  // Scrollspy via IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -55% 0px',
      threshold: 0.1,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-course-id');
          if (id) {
            setActiveCourseId(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const cards = document.querySelectorAll('[data-course-id]');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredCourses]);

  // Ensure active sidebar item scrolls smoothly inside sidebar view
  useEffect(() => {
    if (!activeCourseId || !sidebarRef.current) return;
    const activeBtn = sidebarRef.current.querySelector(`#path-item-${activeCourseId}`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeCourseId]);

  const handleSelectCoursePath = (id: string) => {
    setActiveCourseId(id);
    const targetEl = document.getElementById(`course-card-${id}`);
    if (targetEl) {
      const yOffset = -90;
      const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
      
      {/* 1. SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold text-[#2D241E] font-display text-balance">
          {t('featuredCoursesTitle')}
        </h1>
      </div>

      {/* 2. CATEGORY FILTERS & SEARCH BAR */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E8DEC8] shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#C9A45C] text-white shadow-xs'
                  : 'text-[#6B5E52] hover:text-[#8C6B28] hover:bg-[#FAF7F2]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-[#8C6B28] absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher formation ou formateur..."
            className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 text-xs bg-[#FAF7F2] border border-[#E8DEC8] text-[#2D241E] rounded-md focus:outline-none focus:border-[#C9A45C]"
          />
        </div>
      </div>

      {/* 4. SPLIT LAYOUT: LEFT STICKY FORMATION LIST & RIGHT CARD DETAILS — VISIBLE ON ALL SCREEN SIZES */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-[#E8DEC8]">
          <GraduationCap className="w-12 h-12 mx-auto text-[#C9A45C] opacity-60 mb-3" />
          <h3 className="text-base font-bold text-[#2D241E]">Aucune formation trouvée</h3>
          <p className="text-xs text-[#6B5E52] mt-1">Essayez de modifier vos filtres ou termes de recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-2 sm:gap-6 lg:gap-8 items-start">
          
          {/* LEFT SIDEBAR: Simple Rectangular Formation & Formateur Path List (Visible on ALL Screen Sizes) */}
          <div className="col-span-4 sm:col-span-4 lg:col-span-4 sticky top-16 sm:top-24 self-start">
            <div className="bg-white border border-[#E8DEC8] flex flex-col shadow-xs overflow-hidden">
              
              {/* Sidebar Header */}
              <div className="p-2 sm:p-4 bg-[#FAF7F2] border-b border-[#E8DEC8]">
                <h3 className="text-[11px] sm:text-sm font-bold text-[#2D241E] font-display uppercase tracking-wider">
                  Nos Formations
                </h3>
              </div>

              {/* Scrollable Path List */}
              <div
                ref={sidebarRef}
                className="max-h-[calc(100vh-120px)] sm:max-h-[calc(100vh-180px)] overflow-y-auto divide-y divide-[#E8DEC8]"
              >
                {filteredCourses.map((course) => {
                  const isActive = activeCourseId === course.id;
                  return (
                    <button
                      key={`path-item-${course.id}`}
                      id={`path-item-${course.id}`}
                      onClick={() => handleSelectCoursePath(course.id)}
                      className={`w-full text-left rtl:text-right p-2 sm:p-4 transition-colors flex flex-col ${
                        isActive
                          ? 'bg-[#FAF4E6] border-l-2 sm:border-l-4 rtl:border-l-0 rtl:border-r-2 sm:rtl:border-r-4 border-l-[#8C6B28] rtl:border-r-[#8C6B28] text-[#2D241E]'
                          : 'bg-white hover:bg-[#FAF7F2] text-[#2D241E]'
                      }`}
                    >
                      {/* BIG BOLD FORMATION TITLE */}
                      <span className={`text-[11px] sm:text-base font-bold font-display leading-tight line-clamp-2 break-words ${
                        isActive ? 'text-[#8C6B28]' : 'text-[#2D241E]'
                      }`}>
                        {course.title[language] || course.title.fr}
                      </span>

                      {/* FORMATEUR NAME DOWNSIDE THE FORMATION NAME */}
                      <span className="text-[10px] sm:text-xs font-semibold text-[#8C6B28] mt-1 block truncate w-full">
                        {course.instructor.name}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Full Detailed Formation Cards (Visible on ALL Screen Sizes) */}
          <div className="col-span-8 sm:col-span-8 lg:col-span-8 space-y-4 sm:space-y-10 min-w-0">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                id={`course-card-${course.id}`}
                data-course-id={course.id}
                className={`bg-white rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
                  activeCourseId === course.id ? 'border-[#C9A45C] ring-2 ring-[#C9A45C]/20' : 'border-[#E8DEC8]'
                }`}
              >
                {/* Card Banner Photo */}
                <div className="relative w-full aspect-[9/10] overflow-hidden bg-[#FAF7F2] flex items-center justify-center">
                  <img
                    src={course.image}
                    alt={course.title[language] || course.title.fr}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-full object-contain object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/80 via-transparent to-transparent opacity-80 pointer-events-none" />
                  
                  {/* Price Tag Badge */}
                  <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 rtl:right-auto rtl:left-2.5 sm:rtl:left-4 bg-white/95 backdrop-blur-md text-[#8C6B28] text-[10px] sm:text-xs font-mono font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg border border-[#EADFC7] shadow-md">
                    {course.priceDZD} {t('dzd')}
                  </div>

                  {/* Formateur Badge over Banner */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                    <div className="min-w-0">
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#DFC283] block">
                        Formation dirigée par
                      </span>
                      <h4 className="text-xs sm:text-base font-bold text-white font-display flex items-center gap-1 sm:gap-1.5 truncate">
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A45C] shrink-0" />
                        <span className="truncate">{course.instructor.name}</span>
                      </h4>
                    </div>

                    <div className="self-start sm:self-auto bg-black/30 backdrop-blur-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs text-white/90 font-medium flex items-center gap-1 sm:gap-1.5 border border-white/20 max-w-full">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C9A45C] shrink-0" />
                      <span className="truncate">{course.duration[language] || course.duration.fr}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3.5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                  
                  {/* Title & Short Description */}
                  <div>
                    <h2 className="text-base sm:text-2xl font-bold text-[#2D241E] font-display leading-tight">
                      {course.title[language] || course.title.fr}
                    </h2>
                    <p className="text-[11px] sm:text-sm text-[#6B5E52] mt-1.5 sm:mt-2 leading-relaxed">
                      {course.fullDesc[language] || course.fullDesc.fr}
                    </p>
                  </div>

                  {/* Objectives Highlights */}
                  <div className="bg-[#FAF7F2] p-3 sm:p-4 rounded-xl border border-[#E8DEC8] space-y-2">
                    <h4 className="text-[11px] sm:text-xs font-bold text-[#2D241E] uppercase tracking-wider font-display flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A45C] shrink-0" />
                      <span>Compétences clés acquises</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 pt-1">
                      {(course.objectives[language] || course.objectives.fr).map((obj, i) => (
                        <div key={i} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#6B5E52]">
                          <span className="text-[#C9A45C] font-bold">•</span>
                          <span>{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-3 sm:pt-4 border-t border-[#F1ECE1] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-white hover:bg-[#FAF7F2] text-[#8C6B28] border border-[#C9A45C] text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <span>{t('viewDetails')}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                    </button>

                    <button
                      onClick={() => onOpenRegistration(course.id)}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-[#C9A45C] hover:bg-[#DFC283] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-md shadow-[#C9A45C]/20 text-center"
                    >
                      {t('registerNow')} — {course.priceDZD} {t('dzd')}
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 5. DETAILED SYLLABUS MODAL */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2D241E]/40 backdrop-blur-xs flex items-start sm:items-center justify-center p-2 sm:p-4">
          <div className="relative bg-white text-[#2D241E] w-full max-w-3xl rounded-2xl border border-[#E8DEC8] shadow-2xl overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="relative w-full aspect-[9/10] max-h-[45vh] sm:max-h-[55vh] bg-[#FAF7F2] flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title[language] || selectedCourse.title.fr}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-full object-contain object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none" />
              
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 rtl:right-auto rtl:left-3 sm:rtl:left-4 p-2 bg-white/90 text-[#2D241E] rounded-full hover:bg-white shadow-md transition-colors border border-[#E8DEC8]"
              >
                <X className="w-5 h-5 text-[#8C6B28]" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8C6B28] block mb-1">
                  Programme de Formation Certifiante — Mostaganem
                </span>
                <h3 className="text-lg sm:text-2xl font-bold font-display text-[#2D241E]">
                  {selectedCourse.title[language] || selectedCourse.title.fr}
                </h3>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6">
              
              {/* Key Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-3.5 sm:p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                <div>
                  <span className="text-[10px] uppercase text-[#7A6E63] block">{t('courseDuration')}</span>
                  <strong className="text-xs text-[#2D241E] block mt-0.5">
                    {selectedCourse.duration[language] || selectedCourse.duration.fr}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#7A6E63] block">{t('coursePrice')}</span>
                  <strong className="text-xs text-[#8C6B28] font-mono block mt-0.5 font-bold">
                    {selectedCourse.priceDZD} {t('dzd')}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#7A6E63] block">{t('courseInstructor')}</span>
                  <strong className="text-xs text-[#2D241E] block mt-0.5">
                    {selectedCourse.instructor.name}
                  </strong>
                </div>
              </div>

              {/* Full Description */}
              <div>
                <h4 className="text-sm font-bold text-[#2D241E] uppercase tracking-wider mb-2 font-display">
                  Présentation de la formation
                </h4>
                <p className="text-xs text-[#6B5E52] leading-relaxed">
                  {selectedCourse.fullDesc[language] || selectedCourse.fullDesc.fr}
                </p>
              </div>

              {/* Objectives */}
              <div>
                <h4 className="text-sm font-bold text-[#2D241E] uppercase tracking-wider mb-3 font-display">
                  {t('courseObjectives')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(selectedCourse.objectives[language] || selectedCourse.objectives.fr).map((obj, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#6B5E52]">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedules */}
              <div>
                <h4 className="text-sm font-bold text-[#2D241E] uppercase tracking-wider mb-2 font-display">
                  {t('courseSchedules')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedCourse.schedules[language] || selectedCourse.schedules.fr).map((sch, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#FAF7F2] border border-[#E8DEC8] rounded-md text-xs text-[#6B5E52] font-medium"
                    >
                      {sch}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 bg-[#FAF7F2] border-t border-[#E8DEC8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 shrink-0">
              <div>
                <span className="text-[10px] uppercase text-[#7A6E63] block">Tarif de la session</span>
                <span className="text-base font-bold font-mono text-[#8C6B28] tabular-nums">
                  {selectedCourse.priceDZD} {t('dzd')}
                </span>
              </div>

              <div className="flex gap-2.5 sm:gap-3">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 sm:flex-none px-4 py-2.5 sm:py-2 bg-white hover:bg-[#F5EEDB] text-[#6B5E52] border border-[#E8DEC8] text-xs font-semibold rounded-lg shadow-xs text-center"
                >
                  {t('close')}
                </button>
                <button
                  onClick={() => {
                    const id = selectedCourse.id;
                    setSelectedCourse(null);
                    onOpenRegistration(id);
                  }}
                  className="flex-1 sm:flex-none px-5 py-2.5 sm:py-2 bg-[#C9A45C] hover:bg-[#DFC283] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs text-center"
                >
                  {t('registerNow')}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

