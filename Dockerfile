### BUILD STAGE
## Use latest node image as base image in build stage
FROM node:latest AS BUILD

## Create the required directories
RUN mkdir -p /app/frontend/.next
RUN mkdir -p /app/server/dist

## Install pnpm in build stage
RUN npm i -g pnpm 

## Set the working directory as /app
WORKDIR /app

## Copy package.json from local to docker image and replace all occurrences of /app to /frontend
COPY ./package.json /app
RUN sed -i 's/\/app/\/frontend/g' /app/package.json

## Copying frontend and server from local system to docker image
COPY ./app/ /app/frontend/
COPY ./app/package.json /app/frontend
COPY ./server/ /app/server
COPY ./server/package.json /app/server

## Installing all deps and creating a build IN BUILD STAGE
RUN yarn install
RUN pnpm run build

### PRODUCTION STAGE
## Use latest node image as base image in production stage
FROM node:latest AS PRODUCTION
WORKDIR /app

## Copying Contents from BUILD -> frontend to PRODUCTION -> frontend
COPY --from=BUILD /app/frontend/package.json /app/frontend/package.json
COPY --from=BUILD /app/frontend/next.config.js /app/frontend/next.config.js
COPY --from=BUILD /app/frontend/.next /app/frontend/.next
COPY --from=BUILD /app/frontend/.env.production /app/frontend/.env.production

## Copying Contents from BUILD -> server to PRODUCTION -> server
COPY --from=BUILD /app/server/package.json /app/server/
COPY --from=BUILD /app/server/dist /app/server/dist
COPY --from=BUILD /app/server/.env.test /app/server/.env
COPY --from=BUILD /app/package*.json /app/

## Installing pnpm and deps in PRODUCTION STAGE
RUN npm install -g pnpm
RUN yarn install --production

## Expose the required ports
EXPOSE 3000
EXPOSE 5001

## Start the application
CMD ["pnpm", "start"]