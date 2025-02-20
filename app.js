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
        const month = document.getElementById('month').value;
        const day = document.getElementById('day').value;
        const year = document.getElementById('year').value;

        const newWorkout = {
            exercise,
            category,
            duration,
            month,
            day,
            year
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
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${workout.exercise}</td>
            <td>${workout.category}</td>
            <td>${workout.duration}</td>
            <td>${workout.month}</td>
            <td>${workout.day}</td>
            <td>${workout.year}</td>
        `;
        workoutTableBody.appendChild(row);

        // Send to backend
        fetch('/api/workouts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(workout)
        }).then(res => res.text()).then(data => {
            console.log(data);
        });
    }

    // Function to clear form after submission
    function clearForm() {
        workoutForm.reset();
    }

    // Function to fetch existing workouts from backend
    function fetchWorkouts() {
        fetch('/api/workouts')
        .then(res => res.json())
        .then(workouts => {
            workouts.forEach(workout => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${workout.exercise}</td>
                    <td>${workout.category}</td>
                    <td>${workout.duration}</td>
                    <td>${workout.month}</td>
                    <td>${workout.day}</td>
                    <td>${workout.year}</td>
                `;
                workoutTableBody.appendChild(row);
            });
        });
    }
});
