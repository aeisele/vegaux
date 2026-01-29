# VEGAUX Server

Spring Boot backend for the VEGAUX application.

## Database Setup

The project uses PostgreSQL with PostGIS for geospatial data. A Docker Compose configuration is provided for local development.

### Prerequisites

- Docker and Docker Compose
- Create a `.env` file or set the `POSTGRES_PASSWORD` environment variable

### Starting the Database

```bash
cd vegaux-server

# Start PostgreSQL with PostGIS
docker compose up -d postgres

# Check status
docker compose ps

# View logs
docker compose logs -f postgres

# Stop the database
docker compose down

# Stop and remove data volume
docker compose down -v
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `POSTGRES_USER` | `postgres` | Database username |
| `POSTGRES_PASSWORD` | (required) | Database password |
| `POSTGRES_DB` | `postgres` | Database name |

## Database Migrations

Migrations are managed with Liquibase. Changelogs are located in `src/main/resources/db/changelog/`.

### Running Migrations

Use the `liquibase.sh` wrapper script, which automatically starts postgres if needed:

```bash
./liquibase.sh              # Apply pending migrations (default)
./liquibase.sh status       # Check migration status
./liquibase.sh update-sql   # Preview SQL without applying
./liquibase.sh rollback-count 1   # Rollback the last changeset
./liquibase.sh history      # Show migration history
./liquibase.sh validate     # Validate changelog syntax
```

Alternatively, use docker compose directly (must be run from `vegaux-server` directory):

```bash
docker compose run --rm liquibase update
docker compose run --rm liquibase status
```

## Running the Application

```bash
# Build
./mvnw clean package

# Run (requires database to be running)
./mvnw spring-boot:run

# Run with dev profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

## Running Tests

Tests use Testcontainers, which automatically starts a PostGIS container.

```bash
# Run all tests
./mvnw test

# Run a specific test class
./mvnw test -Dtest=PlaceRepositoryIntegrationTest

# Run a specific test method
./mvnw test -Dtest=PlaceRepositoryIntegrationTest#testFindInDistance
```
