############################################################
# Dockerfile to build woku container images
# Based on node
############################################################

# Set the base image
FROM node:latest

# File Author
MAINTAINER ascoders www.ziyihuang@gmail.com

RUN mkdir app
COPY built /app
COPY built-production /app

# Expose the default port
EXPOSE 80