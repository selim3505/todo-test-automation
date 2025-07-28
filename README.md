# Todo Test Automation Project

**TypeScript** | **React** | **Node.js** | **Jest** | **Playwright**

## Overview

A comprehensive full-stack test automation project showcasing modern testing practices and tools. Features a React frontend, Node.js backend, and complete test coverage with CI/CD automation.

## Features

✅ **Full-Stack Application**
- React frontend with TypeScript
- Node.js backend with Express
- JWT authentication system
- RESTful API endpoints

✅ **Test Automation**
- API testing with Supertest + Jest
- UI testing with Playwright
- Page Object Model pattern
- Cross-browser compatibility

✅ **DevOps & CI/CD**
- GitHub Actions pipeline
- Automated testing on push
- Multi-environment testing
- Docker containerization

## Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React 18, TypeScript, React Router, Axios |
| **Backend** | Node.js, Express, TypeScript, JWT, bcrypt |
| **Testing** | Jest, Supertest, Playwright |
| **CI/CD** | GitHub Actions |
| **Containerization** | Docker, Docker Compose |

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/selim3505/todo-test-automation.git
cd todo-test-automation

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install Playwright browsers
npx playwright install
```

### Running the Application

```bash
# Start backend server (Terminal 1)
cd backend
npm run dev

# Start frontend application (Terminal 2)
cd frontend
npm start

# Visit http://localhost:3000
```

### Running Tests

```bash
# Run API tests
cd backend
npm test

# Run UI tests (requires app to be running)
cd frontend
npx playwright test
```

## Test Coverage

| Test Type | Count | Status |
|-----------|-------|--------|
| API Tests | 4 | ✅ Passing |
| UI Tests | 4 | ✅ Passing |
| Integration | Complete | ✅ Passing |

### Test Scenarios

**API Testing:**
- User registration (valid/invalid)
- User authentication
- Todo creation
- Todo deletion

**UI Testing:**
- Login flow validation
- Todo management interface
- Form validation
- Error handling

## Project Structure

```
todo-test-automation/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth & validation
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── tests/           # API tests
│   └── package.json
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # State management
│   │   └── services/        # API client
│   ├── tests/               # UI tests
│   │   └── pages/           # Page Object Model
│   └── package.json
├── .github/workflows/       # CI/CD pipeline
├── docker-compose.yml       # Container orchestration
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User authentication |
| GET | `/api/todos` | Get user todos |
| POST | `/api/todos` | Create new todo |
| DELETE | `/api/todos/:id` | Delete todo |

## CI/CD Pipeline

The project includes automated workflows:

- **Test Automation**: Run all tests on every push
- **Multi-Environment**: Test on Node.js 18.x and 20.x
- **Build Verification**: Ensure code compiles successfully
- **Security Scanning**: Check for vulnerabilities

## Docker Support

```bash
# Run with Docker Compose
docker-compose up

# Build custom image
docker build -t todo-app .
docker run -p 3000:3000 todo-app
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

## License

This project is created for demonstration purposes.

---

**Built with ❤️ by [Selim](https://github.com/selim3505)**
