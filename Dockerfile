# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Set the working directory for the build stage
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install all dependencies (including devDependencies for the build step)
RUN npm ci

# Copy the entire project source code
COPY . .

# Run the build process
RUN npm run build

# Use a lighter runtime image for the final production stage
FROM node:18-alpine

# Set the working directory for the runtime stage
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm ci

# Expose the application port
EXPOSE 8080

# Define the command to run your application
CMD ["node", "dist/index.js"]
