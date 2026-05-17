# FamilyFit v6 - System Architecture

## 🏗️ Arkitektur Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      FamilyFit v6                           │
│                   (familyfit-v6-api-integrated.html)        │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
        ┌───────▼──────┐ ┌───▼────────┐ ┌─▼──────────┐
        │ UI Components│ │ State Mgmt │ │ Libraries  │
        └───────┬──────┘ └───┬────────┘ └─┬──────────┘
                │             │             │
        ┌───────▼──────────────▼─────────────▼──────────┐
        │      WorkoutLibrary (Built-in)               │
        │  ├─ templates (2-6 dagar)                   │
        │  ├─ exercises (80+ övningar)                │
        │  ├─ getExercises(split, count)             │
        │  └─ createProgram(days, name, weeks)       │
        └───────┬──────────────────────────────────────┘
                │
    ┌───────────┴───────────┐
    │                       │
┌───▼──────────┐  ┌────────▼─────────┐
│ Training     │  │ External APIs    │
│ Library      │  │ (Optional)       │
│ (JS File)    │  │                  │
└───┬──────────┘  └────────┬─────────┘
    │                      │
    ├─ Push exercises      ├─ RapidAPI
    ├─ Pull exercises      ├─ Wger.de
    ├─ Leg exercises       ├─ Firebase
    └─ Core exercises      ├─ Own Server
                           └─ GraphQL
                           
        ┌──────────────────────┐
        │   LocalStorage       │
        │  (Persistence)       │
        └──────────────────────┘
```

## 📦 Component Structure

### 1. Frontend Layer
```
App
├── Login Page
│   ├─ Solo mode
│   └─ Family selection
│
├── Dashboard
│   ├─ Active program display
│   ├─ Statistics
│   └─ Quick start button
│
├── Programs View
│   ├─ List programs
│   ├─ Create program
│   ├─ Edit program
│   └─ Delete program
│
├── Workout View
│   ├─ Exercise list
│   ├─ Set logging
│   └─ Completion tracking
│
├── History View
│   ├─ Workout log
│   └─ Statistics
│
└── Settings
    ├─ User info
    ├─ Family management
    └─ Preferences
```

### 2. Data Layer
```
State {
  currentUser: { name, familyId, memberId }
  currentView: string
  families: Array<Family>
  programs: Array<Program>
  currentWorkout: Workout | null
  workoutHistory: Array<Workout>
}

Program {
  id: number
  name: string
  weeks: number
  daysPerWeek: number
  type: string
  focus: string
  schedule: Array<Day>
  created: ISO string
  active: boolean
}

Day {
  day: string
  muscle: string
  split: string
  exercises: Array<Exercise>
}

Exercise {
  name: string
  muscle: string
  type: string
  sets: number
  reps: string
  difficulty: string
  equipment: string
}

Workout {
  id: number
  day: string
  muscle: string
  exercises: Array<Exercise>
  date: ISO string
  startTime: ISO string
  completed: number
  total: number
}
```

### 3. Business Logic Layer
```
WorkoutLibrary
├─ templates: Object (2-6 dagar)
├─ exercises: Object (Push, Pull, Legs, Core)
├─ getExercises(split, count)
├─ getTemplate(daysPerWeek)
└─ createProgram(daysPerWeek, name, weeks)

TrainingTemplates (Optional JS file)
├─ templates: Object
├─ getTemplate(daysPerWeek)
├─ createProgram(daysPerWeek, name, weeks)
└─ getAllTemplates()

ExerciseDatabase (Optional JS file)
├─ PUSH: Array<Exercise>
├─ PULL: Array<Exercise>
├─ LEGS: Array<Exercise>
├─ CORE: Array<Exercise>
├─ getExercises(split, count)
└─ addExercise(split, exercise)
```

### 4. Integration Layer (Optional)
```
API Connectors
├─ RapidAPI Fitness DB
│  └─ GET /exercises?equipment=barbell
│
├─ Wger.de (Open)
│  └─ GET /exercise/?language=2&limit=100
│
├─ Firebase Realtime
│  └─ GET /exercises.json
│
├─ Own Server
│  └─ GET /api/exercises
│
├─ GraphQL
│  └─ QUERY { exercises { ... } }
│
└─ CSV Import
   └─ Parse CSV → Convert → Add
```

## 🔄 Data Flow

### Creating a Program
```
User selects days/week
        ↓
System shows template info
        ↓
User enters program name + weeks
        ↓
System calls WorkoutLibrary.createProgram()
        ↓
For each day:
  - Get template split (Push/Pull/Legs)
  - Call getExercises(split, count)
  - Randomly shuffle exercises
        ↓
Create Program object with:
  - Metadata (name, weeks, daysPerWeek)
  - Full schedule with exercises
        ↓
Save to localStorage
        ↓
Update UI
```

### Starting a Workout
```
User clicks "Start Workout"
        ↓
System gets active program
        ↓
Gets first scheduled day
        ↓
Creates Workout object with:
  - Day name & muscle
  - All exercises from that day
  - Empty completed array
        ↓
Switch to workout view
        ↓
User logs sets
        ↓
User marks exercise complete
        ↓
User finishes workout
        ↓
Save to workoutHistory
        ↓
Update statistics
        ↓
Back to dashboard
```

## 🎯 Feature Matrix

| Feature | HTML Only | + training-library.js | + API Integration |
|---------|-----------|----------------------|------------------|
| Create programs | ✅ | ✅ | ✅ |
| 2-6 dagar/vecka | ✅ | ✅ | ✅ |
| 80+ övningar | ✅ | ✅ | ✅+ |
| Track workouts | ✅ | ✅ | ✅ |
| History | ✅ | ✅ | ✅ |
| Family mode | ✅ | ✅ | ✅ |
| Custom exercises | ❌ | ✅ | ✅ |
| API integration | ❌ | ❌ | ✅ |
| Cache strategy | ✅ | ✅ | ✅ |
| Responsive UI | ✅ | ✅ | ✅ |

## 📊 Database Schema (localStorage)

```json
{
  "familyfit_state": {
    "currentUser": {
      "name": "Johan",
      "familyId": 123456,
      "memberId": 123457
    },
    "families": [
      {
        "id": 123456,
        "name": "Andersson",
        "members": [
          { "id": 123457, "name": "Johan" },
          { "id": 123458, "name": "Maria" }
        ]
      }
    ],
    "programs": [
      {
        "id": 1704500000000,
        "name": "Sommar 2024",
        "weeks": 8,
        "daysPerWeek": 4,
        "type": "Upper/Lower Double (4x/vecka)",
        "focus": "Optimal strength & hypertrophy",
        "active": true,
        "schedule": [
          {
            "day": "Måndag",
            "muscle": "Upper Power",
            "split": "Push",
            "exercises": [
              {
                "name": "Barbell Bench Press",
                "muscle": "Chest",
                "type": "Barbell",
                "sets": 4,
                "reps": "6-8"
              }
            ]
          }
        ]
      }
    ],
    "workoutHistory": [
      {
        "id": 1704600000000,
        "day": "Måndag",
        "muscle": "Upper Power",
        "exercises": [...],
        "date": "2024-01-07T10:30:00Z",
        "startTime": "2024-01-07T10:30:00Z",
        "completed": 4,
        "total": 4
      }
    ]
  },
  "familyfit_exercise_cache": {
    "push": [...],
    "pull": [...],
    "legs": [...],
    "timestamp": 1704500000000
  }
}
```

## 🔌 API Integration Points

```javascript
// 1. On app initialization
initializeTrainingLibrary()
  ├─ Check localStorage cache
  ├─ Try local JSON
  ├─ Try own server
  ├─ Try RapidAPI
  └─ Fallback to built-in data

// 2. When creating program
createProgram()
  └─ Uses ExerciseDatabase.getExercises()
     └─ Gets from cache or dynamically loaded data

// 3. Caching strategy
- Cache exercises for 7 days
- Cache is updated on app init
- Manual cache clear available
```

## 🚀 Deployment Options

### Option 1: Simple (No backend)
```
Host familyfit-v6-api-integrated.html
└─ Everything runs client-side
└─ Data stored in localStorage
```

### Option 2: With Libraries
```
Host:
  ├─ familyfit-v6-api-integrated.html
  ├─ training-library.js
  └─ api-integration-examples.js
└─ Load libraries dynamically
```

### Option 3: Full Stack
```
Frontend:
  ├─ familyfit-v6-api-integrated.html
  ├─ training-library.js
  └─ api-integration-examples.js

Backend:
  ├─ REST API (/api/exercises, /api/programs)
  ├─ Database (exercises, user data)
  └─ Auth (optional)

Services:
  ├─ Firebase (optional)
  ├─ Cloud Storage (optional)
  └─ CDN (optional)
```

## 📈 Scalability

### Current Limits
- Max exercises: ~500 (before performance impact)
- Max programs: Unlimited (localStorage ~10MB limit)
- Max workouts: ~5000 (before storage full)
- Load time: < 1 second

### Future Optimization
- Split data into multiple localStorage keys
- Implement IndexedDB for larger datasets
- Lazy load exercises on demand
- Implement pagination for history

## 🔐 Security Considerations

- No sensitive data in localStorage (no passwords)
- All client-side (no server vulnerabilities)
- Optional auth layer if backend added
- CORS handling for API integrations

---

**Architecture Version**: 6.0  
**Last Updated**: 2024  
**Status**: Production Ready ✅
