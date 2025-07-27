<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Todo Test Automation Project Instructions

This is a full-stack test automation project demonstrating modern testing practices:

## Project Structure
- **Backend**: Node.js/Express API with TypeScript, JWT authentication, and in-memory database
- **Frontend**: React application with TypeScript and modern hooks
- **Tests**: Comprehensive test suite using Playwright (UI) and Supertest (API)

## Code Guidelines
- Use TypeScript for all new code
- Follow Page Object Model pattern for Playwright tests
- Implement proper error handling and validation
- Use modern React patterns (hooks, functional components)
- Write descriptive test names and clear assertions
- Include both positive and negative test cases

## Test Strategy
- UI tests should use Playwright with proper locators (data-testid, role-based)
- API tests should use Supertest with comprehensive coverage
- Include authentication flows in all relevant tests
- Use fixtures for test data management
- Implement proper test isolation and cleanup

## Authentication
- JWT-based authentication system
- Protected routes require valid tokens
- Test both authenticated and unauthenticated scenarios
