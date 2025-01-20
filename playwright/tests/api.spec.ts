import { test, expect } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1:5000';
let itemIds: string[] = [];
const nonexistentId = 26885;

test.describe('Inventory Management API', () => {
  // Setup and Teardown
  test.beforeAll(async () => {
    console.log('Setting up resources before tests...');
  });

  test.afterAll(async ({ request }) => {
    console.log('Tearing down resources after tests...');
    for (const itemId of itemIds) {
      await request.delete(`${BASE_URL}/items/${itemId}`);
    }
  });

  // Positive Test Cases

  test.describe('Create Items', () => {
    const items = [
      { name: 'MacBook Air', quantity: 5, price: 999.99 },
      { name: 'MacBook Pro', quantity: 3, price: 1299.99 },
      { name: 'iPad', quantity: 10, price: 499.99 },
      { name: 'iPhone', quantity: 7, price: 799.99 },
      { name: 'Apple Watch', quantity: 15, price: 399.99 },
      { name: 'AirPods', quantity: 20, price: 199.99 }
    ];

    items.forEach((item) => {
      test(`should create item: ${item.name}`, async ({ request }) => {
        const response = await request.post(`${BASE_URL}/items`, {
          data: item
        });
        expect(response.status()).toBe(201);
        const data = await response.json();
        itemIds.push(data.id);
        expect(data).toMatchObject(item);
      });
    });
  });

  test.describe('Retrieve Items', () => {
    [0, 1, 2, 3].forEach((index) => {
      test(`should retrieve item at index ${index}`, async ({ request }) => {
        const itemId = itemIds[index];
        const response = await request.get(`${BASE_URL}/items/${itemId}`);
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data.id).toBe(itemId);
      });
    });
  });

  test.describe('Update Items', () => {
    const updates = [
      { index: 0, data: { name: 'Updated MacBook Air', quantity: 6, price: 1099.99 } },
      { index: 1, data: { name: 'Updated MacBook Pro', quantity: 4, price: 1399.99 } },
      { index: 2, data: { name: 'Updated iPad', quantity: 11, price: 599.99 } },
      { index: 3, data: { name: 'Updated iPhone', quantity: 8, price: 899.99 } }
    ];

    updates.forEach(({ index, data }) => {
      test(`should update item at index ${index}`, async ({ request }) => {
        const itemId = itemIds[index];
        const response = await request.put(`${BASE_URL}/items/${itemId}`, {
          data
        });
        expect(response.status()).toBe(200);
        const updatedData = await response.json();
        expect(updatedData).toMatchObject(data);
      });
    });
  });

  test.describe('Delete Items', () => {
    [4, 5].forEach((index) => {
      test(`should delete item at index ${index}`, async ({ request }) => {
        const itemId = itemIds[index];
        const response = await request.delete(`${BASE_URL}/items/${itemId}`);
        expect(response.status()).toBe(204);
      });
    });
  });

  // Negative Test Cases

  test('should return 404 for non-existent item retrieval', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/items/${nonexistentId}`);
    expect(response.status()).toBe(404);
    const data = await response.json();
    expect(data.description).toBe('Item not found');
  });

  test('should return 404 for updating a non-existent item', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/items/${nonexistentId}`, {
      data: { name: 'Nonexistent Item', quantity: 0, price: 0.0 }
    });
    expect(response.status()).toBe(404);
    const data = await response.json();
    expect(data.description).toBe('Item not found');
  });

  test('should return 404 for deleting a non-existent item', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/items/${nonexistentId}`);
    expect(response.status()).toBe(404);
    const data = await response.json();
    expect(data.description).toBe('Item not found');
  });

  test.describe('Create Item with Invalid Data', () => {
    const invalidItems = [
      { data: { name: 'Invalid@Item', quantity: 1, price: 100.0 }, error: 'Invalid input data: name contains special characters' },
      { data: { name: 'Invalid Item', quantity: -1, price: 100.0 }, error: 'Invalid input data: quantity cannot be negative' },
      { data: { name: '', quantity: 1, price: 100.0 }, error: 'Invalid input data: name cannot be empty' },
      { data: { quantity: 1, price: 100.0 }, error: 'Invalid input data' }
    ];

    invalidItems.forEach(({ data, error }) => {
      test(`should return 400 for invalid data: ${JSON.stringify(data)}`, async ({ request }) => {
        const response = await request.post(`${BASE_URL}/items`, { data });
        expect(response.status()).toBe(400);
        const responseData = await response.json();
        expect(responseData.description).toBe(error);
      });
    });
  });
});
