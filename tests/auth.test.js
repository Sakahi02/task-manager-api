// auth.test.js

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server'); // Import the app, not the server

let server;
let token; // Declare token variable globally

beforeAll(async () => {
  server = app.listen(5001, () => {
    console.log('Test server is running...');
  });

  // Login and store the token
  const response = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'testi@example.com',
      password: 'password123',
    });

  token = response.body.token; // Store token globally
});

afterAll(async () => {
  await mongoose.connection.close();  // Close DB connection
  await server.close();  // Properly close the server
});

describe('POST /api/auth/login', () => {
  it('should login the user and return a token', async () => {
    expect(token).toBeDefined(); // Ensure token was received
  });
});
