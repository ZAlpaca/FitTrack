# Technical Specification: FitTrack (Kinetic Noir)

> **Версия:** 1.0.0
> **Платформа:** iOS (Expo SDK 54)
> **Дизайн-система:** Kinetic Noir (Stitch)

---

## 1. Project Overview

FitTrack — премиальное iOS-приложение для отслеживания фитнес-активности. Дизайн-система "Kinetic Noir" построена на high-contrast dark-mode эстетике с неоновыми акцентами (`#CCFF00` Volt) и стекломорфизмом. Приложение уровня портфолио.

**Ключевые возможности:**
- Activity Rings (Move / Exercise / Stand) с анимацией
- Биометрическая сводка (шаги, пульс, калории) в bento-сетке
- Каталог тренировок с поиском и фильтрацией
- Детальный просмотр тренировки с активным таймером
- Статистика: чарты, календарь, цели
- Профиль атлета с рекордами, устройствами, настройками

---

## 2. Tech Stack

| Технология | Назначение | Статус |
|---|---|---|
| Expo SDK 54 | Фреймворк | ✅ Установлен |
| React Native 0.81.5 | Core | ✅ Установлен |
| TypeScript ~5.9 | Типизация | ✅ Установлен |
| Expo Router ~6.0 | Навигация (file-based) | ✅ Установлен |
| **NativeWind** | Tailwind-стилизация | ❌ Добавить |
| **react-native-svg** | Activity Rings, Chart'ы | ❌ Добавить |
| **expo-blur** | Glassmorphism (BlurView) | ❌ Добавить |
| react-native-reanimated ~4.1 | Анимации | ✅ Установлен |
| expo-haptics ~15.0 | Тактильная обратная связь | ✅ Установлен |
| **expo-font + Inter** | Кастомный шрифт | ❌ Добавить |
| @expo/vector-icons ~15.0 | Иконки (MaterialCommunityIcons) | ✅ Установлен |
| expo-image ~3.0 | Оптимизированные изображения | ✅ Установлен |
| expo-splash-screen ~31.0 | Сплаш-скрин | ✅ Установлен |
| expo-status-bar ~3.0 | Статус-бар | ✅ Установлен |

---

## 3. Design System (Kinetic Noir)

### 3.1. Color Palette

```ts
// Основные
background: '#000000'        // Pure Black — фон
surface:   '#121414'         // Surface — альтернативный фон
accent:    '#CCFF00'         // Volt — неоново-зеленый (все CTA, активные состояния)

// Стеклянные поверхности
glass-bg:  'rgba(255,255,255,0.05)'   // GlassCard фон
glass-bdr: 'rgba(255,255,255,0.1)'    // GlassCard граница
glass-hi:  'rgba(255,255,255,0.10)'   // Modal/активная карточка

// Семантические
volt-dim:  '#abd600'         // Volt приглушенный (secondary accents)
brand-red: '#fa114f'         // Move ring, опасные действия
brand-blue:'#00e5ff'         // Stand ring
on-surface:'#e2e2e2'         // Основной текст
on-muted:  'rgba(255,255,255,0.4)'   // Второстепенный текст
error:     '#ffb4ab'         // Ошибки
```

### 3.2. Typography

| Стиль | Вес | Размер | Межбукв. интервал | Применение |
|---|---|---|---|---|
| `display-xl` | 800 | 48px | -0.04em | Большие цифры (шаги, калории) |
| `metric-xl` | 800 | 40px | -0.02em | Пульс, таймер |
| `headline-lg` | 700 | 28px | -0.02em | Заголовки экранов |
| `title-md` | 600 | 18px | -0.01em | Карточки, секции |
| `body-sm` | 400 | 14px | 0em | Основной текст |
| `label-caps` | 700 | 10px | 0.06em | Лейблы метрик (UPPERCASE) |

**Шрифт:** Inter (кастомный через `expo-font`), fallback — системный San Francisco.

### 3.3. Shape & Spacing

- **Card radius:** 24px (`rounded-3xl`)
- **Button radius:** 9999px (`rounded-full` — пилюля)
- **Input radius:** 9999px
- **Modal radius:** 24px
- **Horizontal margin:** 20px (iOS safe area)
- **Section gap:** 32-40px
- **Stack:** 8px / 12px / 16px / 24px (база × 1/2/3/4)

### 3.4. Elevation

| Уровень | Описание | Стиль |
|---|---|---|
| 0 | Background | Pure `#000000` |
| 1 | Glass Card | `bg-white/5 backdrop-blur-20 border border-white/10` |
| 2 | Modal/Overlay | `bg-black/80 backdrop-blur-md`, card: `bg-white/10` |
| Glow | Volt Button | `shadow-[0_0_15px_rgba(204,255,0,0.3)]` |
| Glow | Активное кольцо | `drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]` |

---

## 4. Navigation Architecture (Expo Router)

```
app/
├── _layout.tsx              # Root: ThemeProvider, StatusBar, SafeArea, fonts
├── (tabs)/
│   ├── _layout.tsx          # Bottom Tab Navigator (4 tabs)
│   ├── index.tsx            # Dashboard — сводка, кольца, recent workouts
│   ├── workouts.tsx         # Workouts Catalog — поиск, категории, фильтры
│   ├── stats.tsx            # (redirect) → stats/overview
│   ├── stats/
│   │   ├── _layout.tsx      # Header + Segmented Control (Stack)
│   │   ├── overview.tsx     # Metrics, Bar/Line charts
│   │   ├── goals.tsx        # GoalCards, Add Goal modal
│   │   └── calendar.tsx     # CalendarGrid, session details
│   └── profile.tsx          # Profile — рекорды, устройства, настройки
├── workout/
│   └── [id].tsx             # Workout Detail — hero, упражнения, Start
└── modal.tsx                # (резерв) — модалка, если понадобится
```

**Детали навигации:**
- **Tab Bar:** 4 иконки (MaterialCommunityIcons): `view-dashboard`, `dumbbell`, `chart-bar`, `account`
- **Workout Detail:** Stack-экран поверх табов (tab bar скрыт)
- **Внутренняя навигация Stats:** Segmented Control в `stats/_layout.tsx` + 3 дочерних Stack-роута (`overview`, `goals`, `calendar`). Segmented Control отслеживает текущий route через `usePathname()` из Expo Router
- **Модальные окна:** In-app overlay (Modal на уровне экрана, не роутер)

---

## 5. Data Layer

### 5.1. TypeScript Types

```ts
interface UserProfile {
  name: string; role: string; location: string;
  avatarUrl: string; totalWorkouts: number; currentStreak: number;
}

interface Workout {
  id: string; title: string;
  category: 'Strength' | 'Cardio' | 'Recovery' | 'HIIT' | 'Yoga' | 'Cycling' | 'Mobility';
  durationMin: number; caloriesBurned: number;
  intensity: 'EASY' | 'MEDIUM' | 'HARD' | 'ELITE' | 'CALM';
  imageUrl: string; description: string;
  exercises: ExerciseStep[]; isFavorite?: boolean;
}

interface ExerciseStep {
  name: string; type: string; durationText: string; imageUrl: string;
}

interface Goal {
  id: string; category: 'CURRENT FOCUS' | 'WEEKLY TARGET' | 'SESSIONS';
  title: string; currentValue: number; targetValue: number;
  unit: string; progressPercent: number; deadlineText: string; icon: string;
}

interface Device {
  id: string; name: string; icon: string;
  status: 'Synced' | 'Disconnected'; syncTimeText: string; isActive: boolean;
}

interface PersonalRecord {
  id: string; label: string; value: string; icon: string;
}

interface CalendarSession {
  dayNum: number; isCompleted: boolean; isActiveSelection?: boolean;
  title?: string; durationMin?: number; caloriesBurned?: number;
  avgHr?: number; effortRating?: number;
}
```

### 5.2. State Management

React Context + useReducer (`AppProvider`). Mock-данные в `constants/mockData.ts` (из Vite-референса).

---

## 6. Component Architecture

### 6.1. UI Components (`components/ui/`)

| Компонент | Пропсы |
|---|---|
| `GlassCard` | `className?`, `children`, `style?` |
| `VoltButton` | `title`, `onPress`, `disabled?`, `variant?: 'primary'|'glass'` |
| `MetricBadge` | `icon`, `value`, `unit?`, `label`, `accentColor?` |
| `SegmentedControl` | `tabs: string[]`, `activeIndex`, `onChange` |
| `FilterChip` | `label`, `active`, `onPress` |
| `ProgressBar` | `percent: number`, `height?`, `glow?` |
| `FAB` | `onPress`, `icon`, `menuItems?: FabMenuItem[]` |
| `Sparkline` | `data: number[]`, `color?`, `height?` |
| `BarChart` | `data: BarItem[]`, `activeIndex?` |
| `LineChart` | `data: number[]`, `color?`, `fillColor?` |
| `CalendarGrid` | `sessions`, `selectedDay`, `onSelectDay` |
| `ModalOverlay` | `visible`, `onClose`, `children` |

### 6.2. Feature Components (`components/features/`)

| Компонент | Описание |
|---|---|
| `ActivityRings` | 3 концентрических SVG-кольца с Reanimated-анимацией |
| `WorkoutCard` | Горизонтальная карточка тренировки (изображение + badge) |
| `ExerciseRow` | Строка упражнения (image, name, type, duration) |
| `WorkoutTimer` | Полноэкранный таймер: countdown, pause/skip, completion |
| `GoalCard` | Карточка цели с ProgressBar |
| `DayCell` | Ячейка дня в календаре (номер + dot) |
| `QuickActionMenu` | Меню быстрых действий (Steps/Calories/Water) |

---

## 7. Screen Specifications

### 7.1. Dashboard

```
[Avatar] Good morning, Athlete    [📅]   ← fixed header
         ╭─────────────────╮
        ╱   Activity Rings  ╲         ← 3 SVG-кольца
       ╱       ⚡ bolt       ╲
        ╲                   ╱
         ╰─────────────────╯
  ● Move(72%)  ● Exercise(55%)  ● Stand(40%)

┌──────────────────────────────────┐
│ DAILY STEPS            [Log+]   │ ← glass-card + sparkline
│ 12,482                          │
│ 📈 12% from yesterday           │
└──────────────────────────────────┘
┌──────────────┐ ┌──────────────┐
│ 🔥 842 kcal  │ │ ❤️ 72 bpm   │ ← bento grid
└──────────────┘ └──────────────┘

Recent Workouts ───────── VIEW ALL ──
[Morning HIIT] [Full Body Power] [Night Trail]  ← h-scroll

┌─── Daily Training Tip ───────────────────┐
│ 💡 Increasing your protein intake...     │ ← glass-card, green border
└──────────────────────────────────────────┘
```

### 7.2. Workouts

```
[dumbbell] Workouts           [📅]
🔍 Search workouts, trainers...            ← pill input
[ALL] [BEGINNER] [INTERMEDIATE] [EXPERT]  ← chips
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ HIIT │ │Stren │ │ Yoga │ │Cycle │ │Mobil │ ← bento
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘
═══ Daily Recommendation ═══
[Coach's Pick] Morning Power Flow  [START NOW]
```

### 7.3. Workout Detail

```
[← back]                    [♡ fav]
┌──────────────────────────────┐
│     Hero Image (480px)       │ ← gradient overlay
│ ELITE LEVEL • HIIT           │
│ Morning HIIT                 │
└──────────────────────────────┘
┌──────────┐ ┌──────────┐
│ Duration │ │ Calories │ ← stats grid
│ 45 min   │ │ 400 kcal │
└──────────┘ └──────────┘

Exercise Routine ─ 4 Exercises
[Jumping Jacks • Warm-up • 2 mins >]
[Mountain Climbers • Interval • 45s >]

┌── Coach Pro Tip ──────────────────┐
│ 💡 "Keep your core tight..."      │
└───────────────────────────────────┘

────────────────────────────────────
[▶ START ACTIVE WORKOUT]            ← fixed bottom
────────────────────────────────────
```

### 7.4. Statistics (nested routes)

Stats использует 3 вложенных роута внутри `(tabs)/stats/`. Segmented Control — в `_layout.tsx`, контент переключается через Expo Router.

```
stats/
├── _layout.tsx      # Header + Segmented Control (Stack)
├── overview.tsx     # Overview subview
├── goals.tsx        # Goals subview
└── calendar.tsx     # Calendar subview

URLs: /stats → /stats/overview
      /stats/goals
      /stats/calendar
```

**overview.tsx:**
```
[WEEKLY|MONTHLY]                     ← toggle
┌──────────┐ ┌──────────┐
│ 42.8 km  │ │ 4'52/km  │
└──────────┘ └──────────┘
Daily Performance   +12%
▐█ ██ ██ ██ ██ ██ ██  ← bar chart
Resting HR: 62 BPM AVG
~ line chart ~
```

**goals.tsx:**
```
[Weight Loss ████████░░ 82%]
[+ Add New Target Goal]
```

**calendar.tsx:**
```
October 2024 [◀][▶]
[8] Tue • HIIT & Strength
🔥 Streak 12  ⚡ +14%
```

### 7.5. Profile

```
Athlete Profile            [📅]
   (avatar) Alex Thorne
   Pro Athlete • London

┌──────────┐ ┌──────────┐
│ 142 WOs  │ │ 12 Days  │
└──────────┘ └──────────┘

Personal Records [+ADD]
[🏅5K 18:42] [🏅DL 180kg] [🏅30d]

Linked Devices
[watch] Apple Watch Ultra 2 • Synced >
[heart] Polar H10 • Disconnected >

Settings
Account Security >
Notifications [toggle]
Privacy & Data >

[logout] Log Out >
```

---

## 8. Animations

| Элемент | Анимация | Триггер |
|---|---|---|
| Activity Rings | StrokeDashoffset 1s ease-out | Mount / update |
| Heart Rate | pulse ±2, 3s interval | Always |
| FAB menu | Fade + scale 300ms | Tap FAB |
| Timer | Countdown 1s tick | Start workout |
| Haptics | `impactAsync(Heavy)` | Buttons |

---

## 9. Must-NOT-Have

- ❌ Регистрация / авторизация
- ❌ Backend / API / Cloud sync
- ❌ Apple HealthKit (mock only)
- ❌ Push-уведомления (UI toggle only)
- ❌ Мультиязычность / i18n
- ❌ Android (iOS-first portfolio)
- ❌ Onboarding / tutorial
- ❌ In-app purchases
