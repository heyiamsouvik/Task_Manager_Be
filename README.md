# 🗂 Task Manager Backend

A secure and scalable **Task Manager API** built with **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**.  
It provides APIs for **user authentication** and **task management**, with proper validations, authorization, and maintainable architecture.

---

## 📌 Features
- User registration, login, and logout.
- JWT-based authentication with HTTP-only cookies.
- CRUD operations for tasks (Add, Edit, View, Delete).
- Task categorization by status (`yetToStart`, `inProgress`, `completed`).
- Secure password hashing with **bcrypt**.
- Input validation using **Zod**.
- CORS configuration for frontend integration.

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token), HTTP-only cookies
- **Validation:** Zod
- **Security:** bcrypt, cors, cookie-parser
- **Environment Management:** dotenv

---


## ⚙️ Installation & Setup

1. **Clone the Repository**

git clone https://github.com/heyiamsouvik/Task_Manager_Be.git
cd Task_Manager_Be

2. **Install Dependencies**

npm install

3. **Setup Environment Variables (.env)**

PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskdb
JWT_SECRET=your_jwt_secret
FE_WEBSITE_LINK=http://localhost:3000
NODE_ENV=development

4. **Run the Server**

npm start

---
## 🗄 Database Schema
User Schema
User
│
├── username   : String (required, trimmed)
├── email      : String (required, unique, lowercase)
├── password   : String (hashed, required)
└── tasks[]    : Array of Task IDs (ref: Task)

Task Schema
Task
│
├── title       : String (required, trimmed)
├── description : String (required, trimmed)
├── priority    : String (enum: low, medium, high) default: low
└── status      : String (enum: yetToStart, inProgress, completed) default: yetToStart


---
## 🔐 Auth Routes
POST /register

POST /login

POST /logout

## 📝 Task Routes
POST /addtask

PUT /editask/:id

GET /gettask/:id

DELETE /deletetask/:id

GET /allnotes