# Akash Jare - Portfolio

A modern portfolio website built with React, Vite, Tailwind CSS, and Framer Motion. Features contact form submissions saved to MongoDB and an admin dashboard to manage messages.

## 📁 Project Structure

```
my-portfolio/
├── frontend/          # React + Vite frontend
├── backend/           # Flask + MongoDB API
└── README.md
```

## 🚀 Quick Start

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Visit: `http://localhost:5173`

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```
API runs on: `http://localhost:5000`

### Environment Variables

**Frontend** - Create `frontend/.env.local`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Backend** - Create `backend/.env`:
```env
MONGO_URI=mongodb://localhost:27017/portfolio
FLASK_ENV=development
```

## 📦 Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Framer Motion, React Router  
**Backend:** Flask, MongoDB, Flask-CORS  
**Database:** MongoDB

## ✨ Features

- 📋 **Contact Form** - Submit inquiries saved to database
- 🎛️ **Admin Dashboard** - View, search, and delete messages at `/admin`
- 📊 **Message Stats** - See submissions by service type
- 🎨 **Modern UI** - Smooth animations and responsive design
- 🌐 **Full-Stack** - Frontend + Backend + Database

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contacts` | Submit new contact |
| GET | `/api/contacts` | Get all contacts |
| GET | `/api/contacts/<id>` | Get specific contact |
| DELETE | `/api/contacts/<id>` | Delete contact |
| PATCH | `/api/contacts/<id>` | Update contact |
| POST | `/api/contacts/search` | Search contacts |
| GET | `/api/stats` | Get statistics |

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy the dist/ folder
```

### Backend Deployment (Render/Railway)
- Set environment variable: `MONGO_URI` to your MongoDB cloud instance
- Connect your GitHub repository
- Backend will auto-deploy on push

### Environment for Production
Update production `.env` files:
- Frontend: `VITE_API_BASE_URL=https://your-api-domain.com/api`
- Backend: Use MongoDB Atlas URI with authentication

## 📧 Contact

- Email: akashjare09@gmail.com
- GitHub: [akash-0963](https://github.com/akash-0963)
- LinkedIn: [Akash Jare](https://www.linkedin.com/in/akash-jare-609ab3230/)

---

**Portfolio by Akash Jare**
