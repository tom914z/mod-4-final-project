document.addEventListener('DOMContentLoaded', () => {
    const workoutForm = document.getElementById('workout-form');
    const workoutTableBody = document.querySelector('#workout-table tbody');
    const removeWorkoutBtn = document.getElementById('remove-workout');

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
    
        console.log('Form values:', { exercise, category, duration, month, day, year }); // Log to check input
    
        const newWorkout = { exercise, category, duration, month, day, year };
    
        addWorkout(newWorkout);
        clearForm();
    });

    // Handle the remove workout action
    removeWorkoutBtn.addEventListener('click', function() {
        if (workoutTableBody.lastChild) {
            workoutTableBody.removeChild(workoutTableBody.lastChild);
        } else {
            console.log("No workouts to remove");
        }
    });

    // Set fitness goal
    setGoalBtn.addEventListener('click', function() {
        const goal = fitnessGoalInput.value;
        goalMessage.innerText = `Your goal is set to ${goal} minutes per week!`;
    });

    function addWorkout(workout) {
        console.log('Adding workout:', workout); // Log the workout data
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
        }).then(res => res.text())
        .then(data => {
            console.log('Server response:', data);
        }).catch(error => console.error('Error:', error));
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
