/**
 * FamilyFit - API Integration Examples
 * 
 * Detta visar hur man integrerar externa träningsdata i FamilyFit
 * Kan användas med RapidAPI, Open APIs, eller egna servrar
 */

// ===== EXAMPLE 1: RapidAPI - RapidAPI Fitness Database =====
async function loadFromRapidAPI() {
  const rapidAPIOptions = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'YOUR_API_KEY',
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
  };

  try {
    // Hämta push exercises
    const response = await fetch(
      'https://exercisedb.p.rapidapi.com/exercises/equipment/barbell?limit=10',
      rapidAPIOptions
    );
    
    const exercises = await response.json();
    
    // Konvertera till FamilyFit format
    const converted = exercises.map(ex => ({
      name: ex.name.charAt(0).toUpperCase() + ex.name.slice(1),
      muscle: ex.target || 'General',
      type: ex.equipment || 'Machine',
      sets: 3,
      reps: '8-10',
      difficulty: 'Medium',
      equipment: ex.equipment || 'Barbell'
    }));
    
    // Lägg till i biblioteket
    if (converted.length > 0) {
      ExerciseDatabase.PUSH.push(...converted);
      console.log(`Laddade ${converted.length} övningar från API`);
    }
    
  } catch (error) {
    console.error('API Error:', error);
  }
}

// ===== EXAMPLE 2: Open API - wger.de (Open Exercise Database) =====
async function loadFromWgerAPI() {
  const baseUrl = 'https://wger.de/api/v2/exercise/';
  
  try {
    // Hämta övningar
    const response = await fetch(baseUrl + '?language=2&limit=100'); // Swedish language
    const data = await response.json();
    
    const exercises = data.results.map(ex => ({
      name: ex.name,
      muscle: ex.muscles_text ? ex.muscles_text[0] : 'General',
      type: 'Machine',
      sets: 3,
      reps: '10-12',
      difficulty: 'Easy',
      equipment: 'Machine'
    }));
    
    // Gruppera efter muskelgrupp
    const grouped = {};
    exercises.forEach(ex => {
      const muscle = ex.muscle || 'General';
      if (!grouped[muscle]) grouped[muscle] = [];
      grouped[muscle].push(ex);
    });
    
    console.log('Hämtat övningar grupperat per muskelgrupp:', grouped);
    
  } catch (error) {
    console.error('Wger API Error:', error);
  }
}

// ===== EXAMPLE 3: Egen JSON fil (Self-hosted) =====
async function loadFromLocalJSON() {
  try {
    const response = await fetch('/data/exercises.json');
    const customExercises = await response.json();
    
    // Merge med befintlig data
    if (customExercises.push) {
      ExerciseDatabase.PUSH.push(...customExercises.push);
    }
    if (customExercises.pull) {
      ExerciseDatabase.PULL.push(...customExercises.pull);
    }
    if (customExercises.legs) {
      ExerciseDatabase.LEGS.push(...customExercises.legs);
    }
    
    console.log('Lokala övningar laddade');
    
  } catch (error) {
    console.error('Local JSON Error:', error);
  }
}

// ===== EXAMPLE 4: Firebase Realtime Database =====
async function loadFromFirebase() {
  // Konfigurering (från Firebase console)
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    databaseURL: "https://your-project.firebaseio.com"
  };
  
  try {
    const response = await fetch(
      firebaseConfig.databaseURL + '/exercises.json'
    );
    const firebaseExercises = await response.json();
    
    // Konvertera Firebase format till FamilyFit format
    Object.entries(firebaseExercises).forEach(([key, exercise]) => {
      const split = exercise.category || 'Push';
      const formatted = {
        name: exercise.name,
        muscle: exercise.muscle,
        type: exercise.type || 'Machine',
        sets: exercise.sets || 3,
        reps: exercise.reps || '8-10',
        difficulty: exercise.difficulty || 'Medium',
        equipment: exercise.equipment
      };
      
      ExerciseDatabase.addExercise(split, formatted);
    });
    
    console.log('Firebase övningar laddade');
    
  } catch (error) {
    console.error('Firebase Error:', error);
  }
}

// ===== EXAMPLE 5: Egen Node.js/Express Server =====
async function loadFromOwnServer() {
  try {
    // Hämta från din egen server
    const response = await fetch('/api/exercises');
    const serverExercises = await response.json();
    
    // Processa och lägg till
    serverExercises.forEach(exercise => {
      ExerciseDatabase.addExercise(exercise.split, exercise);
    });
    
    console.log(`Laddade ${serverExercises.length} övningar från egen server`);
    
  } catch (error) {
    console.error('Server API Error:', error);
  }
}

// ===== EXAMPLE 6: GraphQL Query (t.ex. Apollo) =====
async function loadFromGraphQL() {
  const query = `
    query GetExercises {
      exercises(limit: 50) {
        id
        name
        muscle
        type
        sets
        reps
        difficulty
        equipment
      }
    }
  `;
  
  try {
    const response = await fetch('https://api.example.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    
    const { data } = await response.json();
    
    data.exercises.forEach(ex => {
      ExerciseDatabase.addExercise(ex.type, ex);
    });
    
    console.log('GraphQL övningar laddade');
    
  } catch (error) {
    console.error('GraphQL Error:', error);
  }
}

// ===== SMART INITIALIZATION FUNCTION =====
async function initializeTrainingLibrary() {
  console.log('Initialiserar FamilyFit Training Library...');
  
  // Försök i denna ordning
  const strategies = [
    { name: 'Local Storage Cache', fn: loadFromLocalStorageCache },
    { name: 'Local JSON', fn: loadFromLocalJSON },
    { name: 'Own Server', fn: loadFromOwnServer },
    { name: 'RapidAPI', fn: loadFromRapidAPI },
    { name: 'Wger API', fn: loadFromWgerAPI }
  ];
  
  for (const strategy of strategies) {
    try {
      console.log(`Försöker ladda från ${strategy.name}...`);
      await strategy.fn();
      console.log(`✓ Framgång med ${strategy.name}`);
      break;
    } catch (error) {
      console.warn(`✗ Misslyckades med ${strategy.name}:`, error.message);
      continue;
    }
  }
  
  console.log('Training Library initialiserad med', 
    ExerciseDatabase.PUSH.length + ExerciseDatabase.PULL.length + ExerciseDatabase.LEGS.length,
    'totala övningar');
}

// ===== CACHING STRATEGY =====
function cacheExercisesToLocalStorage() {
  const cacheData = {
    push: ExerciseDatabase.PUSH,
    pull: ExerciseDatabase.PULL,
    legs: ExerciseDatabase.LEGS,
    timestamp: Date.now()
  };
  
  localStorage.setItem('familyfit_exercise_cache', JSON.stringify(cacheData));
  console.log('Övningar cachade i localStorage');
}

function loadFromLocalStorageCache() {
  const cached = localStorage.getItem('familyfit_exercise_cache');
  
  if (cached) {
    const data = JSON.parse(cached);
    const age = Date.now() - data.timestamp;
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    
    if (age < oneWeek) {
      // Cache är mindre än en vecka gammal, använd den
      ExerciseDatabase.PUSH = data.push || ExerciseDatabase.PUSH;
      ExerciseDatabase.PULL = data.pull || ExerciseDatabase.PULL;
      ExerciseDatabase.LEGS = data.legs || ExerciseDatabase.LEGS;
      console.log('Övningar laddade från cache');
      return true;
    }
  }
  
  return false;
}

// ===== DATA FORMAT CONVERTERS =====

// Konvertera från RapidAPI format
function convertRapidAPIFormat(rapidData) {
  return {
    name: rapidData.name,
    muscle: rapidData.target,
    type: rapidData.equipment,
    sets: 3,
    reps: '8-10',
    difficulty: 'Medium',
    equipment: rapidData.equipment
  };
}

// Konvertera från Wikipedia/DBpedia format
function convertDBpediaFormat(dbData) {
  return {
    name: dbData.title,
    muscle: dbData.targetMuscle,
    type: 'General',
    sets: 3,
    reps: '8-10',
    difficulty: 'Medium',
    equipment: 'Variable'
  };
}

// ===== BATCH IMPORT =====
async function importExercisesFromCSV(csvUrl) {
  try {
    const response = await fetch(csvUrl);
    const csv = await response.text();
    
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    
    lines.slice(1).forEach(line => {
      if (!line.trim()) return;
      
      const values = line.split(',');
      const exercise = {};
      
      headers.forEach((header, idx) => {
        exercise[header.trim()] = values[idx].trim();
      });
      
      // Lägg till i rätt split
      const split = exercise.type || 'Push';
      ExerciseDatabase.addExercise(split, exercise);
    });
    
    console.log('CSV övningar importerade');
    
  } catch (error) {
    console.error('CSV Import Error:', error);
  }
}

// ===== MONITORING & LOGGING =====
function logExerciseStats() {
  console.log('=== FamilyFit Exercise Database Stats ===');
  console.log('Push exercises:', ExerciseDatabase.PUSH.length);
  console.log('Pull exercises:', ExerciseDatabase.PULL.length);
  console.log('Leg exercises:', ExerciseDatabase.LEGS.length);
  console.log('Core exercises:', ExerciseDatabase.CORE ? ExerciseDatabase.CORE.length : 0);
  console.log('Total:', 
    ExerciseDatabase.PUSH.length + 
    ExerciseDatabase.PULL.length + 
    ExerciseDatabase.LEGS.length + 
    (ExerciseDatabase.CORE ? ExerciseDatabase.CORE.length : 0)
  );
  
  // Muskelgrupp distribution
  const muscles = {};
  [...ExerciseDatabase.PUSH, ...ExerciseDatabase.PULL, ...ExerciseDatabase.LEGS].forEach(ex => {
    muscles[ex.muscle] = (muscles[ex.muscle] || 0) + 1;
  });
  
  console.log('Muscle groups:', muscles);
}

// ===== USAGE IN HTML =====
/*
<script src="training-library.js"></script>
<script src="api-integration.js"></script>

<script>
  // Auto-initialize on page load
  window.addEventListener('DOMContentLoaded', async () => {
    await initializeTrainingLibrary();
    logExerciseStats();
    
    // Nu är ExerciseDatabase och TrainingTemplates redo att användas
    const program = TrainingTemplates.createProgram(4, 'Min träning', 8);
    console.log(program);
  });
</script>
*/

// ===== EXPORT =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadFromRapidAPI,
    loadFromWgerAPI,
    loadFromLocalJSON,
    loadFromFirebase,
    loadFromOwnServer,
    loadFromGraphQL,
    initializeTrainingLibrary,
    cacheExercisesToLocalStorage,
    loadFromLocalStorageCache,
    importExercisesFromCSV,
    logExerciseStats
  };
}
