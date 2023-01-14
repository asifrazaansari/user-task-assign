const express = require('express')
const router = express.Router()

// controllers require
const { createUser } = require('../controllers/userController')
const { createTask, taskList, groupTask, filterTask, searchTask } = require('../controllers/taskController')

//user routes
router.post('/users', createUser)


//task routes
router.post('/tasks', createTask)
router.get('/tasks', taskList)
router.get('/tasks/group', groupTask)
router.get('/tasks/filter', filterTask)
router.get('/tasks/search', searchTask)

router.all('/*', (req, res) => {
    return res.status(400).send({ status: false, message: "Page not found" })
})

module.exports = router