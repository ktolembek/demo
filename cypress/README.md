## 📘 Cypress Test Suite - README

This project contains Cypress test cases for a React application designed for modern testing workshops. The Cypress tests validate different interactive elements across multiple example pages.

---

### 🚀 **Getting Started**

### **1️⃣ Installation**
Ensure you have [Node.js](https://nodejs.org/) installed. Then, install Cypress and dependencies:

```bash
npm install
npx cypress open
```

---

### **2️⃣ Project Structure**
```
/cypress
  ├── /e2e
  │    ├── homepage.cy.js
  │    ├── example1.cy.js
  │    ├── example2.cy.js
  │    ├── example3.cy.js
  │    ├── example4.cy.js
  ├── /fixtures
  ├── /support
  ├── cypress.config.js
```

- **`homepage.cy.js`** - Tests navigation across pages.
- **`example1.cy.js`** - Tests heading text.
- **`example2.cy.js`** - Tests character counter for a text input.
- **`example3.cy.js`** - Tests multiple text inputs and greeting messages.
- **`example4.cy.js`** - Tests clicks, checkboxes, dropdowns, and mouseover events.

---

### **3️⃣ Running Tests**
#### ✅ Open Cypress GUI:
```bash
npx cypress open
```
- Select `E2E Testing`
- Choose `Chrome` or another browser
- Click on a test to execute it

#### ✅ Run Tests in CLI:
```bash
npx cypress run
```
- Runs all tests in headless mode.

---

### **4️⃣ Test Breakdown**
#### 🏠 **Homepage Tests (`homepage.cy.js`)**:
- Navigates between example pages to verify correct routing.

#### 🔤 **Example 1 - Heading Tests (`example1.cy.js`)**:
- Verifies that the main heading exists and has the correct text.

#### ✍ **Example 2 - Character Counter (`example2.cy.js`)**:
- Ensures character count updates as users type.
- Limits input to 15 characters.

#### 📝 **Example 3 - Multiple Inputs (`example3.cy.js`)**:
- Tests independent text inputs.
- Checks personalized greeting messages.

#### 🎯 **Example 4 - Click, Select, Check (`example4.cy.js`)**:
- Validates click and double-click behavior.
- Ensures checkboxes update correctly.
- Dropdown selections persist.
- Mouseover highlights correct elements.

---

### **5️⃣ Configuration**
Ensure Cypress is set up with the correct base URL in `cypress.config.js`:

```javascript
module.exports = {
  e2e: {
    baseUrl: 'http://localhost:5173',
  },
};
```

---

### **6️⃣ Debugging**
- Use `cy.debug()` to pause execution.
- Add `cy.screenshot()` for visual debugging.
- Run Cypress in interactive mode using `npx cypress open`.

---

🚀 **Happy Testing!** 🚀