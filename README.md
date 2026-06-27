# Workforce Management Platform (HRMS)

A full-stack **Workforce Management Platform (HRMS)** built with **Spring Boot**, **React**, and **PostgreSQL**. The project focuses on implementing real-world business workflows while strengthening backend architecture and security concepts.

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

**Backend**
- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT
- Maven

**Frontend**
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
