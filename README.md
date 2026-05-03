<h1 align="center">🎨 Auth UI</h1>

<h3 align="center">
Modern authentication frontend built with React + Vite ⚡
</h3>

---

<p align="center">
A secure and responsive authentication UI connected to a Node.js + Express backend API.
</p>

---

## 🚀 Live Demo

🌐 Frontend: https://your-frontend.vercel.app  
⚙️ Backend: https://your-backend.onrender.com

---

## 🧠 Features

- 🔐 User Login / Register
- 🔄 Forgot & Reset Password
- 🧾 JWT Authentication Flow
- 🔒 Protected Routes
- ⚡ Axios Interceptor (Auto token attach)
- 🔁 Refresh Token support
- 📱 Fully Responsive UI

---

## 🛠 Tech Stack

- React
- Vite
- Axios
- React Router
- Tailwind CSS

---

## 🔗 Backend Connection

This frontend connects to a REST API backend:

```env
VITE_API_URL=https://your-backend.onrender.com
🏗 Architecture
Frontend (Vercel)
      ↓
Backend API (Render)
      ↓
MongoDB Database
🔐 Authentication Flow
User logs in or registers
Backend returns access + refresh tokens
Access token stored in localStorage
Axios interceptor attaches token to requests
Refresh token used automatically when access token expires
🚀 Run Locally
npm install
npm run dev
📦 Build Project
npm run build
⚠️ Important Notes
Make sure backend URL is set in .env
Ensure backend CORS allows frontend domain
Use correct VITE_API_URL for production
👨‍💻 Author

Ujwal Paudel
```

<h3 align="center">🔥 Built with consistency, not shortcuts </h3>
