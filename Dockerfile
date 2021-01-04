# set base image of the dependency stage
FROM node:13.12.0-alpine AS dependency_stage

ENV REACT_APP_API=/api

# create the app directory
RUN mkdir -p /app
RUN mkdir -p /app/node_modules

# set the work directory to the newly created app directory.
WORKDIR /app

# add the package.json file
COPY package*.json ./

# install the dependencies including the react-scripts global install
RUN yarn
RUN yarn global add react-scripts@3.4.1 --silent

# set base image of the production stage
FROM node:13.12.0-alpine AS development_stage

# copy the dependency stage result to the production stage
COPY --from=dependency_stage /app/node_modules /app/node_modules

# create the app directory
RUN mkdir -p /app

# set the work directory to the newly created app directory.
WORKDIR /app

# copy the rest of the files
COPY . ./

# execute start script
CMD ["yarn", "run", "start"]

# set base image of the build stage
FROM node:13.12.0-alpine AS build_stage

ENV REACT_APP_API=/api

# copy the dependency stage result to the production stage
COPY --from=dependency_stage /app/node_modules /app/node_modules

# create the app directory
RUN mkdir -p /app

# set the work directory to the newly created app directory.
WORKDIR /app

# copy the rest of the files
COPY . ./

# nump build
RUN yarn build

# set base image of the production stage
FROM nginx:stable-alpine AS production_stage

# copy the dependency stage result to the production stage
COPY --from=build_stage /app/build /var/www/html