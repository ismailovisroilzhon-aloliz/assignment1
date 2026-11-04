/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, ClinicAnnouncement, MedicalService, Doctor, BookingFormData } from './types';
import { TRANSLATIONS } from './data/translations';
import { DOCTORS } from './data/doctors';
import { MEDICAL_SERVICES, CLINIC_ANNOUNCEMENTS } from './data/services';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SymptomTriageNavigator } from './components/SymptomTriageNavigator';
import { TeamSection } from './components/TeamSection';
import { InstagramFeedPreview } from './components/InstagramFeedPreview';
import { ContactSection } from './components/ContactSection';
import { ServicesPage } from './components/ServicesPage';
import { AdminPage } from './components/AdminPage';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MessageSquare } from 'lucide-react';

export default function App() {
  // Navigation Page View: 'welcome' | 'services' | 'admin'
  // Default to 'welcome' so reloads and scrolls never bounce to services unexpectedly
  const [currentPage, setCurrentPage] = useState<'welcome' | 'services' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#/admin') return 'admin';
    }
    return 'welcome';
  });

  // On initial mount, clear any stale #/services hash from previous browser session
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#/services') {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch {
        window.location.hash = '';
      }
    }
  }, []);

  // Listen to hash changes for deep links (e.g. #/admin) or browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/admin') {
        setCurrentPage('admin');
      } else if (hash === '#/services') {
        setCurrentPage('services');
      } else if (hash === '' || hash === '#' || hash === '#/') {
        setCurrentPage('welcome');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'welcome' | 'services' | 'admin') => {
    setCurrentPage(page);
    try {
      if (page === 'admin') {
        window.history.pushState(null, '', '#/admin');
      } else if (page === 'services') {
        window.history.pushState(null, '', '#/services');
      } else {
        window.history.pushState(null, '', window.location.pathname);
      }
    } catch {
      if (page === 'admin') window.location.hash = '#/admin';
      else if (page === 'services') window.location.hash = '#/services';
      else window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Multilingual state (EN, RU, KY)
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('mercymed_lang');
    return (saved === 'ru' || saved === 'ky' || saved === 'en') ? saved : 'en';
  });

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('mercymed_lang', lang);
  };

  const t = TRANSLATIONS[currentLang];

  // Booking Modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>(undefined);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  // Dynamic content states
  const [announcements, setAnnouncements] = useState<ClinicAnnouncement[]>(CLINIC_ANNOUNCEMENTS);
  const [services, setServices] = useState<MedicalService[]>(MEDICAL_SERVICES);
  const [doctors, setDoctors] = useState<Doctor[]>(DOCTORS);
  const [receivedBookings, setReceivedBookings] = useState<BookingFormData[]>([]);

  // Floating WhatsApp button position: on right side, stops right above the footer without animations
  const [buttonBottomOffset, setButtonBottomOffset] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When footer enters viewport, clamp button position strictly above it (no animated sliding)
      if (footerRect.top < windowHeight) {
        const footerVisibleDistance = windowHeight - footerRect.top;
        setButtonBottomOffset(footerVisibleDistance + 24);
      } else {
        setButtonBottomOffset(24);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentPage]);

  const handleOpenBooking = (doctorId?: string, serviceId?: string) => {
    setSelectedDoctorId(doctorId);
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleBookingSubmitted = (booking: BookingFormData) => {
    setReceivedBookings((prev) => [booking, ...prev]);
  };

  // 1. DEDICATED ADMIN PAGE (Staff credentials portal)
  if (currentPage === 'admin') {
    return (
      <AdminPage
        currentLang={currentLang}
        onBackToSite={() => navigateTo('welcome')}
        announcements={announcements}
        onUpdateAnnouncements={setAnnouncements}
        services={services}
        onUpdateServices={setServices}
        doctors={doctors}
        onUpdateDoctors={setDoctors}
        receivedBookings={receivedBookings}
      />
    );
  }

  // 2. DEDICATED SERVICES & MEDICAL CENTER GUIDE PAGE
  if (currentPage === 'services') {
    return (
      <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-500 selection:text-white">
        <Header
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onOpenBooking={handleOpenBooking}
          onOpenAdmin={() => navigateTo('admin')}
          onNavigatePage={navigateTo}
          currentPage="services"
        />

        <main className="flex-1">
          <ServicesPage
            currentLang={currentLang}
            onBackToWelcome={() => navigateTo('welcome')}
            onOpenBooking={handleOpenBooking}
            services={services}
          />
        </main>

        <Footer
          currentLang={currentLang}
          onOpenBooking={() => handleOpenBooking()}
          onOpenAdmin={() => navigateTo('admin')}
          onNavigatePage={navigateTo}
        />

        {/* Floating WhatsApp Booking Button on right side, stops at footer without animation */}
        <div 
          className="fixed right-6 z-30 pointer-events-auto"
          style={{ bottom: `${buttonBottomOffset}px` }}
        >
          <button
            type="button"
            onClick={() => handleOpenBooking()}
            className="flex items-center gap-2.5 px-4 py-3 bg-[#EE5A24] hover:bg-[#EA3725] text-white rounded-full shadow-lg hover:shadow-xl transition-transform active:scale-95 group focus:outline-hidden focus:ring-4 focus:ring-orange-300 cursor-pointer"
            aria-label="Book appointment via WhatsApp"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 fill-white" />
            </div>
            <span className="font-bold text-xs sm:text-sm tracking-tight pr-1">
              {t.nav.bookCta}
            </span>
          </button>
        </div>

        {/* WhatsApp Booking Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          currentLang={currentLang}
          initialDoctorId={selectedDoctorId}
          initialServiceId={selectedServiceId}
          onBookingSubmitted={handleBookingSubmitted}
        />
      </div>
    );
  }

  // 3. CLEAN WELCOME PAGE (As explicitly requested by user)
  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-stone-900 selection:bg-amber-500 selection:text-white">
      
      {/* Top Navigation Bar */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenBooking={handleOpenBooking}
        onOpenAdmin={() => navigateTo('admin')}
        onNavigatePage={navigateTo}
        currentPage="welcome"
      />

      {/* Main Clean Welcome Page Flow (CSS Selector 2: matched to section background) */}
      <main className="flex-1 bg-stone-100">
        {/* 1. Hero with 3-image cycling loop & noticeable button to services page */}
        <Hero
          currentLang={currentLang}
          onOpenBooking={() => handleOpenBooking()}
          onNavigateToServices={() => navigateTo('services')}
        />

        {/* 2. "What brings you to the clinic today?" Symptom Triage Navigator */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-20">
          <SymptomTriageNavigator
            currentLang={currentLang}
            onOpenBooking={handleOpenBooking}
          />
        </section>

        {/* 3. "Our Physicians & Staff" */}
        <TeamSection
          currentLang={currentLang}
          doctorsList={doctors}
          onBookWithDoctor={(doctorId) => handleOpenBooking(doctorId, undefined)}
        />

        {/* 4. "Community & Patient Education" */}
        <InstagramFeedPreview currentLang={currentLang} />

        {/* 5. "Visit MercyMed" */}
        <ContactSection
          currentLang={currentLang}
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* Footer with matched seamless logo & streamlined concise text */}
      <Footer
        currentLang={currentLang}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => navigateTo('admin')}
        onNavigatePage={navigateTo}
      />

      {/* Persistent Floating WhatsApp Booking Button on right side, stops at footer without animation */}
      <div 
        className="fixed right-6 z-30 pointer-events-auto"
        style={{ bottom: `${buttonBottomOffset}px` }}
      >
        <button
          type="button"
          onClick={() => handleOpenBooking()}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#EE5A24] hover:bg-[#EA3725] text-white rounded-full shadow-lg hover:shadow-xl transition-transform active:scale-95 group focus:outline-hidden focus:ring-4 focus:ring-orange-300 cursor-pointer"
          aria-label="Book appointment via WhatsApp"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 fill-white" />
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-tight pr-1">
            {t.nav.bookCta}
          </span>
        </button>
      </div>

      {/* WhatsApp Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        currentLang={currentLang}
        initialDoctorId={selectedDoctorId}
        initialServiceId={selectedServiceId}
        onBookingSubmitted={handleBookingSubmitted}
      />

    </div>
  );
}
