# Stage 1: Build the React application
FROM node:18-alpine as builder
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stagee 2: Serve the application with Nginx
FROM nginx:1.25-alpine as final

# Copy the build output from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
