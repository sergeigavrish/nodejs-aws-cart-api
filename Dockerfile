FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build:prod

FROM node:20-alpine AS run
WORKDIR /app
COPY --from=build /app/dist ./dist
CMD ["node", "dist/main"]
