# Workforce Management Platform (HRMS)

A full-stack **Workforce Management Platform (HRMS)** built with **Spring Boot**, **React**, and **PostgreSQL**. The project focuses on implementing real-world business workflows while strengthening backend architecture and security concepts.

---

## Project Structure

```
Workforce-Management-Platform/
├── backend/    # Spring Boot REST API
└── frontend/   # React + Vite Client
```

---

## Prerequisites

Make sure you have the following installed:

- Java 21 (or the version required by the project)
- Maven (or use the included Maven Wrapper)
- Node.js (v18+ recommended)
- PostgreSQL
- Git

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Trishanthsai/Workforce-Management-Platform.git
cd Workforce-Management-Platform
```

---

### 2. Configure the database

Create a PostgreSQL database.

Update the database configuration in:

```
backend/src/main/resources/application.properties
```

Configure:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
```

---

### 3. Run the Backend

Open the `backend` folder in IntelliJ **or** use the terminal.

```bash
cd backend
./mvnw spring-boot:run
```

Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

### 4. Run the Frontend

Open the `frontend` folder in VS Code.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## Demo Credentials

### Admin

**Username:** `ram_960`

**Password:** `admin123`

> Create employee accounts using the admin credentials. Employees can then log in using the credentials assigned during registration.

---

## Features

### Admin

- Employee Management (CRUD)
- Task Assignment & Tracking
- Leave Approval / Rejection
- Announcement Management
- Dashboard Analytics
- Audit Logs
- Login Logs

### Employee

- View & Update Tasks
- Apply for Leave
- View Announcements
- Profile Management
- Change Password

---

## Email Notifications

Integrated with **Spring Mail**.

Employees automatically receive emails when:

- A task is assigned
- A new announcement is published
- A leave request is approved or rejected

---

## Backend & Security

- Spring Security
- JWT Authentication
- Role-Based Access Control (Admin & Employee)
- BCrypt Password Encryption
- Refresh Token Generation & Persistent Storage
- Adaptive API Rate Limiting
- Global Exception Handling
- Input Validation

---

## Tech Stack

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT
- Maven

### Frontend

- React
- Vite
- Bootstrap
- Axios

---

## Upcoming Features

- Complete Refresh Token Authentication Flow
- Active Session Management
- Spring Events
- Redis Caching
- HTTP-only Cookie Authentication
- Docker Deployment

---

Built as a backend-focused learning project to explore secure application development and enterprise backend concepts.
