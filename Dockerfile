############################################################
# Dockerfile to build woku container images
# Based on node
############################################################

# Set the base image
FROM node:latest

# File Author
MAINTAINER ascoders www.ziyihuang@gmail.com

# Copy file
RUN mkdir app
COPY ./built /app/built
COPY ./node_modules /app/built/node_modules
COPY ./yarn.lock /app/built/yarn.lock
COPY ./package.json /app/package.json

# Install node_modules
WORKDIR /app
# RUN yarn
RUN npm install --registry https://registry.npm.taobao.org

# Run tsc
RUN npm run tsc

# Expose the default port
EXPOSE 8080

# Run Container
# CMD pm2 start /app/built/deploy/index.js
CMD ["pm2-docker", "/app/built/src/server/index.js"]