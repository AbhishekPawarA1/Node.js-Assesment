# Dockerized Authentication System

## Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone https://your-repository-url.git
    cd dockerized-auth
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create `.env` file** with your environment variables:
    ```
    MONGODB_URI=mongodb://localhost:27017/authDB
    JWT_SECRET=mysecretkey
    PORT=5000
    ```

4. **Run the app with Docker**:
    ```bash
    docker-compose up --build
    ```

5. **Access the app**:
    - **API Documentation**:
        - `/register`: POST, Register a user.
        - `/login`: POST, Log in with email and password to get a JWT.
        - `/protected`: GET, Access a protected route with JWT.

---

### **Git Hooks Setup for Code Quality**  
You can use **Husky** and **Lint-Staged** to set up Git hooks for linting and testing.

```bash
npm install --save-dev husky lint-staged
npx husky-init
