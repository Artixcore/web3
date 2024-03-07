# Step 1: Build React App
FROM node:alpine3.18 as build

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Step 2: Use Nginx as the final image
FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html

# Remove default Nginx content
RUN rm -rf *

# Copy the built React app from the build stage
COPY --from=build /app/dist .

# Expose port 80
EXPOSE 80

# Corrected ENTRYPOINT syntax
ENTRYPOINT ["nginx", "-g", "daemon off;"]
