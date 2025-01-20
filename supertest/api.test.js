const request = require('supertest');

const BASE_URL = "http://127.0.0.1:5000";

describe('Inventory Management API', () => {
  let itemIds = [];

  // Global setup before any test runs
  beforeAll(async () => {
    console.log("Setting up test environment...");
    // Optional: Add setup logic here, such as initializing test data or seeding the database
    const response = await request(BASE_URL).get(`/items`);
    expect(response.status).toBe(200);
    console.log(`Test server running on ${BASE_URL}`);
  });

  // Global teardown after all tests finish
  afterAll(async () => {
    console.log("Tearing down test environment...");
    // Optional: Add teardown logic here, such as cleaning up test data
    for (const id of itemIds) {
      try {
        await request(BASE_URL).delete(`/items/${id}`);
      } catch (err) {
        console.error(`Failed to clean up item with ID ${id}:`, err.message);
      }
    }
  });
  
  // Parameterized test cases for creating items
  describe.each([
    { name: 'MacBook Air', quantity: 5, price: 999.99 },
    { name: 'MacBook Pro', quantity: 3, price: 1299.99 },
    { name: 'iPad', quantity: 10, price: 499.99 },
    { name: 'iPhone', quantity: 7, price: 799.99 },
    { name: 'Apple Watch', quantity: 15, price: 399.99 },
    { name: 'AirPods', quantity: 20, price: 199.99 },
  ])('POST /items - Create Item %p', (item) => {
    test('should create an item successfully', async () => {
      const response = await request(BASE_URL).post('/items').send(item);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(item);
      itemIds.push(response.body.id); // Save created item IDs for further tests
    });
  });

  // Parameterized test cases for retrieving items by ID
  describe.each([0, 1, 2, 3])('GET /items/:id - Retrieve Item at Index %p', (index) => {
    test('should retrieve the item successfully', async () => {
      const itemId = itemIds[index];
      const response = await request(BASE_URL).get(`/items/${itemId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', itemId);
    });
  });

  // Parameterized test cases for updating items
  describe.each([
    [0, { name: 'Updated MacBook Air', quantity: 6, price: 1099.99 }],
    [1, { name: 'Updated MacBook Pro', quantity: 4, price: 1399.99 }],
    [2, { name: 'Updated iPad', quantity: 11, price: 599.99 }],
    [3, { name: 'Updated iPhone', quantity: 8, price: 899.99 }],
  ])('PUT /items/:id - Update Item at Index %p', (index, updatedItem) => {
    test('should update the item successfully', async () => {
      const itemId = itemIds[index];
      const response = await request(BASE_URL).put(`/items/${itemId}`).send(updatedItem);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatedItem);
    });
  });

  // Parameterized test cases for deleting items
  describe.each([4, 5])('DELETE /items/:id - Delete Item at Index %p', (index) => {
    test('should delete the item successfully', async () => {
      const itemId = itemIds[index];
      const response = await request(BASE_URL).delete(`/items/${itemId}`);
      expect(response.status).toBe(204);
    });
  });

  // Negative test cases for error handling
  describe('Negative Test Cases', () => {
    test('GET /items/:id - Nonexistent Item', async () => {
      const response = await request(BASE_URL).get('/items/nonexistent-id');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('description', 'Item not found');
    });

    test('PUT /items/:id - Nonexistent Item', async () => {
      const response = await request(BASE_URL).put('/items/nonexistent-id').send({
        name: 'Nonexistent Item',
        quantity: 1,
        price: 100.0,
      });
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('description', 'Item not found');
    });

    test('DELETE /items/:id - Nonexistent Item', async () => {
      const response = await request(BASE_URL).delete('/items/nonexistent-id');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('description', 'Item not found');
    });

    test.each([
      [{ name: 'Invalid@Item', quantity: 1, price: 100.0 }, 'Invalid input data: name contains special characters'],
      [{ name: 'Invalid Item', quantity: -1, price: 100.0 }, 'Invalid input data: quantity cannot be negative'],
      [{ name: 'Invalid Item', quantity: 1, price: -100.0 }, 'Invalid input data: price cannot be negative'],
    ])('POST /items - Invalid Data %p', async (invalidItem, expectedError) => {
      const response = await request(BASE_URL).post('/items').send(invalidItem);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('description', expectedError);
    });
  });
});
