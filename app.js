document.addEventListener('DOMContentLoaded', () => {
    const workoutForm = document.getElementById('workout-form');
    const workoutTableBody = document.querySelector('#workout-table tbody');
    const fitnessGoalInput = document.getElementById('fitness-goal');
    const setGoalBtn = document.getElementById('set-goal');
    const goalMessage = document.getElementById('goal-message');
    
    // Fetch and display existing workouts on load
    fetchWorkouts();

    // Handle form submission for adding a workout
    workoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const exercise = document.getElementById('exercise').value;
        const category = document.getElementById('category').value;
        const duration = document.getElementById('duration').value;

        const newWorkout = {
            exercise,
            category,
            duration,
            date: new Date().toLocaleDateString()
        };

        addWorkout(newWorkout);
        clearForm();
    });

    // Set fitness goal
    setGoalBtn.addEventListener('click', function() {
        const goal = fitnessGoalInput.value;
        goalMessage.innerText = `Your goal is set to ${goal} minutes per week!`;
    });

    // Function to add workout to the table and save to database (simulated)
    function addWorkout(workout) {
        // For now, this only adds to the table. You can later send it to your backend server.
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${workout.exercise}</td>
            <td>${workout.category}</td>
            <td>${workout.duration}</td>
            <td>${workout.date}</td>
        `;
        workoutTableBody.appendChild(row);

        // Send to backend (simulate by logging)
        console.log('Workout added:', workout);
    }

    // Function to clear form after submission
    function clearForm() {
        workoutForm.reset();
    }

    // Function to fetch existing workouts from backend (simulated)
    function fetchWorkouts() {
        // Simulate fetching data from the backend
        const existingWorkouts = [
        
        ];

        existingWorkouts.forEach(workout => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${workout.exercise}</td>
                <td>${workout.category}</td>
                <td>${workout.duration}</td>
                <td>${workout.date}</td>
            `;
            workoutTableBody.appendChild(row);
        });
    }
});
