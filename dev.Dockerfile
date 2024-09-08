# Base build stage
FROM node:20-alpine as common-build-stage


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development


CMD ["npm", "run", "dev"]
