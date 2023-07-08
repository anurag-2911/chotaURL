# Dockerfile-react

# Start from the latest Node base image
FROM node:latest

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight version of Node.js as a parent image
FROM nginx:stable-alpine

# Copy build files from build stage to nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
