FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build:prod

FROM node:20-alpine AS run
WORKDIR /app
COPY --from=build /app/dist ./dist
USER node
ENV NODE_ENV=production
ENV APP_PORT=4000
EXPOSE 4000
CMD ["node", "dist/main"]
