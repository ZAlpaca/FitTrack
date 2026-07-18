/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserProfile, Device, PersonalRecord } from '../types';

interface ProfileTabProps {
  user: UserProfile;
  devices: Device[];
  onToggleDevice: (id: string) => void;
  personalRecords: PersonalRecord[];
  onAddRecord: (newRecord: PersonalRecord) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  user,
  devices,
  onToggleDevice,
  personalRecords,
  onAddRecord,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [newRecordLabel, setNewRecordLabel] = useState('');
  const [newRecordValue, setNewRecordValue] = useState('');

  const handleAddRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecordLabel || !newRecordValue) return;

    const newRec: PersonalRecord = {
      id: `rec-${Date.now()}`,
      label: newRecordLabel.toUpperCase(),
      value: newRecordValue,
      icon: newRecordLabel.toLowerCase().includes('run') || newRecordLabel.toLowerCase().includes('speed') ? 'workspace_premium' : 'fitness_center',
    };

    onAddRecord(newRec);
    setNewRecordLabel('');
    setNewRecordValue('');
    setShowRecordModal(false);
  };

  return (
    <div className="pb-32 pt-20 px-5 max-w-lg mx-auto text-[#e2e2e2]">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-xl flex justify-between items-center px-5 py-3 border-b border-white/5">
        <h1 className="text-lg font-bold text-white tracking-tight">Athlete Profile</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white active:scale-95 transition-transform">
          <span className="material-symbols-outlined">calendar_today</span>
        </button>
      </header>

      {/* Profile Header Section */}
      <section className="flex flex-col items-center mt-6 mb-6">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full border-2 border-brand-volt p-1 volt-glow animate-pulse">
            <img
              className="w-full h-full rounded-full object-cover"
              src={user.avatarUrl}
              alt="Alex Thorne close-up portrait"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-brand-volt text-black p-0.5 rounded-full border-2 border-black">
            <span className="material-symbols-outlined text-[16px] block material-symbols-fill">
              verified
            </span>
          </div>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">{user.name}</h2>
        <p className="text-xs text-white/50 mt-1">
          {user.role} • {user.location}
        </p>
      </section>

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">
            TOTAL WORKOUTS
          </span>
          <span className="text-xl font-black text-brand-volt">{user.totalWorkouts}</span>
        </div>
        <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">
            CURRENT STREAK
          </span>
          <span className="text-xl font-black text-brand-volt">{user.currentStreak} Days</span>
        </div>
      </div>

      {/* Personal Records Section (Bento Style) */}
      <section className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Personal Records</h3>
          <button
            onClick={() => setShowRecordModal(true)}
            className="text-xs font-bold text-brand-volt hover:underline cursor-pointer"
          >
            + ADD NEW
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar -mx-5 px-5">
          {personalRecords.map((record) => (
            <div
              key={record.id}
              className="min-w-[140px] glass-card rounded-2xl p-5 flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              <div className="w-14 h-14 mb-3 flex items-center justify-center bg-brand-volt/10 rounded-full border border-brand-volt/20">
                <span className="material-symbols-outlined text-brand-volt text-3xl material-symbols-fill">
                  {record.icon}
                </span>
              </div>
              <span className="text-[9px] font-bold text-brand-volt mb-1 uppercase tracking-wider block">
                {record.label}
              </span>
              <span className="text-sm font-black text-white">{record.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Linked Devices Section */}
      <section className="mb-8">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Linked Devices</h3>
        <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {devices.map((device, index) => {
            const isConnected = device.status === 'Synced';
            return (
              <div
                key={device.id}
                onClick={() => onToggleDevice(device.id)}
                className={`flex items-center justify-between p-4 cursor-pointer active:bg-white/5 transition-colors ${
                  index < devices.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white/70">
                    <span className="material-symbols-outlined">
                      {device.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{device.name}</p>
                    <p className="text-xs text-white/40">{device.syncTimeText}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isConnected ? 'bg-brand-volt' : 'bg-white/25'
                    }`}
                  ></span>
                  <span className="material-symbols-outlined text-white/40">chevron_right</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Settings Grouped List */}
      <section className="mb-8">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Settings</h3>
        <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5 mb-6">
          {/* Account Security Row */}
          <div className="flex items-center justify-between p-4 border-b border-white/5 active:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-white/50">account_circle</span>
              <span className="text-sm font-semibold text-white">Account Security</span>
            </div>
            <span className="material-symbols-outlined text-white/40">chevron_right</span>
          </div>

          {/* Push Notifications Toggle */}
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-white/50">notifications</span>
              <span className="text-sm font-semibold text-white">Push Notifications</span>
            </div>
            {/* Toggle Switch */}
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 relative cursor-pointer ${
                notificationsEnabled ? 'bg-brand-volt' : 'bg-white/10'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-black transition-transform duration-300 ${
                  notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          {/* Privacy & Data Row */}
          <div className="flex items-center justify-between p-4 active:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-white/50">privacy_tip</span>
              <span className="text-sm font-semibold text-white">Privacy & Data</span>
            </div>
            <span className="material-symbols-outlined text-white/40">chevron_right</span>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full bg-white/5 hover:bg-red-950/15 border border-white/5 text-brand-red rounded-2xl p-4 flex items-center justify-between active:scale-[0.99] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-bold">Log Out</span>
          </div>
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </section>

      {/* MOCK LOGOUT MODAL DIALOG */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-5">
          <div className="glass-card-high w-full max-w-xs rounded-2xl p-6 text-[#e2e2e2] text-center shadow-2xl">
            <span className="material-symbols-outlined text-brand-red text-4xl mb-2">logout</span>
            <h4 className="text-md font-bold text-white">Sign Out?</h4>
            <p className="text-xs text-white/60 mt-1 mb-6">
              Are you sure you want to log out of Apex Fitness?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/15 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  alert('Sign out simulated successfully!');
                }}
                className="flex-1 py-2.5 bg-brand-red text-white rounded-xl text-xs font-bold hover:bg-brand-red/90 cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD PERSONAL RECORD MODAL */}
      {showRecordModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-5">
          <div className="glass-card-high w-full max-w-sm rounded-3xl p-6 text-[#e2e2e2] shadow-2xl relative">
            <button
              onClick={() => setShowRecordModal(false)}
              className="absolute right-4 top-4 text-white/60 hover:text-white"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-volt">workspace_premium</span>
              Log Personal Record
            </h3>

            <form onSubmit={handleAddRecordSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">
                  Record Category Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10K SPEED, BENCH PRESS"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-volt"
                  value={newRecordLabel}
                  onChange={(e) => setNewRecordLabel(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">
                  Achieved Value
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 42:15, 120 kg, 45 Days"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-volt"
                  value={newRecordValue}
                  onChange={(e) => setNewRecordValue(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-volt text-black py-3 rounded-full font-bold text-xs tracking-widest uppercase active:scale-95 transition-all volt-glow-button mt-2"
              >
                LOG PERSONAL RECORD
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
