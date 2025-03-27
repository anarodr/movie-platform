# Movie Platform

This is a Full Stack project that consists of developing a movie platform where users can add, update, delete, and filter movies.

## Main Features

- **Add Movies** with Name, Director, Year, and Average Rating.
- **Update Movies** to modify their details.
- **Delete Movies** from the platform.
- **Filter Movies** by Name, Director, Year, and Average Rating.

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast development tool for React that enhances the development experience.
- **State Management**: Used Redux for state management.
- **Styles**: Used Tailwind for styling the app.

### Backend

- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.10.12+ based on the OpenAPI standard.
- **Python**: Programming language used for the backend.
- **Database:** MongoDB
- **Deployment:** Docker

## Installation & Execution

### 1. Clone the Repository

```bash
git clone https://github.com/anarodr/movie-platform
cd movie-platform
```

### 2. Run the movie Platform

```bash
make up
```

### 2. Access de Application

- **Frontend**: Open your browser and visit http://localhost:3000
- **API Documentation**: Visit http://localhost:8000/docs to explore the FastAPI Swagger documentation.

## Development Notes

### 1. Frontend

#### a) Architecture

```
├───assets # Static assets (images, icons, etc.)
├───axios # Axios configuration and API calls
├───home  # Home page components
│ └───components
├───lib  # Shared utilities and helper functions
│ ├───buttons
│ │ └───types
│ ├───cards
│ ├───inputs
│ ├───loaders
│ └───ratings
├───movies # Movie-related logic and UI
│ ├───components # Reusable movie-related components
│ ├───containers # Higher-level movie components
│ ├───services # Business logic and API calls for movies
│ ├───store # State management for movies
│ └───types # Type definitions for movies
├───shared # Shared components and utilities
│ ├───components
│ └───hooks # Shared custom hooks
├───store # Global state management
└───test # Test config
```

#### b) Application Functionality

### Home Page

When the user lands on the **Home Page**, they can select and click to search for movies. This action redirects them to the **Movies List Page**, where all available movies are displayed.

### Movies List Page

- Initially, all movies are retrieved and displayed.
- The user can use search fields to filter results:
  - **Name & Director**: Perform partial (non-exact) searches.
  - **Year Range (From - To)**: Allows filtering movies within a specific year range.
  - **Rating Range (From - To)**: Filters movies based on a rating range.
- There is a button to **Create a New Movie**, which redirects the user to the **Movie Creation Form**.

### Movie Creation Form

- The form includes frontend validation: the **Submit button is only enabled if the form is correctly filled out**.
- After successfully saving a new movie, a **confirmation toast** appears.
- If there is a mismatch between frontend and backend validation or another saving error occurs (e.g., trying to submit a decimal value), an **error toast** is displayed.
- The user can return to the **Movies List Page**, and previously applied filters remain saved in Redux.

### Movie Editing Form

- From the **Movies List Page**, the user can also **edit an existing movie**.
- The **same form component is reused** for both creation and editing. When editing, the form is pre-filled with the movie’s existing data, retrieved using a **getOne** request.
- The user can return to the **Movies List Page**, and filters remain intact.

### Movie Deletion

- The user can permanently delete a movie from the **Movies List Page**.
- Before deletion, a **confirmation modal** appears to prevent accidental removal.

### Responsive Design

- All screens are **fully responsive**, ensuring a seamless experience across different devices.
- The application works smoothly on **desktop, tablet, and mobile resolutions**.

This structured approach ensures a smooth user experience while maintaining validation consistency between the frontend and backend.

#### c) Testing

The frontend uses **React Testing Library** along with **Vitest** to ensure the correctness of components and user interactions.

### 🔹 Integration and UI Testing

- Simulates **user interactions** (e.g., clicking buttons, filling out forms) to validate expected behavior.
- Ensures that key workflows, such as **movie creation, editing, and filtering**, function correctly.
- Uses **Vitest** as the test runner, which is optimized for Vite and provides fast execution times.

This approach guarantees a **stable, maintainable, and user-friendly** frontend, preventing regressions and ensuring a smooth user experience.

### 2. Backend

#### a) Architecture

The backend follows a **Hexagonal Architecture (Ports and Adapters)** approach, ensuring a clean separation of concerns between the **application, domain, and infrastructure layers**.

```
├───application         # Application layer (Use Cases)
│   ├───delete_uc       # Use Case: Delete a Movie
│   ├───find_all_uc     # Use Case: Find All Movies
│   ├───find_by_id_uc   # Use Case: Find a Movie by ID
│   ├───provision_oc    # Use Case: Provision
│   ├───save_uc         # Use Case: Save a New Movie
│   ├───update_uc       # Use Case: Update an Existing Movie
├───domain              # Domain layer (Business logic)
│   ├───value_objects   # Value objects (immutable domain concepts like Rating, Year) here used also to apply validations
└───infrastructure      # Infrastructure layer (controllers, database)
```

### Benefits of Hexagonal Architecture:

- **Scalability**: Easily extend or replace components (e.g., databases, APIs) without affecting core business logic.
- **Maintainability**: Code remains modular and easier to test by isolating business rules from infrastructure details.
- **Flexibility**: Supports multiple input/output adapters, making it easier to integrate with different technologies.
- **Testability**: Encourages unit testing of business logic without relying on external dependencies.

This approach makes the system more **adaptable, testable, and future-proof**, aligning with best practices for modern backend development.

#### b) Testing

The project uses **pytest** for testing at both the **application level (unit tests)** and the **infrastructure level (integration tests)**.

### Command

This from parent folder will execute the tests for both backend and frontend inside the docker container.

```bash
make test
```

### 🔹 Unit Testing (Application Layer)

- Unit tests focus on **business logic** without dependencies on external systems.
- Use cases (e.g., finding, saving, updating, and deleting movies) are tested in isolation.
- Mocking is used to decouple tests from the database and external services.

### 🔹 Integration Testing (Infrastructure Layer)

- **Database (MongoDB)**: Tests validate repository implementations and database interactions to ensure data consistency.
- **Controllers (FastAPI Endpoints)**: API integration tests verify request/response behavior, status codes, and input validation.
- Uses **TestClient from FastAPI** to simulate API requests and **a MongoDB instance** to avoid modifying real data.

This testing strategy ensures **high code reliability**, **prevents regressions**, and keeps the system **robust and scalable**.

## Requirements

### System Requirements

- docker compose v2.18.1
- Docker 24.0.2
- Node.js >= 20.0.0 (optional for the React frontend)
- Python >= 3.10.12 (optional for the FastAPI backend)
- Pip (optional Python package manager)
- Virtualenv (optional, for creating virtual environments in Python)

### Local Installation

#### Frontend (React + Vite)

1. Clone the repository:

   ```bash
   git clone https://github.com/anarodr/movie-platform
   cd movie-platform/frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the app in your browser at localhost:port

5. Launch tests:

   ```bash
   npm run test
   ```
