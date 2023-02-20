# Home Library Service Containerization

## Prerequisites

- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/).

## Downloading

```
git clone https://github.com/antontrafimovich/nodejs2022Q4-service.git
```

## Switching to the branch with implementation

```
git checkout docker
```

## Running application

First, you need to create `.env` file. Take a `.env.example` file as a reference or just rename it to `.env`

Second, make sure that docker daemon is up and running

Third, run this commands:
```
docker-compose build
docker-compose up
```

## Scanning for vulnerabilities
To scan images for vulnerabilities those images should be already built, so first execute `docker-compose build` command and then
```
npm run scan
```

## Notes
Link to docker hub - https://hub.docker.com/repository/docker/tonytrof/nodejs2022q4-service/general