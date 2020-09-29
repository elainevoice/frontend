FROM node:latest

# Set working directory
WORKDIR /var/www/frontend

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the files
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]