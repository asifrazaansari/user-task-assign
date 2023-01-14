const Task = require("../models/taskModel")

const createTask = async (req, res) => {
    try {

        const data = req.body

        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "required field can't be empty" })


        const saveData = await Task.create(data)
        return res.status(201).send({ status: true, messsage: "Task created successfully", data: saveData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const taskList = async (req, res) => {
    try {

        const tasks = await Task.find()

        if (tasks.length === 0) return res.status(404).send({ status: false, message: "no task found" })

        return res.status(200).send({ status: true, messsage: "All tasks", count: tasks.length, data: tasks })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const groupTask = async (req, res) => {
    try {
        const grouped = await Task.aggregate([
            {
                $group: {
                    _id: '$createDate',
                    tasks: { $push: '$$ROOT' }
                }
            }
        ])

        return res.status(200).send({ status: true, messsage: "All tasks", data: grouped })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const filterTask = async (req, res) => {
    try {

        const filteredTask = await Task.find({
            status: req.query.status,
            userAssign: req.query.userAssign
        })

        if (filteredTask.length === 0) return res.status(404).send({ status: false, message: "no task found" })

        return res.status(200).send({ status: true, messsage: "All filter task", count: filteredTask.length, data: filteredTask })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}

const searchTask = async (req, res) => {
    try {

        const sname = req.query.name

        const searchTaskByName = await Task.find({
            name: {$regex: sname, $options: 'i'}
        })

        if (searchTaskByName.length === 0) return res.status(404).send({ status: false, message: "no tasks found" })

        return res.status(200).send({ status: true, messsage: "All filter task by name", count: searchTaskByName.length, data: searchTaskByName })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createTask, taskList, groupTask, filterTask, searchTask }