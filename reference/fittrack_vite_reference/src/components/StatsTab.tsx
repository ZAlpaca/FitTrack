/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Goal, CalendarSession } from '../types';
import { calculateStrokeDashOffset } from '../utils';

interface StatsTabProps {
  goals: Goal[];
  onAddGoal: (newGoal: Goal) => void;
  calendarSessions: CalendarSession[];
  onSelectWorkout: (id: string) => void;
}

export const StatsTab: React.FC<StatsTabProps> = ({
  goals,
  onAddGoal,
  calendarSessions,
  onSelectWorkout,
}) => {
  const [subview, setSubview] = useState<'overview' | 'goals' | 'calendar'>('overview');
  const [timePeriod, setTimePeriod] = useState<'weekly' | 'monthly'>('weekly');
  const [selectedDay, setSelectedDay] = useState<number>(8);
  const [activeHoverBar, setActiveHoverBar] = useState<number | null>(3); // index of THU

  // Modal State for Adding Goals
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalCategory, setGoalCategory] = useState('SESSIONS');
  const [goalCurrent, setGoalCurrent] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalUnit, setGoalUnit] = useState('workouts');

  const handleAddNewGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle || !goalTarget) return;

    const currentVal = parseFloat(goalCurrent) || 0;
    const targetVal = parseFloat(goalTarget);
    const percent = Math.min(100, Math.round((currentVal / targetVal) * 100));

    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      category: goalCategory,
      title: goalTitle,
      currentValue: currentVal,
      targetValue: targetVal,
      unit: goalUnit,
      progressPercent: percent,
      deadlineText: `Target: ${targetVal} ${goalUnit}`,
      icon: goalCategory === 'CURRENT FOCUS' ? 'monitor_weight' : goalCategory === 'SESSIONS' ? 'fitness_center' : 'directions_run',
    };

    onAddGoal(newGoal);
    setGoalTitle('');
    setGoalCurrent('');
    setGoalTarget('');
    setShowGoalModal(false);
  };

  // Find workout details for selected calendar day
  const activeDaySession = calendarSessions.find((s) => s.dayNum === selectedDay);

  return (
    <div className="pb-32 pt-20 px-5 max-w-lg mx-auto text-[#e2e2e2]">
      {/* Fixed Stats Header & Segmented Subview Control */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-xl flex flex-col px-5 pt-3 pb-2 border-b border-white/5">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-brand-volt material-symbols-fill text-2xl">
              bar_chart
            </span>
            <h1 className="text-lg font-bold text-white tracking-tight">Performance</h1>
          </div>
          <span className="text-xs text-brand-volt font-bold uppercase tracking-wider">Apex Stats</span>
        </div>
        
        {/* Segmented Control Overview / Goals / Calendar */}
        <div className="flex p-0.5 bg-white/5 rounded-full border border-white/10 text-xs">
          <button
            onClick={() => setSubview('overview')}
            className={`flex-1 py-1.5 rounded-full font-bold uppercase tracking-wider text-center cursor-pointer transition-all ${
              subview === 'overview' ? 'bg-brand-volt text-black font-extrabold' : 'text-white/60 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSubview('goals')}
            className={`flex-1 py-1.5 rounded-full font-bold uppercase tracking-wider text-center cursor-pointer transition-all ${
              subview === 'goals' ? 'bg-brand-volt text-black font-extrabold' : 'text-white/60 hover:text-white'
            }`}
          >
            Goals
          </button>
          <button
            onClick={() => setSubview('calendar')}
            className={`flex-1 py-1.5 rounded-full font-bold uppercase tracking-wider text-center cursor-pointer transition-all ${
              subview === 'calendar' ? 'bg-brand-volt text-black font-extrabold' : 'text-white/60 hover:text-white'
            }`}
          >
            Calendar
          </button>
        </div>
      </header>

      {/* SUBVIEW 1: OVERVIEW */}
      {subview === 'overview' && (
        <div className="mt-8 space-y-6">
          {/* Weekly / Monthly Toggle */}
          <div className="flex p-1 bg-white/5 rounded-full max-w-[200px] mx-auto text-xs border border-white/10">
            <button
              onClick={() => setTimePeriod('weekly')}
              className={`flex-1 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                timePeriod === 'weekly' ? 'bg-brand-volt text-black' : 'text-white/50'
              }`}
            >
              WEEKLY
            </button>
            <button
              onClick={() => setTimePeriod('monthly')}
              className={`flex-1 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                timePeriod === 'monthly' ? 'bg-brand-volt text-black' : 'text-white/50'
              }`}
            >
              MONTHLY
            </button>
          </div>

          {/* Metric Summary Bento Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5 flex flex-col justify-between aspect-square">
              <div>
                <span className="material-symbols-outlined text-brand-volt-dim mb-2 text-2xl">
                  route
                </span>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  TOTAL DISTANCE
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-black text-white tracking-tight">
                  {timePeriod === 'weekly' ? '42.8' : '182.4'}
                </h2>
                <p className="text-xs text-white/50 font-medium">KILOMETERS</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 flex flex-col justify-between aspect-square">
              <div>
                <span className="material-symbols-outlined text-brand-volt-dim mb-2 text-2xl">
                  pace
                </span>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  AVG PACE
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-black text-white tracking-tight">4'52"</h2>
                <p className="text-xs text-white/50 font-medium">MIN / KM</p>
              </div>
            </div>
          </div>

          {/* Activity Bar Chart Section */}
          <section className="space-y-3">
            <div className="flex justify-between items-end">
              <h3 className="text-md font-bold text-white">Daily Performance</h3>
              <span className="text-[11px] font-bold text-brand-volt-dim uppercase tracking-wider">
                +12% VS LAST WEEK
              </span>
            </div>
            
            <div className="glass-card rounded-2xl p-5 h-64 flex flex-col justify-end relative overflow-hidden">
              {/* Floating Tooltip Indicator */}
              <div className="absolute top-4 left-4 bg-black/60 border border-white/10 px-3 py-1 rounded-full text-[11px] font-bold text-brand-volt">
                Active Step Target: 10k
              </div>

              {/* Chart Columns */}
              <div className="flex items-end justify-between h-36 w-full gap-2">
                {[
                  { day: 'MON', value: '4.2k', height: '40%' },
                  { day: 'TUE', value: '6.8k', height: '65%' },
                  { day: 'WED', value: '5.5k', height: '55%' },
                  { day: 'THU', value: '9.4k', height: '90%', isPeak: true },
                  { day: 'FRI', value: '4.5k', height: '45%' },
                  { day: 'SAT', value: '7.0k', height: '70%' },
                  { day: 'SUN', value: '3.0k', height: '30%' },
                ].map((item, index) => {
                  const isHovered = activeHoverBar === index;
                  return (
                    <div
                      key={item.day}
                      onMouseEnter={() => setActiveHoverBar(index)}
                      className="flex-1 flex flex-col items-center group relative cursor-pointer"
                    >
                      {/* Interactive hovering value tag */}
                      <div
                        className={`absolute -top-8 bg-brand-volt text-black font-extrabold px-1.5 py-0.5 rounded text-[10px] shadow-lg transition-opacity duration-200 ${
                          isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        {item.value}
                      </div>
                      
                      {/* Bar fill */}
                      <div
                        style={{ height: item.height }}
                        className={`w-full rounded-t-md transition-all duration-300 ${
                          item.isPeak
                            ? 'bg-brand-volt volt-glow'
                            : 'bg-white/15 hover:bg-brand-volt/50'
                        }`}
                      ></div>
                    </div>
                  );
                })}
              </div>

              {/* Days labels */}
              <div className="flex justify-between mt-4 border-t border-white/10 pt-2 text-[10px] font-bold text-white/40 tracking-wider">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span className="text-brand-volt">THU</span>
                <span>FRI</span>
                <span>SAT</span>
                <span>SUN</span>
              </div>
            </div>
          </section>

          {/* Resting Heart Rate Line Chart */}
          <section className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-bold text-white">Resting Heart Rate</h3>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-volt-dim"></span>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  62 BPM AVG
                </span>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-0 h-44 relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#abd600" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#abd600" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,100 C50,90 80,120 120,80 S180,40 240,70 S320,30 400,50 L400,150 L0,150 Z"
                  fill="url(#lineGrad)"
                />
                <path
                  d="M0,100 C50,90 80,120 120,80 S180,40 240,70 S320,30 400,50"
                  fill="none"
                  stroke="#abd600"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
                <circle cx="240" cy="70" fill="#000000" r="6" stroke="#abd600" strokeWidth="2.5" />
              </svg>
              <div className="absolute top-4 left-4 bg-black/60 border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-white">
                THU: 58 BPM
              </div>
            </div>
          </section>

          {/* Total Calories Progress Circle Card */}
          <section className="glass-card rounded-2xl p-5 flex items-center gap-6">
            <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-white/10" cx="40" cy="40" r="32" fill="transparent" stroke="currentColor" strokeWidth="6" />
                <circle
                  className="text-brand-volt"
                  cx="40"
                  cy="40"
                  r="32"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 32}
                  strokeDashoffset={calculateStrokeDashOffset(78, 32)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute material-symbols-outlined text-brand-volt material-symbols-fill text-xl">
                local_fire_department
              </span>
            </div>
            <div className="flex-grow">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                CALORIES BURNED (OCT)
              </p>
              <h4 className="text-2xl font-black text-white tracking-tight">12,450</h4>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-brand-volt h-full w-[78%] rounded-full"></div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* SUBVIEW 2: GOALS */}
      {subview === 'goals' && (
        <div className="mt-8 space-y-6">
          <section className="mb-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Your Goals</h2>
            <p className="text-xs text-white/50 mt-1 leading-relaxed">
              Stay focused. Peak performance requires precise objectives and persistent monitoring.
            </p>
          </section>

          {/* Goals Stack */}
          <div className="flex flex-col gap-4">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="glass-card p-5 rounded-2xl relative overflow-hidden group transition-all"
              >
                <div className="flex justify-between items-start mb-3 z-10 relative">
                  <div>
                    <p className="text-[9px] font-bold text-brand-volt uppercase tracking-wider mb-0.5">
                      {goal.category}
                    </p>
                    <h3 className="text-md font-bold text-white">{goal.title}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white">{goal.progressPercent}%</span>
                  </div>
                </div>

                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-3 relative">
                  <div
                    style={{ width: `${goal.progressPercent}%` }}
                    className="bg-brand-volt h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(204,255,0,0.5)]"
                  ></div>
                </div>

                <div className="flex justify-between text-xs text-white/50 font-medium z-10 relative">
                  <span>
                    {goal.currentValue} {goal.unit}
                  </span>
                  <span>{goal.deadlineText}</span>
                </div>

                {/* Subtly transparent background icon */}
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                  <span className="material-symbols-outlined text-[100px] leading-none">
                    {goal.icon}
                  </span>
                </div>
              </div>
            ))}

            {/* Add New Goal Trigger */}
            <button
              onClick={() => setShowGoalModal(true)}
              className="w-full py-5 rounded-2xl border-2 border-dashed border-white/15 flex flex-col items-center justify-center gap-2 hover:bg-white/5 hover:border-brand-volt active:scale-[0.98] transition-all text-white/50 hover:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-3xl">add_circle</span>
              <span className="text-sm font-semibold">Add New Target Goal</span>
            </button>
          </div>

          {/* Goal Performance Graph */}
          <section className="space-y-3">
            <h3 className="text-md font-bold text-white">Goal Performance</h3>
            <div className="glass-card p-5 rounded-2xl h-44 flex items-end justify-between gap-3 overflow-hidden">
              <div className="flex-1 bg-brand-volt-dim/20 rounded-t-md h-[40%] cursor-help transition-all hover:h-[50%]"></div>
              <div className="flex-1 bg-brand-volt-dim/40 rounded-t-md h-[65%] cursor-help transition-all hover:h-[75%]"></div>
              <div className="flex-1 bg-brand-volt-dim/30 rounded-t-md h-[55%] cursor-help transition-all hover:h-[65%]"></div>
              <div className="flex-1 bg-brand-volt-dim/60 rounded-t-md h-[80%] cursor-help transition-all hover:h-[90%]"></div>
              <div className="flex-1 bg-brand-volt-dim/50 rounded-t-md h-[70%] cursor-help transition-all hover:h-[80%]"></div>
              <div className="flex-1 bg-brand-volt volt-glow rounded-t-md h-[95%] cursor-help transition-all hover:h-[100%]"></div>
              <div className="flex-1 bg-white/10 rounded-t-md h-[30%] cursor-help transition-all hover:h-[40%]"></div>
            </div>
            <div className="flex justify-between px-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span className="text-brand-volt">Sat</span>
              <span>Sun</span>
            </div>
          </section>
        </div>
      )}

      {/* SUBVIEW 3: CALENDAR / HISTORY */}
      {subview === 'calendar' && (
        <div className="mt-8 space-y-6">
          {/* Month Selector header */}
          <section className="flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-lg font-black text-white tracking-tight">October 2024</h2>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-0.5">
                18 Sessions Completed
              </span>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:bg-white/10 text-white cursor-pointer">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:bg-white/10 text-white cursor-pointer">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </section>

          {/* Calendar Day grid */}
          <section className="space-y-2">
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-white/40 tracking-wider">
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {/* Previous month greyed cells */}
              <div className="aspect-square flex items-center justify-center text-white/20 text-xs">29</div>
              <div className="aspect-square flex items-center justify-center text-white/20 text-xs">30</div>
              
              {/* October days cells */}
              {Array.from({ length: 26 }, (_, i) => {
                const day = i + 1;
                const session = calendarSessions.find((s) => s.dayNum === day);
                const isSelected = selectedDay === day;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                      isSelected
                        ? 'border border-brand-volt bg-brand-volt/10 scale-105'
                        : 'glass-card hover:bg-white/10'
                    }`}
                  >
                    <span
                      className={`text-xs font-semibold ${
                        isSelected ? 'text-brand-volt font-bold' : 'text-white'
                      }`}
                    >
                      {day}
                    </span>
                    {session?.isCompleted && (
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-volt mt-1 shadow-[0_0_4px_#CCFF00]"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Selected Day Summary */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                Tuesday, October {selectedDay}
              </span>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>

            {activeDaySession && activeDaySession.isCompleted ? (
              <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
                {/* Background ambient radial glow */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-volt/5 rounded-full blur-3xl"></div>
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <h3 className="text-md font-bold text-white mb-0.5">
                      {activeDaySession.title || 'Workout Session'}
                    </h3>
                    <p className="text-xs text-white/50">
                      Lower Body Focus • {activeDaySession.durationMin} min
                    </p>
                  </div>
                  <div className="bg-brand-volt/15 px-3 py-1 rounded-full border border-brand-volt/35">
                    <span className="text-[9px] font-bold text-brand-volt uppercase tracking-wider">
                      COMPLETED
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-white/5 mb-4 relative z-10 text-center">
                  <div>
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">
                      Calories
                    </span>
                    <span className="text-md font-black text-white mt-0.5 block">
                      {activeDaySession.caloriesBurned} <span className="text-[10px] font-normal text-white/40">kcal</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">
                      Avg HR
                    </span>
                    <span className="text-md font-black text-white mt-0.5 block">
                      {activeDaySession.avgHr} <span className="text-[10px] font-normal text-white/40">bpm</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">
                      Effort
                    </span>
                    <span className="text-md font-black text-brand-volt mt-0.5 block">
                      {activeDaySession.effortRating} <span className="text-[10px] font-normal text-white/40">/10</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectWorkout('workout-morning-hiit')}
                  className="w-full bg-brand-volt text-black py-3 rounded-full font-bold text-xs tracking-wider volt-glow-button active:scale-95 transition-all uppercase cursor-pointer"
                >
                  VIEW WORKOUT ROUTINE DETAILS
                </button>
              </div>
            ) : (
              <div className="glass-card p-6 rounded-2xl text-center text-white/40">
                <span className="material-symbols-outlined text-3xl mb-2">hotel</span>
                <p className="text-xs">Rest Day. No workout logged for this date.</p>
              </div>
            )}
          </section>

          {/* Extra Streak Bento Style */}
          <section className="grid grid-cols-2 gap-4 pb-10">
            <div className="glass-card rounded-2xl p-4 flex flex-col justify-between">
              <span className="material-symbols-outlined text-brand-volt text-2xl mb-1">
                local_fire_department
              </span>
              <div>
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider mb-0.5">
                  Streak
                </p>
                <p className="text-md font-black text-white">12 Days</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4 flex flex-col justify-between">
              <span className="material-symbols-outlined text-brand-volt text-2xl mb-1">
                speed
              </span>
              <div>
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider mb-0.5">
                  Intensity
                </p>
                <p className="text-md font-black text-white">+14%</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* MODAL FOR CREATING GOAL */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-5">
          <div className="glass-card-high w-full max-w-sm rounded-3xl p-6 text-[#e2e2e2] shadow-2xl relative">
            <button
              onClick={() => setShowGoalModal(false)}
              className="absolute right-4 top-4 text-white/60 hover:text-white"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-volt">add_circle</span>
              Set Target Goal
            </h3>

            <form onSubmit={handleAddNewGoalSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Weight Loss, Daily Hydration"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-volt"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">
                  Category Type
                </label>
                <select
                  className="w-full bg-[#1e2020] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-volt"
                  value={goalCategory}
                  onChange={(e) => setGoalCategory(e.target.value)}
                >
                  <option value="CURRENT FOCUS">CURRENT FOCUS (e.g. Weight)</option>
                  <option value="WEEKLY TARGET">WEEKLY TARGET (e.g. Distance)</option>
                  <option value="SESSIONS">SESSIONS (e.g. Workouts Count)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">
                    Current Value
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder="e.g. 172"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-volt"
                    value={goalCurrent}
                    onChange={(e) => setGoalCurrent(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">
                    Target Value
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="e.g. 168"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-volt"
                    value={goalTarget}
                    onChange={(e) => setGoalTarget(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">
                  Measurement Unit
                </label>
                <input
                  type="text"
                  placeholder="e.g. lbs, mi, workouts"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-volt"
                  value={goalUnit}
                  onChange={(e) => setGoalUnit(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-volt text-black py-3 rounded-full font-bold text-xs tracking-widest uppercase active:scale-95 transition-all volt-glow-button mt-2"
              >
                CREATE GOAL TARGET
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
