// Import express router
const express = require('express');
const router = express.Router();

// GET handler for /api/schedule
// Lists all tasks on the schedule
router.get('/', (req, res, next) => {
    res.json('Success! List of upcoming tasks.');
});

// GET handler for /api/schedule/{id}
// Lists details about a specific task
router.get('/:_id', (req, res, next) => {
    res.json('Success! List task details')
});

// POST handler for /api/schedule/add
// Creates a new task in the schedule
router.post('/add', (req, res, next) => {
    res.json('Success! Post a new task.');
});

// PUT handler for /api/schedule/edit/{id}
// Updates a task's info in the database
router.put('/edit/:_id', (req, res, next) => {
    res.json('Success! Update the task.');
});

// DELETE handler for /api/schedule/delete/{id}
router.delete('/delete/:_id', (req, res, next) => {
    res.json('Success! Delete the task.');
});

module.exports = router;