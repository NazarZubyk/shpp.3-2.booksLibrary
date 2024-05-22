# Use the official Node.js image
FROM node:20.12.2

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies including TypeScript
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Nest.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
