# Use a Node.js base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if any) to the working directory
# to install dependencies
COPY package*.json ./

# Install dependencies for both the API server and the ingester
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the Express app will listen on
EXPOSE 3000

# The default command to run when the container starts.
# This will be overridden by docker-compose for specific services.
CMD ["npm", "start"]
