# Books Management API

Welcome to the Books Management API! This project provides a RESTful API for managing books in a bookstore, with features including user authentication and CRUD operations for books.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/sakibhasancse/books.git
    cd books
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

## API Endpoints

- **Books:**
  - `GET /books`: Retrieve a list of all books
  - `POST /books`: Add a new book
  - `GET /books/{id}`: Retrieve details of a specific book by ID
  - `PUT /books/{id}`: Update details of an existing book
  - `DELETE /books/{id}`: Remove a book from the store

- **Authentication:**
  - `POST /auth/signup`: Sign up a new user
  - `POST /auth/login`: Log in a user
  - `POST /auth/logout`: Log out the user

Refer to the [Swagger documentation](http://localhost:3000/api-docs) for detailed API specifications.

## Configuration

1. **Environment Variables:**

   Copy the `.env.example` file to `.env` and replace the placeholder values with your actual configuration. Specifically, update the `DB_URL` with your database connection string.

   ```bash
   cp .env.example .env
   ```

2. **Seed Data:**

   To seed the initial data into the database, run:

   ```bash
   npm run seed
   ```

## Running the Project

To start the project in development mode, use:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

## Testing

To run the test cases, use:

```bash
npm run test
```

## Docker

The project includes Docker support. To set up and run the project using Docker, follow these steps:

1. **Copy the Docker Compose file:**

   ```bash
   cp docker-compose.example.yml docker-compose.yml
   ```

2. **Update the `docker-compose.yml` file** as needed.

3. **Build and run the Docker containers:**

   ```bash
   docker-compose up --build
   ```
