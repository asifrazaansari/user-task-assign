const userModel = require('../models/userModel')

const createUser = async (req, res) => {
    try {

        const data = req.body

        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "required field can't be empty" })


        const saveData = await userModel.create(data)
        return res.status(201).send({ status: true, messsage: "User created successfully", data: saveData })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createUser }