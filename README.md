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
docker-compose start
```

## Scanning
To scan for vulnerabilities images should be already built, so first execute `docker-compose build` command and then
```
npm run scan
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by pasting api.yaml file's content to the
https://editor.swagger.io/ service. Don't forget to change `servers.url` prop content
if port is different from 4000.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Notes
Link to docker hub - https://hub.docker.com/repository/docker/tonytrof/nodejs2022q4-service/general