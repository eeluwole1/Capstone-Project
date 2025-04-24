# Capstone-Project

# 🎷 Music Event Management API

**Author:** Elusiyan Mathew Eluwole  
**Course:** COMP-3018 - Back-End Development  
**Capstone Project Duration:** Final Project

---

## 📌 Project Overview

The **Music Event Management API** is a backend system designed to streamline the process of organizing music events. It supports event creation, artist registration, ticket booking, and user role-based operations (admin vs attendee). As a musician and backend developer, I wanted to build a real-world solution that integrates secure authentication, dynamic routing, and cloud data storage.

---

##  Milestone Breakdown

### Milestone 1: Project Setup & Mock Data

- **Tech Stack Initialized**
  - Node.js + Express.js
  - TypeScript
  - Firebase Firestore (mocked initially)
- **Basic API Routes Established**
  - CRUD operations for `/users`, `/events`, `/artists`, and `/tickets`
- **Folder Structure**
  - Followed MVC pattern with separation into `controllers`, `routes`, `services`, and `middleware`

---

### Milestone 2: Database Integration & Documentation

- **Integrated Firebase Firestore**
  - Replaced all mock services with Firestore-backed logic
- **Swagger/OpenAPI**
  - Implemented API spec generator via `swagger-jsdoc` and Redoc
  - Hosted docs at `/api-docs/index.html`
- **Features Implemented**
  - Ticket booking with optional PDF generation
  - Joi schema validations
  - Email notifications with attachments
- **Authentication Setup**
  - Firebase Authentication with custom claims (`admin` or `user`)
  - Middleware: `authenticate.ts` and `authorize.ts`

---

### Milestone 3: Final Touches

- **Advanced Features**
  - Filtering and sorting support in `/tickets`
  - Role-based route protection (`admin` vs `user`)
- **Test Coverage**
  - Unit tests for all controllers and services (Jest)
  - Additional tests: `errorHandler`, `authenticate`, `authorize`
- **CI/CD**
  - GitHub Actions for:
    - Linting (`eslint`)
    - Unit testing
    - CodeQL for vulnerability scanning
- **Repository Layer**
  - Reusable `repository.ts` for interacting with Firestore
- **Code Quality**
  - Enforced strict typing using ESLint rules

---

## API Endpoints Overview

### 👤 User Management

| Method | Route           | Role  | Description        |
|--------|------------------|-------|--------------------|
| GET    | `/users`         | Admin | List all users     |
| POST   | `/users`         | Admin | Create new user    |
| PUT    | `/users/:id`     | Admin | Update a user      |
| DELETE | `/users/:id`     | Admin | Delete a user      |

### 🎤 Artist Management

| Method | Route           | Role  | Description        |
|--------|------------------|-------|--------------------|
| GET    | `/artists`       | All   | List all artists   |
| POST   | `/artists`       | Admin | Register artist    |
| PUT    | `/artists/:id`   | Admin | Update artist      |
| DELETE | `/artists/:id`   | Admin | Remove artist      |

### Ticket Management

| Method | Route           | Role  | Description              |
|--------|------------------|-------|--------------------------|
| GET    | `/tickets`       | All   | View available tickets   |
| POST   | `/tickets`       | User  | Book a ticket            |
| PUT    | `/tickets/:id`   | User  | Update ticket status     |
| DELETE | `/tickets/:id`   | User  | Cancel ticket            |

### Event Management

| Method | Route           | Role  | Description        |
|--------|------------------|-------|--------------------|
| GET    | `/events`        | All   | List all events    |
| POST   | `/events`        | Admin | Create event       |
| PUT    | `/events/:id`    | Admin | Update event       |
| DELETE | `/events/:id`    | Admin | Delete event       |

---

## Technologies Used

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth (custom claims)
- **Validation:** Joi
- **Documentation:** Swagger, Redoc
- **Testing:** Jest + Supertest
- **Security:** Helmet, CORS
- **CI/CD:** GitHub Actions (Lint, Test, CodeQL)
- **Others:** PDFKit (for ticket generation), Nodemailer (for email)

---

## Security Highlights

- Custom claims assigned via Firebase Admin SDK (`admin` and `user`)
- Middleware for token verification and role-based access
- Helmet middleware and CORS policy enforcement
- Type-safe Firestore interactions to avoid runtime crashes

---

## Testing Strategy

- **Unit Tests:** Controllers, Services, Middleware
- **Integration Tests:** Tested full CRUD operations
- **Postman:** Used for real-world testing with Firebase tokens
- **GitHub Actions:** Auto-tests on every PR or push

