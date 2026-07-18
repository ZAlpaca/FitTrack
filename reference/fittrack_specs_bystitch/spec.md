# Technical Specification: FitTrack (Kinetic Noir)

## 1. Project Overview
FitTrack is a premium iOS fitness application built with Expo SDK 54. The design system, "Kinetic Noir," focuses on a high-contrast, dark-mode aesthetic with neon accents and glassmorphism.

## 2. Tech Stack
- **Framework:** React Native (Expo SDK 54)
- **Navigation:** Expo Router (File-based routing)
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Graphics:** `react-native-svg` for Activity Rings and Charts
- **Animations:** `react-native-reanimated`
- **Effects:** `expo-blur` for glassmorphism
- **Icons:** `@expo/vector-icons` (MaterialCommunityIcons for cross-platform consistency with the reference style).

## 3. Design System (Kinetic Noir)
- **Background:** `#000000` (Pure Black)
- **Accent (Volt):** `#CCFF00` (Neon Green)
- **Surface:** `rgba(255, 255, 255, 0.05)` (Glass cards)
- **Border:** `1px solid rgba(255, 255, 255, 0.1)`
- **Typography:** Inter (Primary), System San Francisco (Secondary)
- **Roundness:** `rounded-3xl` (24px) for cards, `rounded-full` for buttons.

## 4. Navigation Architecture (Expo Router)
- `app/_layout.tsx`: Root provider setup (Theme, Fonts, Safe Area).
- `app/(tabs)/_layout.tsx`: Custom Tab Bar with 4 destinations.
- `app/(tabs)/index.tsx`: **Dashboard** (Summary, Rings, Recent).
- `app/(tabs)/workouts.tsx`: **Catalog** (Categories, Search, Filters).
- `app/(tabs)/stats.tsx`: **Performance** (Overview, Goals, Calendar).
- `app/(tabs)/profile.tsx`: **Athlete Profile** (Settings, Records).
- `app/workout/[id].tsx`: **Workout Details** (Hero image, Exercise list).

## 5. Key UI Components
### 5.1. ActivityRings (SVG)
3 concentric rings representing Move (Red/Volt), Exercise (Lime), and Stand (Cyan). Use `react-native-svg` with `StrokeDasharray` for progress.

### 5.2. GlassCard
A container component with:
- `backgroundColor: 'rgba(255,255,255,0.05)'`
- `borderWidth: 1`, `borderColor: 'rgba(255,255,255,0.1)'`
- `borderRadius: 24`
- `BlurView` from `expo-blur` (Intensity: 20-30).

### 5.3. VoltButton
Main CTA with `#CCFF00` background and black text. Add a slight outer glow (`shadowColor: '#CCFF00', shadowOpacity: 0.5`).

## 6. Data Requirements
- `Workout`: id, title, duration, calories, difficulty, image_url, exercise_list.
- `UserStats`: daily_steps, heart_rate, ring_progress (move/exercise/stand).
- `Goal`: title, progress, target, deadline.
