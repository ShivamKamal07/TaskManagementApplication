#  Advanced Task Management Application (MERN Stack)

A full-stack secure Task Management Application built using the MERN stack.  
This project demonstrates authentication, secure cookie handling, encrypted data storage, pagination, filtering, and protected routes.

#demo link-- https://task-management-application-livid.vercel.app/
---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication
- HTTP-only Cookies
- AES Encryption (for sensitive task data)

---

## 🔐 Security Features

- JWT Authentication
- HTTP-only cookies for token storage
- Secure cookie in production
- SameSite protection
- Protected routes (Frontend + Backend)
- AES Encryption for task data
- Environment variable configuration

---

## ✨ Features

### Authentication
- User Registration
- User Login
- Secure Logout
- Protected Dashboard Route

### Task Management
- Create Task
- Read Tasks
- Update Task Status
- Delete Task
- Pagination
- Search Functionality
- Status Filtering

### UI Features
- Modern Tailwind CSS UI
- Status color badges
- Responsive design
- Clean dashboard layout

---

##  Project Structure

```
TaskManagementApplication/
│
├── client/        # React Frontend
└── server/        # Express Backend
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone <your-repo-link>
cd TaskManagementApplication
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
SECRET_KEY=your_32_character_encryption_key
NODE_ENV=development
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🌍 Deployment

### Frontend
- Deploy on Vercel

### Backend
- Deploy on Render / Railway

Make sure to:
- Set environment variables in production
- Use `secure: true` for cookies in production
- Set correct CORS configuration

---

## 🧠 Concepts Demonstrated

- Full-stack authentication
- Secure cookie handling
- RESTful API design
- Data encryption & decryption
- Pagination & filtering
- Protected routes
- Environment-based configuration
- Production-ready folder structure

---

## 📌 Author

Shivam  
Full Stack Developer (MERN)

