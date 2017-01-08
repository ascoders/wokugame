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
COPY ./ /app

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
CMD ["npm run factory"]