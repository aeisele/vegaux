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

The Liquibase service is configured as a Docker Compose profile tool, so it won't start with the regular `docker compose up` command.

```bash
# Apply pending migrations
docker compose run --rm liquibase update

# Check migration status
docker compose run --rm liquibase status

# Preview SQL without applying
docker compose run --rm liquibase update-sql
```

### Rollback

```bash
# Rollback the last changeset
docker compose run --rm liquibase rollback-count 1

# Rollback to a specific tag
docker compose run --rm liquibase rollback --tag=v1.0
```

### Other Commands

```bash
# Show migration history
docker compose run --rm liquibase history

# Validate changelog syntax
docker compose run --rm liquibase validate

# Generate changelog from existing database
docker compose run --rm liquibase generate-changelog --changelog-file=/liquibase/changelog/generated.xml
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
