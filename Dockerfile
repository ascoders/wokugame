############################################################
# Dockerfile to build woku container images
# Based on node
############################################################

# Set the base image
FROM node:latest

# File Author
MAINTAINER ascoders www.ziyihuang@gmail.com

# Install yarn
# RUN npm install yarn -g

# Install pm2
# RUN yarn global add pm2
RUN npm install pm2 -g --registry https://registry.npm.taobao.org

# Copy file
RUN mkdir app
COPY ./built /app/built
COPY ./yarn.lock /app/built/yarn.lock
COPY ./package.json /app/package.json

# Install node_modules
RUN cd /app
# RUN yarn
RUN npm install --registry https://registry.npm.taobao.org

# Run tsc
RUN npm run tsc

# Expose the default port
EXPOSE 8080

# Run Container
# CMD pm2 start /app/built/deploy/index.js
CMD ["pm2-docker", "/app/built/src/server/index.js"]