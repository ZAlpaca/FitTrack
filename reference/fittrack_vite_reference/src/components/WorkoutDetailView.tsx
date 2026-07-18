/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Workout } from '../types';
import { calculateStrokeDashOffset } from '../utils';

interface WorkoutDetailViewProps {
  workout: Workout;
  onBack: () => void;
  onCompleteWorkout: (calories: number, minutes: number) => void;
}

export const WorkoutDetailView: React.FC<WorkoutDetailViewProps> = ({
  workout,
  onBack,
  onCompleteWorkout,
}) => {
  const [isFavorited, setIsFavorited] = useState(workout.isFavorite || false);
  const [activeSession, setActiveSession] = useState<{
    isRunning: boolean;
    currentExerciseIndex: number;
    secondsLeft: number;
    isFinished: boolean;
  } | null>(null);

  // Simple active workout timer simulator
  useEffect(() => {
    if (!activeSession || !activeSession.isRunning) return;

    if (activeSession.secondsLeft <= 0) {
      const nextIndex = activeSession.currentExerciseIndex + 1;
      const isRoutineEnded = nextIndex >= workout.exercises.length;

      if (isRoutineEnded) {
        setActiveSession((prev) => prev && { ...prev, isRunning: false, isFinished: true });
        onCompleteWorkout(workout.caloriesBurned, workout.durationMin);
      } else {
        // Load next exercise (10-second mock interval per step for quick testing/demo)
        setActiveSession((prev) =>
          prev && {
            ...prev,
            currentExerciseIndex: nextIndex,
            secondsLeft: 10,
          }
        );
      }
      return;
    }

    const timer = setTimeout(() => {
      setActiveSession((prev) =>
        prev && {
          ...prev,
          secondsLeft: prev.secondsLeft - 1,
        }
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeSession, workout.exercises, onCompleteWorkout, workout.caloriesBurned, workout.durationMin]);

  const handleStartWorkout = () => {
    setActiveSession({
      isRunning: true,
      currentExerciseIndex: 0,
      secondsLeft: 10, // 10 second demo timer per exercise for snappy preview
      isFinished: false,
    });
  };

  const activeExercise = activeSession ? workout.exercises[activeSession.currentExerciseIndex] : null;

  return (
    <div className="min-h-screen bg-black text-[#e2e2e2] pb-40">
      {/* Top Header Controls */}
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-5 py-4 transition-all duration-300">
        <button
          onClick={onBack}
          className="glass-card w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-transform text-white"
        >
          <span className="material-symbols-outlined text-[20px] pr-0.5">arrow_back_ios_new</span>
        </button>
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="glass-card w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-transform text-white"
        >
          <span
            className={`material-symbols-outlined text-md ${
              isFavorited ? 'material-symbols-fill text-brand-red filter drop-shadow-[0_0_8px_rgba(250,17,79,0.5)]' : ''
            }`}
          >
            favorite
          </span>
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[480px]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={workout.imageUrl}
            alt={workout.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>
        
        {/* Detail text on top of gradient */}
        <div className="absolute bottom-0 left-0 w-full px-5 pb-6 flex flex-col gap-2">
          <div className="flex gap-2.5">
            <span className="glass-card px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
              ELITE LEVEL
            </span>
            <span className="glass-card px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
              {workout.category}
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">{workout.title}</h1>
          <p className="text-xs text-white/70 max-w-sm leading-relaxed">{workout.description}</p>
        </div>
      </section>

      {/* Stats Quick Readout Grid */}
      <main className="px-5 -mt-4 relative z-10 space-y-8 max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5">
            <span className="material-symbols-outlined text-brand-volt scale-110">schedule</span>
            <div>
              <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Duration</p>
              <p className="text-sm font-bold text-white">{workout.durationMin} min</p>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5">
            <span className="material-symbols-outlined text-brand-volt scale-110">local_fire_department</span>
            <div>
              <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Est. Burn</p>
              <p className="text-sm font-bold text-white">{workout.caloriesBurned} kcal</p>
            </div>
          </div>
        </div>

        {/* Exercises list */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-md font-bold text-white">Exercise Routine</h2>
            <span className="text-xs text-white/50">{workout.exercises.length} Exercises</span>
          </div>

          <div className="flex flex-col gap-4">
            {workout.exercises.map((ex, index) => (
              <div
                key={index}
                className="glass-card p-3 rounded-2xl flex items-center gap-4 group hover:bg-white/10 transition-colors"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <img className="w-full h-full object-cover" src={ex.imageUrl} alt={ex.name} />
                  <div className="absolute inset-0 bg-brand-volt/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-black bg-brand-volt rounded-full p-1 text-sm font-bold">
                      play_arrow
                    </span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-bold text-white">{ex.name}</h3>
                  <p className="text-xs text-white/50">{ex.type} • {ex.durationText}</p>
                </div>
                <span className="material-symbols-outlined text-white/40 text-lg">chevron_right</span>
              </div>
            ))}
          </div>
        </section>

        {/* Preparation Pro Tip */}
        <section className="glass-card p-5 rounded-2xl border-l-4 border-brand-volt-dim">
          <h3 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-volt-dim">info</span>
            Coach Pro Tip
          </h3>
          <p className="text-xs text-white/60 italic leading-relaxed">
            "Keep your core tight during the workouts to protect your lower back and maximize engagement. Stand tall, land soft, and stay hydrated!"
          </p>
        </section>
      </main>

      {/* Start Workout button footer */}
      <div className="fixed bottom-0 left-0 right-0 px-5 py-6 z-30 bg-gradient-to-t from-black via-black/90 to-transparent">
        <button
          onClick={handleStartWorkout}
          className="w-full max-w-lg mx-auto h-16 bg-brand-volt text-black font-bold text-sm rounded-full flex items-center justify-center gap-2.5 active:scale-95 transition-all volt-glow-button hover:bg-[#b5e000] cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl material-symbols-fill">play_circle</span>
          START ACTIVE WORKOUT
        </button>
      </div>

      {/* ACTIVE TIMER SIMULATOR OVERLAY */}
      {activeSession && (
        <div className="fixed inset-0 z-50 bg-black backdrop-blur-xl flex flex-col justify-between p-8 text-center text-white">
          <header className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-volt">
              ACTIVE TRAINING SESSION
            </span>
            <button
              onClick={() => setActiveSession(null)}
              className="glass-card w-10 h-10 rounded-full flex items-center justify-center text-white text-xs active:scale-90"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </header>

          {activeSession.isFinished ? (
            <div className="my-auto space-y-6 max-w-sm mx-auto">
              <span className="material-symbols-outlined text-brand-volt text-7xl material-symbols-fill filter drop-shadow-[0_0_15px_#CCFF00]">
                task_alt
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight">Workout Completed!</h2>
              <p className="text-xs text-white/60 leading-relaxed">
                Awesome effort, Athlete! Your stats have been synced to Apple Health and your daily goals have been updated.
              </p>
              <div className="glass-card p-4 rounded-2xl grid grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-[10px] font-bold text-white/40 block">Calories Burned</span>
                  <span className="text-lg font-black text-brand-volt">{workout.caloriesBurned} kcal</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-white/40 block">Active Time</span>
                  <span className="text-lg font-black text-brand-volt">{workout.durationMin} min</span>
                </div>
              </div>
              <button
                onClick={() => setActiveSession(null)}
                className="w-full bg-brand-volt text-black py-3.5 rounded-full font-bold text-xs tracking-widest uppercase volt-glow-button cursor-pointer mt-4"
              >
                RETURN TO DASHBOARD
              </button>
            </div>
          ) : (
            activeExercise && (
              <div className="my-auto space-y-8 max-w-sm mx-auto">
                {/* Active exercise gif/image cover */}
                <div className="w-48 h-48 rounded-3xl overflow-hidden border-2 border-brand-volt volt-glow mx-auto relative">
                  <img
                    className="w-full h-full object-cover opacity-80"
                    src={activeExercise.imageUrl}
                    alt={activeExercise.name}
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-brand-volt uppercase tracking-wider">
                    EXERCISE {activeSession.currentExerciseIndex + 1} OF {workout.exercises.length}
                  </span>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {activeExercise.name}
                  </h3>
                  <p className="text-xs text-white/50">{activeExercise.type}</p>
                </div>

                {/* Countdown display */}
                <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-white/15" cx="64" cy="64" r="50" fill="transparent" stroke="currentColor" strokeWidth="6" />
                    <circle
                      className="text-brand-volt"
                      cx="64"
                      cy="64"
                      r="50"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeDasharray={2 * Math.PI * 50}
                      strokeDashoffset={calculateStrokeDashOffset((activeSession.secondsLeft / 10) * 100, 50)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-3xl font-black text-white tracking-tighter">
                    {activeSession.secondsLeft}s
                  </span>
                </div>

                <div className="flex justify-center gap-4 text-xs font-bold">
                  <button
                    onClick={() =>
                      setActiveSession((prev) => prev && { ...prev, isRunning: !prev.isRunning })
                    }
                    className="px-6 py-2.5 rounded-full glass-card flex items-center gap-1 hover:bg-white/10"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {activeSession.isRunning ? 'pause' : 'play_arrow'}
                    </span>
                    {activeSession.isRunning ? 'Pause' : 'Resume'}
                  </button>
                  <button
                    onClick={() => {
                      // Skip current exercise step
                      const nextIndex = activeSession.currentExerciseIndex + 1;
                      const isEnded = nextIndex >= workout.exercises.length;
                      if (isEnded) {
                        setActiveSession((prev) => prev && { ...prev, isRunning: false, isFinished: true });
                        onCompleteWorkout(workout.caloriesBurned, workout.durationMin);
                      } else {
                        setActiveSession((prev) =>
                          prev && {
                            ...prev,
                            currentExerciseIndex: nextIndex,
                            secondsLeft: 10,
                          }
                        );
                      }
                    }}
                    className="px-6 py-2.5 rounded-full glass-card hover:bg-white/10"
                  >
                    Skip
                  </button>
                </div>
              </div>
            )
          )}

          <div className="text-xs text-white/30 font-medium">
            Keep breathing. Pace yourself to optimize metabolic peak.
          </div>
        </div>
      )}
    </div>
  );
};
