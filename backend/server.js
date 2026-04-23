require('dotenv').config()
const app=require('./src/app')
const connectDB=require('./src/config/db')

connectDB()

app.listen(3000,()=>{
    try {
        console.log("Connected to port 3000")
    } catch (error) {
        console.log(error)
    }
})