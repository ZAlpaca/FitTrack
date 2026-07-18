# FitTrack — Kinetic Noir

[![Expo SDK](https://img.shields.io/badge/Expo-54-000.svg)](https://docs.expo.dev/)
[![iOS](https://img.shields.io/badge/platform-iOS-000.svg)](https://developer.apple.com/ios/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)

Премиальное iOS-приложение для отслеживания фитнес-активности. Дизайн — **Kinetic Noir**: тёмная тема, стекломорфизм, неоновые акценты `#CCFF00`.

---

## Стек

| Технология | Назначение |
|---|---|
| **Expo SDK 54** | Фреймворк для React Native |
| **Expo Router** | Файловая навигация |
| **NativeWind** | Tailwind CSS для React Native |
| **react-native-svg** | Activity Rings и графики |
| **react-native-reanimated** | Анимации |
| **expo-blur** | Glassmorphism |
| **@expo/vector-icons** | Иконки (MaterialCommunityIcons) |

## Быстрый старт

```bash
npm install
npx expo start
```

Откройте в iOS Simulator (нажмите `i` в терминале).

## Архитектура

```
app/                  # Expo Router (экраны)
├── (tabs)/
│   ├── index.tsx     → Dashboard
│   ├── workouts.tsx  → Workouts Catalog
│   ├── stats.tsx     → Performance
│   └── profile.tsx   → Profile
└── workout/[id].tsx  → Workout Detail

components/
├── ui/               # GlassCard, VoltButton, ProgressBar, Charts
└── features/         # ActivityRings, WorkoutTimer, CalendarGrid

constants/
├── types.ts          # Все интерфейсы TypeScript
├── mockData.ts       # Моковые данные
└── theme.ts          # Цвета, типографика, радиусы

hooks/                # useColorScheme, useAppContext
```

## Дизайн-система (Kinetic Noir)

- **Фон:** Pure Black `#000000`
- **Акцент:** Volt `#CCFF00` (неоново-зеленый)
- **Карточки:** Glassmorphism (`bg-white/5 backdrop-blur-20 border-white/10`)
- **Типографика:** Inter (кастомный), тяжелые веса для метрик
- **Скругления:** 24px (карточки), 9999px (кнопки)
- **Тени:** Volt glow `shadow-[0_0_15px_rgba(204,255,0,0.3)]`

Полная спецификация → `./spec.md`

## План реализации (11h)

| Фаза | Описание | Время |
|---|---|---|
| Phase 0 | Environment & Theme | ~1.5ч |
| Phase 1 | Design System & Components | ~3ч |
| Phase 2 | Data Layer | ~1ч |
| Phase 3 | Screen Implementation | ~4.5ч |
| Phase 4 | Polish & QA | ~1.5ч |

Задачи → `./tasks.md` • Дорожная карта → `./roadmap.md`

## Референсы

- `reference/fittrack_vite_reference/` — Vite-прототип (HTML/Tailwind)
- `reference/stitch_fittrack_premium_fitness_ui/` — Stitch-дизайн (HTML/Tailwind)
- `reference/fittrack_specs_bystitch/` — Спецификации от автора дизайна

## Scope

- ✅ iOS-only (портфолио)
- ✅ Все данные моковые (нет бэкенда)
- ❌ Регистрация / авторизация
- ❌ Apple HealthKit (имитация)
- ❌ Push-уведомления (только UI-тоггл)
