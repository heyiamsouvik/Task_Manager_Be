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

## 📡 API Documentation
Auth Routes

POST /register – Register a new user

Auth Required: No

Request Body:

{ "username": "JohnDoe", "email": "john@example.com", "password": "secret123" }


POST /login – Login and receive authentication token

Auth Required: No

Request Body:

{ "email": "john@example.com", "password": "secret123" }


POST /logout – Logout the current user

Auth Required: Yes

Request Body: None

Task Routes

POST /addtask – Add a new task

Auth Required: Yes

Request Body:

{ "title": "Finish Project", "description": "Complete backend API docs", "priority": "high", "status": "inProgress" }


PUT /editask/:id – Edit a task by its ID

Auth Required: Yes

URL Parameter: id – Task ID

Request Body:

{ "title": "Updated Title", "description": "Updated description", "priority": "medium", "status": "completed" }


GET /gettask/:id – Get task details by ID

Auth Required: Yes

URL Parameter: id – Task ID

DELETE /deletetask/:id – Delete a task by ID

Auth Required: Yes

URL Parameter: id – Task ID

GET /allnotes – Retrieve all tasks for the authenticated user

Auth Required: Yes

Request Body: None