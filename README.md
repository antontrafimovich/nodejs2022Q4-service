# Home Library Service

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