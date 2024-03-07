# Use Node.js as the base image
FROM node:alpine3.18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Use Nginx as the final image
FROM nginx:1.23-alpine

# Set the working directory in the final image
WORKDIR /usr/share/nginx/html

# Remove default Nginx content
RUN rm -rf *

# Copy the built React app from the previous stage
COPY --from=0 /app/build .

# Expose port 80
EXPOSE 80

# Corrected ENTRYPOINT syntax
ENTRYPOINT ["nginx", "-g", "daemon off;"]
