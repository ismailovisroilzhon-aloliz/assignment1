/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, ClinicAnnouncement, MedicalService, Doctor, BookingFormData } from '../types';
import { MercyMedLogo } from './MercyMedLogo';
import { 
  Lock, 
  User, 
  Key, 
  ArrowLeft, 
  Check, 
  Plus, 
  Trash2, 
  Megaphone, 
  DollarSign, 
  UserCheck, 
  Inbox, 
  Server, 
  LogOut, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

interface AdminPageProps {
  currentLang: Language;
  onBackToSite: () => void;
  announcements: ClinicAnnouncement[];
  onUpdateAnnouncements: (announcements: ClinicAnnouncement[]) => void;
  services: MedicalService[];
  onUpdateServices: (services: MedicalService[]) => void;
  doctors: Doctor[];
  onUpdateDoctors: (doctors: Doctor[]) => void;
  receivedBookings: BookingFormData[];
}

export const AdminPage: React.FC<AdminPageProps> = ({
  currentLang,
  onBackToSite,
  announcements,
  onUpdateAnnouncements,
  services,
  onUpdateServices,
  doctors,
  onUpdateDoctors,
  receivedBookings,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('lukas@mercymed.kg');
  const [password, setPassword] = useState('mercymed2026');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'announcements' | 'services' | 'doctors' | 'inbox' | 'server'>('announcements');
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  // Editable local copies
  const [localAnnouncements, setLocalAnnouncements] = useState<ClinicAnnouncement[]>(announcements);
  const [localServices, setLocalServices] = useState<MedicalService[]>(services);
  const [localDoctors, setLocalDoctors] = useState<Doctor[]>(doctors);

  // New announcement inputs
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('Community Update');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setIsAuthenticated(true);
      setLoginError(null);
    } else {
      setLoginError('Please enter username and password.');
    }
  };

  const handleFillDemoCreds = () => {
    setUsername('lukas@mercymed.kg');
    setPassword('mercymed2026');
    setIsAuthenticated(true);
  };

  const handleSaveAll = () => {
    onUpdateAnnouncements(localAnnouncements);
    onUpdateServices(localServices);
    onUpdateDoctors(localDoctors);
    setSaveFeedback('All changes saved to live website!');
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newAnn: ClinicAnnouncement = {
      id: `ann-${Date.now()}`,
      title: newTitle.trim(),
      titleRu: newTitle.trim(),
      titleKy: newTitle.trim(),
      date: 'Current',
      tag: newTag,
      tagRu: newTag,
      tagKy: newTag,
      content: newContent.trim(),
      contentRu: newContent.trim(),
      contentKy: newContent.trim(),
      active: true,
    };

    setLocalAnnouncements([newAnn, ...localAnnouncements]);
    setNewTitle('');
    setNewContent('');
  };

  const handleDeleteAnnouncement = (id: string) => {
    setLocalAnnouncements(localAnnouncements.filter((a) => a.id !== id));
  };

  const handleServicePriceChange = (id: string, newPrice: string) => {
    setLocalServices(
      localServices.map((s) => (s.id === id ? { ...s, priceEstimate: newPrice } : s))
    );
  };

  const handleToggleDoctorDuty = (id: string) => {
    setLocalDoctors(
      localDoctors.map((d) => (d.id === id ? { ...d, isAvailableToday: !d.isAvailableToday } : d))
    );
  };

  // If not logged in, show dedicated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-900 flex flex-col justify-center items-center p-4 selection:bg-amber-500 selection:text-white">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-stone-200">
          
          <div className="flex flex-col items-center text-center mb-8">
            <MercyMedLogo size="lg" showTagline={false} />
            <h1 className="text-xl font-bold text-stone-900 mt-4">
              MercyMed Staff Portal
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Internal clinic management system for Dr. Lukas, reception, and nurses.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Staff Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#EE5A24]"
                  placeholder="e.g. lukas@mercymed.kg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#EE5A24]"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#EE5A24] hover:bg-[#EA3725] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
            >
              Log In to Staff Console
            </button>
          </form>

          {/* Demo Convenience Button */}
          <div className="mt-6 pt-6 border-t border-stone-100 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleFillDemoCreds}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#EE5A24]" />
              <span>One-Click Demo Login (Dr. Lukas / Admin)</span>
            </button>

            <button
              type="button"
              onClick={onBackToSite}
              className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 mt-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Dedicated Full-Page Staff Dashboard
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col text-stone-900">
      
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-stone-900 text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Patient Website</span>
            </button>

            <div className="hidden sm:block h-6 w-px bg-stone-700" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                MM
              </div>
              <div>
                <h1 className="text-sm font-bold leading-tight">MercyMed Staff Portal</h1>
                <span className="text-[11px] text-stone-400">Logged in as {username} (Admin)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveAll}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EE5A24] hover:bg-[#EA3725] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Apply Changes</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              title="Log out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Save Feedback Alert */}
      {saveFeedback && (
        <div className="bg-emerald-600 text-white py-2 px-4 text-center text-xs font-bold animate-in fade-in">
          {saveFeedback}
        </div>
      )}

      {/* Main Admin Console Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 bg-white p-1.5 rounded-2xl border border-stone-200 overflow-x-auto shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'announcements'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>Community Announcements ({localAnnouncements.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'services'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Service Fees & Price List</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('doctors')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'doctors'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Doctor Duty & Availability</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'inbox'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Session Inquiries ({receivedBookings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('server')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'server'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>OpenEMR Server Info</span>
          </button>
        </div>

        {/* TAB 1: Announcements */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <form onSubmit={handleAddAnnouncement} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-stone-900">
                Post New Clinic Notice or Community Update
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Notice Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Neighborhood Day: Reduced Fees for Tunguch Residents"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#EE5A24]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Tag / Category</label>
                  <input
                    type="text"
                    placeholder="e.g., Community Outreach"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#EE5A24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">Details & Message</label>
                <textarea
                  rows={3}
                  placeholder="Explain the update, dates, or clinic instructions..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#EE5A24]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-[#EE5A24] transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Notice</span>
              </button>
            </form>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                Active Notices:
              </h3>
              {localAnnouncements.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-xs text-stone-500">
                  No active announcements currently posted.
                </div>
              ) : (
                localAnnouncements.map((ann) => (
                  <div key={ann.id} className="p-5 rounded-2xl border border-stone-200 bg-white flex items-start justify-between gap-4 shadow-2xs">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold text-[#EE5A24] bg-orange-50 px-2 py-0.5 rounded-md">
                          {ann.tag}
                        </span>
                        <span className="text-xs font-semibold text-stone-400">{ann.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-stone-900">{ann.title}</h4>
                      <p className="text-xs text-stone-600 mt-1">{ann.content}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteAnnouncement(ann.id)}
                      className="p-2 text-stone-400 hover:text-red-600 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
                      title="Remove announcement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Services & Pricing */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900">
              Live Price List Adjustments (Прайс-лист)
            </h3>
            <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden">
              {localServices.map((service) => (
                <div key={service.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{service.title}</h4>
                    <span className="text-[11px] text-stone-500">{service.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-stone-500">Fee:</span>
                    <input
                      type="text"
                      value={service.priceEstimate}
                      onChange={(e) => handleServicePriceChange(service.id, e.target.value)}
                      className="w-48 px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg font-mono focus:outline-hidden focus:ring-1 focus:ring-[#EE5A24]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Doctors Availability */}
        {activeTab === 'doctors' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900">
              Doctor Roster & Duty Status
            </h3>
            <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden">
              {localDoctors.map((doc) => (
                <div key={doc.id} className="p-4 flex items-center justify-between gap-4 hover:bg-stone-50">
                  <div className="flex items-center gap-3">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-cover border border-stone-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">{doc.name}</h4>
                      <span className="text-[11px] text-stone-500">{doc.title}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleDoctorDuty(doc.id)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      doc.isAvailableToday
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {doc.isAvailableToday ? '● In Clinic Today' : 'Off Today'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Inquiries Inbox */}
        {activeTab === 'inbox' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900">
              Simulated WhatsApp Appointment Inquiries
            </h3>
            {receivedBookings.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-xl border border-dashed border-stone-300 text-xs text-stone-500">
                No patient requests recorded during this browser session yet. Submit a test via the patient website to see it logged here.
              </div>
            ) : (
              <div className="space-y-3">
                {receivedBookings.map((b, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-stone-900 text-sm">{b.fullName}</strong>
                      <span className="text-stone-600 font-mono font-bold">{b.phone}</span>
                    </div>
                    <div className="text-stone-600">
                      Date of Birth: {b.dateOfBirth || 'N/A'} · Preferred Date: {b.preferredDate || 'Earliest'} ({b.preferredTime})
                    </div>
                    {b.notes && <div className="text-stone-500 italic bg-white p-2 rounded-lg border border-stone-200/60 mt-1">Note: {b.notes}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: Technical & OpenEMR Server Info (From Slide 17) */}
        {activeTab === 'server' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-6">
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Clinic Infrastructure & OpenEMR Server Context
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Data provided by Dr. Lukas & MercyMed IT technical team (Slide 17).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-stone-700 block">Clinic Domain</span>
                <span className="font-mono text-stone-900">mercymed.kg</span>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-stone-700 block">Server Hosting Location</span>
                <span className="font-mono text-stone-900">Rented server in Germany (Patient Data Security)</span>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-stone-700 block">EMR Software Stack</span>
                <span className="font-mono text-stone-900">Apache, PHP, MySQL for OpenEMR</span>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-stone-700 block">DNS & Mail Protocol</span>
                <span className="font-mono text-stone-900">Hurricane's Free DNS · Postfix (SMTP) & Dovecot (IMAP)</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
