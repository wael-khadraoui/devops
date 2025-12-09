# Technical Architecture

## System Overview

```
┌──────────────────────────────────────────────────────────────┐
│                     Client Layer                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ HTML/CSS/JavaScript Frontend                           │  │
│  │ - Login & Register Pages                              │  │
│  │ - Task Management Dashboard                           │  │
│  │ - User Profile                                        │  │
│  │ - Real-time Updates (Socket.io)                       │  │
│  └────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
                            ↓ HTTP/WebSocket
┌──────────────────────────────────────────────────────────────┐
│                  Application Layer (Node.js/Express)          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Routes & Controllers                                   │  │
│  │ - /users (authentication, profile)                    │  │
│  │ - /tasks (CRUD operations)                            │  │
│  │ - WebSocket listeners                                 │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Middleware                                             │  │
│  │ - Authentication (JWT/Session)                        │  │
│  │ - Error handling                                       │  │
│  │ - CORS & Security Headers                             │  │
│  └────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
                            ↓ MySQL Protocol
┌──────────────────────────────────────────────────────────────┐
│                   Data Layer (MySQL Database)                 │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Tables:                                                │  │
│  │ - users (id, username, password, email, ...)         │  │
│  │ - tasks (id, user_id, title, description, ...)       │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend (Client-Side)
- **Technology:** HTML5, CSS3, Vanilla JavaScript
- **Real-time Communication:** Socket.io client
- **State Management:** Local storage for session
- **Files:**
  - `public/index.html` - Dashboard
  - `public/login.html` - Authentication
  - `public/register.html` - User registration
  - `public/profil.html` - User profile
  - `public/tasks.html` - Task management
  - `public/script.js` - Client-side logic
  - `public/styles.css` - Styling

### Backend (Server-Side)
- **Framework:** Express.js
- **Language:** JavaScript (Node.js)
- **Port:** 3000 (default)
- **Key Files:**
  - `server.js` - Application entry point
  - `routes/users.js` - User authentication routes
  - `routes/tasks.js` - Task CRUD routes
  - `models/db.js` - Database connection
  - `middlewares/auth.js` - Authentication middleware

### Database (MySQL)
- **Service Name:** mysql
- **Port:** 3306
- **Database:** task_manager

**Schema:**
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Data Flow

### User Registration
```
Frontend → POST /users/register → Backend → MySQL
```

### User Login
```
Frontend → POST /users/login → Authenticate → Session/JWT → Frontend
```

### Create Task
```
Frontend → POST /tasks → Verify Auth → MySQL → Socket.io broadcast → All Clients
```

### Real-time Updates
```
Task Updated → Socket.io event → All Connected Clients (WebSocket)
```

## Docker Architecture

```
docker-compose.yml
├── app (node:18 container)
│   ├── Runs Express server on port 3000
│   ├── Mounts source code
│   └── Depends on mysql service
│
└── mysql (mysql:8 container)
    ├── Runs MySQL on port 3306
    ├── Volume: mysql_data (data persistence)
    └── Environment: DB credentials
```

## CI/CD Pipeline Architecture

```
┌─────────────┐
│ Git Push    │
│ (main/dev)  │
└──────┬──────┘
       ↓
┌─────────────────────────┐
│ GitLab CI/CD Pipeline   │
├─────────────────────────┤
│                         │
│ Stage: Build            │
│ - Docker image build    │
│ - Push to registry      │
│                         │
├─────────────────────────┤
│ Stage: Test             │
│ - npm install           │
│ - npm test              │
│ - Code coverage         │
│                         │
├─────────────────────────┤
│ Stage: Deploy           │
│ - Trigger Vercel hook   │
│ - Deploy to Vercel      │
│ - Health check          │
│                         │
└─────────────────────────┘
       ↓
┌──────────────────┐
│ Vercel (Production)
│ https://your-app │
└──────────────────┘
```

## Security Architecture

### Authentication
- Username/Email + Password
- Session management on server
- Protected routes via middleware

### Database Security
- Environment variables for credentials
- No hardcoded secrets
- MySQL connection pooling

### API Security
- CORS enabled
- Request validation
- Error handling without exposing stack traces

## Deployment Environment

- **Platform:** Vercel
- **Region:** Auto-selected by Vercel
- **Scaling:** Auto-scaled by Vercel
- **Environment Variables:** Managed in Vercel dashboard
- **SSL/TLS:** Automatic HTTPS

## Performance Considerations

1. **Frontend:**
   - Minified CSS/JS
   - Socket.io for real-time updates
   - Local storage for caching

2. **Backend:**
   - Connection pooling for MySQL
   - Middleware for request compression
   - Error recovery mechanisms

3. **Database:**
   - Indexed primary keys
   - Foreign key relationships
   - Query optimization

4. **Deployment:**
   - Docker image caching
   - Artifact caching in CI/CD
   - CDN acceleration (Vercel edge)
