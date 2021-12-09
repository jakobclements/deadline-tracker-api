// Import express router
const express = require('express');
const router = express.Router();

// Import Task model
const Task  = require('../../models/task');

// GET handler for /api/schedule
// Lists all tasks on the schedule
router.get('/', (req, res, next) => {

    // Find all tasks
    Task.find((err, tasks) => {
        if (!err) {
            res.json(tasks).status(200);
        }
        else {
            console.log('ERROR: ' + err);
            res.json('ERROR').status(500);
        }
    });
});

// GET handler for /api/schedule/{id}
// Lists details about a specific task
router.get('/:_id', (req, res, next) => {
    res.json('Success! List task details');
});

// POST handler for /api/schedule/add
// Creates a new task in the schedule
router.post('/add', (req, res, next) => {

    // Validate the data before posting
    // Task Name and Due Date are required fields
    if (!req.body.taskName || !req.body.dueDate) {
        res.json({ 'Validation Error': 'Task Name and Due Date are required fields' })
    }
    else {

        // Create new Task object with info from request
        Task.create({
            taskName: req.body.taskName,
            dueDate: req.body.dueDate,
            category: req.body.category,
            priority: req.body.priority
        },
        // Post the task if no errors
        (err, newTask) => {
            if (!err) {
                console.log('Task created successfully!');
                res.json(newTask);
            }
            else {
                console.log('ERROR: ' + err);
                res.json({ 'ERROR': 'Server exception thrown' }).status(500);
            }
        });
    }
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