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
RUN chmod -R 777 /app/scripts

# Change work dir
WORKDIR /app

# Npm install
RUN npm install --production --registry https://registry.npm.taobao.org

# Install nc
RUN apt-get update
RUN apt-get install -y netcat

# Expose the default port
EXPOSE 8000

# Run Container
CMD ./scripts/docker/wait-for.sh && npm run deploy