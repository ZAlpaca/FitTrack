# FitTrack — Work Plan

## TL;DR (For humans)

**What you'll get:** iOS фитнес-приложение с темной стекломорфной темой, неоново-зелеными акцентами и Activity Rings. Пять экранов: Dashboard (кольца, шаги, пульс, калории), каталог тренировок, детальный просмотр с таймером, статистика с графиками и календарем, профиль атлета.

**Why this approach:** Поэтапная сборка — сначала дизайн-система (чтобы все экраны выглядели единообразно), потом данные, потом экраны. 5 параллельных волн по 5-8 задач.

**What it will NOT do:** Без бэкенда, регистрации, Apple Health, пушей. Все данные моковые.

**Effort:** Large (~11h, 37 tasks × 18min)
**Risk:** Low — все технологии известны (Expo, NativeWind), есть полный HTML-референс
**Decisions to sanity-check:** NativeWind стилизация, nested routes для Stats, MaterialCommunityIcons

Your next move: Run `/start-work` to begin execution wave by wave.

---

> TL;DR (machine): Large effort, Low risk, 37 todos in 5 waves. FitTrack iOS fitness app with Kinetic Noir design system.

## Scope
### Must have
- 5 screens (Dashboard, Workouts, Workout Detail, Stats, Profile)
- Kinetic Noir design system (GlassCard, Activity Rings, VoltButton, Charts)
- Expo Router navigation (4 tabs + nested stats routes)
- Mock data with React Context
- Workout Timer overlay, Calendar grid
- Haptics, animations, iOS safe areas

### Must NOT have (guardrails, anti-slop, scope boundaries)
- No auth/registration
- No backend/API/cloud
- No Apple HealthKit integration
- No push notifications logic (UI toggle only)
- No i18n
- No Android
- No onboarding/tutorial
- No in-app purchases

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: tests-after (visual + functional QA against reference)
- Evidence: .omo/evidence/task-<N>-fittrack evidence

## Execution strategy
### Parallel execution waves
> 5 waves of 5-8 tasks each.

- **Wave 1** (Setup): T01-T05 — deps, NativeWind, theme, fonts, app config
- **Wave 2** (Design System): T06-T15 — navigation, GlassCard, ActivityRings, Charts, CalendarGrid, modals
- **Wave 3** (Data): T16-T18 — types, mockData, AppContext
- **Wave 4** (Screens): T19-T33 — Dashboard, Workouts, Workout Detail, Stats, Profile
- **Wave 5** (Polish): T34-T37 — haptics, safe areas, splash, QA

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| T01-T02 | — | T03-T04 | T05 |
| T03 | T01 | T06 | T04 |
| T04 | T02 | T08 | T03 |
| T05 | — | T36 | T01-T02 |
| T06 | T03 | T19-T33 | T07-T15 |
| T07-T15 | T01-T02 | T19-T33 | each other |
| T16 | — | T17-T18 | T01-T15 |
| T17 | T16 | T18 | — |
| T18 | T17 | T19-T33 | — |
| T19-T33 | T06-T18 | — | each other (file-isolated) |
| T34-T37 | T19-T33 | — | each other |

## Todos
> Implementation + Test = ONE todo. Never separate.
<!-- APPEND TASK BATCHES BELOW THIS LINE WITH edit/apply_patch - never rewrite the headers above. -->

### Wave 1: Environment Setup
- [x] 1. Install NativeWind + Tailwind
  What: `npx nativewind@latest init`, tailwind.config.js with Kinetic Noir colors (volt `#CCFF00`, surface colors), global.css, import in `_layout.tsx`
  Must NOT: Do not modify existing app/ screens
  Parallelization: Wave 1 | Blocked by: — | Blocks: T03, T06
  References: `reference/stitch_fittrack_premium_fitness_ui/kinetic_noir/DESIGN.md:36-49`
  Acceptance: `lsp_diagnostics` clean, `text-brand-volt` class renders on a test component
  QA: Verify Volt color `#CCFF00` applies by creating temporary test View with `className="bg-brand-volt"`, confirm no crash. Evidence `.omo/evidence/task-01-fittrack`
  Commit: Y | feat(env): add NativeWind + Tailwind with Kinetic Noir theme

- [x] 2. Install dependencies
  What: `npm install react-native-svg expo-blur @expo-google-fonts/inter`. Add expo-blur to app.json plugins
  Must NOT: Remove any existing dependencies
  Parallelization: Wave 1 | Blocked by: — | Blocks: T04, T09
  References: `package.json`
  Acceptance: `node -e "require('./package.json').dependencies['react-native-svg'] && process.exit(0)"` exits 0
  QA: `npm ls react-native-svg expo-blur` shows both installed. Evidence `.omo/evidence/task-02-fittrack`
  Commit: Y | feat(env): add react-native-svg, expo-blur, Inter font

- [x] 3. Theme Kinetic Noir
  What: Rewrite `constants/theme.ts` with full Kinetic Noir palette (12 colors), typography (Inter 6 styles), spacing, borderRadius tokens. Wire to NativeWind config
  Must NOT: Remove exports — must keep `Colors` and `Fonts` keys for backwards compat
  Parallelization: Wave 1 | Blocked by: T01 | Blocks: T06
  References: `reference/stitch_fittrack_premium_fitness_ui/kinetic_noir/DESIGN.md:36-115`, `.omo/spec.md:3`
  Acceptance: `import { Colors } from '@/constants/theme'` returns new palette with `#CCFF00` accent
  QA: Check Colors.accent === '#CCFF00'. Evidence `.omo/evidence/task-03-fittrack`
  Commit: Y | feat(theme): implement Kinetic Noir design tokens

- [x] 4. Font Inter setup
  What: Configure `expo-font` with Inter variants (400/600/700/800) in `app/_layout.tsx`. Add Inter to NativeWind font family config as `sans`
  Must NOT: Break existing font loading — keep fallback to system San Francisco
  Parallelization: Wave 1 | Blocked by: T02 | Blocks: T08
  References: `reference/stitch_fittrack_premium_fitness_ui/kinetic_noir/DESIGN.md:51-100`
  Acceptance: App loads without font warnings, text renders in Inter
  QA: Add temporary `<Text style={{fontFamily: 'Inter_700Bold'}}>Test</Text>` — no crash. Evidence `.omo/evidence/task-04-fittrack`
  Commit: Y | feat(theme): add Inter font via expo-font

- [x] 5. App config
  What: Update `app.json` — splash backgroundColor #000000, statusBar style light, orientation portrait. Verify iOS config
  Must NOT: Change app slug, scheme, or version
  Parallelization: Wave 1 | Blocked by: — | Blocks: T36
  References: `app.json`
  Acceptance: `app.json` has `"backgroundColor": "#000000"` and `"statusBar": {"style": "light"}`
  QA: `Get-Content app.json | Select-String "#000000"` matches. Evidence `.omo/evidence/task-05-fittrack`
  Commit: Y | config(env): dark splash screen, light status bar

### Wave 2: Design System & Components
- [x] 6. Tab Navigation (4 screens)
  What: Rewrite `app/(tabs)/_layout.tsx` — 4 tabs (Dashboard/Workouts/Stats/Profile). Icons: MaterialCommunityIcons `view-dashboard`, `dumbbell`, `chart-bar`, `account`. Active tint: `#CCFF00`. Create stub screens: `index.tsx`, `workouts.tsx`, `stats.tsx`, `profile.tsx`. Move `(tabs)/index.tsx` content to Dashboard stub
  Must NOT: Break root `_layout.tsx` — keep ThemeProvider, StatusBar. Remove old explore.tsx tab
  Parallelization: Wave 2 | Blocked by: T03 | Blocks: T19-T33
  References: `app/(tabs)/_layout.tsx`, `spec.md:4`
  Acceptance: 4 tabs visible, swappable, active tab has Volt tint
  QA: Tab press on each icon — component renders without error. Evidence `.omo/evidence/task-06-fittrack`
  Commit: Y | feat(nav): 4-tab navigation with Kinetic Noir styling

- [x] 7. GlassCard + VoltButton
  What: `components/ui/GlassCard.tsx` — BlurView + white/5 bg + border white/10 + borderRadius 24. `components/ui/VoltButton.tsx` — pill shape, #CCFF00 bg, black text, glow shadow
  Must NOT: Add external dependencies beyond expo-blur and react-native
  Parallelization: Wave 2 | Blocked by: T01 | Blocks: T19-T33
  References: `reference/stitch_fittrack_premium_fitness_ui/kinetic_noir/DESIGN.md:147-178`
  Acceptance: GlassCard renders with blur backdrop, VoltButton has #CCFF00 bg
  QA: Render both components with test content — match reference screenshot style. Evidence `.omo/evidence/task-07-fittrack`
  Commit: Y | feat(ui): GlassCard and VoltButton components

- [x] 8. Typography system
  What: `components/ui/Typography.tsx` — DisplayXL, MetricXL, HeadlineLG, TitleMD, BodySM, LabelCaps. Each with Inter weight, size, tracking from spec
  Must NOT: Remove existing ThemedText — add new or wrap
  Parallelization: Wave 2 | Blocked by: T04 | Blocks: T19-T33
  References: `spec.md:3.2`, `constants/theme.ts`
  Acceptance: `<TitleMD>text</TitleMD>` renders with correct Inter weight and size
  QA: Render all 6 variants — verify fontSize and fontFamily. Evidence `.omo/evidence/task-08-fittrack`
  Commit: Y | feat(ui): Kinetic Noir typography components

- [x] 9. ActivityRings SVG
  What: `components/features/ActivityRings.tsx` — 3 concentric SVG rings (Move=#fa114f, Exercise=#CCFF00, Stand=#00e5ff) via react-native-svg. Reanimated for strokeDashoffset animation. Legend below
  Must NOT: Use any image assets — pure SVG
  Parallelization: Wave 2 | Blocked by: T02 | Blocks: T19
  References: `reference/fittrack_vite_reference/src/components/DashboardTab.tsx:84-190`, `reference/fittrack_vite_reference/src/utils.ts`
  Acceptance: 3 rings render, animate on mount, colors match spec
  QA: Mount component with move=72, exercise=55, stand=40 — verify visual match to reference. Evidence `.omo/evidence/task-09-fittrack`
  Commit: Y | feat(ui): Activity Rings with SVG + Reanimated

- [x] 10. SegmentedControl + FilterChip
  What: `components/ui/SegmentedControl.tsx` — pill group, active segment = #CCFF00 bg, inactive = white/10. `components/ui/FilterChip.tsx` — single chip with active/inactive state
  Must NOT: Use third-party segmented control libraries
  Parallelization: Wave 2 | Blocked by: T01 | Blocks: T22, T27
  References: `reference/fittrack_vite_reference/src/components/StatsTab.tsx:80-107`
  Acceptance: SegmentedControl switches active segment, FilterChip toggles style
  QA: Render with 3 tabs, tap each — active state moves. Evidence `.omo/evidence/task-10-fittrack`
  Commit: Y | feat(ui): SegmentedControl and FilterChip components

- [x] 11. ProgressBar + MetricBadge
  What: `components/ui/ProgressBar.tsx` — track white/10, fill #CCFF00 with glow at top. `components/ui/MetricBadge.tsx` — icon + number + label
  Must NOT: Use any animation library beyond Reanimated
  Parallelization: Wave 2 | Blocked by: T01 | Blocks: T28, T20
  References: `reference/fittrack_vite_reference/src/components/StatsTab.tsx:339-343`
  Acceptance: ProgressBar width = percent prop, MetricBadge shows icon+value
  QA: Render with 75% — bar fills 3/4. Evidence `.omo/evidence/task-11-fittrack`
  Commit: Y | feat(ui): ProgressBar and MetricBadge components

- [x] 12. FAB + QuickActionMenu
  What: `components/ui/FAB.tsx` — floating "+" button (bottom-right, #CCFF00, 56x56, pill). Menu with 3 items: Log Steps, Log Calories, Log Water. Fade + scale animation on open/close. Haptics on press
  Must NOT: Position fixed outside SafeArea
  Parallelization: Wave 2 | Blocked by: T01 | Blocks: T20
  References: `reference/fittrack_vite_reference/src/App.tsx:202-246`
  Acceptance: FAB toggles menu, items are tappable, menu animates
  QA: Press FAB — menu opens. Press item — console.log action. Evidence `.omo/evidence/task-12-fittrack`
  Commit: Y | feat(ui): FloatingActionButton with quick action menu

- [x] 13. ModalOverlay
  What: `components/ui/ModalOverlay.tsx` — black/80 backdrop + blur + centered glass card + close button. Close on backdrop press and X button. Slot children
  Must NOT: Use react-native Modal if avoidable — use absolute positioning with Animated
  Parallelization: Wave 2 | Blocked by: T07 | Blocks: T28, T32, T33
  References: `reference/fittrack_vite_reference/src/components/StatsTab.tsx:568-665`
  Acceptance: Modal opens with fade, closes on backdrop tap and X button
  QA: Open modal, tap backdrop — closes. Evidence `.omo/evidence/task-13-fittrack`
  Commit: Y | feat(ui): ModalOverlay with glassmorphism

- [x] 14. SVG Charts (Sparkline, BarChart, LineChart)
  What: `components/ui/Sparkline.tsx` — mini line SVG with gradient fill. `components/ui/BarChart.tsx` — columns with active hover state. `components/ui/LineChart.tsx` — path with gradient fill. All via react-native-svg
  Must NOT: Use charting libraries — pure SVG
  Parallelization: Wave 2 | Blocked by: T02 | Blocks: T20, T28
  References: `reference/fittrack_vite_reference/src/components/DashboardTab.tsx:210-240`, `StatsTab.tsx:183-234,248-273`
  Acceptance: All 3 charts render sample data with Volt accents
  QA: Pass mock data — rendered chart matches reference. Evidence `.omo/evidence/task-14-fittrack`
  Commit: Y | feat(ui): SVG chart components (Sparkline, BarChart, LineChart)

- [x] 15. CalendarGrid
  What: `components/ui/CalendarGrid.tsx` — 7-column grid with DayCell. Selected day = Volt border + glow. Completed day = green dot. Prev/next month navigation. Session detail card below
  Must NOT: Use date libraries — manual date arithmetic for current month
  Parallelization: Wave 2 | Blocked by: T01 | Blocks: T30
  References: `reference/fittrack_vite_reference/src/components/StatsTab.tsx:397-564`
  Acceptance: Grid renders, days are tappable, selected day shows Volt border, completed days have dot
  QA: Tap day 15 — it highlights. Evidence `.omo/evidence/task-15-fittrack`
  Commit: Y | feat(ui): CalendarGrid with session indicators

### Wave 3: Data Layer
- [ ] 16. TypeScript types
  What: `constants/types.ts` — all interfaces from spec. UserProfile, Workout, ExerciseStep, Goal, Device, PersonalRecord, CalendarSession. Export all
  Must NOT: Add any runtime code — pure types
  Parallelization: Wave 3 | Blocked by: — | Blocks: T17, T18
  References: `reference/fittrack_vite_reference/src/types.ts`, `.omo/spec.md:5.1`
  Acceptance: `tsc --noEmit` passes without errors
  QA: Import types in a test file — compile succeeds. Evidence `.omo/evidence/task-16-fittrack`
  Commit: Y | feat(data): all TypeScript interfaces for FitTrack

- [ ] 17. Mock data
  What: `constants/mockData.ts` — export all mock data from Vite reference: 1 user, 3 goals, 2 devices, 3 records, 7 workouts, 26 calendar sessions
  Must NOT: Include real/identifiable information
  Parallelization: Wave 3 | Blocked by: T16 | Blocks: T18
  References: `reference/fittrack_vite_reference/src/mockData.ts`
  Acceptance: All exports are typed, array lengths match source
  QA: `console.log(WORKOUT_ROUTINES.length)` === 7. Evidence `.omo/evidence/task-17-fittrack`
  Commit: Y | feat(data): mock data for all entities

- [ ] 18. AppContext
  What: `hooks/use-app-context.tsx` — React Context with full AppState: userProfile, goals, devices, records, sessions, rings (move/exercise/stand), stepsCount, heartRate. Actions: logActivity, toggleDevice, addGoal, addRecord, completeWorkout
  Must NOT: Add external state management libraries
  Parallelization: Wave 3 | Blocked by: T17 | Blocks: T19-T33
  References: `reference/fittrack_vite_reference/src/App.tsx:29-147`
  Acceptance: All screens can `useAppContext()` and read/write state
  QA: Call `logActivity('steps')` — stepsCount increments by 1500. Evidence `.omo/evidence/task-18-fittrack`
  Commit: Y | feat(data): AppContext with state and actions

### Wave 4: Screens
- [x] 19. Dashboard: Rings + Header
  What: `app/(tabs)/index.tsx` — header (greeting by time of day, avatar, calendar button), ActivityRings component with legend
  Must NOT: Hardcode athlete name — use `userProfile.name` from context
  Parallelization: Wave 4 | Blocked by: T06, T09, T18 | Blocks: T20, T21
  References: `reference/fittrack_vite_reference/src/components/DashboardTab.tsx:31-189`
  Acceptance: Rings display move/exercise/stand from context, greeting changes by hour
  QA: Change context rings values — rings update. Evidence `.omo/evidence/task-19-fittrack`
  Commit: Y | feat(dashboard): header, ActivityRings, greeting

- [x] 20. Dashboard: Bento Grid
  What: Bento grid below rings — Steps card (sparkline + Log button), Calories card, Heart Rate card (pulse animation). All in GlassCard containers. FAB for quick actions
  Must NOT: Hardcode values — read from AppContext
  Parallelization: Wave 4| Blocked by: T07, T14, T18 | Blocks: T21
  References: `reference/fittrack_vite_reference/src/components/DashboardTab.tsx:192-280`
  Acceptance: Steps from context, HR pulses (72±2), Cal from context, Log button calls logActivity
  QA: Tap Log on Steps card — steps increment. Evidence `.omo/evidence/task-20-fittrack`
  Commit: Y | feat(dashboard): bento metrics grid with charts

- [x] 21. Dashboard: Recent Workouts + Tip
  What: Recent Workouts horizontal scroll (GlassCard + image + category badge + duration/cal). Daily Training Tip glass-card with green left border
  Must NOT: Use real images — use urls from mockData
  Parallelization: Wave 4 | Blocked by: T07, T18 | Blocks: —
  References: `reference/fittrack_vite_reference/src/components/DashboardTab.tsx:282-343`
  Acceptance: 3 workout cards scroll horizontally, tap navigates to `/workout/[id]`, tip renders
  QA: Tap first workout — navigates to detail. Evidence `.omo/evidence/task-21-fittrack`
  Commit: Y | feat(dashboard): recent workouts and daily tip

- [x] 22. Workouts: Search + Filters
  What: `app/(tabs)/workouts.tsx` — search bar (pill, icon, clear button), filter chips ALL/BEGINNER/INTERMEDIATE/EXPERT. Filtering logic by difficulty mapping
  Must NOT: Filter on backend — all filtering is client-side on mockData
  Parallelization: Wave 4 | Blocked by: T06, T10 | Blocks: T23
  References: `reference/fittrack_vite_reference/src/components/WorkoutsTab.tsx:15-137`
  Acceptance: Search filters by title/category, chips filter by difficulty, both compose
  QA: Type "HIIT" — only HIIT workout shows. Tap "EXPERT" chip — only expert shows. Evidence `.omo/evidence/task-22-fittrack`
  Commit: Y | feat(workouts): search bar and difficulty filters

- [x] 23. Workouts: Category Grid + Daily Rec
  What: Bento grid of 5 categories (HIIT, Strength, Yoga, Cycling, Mobility) with images. Daily Recommendation block (Coach's Pick) with START NOW button
  Must NOT: Show empty states when search is active — search shows list, not grid
  Parallelization: Wave 4 | Blocked by: T07, T06 | Blocks: —
  References: `reference/fittrack_vite_reference/src/components/WorkoutsTab.tsx:139-276`
  Acceptance: Grid shows categories, Daily Rec has START NOW button
  QA: Tap Yoga card — navigates to `/workout/workout-zen-yoga`. Evidence `.omo/evidence/task-23-fittrack`
  Commit: Y | feat(workouts): category bento grid and daily recommendation

- [x] 24. Workout Detail: Hero + Info
  What: `app/workout/[id].tsx` — hero image (480px) with gradient overlay, ELITE/badge, category badge, title, description. Stats grid (Duration, Est. Burn) in GlassCards
  Must NOT: Show timer — only static detail
  Parallelization: Wave 4 | Blocked by: T06, T07 | Blocks: T25, T26
  References: `reference/fittrack_vite_reference/src/components/WorkoutDetailView.tsx:77-145`
  Acceptance: Workout data renders from mockData by `[id]` param
  QA: Navigate to `/workout/workout-morning-hiit` — hero and stats show. Evidence `.omo/evidence/task-24-fittrack`
  Commit: Y | feat(detail): workout hero and stats grid

- [x] 25. Workout Detail: Exercise List
  What: Exercise Routine section — list of ExerciseRow components (image, name, type, duration, chevron). Coach Pro Tip glass-card below
  Must NOT: Add start workout button logic yet
  Parallelization: Wave 4 | Blocked by: T07, T18 | Blocks: —
  References: `reference/fittrack_vite_reference/src/components/WorkoutDetailView.tsx:147-187`
  Acceptance: All exercises for the workout render in a scrollable list
  QA: Scroll exercises — 4 items for Morning HIIT. Evidence `.omo/evidence/task-25-fittrack`
  Commit: Y | feat(detail): exercise list and coach tip

- [x] 26. Workout Detail: Timer Overlay
  What: Full-screen timer overlay on Start Workout. Shows current exercise image, name, countdown ring (SVG), pause/resume, skip. Completion screen with stats + Return to Dashboard. Calls completeWorkout action
  Must NOT: Use real timers for background — demo mode with 10s per exercise
  Parallelization: Wave 4 | Blocked by: T09, T18 | Blocks: —
  References: `reference/fittrack_vite_reference/src/components/WorkoutDetailView.tsx:201-330`
  Acceptance: Start → timer ticks down → skip works → completion shows stats
  QA: Start workout, let timer run — completion screen appears. Evidence `.omo/evidence/task-26-fittrack`
  Commit: Y | feat(detail): workout timer overlay with countdown

- [x] 27. Stats: Layout + Segmented
  What: `app/(tabs)/stats/_layout.tsx` — Stack navigator with 3 routes. Header with Segmented Control. Active route detected via `usePathname()`. Routes: overview, goals, calendar. Add `app/(tabs)/stats.tsx` as redirect
  Must NOT: Use useState for subview switching — must use Expo Router navigation
  Parallelization: Wave 4 | Blocked by: T06, T10 | Blocks: T28-T30
  References: `.omo/spec.md:4`, `.omo/spec.md:7.4`
  Acceptance: Segmented Control switches between 3 routes, URL updates
  QA: Navigate to `/stats/goals` — URL changes, Goals content loads. Evidence `.omo/evidence/task-27-fittrack`
  Commit: Y | feat(stats): nested routes with SegmentedControl layout

- [x] 28. Stats: Overview
  What: `app/(tabs)/stats/overview.tsx` — Weekly/Monthly toggle, Total Distance + Avg Pace metrics, Daily Performance BarChart, Resting Heart Rate LineChart, Calories progress circle (SVG)
  Must NOT: Use real data — display mock values
  Parallelization: Wave 4 | Blocked by: T14, T18 | Blocks: —
  References: `reference/fittrack_vite_reference/src/components/StatsTab.tsx:110-308`
  Acceptance: Charts render, weekly/monthly toggle switches values
  QA: Toggle to Monthly — distance changes from 42.8 to 182.4. Evidence `.omo/evidence/task-28-fittrack`
  Commit: Y | feat(stats): overview with charts and metrics

- [x] 29. Stats: Goals
  What: `app/(tabs)/stats/goals.tsx` — GoalCard list (ProgressBar, category, title, target), Goal Performance mini chart, [+ Add Target Goal] dashed button → ModalOverlay with form. On submit → addGoal action
  Must NOT: Persist goals — in-memory only via context
  Parallelization: Wave 4 | Blocked by: T11, T13, T18 | Blocks: —
  References: `reference/fittrack_vite_reference/src/components/StatsTab.tsx:310-395`
  Acceptance: Goals list from context, Add Goal modal creates new goal
  QA: Fill title="Test Goal", target=10 → CREATE → new card appears. Evidence `.omo/evidence/task-29-fittrack`
  Commit: Y | feat(stats): goals list with add goal modal

- [x] 30. Stats: Calendar
  What: `app/(tabs)/stats/calendar.tsx` — month header with prev/next, CalendarGrid, day selection shows session detail (Calories, Avg HR, Effort). Rest day shows placeholder. Streak/Intensity mini-cards
  Must NOT: Use real dates from device — use October 2024 mock data
  Parallelization: Wave 4 | Blocked by: T15, T18 | Blocks: —
  References: `reference/fittrack_vite_reference/src/components/StatsTab.tsx:397-564`
  Acceptance: Calendar shows October 2024, tap day 8 shows HIIT & Strength details
  QA: Tap day 3 — Volt Cycling details appear. Evidence `.omo/evidence/task-30-fittrack`
  Commit: Y | feat(stats): calendar with session details

- [x] 31. Profile: Avatar + Stats
  What: `app/(tabs)/profile.tsx` — avatar with Volt border ring + glow + pulse, name + role + location, stats grid (Total Workouts, Current Streak)
  Must NOT: Use real images — use avatarUrl from mock
  Parallelization: Wave 4 | Blocked by: T06, T07 | Blocks: T32, T33
  References: `reference/fittrack_vite_reference/src/components/ProfileTab.tsx:48-93`
  Acceptance: Profile data from context, Volt ring pulses
  QA: Change context name — profile updates. Evidence `.omo/evidence/task-31-fittrack`
  Commit: Y | feat(profile): avatar, header and stats grid

- [x] 32. Profile: Records + Devices
  What: Personal Records horizontal scroll (medal cards with icon + value). [+ ADD NEW] → ModalOverlay form. Linked Devices list with toggle-status on tap
  Must NOT: Actually connect to devices — sync status is static mock
  Parallelization: Wave 4 | Blocked by: T13, T18 | Blocks: —
  References: `reference/fittrack_vite_reference/src/components/ProfileTab.tsx:95-164`
  Acceptance: Records scroll, Add Record modal works, Device tap toggles Synced/Disconnected
  QA: Tap Polar H10 — status changes to Synced. Evidence `.omo/evidence/task-32-fittrack`
  Commit: Y | feat(profile): personal records and linked devices

- [x] 33. Profile: Settings + Logout
  What: Settings rows (Account Security >, Push Notifications toggle, Privacy & Data >). Logout button → confirm modal (Cancel / Log Out)
  Must NOT: Actually sign out — show alert simulation only
  Parallelization: Wave 4 | Blocked by: T13 | Blocks: —
  References: `reference/fittrack_vite_reference/src/components/ProfileTab.tsx:166-310`
  Acceptance: Toggle switches on/off, Logout opens confirm modal, Cancel dismisses, Log Out shows alert
  QA: Toggle notifications OFF — switch moves. Tap Logout → Cancel — modal closes. Evidence `.omo/evidence/task-33-fittrack`
  Commit: Y | feat(profile): settings and logout flow

### Wave 5: Polish
- [x] 34. Haptics + Animations
  What: Add `expo-haptics impactAsync(Heavy)` to all VoltButtons, FAB, Start Workout. Reanimated entrance animations (fade-in-up) for GlassCards on Dashboard. Tab switch haptic
  Must NOT: Haptic on every touch — only primary actions
  Parallelization: Wave 5 | Blocked by: T07, T12 | Blocks: —
  References: `reference/fittrack_vite_reference/src/App.tsx`
  Acceptance: Pressing VoltButton triggers haptic, cards animate in
  QA: Press START WORKOUT — haptic fires (test on real device). Evidence `.omo/evidence/task-34-fittrack`
  Commit: Y | feat(polish): haptic feedback and entrance animations

- [x] 35. iOS Safe Areas
  What: Wrap all screens with `SafeAreaView`. Set `StatusBar style="light"`. Ensure content doesn't overlap Dynamic Island/notch. Proper padding (20px horizontal)
  Must NOT: Use `forceInset` or deprecated APIs
  Parallelization: Wave 5 | Blocked by: T06 | Blocks: —
  References: `app/_layout.tsx`
  Acceptance: Content renders within safe area bounds on iPhone 15 Pro simulator
  QA: Check top and bottom padding in simulator — no notch overlap. Evidence `.omo/evidence/task-35-fittrack`
  Commit: Y | fix(polish): iOS safe areas and status bar

- [x] 36. Splash + App Icon
  What: Update splash screen — black bg with logo (or minimal). Generate app icon via `npx expo-splash-screen` or manual asset replacement
  Must NOT: Spend time on complex splash animation — static only
  Parallelization: Wave 5 | Blocked by: T05 | Blocks: —
  References: `app.json`, `assets/`
  Acceptance: Splash shows black bg, app launches without flash
  QA: `npx expo run:ios` → splash → main screen. Evidence `.omo/evidence/task-36-fittrack`
  Commit: Y | config(polish): dark splash screen and app icon

- [x] 37. Final QA
  What: Full pass on iPhone 15 Pro and iPhone SE simulators. Verify all 5 screens, all interactions, data flow. Smoke test app.json config
  Must NOT: Skip any screen
  Parallelization: Wave 5 | Blocked by: All T19-T36 | Blocks: —
  References: `.omo/spec.md:7`, `.omo/tasks.md:acceptance`
  Acceptance: All acceptance criteria from T01-T36 pass
  QA: Walk through Dashboard → Workouts → Detail → Timer → Stats → Profile. Evidence `.omo/evidence/task-37-fittrack`
  Commit: Y | chore(qa): final verification pass

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [x] F1. Plan compliance audit — every todo acceptance met, no scope creep
- [x] F2. Code quality review — TypeScript strict, no `any`, components follow spec
- [x] F3. Real manual QA — iPhone Simulator walkthrough of all 5 screens
- [x] F4. Scope fidelity — no unauthorized features, Must-NOT-Have respected

## Commit strategy
- Each task commits independently when acceptance criteria pass
- Format: `type(scope): message` — feat, fix, config, chore
- No force-push, no --no-verify

## Success criteria
1. App launches on iOS Simulator with black background and Inter font
2. Dashboard shows Activity Rings with data from context
3. Workouts tab filters and searches correctly
4. Workout Detail shows hero, exercises, timer works
5. Stats has 3 working sub-views (Overview, Goals, Calendar)
6. Profile shows user data, devices toggle, settings work
7. All GlassCards have correct blur/border/radius
8. Volt buttons have #CCFF00 background with glow
9. Haptic feedback on primary actions
10. Content respects iOS safe areas
