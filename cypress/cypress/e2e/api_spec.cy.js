describe("Inventory API Tests", () => {
    const BASE_URL = "http://127.0.0.1:5000";
    let itemIds = [];
    const nonexistentId = "non-existent-uuid";
  
    before(() => {
      cy.log("Setting up resources before tests");
    });
  
    after(() => {
      cy.log("Tearing down resources after tests");
      itemIds.forEach((id) => {
        cy.request("DELETE", `${BASE_URL}/items/${id}`);
      });
    });
  
    /**
     * Positive Test Cases - CRUD Operations
     */
  
    const testItems = [
      { name: "MacBook Air", quantity: 5, price: 999.99 },
      { name: "MacBook Pro", quantity: 3, price: 1299.99 },
      { name: "iPad", quantity: 10, price: 499.99 },
      { name: "iPhone", quantity: 7, price: 799.99 },
      { name: "Apple Watch", quantity: 15, price: 399.99 },
      { name: "AirPods", quantity: 20, price: 199.99 }
    ];
  
    it("should create new items successfully", () => {
      testItems.forEach((item) => {
        cy.request("POST", `${BASE_URL}/items`, item).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.name).to.eq(item.name);
          expect(response.body.quantity).to.eq(item.quantity);
          expect(response.body.price).to.eq(item.price);
          itemIds.push(response.body.id); // Save created item ID
        });
      });
    });
  
    it("should retrieve an item by ID", () => {
      cy.request("GET", `${BASE_URL}/items/${itemIds[0]}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(itemIds[0]);
      });
    });
  
    const updatedItems = [
      { name: "Updated MacBook Air", quantity: 6, price: 1099.99 },
      { name: "Updated MacBook Pro", quantity: 4, price: 1399.99 },
      { name: "Updated iPad", quantity: 11, price: 599.99 },
      { name: "Updated iPhone", quantity: 8, price: 899.99 }
    ];
  
    it("should update existing items successfully", () => {
      updatedItems.forEach((updatedItem, index) => {
        cy.request("PUT", `${BASE_URL}/items/${itemIds[index]}`, updatedItem).then(
          (response) => {
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq(updatedItem.name);
            expect(response.body.quantity).to.eq(updatedItem.quantity);
            expect(response.body.price).to.eq(updatedItem.price);
          }
        );
      });
    });
  
    it("should delete an item successfully", () => {
      cy.request("DELETE", `${BASE_URL}/items/${itemIds[4]}`).then((response) => {
        expect(response.status).to.eq(204);
      });
  
      cy.request({
        method: "GET",
        url: `${BASE_URL}/items/${itemIds[4]}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
      // delete the item from the list of itemIds
      itemIds = itemIds.filter((id) => id !== itemIds[4]);
    });
  
    /**
     * Negative Test Cases - Error Handling
     */
  
    it("should return 404 when retrieving a non-existent item", () => {
      cy.request({
        method: "GET",
        url: `${BASE_URL}/items/${nonexistentId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.description).to.eq("Item not found");
      });
    });
  
    it("should return 404 when updating a non-existent item", () => {
      cy.request({
        method: "PUT",
        url: `${BASE_URL}/items/${nonexistentId}`,
        failOnStatusCode: false,
        body: { name: "Nonexistent Item", quantity: 0, price: 0.0 }
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.description).to.eq("Item not found");
      });
    });
  
    it("should return 404 when deleting a non-existent item", () => {
      cy.request({
        method: "DELETE",
        url: `${BASE_URL}/items/${nonexistentId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.description).to.eq("Item not found");
      });
    });
  
    /**
     * Invalid Data Test Cases
     */
  
    const invalidItems = [
      { item: { name: "Invalid@Item", quantity: 1, price: 100.0 }, error: "Invalid input data: name contains special characters" },
      { item: { name: "Invalid Item", quantity: "one", price: 100.0 }, error: "Invalid input data: quantity must be an integer" },
      { item: { name: "Invalid Item", quantity: -1, price: 100.0 }, error: "Invalid input data: quantity cannot be negative" },
      { item: { name: "Invalid Item", quantity: 1, price: -100.0 }, error: "Invalid input data: price cannot be negative" },
      { item: { name: "", quantity: 1, price: 100.0 }, error: "Invalid input data: name cannot be empty" },
      { item: { name: "Invalid Item", quantity: 1, price: 0.0 }, error: "Invalid input data: price cannot be zero" },
      { item: { name: "Invalid Item", quantity: 0, price: 100.0 }, error: "Invalid input data: quantity cannot be zero" },
      { item: { quantity: 1, price: 100.0 }, error: "Invalid input data" },
      { item: { name: "Invalid Item", price: 100.0 }, error: "Invalid input data" },
      { item: { name: "Invalid Item", quantity: 1 }, error: "Invalid input data" }
    ];
  
    invalidItems.forEach(({ item, error }) => {
      it(`should return 400 when creating an item with invalid data`, () => {
        cy.request({
          method: "POST",
          url: `${BASE_URL}/items`,
          failOnStatusCode: false,
          body: item
        }).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.description).to.eq(error);
        });
      });
    });
  
    it("should return 400 when updating an item with invalid data", () => {
      const invalidUpdate = { name: "Invalid Item", quantity: "wrong", price: 100.0 };
      cy.request({
        method: "PUT",
        url: `${BASE_URL}/items/${itemIds[0]}`,
        failOnStatusCode: false,
        body: invalidUpdate
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.description).to.eq("Invalid input data: quantity must be an integer");
      });
    });
  });
  