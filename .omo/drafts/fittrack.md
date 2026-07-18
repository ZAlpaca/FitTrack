---
slug: fittrack
status: awaiting-approval
intent: clear
pending-action: write .omo/plans/fittrack.md
approach: Build FitTrack by phases: setup → design system → data → screens → polish. 5 waves of parallel tasks.
---

# Draft: fittrack

## Components (topology ledger)

| id | outcome | status |
|---|---|---|
| env-setup | NativeWind + deps + theme + fonts + config | active |
| design-system | GlassCard, VoltButton, ActivityRings, Charts, CalendarGrid | active |
| data-layer | Types, mockData, AppContext | active |
| dashboard | Rings + bento grid + recent workouts + tip | active |
| workouts | Search + filter + bento grid + daily rec | active |
| workout-detail | Hero + exercise list + timer overlay | active |
| stats | Nested routes + overview + goals + calendar | active |
| profile | Avatar + records + devices + settings | active |
| polish | Haptics + safe areas + splash + QA | active |

## Open assumptions (announced defaults)

| assumption | adopted default | rationale | reversible? |
|---|---|---|---|
| Icon library | @expo/vector-icons MaterialCommunityIcons | Stitch spec, already in package.json | no (cross-cutting) |
| Font | Inter via expo-font | Kinetic Noir DESIGN.md spec | yes |
| State management | React Context + useReducer | No backend, local mock data only | yes (could swap to Zustand) |
| Stats navigation | Expo Router nested routes | Portfolio quality, URL-state | yes |
| Styling | NativeWind (Tailwind) | User-specified stack | no |

## Findings (cited)

- `package.json`: Expo SDK 54, react-native 0.81.5, reanimated 4.1, expo-router 6.0 — confirmed
- `reference/fittrack_vite_reference/src/`: Полные компоненты всех экранов с Tailwind + SVG
- `reference/stitch_fittrack_premium_fitness_ui/kinetic_noir/DESIGN.md`: Полная дизайн-система Kinetic Noir
- `reference/fittrack_specs_bystitch/spec.md`: Stitch-спецификация — MaterialCommunityIcons, Inter, SVG, Blur
- `constants/theme.ts`: Существующая тема — будет заменена на Kinetic Noir

## Decisions (with rationale)

1. **NativeWind** — пользователь указал стек, Tailwind-утилиты идеально маппятся из HTML-референса
2. **Stats nested routes** — `/stats/goals` URL вместо useState: качество портфолио, deep link support
3. **37 задач × 18min** — 15-20 мин по требованию, 11h total
4. **Activity Rings через react-native-svg** — единственный способ на iOS получить SVG-кольца с StrokeDasharray
5. **Mock данные из Vite-референса** — полный набор (7 тренировок, цели, устройства, рекорды, календарь)

## Scope IN

- 5 экранов: Dashboard, Workouts, Workout Detail, Stats (3 вложенных), Profile
- Дизайн-система Kinetic Noir: Glassmorphism, #CCFF00, Inter, Activity Rings
- Моковые данные, React Context, переиспользуемые компоненты
- Workout Timer overlay, CalendarGrid, SVG Charts, FAB
- Haptics, анимации, iOS safe areas, splash screen

## Scope OUT (Must NOT have)

- Регистрация / авторизация
- Backend / API / Cloud sync
- Apple HealthKit (имитация)
- Push-уведомления (только UI toggle)
- Мультиязычность / i18n
- Android (iOS-first portfolio)
- Onboarding / tutorial
- In-app purchases

## Open questions

None remaining — все решены через референсы и Stitch spec.

## Approval gate

status: awaiting-approval
plan: .omo/plans/fittrack.md written
The user must approve the plan before execution starts.
