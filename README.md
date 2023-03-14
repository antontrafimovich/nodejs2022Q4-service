# Home Library Service PostgreSQL & ORM

## Prerequisites

- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/).

## Downloading

```
git clone https://github.com/antontrafimovich/nodejs2022Q4-service.git
```

## Switching to the branch with implementation

```
git checkout postgres
```

## Running application

First, you need to create `.env` file. Take a `.env.example` file as a reference or just rename it to `.env`

Second, make sure that docker daemon is up and running

Third, run this commands:

```
docker-compose build
docker-compose up
```

## Running application tests

To run tests use next command

```
npm run test:auth -- --runInBand
```
