const express=require('express')
const taskController=require('../controllers/task.controller')
const authMiddleware=require('../middlewares/auth.middleware')

const router=express.Router()


router.post('/create',authMiddleware.authUser,taskController.createTask);
router.get('/',authMiddleware.authUser,taskController.getTask)
router.put('/update/:id',authMiddleware.authUser,taskController.updateTask)
router.delete('/delete/:id',authMiddleware.authUser,taskController.deleteTask)

module.exports=router