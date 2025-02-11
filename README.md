# Task Manager API

A simple Task Manager API built with Node.js and Express, allowing users to manage their tasks. This API supports creating, updating, deleting, and fetching tasks, as well as user authentication and authorization.

## Features

- **User Authentication**: Sign up, log in, and manage authentication via JWT (JSON Web Tokens).
- **Task Management**: Create, update, and delete tasks.
- **Task Filtering**: Filter tasks based on their completion status.
- **Environment Configuration**: Use environment variables for database configuration and secret keys.

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express.js**: Web framework for Node.js, used for routing and handling HTTP requests.
- **MongoDB**: NoSQL database for storing user and task data.
- **JWT (JSON Web Tokens)**: For handling user authentication and authorization.
- **Jest**: A testing framework for ensuring the API is working as expected.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- **Node.js** (LTS version)
- **MongoDB** (for local development) or a cloud MongoDB instance (like MongoDB Atlas).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sakahi02/task-manager-api.git
2.cd task-manager-api
3.npm install
4.Create a .env file in the root of the project with the following configuration:

MONGO_URI=mongodb+srv://Sakshi_Dev_02:EMLWf7kSR6Ami@cluster0.oou5e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=Sakshi_Dev_02
PORT=5002
JWT_EXPIRATION=1h
NODE_ENV=''

5.npm start
6.npm test
