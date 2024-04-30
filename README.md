> NOTE: Always pull lastest migration files to update database properly. BE SURE run command `npm run migration:run` before add migration

- Config database in `.env`
- Generate migration file: `npm run migration:generate src/database/migrations/<NAME_MIGRATION>`
- Update database with new change: `npm run migration:run`

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```