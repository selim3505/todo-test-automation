# Todo Test Automation Project

## Project Overview

A comprehensive full-stack test automation project demonstrating modern testing practices with:

- 4 API Tests - Backend testing with Supertest + Jest
- 4 UI Tests - Frontend testing with Playwright + Page Object Model  
- CI/CD Pipeline - GitHub Actions automation
- Full Documentation - Complete setup and usage guide

## Tech Stack

### Backend
- Express.js
- JWT Authentication
- bcrypt Password Hashing

### Frontend  
- React Router
- Axios HTTP Client
- CSS3 Styling

### Testing
- Jest Testing Framework
- Supertest API Testing

## Quick Start

```bash
# Clone repository
git clone https://github.com/selim3505/todo-test-automation.git
cd todo-test-automation

# Install all dependencies
npm run install:all

# Run API tests
npm run test:api

# Run UI tests (requires servers running)
npm run test:ui
```

## Test Coverage

| Test Type | Coverage | Status |
|-----------|----------|---------|
| API Tests | 4/4 tests | PASSING |
| UI Tests | 4/4 tests | PASSING |
| Integration | Complete | PASSING |

### Test Scenarios
- Valid user registration
- Invalid user registration (error handling)
- Todo creation functionality  
- Todo deletion functionality

## Project Structure

```
todo-test-automation/
├── backend/              # Node.js API
│   ├── src/
│   │   ├── controllers/  # REST API controllers
│   │   ├── services/     # Business logic
│   │   ├── middleware/   # Authentication
│   │   └── tests/        # API tests (Supertest)
│   └── package.json
├── frontend/             # React App
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── contexts/     # State management
│   │   └── services/     # API client
│   ├── tests/            # UI tests (Playwright)
│   └── package.json
├── .github/workflows/    # CI/CD Pipeline
└── Documentation         # Setup guides
```

## Features

### Authentication System
- JWT token-based authentication
- Password hashing with bcrypt
- Input validation with Joi schemas

### Todo Management
- Create todos with title and description
- Mark todos as complete/incomplete
- Delete todos
- User-specific todo isolation

### Test Automation
- Page Object Model pattern for UI tests
- Cross-browser compatibility testing
- HTML reports with screenshots
- Parallel execution support

## Running the Application

### Development Mode
```bash
# Start backend (Terminal 1)
cd backend && npm run dev

# Start frontend (Terminal 2)  
cd frontend && npm start

# Visit: http://localhost:3000
```

### Production Mode
```bash
# Build everything
npm run build

# Start with Docker
docker-compose up
```

## CI/CD Pipeline

Automated workflows:
- Run tests on every push
- Multi-Node.js version testing (18.x, 20.x)
- Build verification
- Security scanning
- Quality gates

## Contact

**Developer:** Selim  
**GitHub:** [@selim3505](https://github.com/selim3505)  
**Project:** [todo-test-automation](https://github.com/selim3505/todo-test-automation)


## Technology Stack

### Backend
- Runtime: Node.js
- Framework: Express.js
- Language: TypeScript
- Authentication: JWT + bcryptjs
- Validation: Joi
- Testing: Jest + Supertest
- Database: In-memory (for demo purposes)

### Frontend
- Framework: React 18
- Language: TypeScript
- Routing: React Router
- HTTP Client: Axios
- Styling: CSS3 with modern design
- Testing: Playwright

### Testing Tools
- API Testing: Supertest + Jest
- UI Testing: Playwright
- Test Reports: HTML reports
- Coverage: Jest coverage reports

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/selim3505/todo-test-automation.git
   cd todo-test-automation
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

4. Install Playwright browsers
   ```bash
   npx playwright install
   ```

## Testing

### API Testing (Backend)
```bash
cd backend
npm test
```

### UI Testing (Frontend)
```bash
cd frontend
npx playwright test
```

## Configuration

### Environment Variables
- PORT: Server port (default: 3001)
- JWT_SECRET: JWT signing secret
- NODE_ENV: Environment (development/production)

### Playwright Configuration
UI tests are configured for:
- Multiple browsers (Chrome, Firefox, Safari)
- Mobile devices (iPhone, Android)
- Parallel execution
- Automatic retries on failure
- Screenshot and video capture

---

This project demonstrates modern test automation practices for full-stack applications.
