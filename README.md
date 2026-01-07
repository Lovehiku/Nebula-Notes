📝 Note Taking System (Full Stack)

A full-stack Note Taking Application built for learning purposes using MERN stack (MongoDB, Express, React, Node.js).
The system allows users to securely create, read, update, and delete personal notes after authentication.

✨ Features
🔐 Authentication

User signup and login using JWT

Protected routes (only logged-in users can access notes)

Password hashing using bcrypt

🗒️ Notes Management

Create notes

View all notes (Dashboard)

View single note

Edit notes

Delete notes

Each note belongs to a specific user (authorization enforced)

⚙️ Technical Features

RESTful API

JWT-based authentication middleware

Axios with interceptor for automatic token handling

MongoDB with Mongoose

React Router for navigation

🧱 Tech Stack
Frontend

React

React Router

Axios

JavaScript (ES6+)

Tailwinds

Backend

Node.js

Express.js

MongoDB

Mongoose

JSON Web Token (JWT)

bcryptjs

dotenv

📁 Project Structure
Note-Taking-System
│
├── backend
│   ├── controllers
│   │   ├── auth.js
│   │   └── note.js
│   ├── middleware
│   │   └── auth.js
│   ├── model
│   │   ├── user.js
│   │   └── note.js
│   ├── routes
│   │   ├── auth.js
│   │   └── note.js
│   ├── app.js
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── api
│   │   │   └── notes.js
│   │   ├── components
│   │   │   └── NoteCard.jsx
│   │   ├── pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ViewNote.jsx
│   │   │   └── EditNote.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md

⚙️ Environment Variables

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

🚀 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/note-taking-system.git
cd note-taking-system

2️⃣ Backend Setup
cd backend
npm install
npm run dev


Server will start on:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend will start on:

http://localhost:5173

🔐 API Endpoints (Backend)
Auth

POST /api/auth/signup – Register user

POST /api/auth/login – Login user

Notes (Protected)

GET /api/notes – Get all user notes

POST /api/notes – Create note

GET /api/notes/:id – Get single note

PUT /api/notes/:id – Update note

DELETE /api/notes/:id – Delete note

🧪 Testing

Authentication tested using JWT

Notes protected using middleware

Tested using browser + Postman

Axios interceptor handles authorization automatically

🎯 Learning Outcomes

Through this project, I learned:

Full-stack application architecture

Authentication & authorization with JWT

Secure password handling

React routing and state management

REST API design

Debugging real-world issues

🌱 Future Improvements

Rich text editor

Search and filter notes

Tags & categories

Pin/Favorite notes

Dark mode

Note sharing between users

Deployment (Vercel + Render)

👤 Author

Hiku
Software Engineering Student
Addis Ababa University

📜 License

This project is for learning purposes and is open for improvement and educational use.
