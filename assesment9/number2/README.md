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
        - `/api/auth/register`: POST, Register a new user.
        - `/api/auth/login`: POST, Log in with email and password to get a JWT.
