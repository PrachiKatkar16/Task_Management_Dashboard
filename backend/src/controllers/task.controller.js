const mongoose=require('mongoose')
const taskModel=require('../models/task.model')

async function createTask(req,res){
    try {
    const task = await taskModel.create({
      ...req.body,
      user: req.user.id
    })

    res.status(201).json({
        message:"Task created sucessfully",
        task
    })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}