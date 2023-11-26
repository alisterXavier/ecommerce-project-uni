FROM node:21 AS BUILD
RUN apk update && apk add npm
RUN mkdir -p /dockerApp
WORKDIR /dockerApp
COPY . .
RUN npm i -g pnpm
RUN pnpm install
RUN pnpm run build

FROM nginx:alpine
EXPOSE 3000
EXPOSE 5001
CMD ["pnpm", "start"]