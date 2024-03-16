# Step 1: Build React App
FROM node:alpine3.18 as build

WORKDIR /app

# Copy the env file and extract variables
COPY .env .

# Set environment variables from env file
ARG VITE_APIKEY
ARG VITE_AUTHDOMAIN
ARG VITE_PROJECTID
ARG VITE_STORAGEBUCKET
ARG VITE_MESSAGINGSENDERID
ARG VITE_APPID
ENV VITE_APIKEY=$VITE_APIKEY
ENV VITE_AUTHDOMAIN=$VITE_AUTHDOMAIN
ENV VITE_PROJECTID=$VITE_PROJECTID
ENV VITE_STORAGEBUCKET=$VITE_STORAGEBUCKET
ENV VITE_MESSAGINGSENDERID=$VITE_MESSAGINGSENDERID
ENV VITE_APPID=$VITE_APPID

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
