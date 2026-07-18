# FitTrack Implementation Roadmap

> **Total:** ~11h (36 задач по ~18min)
> **Full-time:** 3-4 дня | **Part-time:** 1-1.5 недели

---

## Phase 0: Environment & Theme (1.5h)

```
T01 [NativeWind] ─── 18min
T02 [Install deps] ── 10min
T03 [Theme] ───────── 15min
T04 [Font Inter] ──── 15min
T05 [app.config] ──── 10min
```

**Checkpoint:** `npx expo start` → черный фон + Inter.

---

## Phase 1: Design System & Components (3h)

```
T06 [Tabs 4x] ─────── 20min
T07 [Glass+Button] ─── 20min
T08 [Typography] ───── 15min
T09 [ActivityRings] ── 25min ◀ hardest
T10 [Segm+Chip] ────── 15min
T11 [Progress+Badge] ─ 15min
T12 [FAB+Menu] ─────── 20min
T13 [ModalOverlay] ─── 15min
T14 [Charts] ───────── 25min
T15 [CalendarGrid] ─── 20min
```

**Checkpoint:** Все UI-компоненты Preview-ready.

---

## Phase 2: Data Layer (1h)

```
T16 [Types] ────── 15min
T17 [Mock data] ─── 20min
T18 [Context] ───── 15min
```

**Checkpoint:** `console.log(AppState)` → все данные.

---

## Phase 3: Screens (4.5h)

### 3a: Dashboard (1h)
```
T19 [Rings] ──────── 20min
T20 [Bento grid] ──── 20min
T21 [Recent+Tip] ──── 20min
```

### 3b: Workouts (40min)
```
T22 [Search+filters] ── 20min
T23 [Grid+DailyRec] ─── 20min
```

### 3c: Workout Detail (1h)
```
T24 [Hero+stats] ──── 20min
T25 [Exercise list] ── 15min
T26 [Timer overlay] ── 25min
```

### 3d: Stats (1h)
```
T27 [Layout+Segmented] ─ 15min   ← stats/_layout.tsx
T28 [Overview] ─────────── 20min
T29 [Goals] ───────────── 20min
T30 [Calendar] ────────── 20min
```

### 3e: Profile (50min)
```
T31 [Avatar+stats] ─── 15min
T32 [Records+Devices] ─ 20min
T33 [Settings+Logout] ─ 15min
```

**Checkpoint:** Full tab walkthrough → data flow works.

---

## Phase 4: Polish & QA (1.5h)

```
T33 [Haptics+Anims] ── 25min
T34 [SafeAreas] ────── 15min
T35 [Splash] ───────── 15min
T36 [Final QA] ─────── 20min
```

**Checkpoint:** iPhone Simulator → premium feel.

---

## Timeline

```
Week 1                    Week 2
┌──────┬──────┬──────┬──────┬──────┬──────┐
│ Ph0  │ Ph1  │ Ph1  │ Ph2  │ Ph3  │ Ph3  │
│ Env  │ Des  │ Comp │ Data │ Scr  │ Scr  │
│ 1.5h │ 2h   │ 1h   │ 1h   │ 2h   │ 2h   │
└──────┴──────┴──────┴──────┴──────┴──────┘
              │                    │
        Design freeze          Feature freeze

         Week 3
┌──────┬──────┐
│ Ph3  │ Ph4  │
│ .5h  │ 1.5h │
└──────┴──────┘
          │
      Ship-ready
```

## MVP in 1 Day

```
T01-T05 (Setup)     → 1.5h
T06-T08 (Nav+Core)  → 1h
T16-T18 (Data)      → 1h
T19-T21 (Dashboard) → 1h
T34 (SafeArea)      → 15min
────────────────────────────
≈4h → working Dashboard
```
