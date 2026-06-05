# Project Context: HR Software Backend

## 1. Project Overview
This is the backend service for a multi-tenant HR Software application. It provides RESTful APIs for managing super admins, organizations (tenants), employees, and subscription plans.

## 2. Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma (`@prisma/client` with `@prisma/adapter-pg` and `pg` pool)
- **Authentication**: JWT (`jsonwebtoken`) and `bcrypt` for password hashing
- **Environment Management**: `dotenv` (and potentially `dotenvx`)

## 3. Architecture & Structure
The project follows a layered, modular architecture (Controller-Service-Route):
- `server.js`: Main entry point. Bootstraps the Express app and connects to the database.
- `src/configs/`: Configuration files (e.g., `app.js` for Express middleware, `database.js` for Prisma/Postgres connection pooling).
- `src/module/<feature>/`: Contains the business logic grouped by domain/feature (e.g., `auth.admin`).
  - `*Route.js`: Defines Express routes.
  - `*Controller.js`: Extracts request data, calls the service, and formats the HTTP response.
  - `*Service.js`: Contains core business logic and interacts with the database via Prisma.
- `src/utils/`: Helper functions and classes (`AppError.js`, `asyncHandler.js`, `generateToken.js`).

## 4. Coding Conventions & Patterns
- **Error Handling**: Uses a custom `AppError` class. All asynchronous controller methods are wrapped in `asyncHandler` to pass exceptions automatically to the global Express error handler.
- **API Responses**: Standardized JSON response format:
  ```json
  {
    "status": "success", // or "fail" / "error"
    "message": "Human readable message",
    "data": { ... } // Payload (null on failure)
  }
  ```
- **Authentication**: 
  - JWT tokens are generated with a 1-hour expiration.
  - Tokens are returned in the JSON payload AND set as an `HttpOnly` cookie.

## 5. Database Schema (Prisma)
The system uses a Role-Based Access Control (RBAC) model defined by the `Role` enum (`SUPERADMIN`, `ORGANIZATION`, `EMPLOYEE`).

### Core Models:
1. **`SuperAdmin`**: System administrators.
   - Has a one-to-many relationship with `Organization`.
   - Unique fields: `email`, `contact`.
2. **`Organization`**: Tenants / Companies using the HR software.
   - Belongs to a `SuperAdmin` (`adminID`).
   - Unique fields: `email`, `contact`, `adminID`.
3. **`Employee`**: Workers within the organizations.
   - Unique fields: `email`, `contact`.
4. **`Plan`**: Subscription packages (price, features array).

## 6. Current Implementation Status
- **Auth Module**: Currently implementing authentication logic for the `SuperAdmin` entity (Registration and Login APIs are built).
- **Database Sync**: Recently fixed model casing (`SuperAdmmin` -> `SuperAdmin`) in `schema.prisma`. 

## 7. AI Agent Instructions
When generating code for this project:
- Always use the `asyncHandler` for controller methods.
- Throw `AppError` instances for validation and business logic failures.
- Do not return passwords in API responses (delete/exclude them in the Service layer).
- Ensure Prisma model names match `schema.prisma` exactly using camelCase (e.g., `prisma.superAdmin`).