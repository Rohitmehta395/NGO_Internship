# Sharada Educational Trust - NGO Platform

A comprehensive, full-stack web application designed for the **Sharada Educational Trust**. This platform serves as a digital hub for the NGO, facilitating volunteer management, event promotion, program showcases, and dynamic content management through a secure admin dashboard.

## 🚀 Live Demo
*[Insert Live Link Here]*

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)

## ✨ Features

### 🌟 Public User Interface
* **Dynamic Program Showcase:** Interactive display of flagship programs and initiatives (e.g., Project JnanaShala, Sharada Academy).
* **Event Management:** Upcoming and past events listing with detailed descriptions and galleries.
* **Blog Section:** Educational articles and news updates with rich text formatting.
* **Volunteer System:** Dedicated portal for potential volunteers to apply, triggering automated email notifications.
* **Multimedia Gallery:** Image and video galleries showcasing impact stories and testimonials.
* **Sulabh International Integration:** Specialized section dedicated to the Sulabh initiative with its own core modules and features.
* **Responsive Design:** Fully mobile-responsive layout built with Tailwind CSS.

### 🛡️ Admin Dashboard
* **Secure Authentication:** JWT-based login system for administrators.
* **Content Management System (CMS):**
    * **Hero Section Control:** Update homepage banners and text dynamically.
    * **Team Management:** Add/Edit/Delete profiles for Trustees, Advisory Board, and Volunteers.
    * **Partner Management:** Manage corporate and educational partner displays.
    * **Testimonials:** Moderate and upload video/media testimonials.
* **File Management:** Integrated image upload system for blogs, events, and member profiles.

## 🛠 Tech Stack

### Frontend
* **Framework:** React.js (powered by Vite)
* **Styling:** Tailwind CSS & Framer Motion (for animations)
* **State & Routing:** React Router DOM, React Hooks
* **HTTP Client:** Axios
* **Rich Text Editor:** React Quill
* **UI Components:** React Icons, Lucide React, Swiper (Carousels)

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB with Mongoose ODM
* **Authentication:** JSON Web Token (JWT) & BCryptJS
* **File Handling:** Multer (Local storage management)
* **Email Services:** Nodemailer (Volunteer notifications)
* **Validation:** Express-validator

## 📂 Project Architecture

```bash
NGO_Internship/
├── backend/                # Express.js Server
│   ├── config/             # Database connection
│   ├── controllers/        # Route logic (Auth, Blogs, Events, etc.)
│   ├── models/             # Mongoose Schemas
│   ├── routes/             # API Route definitions
│   ├── uploads/            # Static file storage for images
│   └── utils/              # Helper functions (Email sender)
│
└── frontend/               # React Application
    ├── public/             # Static assets
    └── src/
        ├── components/     # Reusable UI components
        ├── pages/          # Main view pages (Home, About, Admin)
        ├── services/       # API service configurations
        └── assets/         # Frontend images and styles

⚙ Installation & Setup
Prerequisites
Node.js (v16+)

MongoDB (Local or Atlas URL)

Git

1. Clone the Repository
git clone [https://github.com/rohitmehta395/NGO_Internship.git](https://github.com/rohitmehta395/NGO_Internship.git)
cd NGO_Internship

Here is the complete content for your README.md file. You can copy the code block below and save it as README.md in the root directory of your project.

Markdown
# Sharada Educational Trust - NGO Platform

A comprehensive, full-stack web application designed for the **Sharada Educational Trust**. This platform serves as a digital hub for the NGO, facilitating volunteer management, event promotion, program showcases, and dynamic content management through a secure admin dashboard.

## 🚀 Live Demo
*[Insert Live Link Here]*

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)

## ✨ Features

### 🌟 Public User Interface
* **Dynamic Program Showcase:** Interactive display of flagship programs and initiatives (e.g., Project JnanaShala, Sharada Academy).
* **Event Management:** Upcoming and past events listing with detailed descriptions and galleries.
* **Blog Section:** Educational articles and news updates with rich text formatting.
* **Volunteer System:** Dedicated portal for potential volunteers to apply, triggering automated email notifications.
* **Multimedia Gallery:** Image and video galleries showcasing impact stories and testimonials.
* **Sulabh International Integration:** Specialized section dedicated to the Sulabh initiative with its own core modules and features.
* **Responsive Design:** Fully mobile-responsive layout built with Tailwind CSS.

### 🛡️ Admin Dashboard
* **Secure Authentication:** JWT-based login system for administrators.
* **Content Management System (CMS):**
    * **Hero Section Control:** Update homepage banners and text dynamically.
    * **Team Management:** Add/Edit/Delete profiles for Trustees, Advisory Board, and Volunteers.
    * **Partner Management:** Manage corporate and educational partner displays.
    * **Testimonials:** Moderate and upload video/media testimonials.
* **File Management:** Integrated image upload system for blogs, events, and member profiles.

## 🛠 Tech Stack

### Frontend
* **Framework:** React.js (powered by Vite)
* **Styling:** Tailwind CSS & Framer Motion (for animations)
* **State & Routing:** React Router DOM, React Hooks
* **HTTP Client:** Axios
* **Rich Text Editor:** React Quill
* **UI Components:** React Icons, Lucide React, Swiper (Carousels)

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB with Mongoose ODM
* **Authentication:** JSON Web Token (JWT) & BCryptJS
* **File Handling:** Multer (Local storage management)
* **Email Services:** Nodemailer (Volunteer notifications)
* **Validation:** Express-validator

## 📂 Project Architecture

```bash
NGO_Internship/
├── backend/                # Express.js Server
│   ├── config/             # Database connection
│   ├── controllers/        # Route logic (Auth, Blogs, Events, etc.)
│   ├── models/             # Mongoose Schemas
│   ├── routes/             # API Route definitions
│   ├── uploads/            # Static file storage for images
│   └── utils/              # Helper functions (Email sender)
│
└── frontend/               # React Application
    ├── public/             # Static assets
    └── src/
        ├── components/     # Reusable UI components
        ├── pages/          # Main view pages (Home, About, Admin)
        ├── services/       # API service configurations
        └── assets/         # Frontend images and styles
⚙ Installation & Setup
Prerequisites
Node.js (v16+)

MongoDB (Local or Atlas URL)

Git

1. Clone the Repository
Bash
git clone [https://github.com/rohitmehta395/NGO_Internship.git](https://github.com/rohitmehta395/NGO_Internship.git)
cd NGO_Internship
2. Backend Setup
Navigate to the backend folder and install dependencies:
cd backend
npm install

Create a .env file in the backend root and add the following:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
# Email Configuration (for Nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

Start the server:
npm run dev
The server will run on http://localhost:5000

3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:
cd frontend
npm install

Start the React development server:
npm run dev
The app will run on http://localhost:5173

🔌 API Endpoints
Method	Endpoint	Description
Auth	/api/auth/login	Admin login
Programs	/api/programs	Get/Create/Update programs
Events	/api/events	Manage upcoming and past events
Blogs	/api/blogs	Blog CRUD operations
Team	/api/members	Manage trustees and volunteers
Media	/api/media	Handle photo gallery uploads
Testimonials	/api/videos	Manage video testimonials
Sulabh	/api/sulabh	Sulabh specific data routes

(Note: Most write operations require a valid JWT token in the header)

👥 Authors
Rohit Mehta - Full Stack Development - GitHub Profile
📄 License
This project is licensed under the ISC License.
