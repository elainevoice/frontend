FROM node:13.12.0-alpine

RUN mkdir -p /app
RUN mkdir -p /app/node_modules

# Set working directory
WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

ENV REACT_APP_API=/api

EXPOSE 3000

CMD ["npm", "start"]