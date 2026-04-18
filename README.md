# Full-Stack Todo Application (Practice Environment)

A full-stack web application with React frontend, Laravel backend, MySQL database, and Docker environment.

## Features

- User authentication (login and registration)
- Todo list management (CRUD operations)
- MVC architecture with ORM
- Database transactions
- API-based communication

## Tech Stack

- **Frontend**: React with React Router
- **Backend**: Laravel (PHP 8.4) with Sanctum for API authentication
- **Database**: MySQL
- **Containerization**: Docker & Docker Compose

## Setup Instructions

### Prerequisites

- Docker and Docker Compose installed on your system

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Run the following command to build and start the containers:

```bash
docker-compose -f docker-compose.practice.yml up --build -d
```

4. Run database migrations:

```bash
docker-compose -f docker-compose.practice.yml exec laravel php artisan migrate
```

### Accessing the Application

- **Frontend (React)**: http://localhost:3002
- **Backend API**: http://localhost:8001

### API Endpoints

#### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout (requires authentication)
- `GET /api/user` - Get current user info (requires authentication)

#### Todos
- `GET /api/todos` - Get user's todos (requires authentication)
- `POST /api/todos` - Create a new todo (requires authentication)
- `GET /api/todos/{id}` - Get a specific todo (requires authentication)
- `PUT /api/todos/{id}` - Update a todo (requires authentication)
- `DELETE /api/todos/{id}` - Delete a todo (requires authentication)

### Usage

1. Open http://localhost:3001 in your browser
2. Register a new account or login with existing credentials
3. Create, view, update, and delete todos

### Development

To stop the containers:

```bash
docker-compose -f docker-compose.practice.yml down
```

To view logs:

```bash
docker-compose logs -f
```

To access the Laravel container:

```bash
docker-compose -f docker-compose.practice.yml exec laravel bash
```

### Database

- Database: `laravel_db`
- Username: `laravel_user`
- Password: set in `.env` or `.env.example`
- Host: `mysql` (from within containers) or `localhost:3307` (from host)

### Environment Variables

The application uses the following key environment variables (configured in `backend/.env` or `.env.example`):

- `DB_CONNECTION=mysql`
- `DB_HOST=mysql`
- `DB_PORT=3306`
- `DB_DATABASE=laravel_db`
- `DB_USERNAME=laravel_user`
- `DB_PASSWORD=your_database_password`
- `FRONTEND_URL=http://localhost:3001`
## Practice Environment Notes

This is a duplicate environment for practice purposes. Key differences from the original:
- MySQL port: 3308 (instead of 3306)
- Laravel API port: 8001 (instead of 8000)
- React app port: 3002 (instead of 3000)
- Docker compose file: docker-compose.practice.yml

You can run both environments simultaneously without conflicts.
