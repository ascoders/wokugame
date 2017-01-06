############################################################
# Dockerfile to build woku container images
# Based on node
############################################################

# Set the base image
FROM node:latest

# File Author
MAINTAINER ascoders www.ziyihuang@gmail.com

# Copy file
COPY ./ /app
RUN cd /app

# Install
RUN npm install pm2 -g
RUN npm install

# Expose the default port
EXPOSE 8080

# Run Container
# CMD pm2 start /app/built/deploy/index.js
CMD ["pm2-docker", "/app/built/src/server/index.js"]