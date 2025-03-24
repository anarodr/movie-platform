# Movie Platform

This is a Full Stack project that consists of developing a movie platform where users can add, update, delete, and filter movies.

## Technologies Used

- **Backend:** Python with FastAPI
- **Frontend:** React
- **Database:** SQLite (can be changed as needed)
- **Deployment:** Docker

## Command in Makefile

```bash
make help
```

## Installation & Execution

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/movie-platform.git
cd movie-platform
```

### 2. Run the movie Platform

```bash
make run
```

## Development Notes

### 2. Backend

#### a) Installing Python packages

```bash
make pip.install packages="fastapi uvicorn"
```

## Main Features

- **Add Movies** with Name, Director, Year, and Average Rating.
- **Update Movies** to modify their details.
- **Delete Movies** from the platform.
- **Filter Movies** by Name, Director, Year, and Average Rating.

## Additional Notes

- The backend uses FastAPI with validations and OpenAPI available at `http://localhost:8000/docs`.
- The frontend is developed in React with React Router for navigation.
- The project follows best development practices and is structured for maintainability.

## Contact

If you have any questions or suggestions, feel free to contact anarodriguezvallejos@gmail.com.

#

sudo apt-get install python3-dev

#

sudo usermod -aG docker $USER
