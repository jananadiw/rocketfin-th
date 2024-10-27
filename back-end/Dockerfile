# Stage 1: Base stage
FROM node:18 AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Development stage
FROM base AS development
ENV NODE_ENV=development
RUN npm install --only=development
CMD ["npm", "run", "dev"]

# Stage 3: Build stage
FROM base AS build
ENV NODE_ENV=production
RUN npm run build

# Stage 4: Production stage
FROM node:18 AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
RUN npm install --only=production
EXPOSE 8080
CMD ["npm", "start"]
