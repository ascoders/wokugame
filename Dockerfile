############################################################
# Dockerfile to build woku container images
# Based on node
############################################################

# Set the base image
FROM node:latest

# File Author
MAINTAINER ascoders www.ziyihuang@gmail.com

# Copy file
RUN mkdir -p /app
COPY . /app

# Change work dir
WORKDIR /app

# Npm install
RUN npm install --production --registry https://registry.npm.taobao.org

# Expose the default port
EXPOSE 8080 8000

# Run Container
CMD npm run deploy