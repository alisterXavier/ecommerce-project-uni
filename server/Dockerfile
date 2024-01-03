# MULTI-STAGE Dockerfile FOR SERVER

# BUILD STAGE
# Use latest node image as base image in build stage
FROM node:latest AS BUILD

# Create the required directories
RUN mkdir -p /app/dist

# Set the working directory as /app
WORKDIR /app

# Copying server from local system to docker image
COPY ./ /app

# Installing all deps and creating a build IN BUILD STAGE
RUN yarn install
RUN npm run build

# PRODUCTION STAGE
# Use latest node image as base image in production stage
FROM node:latest AS PRODUCTION
WORKDIR /app

# Copying Contents from BUILD -> server to PRODUCTION -> server
COPY --from=BUILD /app/package.json /app/
COPY --from=BUILD /app/dist /app/dist
COPY --from=BUILD /app/.env.test /app/.env

# Installing pnpm and deps in PRODUCTION STAGE
RUN yarn install --production

# Expose the required port
EXPOSE 5001

# Start the application
CMD ["npm", "start"]