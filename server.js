const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'fitness_tracker'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Add workout
app.post('/api/workouts', (req, res) => {
    const workout = req.body;
    const sql = 'INSERT INTO workouts (exercise, category, duration, month, day, year) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [workout.exercise, workout.category, workout.duration, workout.month, workout.day, workout.year], (err, result) => {
        if (err) throw err;
        res.send('Workout added');
    });
});

// Fetch workouts
app.get('/api/workouts', (req, res) => {
    db.query('SELECT * FROM workouts', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
