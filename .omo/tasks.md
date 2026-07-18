# Implementation Tasks: FitTrack

> **Формат:** 15-20 минут на задачу. Зависимости в колонке Deps.
> **Приоритет:** P0 = блокирующая, P1 = важная, P2 = улучшение.

---

## Phase 0: Project Bootstrap

| ID | Task | Описание | Acceptance Criteria | Deps | Prior. |
|---|---|---|---|---|---|
| T01 | Install NativeWind + Tailwind | `npx nativewind@latest init`, `tailwind.config.js`, `global.css`, импорт в `_layout.tsx` | `text-brand-volt` работает в компоненте | — | P0 |
| T02 | Install deps | `npm i react-native-svg expo-blur @expo-google-fonts/inter` | Пакеты + `expo-blur` в `app.json` plugins | — | P0 |
| T03 | Theme Kinetic Noir | Обновить `constants/theme.ts` — цвета, типографика, радиусы из spec | Тема экспортируется, NativeWind использует | T01 | P0 |
| T04 | Font Inter | `useFonts` в `_layout.tsx`, NativeWind-конфиг | Текст = Inter на iOS | T02 | P0 |
| T05 | app.config | Splash dark, StatusBar light, portrait | Черный сплэш, light status bar | — | P0 |

## Phase 1: Navigation & Core Components

| ID | Task | Описание | Acceptance Criteria | Deps | Prior. |
|---|---|---|---|---|---|
| T06 | Tabs (4 screens) | `(tabs)/_layout.tsx`: Dashboard/Workouts/Stats/Profile. Иконки MaterialCommunityIcons | 4 таба, активный — Volt | T01 | P0 |
| T07 | GlassCard + VoltButton | UI-компоненты с NativeWind. Card: blur+radius. Button: #CCFF00 pill+glow | Как в референсе | T01 | P0 |
| T08 | Typography system | `DisplayXL`, `MetricXL`, `Headline`, `LabelCaps` — Inter weight/leading | По spec | T04 | P0 |
| T09 | ActivityRings SVG | 3 кольца (Move/Exer/Stand) через `react-native-svg` + Reanimated | Анимация при mount | T02 | P0 |
| T10 | SegmentedControl + FilterChip | Пилюльный переключатель + чип active/inactive | Volt-подсветка active | T01 | P0 |
| T11 | ProgressBar + MetricBadge | Progress с Volt-заливкой + glow. Badge: иконка+число+лейбл | Width = percent | T01 | P0 |
| T12 | FAB + QuickActionMenu | Плавающая "+" с меню (Steps/Cal/Water). Анимация + haptics | Открытие/закрытие | T01 | P0 |
| T13 | ModalOverlay | Black/80 + blur + glass-card с close | Close по кнопке и фону | T07 | P0 |
| T14 | SVG Charts | `Sparkline`, `BarChart`, `LineChart` через react-native-svg | Данные отображаются, Volt-акценты | T02 | P1 |
| T15 | CalendarGrid | 7-col grid с DayCell, active border, completion dot | Клик, selected-день | T01 | P1 |

## Phase 2: Data Layer

| ID | Task | Описание | Acceptance Criteria | Deps | Prior. |
|---|---|---|---|---|---|
| T16 | Types | `constants/types.ts`: все интерфейсы (User, Workout, Goal, Device, PR, Calendar) | Строгая типизация | — | P0 |
| T17 | Mock data | `constants/mockData.ts` — данные из Vite-референса | Соответствует экранам | T16 | P0 |
| T18 | AppContext | React Context с состоянием: rings, goals, devices, records, sessions, profile, actions | Доступно из любого экрана | T16 | P0 |

## Phase 3: Screens

| ID | Task | Описание | Acceptance Criteria | Deps | Prior. |
|---|---|---|---|---|---|
| T19 | Dashboard: Rings + Bio | Header (greeting+avatar), Activity Rings с легендой | Как spec 7.1 | T06, T09, T18 | P0 |
| T20 | Dashboard: Bento Grid | Steps+sparkline+Log, Calories card, HR card с pulse | Data из контекста | T07, T14, T18 | P0 |
| T21 | Dashboard: Recent + Tip | Горизонтальный scroll WorkoutCard, Daily Tip | Tap → /workout/[id] | T07, T18 | P0 |
| T22 | Workouts: Search + Filters | Pill input + FilterChips ALL/BEG/INT/EXP | Фильтрация и поиск | T06, T10 | P0 |
| T23 | Workouts: Grid + Daily Rec | Bento grid категорий + Daily Recommendation block | Изображения, badge | T07, T06 | P0 |
| T24 | Detail: Hero + Info | Hero 480px, gradient, badge, title. Stats grid | Данные Workout | T06, T07 | P0 |
| T25 | Detail: Exercise List | ExerciseRow: image, name, type, duration | Все упражнения | T07, T18 | P0 |
| T26 | Detail: Timer Overlay | Fullscreen: exercise, SVG countdown, pause/skip, completion | Timer ticks, skip→next, completion→update | T09, T18 | P1 |
| T27 | Stats: Layout + Segmented | `stats/_layout.tsx` — Stack-навигатор с Segmented Control в header. 3 дочерних роута | Segmented Control отслеживает route через `usePathname()`, `/stats/goals` открывается по URL | T06, T10 | P0 |
| T28 | Stats: Overview | `/stats/overview.tsx` — Weekly/Monthly toggle, Distance/Pace metrics, Bar+Line charts | Chart Volt-акценты | T14, T18 | P0 |
| T29 | Stats: Goals | `/stats/goals.tsx` — GoalCard с ProgressBar, chart, [+ Add] modal | Goals из контекста | T11, T13, T18 | P0 |
| T30 | Stats: Calendar | `/stats/calendar.tsx` — CalendarGrid, day→session details, Streak/Intensity | Dot на completed | T15, T18 | P0 |
| T31 | Profile: Avatar + Stats | Volt-рамка с glow, имя, Total/Streak | Pulse анимация | T06, T07 | P0 |
| T32 | Profile: Records + Devices | Records h-scroll, Devices toggle-status | Tap to toggle, [+ Add] modal | T13, T18 | P0 |
| T33 | Profile: Settings + Logout | Account/Notifications toggle/Privacy, Logout modal | Toggle + confirm modal | T13 | P0 |

## Phase 4: Polish

| ID | Task | Описание | Acceptance Criteria | Deps | Prior. |
|---|---|---|---|---|---|
| T34 | Haptics + Animations | expo-haptics на CTA. Reanimated entrance для карточек | Тактильный отклик | T07, T12 | P1 |
| T35 | iOS Safe Areas | SafeAreaView, StatusBar light, Dynamic Island | Контент не под notch | T06 | P1 |
| T36 | Splash + Icon | Черный сплэш, app icon | Splash→Main без моргания | T05 | P2 |
| T37 | Final QA | Проверка 5 экранов на iPhone 15 Pro + SE | Все AC выполнены | All | P0 |

---

## Dependency Graph

```
T01 ─┬→ T03 ─→ T06 ─┬→ T19 ─→ T20 ─→ T21
     │               ├→ T22 ─→ T23
     │               ├→ T27 ─┬→ T28
     │               │       ├→ T29
     │               │       └→ T30
     │               └→ T31 ─→ T32 ─→ T33
     │
T02 ─┬→ T04 ─→ T08
     ├→ T09 ─→ T19
     ├→ T14 ─→ T28
     └→ T15 ─→ T30

T07 ─→ T19, T21, T23-T25, T31
T10 ─→ T22, T27
T11 ─→ T29
T12 ─→ T20
T13 ─→ T29, T32, T33

T16 ─→ T17 ─→ T18 ─→ T19-T21, T25, T28-T30, T32
```

## Total

- **Phase 0:** 5 × 18min = 1.5h
- **Phase 1:** 10 × 18min = 3h
- **Phase 2:** 3 × 18min = 1h
- **Phase 3:** 15 × 18min = 4.5h
- **Phase 4:** 4 × 18min = 1.5h
- **Total:** 37 tasks × ~18min ≈ **11h**
