# Time Planner Admin

A time planning application for companies/teams/groups of individuals.
Built as a hands-on learning project for Java and Angular, and it continuously grows as I pick up new things to explore.

## Status

Early development. See [CHANGELOG.md](CHANGELOG.md) for progress.

## Tech Stack

- **Backend:** Java 25, Spring Boot 4.1
- **Frontend:** Angular 22, TypeScript
- **Database:** PostgreSQL 16
- **Infrastructure:** Docker Compose

## Getting Started

```bash
git clone https://github.com/GO-hman/TimePlannerAdmin.git
cd TimePlannerAdmin
docker compose up
```

| Service | URL                   |
| ------- | --------------------- |
| Client  | http://localhost:4200 |
| API     | http://localhost:8080 |
| Adminer | http://localhost:8086 |

Adminer connects to server `db`, database `tpa`. Dev credentials are in `docker-compose.yml`.
Use default system admin as client login: system@admin.com//admin123

## Roadmap / Learning goals

- Introduce Flyway migrations once the entities stabilize
- Teams and scheduling features
- Testing on both backend and frontend, plus CI
