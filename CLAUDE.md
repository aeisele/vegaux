# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VEGAUX is a location-based application for discovering vegan-friendly places. It consists of a Spring Boot backend with PostGIS spatial capabilities and a React frontend with map visualization.

## Build and Run Commands

### Backend (vegaux-server)

```bash
# Build
cd vegaux-server && ./mvnw clean package

# Run (requires PostgreSQL with PostGIS)
cd vegaux-server && ./mvnw spring-boot:run

# Run all tests
cd vegaux-server && ./mvnw test

# Run a single test class
cd vegaux-server && ./mvnw test -Dtest=PlaceRepositoryIntegrationTest

# Run a single test method
cd vegaux-server && ./mvnw test -Dtest=PlaceRepositoryIntegrationTest#testFindInDistance
```

### Frontend (vegaux-frontend)

```bash
cd vegaux-frontend && npm install
cd vegaux-frontend && npm start    # Development server on port 3000
cd vegaux-frontend && npm test     # Run tests
cd vegaux-frontend && npm run build
```

## Architecture

### Backend Stack
- **Java 21** with **Spring Boot 3.4**
- **PostgreSQL + PostGIS** for geospatial data storage
- **Hibernate Spatial** for JPA spatial queries (dwithin, distance functions)
- **Liquibase** for database migrations (changelogs in `src/main/resources/db/changelog/`)
- **Lombok** for boilerplate reduction
- **ModelMapper** with custom converters for DTO mapping

### Key Backend Patterns

**Spatial Queries**: The `PlaceRepository` extends `DistancePlaceRepository` for custom spatial operations. `DistancePlaceRepositoryImpl` uses JPQL with Hibernate Spatial functions (`dwithin`, `distance`) against PostGIS geography types.

**DTO Mapping**: Located in `dto/mapping/`. Uses ModelMapper with explicit property maps (`PlaceMap`, `PlaceDtoMap`) and custom converters (`PointConverters`) to handle JTS `Point` ↔ `GeoCoordinate` conversions.

**API Base Path**: All REST endpoints are under `/api` (configured via `server.servlet.context-path`). The `PlaceController` handles `/api/places` with a distance search at `/api/places/inDistance`.

### Frontend Stack
- **React 16** with React Router v5
- **Material-UI v4** for components
- **Leaflet/React-Leaflet** for map visualization
- **Formik + Yup** for form handling and validation

The frontend proxies API requests to `localhost:8080` (configured in `package.json`).

### Frontend Routes
- `/` - Home
- `/places` - List all places
- `/places/:placeId` - Place form (create/edit)
- `/map` - Distance-based search with map view

## Testing

### Backend
- **Integration tests** use Testcontainers with PostGIS (`postgis/postgis:16-3.4-alpine`)
- **WebMvc tests** use `@MockitoBean` for service mocking
- Test data utilities in `com.andreaseisele.vegaux.vegauxserver.data.TestData`
- Tests require Docker for Testcontainers

### Database
The schema uses PostGIS `geography(POINT)` type for the location column with a GIST index for spatial queries. Connection requires a running PostgreSQL instance with PostGIS extension.
