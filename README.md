# Task_Management_Dashboard

Step 1: Clone the repository from github 
git clone "your-github-repo-url"

step 2 : Navigate into the project folder 
cd Task_Management_Dashboard

step 3: Install backend dependencies 
cd backend 
npm install

Step 4: Setup environment variables
Create a .env file inside the backend folder and add:
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key

Step 5: Start backend server
npm start

Step 6: Install frontend dependencies
cd ../frontend
npm install

Step 7: Start frontend
npm run dev

# Features

Authentication Features
    User Registration
    User Login (JWT stored in cookies)
    Protected Routes (Dashboard only accessible after login)
    Logout functionality

Task Features
    Create Task
    Edit Task
    Delete Task
    Mark as Completed / Pending
    Filter Tasks (All / Completed / Pending)

# Tech Stack 

Frontend:
    React
    Axios
    React Router

Backend:

    Node.js
    Express.js
    MongoDB + Mongoose
    JWT Authentication
    Cookie-based auth

# API Endpoints

Auth
    POST   /api/auth/register
    POST   /api/auth/login
    GET    /api/auth/logout
    GET    /api/auth/me

Tasks 
    POST   /api/task/create
    GET    /api/task/
    PUT    /api/task/update/:id
    DELETE /api/task/delete/:id

