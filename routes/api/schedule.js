// Import express router
const express = require('express');
const router = express.Router();

// Import Task model
const Task  = require('../../models/task');

/**
 * GET handler for /api/schedule
 * Shows all upcoming tasks in the schedule
 */
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

/**
 * GET handler for /api/schedule/{_id}
 * Shows details about a specific task in the schedule
 * Input (URL): _id
 */
router.get('/:_id', (req, res, next) => {
    
    // Find task by id
    Task.find(
        {_id: req.params._id},
        (err, selectedTask) => {
            if (!err) {
                res.json(selectedTask).status(200);
            }
            else {
                console.log('ERROR: ' + err);
                res.json('ERROR').status(500);
            }
        }
    );
});

/**
 * POST handler for /api/schedule/add
 * Creates a new task in the schedule
 * Input (Body): JSON Object with new task info
 */
router.post('/add', (req, res, next) => {

    // Validate the data before submitting
    // Task Name and Due Date are required fields
    if (!req.body.taskName || !req.body.dueDate) {
        res.json({ 'Validation Error': 'Task Name and Due Date are required fields' });
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
                res.json(newTask).status(200);
            }
            else {
                console.log('ERROR: ' + err);
                res.json({ 'ERROR': 'Server exception thrown' }).status(500);
            }
        });
    }
});

/**
 * PUT handler for /api/schedule/edit/{id}
 * Edits the details of a task in the schedule
 * Input (URL): _id
 * Input (Body): JSON object with updated task info
 */
router.put('/edit/:_id', (req, res, next) => {
    
    // Validate the data before submitting
    if (!req.body.taskName || !req.body.dueDate) {
        res.json({ 'Validation Error': 'Task Name and Due Date are required fields' }).status(400);
    }
    else {
        // Find task by id and update with new info from request body
        Task.findOneAndUpdate(
            {_id: req.params._id},
            {
                taskName: req.body.taskName,
                dueDate: req.body.dueDate,
                category: req.body.category,
                priority: req.body.priority
            },
            // Update the task if no errors
            (err, updatedTask) => {
                if (!err) {
                    console.log('No errors yay!');
                    res.json({ 'Success': 'Task was updated' }).status(200);
                }
                else {
                    console.log('ERROR: ' + err);
                    res.json({ 'ERROR': 'Server exception thrown' }).status(500);
                }
            }
        )
    }
});

/**
 * DELETE handler for /api/schedule/delete/{id}
 * Deletes a task from the schedule
 * Input (URL): _id
 */
router.delete('/delete/:_id', (req, res, next) => {
    
    // Find by id and delete the task
    Task.remove(
        {_id: req.params._id },
        (err) => {
            if (!err) {
                res.json({ 'Success': 'Task was deleted' }).status(200);
            }
            else {
                console.log('ERROR: ' + err);
                res.json({ 'ERROR': 'Server exception thrown' }).status(500);
            }
        }
    )
});

module.exports = router;