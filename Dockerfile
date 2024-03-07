# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Expose the port that Vite is using
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=production

# Build the Vite project
RUN npm run build

# Run the production server when the container launches
CMD ["npm", "start"]
