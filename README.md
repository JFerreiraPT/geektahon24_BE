# AI'm Confused Team

## Description

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- Docker (for MongoDB container)
- npm (Node Package Manager)

### Installation

#### 1. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

#### 2. Configure Environment Variables

1. Create a copy of the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and fill in the required variables
   > Note: If you need help with the values, please contact our team.

#### 3. Set up MongoDB

Start the MongoDB container using Docker Compose:

```bash
docker-compose up
```

### Running the Application

To start the application in development mode, use:

```bash
npm run start:dev
```

Once started, the application will be available at `http://localhost:3000/api` (default port).

---

For additional support or questions, please contact the AI'm Confused Team.
