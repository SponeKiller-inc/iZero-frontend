# 1) Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY app/package*.json ./
RUN npm ci
COPY app .
RUN npm run build 

# 2) Run stage
FROM node:22-alpine
WORKDIR /app

## install small HTTP server
RUN npm install -g serve

COPY --from=build /app/dist ./dist

## Run app
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]


