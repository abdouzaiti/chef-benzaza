/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { RegistrationModal } from './components/RegistrationModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SalonBookingModal } from './components/SalonBookingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ToastContainer } from './components/ToastContainer';
import { IntroSplash } from './components/IntroSplash';

import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { CoursesView } from './views/CoursesView';
import { StoreView } from './views/StoreView';
import { SalonView } from './views/SalonView';
import { GalleryView } from './views/GalleryView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

const MainLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [isHeaderLogoHidden, setIsHeaderLogoHidden] = useState<boolean>(true);

  // Modals
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [selectedCourseForReg, setSelectedCourseForReg] = useState<string | undefined>(undefined);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>(undefined);

  const handleOpenRegistration = (courseId?: string) => {
    setSelectedCourseForReg(courseId);
    setIsRegModalOpen(true);
  };

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceForBooking(serviceId);
    setIsBookingModalOpen(true);
  };

  const handleSplashFlightStart = () => {
    // Keep header logo hidden during logo's flight animation
    setIsHeaderLogoHidden(true);
  };

  const handleSplashComplete = () => {
    // Reveal static header logo in navbar & unmount splash screen
    setIsHeaderLogoHidden(false);
    setShowSplash(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D241E]">
      {/* Intro Splash Overlay with smooth logo flight to top-left header */}
      {showSplash && (
        <IntroSplash
          onStartFlight={handleSplashFlightStart}
          onComplete={handleSplashComplete}
        />
      )}

      {/* Navbar with 3-zone contract */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenRegistration={() => handleOpenRegistration()}
        isLogoHidden={isHeaderLogoHidden}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={setCurrentView}
            onOpenRegistration={handleOpenRegistration}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onNavigate={setCurrentView}
            onOpenRegistration={() => handleOpenRegistration()}
          />
        )}

        {currentView === 'courses' && (
          <CoursesView
            onOpenRegistration={handleOpenRegistration}
          />
        )}

        {currentView === 'store' && <StoreView />}

        {currentView === 'salon' && (
          <SalonView onOpenBooking={handleOpenBooking} />
        )}

        {currentView === 'gallery' && <GalleryView />}

        {currentView === 'contact' && <ContactView />}

        {currentView === 'admin' && <AdminView />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setCurrentView}
        onOpenRegistration={() => handleOpenRegistration()}
      />

      {/* Cart Drawer */}
      <CartDrawer onOpenCheckout={() => setIsCheckoutModalOpen(true)} />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegModalOpen}
        onClose={() => setIsRegModalOpen(false)}
        preselectedCourseId={selectedCourseForReg}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />

      {/* Salon Booking Modal */}
      <SalonBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedServiceId={selectedServiceForBooking}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Toast Notification Stack */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
