# Portfolio

A modern portfolio with an administration interface to dynamically manage my projects.

## 📋 Description

This project is a personal portfolio consisting of a REST API backend and a reactive frontend. It allows you to display your projects and manage them through a secure administration interface.

## 🛠️ Technologies

### Backend
- **FastAPI** - Modern and high-performance Python framework for building APIs
- **PostgreSQL** - Relational database for storing projects
- **Uvicorn** - ASGI server to run the application

### Frontend
- **React** - JavaScript library for building user interfaces
- **Vite** - Fast and modern build tool
- **Bootstrap** - CSS framework for responsive design

## ✨ Features

- Dynamic project display from the database
- Admin interface protected by API key
- Full CRUD operations on projects (Create, Read, Update, Delete)
- Responsive design adapted to all screen sizes

## 🚀 Installation

### Prerequisites

- Python 3.7+
- Node.js and npm
- PostgreSQL

### Backend

1. Create and activate the virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate 
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure PostgreSQL database and environment variables

4. Start the server:
```bash
uvicorn app.main:app --reload
```

The backend will be accessible at `http://127.0.0.1:8000`

### Frontend

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be accessible at `http://localhost:5173` (or another port indicated by Vite)

## 🔐 Administration

The administration interface is protected by an API key. To access admin features (add, modify, delete projects), you must provide a valid API key.


## 📝 API Endpoints

- `GET /projects` - Retrieve all projects
- `POST /projects` - Create a new project (requires API key)
- `PUT /projects/{id}` - Update a project (requires API key)
- `DELETE /projects/{id}` - Delete a project (requires API key)

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License.