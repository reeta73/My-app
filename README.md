# Reeta - Full-Stack MERN Application

A modern product management application built with MongoDB, Express, React, and Node.js.

## Features
- **User Authentication**: Secure JWT-based login and signup.
- **Role-Based Access Control**: Admin-only product management and user tracking.
- **Modern UI**: Clean, responsive design using Tailwind CSS v4 and Lucide icons.
- **Data Persistence**: MongoDB integration for persistent storage.
- **Interactive UX**: Form validation, show/hide password, and active page highlighting.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS v4, Axios, Lucide-React.
- **Backend**: Node.js, Express, Mongoose (MongoDB).
- **Security**: Bcrypt.js, JWT.

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Reeta
```

### 2. Backend Setup
```bash
cd Backend
npm install
# Create a .env file with your MONGODB_URI and JWT_SECRET
npm start
```

### 3. Frontend Setup
```bash
cd my-app
npm install
npm run dev
```

## License
MIT
