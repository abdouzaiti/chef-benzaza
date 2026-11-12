import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course, CourseCategory } from '../types';
import {
  Clock,
  Coins,
  Calendar,
  CheckCircle2,
  User,
  GraduationCap,
  ArrowRight,
  Search,
  Filter,
  X,
} from 'lucide-react';

interface CoursesViewProps {
  onOpenRegistration: (courseId?: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ onOpenRegistration }) => {
  const { courses, t, language, isRtl } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const categories = [
    { id: 'all', label: t('all') },
    { id: 'pastry', label: t('courseCategory_pastry') },
    { id: 'pizza', label: t('courseCategory_pizza') },
    { id: 'culinary', label: t('courseCategory_culinary') },
    { id: 'barber', label: t('courseCategory_barber') },
    { id: 'hairdressing', label: t('courseCategory_hairdressing') },
    { id: 'it', label: t('courseCategory_it') },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const titleText = (course.title[language] || course.title.fr).toLowerCase();
    const descText = (course.shortDesc[language] || course.shortDesc.fr).toLowerCase();
    const matchesSearch =
      titleText.includes(searchQuery.toLowerCase()) || descText.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C]">
          Cursus Professionnels Certifiants
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] font-display text-balance">
          {t('featuredCoursesTitle')}
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          {t('featuredCoursesSubtitle')}. Formations 90% pratiques en laboratoire dispensées par des maîtres artisans à Oran.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E6DFD3] shadow-xs">
        
        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#171717] text-[#C9A45C] shadow-sm'
                  : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 text-xs bg-[#F8F5EF] border border-[#E2DBD0] rounded-md focus:outline-none focus:border-[#C9A45C]"
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-[#E6DFD3]">
          <GraduationCap className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
          <h3 className="text-base font-bold text-neutral-800">Aucune formation trouvée</h3>
          <p className="text-xs text-neutral-500 mt-1">Essayez de modifier vos filtres ou termes de recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-[#E6DFD3] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
            >
              <div className="relative h-60 overflow-hidden bg-neutral-200">
                <img
                  src={course.image}
                  alt={course.title[language] || course.title.fr}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-[#171717]/90 text-[#C9A45C] text-xs font-mono font-bold px-3 py-1 rounded backdrop-blur-xs">
                  {course.priceDZD} {t('dzd')}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>{course.duration[language] || course.duration.fr}</span>
                  </div>

                  <h2 className="text-lg font-bold text-[#171717] font-display group-hover:text-[#8C6B28] transition-colors leading-snug">
                    {course.title[language] || course.title.fr}
                  </h2>

                  <p className="text-xs text-neutral-600 line-clamp-3 mt-2 leading-relaxed">
                    {course.shortDesc[language] || course.shortDesc.fr}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#F1ECE1] space-y-1.5">
                    <div className="text-[11px] text-neutral-500 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span>{course.instructor.name}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F1ECE1] flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="text-xs font-semibold text-neutral-700 hover:text-black transition-colors"
                  >
                    {t('viewDetails')}
                  </button>

                  <button
                    onClick={() => onOpenRegistration(course.id)}
                    className="px-4 py-2 bg-[#171717] hover:bg-[#C9A45C] hover:text-[#171717] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap"
                  >
                    {t('registerShort')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detailed Course Syllabus Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-[#1A1A1A] text-white w-full max-w-3xl rounded-xl border border-[#2e2e2e] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="relative h-64 overflow-hidden shrink-0">
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title[language] || selectedCourse.title.fr}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent" />
              
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 bg-black/60 text-white rounded-full hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] block mb-1">
                  Cursus Certifiant — Oran
                </span>
                <h3 className="text-2xl font-bold font-display text-white">
                  {selectedCourse.title[language] || selectedCourse.title.fr}
                </h3>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Key metadata grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-[#242424] rounded-lg border border-[#333]">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block">{t('courseDuration')}</span>
                  <strong className="text-xs text-white block mt-0.5">
                    {selectedCourse.duration[language] || selectedCourse.duration.fr}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block">{t('coursePrice')}</span>
                  <strong className="text-xs text-[#C9A45C] font-mono block mt-0.5">
                    {selectedCourse.priceDZD} {t('dzd')}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block">{t('courseInstructor')}</span>
                  <strong className="text-xs text-white block mt-0.5">
                    {selectedCourse.instructor.name}
                  </strong>
                </div>
              </div>

              {/* Full Description */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-display">
                  Présentation de la formation
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {selectedCourse.fullDesc[language] || selectedCourse.fullDesc.fr}
                </p>
              </div>

              {/* Objectives */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 font-display">
                  {t('courseObjectives')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(selectedCourse.objectives[language] || selectedCourse.objectives.fr).map((obj, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum Modules */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 font-display">
                  {t('courseProgram')}
                </h4>
                <div className="space-y-3">
                  {selectedCourse.modules.map((mod, i) => (
                    <div key={i} className="bg-[#222] p-3.5 rounded border border-[#333]">
                      <h5 className="text-xs font-bold text-[#C9A45C]">
                        {mod.title[language] || mod.title.fr}
                      </h5>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        {mod.content[language] || mod.content.fr}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedules */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-display">
                  {t('courseSchedules')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedCourse.schedules[language] || selectedCourse.schedules.fr).map((sch, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#252525] border border-[#383838] rounded text-xs text-neutral-300"
                    >
                      {sch}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 bg-[#141414] border-t border-[#2e2e2e] flex items-center justify-between gap-4 shrink-0">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block">Tarif de la session</span>
                <span className="text-base font-bold font-mono text-[#C9A45C] tabular-nums">
                  {selectedCourse.priceDZD} {t('dzd')}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#333] text-white text-xs font-semibold rounded"
                >
                  {t('close')}
                </button>
                <button
                  onClick={() => {
                    const id = selectedCourse.id;
                    setSelectedCourse(null);
                    onOpenRegistration(id);
                  }}
                  className="px-5 py-2 bg-[#C9A45C] hover:bg-[#DFC283] text-[#171717] text-xs font-bold uppercase tracking-wider rounded transition-colors"
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
