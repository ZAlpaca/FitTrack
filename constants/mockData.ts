/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserProfile, Goal, Workout, Device, PersonalRecord, CalendarSession } from '@/constants/types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alex Thorne',
  role: 'Pro Athlete',
  location: 'London, UK',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb3Muol1qz3HPFQrv9DLC1Zt71-AY3cq5UNZdyHqo97n0C-qp9zN4l90tSnXCO7TwLY_GGOq8FDhT45No0AbIK-hpObNVvgjV3RiVcYmceQz2euhz4sy1okpz4HK8ayVekZWc4yhoX-6oig3UEVi3nv1fOZZC2pRd1RDual4Nb77n0HnliazCYdagNL3vi5jJSGCr7f-3LUc8b951bCwf-W6HPYYdP1rtImvTqOP9AH-_G1lvC-nP7DwB0VRCqGmFasg9bEswzaGc',
  totalWorkouts: 142,
  currentStreak: 12,
};

export const INITIAL_GOALS: Goal[] = [
  {
    id: 'goal-weight-loss',
    category: 'CURRENT FOCUS',
    title: 'Weight Loss',
    currentValue: 172.4,
    targetValue: 168.0,
    unit: 'lbs',
    progressPercent: 82,
    deadlineText: 'Target: 168.0 lbs',
    icon: 'weight-kilogram',
  },
  {
    id: 'goal-weekly-miles',
    category: 'WEEKLY TARGET',
    title: 'Weekly Miles',
    currentValue: 11.2,
    targetValue: 25.0,
    unit: 'mi',
    progressPercent: 45,
    deadlineText: 'Target: 25.0 mi',
    icon: 'run-fast',
  },
  {
    id: 'goal-strength',
    category: 'SESSIONS',
    title: 'Strength Training',
    currentValue: 3,
    targetValue: 4,
    unit: 'workouts',
    progressPercent: 75,
    deadlineText: 'Deadline: Sunday',
    icon: 'dumbbell',
  }
];

export const INITIAL_DEVICES: Device[] = [
  {
    id: 'dev-1',
    name: 'Apple Watch Ultra 2',
    icon: 'watch',
    status: 'Synced',
    syncTimeText: 'Synced 2m ago',
    isActive: true,
  },
  {
    id: 'dev-2',
    name: 'Polar H10 Chest Strap',
    icon: 'heart-pulse',
    status: 'Disconnected',
    syncTimeText: 'Disconnected',
    isActive: false,
  }
];

export const INITIAL_RECORDS: PersonalRecord[] = [
  {
    id: 'rec-1',
    label: '5K SPEED',
    value: '18:42',
    icon: 'trophy-award',
  },
  {
    id: 'rec-2',
    label: 'MAX DEADLIFT',
    value: '180 kg',
    icon: 'dumbbell',
  },
  {
    id: 'rec-3',
    label: 'HIIT STREAK',
    value: '30 Days',
    icon: 'timer-outline',
  }
];

export const WORKOUT_ROUTINES: Workout[] = [
  {
    id: 'workout-morning-hiit',
    title: 'Morning HIIT',
    category: 'HIIT',
    durationMin: 45,
    caloriesBurned: 400,
    intensity: 'ELITE',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv2YCGb85WOWzuBabApYyjvfc_SqNqhFBPjNOC0IJ0vDczQzaKeAVpH4ERJR_IiZihoicdVM7eyiwh-nxMgpr3sAsShsxdfw3Zqs28ux29IPCFZ2J4-SM06o_3kApv5H1Uz18mmhNdjOunJDWoy6i2lpCsZXfa_fEVIVcmTO6SfP6qhXSn4-FHBJoEMqcB_1gmI3XQs5kym87ydUDtOsDVQfKkS-_maow7Y7CsI8Jt-m2neh6wYgUpKUOHBKInf9iDaOYUqBGrky8',
    description: 'Boost your metabolism and kickstart your day with this high-intensity interval training session designed for maximum calorie burn.',
    exercises: [
      {
        name: 'Jumping Jacks',
        type: 'Warm-up',
        durationText: '2 mins',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8mfXuQY2PHW2ziJI3B7SozsQUPbAK2oVxtQt_yK97kFHwYQiWFJCl3yFTP6j7F-5ESRX0UgRV4lW5xFX_a2XwjD_LsxNkkoQLfETKKSyb8Bm-9nfUOVjaQ8aEEt7G6EVEjYxpoZtZkcRv4H9XDGTGOGnqWVV-RTd6IuW9RlzsACBabPxgS_XnspL818a6Vy2raCzXVwq50ExExKrPK2rGNR1nN1gGx-96eYisFlhRp83wTq1jX8etVqC4l2K4iwN9Iov24NLgzEA'
      },
      {
        name: 'Mountain Climbers',
        type: 'Interval',
        durationText: '45 secs',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjtzPJUeqNT9rkZSD_I5tuuiXx3S3olJ19OWcgxYPJNj7qJZXzh5NFIDpGz6aSx4xeGM_ldeR0x29gQT8lyZIexMrHe7uwrKJxQBaBmL6_yXl0k73RYmaaxdIAbb6R7sNuQikzNTUuNYOtG-7eNTANN-BAlxWwaMnv4mCo8izngFsU0LqEVM8Dpwr6j8k7TGznTVplNhhw8EA3fFetuc3ngB-ZZQBILr2ZQcpT7oZynblJD7972eyCi0TFgWhKNKdbm-vmiugvddQ'
      },
      {
        name: 'Burpees',
        type: 'Strength',
        durationText: '12 Reps',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdgGetQatXR3tn_oTdSMebuMcsMF2aoqJNt10-_C2cIxtUhS9VpO_RY_z0W7L1JuYdf76q3D0PUg2rBGUY8pK7qDwMGNYMrqIcRrpX7WOIe58aGnDOKJw11o-s3Y86KhmTTMUexYJCEc4-v3mavNjEyj1EdpPEtuuHqmHjuBvY3tVMJBStXA6zlXgE3up7i-wuHTVXvJHy8p4Oq2vH3_Ti17kT9klWOelgNqIbdMgttAsKN0jA9WGOTCiz097Ul1ZqCCjef-6t9So'
      },
      {
        name: 'Bicycle Crunches',
        type: 'Core',
        durationText: '1 min',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtIEC5Q4eHgUTZY3eTyHMk8YdASdW7fY1xUmANSTGa1-Pa6mhjiLUj50cUrB-IaUPT3jxfJ8REGuUvJx6xvQjYaWkWNGiscfOAIBpLHd_1N_ko_4_NMEu4tYZdOSv5k4K88MVbrU8ZEzGak_QZ9jwXRpUuQmk6tl9GQNtfroAodHCwo2nCFgsQiilU1NbXi8TCgyKgFr4BrPSsqwGkO06hpsmWPe02gkiIXtTCbKjZ7jeRdFeKJ3cRwVKRl2B2M0hJu1tbeHmfpBI'
      }
    ],
  },
  {
    id: 'workout-full-body-power',
    title: 'Full Body Power',
    category: 'Strength',
    durationMin: 45,
    caloriesBurned: 320,
    intensity: 'ELITE',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARR76lfeZIz5XbnnXbUb-9YcUfXKI0FK0Emd2nBk_zBc4kLr52gsahyHHZ7bwRzu9XNG4YUQ4lPokay4Zsn4NsOAIAahHVNDKhx0jV3KQSQ9oYHNR9-3ppZXbYmBdFE7yqVaxJHunhKgayCAixf65mlxRDciozBt5FrW1OoJTmAoa5trYdXymDTmueLnP3XGYASb0qSRbLiVGms3IOZq-pcjUlnQ3b8F72ydkVwLEQfbqADMGdFrE34y1SqSApx2Hc8-yTsg9aNGI',
    description: 'Explosive barbell power routines. Targets major muscle groups to optimize power-to-weight ratio and anaerobic capacity.',
    exercises: [
      {
        name: 'Barbell Squats',
        type: 'Strength',
        durationText: '4 sets x 8 Reps',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARR76lfeZIz5XbnnXbUb-9YcUfXKI0FK0Emd2nBk_zBc4kLr52gsahyHHZ7bwRzu9XNG4YUQ4lPokay4Zsn4NsOAIAahHVNDKhx0jV3KQSQ9oYHNR9-3ppZXbYmBdFE7yqVaxJHunhKgayCAixf65mlxRDciozBt5FrW1OoJTmAoa5trYdXymDTmueLnP3XGYASb0qSRbLiVGms3IOZq-pcjUlnQ3b8F72ydkVwLEQfbqADMGdFrE34y1SqSApx2Hc8-yTsg9aNGI'
      },
      {
        name: 'Burpees',
        type: 'Strength/Cardio',
        durationText: '3 sets x 15 Reps',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdgGetQatXR3tn_oTdSMebuMcsMF2aoqJNt10-_C2cIxtUhS9VpO_RY_z0W7L1JuYdf76q3D0PUg2rBGUY8pK7qDwMGNYMrqIcRrpX7WOIe58aGnDOKJw11o-s3Y86KhmTTMUexYJCEc4-v3mavNjEyj1EdpPEtuuHqmHjuBvY3tVMJBStXA6zlXgE3up7i-wuHTVXvJHy8p4Oq2vH3_Ti17kT9klWOelgNqIbdMgttAsKN0jA9WGOTCiz097Ul1ZqCCjef-6t9So'
      }
    ]
  },
  {
    id: 'workout-night-trail-run',
    title: 'Night Trail Run',
    category: 'Cardio',
    durationMin: 32,
    caloriesBurned: 410,
    intensity: 'HARD',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv_QlpbRxopgxLFVHeqgHpnJ9HVJkz1H5htG9x13_tD3X1fXN_8bd533bQsE-Fi1A6HfVM34GmW_5EG5yM5H-iHWl_YavyAx1NXoJdcZbV3CObfuRTud2BtcNY_kiuTaesE3oSwHvPUDePqfZMgKKRLrOFIRDcUwwl0pL_Dew-U6T6N23HAOZQjVh8WRr63LahH7D9f7uoJpEouJU2NaRUp6y18ywBVnTtmcDzFwjyow6e_y14oQAfvkAQlFu7UU4ySCzqGvmJDD4',
    description: 'A silent, dark, and hyper-focused cardio trail sprint that trains reactive balance, visual focus, and cardiovascular endurance.',
    exercises: [
      {
        name: 'Dynamic Calf Warmup',
        type: 'Mobilize',
        durationText: '3 mins',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8mfXuQY2PHW2ziJI3B7SozsQUPbAK2oVxtQt_yK97kFHwYQiWFJCl3yFTP6j7F-5ESRX0UgRV4lW5xFX_a2XwjD_LsxNkkoQLfETKKSyb8Bm-9nfUOVjaQ8aEEt7G6EVEjYxpoZtZkcRv4H9XDGTGOGnqWVV-RTd6IuW9RlzsACBabPxgS_XnspL818a6Vy2raCzXVwq50ExExKrPK2rGNR1nN1gGx-96eYisFlhRp83wTq1jX8etVqC4l2K4iwN9Iov24NLgzEA'
      }
    ]
  },
  {
    id: 'workout-deep-zen-flow',
    title: 'Deep Zen Flow',
    category: 'Recovery',
    durationMin: 20,
    caloriesBurned: 105,
    intensity: 'CALM',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7lfHuaAp3C2Z4tZR9CnzmlFpKi6JqYgj-iDAq626h6FyvEwGCrPm9o3VDHh5_DYEML-E77Wlx5V1Mq_PlhRGDeHfgGfPz07rkMWdQ7FQ86oBkMelUBxL9F_8P_LaBR7ipFeS69WM5Mygtv5xvKb7BMOps_wwZhN5bt7kEgNfWrNiVjNgIQ6x5dGRQDRGA2dbOCo_7jpVIoV3fOyRyvy6WEw-8sWlLopKzP02WyNFWVGYobJb5NTTcVqfQUTo6nFLcbcIsaShRZDo',
    description: 'A slow-paced, deeply intentional somatic restorative flow designed to alleviate neural tension, lengthen connective tissue, and reduce cortisol levels.',
    exercises: [
      {
        name: 'Somatic Breathwork',
        type: 'Breathing',
        durationText: '5 mins',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7lfHuaAp3C2Z4tZR9CnzmlFpKi6JqYgj-iDAq626h6FyvEwGCrPm9o3VDHh5_DYEML-E77Wlx5V1Mq_PlhRGDeHfgGfPz07rkMWdQ7FQ86oBkMelUBxL9F_8P_LaBR7ipFeS69WM5Mygtv5xvKb7BMOps_wwZhN5bt7kEgNfWrNiVjNgIQ6x5dGRQDRGA2dbOCo_7jpVIoV3fOyRyvy6WEw-8sWlLopKzP02WyNFWVGYobJb5NTTcVqfQUTo6nFLcbcIsaShRZDo'
      }
    ]
  },
  {
    id: 'workout-zen-yoga',
    title: 'Zen Yoga',
    category: 'Yoga',
    durationMin: 30,
    caloriesBurned: 140,
    intensity: 'CALM',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaxo_JKafPwCHZzJC4F1vHgMEjlQpqdROgbRcgbnC1hQ3Bs_3c1eoWtT54k6TsMMzsiV4xvBtZeRcWmbu5lqbEWJTREuEUQ6N4pZxu-i1nBawhJP7qKS8uy1-qPzbMBi65ElZOfPgYy8aOi90G-F9M5BDlC6TRes9O86--4Io43PaoSNcMOuS_jlrAvYp1MMPSmphbHI_LvfQKUG0GntmrLJodI_OJhptU372N7bo6_sj4nSBjBrXWV3gaHmUaY6TlWgfEj_HJ_gk',
    description: 'A serene yoga flow combining holographic body alignment practices with premium physical feedback. Focuses on mental clarity.',
    exercises: [
      {
        name: 'Sun Salutation',
        type: 'Flow',
        durationText: '10 mins',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaxo_JKafPwCHZzJC4F1vHgMEjlQpqdROgbRcgbnC1hQ3Bs_3c1eoWtT54k6TsMMzsiV4xvBtZeRcWmbu5lqbEWJTREuEUQ6N4pZxu-i1nBawhJP7qKS8uy1-qPzbMBi65ElZOfPgYy8aOi90G-F9M5BDlC6TRes9O86--4Io43PaoSNcMOuS_jlrAvYp1MMPSmphbHI_LvfQKUG0GntmrLJodI_OJhptU372N7bo6_sj4nSBjBrXWV3gaHmUaY6TlWgfEj_HJ_gk'
      }
    ]
  },
  {
    id: 'workout-cycling-volt',
    title: 'Volt Cycling',
    category: 'Cycling',
    durationMin: 40,
    caloriesBurned: 480,
    intensity: 'MEDIUM',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrJP1UwFAyBackuyqu-TjbA_fpiatD543gyEjeEf3l7md_dNEe6JJMLlrhbAf47Zbp98mMyQPUtTPllcIusicgYsVNGdzrby3AHQcI0hfNRNZpt_-qyJ98XuF4i9IRo-60wQt531LInaFiGRrMh7HJITT4jKE3208_e0doWQdFX3DvrGWpt4YxuAFPVKcPzzRlEIPnioQMzWDSDR5Ig4hjQlQjWGryv_Cn3wR0iRw7-8NQMLpW8Tcj2VfO5nub6BAa445NSrdbXdg',
    description: 'Pulsating high-speed indoor cycling tracks wrapped in ambient glow lines. Builds incredible quad and cardio strength.',
    exercises: [
      {
        name: 'Hill Climb Simulator',
        type: 'Cadence',
        durationText: '15 mins',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrJP1UwFAyBackuyqu-TjbA_fpiatD543gyEjeEf3l7md_dNEe6JJMLlrhbAf47Zbp98mMyQPUtTPllcIusicgYsVNGdzrby3AHQcI0hfNRNZpt_-qyJ98XuF4i9IRo-60wQt531LInaFiGRrMh7HJITT4jKE3208_e0doWQdFX3DvrGWpt4YxuAFPVKcPzzRlEIPnioQMzWDSDR5Ig4hjQlQjWGryv_Cn3wR0iRw7-8NQMLpW8Tcj2VfO5nub6BAa445NSrdbXdg'
      }
    ]
  },
  {
    id: 'workout-joint-mobility',
    title: 'Joint Mobility',
    category: 'Mobility',
    durationMin: 15,
    caloriesBurned: 80,
    intensity: 'EASY',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI681M52lNgyZsmuHHoWRorGsF7CpaXEQW1m40-AFkQuvw8KLMDfmmWx--AKZxR_h-p4T2b6NpmFYGpofCE2taWNHaNNOWcH8_UEOGCdq__4PAADpK5FE1REsCUrNpaSHIwvpjO-pkxPrK70PHWFAMfzfvKngFLNkNbhUmprwxLNgA4PGb9bYxW75kGBsmkG3GrQsML6FPyqfKbPmsvSs78-BfanGM28Y9ziwGxeX_-5n37EpKEl2BEKSgDA5KOsHs2WwY-LEJli8',
    description: 'Precision physical movement tracking to unlock joints, expand dynamic range of motion, and pre-hab athletic postures.',
    exercises: [
      {
        name: 'Hip Opener Routine',
        type: 'Pre-hab',
        durationText: '5 mins',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI681M52lNgyZsmuHHoWRorGsF7CpaXEQW1m40-AFkQuvw8KLMDfmmWx--AKZxR_h-p4T2b6NpmFYGpofCE2taWNHaNNOWcH8_UEOGCdq__4PAADpK5FE1REsCUrNpaSHIwvpjO-pkxPrK70PHWFAMfzfvKngFLNkNbhUmprwxLNgA4PGb9bYxW75kGBsmkG3GrQsML6FPyqfKbPmsvSs78-BfanGM28Y9ziwGxeX_-5n37EpKEl2BEKSgDA5KOsHs2WwY-LEJli8'
      }
    ]
  }
];

export const CALENDAR_OCTOBER_2024: CalendarSession[] = [
  { dayNum: 1, isCompleted: true, title: 'Morning HIIT', durationMin: 45, caloriesBurned: 400, avgHr: 161, effortRating: 8.5 },
  { dayNum: 2, isCompleted: false },
  { dayNum: 3, isCompleted: true, title: 'Volt Cycling', durationMin: 40, caloriesBurned: 480, avgHr: 158, effortRating: 7.5 },
  { dayNum: 4, isCompleted: true, title: 'Joint Mobility', durationMin: 15, caloriesBurned: 80, avgHr: 110, effortRating: 3.0 },
  { dayNum: 5, isCompleted: false },
  { dayNum: 6, isCompleted: false },
  { dayNum: 7, isCompleted: true, title: 'Full Body Power', durationMin: 45, caloriesBurned: 320, avgHr: 145, effortRating: 8.0 },
  { dayNum: 8, isCompleted: true, isActiveSelection: true, title: 'HIIT & Strength', durationMin: 45, caloriesBurned: 482, avgHr: 154, effortRating: 8.5 },
  { dayNum: 9, isCompleted: true, title: 'Deep Zen Flow', durationMin: 20, caloriesBurned: 105, avgHr: 102, effortRating: 2.5 },
  { dayNum: 10, isCompleted: false },
  { dayNum: 11, isCompleted: true, title: 'Volt Cycling', durationMin: 40, caloriesBurned: 450, avgHr: 155, effortRating: 7.0 },
  { dayNum: 12, isCompleted: false },
  { dayNum: 13, isCompleted: false },
  { dayNum: 14, isCompleted: true, title: 'Morning HIIT', durationMin: 45, caloriesBurned: 410, avgHr: 163, effortRating: 9.0 },
  { dayNum: 15, isCompleted: true, title: 'Joint Mobility', durationMin: 15, caloriesBurned: 85, avgHr: 112, effortRating: 3.5 },
  { dayNum: 16, isCompleted: false },
  { dayNum: 17, isCompleted: true, title: 'Full Body Power', durationMin: 45, caloriesBurned: 330, avgHr: 148, effortRating: 8.0 },
  { dayNum: 18, isCompleted: true, title: 'Deep Zen Flow', durationMin: 20, caloriesBurned: 110, avgHr: 105, effortRating: 2.0 },
  { dayNum: 19, isCompleted: false },
  { dayNum: 20, isCompleted: false },
  { dayNum: 21, isCompleted: true, title: 'Morning HIIT', durationMin: 45, caloriesBurned: 400, avgHr: 160, effortRating: 8.5 },
  { dayNum: 22, isCompleted: true, title: 'Joint Mobility', durationMin: 15, caloriesBurned: 80, avgHr: 110, effortRating: 3.0 },
  { dayNum: 23, isCompleted: false },
  { dayNum: 24, isCompleted: true, title: 'Volt Cycling', durationMin: 40, caloriesBurned: 470, avgHr: 157, effortRating: 7.5 },
  { dayNum: 25, isCompleted: true, title: 'Full Body Power', durationMin: 45, caloriesBurned: 325, avgHr: 146, effortRating: 8.0 },
  { dayNum: 26, isCompleted: false }
];
