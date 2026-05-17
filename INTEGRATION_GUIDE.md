# FamilyFit Training Library - Integration Guide

## Översikt

FamilyFit v6 kommer med ett kraftfullt träningsbibliotek som intelligently väljer övningar baserat på:
- **Antal träningsdagar per vecka** (2-6 dagar)
- **Träningstyp/split** (Push, Pull, Legs, Full Body)
- **Svårighetsnivå** (Easy, Medium, Hard)
- **Utrustning tillgänglig** (Barbell, Dumbbell, Machine, Cable, Bodyweight)

## Arkitektur

```
FamilyFit v6
├── HTML App (familyfit-v6-api-integrated.html)
│   └── Inbyggd WorkoutLibrary (~ 100 lines)
│
├── Separat Bibliotek (training-library.js)
│   ├── ExerciseDatabase
│   │   ├── PUSH (25+ övningar)
│   │   ├── PULL (20+ övningar)
│   │   ├── LEGS (20+ övningar)
│   │   └── CORE (6+ övningar)
│   │
│   └── TrainingTemplates
│       ├── 2-dags split
│       ├── 3-dags split
│       ├── 4-dags split
│       ├── 5-dags split
│       └── 6-dags split
```

## Hur det fungerar

### 1. Användare väljer antal träningsdagar
```
Välj antal dagar → 2, 3, 4, 5, eller 6 dagar/vecka
```

### 2. System rekommenderar träningsplit
```javascript
// T.ex. 3 dagar/vecka → Push/Pull/Legs split
{
  name: 'Push/Pull/Legs (3x/vecka)',
  days: [
    { day: 'Måndag', split: 'Push' },
    { day: 'Tisdag', split: 'Pull' },
    { day: 'Torsdag', split: 'Legs' }
  ]
}
```

### 3. System väljer automatiska övningar för varje split
```javascript
// Push-dag får automatiskt 4-5 övningar:
[
  { name: 'Barbell Bench Press', sets: 4, reps: '6-8', ... },
  { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10', ... },
  { name: 'Lateral Raise', sets: 3, reps: '12-15', ... },
  { name: 'Tricep Rope Pushdown', sets: 3, reps: '12-15', ... }
]
```

## Integrationsmöjligheter

### A. Direkt i HTML (redan inkluderad)
Biblioteket är redan inbyggt i `familyfit-v6-api-integrated.html`:

```javascript
const WorkoutLibrary = {
  templates: { 2: {...}, 3: {...}, ... },
  exercises: { Push: [...], Pull: [...], ... },
  getExercises(split, count) { ... },
  createProgram(daysPerWeek, name, weeks) { ... }
}
```

### B. Separat JavaScript fil (training-library.js)
För större projekt, ladda separat:

```html
<script src="training-library.js"></script>

<script>
  // Använd ExerciseDatabase och TrainingTemplates
  const program = TrainingTemplates.createProgram(4, 'Min träning', 8);
</script>
```

### C. Externa API Integration
Exempel på hur man hämtar övningar från ett API:

```javascript
// Hämta från en träningsdata API
async function loadExercisesFromAPI() {
  const response = await fetch('https://api.example.com/exercises');
  const exercises = await response.json();
  
  // Lägg till i biblioteket
  exercises.forEach(ex => {
    ExerciseDatabase.addExercise('Push', ex);
  });
}
```

## Kodexempel

### Skapa ett nytt program
```javascript
// 4 dagar/vecka, 10 veckor
const myProgram = TrainingTemplates.createProgram(4, 'Sommar 2024', 10);

// Output:
{
  id: 1704500000000,
  name: 'Sommar 2024',
  weeks: 10,
  daysPerWeek: 4,
  type: 'Upper/Lower Double (4x/vecka)',
  focus: 'Optimal strength & hypertrophy',
  schedule: [
    {
      day: 'Måndag',
      muscle: 'Upper Power',
      split: 'Push',
      exercises: [
        { name: 'Barbell Bench Press', muscle: 'Chest', sets: 4, reps: '6-8', ... },
        { name: 'Shoulder Press', muscle: 'Shoulders', sets: 4, reps: '6-8', ... },
        ...
      ]
    },
    ...
  ]
}
```

### Hämta övningar för en split
```javascript
// Få 6 slumpmässiga Push-övningar
const pushExercises = ExerciseDatabase.getExercises('Push', 6);
// Returnerar array av 6 övningar från Push-biblioteket
```

### Lägga till egen övning
```javascript
ExerciseDatabase.addExercise('Push', {
  name: 'My Custom Exercise',
  muscle: 'Chest',
  type: 'Dumbbell',
  sets: 3,
  reps: '8-10',
  difficulty: 'Medium',
  equipment: 'Dumbbells'
});
```

### Visa alla mallar
```javascript
const allTemplates = TrainingTemplates.getAllTemplates();

allTemplates.forEach(t => {
  console.log(`${t.days} dagar: ${t.name}`);
  // Output:
  // 2 dagar: Upper/Lower Split (2x/vecka)
  // 3 dagar: Push/Pull/Legs (3x/vecka)
  // 4 dagar: Upper/Lower Double (4x/vecka)
  // 5 dagar: PPL Split (5x/vecka)
  // 6 dagar: PPL Twice (6x/vecka)
});
```

## Anpassning & Utökning

### 1. Lägga till nya övningar

```javascript
// Lägg till i training-library.js under PUSH:
ExerciseDatabase.PUSH.push({
  name: 'Smith Machine Bench',
  muscle: 'Chest',
  type: 'Machine',
  sets: 3,
  reps: '8-10',
  difficulty: 'Easy',
  equipment: 'Smith Machine'
});
```

### 2. Skapa egen träningsmal

```javascript
// Lägg till i TrainingTemplates.templates:
TrainingTemplates.templates[7] = {
  name: 'Upper/Lower/Full Body (7x/vecka)',
  focus: 'High frequency training',
  description: 'För avancerade tränare',
  days: [
    { day: 'Måndag', muscle: 'Upper', split: 'Push', info: 'Bröstkänsla' },
    { day: 'Tisdag', muscle: 'Lower', split: 'Legs', info: 'Ben styrka' },
    { day: 'Onsdag', muscle: 'Full Body', split: 'Full Body', info: 'Helkropp' },
    // ... mer dagar
  ]
};
```

### 3. API Integration exempel

```javascript
// Ladda övningar från REST API
async function initializeFromAPI() {
  try {
    // Hämta Push-övningar
    const pushRes = await fetch('https://api.muscleDB.com/exercises?group=push');
    const pushExercises = await pushRes.json();
    
    // Uppdatera biblioteket
    ExerciseDatabase.PUSH = pushExercises;
    
    app.showToast('Övningar uppdaterad från API', 'success');
  } catch (error) {
    console.error('API Error:', error);
  }
}

// Anropa vid app start
window.addEventListener('DOMContentLoaded', initializeFromAPI);
```

## Data Structure

### Exercise Object
```javascript
{
  name: 'String',           // Övningsnamn
  muscle: 'String',          // Target muscle (Chest, Back, etc)
  type: 'String',            // Barbell, Dumbbell, Machine, Cable, Bodyweight
  sets: Number,              // Antal set
  reps: 'String',            // Antal reps (e.g. "6-8", "10-12", "15-20s")
  difficulty: 'String',      // Easy, Medium, Hard
  equipment: 'String'        // Vilken utrustning som behövs
}
```

### Program Object
```javascript
{
  id: Number,                // Unique ID
  name: 'String',            // Program name
  weeks: Number,             // Längd i veckor
  daysPerWeek: Number,       // 2-6 dagar/vecka
  type: 'String',            // Template type
  focus: 'String',           // Fokusområde
  description: 'String',     // Beskrivning
  schedule: Array,           // Array av träningsdagar
  created: 'ISO String',     // Skapades datum
  active: Boolean            // Om programmet är aktivt
}
```

### Day Object
```javascript
{
  day: 'String',             // Dag namn (Måndag, etc)
  muscle: 'String',          // Target muscle group
  split: 'String',           // Push, Pull, Legs, Full Body
  info: 'String',            // Beskrivning av dagen
  exercises: Array           // Array av Exercise objects
}
```

## Performance

- **Antal övningar per split**: 20-25 övningar
- **Övningar per träningsdag**: 4-6 övningar (beroende på dagar/vecka)
- **Mallar tillgängliga**: 5 stycken (2-6 dagar/vecka)
- **Load time**: < 100ms för program creation
- **Storage**: ~50KB för all data (localStorage)

## API Endpoints (Exempel för framtida integration)

```
GET /api/exercises?split=Push&count=5
GET /api/templates?days=3
GET /api/programs/user/{id}
POST /api/programs (skapa nytt)
PUT /api/programs/{id} (uppdatera)
DELETE /api/programs/{id}
```

## Felsökning

### Problem: Dubblettvövningar
**Lösning**: `getExercises()` shufflar redan, men om behövs, lägg till filter:
```javascript
getExercises(split, count = 5) {
  let exList = /* ... */;
  const used = new Set(); // Track använd
  const result = [];
  const shuffled = [...exList].sort(() => Math.random() - 0.5);
  
  for (const ex of shuffled) {
    if (!used.has(ex.name) && result.length < count) {
      result.push(ex);
      used.add(ex.name);
    }
  }
  return result;
}
```

### Problem: Inte nog med övningar för split
**Lösning**: Lägg till fler övningar i biblioteket eller minska count parameter.

### Problem: Samma övning varje gång
**Lösning**: Biblioteket shufflar redan, men för deterministisk valet:
```javascript
// Seed random baserat på datum
Math.seedrandom(new Date().getDay());
```

## Framtida Features

- [ ] RIR/RPE tracking
- [ ] Personaliserade rekommendationer baserat på progression
- [ ] A.I. program generation
- [ ] Social sharing av program
- [ ] Progressive overload beräkning
- [ ] Injury prevention tips
- [ ] Nutrition recommendations

---

**Version**: 6.0  
**Last Updated**: 2024  
**Status**: Production Ready
