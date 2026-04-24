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
async function getTask(req,res){
    const tasks=await taskModel.find({
        user: req.user.id
    }).sort({createdAt:-1})
    if(tasks.length===0){
        return res.status(404).json({
            message:"Task not found"
        })
    }
     res.status(200).json({
        message:"Tasks fetched sucessfully",
        tasks
    })
}
async function updateTask(req,res){
    const task=await taskModel.findOneAndUpdate({
        _id:req.params.id,
        user:req.user.id
    },req.body,{ new: true })
    if(!task){
        return res.status(404).json({
            message:"Task not found"
        })
    }
    res.status(200).json({
        message:"Tasks updated sucessfully",
        task
    })

}
async function deleteTask(req,res){
    const task=await taskModel.findOneAndDelete({
        _id:req.params.id,
         user:req.user.id
    })
    res.status(200).json({
        message:"Task deleted sucessfully",
    })

}
module.exports={createTask,getTask,updateTask,deleteTask}