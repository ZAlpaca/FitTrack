/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppTab } from '../types';

interface BottomNavBarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: AppTab.DASHBOARD, label: 'Dashboard', icon: 'dashboard' },
    { id: AppTab.WORKOUTS, label: 'Workouts', icon: 'fitness_center' },
    { id: AppTab.STATS, label: 'Stats', icon: 'bar_chart' },
    { id: AppTab.PROFILE, label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 pb-8 pt-3 bg-black/85 backdrop-blur-2xl border-t border-white/10 rounded-t-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.8)]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
              isActive
                ? 'text-brand-volt font-bold scale-110'
                : 'text-white/50 hover:text-white/80 active:scale-95'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[26px] ${
                isActive ? 'material-symbols-fill text-brand-volt' : ''
              }`}
            >
              {tab.icon}
            </span>
            <span className="text-[11px] font-semibold tracking-wider mt-1 uppercase">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
