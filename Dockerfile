# Use the official Node.js image as the base image
FROM node:14

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
# Install build tools and retry npm install to handle transient network issues
RUN apt-get update && apt-get install -y python3 make g++ && \
    npm install || npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000
EXPOSE 8080

# Define the command to run the application
CMD ["npm", "start"]
