# Use the official Node.js image to build the React app
FROM node:18 AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the source code and build the app
COPY ./ ./
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port (this should match the frontend's port, e.g., 3000)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
