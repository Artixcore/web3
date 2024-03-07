# Use Node.js as the base image
FROM node:alpine3.18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application files
COPY . .


# Debugging step
RUN ls -la /app/build


# Build the React app
RUN npm run build

# Use Nginx as the final image
FROM nginx:1.23-alpine

# Set the working directory in the final image
WORKDIR /usr/share/nginx/html

# Remove default Nginx content
RUN rm -rf *

# Change the path to the correct build output directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Corrected ENTRYPOINT syntax
ENTRYPOINT ["nginx", "-g", "daemon off;"]
