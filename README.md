# Task Management API

This is the backend service for a Task Management application built with Node.js, Express, MongoDB, and JWT authentication. It provides RESTful APIs for user authentication, task management, and secure access control.

## Table of Contents

- [Task Management API](#task-management-api)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [Running the Project](#running-the-project)
    - [Testing the API](#testing-the-api)
  - [API Endpoints](#api-endpoints)
  - [Assumptions \& Decisions](#assumptions--decisions)
  - [Known Issues \& Limitations](#known-issues--limitations)

## Installation

To get started with the project, follow these steps:

### Prerequisites

- **Node.js**: v14 or higher
- **MongoDB Atlas**: MongoDB database, hosted on Atlas (or any MongoDB instance accessible from the internet)
- **Git**: For cloning the repository

### Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/usman746/tasks-app-backend.git
   cd task-app-backend
   ```

2. **Install Dependencies**:
   Navigate to directory and install dependencies:

   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the backend root directory with the following configurations:

   ```plaintext
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   - **PORT**: Port for the server to listen on.
   - **MONGO_URI**: MongoDB Atlas connection string, including username, password, and database.
   - **JWT_SECRET**: Secret key used to sign JWT tokens.

## Running the Project

To run the backend server with auto-reload:

```bash
npm run dev
```

The backend server should start on the specified port (default is 5000).

### Testing the API

Use [Postman](https://www.postman.com/) or a similar API client to test the API endpoints. Include the JWT token in the `Authorization` header for protected routes.

## API Endpoints

| Endpoint             | Method | Description                           |
| -------------------- | ------ | ------------------------------------- |
| `/api/auth/register` | POST   | Register a new user                   |
| `/api/auth/login`    | POST   | Log in and receive a JWT              |
| `/api/auth/logout`   | POST   | Log out the current user              |
| `/api/tasks`         | POST   | Create a new task                     |
| `/api/tasks`         | GET    | Retrieve all tasks for logged-in user |
| `/api/tasks/:id`     | GET    | Retrieve a specific task by ID        |
| `/api/tasks/:id`     | PUT    | Update an existing task               |
| `/api/tasks/:id`     | DELETE | Delete a task                         |

Each endpoint requires validation, and the `/tasks` endpoints are protected, meaning only authenticated users with a valid JWT token can access them.

## Assumptions & Decisions

1. **Authentication**:

   - JWT (JSON Web Tokens) is used for session security. This allows for a stateless and scalable authentication system.
   - User authentication routes (`/register`, `/login`) ensure secure login and token issuance.

2. **Data Validation**:

   - Used `express-validator` to validate input fields for each endpoint.
   - Task fields like `title`, `description`, `state` and `dueDate` are validated as they are essential for creating or updating a task.

3. **User-Specific Task Access**:

   - Each user has access only to their own tasks. A `userId` is saved with each task to enforce data isolation.

4. **Token Expiry & Logout**:
   - Tokens have an expiry time of 24h to ensure security, and there’s no server-side token revocation (blacklisting).

## Known Issues & Limitations

1. **Token Blacklisting**:

   - No token blacklisting or revocation is implemented. If stricter logout is needed, consider using Redis or another cache system.

2. **Error Handling**:

   - Basic error handling is in place.

3. **Task Ownership**:

   - Task ownership is enforced through `userId`, but a more sophisticated role-based access control (RBAC) could be added.

4. **API Rate Limiting**:

   - Currently, there’s no rate limiting. For better security, consider implementing rate limiting with `express-rate-limit` to protect against brute-force attacks.

5. **Task Filtering and Sorting**:
   - There is no filtering, pagination, or sorting implemented for tasks.

---

This `README` provides guidance for installation, setup, and understanding the project constraints and decisions.
