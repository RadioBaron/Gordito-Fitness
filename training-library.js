/**
 * FamilyFit Exercise & Template Library
 * Denna fil kan enkelt uppdateras med API data eller nya övningar
 * Kan integreras i HTML eller laddas externt
 */

const ExerciseDatabase = {
  // ===== PUSH ÖVNINGAR (Bröst, Axlar, Triceps) =====
  PUSH: [
    // Bröstymnor
    { name: 'Barbell Bench Press', muscle: 'Chest', type: 'Barbell', sets: 4, reps: '6-8', difficulty: 'Hard', equipment: 'Barbell' },
    { name: 'Incline Barbell Bench', muscle: 'Chest', type: 'Barbell', sets: 3, reps: '6-8', difficulty: 'Hard', equipment: 'Barbell' },
    { name: 'Dumbbell Bench Press', muscle: 'Chest', type: 'Dumbbell', sets: 4, reps: '8-10', difficulty: 'Medium', equipment: 'Dumbbells' },
    { name: 'Incline Dumbbell Press', muscle: 'Chest', type: 'Dumbbell', sets: 3, reps: '8-10', difficulty: 'Medium', equipment: 'Dumbbells' },
    { name: 'Machine Chest Press', muscle: 'Chest', type: 'Machine', sets: 3, reps: '10-12', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Chest Fly Machine', muscle: 'Chest', type: 'Machine', sets: 3, reps: '10-15', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Cable Chest Fly', muscle: 'Chest', type: 'Cable', sets: 3, reps: '12-15', difficulty: 'Easy', equipment: 'Cable' },
    { name: 'Push-ups', muscle: 'Chest', type: 'Bodyweight', sets: 3, reps: '8-15', difficulty: 'Medium', equipment: 'Bodyweight' },
    
    // Axelövningar
    { name: 'Barbell Military Press', muscle: 'Shoulders', type: 'Barbell', sets: 4, reps: '6-8', difficulty: 'Hard', equipment: 'Barbell' },
    { name: 'Dumbbell Shoulder Press', muscle: 'Shoulders', type: 'Dumbbell', sets: 4, reps: '6-10', difficulty: 'Medium', equipment: 'Dumbbells' },
    { name: 'Machine Shoulder Press', muscle: 'Shoulders', type: 'Machine', sets: 3, reps: '8-12', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Lateral Raise', muscle: 'Shoulders', type: 'Dumbbell', sets: 3, reps: '12-15', difficulty: 'Easy', equipment: 'Dumbbells' },
    { name: 'Machine Lateral Raise', muscle: 'Shoulders', type: 'Machine', sets: 3, reps: '10-12', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Cable Lateral Raise', muscle: 'Shoulders', type: 'Cable', sets: 3, reps: '12-15', difficulty: 'Easy', equipment: 'Cable' },
    { name: 'Front Raise', muscle: 'Shoulders', type: 'Dumbbell', sets: 3, reps: '10-12', difficulty: 'Easy', equipment: 'Dumbbells' },
    { name: 'Upright Rows', muscle: 'Shoulders', type: 'Barbell', sets: 3, reps: '8-10', difficulty: 'Medium', equipment: 'Barbell' },
    
    // Triceps
    { name: 'Tricep Dips', muscle: 'Triceps', type: 'Bodyweight', sets: 3, reps: '6-12', difficulty: 'Hard', equipment: 'Bodyweight' },
    { name: 'Assisted Tricep Dips', muscle: 'Triceps', type: 'Machine', sets: 3, reps: '8-12', difficulty: 'Medium', equipment: 'Machine' },
    { name: 'Tricep Rope Pushdown', muscle: 'Triceps', type: 'Cable', sets: 3, reps: '12-15', difficulty: 'Easy', equipment: 'Cable' },
    { name: 'Tricep V-Bar Pushdown', muscle: 'Triceps', type: 'Cable', sets: 3, reps: '10-12', difficulty: 'Easy', equipment: 'Cable' },
    { name: 'Overhead Tricep Extension', muscle: 'Triceps', type: 'Dumbbell', sets: 3, reps: '10-12', difficulty: 'Medium', equipment: 'Dumbbells' },
    { name: 'Skull Crushers', muscle: 'Triceps', type: 'Dumbbell', sets: 3, reps: '8-12', difficulty: 'Medium', equipment: 'Dumbbells' },
    { name: 'Barbell Skull Crushers', muscle: 'Triceps', type: 'Barbell', sets: 3, reps: '8-10', difficulty: 'Medium', equipment: 'Barbell' },
    { name: 'Close Grip Bench Press', muscle: 'Triceps', type: 'Barbell', sets: 3, reps: '6-10', difficulty: 'Medium', equipment: 'Barbell' }
  ],

  // ===== PULL ÖVNINGAR (Rygg, Biceps) =====
  PULL: [
    // Ryggövningar
    { name: 'Barbell Deadlift', muscle: 'Back', type: 'Barbell', sets: 3, reps: '5-6', difficulty: 'Hard', equipment: 'Barbell' },
    { name: 'Romanian Deadlift', muscle: 'Back', type: 'Barbell', sets: 3, reps: '6-8', difficulty: 'Medium', equipment: 'Barbell' },
    { name: 'Barbell Rows', muscle: 'Back', type: 'Barbell', sets: 4, reps: '6-8', difficulty: 'Hard', equipment: 'Barbell' },
    { name: 'Dumbbell Rows', muscle: 'Back', type: 'Dumbbell', sets: 4, reps: '8-10', difficulty: 'Medium', equipment: 'Dumbbells' },
    { name: 'Seal Rows', muscle: 'Back', type: 'Dumbbell', sets: 3, reps: '8-10', difficulty: 'Medium', equipment: 'Dumbbells' },
    { name: 'Machine Rows', muscle: 'Back', type: 'Machine', sets: 3, reps: '8-12', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Cable Rows', muscle: 'Back', type: 'Cable', sets: 3, reps: '10-12', difficulty: 'Easy', equipment: 'Cable' },
    { name: 'Pull-ups', muscle: 'Back', type: 'Bodyweight', sets: 3, reps: '6-12', difficulty: 'Hard', equipment: 'Bodyweight' },
    { name: 'Assisted Pull-ups', muscle: 'Back', type: 'Machine', sets: 3, reps: '8-12', difficulty: 'Medium', equipment: 'Machine' },
    { name: 'Lat Pulldown', muscle: 'Back', type: 'Machine', sets: 3, reps: '8-12', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Wide Grip Lat Pulldown', muscle: 'Back', type: 'Machine', sets: 3, reps: '10-12', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Close Grip Lat Pulldown', muscle: 'Back', type: 'Machine', sets: 3, reps: '10-12', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Face Pulls', muscle: 'Back', type: 'Cable', sets: 3, reps: '15-20', difficulty: 'Easy', equipment: 'Cable' },
    { name: 'Reverse Fly Machine', muscle: 'Back', type: 'Machine', sets: 3, reps: '10-12', difficulty: 'Easy', equipment: 'Machine' },
    
    // Biceps
    { name: 'Barbell Curl', muscle: 'Biceps', type: 'Barbell', sets: 3, reps: '8-10', difficulty: 'Medium', equipment: 'Barbell' },
    { name: 'Dumbbell Curl', muscle: 'Biceps', type: 'Dumbbell', sets: 3, reps: '8-12', difficulty: 'Easy', equipment: 'Dumbbells' },
    { name: 'Hammer Curls', muscle: 'Biceps', type: 'Dumbbell', sets: 3, reps: '10-12', difficulty: 'Easy', equipment: 'Dumbbells' },
    { name: 'Incline Dumbbell Curl', muscle: 'Biceps', type: 'Dumbbell', sets: 3, reps: '8-12', difficulty: 'Medium', equipment: 'Dumbbells' },
    { name: 'Machine Curl', muscle: 'Biceps', type: 'Machine', sets: 3, reps: '10-12', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Cable Curl', muscle: 'Biceps', type: 'Cable', sets: 3, reps: '10-15', difficulty: 'Easy', equipment: 'Cable' },
    { name: 'EZ Bar Curl', muscle: 'Biceps', type: 'Barbell', sets: 3, reps: '8-12', difficulty: 'Medium', equipment: 'EZ Bar' },
    { name: 'Preacher Curl', muscle: 'Biceps', type: 'Machine', sets: 3, reps: '8-12', difficulty: 'Medium', equipment: 'Machine' }
  ],

  // ===== LEG ÖVNINGAR (Ben, Lår, Vad) =====
  LEGS: [
    // Framben/Quadriceps
    { name: 'Barbell Squats', muscle: 'Quads', type: 'Barbell', sets: 4, reps: '6-8', difficulty: 'Hard', equipment: 'Barbell' },
    { name: 'Front Squats', muscle: 'Quads', type: 'Barbell', sets: 3, reps: '6-8', difficulty: 'Hard', equipment: 'Barbell' },
    { name: 'Dumbbell Squats', muscle: 'Quads', type: 'Dumbbell', sets: 3, reps: '8-12', difficulty: 'Medium', equipment: 'Dumbbells' },
    { name: 'Leg Press', muscle: 'Quads', type: 'Machine', sets: 4, reps: '8-10', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Hack Squat', muscle: 'Quads', type: 'Machine', sets: 3, reps: '8-10', difficulty: 'Medium', equipment: 'Machine' },
    { name: 'Leg Extension', muscle: 'Quads', type: 'Machine', sets: 3, reps: '10-15', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Walking Lunges', muscle: 'Quads', type: 'Dumbbell', sets: 3, reps: '10-12', difficulty: 'Medium', equipment: 'Dumbbells' },
    { name: 'Bulgarian Split Squat', muscle: 'Quads', type: 'Dumbbell', sets: 3, reps: '8-10', difficulty: 'Medium', equipment: 'Dumbbells' },
    
    // Bakben/Hamstrings
    { name: 'Romanian Deadlift', muscle: 'Hamstrings', type: 'Barbell', sets: 3, reps: '6-8', difficulty: 'Medium', equipment: 'Barbell' },
    { name: 'Barbell Deadlift', muscle: 'Hamstrings', type: 'Barbell', sets: 3, reps: '5-6', difficulty: 'Hard', equipment: 'Barbell' },
    { name: 'Dumbbell RDL', muscle: 'Hamstrings', type: 'Dumbbell', sets: 3, reps: '8-10', difficulty: 'Medium', equipment: 'Dumbbells' },
    { name: 'Leg Curl Machine', muscle: 'Hamstrings', type: 'Machine', sets: 3, reps: '10-15', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Lying Leg Curl', muscle: 'Hamstrings', type: 'Machine', sets: 3, reps: '10-12', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Seated Leg Curl', muscle: 'Hamstrings', type: 'Machine', sets: 3, reps: '10-12', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Good Mornings', muscle: 'Hamstrings', type: 'Barbell', sets: 3, reps: '8-10', difficulty: 'Medium', equipment: 'Barbell' },
    
    // Vadmuskler
    { name: 'Standing Calf Raise', muscle: 'Calves', type: 'Machine', sets: 3, reps: '12-20', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Seated Calf Raise', muscle: 'Calves', type: 'Machine', sets: 3, reps: '12-20', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Leg Press Calf Raise', muscle: 'Calves', type: 'Machine', sets: 3, reps: '15-20', difficulty: 'Easy', equipment: 'Machine' },
    { name: 'Dumbbell Calf Raise', muscle: 'Calves', type: 'Dumbbell', sets: 3, reps: '15-20', difficulty: 'Easy', equipment: 'Dumbbells' }
  ],

  // ===== CORE ÖVNINGAR =====
  CORE: [
    { name: 'Barbell Squats', muscle: 'Core', type: 'Barbell', sets: 4, reps: '6-8', difficulty: 'Hard', equipment: 'Barbell' },
    { name: 'Deadlifts', muscle: 'Core', type: 'Barbell', sets: 3, reps: '5-6', difficulty: 'Hard', equipment: 'Barbell' },
    { name: 'Plank', muscle: 'Core', type: 'Bodyweight', sets: 3, reps: '30-60s', difficulty: 'Medium', equipment: 'Bodyweight' },
    { name: 'Ab Wheel', muscle: 'Core', type: 'Equipment', sets: 3, reps: '8-12', difficulty: 'Hard', equipment: 'Ab Wheel' },
    { name: 'Cable Crunches', muscle: 'Core', type: 'Cable', sets: 3, reps: '12-15', difficulty: 'Easy', equipment: 'Cable' },
    { name: 'Machine Ab Crunch', muscle: 'Core', type: 'Machine', sets: 3, reps: '10-15', difficulty: 'Easy', equipment: 'Machine' }
  ],

  // Hämta övningar för en split
  getExercises(split, count = 5) {
    let exList = [];
    
    if (split === 'Push') exList = this.PUSH;
    else if (split === 'Pull') exList = this.PULL;
    else if (split === 'Legs') exList = this.LEGS;
    else if (split === 'Full Body') exList = [...this.PUSH.slice(0, 3), ...this.PULL.slice(0, 3), ...this.LEGS.slice(0, 3)];
    
    // Shuffle och ta top N
    const shuffled = [...exList].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  },

  // Lägg till en ny övning (för utökning)
  addExercise(split, exercise) {
    if (split === 'Push') this.PUSH.push(exercise);
    else if (split === 'Pull') this.PULL.push(exercise);
    else if (split === 'Legs') this.LEGS.push(exercise);
  }
};

// ===== TRÄNINGSMALLAR =====
const TrainingTemplates = {
  templates: {
    2: {
      name: 'Upper/Lower Split (2x/vecka)',
      focus: 'Balanced full body',
      description: 'Perfekt för nybörjare eller den med begränsat tid',
      days: [
        { day: 'Måndag', muscle: 'Upper Body', split: 'Push', info: 'Bröstkänsla och axlar' },
        { day: 'Torsdag', muscle: 'Lower Body', split: 'Legs', info: 'Ben och bakben' }
      ]
    },
    3: {
      name: 'Push/Pull/Legs (3x/vecka)',
      focus: 'Full body strength',
      description: 'Klassisk split med bra återhämtning',
      days: [
        { day: 'Måndag', muscle: 'Chest & Triceps', split: 'Push', info: 'Tryck-rörelse, axlar' },
        { day: 'Tisdag', muscle: 'Back & Biceps', split: 'Pull', info: 'Drag-rörelse, biceps' },
        { day: 'Torsdag', muscle: 'Legs & Core', split: 'Legs', info: 'Ben och mage' }
      ]
    },
    4: {
      name: 'Upper/Lower Double (4x/vecka)',
      focus: 'Optimal strength & hypertrophy',
      description: 'Avancerad split för bättre resultat',
      days: [
        { day: 'Måndag', muscle: 'Upper Power', split: 'Push', info: 'Tung tryck' },
        { day: 'Tisdag', muscle: 'Lower Power', split: 'Legs', info: 'Tung ben' },
        { day: 'Torsdag', muscle: 'Upper Hypertrophy', split: 'Pull', info: 'Volym och pump' },
        { day: 'Lördag', muscle: 'Lower Hypertrophy', split: 'Legs', info: 'Isolering ben' }
      ]
    },
    5: {
      name: 'PPL Split (5x/vecka)',
      focus: 'Advanced hypertrophy',
      description: 'Högt volym, kräver bra återhämtning',
      days: [
        { day: 'Måndag', muscle: 'Push (Power)', split: 'Push', info: 'Tung tryck' },
        { day: 'Tisdag', muscle: 'Pull (Power)', split: 'Pull', info: 'Tung drag' },
        { day: 'Onsdag', muscle: 'Legs', split: 'Legs', info: 'Ben' },
        { day: 'Torsdag', muscle: 'Push (Hypertrophy)', split: 'Push', info: 'Volym' },
        { day: 'Fredag', muscle: 'Pull (Hypertrophy)', split: 'Pull', info: 'Volym' }
      ]
    },
    6: {
      name: 'PPL Twice (6x/vecka)',
      focus: 'Advanced volume',
      description: 'Maximum volym för erfarna tränare',
      days: [
        { day: 'Måndag', muscle: 'Push A', split: 'Push', info: 'Bröstkänsla 1' },
        { day: 'Tisdag', muscle: 'Pull A', split: 'Pull', info: 'Rygg 1' },
        { day: 'Onsdag', muscle: 'Legs A', split: 'Legs', info: 'Ben 1' },
        { day: 'Torsdag', muscle: 'Push B', split: 'Push', info: 'Axel & triceps' },
        { day: 'Fredag', muscle: 'Pull B', split: 'Pull', info: 'Rygg 2' },
        { day: 'Lördag', muscle: 'Legs B', split: 'Legs', info: 'Ben 2' }
      ]
    }
  },

  // Hämta mall för antal dagar
  getTemplate(daysPerWeek) {
    return this.templates[daysPerWeek] || this.templates[3];
  },

  // Skapa komplett träningsprogram
  createProgram(daysPerWeek, name, weeks = 8) {
    const template = this.getTemplate(daysPerWeek);
    
    const schedule = template.days.map(day => ({
      day: day.day,
      muscle: day.muscle,
      split: day.split,
      info: day.info,
      exercises: ExerciseDatabase.getExercises(day.split, daysPerWeek <= 3 ? 4 : 5)
    }));

    return {
      id: Date.now(),
      name: name,
      weeks: weeks,
      daysPerWeek: daysPerWeek,
      type: template.name,
      focus: template.focus,
      description: template.description,
      schedule: schedule,
      created: new Date().toISOString(),
      active: false
    };
  },

  // Lista alla tillgängliga mallar
  getAllTemplates() {
    return Object.keys(this.templates).map(key => ({
      days: parseInt(key),
      ...this.templates[key]
    }));
  }
};

// Export för användning
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ExerciseDatabase, TrainingTemplates };
}
