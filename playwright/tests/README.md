# 🧪 Playwright Tests for Modern Testing Workshop

This repository contains **Playwright** end-to-end tests for the **Modern Testing Workshop** application.

## 📌 Prerequisites
Ensure you have the following installed:
- [**Node.js**](https://nodejs.org/) (LTS recommended)
- **npm** or **yarn**
- [**Playwright**](https://playwright.dev/)

---

## 🚀 Installation

1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd playwright
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Install Playwright drivers** (browsers, dependencies):
   ```sh
   npx playwright install
   ```

---

## 🎯 Running Tests

### ✅ Run All Tests
```sh
npx playwright test
```

### 🎯 Run Specific Test Files
```sh
npx playwright test tests/example2.spec.js
```

**Run multiple files**:
```sh
npx playwright test tests/example2.spec.js tests/example4.spec.js
```

### 🔎 Run Tests by Pattern
```sh
npx playwright test tests/example*.spec.js
```

### 🔍 Run Tests by Name
Run all tests that contain "Character Counter" in their title:
```sh
npx playwright test --grep "Character Counter"
```

### 📂 Run Tests from a Specific Directory
```sh
npx playwright test tests/ui/
```

---

## 🎭 Running Tests in Different Modes

### 🎭 Run a Single Test in a File
Modify the test by adding `.only`:
```js
test.only('should update the character counter correctly', async ({ page }) => {
  await page.goto('/example-2');
  await expect(page.locator('[data-cy=chars-left-count]')).toHaveText('10');
});
```
Then run:
```sh
npx playwright test
```

### 🐞 Run in Debug Mode
```sh
npx playwright test tests/example2.spec.js --debug
```

### 🖥️ Run in Headed Mode (With Browser UI)
```sh
npx playwright test --headed
```

### 🛠️ Run UI Mode (Interactive Debugging)
```sh
npx playwright test --ui
```

---

## 📊 Generating Test Reports

### 📄 HTML Report
```sh
npx playwright test --reporter=html
```
View the report:
```sh
npx playwright show-report
```

### 📜 JSON Reports
```sh
npx playwright test --reporter=json
```

---

## 🔄 Running Tests in CI/CD (GitHub Actions, Jenkins, GitLab)

1. **Add Playwright to your CI/CD pipeline**
2. Use:
   ```sh
   npx playwright install --with-deps
   npx playwright test
   ```
3. Store **artifacts** (e.g., HTML reports) for debugging.

---

## 🛠️ Troubleshooting

❌ **Tests Failing Randomly?**  
Try running in `--debug` mode:
```sh
npx playwright test --debug
```

❌ **Playwright Not Found?**  
Ensure it's installed:
```sh
npx playwright install
```

❌ **Selectors Not Working?**  
Use Playwright's interactive selector tool:
```sh
npx playwright codegen http://localhost:5173/
```

---

🚀 **Happy Testing with Playwright!** 🧪
```

---