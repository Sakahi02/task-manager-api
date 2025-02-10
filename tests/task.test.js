const request = require('supertest');
const app = require('../server');  // Import your Express app
const mongoose = require('mongoose');

describe('Task Management Tests', () => {
  let token = '';
  let createdTaskId = '';  // Variable to store the ID of the task created during testing

  beforeAll(async () => {
    // Login to get a JWT token for authentication
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testi@example.com',
        password: 'password123',
      });
    token = loginResponse.body.token;  // Store the token for authenticated requests
    
  });

  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `${token}`)
      .send({
          "title": "Test Task",
          "description": "This is a task description",
          "priority": "high",
          "due_date": "2025-02-10T12:00:00Z",
          "assigned_to": "60e6f4b5b9c7db45b431a5f3",  // MongoDB ObjectId as a string
          "status": "todo"  // Valid status value
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', 'Test Task');
    
    createdTaskId = response.body._id;  // Store the ID of the created task to use in subsequent tests
   
  },10000);
  
  it('should fetch all tasks', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `${token}`);
   
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should update a task', async () => {
    expect(createdTaskId).toBeDefined();  // Ensure the task ID is available before running this test

    const response = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .set('Authorization', `${token}`)
      .send({
        title: 'Updated Task',
        description: 'This task has been updated.',
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should delete a task', async () => {
    expect(createdTaskId).toBeDefined();  // Ensure the task ID is available before running this test

    const response = await request(app)
      .delete(`/api/tasks/${createdTaskId}`)
      .set('Authorization', `${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Task deleted successfully');
  });
});

afterAll(async () => {
  await mongoose.connection.close();  // Close MongoDB connection after tests
});
