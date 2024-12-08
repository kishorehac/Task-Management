# Task Management API

This is a RESTful API for a Task Management Application built using **Node.js**, **Express.js**, and **MongoDB**. The API allows users to manage tasks, including creating, updating, retrieving, and deleting tasks with filtering, sorting, and pagination.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [License](#license)

## Features

- **Task Management**: Create, update, delete, and retrieve tasks.
- **Filtering**: Filter tasks by `status` and `priority`.
- **Sorting**: Sort tasks by `createdAt` and `dueDate`.
- **Pagination**: Limit and skip tasks for pagination.
- **Error Handling**: Graceful error handling for invalid requests.

## Tech Stack

- **Node.js** (JavaScript runtime)
- **Express.js** (Web framework)
- **MongoDB** (Database)
- **Mongoose** (MongoDB ODM)
- **Joi** (Data validation)
- **dotenv** (Environment variables)

## Installation

### Prerequisites

- **Node.js**: Make sure you have Node.js installed on your system.
  - Download and install it from [Node.js](https://nodejs.org/).
- **MongoDB**: Make sure you have MongoDB installed locally or use a cloud database like MongoDB Atlas.

### Steps to Install

1.Create Backend project folder:
``bash
cd ./Backend

````

2. Initialize Node.js project:

```bash
npm init -y
````

3. Install dependencies:

   ```bash
   npm install express mongoose dotenv joi
   ```

4. Create a `.env` file in the root directory and add your MongoDB URI:

   ```env
   MONGO_URI=mongodb://localhost:27017/task_management_db
   port = 5000
   JWT_SECRET=your_password
   ```

   If you're using **MongoDB Atlas**, the URI should look like:

   ```env
   MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
   ```

5. (Optional) Change the port number in `.env` if needed:
   ```env
   PORT=5000
   ```

## Setup Instructions

1. **Start MongoDB**:

   - If using a local MongoDB instance, run:
     ```bash
     mongod
     ```
   - If using MongoDB Atlas, ensure the connection URI is correct in the `.env` file.

2. **Start the Server**:

   - Run the following command to start the server:
     ```bash
     npm start
     ```
   - The server will start and be accessible at `http://localhost:5000`.

   Alternatively, if you're using **nodemon** for development (auto-reload on file changes), use:

   ```bash
   npm run dev
   ```

## API Endpoints

### `POST /api/tasks`

- **Create a new task.**
- Request body:
  ```json
  {
    "title": "Task title",
    "description": "Task description",
    "status": "TODO",
    "priority": "HIGH",
    "dueDate": "2024-12-31T23:59:59"
  }
  ```

### `GET /tasks`

- Retrieve all tasks
- Support query parameters:
  - `status`: Filter by task status
  - `priority`: Filter by task priority
  - `sort`: Sort by createdAt or dueDate (ascending/descending)
- Implement pagination (limit and skip)

### `GET /tasks/:id`

- Retrieve a specific task by ID
- Return 404 if task not found

### `PUT /tasks/:id`

- **Update an existing task.**
- Request body:
  ```json
  {
    "title": "Update Task title",
    "description": "Task description",
    "status": "TODO",
    "priority": "HIGH",
    "dueDate": "2024-12-31T23:59:59"
  }
  ```
- Validate input data
- Update updatedAt timestamp
- Return updated task

### `DELETE /tasks/:id`

- Delete a specific task
- Return 204 No Content on successful deletion

### **Conclusion**

The Task Management API provides essential functionality to manage tasks efficiently. Key aspects of the implementation include:

- **RESTful Design**: Each endpoint serves a specific purpose (CRUD operations).
- **Data Validation**: Ensures that only valid data is stored and retrieved.
- **Pagination**: Improves performance when dealing with large datasets.
- **Error Handling**: Provides meaningful feedback to the client in case of errors.

This structure forms a good foundation for building a more robust task management application, and additional features like user authentication, notifications, and analytics can be added as needed.

### Provided a brief explanation of design decisions

### Design Decisions: Task Management API

The design of the **Task Management API** was guided by principles of scalability, maintainability, and user-friendliness. Here's an overview of the critical design decisions:

---

### 1. **RESTful API Structure**

- **Why**: REST principles provide a standardized approach to structuring APIs, making it intuitive for developers to use and extend.
- **How**: Each route corresponds to a specific action (e.g., `GET /tasks` retrieves tasks, `POST /tasks` creates a task).

---

### 2. **Node.js with Express.js**

- **Why**: Express.js is lightweight and flexible, making it ideal for building fast and scalable APIs.
- **How**: Middleware like `express.json()` and custom error handlers enhance request handling and debugging.

---

### 3. **MongoDB with Mongoose**

- **Why**: MongoDB’s flexibility in handling semi-structured data makes it suitable for evolving requirements. Mongoose simplifies schema validation and interaction with MongoDB.
- **How**: A well-defined schema for the Task model ensures data consistency.

---

### 4. **Soft Deletion**

- **Why**: Soft deletion allows tasks to be marked as deleted without permanently removing them, supporting data recovery and audit trails.
- **How**: A `isDeleted` field was added to the schema, and queries were updated to exclude soft-deleted tasks by default.

---

### 5. **JWT Authentication**

- **Why**: Token-based authentication provides a secure way to manage user sessions without the need for server-side state.
- **How**: A `JWT_SECRET` is used to sign tokens, which are verified on protected routes to ensure authorized access.

---

### 6. **Validation with Joi**

- **Why**: Input validation ensures the integrity of data received from users, preventing errors and malicious inputs.
- **How**: Joi schemas were implemented for validating request payloads, such as task creation and updates.

---

### 7. **Error Handling Middleware**

- **Why**: Centralized error handling ensures consistent and informative responses across the API.
- **How**: Custom middleware catches errors and formats them based on the environment (e.g., stack traces in development).

---

### 8. **Filtering, Sorting, and Pagination**

- **Why**: These features enhance usability by providing flexible ways to retrieve and organize tasks.
- **How**: Query parameters like `status`, `priority`, `sort`, `limit`, and `page` were implemented to improve task retrieval efficiency.

---

### 9. **Environment-Specific Configuration**

- **Why**: Storing sensitive data (e.g., database URI, JWT secret) in environment variables enhances security and allows easy configuration for different environments.
- **How**: The `dotenv` package was used to load variables from a `.env` file.

---

### 10. **Project Structure**

- **Why**: A modular folder structure improves code readability, maintainability, and scalability.
- **How**: Components like models, controllers, routes, and middlewares were separated, ensuring clear separation of concerns.

---

### 11. **Logging**

- **Why**: Logging aids in debugging and monitoring application performance.
- **How**: The `morgan` library was used for HTTP request logging in development mode.

---

### 12. **Scalability and Extensibility**

- **Why**: A scalable design ensures the API can handle future requirements like user management or additional features.
- **How**: Modular and reusable components make it easy to extend the API with minimal disruption.

These design decisions ensure the API is efficient, secure, and adaptable, making it suitable for real-world task management applications.
