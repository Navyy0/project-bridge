Team Name:-Team 1725
Team Details:-
Shikhar Srivastava
Navyansh Raj
Harsh Sabharwal
Raj Mate
# 🚀 Project Bridge

[![Live Project](https://img.shields.io/badge/Live-Demo-blue)](https://project-bridge.onrender.com/)
[![Tech Stack](https://img.shields.io/badge/Stack-MERN-informational)]()
[![Status](https://img.shields.io/badge/Status-Production-brightgreen)]()

> **Connect, Collaborate & Build Impactful Projects**  
> Find opportunities to work on exciting projects, collaborate with like-minded peers, and grow your skills—all while building a portfolio that stands out.

---

## 🌐 Live Project

🔗 [https://project-bridge.onrender.com](https://project-bridge.onrender.com)

---

## 🧠 Features

- 🔐 **User Authentication & Authorization**
  - Secure signup/login with JWT & cookies
  - Role-based access (User / Admin)

- 🧑‍💼 **Profile Management**
  - Update user details, photo, bio, skills, and upload resume
  - View and manage applied roles

- 🗂️ **Project Management**
  - Admins can register new projects with logo and description
  - View all projects created by the admin

- 📌 **Role Posting & Updates**
  - Post roles under specific projects
  - Add title, description, requirements, role type, experience level, and position
  - Update role information any time

- 📝 **Applications System**
  - Students can apply to roles
  - Prevent duplicate applications to same role
  - Admins can view applicants for each role
  - Update application status (e.g., selected/rejected)

- 🧭 **Search & Filter**
  - Keyword-based role search for students
  - View role descriptions and project context

- ☁️ **Cloudinary Integration**
  - Upload profile pictures, project logos, and resumes

- 🛡️ **Protected Routes**
  - Access control via middleware (e.g., `isAuthenticated`)

---

## 🛠️ Tech Stack

| Area        | Tech Used                            |
|-------------|---------------------------------------|
| Frontend    | React, Vite, TailwindCSS, Radix UI, Framer Motion |
| Backend     | Node.js, Express, MongoDB, Mongoose   |
| Auth        | JWT (token-based), Cookies            |
| State Mgmt  | Redux Toolkit + Redux Persist         |
| File Upload | Multer, Cloudinary                    |
| Routing     | React Router DOM                      |

---

## 🚀 Getting Started (Local Setup)

### 📦 Prerequisites

- Node.js v18+
- MongoDB (local or cloud)
- Cloudinary account (for images/resumes)

### 🔧 Backend Setup

```bash
cd server
npm install
cp .env.example .env  # Add DB URI, SECRET_KEY, Cloudinary creds
npm run dev
````

### 🎨 Frontend Setup

```bash
cd client
npm install
npm run dev
```



# Add these of yours in .env to clone

MONGO_URI = ""
SECRET_KEY = ""
CLOUD_NAME = ""
API_KEY = ""
API_SECRET =""
