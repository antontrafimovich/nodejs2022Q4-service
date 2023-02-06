# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Switching to the branch with implementation

```
git checkout dev
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by pasting api.yaml file's content to the
https://editor.swagger.io/ service. Don't forget to change `servers.url` prop content
if port is different from 4000.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Notes

This app is implemented according to the assignment from https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md, but there're a couple of extensions:
- 409 HTTP Error is being sent on try to add an entity to favorites which is already there.
- 400 HTTP Error is being sent on try to update track or album with `artistId` or `albumId` values which doesn't exist in db.

## Testing

After application running open new terminal and enter:

```
npm run test
```

### To check linting run

```
npm run lint
```